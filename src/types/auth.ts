// Authentication types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  rating: number;
  subscription: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  timezone?: string;
  profileVisibility: 'public' | 'friends' | 'private';
  allowFriendRequests: boolean;
  showOnlineStatus: boolean;
  preferredDifficulty: 'easy' | 'medium' | 'hard' | 'expert';
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface UserStatistics {
  id: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesAbandoned: number;
  totalPlayTime: number;
  averageSolveTime: number;
  bestSolveTime: number;
  currentStreak: number;
  longestStreak: number;
  eloRating: number;
  peakRating: number;
  lastActive: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}