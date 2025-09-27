// Mock data for frontend prototyping
import type { User, UserProfile, UserStatistics } from '@/types/auth';
import type { Game, Puzzle, PlayerGame, GameState } from '@/types/game';
import type { Tournament, TournamentParticipant } from '@/types/tournament';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alice_solver',
    email: 'alice@sudokru.com',
    displayName: 'Alice the Solver',
    avatar: undefined, // Will use fallback in components
    rating: 1350,
    subscription: 'premium',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    username: 'bob_puzzle',
    email: 'bob@sudokru.com',
    displayName: 'Bob Puzzler',
    avatar: undefined, // Will use fallback in components
    rating: 1280,
    subscription: 'free',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-19T16:20:00Z',
  },
  {
    id: '3',
    username: 'charlie_master',
    email: 'charlie@sudokru.com',
    displayName: 'Charlie Master',
    avatar: undefined, // Will use fallback in components
    rating: 1520,
    subscription: 'premium',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-21T09:30:00Z',
  },
  {
    id: '4',
    username: 'diana_speed',
    email: 'diana@sudokru.com',
    displayName: 'Diana Speed',
    avatar: undefined, // Will use fallback in components
    rating: 1420,
    subscription: 'free',
    createdAt: '2024-01-12T15:45:00Z',
    updatedAt: '2024-01-18T11:10:00Z',
  },
];

// Mock current user (Alice)
export const mockCurrentUser = mockUsers[0];

// Mock Easy Sudoku Puzzle
export const mockEasyPuzzle: Puzzle = {
  id: 'puzzle-easy-1',
  difficulty: 'easy',
  initialGrid: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  solution: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
  clueCount: 36,
  complexity: 1.2,
  timesPlayed: 124,
  averageTime: 420,
  createdAt: '2024-01-01T00:00:00Z',
};

// Mock current game state
export const mockCurrentGrid = [
  [5, 3, 4, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Mock PlayerGame data
export const mockPlayerGames: PlayerGame[] = [
  {
    id: 'pg-1',
    gameId: 'game-1',
    userId: '1',
    user: mockUsers[0],
    status: 'playing',
    role: 'player',
    currentGrid: mockCurrentGrid,
    moveCount: 12,
    errorCount: 1,
    hintCount: 0,
    score: 850,
    isWinner: false,
    joinedAt: '2024-01-21T10:00:00Z',
    startedAt: '2024-01-21T10:02:00Z',
  },
  {
    id: 'pg-2',
    gameId: 'game-1',
    userId: '2',
    user: mockUsers[1],
    status: 'playing',
    role: 'player',
    currentGrid: mockCurrentGrid,
    moveCount: 8,
    errorCount: 2,
    hintCount: 1,
    score: 720,
    isWinner: false,
    joinedAt: '2024-01-21T10:01:00Z',
    startedAt: '2024-01-21T10:02:00Z',
  },
  {
    id: 'pg-3',
    gameId: 'game-1',
    userId: '3',
    user: mockUsers[2],
    status: 'disconnected',
    role: 'spectator',
    moveCount: 0,
    errorCount: 0,
    hintCount: 0,
    score: 0,
    isWinner: false,
    joinedAt: '2024-01-21T10:03:00Z',
  },
];

// Mock Game
export const mockGame: Game = {
  id: 'game-1',
  type: 'competitive',
  mode: 'speed',
  difficulty: 'easy',
  status: 'active',
  timeLimit: 900, // 15 minutes
  maxPlayers: 4,
  creatorId: '1',
  settings: {
    allowHints: true,
    showErrors: true,
  },
  puzzle: mockEasyPuzzle,
  players: mockPlayerGames,
  startedAt: '2024-01-21T10:02:00Z',
  createdAt: '2024-01-21T10:00:00Z',
  updatedAt: '2024-01-21T10:05:00Z',
};

// Mock Game State
export const mockGameState: GameState = {
  gameId: 'game-1',
  grid: mockCurrentGrid,
  players: [
    {
      userId: '1',
      username: 'alice_solver',
      displayName: 'Alice the Solver',
      avatar: undefined, // Will use fallback in components
      currentGrid: mockCurrentGrid,
      moveCount: 12,
      errorCount: 1,
      isComplete: false,
      status: 'playing',
    },
    {
      userId: '2',
      username: 'bob_puzzle',
      displayName: 'Bob Puzzler',
      avatar: undefined, // Will use fallback in components
      currentGrid: mockCurrentGrid,
      moveCount: 8,
      errorCount: 2,
      isComplete: false,
      status: 'playing',
    },
  ],
  timeRemaining: 735, // 12 minutes 15 seconds
  spectators: ['3'],
  lastMove: {
    userId: '1',
    row: 0,
    col: 2,
    value: 4,
    timestamp: 1640995200000, // Fixed timestamp instead of Date.now()
  },
};

// Mock Tournaments
export const mockTournaments: Tournament[] = [
  {
    id: 'tournament-1',
    name: 'Weekend Warriors Championship',
    description: 'Competitive tournament for intermediate players',
    format: 'single_elimination',
    maxPlayers: 16,
    difficulty: 'medium',
    timeLimit: 600,
    minRating: 1200,
    maxRating: 1500,
    entryFee: 0,
    isPremiumOnly: false,
    status: 'registration',
    currentRound: 0,
    prizePool: 0,
    prizeDistribution: {},
    registrationStart: '2024-01-20T00:00:00Z',
    registrationEnd: '2024-01-27T23:59:59Z',
    startTime: '2024-01-28T14:00:00Z',
    participants: [],
    matches: [],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },
];

// Utility functions for mock data
export const generateMockGrid = (difficulty: 'easy' | 'medium' | 'hard' | 'expert' = 'easy'): number[][] => {
  // This is a simplified mock generator
  // In a real app, this would use a proper Sudoku generation algorithm
  return mockEasyPuzzle.initialGrid.map(row => [...row]);
};

// Static counter for consistent IDs during SSR
let userCounter = 1000;
let gameCounter = 2000;

export const createMockUser = (overrides: Partial<User> = {}): User => {
  const id = (userCounter++).toString();
  return {
    id,
    username: `user_${id}`,
    email: `user${id}@sudokru.com`,
    rating: 1200 + (parseInt(id) % 400),
    subscription: parseInt(id) % 3 === 0 ? 'premium' : 'free',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
};

export const createMockGame = (overrides: Partial<Game> = {}): Game => {
  const id = (gameCounter++).toString();
  return {
    ...mockGame,
    id,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
};