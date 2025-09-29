# Sudokru - Project Folder Structure Document

## 1. Root Directory Structure

```
sudokru/
├── .env.local                    # Local environment variables
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── README.md                    # Project documentation
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # Project license
│
├── public/                      # Static assets
├── src/                         # Source code
├── prisma/                      # Database schema and migrations
├── docs/                        # Project documentation
├── scripts/                     # Build and deployment scripts
├── tests/                       # Test configuration and utilities
└── .vscode/                     # VS Code workspace settings
```

## 2. Source Code Organization (`src/`)

```
src/
├── app/                         # Next.js App Router pages and layouts
│   ├── (auth)/                  # Authentication route group
│   ├── (dashboard)/             # Dashboard route group
│   ├── api/                     # API routes
│   ├── game/                    # Game-specific routes
│   ├── tournaments/             # Tournament routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error UI
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home page
│
├── components/                  # Reusable UI components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   ├── game/                    # Game-specific components
│   ├── tournament/              # Tournament components
│   ├── auth/                    # Authentication components
│   ├── layout/                  # Layout components
│   ├── forms/                   # Form components
│   ├── charts/                  # Data visualization components
│   └── providers/               # React context providers
│
├── lib/                         # Utility libraries and configurations
│   ├── utils.ts                 # General utility functions
│   ├── constants.ts             # Application constants
│   ├── validations.ts           # Zod validation schemas
│   ├── api.ts                   # API client configuration
│   ├── websocket.ts             # WebSocket service
│   ├── auth.ts                  # Authentication utilities
│   ├── game-engine.ts           # Sudoku game logic
│   ├── db.ts                    # Database client
│   └── middleware.ts            # Custom middleware
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts               # Authentication hook
│   ├── useGame.ts               # Game state management
│   ├── useWebSocket.ts          # WebSocket connection
│   ├── useApi.ts                # API request hook
│   ├── useTournament.ts         # Tournament management
│   ├── useLocalStorage.ts       # Local storage hook
│   └── useDebounce.ts           # Debounce utility hook
│
├── stores/                      # Zustand state management
│   ├── index.ts                 # Store composition
│   ├── auth-slice.ts            # Authentication state
│   ├── game-slice.ts            # Game state
│   ├── ui-slice.ts              # UI state
│   ├── tournament-slice.ts      # Tournament state
│   └── settings-slice.ts        # User settings state
│
├── types/                       # TypeScript type definitions
│   ├── index.ts                 # Exported types
│   ├── auth.ts                  # Authentication types
│   ├── game.ts                  # Game-related types
│   ├── tournament.ts            # Tournament types
│   ├── api.ts                   # API response types
│   └── database.ts              # Database model types
│
└── styles/                      # Styling files
    ├── globals.css              # Global CSS
    ├── components.css           # Component-specific styles
    └── themes/                  # Theme configurations
        ├── light.css            # Light theme
        └── dark.css             # Dark theme
```

## 3. Detailed Directory Explanations

### 3.1 App Router Structure (`src/app/`)

```typescript
// Route group organization for authentication
src/app/(auth)/
├── layout.tsx                  # Auth layout (centered forms, no nav)
├── login/
│   ├── page.tsx               # Login page
│   └── loading.tsx            # Login loading state
├── register/
│   ├── page.tsx               # Registration page
│   └── loading.tsx            # Registration loading state
├── forgot-password/
│   └── page.tsx               # Password reset page
└── verify-email/
    └── page.tsx               # Email verification page

// Dashboard route group
src/app/(dashboard)/
├── layout.tsx                 # Dashboard layout (sidebar, header)
├── dashboard/
│   ├── page.tsx              # Main dashboard
│   └── loading.tsx           # Dashboard loading
├── profile/
│   ├── page.tsx              # User profile
│   ├── edit/
│   │   └── page.tsx          # Edit profile
│   └── statistics/
│       └── page.tsx          # User statistics
├── friends/
│   ├── page.tsx              # Friends list
│   └── requests/
│       └── page.tsx          # Friend requests
└── settings/
    ├── page.tsx              # Settings overview
    ├── account/
    │   └── page.tsx          # Account settings
    ├── privacy/
    │   └── page.tsx          # Privacy settings
    └── subscription/
        └── page.tsx          # Subscription management

// Game routes
src/app/game/
├── [gameId]/
│   ├── page.tsx              # Game room
│   ├── loading.tsx           # Game loading
│   ├── spectate/
│   │   └── page.tsx          # Spectator mode
│   └── replay/
│       └── page.tsx          # Game replay
└── create/
    └── page.tsx              # Create game form

// API routes
src/app/api/
├── auth/
│   ├── login/
│   │   └── route.ts          # POST /api/auth/login
│   ├── register/
│   │   └── route.ts          # POST /api/auth/register
│   ├── refresh/
│   │   └── route.ts          # POST /api/auth/refresh
│   └── logout/
│       └── route.ts          # POST /api/auth/logout
├── games/
│   ├── route.ts              # GET/POST /api/games
│   ├── [gameId]/
│   │   ├── route.ts          # GET/PUT/DELETE /api/games/[id]
│   │   ├── join/
│   │   │   └── route.ts      # POST /api/games/[id]/join
│   │   ├── moves/
│   │   │   └── route.ts      # GET/POST /api/games/[id]/moves
│   │   └── chat/
│   │       └── route.ts      # GET/POST /api/games/[id]/chat
│   └── public/
│       └── route.ts          # GET /api/games/public
└── tournaments/
    ├── route.ts              # GET/POST /api/tournaments
    └── [tournamentId]/
        ├── route.ts          # GET /api/tournaments/[id]
        ├── register/
        │   └── route.ts      # POST /api/tournaments/[id]/register
        └── bracket/
            └── route.ts      # GET /api/tournaments/[id]/bracket
```

### 3.2 Components Organization (`src/components/`)

```typescript
// Base UI components (shadcn/ui based)
src/components/ui/
├── button.tsx                 # Button component variants
├── input.tsx                  # Input field component
├── textarea.tsx               # Textarea component
├── select.tsx                 # Select dropdown
├── dialog.tsx                 # Modal dialog
├── dropdown-menu.tsx          # Dropdown menu
├── toast.tsx                  # Toast notifications
├── avatar.tsx                 # User avatar component
├── badge.tsx                  # Status badges
├── card.tsx                   # Card container
├── skeleton.tsx               # Loading skeletons
├── progress.tsx               # Progress bars
├── tabs.tsx                   # Tab navigation
├── tooltip.tsx                # Tooltip component
└── form.tsx                   # Form wrapper

// Game-specific components
src/components/game/
├── SudokuGrid.tsx             # Main Sudoku grid component
├── SudokuCell.tsx             # Individual cell component
├── GameStatus.tsx             # Game status display
├── PlayerList.tsx             # Active players list
├── GameControls.tsx           # Game action buttons
├── GameTimer.tsx              # Timer component
├── GameChat.tsx               # In-game chat
├── GameHistory.tsx            # Move history
├── GameSettings.tsx           # Game configuration
├── DifficultySelector.tsx     # Difficulty picker
├── GameInvite.tsx             # Invite friends modal
├── GameResults.tsx            # End game results
├── SpectatorMode.tsx          # Spectator interface
└── GameSkeleton.tsx           # Loading skeleton

// Tournament components
src/components/tournament/
├── TournamentCard.tsx         # Tournament preview card
├── TournamentList.tsx         # Tournament listing
├── TournamentBracket.tsx      # Bracket visualization
├── TournamentMatch.tsx        # Individual match component
├── TournamentRegistration.tsx # Registration form
├── TournamentRules.tsx        # Rules display
├── TournamentPrizes.tsx       # Prize information
├── TournamentChat.tsx         # Tournament chat
└── TournamentCountdown.tsx    # Start countdown

// Authentication components
src/components/auth/
├── LoginForm.tsx              # Login form
├── RegisterForm.tsx           # Registration form
├── ForgotPasswordForm.tsx     # Password reset form
├── OAuthButtons.tsx           # Social login buttons
├── AuthLayout.tsx             # Auth pages layout
├── ProtectedRoute.tsx         # Route protection
└── AuthGuard.tsx              # Authentication guard

// Layout components
src/components/layout/
├── Header.tsx                 # Main header
├── Sidebar.tsx                # Dashboard sidebar
├── Footer.tsx                 # Site footer
├── Navigation.tsx             # Main navigation
├── UserMenu.tsx               # User dropdown menu
├── NotificationCenter.tsx     # Notifications
├── MobileMenu.tsx             # Mobile navigation
├── Breadcrumbs.tsx            # Breadcrumb navigation
└── PageHeader.tsx             # Page title section

// Form components
src/components/forms/
├── ProfileForm.tsx            # User profile editing
├── GameCreationForm.tsx       # Create game form
├── TournamentForm.tsx         # Tournament creation
├── SettingsForm.tsx           # Settings management
├── FriendRequestForm.tsx      # Send friend request
├── ReportForm.tsx             # Report user/content
└── FeedbackForm.tsx           # User feedback

// Chart and analytics components
src/components/charts/
├── PerformanceChart.tsx       # User performance over time
├── RatingChart.tsx            # Rating progression
├── StatisticsCard.tsx         # Stat display cards
├── LeaderboardTable.tsx       # Leaderboard display
├── TournamentStats.tsx        # Tournament statistics
└── GameAnalytics.tsx          # Game performance metrics
```

### 3.3 Library Organization (`src/lib/`)

```typescript
// Utility functions
src/lib/utils.ts
export function cn(...inputs: ClassValue[]): string;
export function formatTime(seconds: number): string;
export function generateId(): string;
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;

// Application constants
src/lib/constants.ts
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard', 'expert'] as const;
export const GAME_TYPES = ['competitive', 'collaborative', 'practice'] as const;
export const TOURNAMENT_FORMATS = ['single_elimination', 'double_elimination'] as const;
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  GAMES: '/api/games',
  TOURNAMENTS: '/api/tournaments',
} as const;

// Validation schemas
src/lib/validations.ts
import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export const gameCreationSchema = z.object({
  type: z.enum(['competitive', 'collaborative', 'practice']),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  maxPlayers: z.number().min(2).max(8),
  timeLimit: z.number().optional(),
});

// Game engine logic
src/lib/game-engine.ts
export class SudokuEngine {
  static validateMove(grid: number[][], row: number, col: number, value: number): boolean;
  static generatePuzzle(difficulty: 'easy' | 'medium' | 'hard' | 'expert'): PuzzleData;
  static solvePuzzle(grid: number[][]): number[][] | null;
  static checkCompletion(grid: number[][]): boolean;
  static calculateDifficulty(grid: number[][]): number;
}
```

### 3.4 Hooks Organization (`src/hooks/`)

```typescript
// Authentication hook
src/hooks/useAuth.ts
export function useAuth() {
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
  };
}

// Game management hook
src/hooks/useGame.ts
export function useGame(gameId: string) {
  return {
    game,
    gameState,
    players,
    isLoading,
    error,
    makeMove,
    joinGame,
    leaveGame,
  };
}

// WebSocket connection hook
src/hooks/useWebSocket.ts
export function useWebSocket() {
  return {
    isConnected,
    connectionError,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
}
```

### 3.5 Type Definitions (`src/types/`)

```typescript
// Game types
src/types/game.ts
export interface Game {
  id: string;
  type: GameType;
  status: GameStatus;
  difficulty: Difficulty;
  players: Player[];
  puzzle: Puzzle;
  settings: GameSettings;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface GameState {
  gameId: string;
  grid: number[][];
  timeRemaining?: number;
  currentTurn?: string;
  moves: Move[];
}

// Authentication types
src/types/auth.ts
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  rating: number;
  subscription: SubscriptionTier;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

## 4. Naming Conventions

### 4.1 File Naming Rules

**Components:**
- PascalCase for component files: `SudokuGrid.tsx`, `GameStatus.tsx`
- kebab-case for utility files: `game-engine.ts`, `api-client.ts`
- camelCase for hook files: `useAuth.ts`, `useGame.ts`

**Directories:**
- kebab-case for feature directories: `tournament/`, `game-chat/`
- lowercase for generic directories: `components/`, `hooks/`, `types/`

**API Routes:**
- kebab-case for route directories: `forgot-password/`, `verify-email/`
- Dynamic segments in brackets: `[gameId]/`, `[userId]/`

### 4.2 Import/Export Patterns

```typescript
// Barrel exports for clean imports
// src/components/index.ts
export { Button } from './ui/button';
export { Input } from './ui/input';
export { SudokuGrid } from './game/SudokuGrid';
export { GameStatus } from './game/GameStatus';

// Named exports for utilities
// src/lib/index.ts
export { cn, formatTime, generateId } from './utils';
export { SudokuEngine } from './game-engine';
export { websocketService } from './websocket';

// Default exports for pages and layouts
// src/app/page.tsx
export default function HomePage() {
  return <div>Home</div>;
}

// Named exports for API routes
// src/app/api/games/route.ts
export async function GET(request: Request) {
  // Implementation
}
export async function POST(request: Request) {
  // Implementation
}
```

### 4.3 Component File Structure

```typescript
// Standard component file structure
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { GameProps } from '@/types/game';

// 1. Interface definitions
interface SudokuGridProps {
  initialGrid: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
  className?: string;
}

// 2. Main component
export const SudokuGrid = ({
  initialGrid,
  onCellChange,
  className
}: SudokuGridProps) => {
  // 3. State and hooks
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  
  // 4. Event handlers
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  // 5. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 6. Render
  return (
    <div className={cn('sudoku-grid', className)}>
      {/* Component JSX */}
    </div>
  );
};

// 7. Default export (if needed)
export default SudokuGrid;
```

## 5. Module Boundaries

### 5.1 Feature-Based Organization

```typescript
// Game feature module
src/features/game/
├── components/
│   ├── SudokuGrid.tsx
│   ├── GameStatus.tsx
│   └── GameControls.tsx
├── hooks/
│   ├── useGame.ts
│   └── useGameState.ts
├── stores/
│   └── game-slice.ts
├── types/
│   └── game.ts
└── utils/
    └── game-engine.ts

// Tournament feature module
src/features/tournament/
├── components/
│   ├── TournamentBracket.tsx
│   └── TournamentCard.tsx
├── hooks/
│   └── useTournament.ts
├── stores/
│   └── tournament-slice.ts
├── types/
│   └── tournament.ts
└── utils/
    └── bracket-generator.ts
```

### 5.2 Shared vs Feature-Specific

**Shared modules (src/shared/):**
- UI components used across features
- Common utilities and helpers
- Global type definitions
- Authentication and authorization

**Feature-specific modules:**
- Business logic specific to one feature
- Feature-specific components
- Feature state management
- Feature-specific types

### 5.3 Import Rules

```typescript
// Allowed imports
import { Button } from '@/components/ui/button';           // Shared UI
import { useAuth } from '@/hooks/useAuth';                  // Shared hook
import { GameType } from '@/types/game';                    // Feature type
import { cn } from '@/lib/utils';                           // Shared utility

// Restricted imports (avoid)
import { TournamentBracket } from '../tournament/components/TournamentBracket'; // Cross-feature
import GameSlice from '../../stores/game-slice';           // Relative paths for distant modules
```

## 6. Configuration Files

### 6.1 Environment Configuration

```bash
# .env.example
# Database
DATABASE_URL="sqlite:./dev.db"
DATABASE_URL_PROD="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Real-time
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3001"

# External Services
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
SENDGRID_API_KEY="SG...."

# Analytics
NEXT_PUBLIC_ANALYTICS_ID="GA_MEASUREMENT_ID"
```

### 6.2 VS Code Workspace Settings

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}

// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

This comprehensive folder structure provides clear organization for Sudokru's codebase, enabling efficient development and maintenance while following Next.js 14 and modern React best practices.