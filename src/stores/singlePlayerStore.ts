// Single player game state management
import { create } from 'zustand';
import { generatePuzzle } from '@/lib/sudoku/generator';
import { isComplete, isValidMove, type Grid } from '@/lib/sudoku/validator';
import { copyGrid } from '@/lib/sudoku/solver';
import type { Difficulty } from '@/lib/sudoku/difficulty';
import { findBestHint } from '@/lib/sudoku/techniques';
import type { HintResult } from '@/types/hint';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'completed' | 'abandoned';
export type TimerMode = 'unlimited' | 'timed';

interface Move {
  row: number;
  col: number;
  value: number;
  timestamp: number;
}

interface SinglePlayerState {
  // Game state
  gameStatus: GameStatus;
  difficulty: Difficulty;
  initialGrid: Grid | null;
  currentGrid: Grid | null;
  solution: Grid | null;

  // Timer state
  timerMode: TimerMode;
  duration: number | null; // in seconds (null for unlimited)
  elapsedTime: number; // in seconds
  isTimerRunning: boolean;

  // Game metrics
  moveCount: number;
  errorCount: number;
  hintCount: number;
  moveHistory: Move[];
  startedAt: Date | null;
  completedAt: Date | null;
  lastHint: HintResult | null; // Store last hint for UI display

  // Actions
  startNewGame: (difficulty: Difficulty, timerMode: TimerMode, duration?: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  stopGame: () => void;
  restartGame: () => void;
  makeMove: (row: number, col: number, value: number) => boolean;
  undoMove: () => void;
  useHint: () => HintResult | null;
  clearLastHint: () => void;
  checkCompletion: () => boolean;
  updateElapsedTime: (seconds: number) => void;
  autoFillSolution: () => void;
}

export const useSinglePlayerStore = create<SinglePlayerState>((set, get) => ({
  // Initial state
  gameStatus: 'idle',
  difficulty: 'medium',
  initialGrid: null,
  currentGrid: null,
  solution: null,

  timerMode: 'unlimited',
  duration: null,
  elapsedTime: 0,
  isTimerRunning: false,

  moveCount: 0,
  errorCount: 0,
  hintCount: 0,
  moveHistory: [],
  startedAt: null,
  completedAt: null,
  lastHint: null,

  // Start a new game
  startNewGame: (difficulty: Difficulty, timerMode: TimerMode, duration?: number) => {
    const puzzle = generatePuzzle(difficulty);

    set({
      gameStatus: 'playing',
      difficulty,
      initialGrid: puzzle.initialGrid,
      currentGrid: copyGrid(puzzle.initialGrid),
      solution: puzzle.solution,
      timerMode,
      duration: timerMode === 'timed' && duration ? duration : null,
      elapsedTime: 0,
      isTimerRunning: true,
      moveCount: 0,
      errorCount: 0,
      hintCount: 0,
      moveHistory: [],
      startedAt: new Date(),
      completedAt: null,
    });
  },

  // Pause the game
  pauseGame: () => {
    set({
      gameStatus: 'paused',
      isTimerRunning: false,
    });
  },

  // Resume the game
  resumeGame: () => {
    set({
      gameStatus: 'playing',
      isTimerRunning: true,
    });
  },

  // Stop the game
  stopGame: () => {
    set({
      gameStatus: 'abandoned',
      isTimerRunning: false,
    });
  },

  // Restart the current game
  restartGame: () => {
    const { initialGrid } = get();
    if (!initialGrid) return;

    set({
      gameStatus: 'playing',
      currentGrid: copyGrid(initialGrid),
      elapsedTime: 0,
      isTimerRunning: true,
      moveCount: 0,
      errorCount: 0,
      hintCount: 0,
      moveHistory: [],
      startedAt: new Date(),
      completedAt: null,
    });
  },

  // Make a move
  makeMove: (row: number, col: number, value: number): boolean => {
    const { currentGrid, initialGrid, solution, gameStatus } = get();

    if (!currentGrid || !initialGrid || !solution) return false;
    if (gameStatus !== 'playing') return false;

    // Check if cell is editable (not part of initial puzzle)
    if (initialGrid[row][col] !== 0) return false;

    // Create new grid with the move
    const newGrid = copyGrid(currentGrid);
    newGrid[row][col] = value;

    // Check if move violates Sudoku rules (duplicate in row/col/box)
    const isInvalidMove = value !== 0 && !isValidMove(currentGrid, row, col, value);

    // Track if this is an incorrect move (doesn't match solution)
    const isIncorrectMove = value !== 0 && value !== solution[row][col];

    // Record the move
    const move: Move = {
      row,
      col,
      value,
      timestamp: Date.now(),
    };

    set(state => ({
      currentGrid: newGrid,
      moveCount: state.moveCount + 1,
      errorCount: isInvalidMove || isIncorrectMove ? state.errorCount + 1 : state.errorCount,
      moveHistory: [...state.moveHistory, move],
    }));

    // Check if game is complete (only if no invalid moves)
    if (!isInvalidMove) {
      get().checkCompletion();
    }

    return true;
  },

  // Undo last move
  undoMove: () => {
    const { moveHistory, initialGrid } = get();

    if (moveHistory.length === 0 || !initialGrid) return;

    // Remove last move
    const newHistory = [...moveHistory];
    newHistory.pop();

    // Reconstruct grid from initial state and move history
    const newGrid = copyGrid(initialGrid);
    newHistory.forEach(move => {
      newGrid[move.row][move.col] = move.value;
    });

    set({
      currentGrid: newGrid,
      moveHistory: newHistory,
    });
  },

  // Use a hint - now with intelligent technique-based selection
  useHint: (): HintResult | null => {
    const { currentGrid, solution, initialGrid, gameStatus } = get();

    if (!currentGrid || !solution || !initialGrid) return null;
    if (gameStatus !== 'playing') return null;

    // Find best hint using solving techniques
    const hint = findBestHint(currentGrid, solution);

    if (!hint) return null;

    // Apply the hint to the grid
    const newGrid = copyGrid(currentGrid);
    newGrid[hint.row][hint.col] = hint.value;

    const move: Move = {
      row: hint.row,
      col: hint.col,
      value: hint.value,
      timestamp: Date.now(),
    };

    set(state => ({
      currentGrid: newGrid,
      hintCount: state.hintCount + 1,
      moveCount: state.moveCount + 1,
      moveHistory: [...state.moveHistory, move],
      lastHint: hint,
    }));

    // Check if game is complete
    get().checkCompletion();

    return hint;
  },

  // Clear last hint (for UI dismissal)
  clearLastHint: () => {
    set({ lastHint: null });
  },

  // Check if puzzle is complete
  checkCompletion: (): boolean => {
    const { currentGrid, solution, gameStatus } = get();

    if (!currentGrid || !solution) return false;
    if (gameStatus !== 'playing') return false;

    if (isComplete(currentGrid, solution)) {
      set({
        gameStatus: 'completed',
        isTimerRunning: false,
        completedAt: new Date(),
      });
      return true;
    }

    return false;
  },

  // Update elapsed time
  updateElapsedTime: (seconds: number) => {
    const { timerMode, duration } = get();

    set({ elapsedTime: seconds });

    // Check if time limit reached for timed mode
    if (timerMode === 'timed' && duration && seconds >= duration) {
      set({
        gameStatus: 'abandoned',
        isTimerRunning: false,
      });
    }
  },

  // Auto-fill solution (for testing)
  autoFillSolution: () => {
    const { solution } = get();
    if (!solution) return;

    set({
      currentGrid: copyGrid(solution),
      gameStatus: 'completed',
      isTimerRunning: false,
      completedAt: new Date(),
    });
  },
}));