# Sudokru - Complete Implementation Package

## 1. Quick Start Guide

### 1.1 Prerequisites Installation
```bash
# Install required software
node --version  # Should be 18.17.0 or higher
npm --version   # Should be 9.0.0 or higher

# Optional: Install global tools
npm install -g vercel
npm install -g prisma
```

### 1.2 Project Bootstrap
```bash
# Create and setup project
npx create-next-app@latest sudokru --typescript --tailwind --eslint --app
cd sudokru

# Install additional dependencies
npm install @prisma/client prisma zustand @auth/prisma-adapter next-auth
npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-tabs
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install socket.io-client bcryptjs jsonwebtoken zod react-hook-form @hookform/resolvers
npm install @sentry/nextjs winston date-fns

# Development dependencies
npm install -D @types/bcryptjs @types/jsonwebtoken jest @testing-library/react
npm install -D @testing-library/jest-dom playwright @playwright/test
npm install -D storybook @storybook/nextjs
```

### 1.3 Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32  # Copy output to NEXTAUTH_SECRET

# Initialize database
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

## 2. Project File Structure

```
sudokru/
├── .env.example                    # Environment template
├── .env.local                      # Local environment (gitignored)
├── .gitignore                      # Git ignore rules
├── .eslintrc.json                  # ESLint configuration
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── README.md                       # Project documentation
│
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│       ├── hero-bg.jpg
│       └── avatars/
│
├── prisma/                         # Database schema and migrations
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Database seeding
│   └── migrations/                 # Migration files
│
├── src/                            # Source code
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Authentication routes
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/            # Dashboard routes
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── friends/page.tsx
│   │   ├── api/                    # API routes
│   │   │   ├── auth/
│   │   │   ├── games/
│   │   │   ├── tournaments/
│   │   │   └── users/
│   │   ├── game/
│   │   │   └── [gameId]/page.tsx
│   │   ├── tournaments/
│   │   │   ├── page.tsx
│   │   │   └── [tournamentId]/page.tsx
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── loading.tsx             # Global loading
│   │   ├── error.tsx               # Global error handling
│   │   └── page.tsx                # Home page
│   │
│   ├── components/                 # React components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── [...]
│   │   ├── game/                   # Game components
│   │   │   ├── SudokuGrid.tsx
│   │   │   ├── GameStatus.tsx
│   │   │   ├── PlayerList.tsx
│   │   │   ├── GameChat.tsx
│   │   │   └── [...]
│   │   ├── tournament/             # Tournament components
│   │   │   ├── TournamentBracket.tsx
│   │   │   ├── TournamentCard.tsx
│   │   │   └── [...]
│   │   ├── auth/                   # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── [...]
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── [...]
│   │   └── providers/              # Context providers
│   │       ├── AuthProvider.tsx
│   │       ├── WebSocketProvider.tsx
│   │       └── Providers.tsx
│   │
│   ├── lib/                        # Utilities and configurations
│   │   ├── utils.ts                # General utilities
│   │   ├── constants.ts            # App constants
│   │   ├── validations.ts          # Zod schemas
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── db.ts                   # Database client
│   │   ├── websocket.ts            # WebSocket service
│   │   ├── game-engine.ts          # Sudoku logic
│   │   ├── errors/                 # Error handling
│   │   │   ├── index.ts
│   │   │   ├── factories.ts
│   │   │   └── types.ts
│   │   └── middleware/             # Custom middleware
│   │       ├── auth-middleware.ts
│   │       └── rate-limit.ts
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts              # Authentication
│   │   ├── useGame.ts              # Game management
│   │   ├── useWebSocket.ts         # WebSocket connection
│   │   ├── useApi.ts               # API requests
│   │   ├── useTournament.ts        # Tournament management
│   │   └── usePermissions.ts       # Permission checking
│   │
│   ├── stores/                     # Zustand state management
│   │   ├── index.ts                # Store composition
│   │   ├── auth-slice.ts           # Auth state
│   │   ├── game-slice.ts           # Game state
│   │   ├── ui-slice.ts             # UI state
│   │   └── tournament-slice.ts     # Tournament state
│   │
│   ├── types/                      # TypeScript definitions
│   │   ├── index.ts                # Main exports
│   │   ├── auth.ts                 # Auth types
│   │   ├── game.ts                 # Game types
│   │   ├── tournament.ts           # Tournament types
│   │   ├── api.ts                  # API types
│   │   └── database.ts             # Database types
│   │
│   └── styles/                     # Additional styles
│       ├── globals.css             # Global CSS
│       └── components.css          # Component styles
│
├── scripts/                        # Build and utility scripts
│   ├── generate-mock-data.ts       # Mock data generation
│   ├── migrate-production.ts       # Production migration
│   └── setup-dev.sh               # Development setup
│
├── docs/                           # Documentation
│   ├── api/                        # API documentation
│   ├── deployment/                 # Deployment guides
│   └── development/                # Development guides
│
├── tests/                          # Test files
│   ├── __mocks__/                  # Test mocks
│   ├── components/                 # Component tests
│   ├── e2e/                        # End-to-end tests
│   ├── setup.ts                    # Test setup
│   └── utils.ts                    # Test utilities
│
└── .storybook/                     # Storybook configuration
    ├── main.ts
    ├── preview.ts
    └── stories/
```

## 3. Core Configuration Files

### 3.1 Package.json
```json
{
  "name": "sudokru",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "dev:debug": "NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --passWithNoTests",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:ci": "playwright test --reporter=html",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:reset": "prisma migrate reset --force",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "mock-data": "tsx scripts/generate-mock-data.ts",
    "setup": "npm install && npm run db:generate && npm run db:migrate && npm run db:seed"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^1.0.0",
    "@hookform/resolvers": "^3.3.0",
    "@prisma/client": "^5.0.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-button": "^0.1.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tabs": "^1.0.4",
    "@sentry/nextjs": "^7.77.0",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.263.1",
    "next": "14.0.0",
    "next-auth": "^4.24.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.47.0",
    "socket.io-client": "^4.7.2",
    "tailwind-merge": "^1.14.0",
    "winston": "^3.10.0",
    "zod": "^3.22.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.39.0",
    "@storybook/addon-essentials": "^7.5.0",
    "@storybook/addon-interactions": "^7.5.0",
    "@storybook/addon-links": "^7.5.0",
    "@storybook/blocks": "^7.5.0",
    "@storybook/nextjs": "^7.5.0",
    "@storybook/react": "^7.5.0",
    "@storybook/testing-library": "^0.2.2",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^13.4.0",
    "@types/bcryptjs": "^2.4.4",
    "@types/jsonwebtoken": "^9.0.3",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.51.0",
    "eslint-config-next": "14.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.0",
    "prisma": "^5.0.0",
    "storybook": "^7.5.0",
    "tailwindcss": "^3.3.0",
    "tsx": "^3.14.0",
    "typescript": "^5.2.0"
  }
}
```

### 3.2 Environment Configuration
```bash
# .env.example
# Copy to .env.local and fill in actual values

# ================================
# CORE APPLICATION
# ================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# ================================
# DATABASE
# ================================
# Development (SQLite)
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL)
# DATABASE_URL="postgresql://username:password@host:5432/database"

# ================================
# AUTHENTICATION
# ================================
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (get from respective developer consoles)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# ================================
# REAL-TIME FEATURES
# ================================
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3001"

# ================================
# EXTERNAL SERVICES
# ================================
# Stripe (get from Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# SendGrid (get from SendGrid)
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@sudokru.com"

# ================================
# MONITORING & ANALYTICS
# ================================
NEXT_PUBLIC_SENTRY_DSN="https://your-sentry-dsn"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# ================================
# REDIS (OPTIONAL)
# ================================
REDIS_URL="redis://localhost:6379"

# ================================
# FEATURE FLAGS
# ================================
NEXT_PUBLIC_ENABLE_TOURNAMENTS=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_PREMIUM=false
```

### 3.3 Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  images: {
    domains: ['cdn.sudokru.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
};

const sentryOptions = {
  org: 'sudokru',
  project: 'sudokru-web',
  silent: true,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
};

module.exports = process.env.NODE_ENV === 'production' 
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;
```

### 3.4 TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 3.5 Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Game-specific colors
        game: {
          correct: 'hsl(142, 76%, 36%)',
          error: 'hsl(348, 86%, 61%)',
          warning: 'hsl(45, 93%, 47%)',
          hint: 'hsl(217, 91%, 60%)',
        },
        difficulty: {
          easy: 'hsl(142, 76%, 36%)',
          medium: 'hsl(45, 93%, 47%)',
          hard: 'hsl(348, 86%, 61%)',
          expert: 'hsl(271, 81%, 56%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-success': {
          '0%, 100%': { backgroundColor: 'hsl(142, 76%, 36%)' },
          '50%': { backgroundColor: 'hsl(142, 76%, 46%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'pulse-success': 'pulse-success 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

## 4. Essential Starter Files

### 4.1 Database Schema (Prisma)
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // Change to "postgresql" for production
  url      = env("DATABASE_URL")
}

// User Management
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String?
  emailVerified DateTime?
  
  profile       UserProfile?
  statistics    UserStatistics?
  
  accounts      Account[]
  sessions      Session[]
  
  playerGames   PlayerGame[]
  createdGames  Game[]       @relation("GameCreator")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

model UserProfile {
  id          String  @id @default(cuid())
  userId      String  @unique
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  displayName String?
  avatar      String?
  bio         String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("user_profiles")
}

model UserStatistics {
  id     String @id @default(cuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  gamesPlayed    Int @default(0)
  gamesWon       Int @default(0)
  eloRating      Int @default(1200)
  totalPlayTime  Int @default(0)
  currentStreak  Int @default(0)
  longestStreak  Int @default(0)
  
  updatedAt DateTime @updatedAt
  
  @@map("user_statistics")
}

// NextAuth Models
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

// Game Engine
model Puzzle {
  id          String @id @default(cuid())
  difficulty  String
  initialGrid Json
  solution    Json
  clueCount   Int
  
  games       Game[]
  
  createdAt DateTime @default(now())
  
  @@map("puzzles")
}

model Game {
  id        String @id @default(cuid())
  puzzleId  String
  puzzle    Puzzle @relation(fields: [puzzleId], references: [id])
  
  type      String
  mode      String @default("casual")
  difficulty String
  status    String @default("waiting")
  timeLimit Int?
  
  creatorId String
  creator   User   @relation("GameCreator", fields: [creatorId], references: [id])
  
  players   PlayerGame[]
  moves     GameMove[]
  
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime @default(now())
  
  @@map("games")
}

model PlayerGame {
  id       String @id @default(cuid())
  gameId   String
  game     Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  status         String @default("joined")
  role           String @default("player")
  currentGrid    Json?
  moveCount      Int    @default(0)
  errorCount     Int    @default(0)
  completionTime Int?
  isWinner       Boolean @default(false)
  
  joinedAt    DateTime @default(now())
  completedAt DateTime?
  
  @@unique([gameId, userId])
  @@map("player_games")
}

model GameMove {
  id        String @id @default(cuid())
  gameId    String
  game      Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId    String
  
  row           Int
  col           Int
  value         Int
  moveType      String @default("place")
  timeFromStart Int
  isCorrect     Boolean
  
  createdAt DateTime @default(now())
  
  @@map("game_moves")
}
```

### 4.2 Mock Data Generator
```typescript
// scripts/generate-mock-data.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Mock data generation
export const generateMockData = {
  users: [
    {
      id: 'user1',
      email: 'alice@sudokru.com',
      username: 'alice_solver',
      displayName: 'Alice the Solver',
      rating: 1450,
      gamesPlayed: 127,
      gamesWon: 89,
    },
    {
      id: 'user2',
      email: 'bob@sudokru.com',
      username: 'sudoku_bob',
      displayName: 'Sudoku Bob',
      rating: 1320,
      gamesPlayed: 95,
      gamesWon: 52,
    },
    {
      id: 'user3',
      email: 'charlie@sudokru.com',
      username: 'puzzle_master',
      displayName: 'Puzzle Master',
      rating: 1680,
      gamesPlayed: 203,
      gamesWon: 156,
    },
  ],

  puzzles: {
    easy: {
      initialGrid: [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
      ],
      solution: [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
      ],
      clueCount: 30
    },
    
    medium: {
      initialGrid: [
        [0,0,0,6,0,0,4,0,0],
        [7,0,0,0,0,3,6,0,0],
        [0,0,0,0,9,1,0,8,0],
        [0,0,0,0,0,0,0,0,0],
        [0,5,0,1,8,0,0,0,3],
        [0,0,0,3,0,6,0,4,5],
        [0,4,0,2,0,0,0,6,0],
        [9,0,3,0,0,0,0,0,0],
        [0,2,0,0,0,0,1,0,0]
      ],
      solution: [
        [1,3,9,6,7,5,4,2,8],
        [7,8,2,4,2,3,6,1,9],
        [4,6,5,7,9,1,3,8,2],
        [3,9,8,5,4,7,2,1,6],
        [6,5,4,1,8,2,9,7,3],
        [2,1,7,3,1,6,8,4,5],
        [5,4,1,2,3,8,7,6,4],
        [9,7,3,8,6,4,5,3,1],
        [8,2,6,9,5,7,1,9,7]
      ],
      clueCount: 25
    }
  },

  games: [
    {
      id: 'game1',
      type: 'competitive',
      difficulty: 'medium',
      status: 'waiting',
      maxPlayers: 2,
      currentPlayers: 1,
      creator: 'alice_solver',
      timeLimit: 900,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'game2',
      type: 'collaborative',
      difficulty: 'hard',
      status: 'active',
      maxPlayers: 4,
      currentPlayers: 3,
      creator: 'puzzle_master',
      startedAt: new Date(Date.now() - 300000).toISOString(),
    },
  ],

  tournaments: [
    {
      id: 'tournament1',
      name: 'Weekly Championship',
      description: 'Compete for the weekly crown!',
      format: 'single_elimination',
      maxPlayers: 64,
      currentPlayers: 23,
      difficulty: 'medium',
      status: 'registration',
      entryFee: 0,
      prizePool: 0,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    },
  ],
};

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Create mock users
    for (const userData of generateMockData.users) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          email: userData.email,
          username: userData.username,
          passwordHash: hashedPassword,
          profile: {
            create: {
              displayName: userData.displayName,
            },
          },
          statistics: {
            create: {
              eloRating: userData.rating,
              gamesPlayed: userData.gamesPlayed,
              gamesWon: userData.gamesWon,
            },
          },
        },
      });
    }

    // Create mock puzzles
    for (const [difficulty, puzzleData] of Object.entries(generateMockData.puzzles)) {
      await prisma.puzzle.create({
        data: {
          difficulty,
          initialGrid: puzzleData.initialGrid,
          solution: puzzleData.solution,
          clueCount: puzzleData.clueCount,
        },
      });
    }

    console.log('Database seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
```

### 4.3 Core Utility Functions
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isValidSudokuMove(
  grid: number[][],
  row: number,
  col: number,
  value: number
): boolean {
  if (value === 0) return true; // Clearing a cell is always valid
  
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === value) return false;
  }
  
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === value) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c] === value) return false;
    }
  }
  
  return true;
}

export function isSudokuComplete(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return false;
    }
  }
  return true;
}

export function copyGrid(grid: number[][]): number[][] {
  return grid.map(row => [...row]);
}

export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
}
```

### 4.4 Database Client Setup
```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database utility functions
export async function healthCheck(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      statistics: true,
    },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      statistics: true,
    },
  });
}

export async function createUser(userData: {
  email: string;
  username: string;
  passwordHash?: string;
  displayName?: string;
}) {
  return await prisma.user.create({
    data: {
      email: userData.email,
      username: userData.username,
      passwordHash: userData.passwordHash,
      profile: {
        create: {
          displayName: userData.displayName || userData.username,
        },
      },
      statistics: {
        create: {
          eloRating: 1200,
        },
      },
    },
    include: {
      profile: true,
      statistics: true,
    },
  });
}
```

### 4.5 API Route Example
```typescript
// src/app/api/games/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const GameCreateSchema = z.object({
  type: z.enum(['competitive', 'collaborative', 'practice']),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  timeLimit: z.number().optional(),
  isPrivate: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (difficulty) where.difficulty = difficulty;
    if (status) where.status = status;

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        include: {
          creator: {
            select: { username: true, profile: { select: { displayName: true } } },
          },
          players: {
            include: {
              user: { select: { username: true } },
            },
          },
          _count: { select: { players: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.game.count({ where }),
    ]);

    return NextResponse.json({
      games,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const gameData = GameCreateSchema.parse(body);

    // Generate or select puzzle
    const puzzle = await prisma.puzzle.findFirst({
      where: { difficulty: gameData.difficulty },
      orderBy: { createdAt: 'desc' },
    });

    if (!puzzle) {
      return NextResponse.json(
        { error: 'No puzzles available for this difficulty' },
        { status: 400 }
      );
    }

    // Create game
    const game = await prisma.game.create({
      data: {
        type: gameData.type,
        difficulty: gameData.difficulty,
        timeLimit: gameData.timeLimit,
        creatorId: session.user.id,
        puzzleId: puzzle.id,
      },
      include: {
        creator: {
          select: { username: true, profile: { select: { displayName: true } } },
        },
        puzzle: true,
        players: true,
      },
    });

    // Add creator as first player
    await prisma.playerGame.create({
      data: {
        gameId: game.id,
        userId: session.user.id,
        role: 'player',
        status: 'ready',
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}
```

## 5. Development Scripts

### 5.1 Setup Script
```bash
#!/bin/bash
# scripts/setup-dev.sh

echo "🚀 Setting up Sudokru development environment..."

# Check Node.js version
node_version=$(node --version | cut -d'v' -f2)
required_version="18.17.0"

if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Node.js version $required_version or higher required. Current: $node_version"
    exit 1
fi

echo "✅ Node.js version check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual values"
fi

# Setup database
echo "🗄️  Setting up database..."
npm run db:generate
npm run db:migrate
npm run db:seed

# Run initial build
echo "🔨 Running initial build..."
npm run build

echo "🎉 Setup complete! Run 'npm run dev' to start development server"
```

### 5.2 Test Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*): '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

```javascript
// jest.setup.js
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: null,
      status: 'unauthenticated',
    };
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Setup global test environment
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
```

## 6. Deployment Ready Package

### 6.1 Vercel Configuration
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "envPrefix": "NEXT_PUBLIC_",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x",
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### 6.2 GitHub Actions Workflow
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run type checking
        run: npm run type-check
        
      - name: Run unit tests
        run: npm run test:ci
        
      - name: Run E2E tests
        run: npm run e2e:ci
        
      - name: Build application
        run: npm run build
        env:
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

This complete implementation package provides everything needed to start building Sudokru immediately, with proper project structure, configurations, essential files, and deployment pipelines ready to use.