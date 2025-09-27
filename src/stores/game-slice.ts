// Game store slice following documented architecture
import { StateCreator } from 'zustand';
import type { Game, GameState, PlayerGame, SudokuMove } from '@/types/game';
import type { AppState } from './index';

export interface GameStoreState {
  currentGame: Game | null;
  gameState: GameState | null;
  players: PlayerGame[];
  isConnected: boolean;
  connectionError: string | null;
}

export interface GameActions {
  setCurrentGame: (game: Game | null) => void;
  updateGameState: (gameState: GameState) => void;
  updatePlayers: (players: PlayerGame[]) => void;
  makeMove: (row: number, col: number, value: number) => void;
  joinGame: (gameId: string, role: 'player' | 'spectator') => Promise<void>;
  leaveGame: () => void;
  setConnection: (connected: boolean, error?: string) => void;
}

export interface GameSlice {
  game: GameStoreState;
  gameActions: GameActions;
}

export const createGameSlice: StateCreator<
  AppState,
  [],
  [],
  GameSlice
> = (set, get) => ({
  game: {
    currentGame: null,
    gameState: null,
    players: [],
    isConnected: false,
    connectionError: null,
  },

  gameActions: {
    setCurrentGame: (game) => {
      set(state => ({
        game: { ...state.game, currentGame: game }
      }));
    },

    updateGameState: (gameState) => {
      set(state => ({
        game: { ...state.game, gameState }
      }));
    },

    updatePlayers: (players) => {
      set(state => ({
        game: { ...state.game, players }
      }));
    },

    makeMove: (row, col, value) => {
      const { game, auth } = get();
      if (!game.currentGame || !game.isConnected || !auth.user) return;

      // Optimistic update
      const newGrid = game.gameState?.grid.map((gridRow, r) =>
        r === row
          ? gridRow.map((cell, c) => c === col ? value : cell)
          : gridRow
      );

      if (newGrid) {
        set(state => ({
          game: {
            ...state.game,
            gameState: state.game.gameState
              ? { ...state.game.gameState, grid: newGrid }
              : null
          }
        }));
      }

      // Send move to server via WebSocket (will be implemented with socket service)
      const moveData: SudokuMove = {
        row,
        col,
        value,
        timestamp: Date.now(),
        isValid: true, // Will be validated server-side
        newGrid,
      };

      // This will be connected to the WebSocket service
      if (typeof window !== 'undefined' && (window as any).gameSocket) {
        (window as any).gameSocket.emit('game-move', {
          gameId: game.currentGame.id,
          move: moveData
        });
      }
    },

    joinGame: async (gameId, role) => {
      const { auth } = get();
      if (!auth.accessToken) throw new Error('Not authenticated');

      try {
        const response = await fetch(`/api/games/${gameId}/join`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to join game');
        }

        const { game }: { game: Game } = await response.json();
        set(state => ({
          game: { ...state.game, currentGame: game }
        }));

      } catch (error) {
        set(state => ({
          game: {
            ...state.game,
            connectionError: error instanceof Error ? error.message : 'Unknown error'
          }
        }));
        throw error;
      }
    },

    leaveGame: () => {
      const { game } = get();
      if (game.currentGame) {
        // Emit leave event via WebSocket
        if (typeof window !== 'undefined' && (window as any).gameSocket) {
          (window as any).gameSocket.emit('leave-game', {
            gameId: game.currentGame.id
          });
        }
      }

      set(state => ({
        game: {
          ...state.game,
          currentGame: null,
          gameState: null,
          players: [],
          isConnected: false,
          connectionError: null,
        }
      }));
    },

    setConnection: (connected, error) => {
      set(state => ({
        game: {
          ...state.game,
          isConnected: connected,
          connectionError: error || null,
        }
      }));
    },
  },
});