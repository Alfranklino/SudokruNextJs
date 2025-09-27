// Tournament-related types
export type TournamentFormat = 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss';
export type TournamentStatus = 'upcoming' | 'registration' | 'active' | 'completed' | 'cancelled';

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  format: TournamentFormat;
  maxPlayers: number;
  difficulty: import('./game').Difficulty;
  timeLimit?: number;
  minRating?: number;
  maxRating?: number;
  entryFee: number;
  isPremiumOnly: boolean;
  status: TournamentStatus;
  currentRound: number;
  prizePool: number;
  prizeDistribution: Record<string, number>;
  registrationStart: string;
  registrationEnd: string;
  startTime: string;
  endTime?: string;
  participants: TournamentParticipant[];
  matches: TournamentMatch[];
  createdAt: string;
  updatedAt: string;
}

export interface TournamentParticipant {
  id: string;
  tournamentId: string;
  userId: string;
  user: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar' | 'rating'>;
  seedPosition?: number;
  currentRound: number;
  isEliminated: boolean;
  finalPosition?: number;
  registeredAt: string;
  ratingAtEntry: number;
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  gameId?: string;
  round: number;
  matchNumber: number;
  player1Id?: string;
  player1?: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar'>;
  player2Id?: string;
  player2?: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar'>;
  winnerId?: string;
  winner?: Pick<import('./auth').User, 'id' | 'username' | 'displayName' | 'avatar'>;
  status: 'upcoming' | 'active' | 'completed';
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
}