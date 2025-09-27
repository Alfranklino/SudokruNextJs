// Application constants following the documented architecture
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard', 'expert'] as const;
export const GAME_TYPES = ['competitive', 'collaborative', 'practice', 'tournament'] as const;
export const GAME_MODES = ['speed', 'accuracy', 'casual'] as const;
export const TOURNAMENT_FORMATS = ['single_elimination', 'double_elimination', 'round_robin', 'swiss'] as const;
export const PLAYER_ROLES = ['player', 'spectator'] as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  GAMES: '/api/games',
  TOURNAMENTS: '/api/tournaments',
  USERS: '/api/users',
} as const;

export const GAME_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 8,
  DEFAULT_TIME_LIMIT: 900, // 15 minutes in seconds
  GRID_SIZE: 9,
  BOX_SIZE: 3,
} as const;

export const DIFFICULTY_CONFIG = {
  easy: { minClues: 35, maxClues: 40, color: 'text-green-600 bg-green-50' },
  medium: { minClues: 30, maxClues: 35, color: 'text-yellow-600 bg-yellow-50' },
  hard: { minClues: 25, maxClues: 30, color: 'text-red-600 bg-red-50' },
  expert: { minClues: 20, maxClues: 25, color: 'text-purple-600 bg-purple-50' },
} as const;

export const ELO_CONFIG = {
  STARTING_RATING: 1200,
  MIN_RATING: 800,
  MAX_RATING: 2400,
  K_FACTOR: 32,
} as const;

export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN_GAME: 'join-game',
  LEAVE_GAME: 'leave-game',
  GAME_MOVE: 'game-move',
  GAME_STATE_UPDATED: 'game-state-updated',
  PLAYER_JOINED: 'player-joined',
  PLAYER_LEFT: 'player-left',
  GAME_COMPLETED: 'game-completed',
  CHAT_MESSAGE: 'chat-message',
  ERROR: 'error',
} as const;

export const LOCAL_STORAGE_KEYS = {
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  GAME_PREFERENCES: 'gamePreferences',
  SOUND_ENABLED: 'soundEnabled',
} as const;