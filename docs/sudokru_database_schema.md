# Sudokru - Database Schema Documentation

## 1. Overview & Approach

### 1.1 Database Technology Choice
**Development Environment:** SQLite
- Lightweight, file-based database perfect for local development
- Zero configuration required
- Fast for single-user development scenarios
- Easy testing and seeding

**Production Environment:** PostgreSQL
- Superior performance for concurrent connections (1000+ users)
- Advanced indexing capabilities for complex queries
- JSON data type support for flexible game state storage
- Excellent Prisma ORM integration
- Robust backup and recovery options

### 1.2 ORM Strategy: Prisma
**Why Prisma:**
- Type-safe database queries with auto-generated TypeScript types
- Declarative schema definition with migration system
- Excellent Next.js integration
- Built-in connection pooling and query optimization
- Database introspection and visual schema management

### 1.3 Migration Strategy
**Development to Production Migration:**
1. SQLite schema development and testing
2. Prisma schema export to PostgreSQL format
3. Data migration scripts for existing users
4. Blue-green deployment for zero downtime
5. Connection string environment variable switching

## 2. Complete Prisma Schema

```prisma
// This is your Prisma schema file
// Learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // Change to "postgresql" for production
  url      = env("DATABASE_URL")
}

// ================================
// USER MANAGEMENT & AUTHENTICATION
// ================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String?   // Nullable for OAuth users
  emailVerified DateTime?
  
  // Profile Information
  profile       UserProfile?
  statistics    UserStatistics?
  subscription  UserSubscription?
  
  // Authentication
  accounts      Account[]
  sessions      Session[]
  
  // Game Relationships
  playerGames   PlayerGame[]
  createdGames  Game[]       @relation("GameCreator")
  gameInvites   GameInvite[]
  
  // Social Features
  sentFriendRequests     Friendship[] @relation("FriendshipRequester")
  receivedFriendRequests Friendship[] @relation("FriendshipRequestee")
  
  // Communication
  chatMessages  ChatMessage[]
  notifications Notification[]
  
  // Moderation
  reportsMade   Report[] @relation("ReportMaker")
  reportsAgainst Report[] @relation("ReportTarget")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

model UserProfile {
  id          String  @id @default(cuid())
  userId      String  @unique
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  displayName String?
  avatar      String? // URL to profile image
  bio         String?
  country     String?
  timezone    String?
  
  // Privacy Settings
  profileVisibility String @default("public") // public, friends, private
  allowFriendRequests Boolean @default(true)
  showOnlineStatus    Boolean @default(true)
  
  // Preferences
  preferredDifficulty String @default("medium") // easy, medium, hard, expert
  soundEnabled        Boolean @default(true)
  animationsEnabled   Boolean @default(true)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("user_profiles")
}

model UserStatistics {
  id     String @id @default(cuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Overall Statistics
  gamesPlayed       Int @default(0)
  gamesWon          Int @default(0)
  gamesLost         Int @default(0)
  gamesAbandoned    Int @default(0)
  
  // Performance Metrics
  totalPlayTime     Int @default(0) // in seconds
  averageSolveTime  Int @default(0) // in seconds
  bestSolveTime     Int @default(0) // in seconds
  currentStreak     Int @default(0)
  longestStreak     Int @default(0)
  
  // Skill Ratings
  eloRating         Int @default(1200)
  peakRating        Int @default(1200)
  
  // Difficulty Statistics
  easyWins          Int @default(0)
  easyPlayed        Int @default(0)
  mediumWins        Int @default(0)
  mediumPlayed      Int @default(0)
  hardWins          Int @default(0)
  hardPlayed        Int @default(0)
  expertWins        Int @default(0)
  expertPlayed      Int @default(0)
  
  // Tournament Statistics
  tournamentsEntered Int @default(0)
  tournamentWins     Int @default(0)
  tournamentPlacements Json @default("{}") // Store placement history
  
  lastActive DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@map("user_statistics")
}

model UserSubscription {
  id               String    @id @default(cuid())
  userId           String    @unique
  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  tier             String    @default("free") // free, premium
  stripeCustomerId String?   @unique
  stripeSubscriptionId String? @unique
  
  startDate        DateTime?
  endDate          DateTime?
  cancelAtPeriodEnd Boolean  @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("user_subscriptions")
}

// NextAuth.js required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
  @@map("verificationtokens")
}

// ================================
// GAME ENGINE & PUZZLES
// ================================

model Puzzle {
  id          String @id @default(cuid())
  difficulty  String // easy, medium, hard, expert
  
  // Puzzle Data
  initialGrid Json   // 9x9 array with given numbers
  solution    Json   // 9x9 array with complete solution
  clueCount   Int    // Number of given clues
  
  // Generation Metadata
  algorithm   String @default("backtracking")
  seed        String? // For reproducible generation
  complexity  Float?  // Algorithmic difficulty score
  
  // Usage Statistics
  timesPlayed Int @default(0)
  averageTime Int @default(0) // in seconds
  
  // Games using this puzzle
  games       Game[]
  
  createdAt DateTime @default(now())
  
  @@index([difficulty, timesPlayed])
  @@map("puzzles")
}

model Game {
  id        String @id @default(cuid())
  puzzleId  String
  puzzle    Puzzle @relation(fields: [puzzleId], references: [id])
  
  // Game Configuration
  type      String // competitive, collaborative, tournament, practice
  mode      String // speed, accuracy, casual
  difficulty String // easy, medium, hard, expert
  timeLimit Int?   // in seconds, null for unlimited
  
  // Game State
  status    String @default("waiting") // waiting, active, paused, completed, abandoned
  
  // Creator and Settings
  creatorId String
  creator   User   @relation("GameCreator", fields: [creatorId], references: [id])
  
  // Game Data
  settings  Json   @default("{}") // Additional game configuration
  metadata  Json   @default("{}") // Game-specific data
  
  // Timing
  startedAt   DateTime?
  completedAt DateTime?
  
  // Relationships
  players     PlayerGame[]
  moves       GameMove[]
  invites     GameInvite[]
  chatMessages ChatMessage[]
  
  // Tournament Relationship
  tournamentId String?
  tournament   Tournament? @relation(fields: [tournamentId], references: [id])
  tournamentMatch TournamentMatch?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([status, createdAt])
  @@index([type, difficulty])
  @@map("games")
}

model PlayerGame {
  id       String @id @default(cuid())
  gameId   String
  game     Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Player Status in Game
  status   String @default("joined") // joined, ready, playing, completed, disconnected
  role     String @default("player") // player, spectator
  
  // Game Performance
  currentGrid    Json?   // Player's current puzzle state
  moveCount      Int     @default(0)
  errorCount     Int     @default(0)
  hintCount      Int     @default(0)
  completionTime Int?    // in seconds
  
  // Results
  finalPosition  Int?    // Rank in competitive games
  score          Int     @default(0)
  isWinner       Boolean @default(false)
  
  // Timing
  joinedAt    DateTime @default(now())
  startedAt   DateTime?
  completedAt DateTime?
  
  @@unique([gameId, userId])
  @@index([userId, completedAt])
  @@map("player_games")
}

model GameMove {
  id        String @id @default(cuid())
  gameId    String
  game      Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId    String
  
  // Move Data
  row       Int
  col       Int
  value     Int    // 1-9, or 0 for clearing cell
  moveType  String @default("place") // place, clear, note
  
  // Move Context
  timeFromStart Int  // milliseconds from game start
  isCorrect     Boolean
  isHint        Boolean @default(false)
  
  // Validation
  validatedAt DateTime @default(now())
  
  @@index([gameId, timeFromStart])
  @@index([userId, validatedAt])
  @@map("game_moves")
}

model GameInvite {
  id         String @id @default(cuid())
  gameId     String
  game       Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  inviterId  String
  inviter    User   @relation(fields: [inviterId], references: [id], onDelete: Cascade)
  inviteeId  String
  invitee    User   @relation(fields: [inviteeId], references: [id], onDelete: Cascade)
  
  status     String @default("pending") // pending, accepted, declined, expired
  message    String?
  
  expiresAt  DateTime
  respondedAt DateTime?
  createdAt  DateTime @default(now())
  
  @@unique([gameId, inviteeId])
  @@map("game_invites")
}

// ================================
// TOURNAMENT SYSTEM
// ================================

model Tournament {
  id          String @id @default(cuid())
  name        String
  description String?
  
  // Tournament Configuration
  format      String // single_elimination, double_elimination, round_robin, swiss
  maxPlayers  Int
  difficulty  String // easy, medium, hard, expert
  timeLimit   Int?   // in seconds per game
  
  // Entry Requirements
  minRating   Int?
  maxRating   Int?
  entryFee    Int    @default(0) // in cents
  isPremiumOnly Boolean @default(false)
  
  // Tournament State
  status      String @default("upcoming") // upcoming, registration, active, completed, cancelled
  currentRound Int   @default(0)
  
  // Prize Information
  prizePool   Int    @default(0) // in cents
  prizeDistribution Json @default("{}") // How prizes are distributed
  
  // Scheduling
  registrationStart DateTime
  registrationEnd   DateTime
  startTime        DateTime
  endTime          DateTime?
  
  // Relationships
  participants TournamentParticipant[]
  matches      TournamentMatch[]
  games        Game[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([status, startTime])
  @@index([difficulty, minRating])
  @@map("tournaments")
}

model TournamentParticipant {
  id           String @id @default(cuid())
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id], onDelete: Cascade)
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Participation Details
  seedPosition Int?
  currentRound Int    @default(0)
  isEliminated Boolean @default(false)
  finalPosition Int?
  
  // Registration Info
  registeredAt DateTime @default(now())
  ratingAtEntry Int
  
  @@unique([tournamentId, userId])
  @@index([tournamentId, seedPosition])
  @@map("tournament_participants")
}

model TournamentMatch {
  id           String @id @default(cuid())
  tournamentId String
  tournament   Tournament @relation(fields: [tournamentId], references: [id], onDelete: Cascade)
  gameId       String     @unique
  game         Game       @relation(fields: [gameId], references: [id], onDelete: Cascade)
  
  // Match Details
  round        Int
  matchNumber  Int
  
  // Bracket Information
  player1Id    String?
  player2Id    String?
  winnerId     String?
  
  // Scheduling
  scheduledAt  DateTime?
  startedAt    DateTime?
  completedAt  DateTime?
  
  @@unique([tournamentId, round, matchNumber])
  @@index([tournamentId, round])
  @@map("tournament_matches")
}

// ================================
// SOCIAL FEATURES
// ================================

model Friendship {
  id          String @id @default(cuid())
  requesterId String
  requester   User   @relation("FriendshipRequester", fields: [requesterId], references: [id], onDelete: Cascade)
  requesteeId String
  requestee   User   @relation("FriendshipRequestee", fields: [requesteeId], references: [id], onDelete: Cascade)
  
  status      String @default("pending") // pending, accepted, blocked
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([requesterId, requesteeId])
  @@index([requesteeId, status])
  @@map("friendships")
}

model ChatMessage {
  id       String @id @default(cuid())
  gameId   String?
  game     Game?  @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  content  String
  type     String @default("message") // message, system, moderation
  
  // Moderation
  isDeleted Boolean @default(false)
  isEdited  Boolean @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([gameId, createdAt])
  @@map("chat_messages")
}

model Notification {
  id      String @id @default(cuid())
  userId  String
  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type    String // friend_request, game_invite, tournament_start, achievement, etc.
  title   String
  message String
  data    Json?  // Additional notification data
  
  isRead  Boolean @default(false)
  
  createdAt DateTime @default(now())
  
  @@index([userId, isRead, createdAt])
  @@map("notifications")
}

// ================================
// ACHIEVEMENTS & MODERATION
// ================================

model Achievement {
  id          String @id @default(cuid())
  key         String @unique // Internal identifier
  name        String
  description String
  icon        String
  category    String // skill, social, persistence, special
  
  // Requirements
  requirements Json // Conditions for earning this achievement
  points       Int  @default(0)
  rarity       String @default("common") // common, rare, epic, legendary
  
  // User Achievement Relationships
  userAchievements UserAchievement[]
  
  isActive Boolean @default(true)
  createdAt DateTime @default(now())
  
  @@map("achievements")
}

model UserAchievement {
  id            String @id @default(cuid())
  userId        String
  user          User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  
  progress      Json?    // Current progress toward achievement
  earnedAt      DateTime @default(now())
  
  @@unique([userId, achievementId])
  @@index([userId, earnedAt])
  @@map("user_achievements")
}

model Report {
  id         String @id @default(cuid())
  reporterId String
  reporter   User   @relation("ReportMaker", fields: [reporterId], references: [id], onDelete: Cascade)
  targetId   String
  target     User   @relation("ReportTarget", fields: [targetId], references: [id], onDelete: Cascade)
  
  type       String // cheating, harassment, inappropriate_content, spam
  reason     String
  evidence   Json?  // Screenshots, game logs, etc.
  
  status     String @default("pending") // pending, investigating, resolved, dismissed
  resolution String?
  
  createdAt  DateTime @default(now())
  resolvedAt DateTime?
  
  @@index([status, createdAt])
  @@map("reports")
}

// Add UserAchievement relation to User model
model UserAchievement {
  // ... existing fields ...
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  // ... rest of model ...
}

// ================================
// ANALYTICS & LOGGING
// ================================

model GameAnalytics {
  id       String @id @default(cuid())
  gameId   String
  
  // Performance Metrics
  duration Int    // Game duration in seconds
  moves    Int    // Total moves made
  errors   Int    // Total errors made
  hints    Int    // Total hints used
  
  // Player Metrics
  playerCount     Int
  completionRate  Float // Percentage of players who completed
  averageRating   Float // Average ELO of participants
  
  // Engagement Metrics
  chatMessages    Int    @default(0)
  spectatorCount  Int    @default(0)
  reconnections   Int    @default(0)
  
  createdAt DateTime @default(now())
  
  @@index([createdAt])
  @@map("game_analytics")
}
```

## 3. Entity Specifications

### 3.1 User Management Entities

**User Entity**
- **Purpose:** Core user identity and authentication
- **Key Fields:** Unique email/username, password hash for local auth
- **Relationships:** One-to-one with profile, statistics, subscription
- **Business Rules:** 
  - Username must be 3-20 characters, alphanumeric + underscore
  - Email verification required for premium features
  - Soft delete preserves game history

**UserProfile Entity**
- **Purpose:** User preferences and display information
- **Key Fields:** Display name, avatar, timezone, privacy settings
- **Business Rules:**
  - Display name can differ from username
  - Avatar URLs validated for security
  - Timezone used for tournament scheduling

**UserStatistics Entity**
- **Purpose:** Comprehensive performance tracking and ELO system
- **Key Fields:** ELO rating, game counts, time metrics, streaks
- **Business Rules:**
  - ELO starts at 1200, ranges 800-2400
  - Statistics updated after each completed game
  - Peak rating preserved for achievement tracking

### 3.2 Game Engine Entities

**Puzzle Entity**
- **Purpose:** Sudoku puzzle storage with metadata
- **Key Fields:** Grid data (JSON), solution, difficulty, complexity
- **Business Rules:**
  - Each puzzle validated for unique solution
  - Difficulty based on clue count and algorithmic complexity
  - Usage statistics for difficulty balancing

**Game Entity**
- **Purpose:** Game session orchestration and configuration
- **Key Fields:** Type, status, settings, timing data
- **Business Rules:**
  - Status transitions: waiting → active → completed/abandoned
  - Time limits enforced server-side
  - Game settings immutable after start

**PlayerGame Entity**
- **Purpose:** Individual player participation in specific game
- **Key Fields:** Current grid state, move count, completion time
- **Business Rules:**
  - Grid state synchronized in real-time
  - Move validation prevents invalid Sudoku states
  - Completion time includes pause duration

### 3.3 Tournament System Entities

**Tournament Entity**
- **Purpose:** Organized competitive events with brackets
- **Key Fields:** Format, player limits, scheduling, prize information
- **Business Rules:**
  - Registration closes at start time
  - Prize pools distributed according to configuration
  - Rating requirements enforced at registration

**TournamentMatch Entity**
- **Purpose:** Individual tournament bracket matches
- **Key Fields:** Round number, player assignments, winner determination
- **Business Rules:**
  - Bracket progression automated
  - Bye rounds handled automatically
  - Winner advances to next round

## 4. Relationships & Constraints

### 4.1 Primary Relationships

**User → Games (One-to-Many)**
```prisma
User {
  playerGames   PlayerGame[]  // Games participated in
  createdGames  Game[]        // Games created/hosted
}
```

**Game → Players (Many-to-Many via PlayerGame)**
```prisma
Game {
  players PlayerGame[]
}
PlayerGame {
  game Game
  user User
}
```

**Tournament → Participants (Many-to-Many)**
```prisma
Tournament {
  participants TournamentParticipant[]
  matches      TournamentMatch[]
}
```

### 4.2 Referential Integrity Rules

**Cascade Deletions:**
- User deletion cascades to profile, statistics, subscription
- Game deletion cascades to player games, moves, chat messages
- Tournament deletion cascades to participants and matches

**Constraint Validations:**
- Unique constraints on email, username, provider combinations
- Check constraints on ratings (800-2400), difficulty levels
- Foreign key constraints with proper indexing

### 4.3 Data Consistency Rules

**Game State Consistency:**
- PlayerGame.currentGrid must be valid Sudoku state
- Game.status transitions enforced by application logic
- Move timestamps must be sequential within game

**Rating System Consistency:**
- ELO updates atomic with game completion
- Peak rating never decreases
- Tournament entry ratings captured at registration

## 5. Performance Considerations

### 5.1 Indexing Strategy

**Critical Indexes:**
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Game queries
CREATE INDEX idx_games_status_created ON games(status, created_at);
CREATE INDEX idx_games_type_difficulty ON games(type, difficulty);

-- Real-time game moves
CREATE INDEX idx_game_moves_game_time ON game_moves(game_id, time_from_start);

-- Tournament queries
CREATE INDEX idx_tournaments_status_start ON tournaments(status, start_time);
CREATE INDEX idx_tournament_participants_tournament_seed ON tournament_participants(tournament_id, seed_position);

-- Statistics and leaderboards
CREATE INDEX idx_user_statistics_rating ON user_statistics(elo_rating DESC, last_active DESC);
CREATE INDEX idx_user_statistics_user_active ON user_statistics(user_id, last_active);

-- Social features
CREATE INDEX idx_friendships_requestee_status ON friendships(requestee_id, status);
CREATE INDEX idx_notifications_user_read_created ON notifications(user_id, is_read, created_at DESC);

-- Analytics
CREATE INDEX idx_game_analytics_created ON game_analytics(created_at);
```

**Composite Indexes for Complex Queries:**
```sql
-- Matchmaking queries
CREATE INDEX idx_matchmaking ON user_statistics(elo_rating, last_active) 
WHERE last_active > NOW() - INTERVAL '7 days';

-- Tournament leaderboards
CREATE INDEX idx_tournament_leaderboard ON tournament_participants(tournament_id, final_position) 
WHERE final_position IS NOT NULL;

-- Game history
CREATE INDEX idx_player_game_history ON player_games(user_id, completed_at DESC) 
WHERE completed_at IS NOT NULL;
```

### 5.2 Query Optimization Patterns

**Efficient Matchmaking Query:**
```sql
-- Find players within rating range for matchmaking
SELECT u.id, u.username, us.elo_rating
FROM users u
JOIN user_statistics us ON u.id = us.user_id
WHERE us.elo_rating BETWEEN ? - 100 AND ? + 100
  AND us.last_active > NOW() - INTERVAL '10 minutes'
  AND u.id NOT IN (
    SELECT user_id FROM player_games 
    WHERE status IN ('joined', 'ready', 'playing')
  )
ORDER BY ABS(us.elo_rating - ?) ASC
LIMIT 10;
```

**Real-time Game State Query:**
```sql
-- Get current game state for real-time updates
SELECT 
  g.id, g.status, g.started_at,
  pg.user_id, pg.current_grid, pg.move_count,
  u.username, up.display_name
FROM games g
JOIN player_games pg ON g.id = pg.game_id
JOIN users u ON pg.user_id = u.id
LEFT JOIN user_profiles up ON u.id = up.user_id
WHERE g.id = ? AND g.status = 'active';
```

### 5.3 Scaling Considerations

**Connection Pooling:**
```javascript
// Prisma connection pooling configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
  connectionLimit: 100,
});
```

**Read Replicas for Analytics:**
- User statistics and leaderboards served from read replicas
- Game analytics queries isolated from transactional operations
- Tournament bracket queries cached and served from CDN

**Partitioning Strategy:**
- Game moves partitioned by date for archival
- Chat messages partitioned by game_id for isolation
- Analytics data partitioned monthly for performance

## 6. Migration & Deployment Plan

### 6.1 Initial Development Setup

**Step 1: Project Initialization**
```bash
# Initialize Next.js project with Prisma
npx create-next-app@latest sudokru --typescript --tailwind --eslint
cd sudokru
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

**Step 2: Schema Implementation**
```bash
# Copy the complete schema to prisma/schema.prisma
# Generate initial migration
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed development database
npx prisma db seed
```

**Step 3: Development Database Seeding**
```javascript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test users
  const testUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@sudokru.com',
        username: 'alice_solver',
        passwordHash: await bcrypt.hash('password123', 10),
        profile: {
          create: {
            displayName: 'Alice the Solver',
            preferredDifficulty: 'medium',
          }
        },
        statistics: {
          create: {
            eloRating: 1300,
            gamesPlayed: 50,
            gamesWon: 32,
          }
        }
      }
    }),
    // Add more test users...
  ]);

  // Create test puzzles
  const testPuzzles = await Promise.all([
    prisma.puzzle.create({
      data: {
        difficulty: 'easy',
        initialGrid: generateEasyPuzzle(),
        solution: generateEasySolution(),
        clueCount: 40,
      }
    }),
    // Add more test puzzles...
  ]);

  console.log('Database seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

### 6.2 Production Migration Strategy

**Phase 1: PostgreSQL Preparation**
```bash
# Update schema for PostgreSQL
# In prisma/schema.prisma, change:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# Create production migration
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

**Phase 2: Data Migration Script**
```javascript
// scripts/migrate-to-postgres.js
import { PrismaClient as SQLiteClient } from '@prisma/client-sqlite';
import { PrismaClient as PostgresClient } from '@prisma/client';

async function migrateData() {
  const sqlite = new SQLiteClient({ datasources: { db: { url: 'file:./dev.db' } } });
  const postgres = new PostgresClient();

  // Migrate users
  const users = await sqlite.user.findMany({
    include: { profile: true, statistics: true, subscription: true }
  });

  for (const user of users) {
    await postgres.user.create({
      data: {
        ...user,
        profile: user.profile ? { create: user.profile } : undefined,
        statistics: user.statistics ? { create: user.statistics } : undefined,
        subscription: user.subscription ? { create: user.subscription } : undefined,
      }
    });
  }

  // Continue with other entities...
  console.log('Migration completed successfully');
}
```

**Phase 3: Zero-Downtime Deployment**
```yaml
# deployment.yml
steps:
  1. Deploy new application version with PostgreSQL support
  2. Run data migration script during maintenance window
  3. Update environment variables to point to PostgreSQL
  4. Verify data integrity with automated tests
  5. Switch traffic to new database
  6. Monitor for issues and rollback if necessary
```

## 7. Development Workflow

### 7.1 Schema Change Process

**Making Schema Changes:**
```bash
# 1. Modify prisma/schema.prisma
# 2. Create and apply migration
npx prisma migrate dev --name add_tournament_features

# 3. Regenerate Prisma client
npx prisma generate

# 4. Update TypeScript types in application
npm run type-check
```

**Migration Best Practices:**
- Always create descriptive migration names
- Test migrations on development data first
- Include rollback scripts for production changes
- Coordinate schema changes with application deployments

### 7.2 Development Database Management

**Reset Development Database:**
```bash
# Complete reset (WARNING: Destroys all data)
npx prisma migrate reset

# Soft reset (preserves schema, clears data)
npx prisma db push --force-reset
npx prisma db seed
```

**Database Introspection:**
```bash
# View current schema
npx prisma db pull

# Open Prisma Studio for data browsing
npx prisma studio
```

### 7.3 Testing Database Operations

**Test Database Setup:**
```javascript
// tests/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'sqlite:./test.db',
    },
  },
});

export async function setupTestDatabase() {
  await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
  // Add test data setup
}

export async function teardownTestDatabase() {
  await prisma.$disconnect();
}
```

## 8. TypeScript Integration

### 8.1 Generated Types

**Prisma Client Types:**
```typescript
// Auto-generated by Prisma
import { User, Game, Tournament } from '@prisma/client';

// Extended types with relations
import type { 
  UserWithProfile,
  GameWithPlayersAndMoves,
  TournamentWithParticipants 
} from '@/types/database';

type UserWithProfile = User & {
  profile: UserProfile | null;
  statistics: UserStatistics | null;
};

type GameWithPlayersAndMoves = Game & {
  players: (PlayerGame & { user: User })[];
  moves: GameMove[];
  puzzle: Puzzle;
};
```

### 8.2 Custom Type Definitions

**Game State Types:**
```typescript
// types/game.ts
export interface GameState {
  gameId: string;
  grid: number[][]; // 9x9 Sudoku grid
  players: PlayerGameState[];
  timeRemaining?: number;
  status: 'waiting' | 'active' | 'paused' | 'completed';
}

export interface PlayerGameState {
  userId: string;
  username: string;
  currentGrid: number[][];
  moveCount: number;
  errorCount: number;
  isComplete: boolean;
}

export interface SudokuMove {
  row: number;
  col: number;
  value: number;
  timestamp: number;
  isValid: boolean;
}
```

### 8.3 Validation Schemas

**Zod Integration for Type Safety:**
```typescript
// lib/validations.ts
import { z } from 'zod';

export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8),
});

export const GameMoveSchema = z.object({
  gameId: z.string().cuid(),
  row: z.number().int().min(0).max(8),
  col: z.number().int().min(0).max(8),
  value: z.number().int().min(0).max(9),
});

export const TournamentCreateSchema = z.object({
  name: z.string().min(3).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  maxPlayers: z.number().int().min(8).max(128),
  startTime: z.date().min(new Date()),
});
```

## 9. Common Query Patterns

### 9.1 User Management Queries

**User Profile with Statistics:**
```typescript
async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      statistics: true,
      subscription: true,
      _count: {
        select: {
          sentFriendRequests: { where: { status: 'accepted' } },
          receivedFriendRequests: { where: { status: 'accepted' } },
        }
      }
    }
  });
}
```

**Leaderboard Query:**
```typescript
async function getLeaderboard(limit: number = 100) {
  return await prisma.userStatistics.findMany({
    take: limit,
    orderBy: [
      { eloRating: 'desc' },
      { lastActive: 'desc' }
    ],
    include: {
      user: {
        include: {
          profile: {
            select: { displayName: true, avatar: true, country: true }
          }
        }
      }
    },
    where: {
      gamesPlayed: { gte: 10 }, // Minimum games for ranking
      lastActive: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Active in last 30 days
    }
  });
}
```

### 9.2 Game Management Queries

**Active Games for User:**
```typescript
async function getUserActiveGames(userId: string) {
  return await prisma.playerGame.findMany({
    where: {
      userId,
      status: { in: ['joined', 'ready', 'playing'] }
    },
    include: {
      game: {
        include: {
          puzzle: { select: { difficulty: true } },
          players: {
            include: {
              user: {
                select: { username: true, profile: { select: { displayName: true } } }
              }
            }
          }
        }
      }
    }
  });
}
```

**Game History with Performance:**
```typescript
async function getGameHistory(userId: string, page: number = 1, limit: number = 20) {
  return await prisma.playerGame.findMany({
    where: {
      userId,
      completedAt: { not: null }
    },
    include: {
      game: {
        select: {
          type: true,
          difficulty: true,
          startedAt: true,
          completedAt: true,
          _count: { select: { players: true } }
        }
      }
    },
    orderBy: { completedAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  });
}
```

### 9.3 Real-time Game Queries

**Game State Update:**
```typescript
async function updateGameState(gameId: string, userId: string, move: SudokuMove) {
  return await prisma.$transaction(async (tx) => {
    // Record the move
    await tx.gameMove.create({
      data: {
        gameId,
        userId,
        row: move.row,
        col: move.col,
        value: move.value,
        timeFromStart: move.timestamp,
        isCorrect: move.isValid
      }
    });

    // Update player's current grid
    await tx.playerGame.update({
      where: {
        gameId_userId: { gameId, userId }
      },
      data: {
        currentGrid: move.newGrid,
        moveCount: { increment: 1 },
        errorCount: move.isValid ? undefined : { increment: 1 }
      }
    });

    // Check for game completion
    if (move.isComplete) {
      await tx.playerGame.update({
        where: {
          gameId_userId: { gameId, userId }
        },
        data: {
          status: 'completed',
          completedAt: new Date(),
          completionTime: move.timestamp
        }
      });
    }

    return tx.game.findUnique({
      where: { id: gameId },
      include: {
        players: {
          include: {
            user: { select: { username: true } }
          }
        }
      }
    });
  });
}
```

## 10. Troubleshooting Guide

### 10.1 Common Migration Issues

**Issue: Migration Fails Due to Data Constraints**
```bash
# Solution: Create custom migration with data transformation
npx prisma migrate dev --create-only --name fix_constraint_violation

# Edit generated migration file to handle data transformation
# Then apply the migration
npx prisma migrate dev
```

**Issue: Schema Drift Between Environments**
```bash
# Solution: Reset and regenerate migrations
npx prisma migrate reset
npx prisma db push
npx prisma migrate dev --name recreate_schema
```

### 10.2 Performance Issues

**Issue: Slow Query Performance**
```sql
-- Analyze query execution plan
EXPLAIN ANALYZE SELECT * FROM games WHERE status = 'active';

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_games_status ON games(status);
```

**Issue: Connection Pool Exhaustion**
```javascript
// Solution: Implement connection management
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?connection_limit=20&pool_timeout=20`
    }
  }
});

// Ensure proper cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

### 10.3 Development Workflow Issues

**Issue: Prisma Client Out of Sync**
```bash
# Solution: Regenerate client and reset if necessary
npx prisma generate
npm run type-check

# If types still don't match, reset and regenerate
npx prisma migrate reset
npx prisma generate
```

**Issue: Test Database Conflicts**
```javascript
// Solution: Use test-specific database configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'test' 
        ? 'sqlite:./test.db' 
        : process.env.DATABASE_URL
    }
  }
});
```

This comprehensive database schema documentation provides the foundation for Sudokru's data architecture, ensuring scalable, performant, and maintainable database operations throughout the application lifecycle.