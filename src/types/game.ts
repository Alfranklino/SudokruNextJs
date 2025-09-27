// Game-related types
export type GameType = 'competitive' | 'collaborative' | 'tournament' | 'practice';
export type GameStatus = 'waiting' | 'active' | 'paused' | 'completed' | 'abandoned';
export type GameMode = 'speed' | 'accuracy' | 'casual';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type PlayerRole = 'player' | 'spectator';
export type PlayerStatus = 'joined' | 'ready' | 'playing' | 'completed' | 'disconnected';

export interface Game {
  id: string;
  type: GameType;
  mode: GameMode;
  difficulty: Difficulty;
  status: GameStatus;
  timeLimit?: number;
  maxPlayers: number;
  creatorId: string;
  settings: Record<string, any>;
  puzzle: Puzzle;
  players: PlayerGame[];
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Puzzle {
  id: string;
  difficulty: Difficulty;
  initialGrid: number[][]; // 9x9 array with given numbers (0 for empty)
  solution: number[][]; // 9x9 array with complete solution
  clueCount: number;
  complexity?: number;
  timesPlayed: number;
  averageTime: number;
  createdAt: string;
}

export interface PlayerGame {
  id: string;
  gameId: string;
  userId: string;
  user: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar' | 'rating'>;
  status: PlayerStatus;
  role: PlayerRole;
  currentGrid?: number[][];
  moveCount: number;
  errorCount: number;
  hintCount: number;
  completionTime?: number;
  finalPosition?: number;
  score: number;
  isWinner: boolean;
  joinedAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface GameMove {
  id: string;
  gameId: string;
  userId: string;
  row: number;
  col: number;
  value: number; // 1-9, or 0 for clearing cell
  moveType: 'place' | 'clear' | 'note';
  timeFromStart: number; // milliseconds from game start
  isCorrect: boolean;
  isHint: boolean;
  validatedAt: string;
}

export interface GameState {
  gameId: string;
  grid: number[][]; // Current state of the Sudoku grid
  players: PlayerGameState[];
  timeRemaining?: number;
  currentTurn?: string; // For turn-based modes
  spectators: string[];
  lastMove?: {
    userId: string;
    row: number;
    col: number;
    value: number;
    timestamp: number;
  };
}

export interface PlayerGameState {
  userId: string;
  username: string;
  displayName?: string;
  avatar?: string;
  currentGrid: number[][];
  moveCount: number;
  errorCount: number;
  isComplete: boolean;
  completionTime?: number;
  status: PlayerStatus;
}

export interface SudokuMove {
  row: number;
  col: number;
  value: number;
  timestamp: number;
  isValid: boolean;
  newGrid?: number[][];
  isComplete?: boolean;
}

export interface GameInvite {
  id: string;
  gameId: string;
  inviterId: string;
  inviter: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar'>;
  inviteeId: string;
  invitee: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar'>;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  message?: string;
  expiresAt: string;
  respondedAt?: string;
  createdAt: string;
}

// WebSocket Events
export interface GameEvents {
  'join-game': { gameId: string; role: PlayerRole };
  'leave-game': { gameId: string };
  'game-move': { gameId: string; move: SudokuMove };
  'game-state-updated': GameState;
  'player-joined': PlayerGame;
  'player-left': { userId: string };
  'game-completed': { gameState: GameState; results: any };
  'chat-message': { gameId: string; message: string };
  'error': { message: string; code?: string };
}