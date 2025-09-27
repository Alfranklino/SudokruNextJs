// API response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

// API endpoint types
export interface LoginResponse {
  user: import('./auth').User;
  tokens: import('./auth').AuthTokens;
}

export interface RefreshResponse {
  accessToken: string;
  user?: import('./auth').User;
}

export interface GameCreateRequest {
  type: import('./game').GameType;
  mode: import('./game').GameMode;
  difficulty: import('./game').Difficulty;
  timeLimit?: number;
  maxPlayers: number;
  isPrivate?: boolean;
  settings?: Record<string, any>;
}

export interface GameJoinRequest {
  role: import('./game').PlayerRole;
}

export interface TournamentCreateRequest {
  name: string;
  description?: string;
  format: import('./tournament').TournamentFormat;
  maxPlayers: number;
  difficulty: import('./game').Difficulty;
  timeLimit?: number;
  minRating?: number;
  maxRating?: number;
  entryFee?: number;
  isPremiumOnly?: boolean;
  registrationStart: string;
  registrationEnd: string;
  startTime: string;
  prizeDistribution?: Record<string, number>;
}