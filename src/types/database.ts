// Database model types (extended from Prisma)
export type UserWithProfile = import('./auth').User & {
  profile: import('./auth').UserProfile | null;
  statistics: import('./auth').UserStatistics | null;
};

export type GameWithPlayersAndMoves = import('./game').Game & {
  players: (import('./game').PlayerGame & {
    user: import('./auth').User
  })[];
  moves: import('./game').GameMove[];
  puzzle: import('./game').Puzzle;
};

export type TournamentWithParticipants = import('./tournament').Tournament & {
  participants: (import('./tournament').TournamentParticipant & {
    user: import('./auth').User;
  })[];
  matches: import('./tournament').TournamentMatch[];
};