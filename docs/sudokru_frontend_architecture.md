# Sudokru - Frontend Architecture Document

## 1. Architecture Overview

### 1.1 Technology Stack
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 3.3+ with shadcn/ui components
- **State Management:** Zustand for client state
- **Real-time:** Socket.io client for WebSocket connections
- **Forms:** React Hook Form with Zod validation
- **HTTP Client:** Built-in fetch with custom hooks
- **Build Tool:** Next.js built-in compiler (Turbopack)
- **Package Manager:** npm (can use yarn or pnpm)

### 1.2 Architecture Principles
- **Component-Driven Development:** Reusable, testable components
- **Type Safety:** End-to-end TypeScript with strict configuration
- **Performance First:** Code splitting, lazy loading, optimized bundles
- **Real-time Ready:** Optimized for WebSocket communication
- **Mobile First:** Responsive design with PWA capabilities
- **Accessibility:** WCAG 2.1 AA compliance by default

### 1.3 Application Structure
```
sudokru/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and configurations
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand state stores
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles and themes
├── public/                  # Static assets
├── prisma/                  # Database schema and migrations
└── docs/                    # Project documentation
```

## 2. Next.js App Router Implementation

### 2.1 App Router Structure
```typescript
// src/app/layout.tsx - Root Layout
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sudokru - Multiplayer Sudoku Gaming',
  description: 'Real-time competitive Sudoku platform',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
```

### 2.2 Route Organization
```typescript
// Route structure following App Router conventions
src/app/
├── (auth)/                  # Auth route group
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx           # Auth-specific layout
├── (dashboard)/             # Dashboard route group
│   ├── dashboard/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── friends/
│   │   └── page.tsx
│   └── layout.tsx           # Dashboard layout
├── game/
│   └── [gameId]/
│       ├── page.tsx         # Game room page
│       └── loading.tsx      # Loading UI
├── tournaments/
│   ├── page.tsx             # Tournament list
│   └── [tournamentId]/
│       └── page.tsx         # Tournament details
├── api/                     # API routes
│   ├── auth/
│   ├── games/
│   └── tournaments/
├── globals.css
├── layout.tsx               # Root layout
├── loading.tsx              # Global loading UI
├── error.tsx                # Global error UI
└── page.tsx                 # Home page
```

### 2.3 Page Component Example
```typescript
// src/app/game/[gameId]/page.tsx
import { Suspense } from 'react';
import { GameContainer } from '@/components/game/GameContainer';
import { GameSkeleton } from '@/components/game/GameSkeleton';
import { notFound } from 'next/navigation';

interface GamePageProps {
  params: { gameId: string };
  searchParams: { spectate?: string };
}

export default async function GamePage({ 
  params, 
  searchParams 
}: GamePageProps) {
  // Validate gameId format
  if (!/^[a-zA-Z0-9]{25}$/.test(params.gameId)) {
    notFound();
  }

  const isSpectating = searchParams.spectate === 'true';

  return (
    <div className="h-screen bg-gray-50">
      <Suspense fallback={<GameSkeleton />}>
        <GameContainer 
          gameId={params.gameId} 
          isSpectating={isSpectating}
        />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: GamePageProps): Promise<Metadata> {
  // In real app, fetch game data for title
  return {
    title: `Game ${params.gameId} - Sudokru`,
    description: 'Join the multiplayer Sudoku game'
  };
}
```

## 3. State Management with Zustand

### 3.1 Store Architecture
```typescript
// src/stores/index.ts - Store composition
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './auth-slice';
import { createGameSlice, GameSlice } from './game-slice';
import { createUISlice, UISlice } from './ui-slice';

export type AppState = AuthSlice & GameSlice & UISlice;

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createGameSlice(...a),
      ...createUISlice(...a),
    })
  )
);

// Expose individual store selectors for performance
export const useAuth = () => useAppStore(state => state.auth);
export const useGame = () => useAppStore(state => state.game);
export const useUI = () => useAppStore(state => state.ui);
```

### 3.2 Auth Store Slice
```typescript
// src/stores/auth-slice.ts
import { StateCreator } from 'zustand';
import { AppState } from './index';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  rating: number;
  subscription: 'free' | 'premium';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export interface AuthSlice {
  auth: AuthState;
  authActions: AuthActions;
}

export const createAuthSlice: StateCreator<
  AppState,
  [],
  [],
  AuthSlice
> = (set, get) => ({
  auth: {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
  },
  
  authActions: {
    login: async (credentials) => {
      set(state => ({ 
        auth: { ...state.auth, isLoading: true } 
      }));
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        
        if (!response.ok) throw new Error('Login failed');
        
        const { user, tokens } = await response.json();
        
        set(state => ({
          auth: {
            ...state.auth,
            user,
            accessToken: tokens.accessToken,
            isAuthenticated: true,
            isLoading: false,
          }
        }));
        
        // Store refresh token securely
        localStorage.setItem('refreshToken', tokens.refreshToken);
        
      } catch (error) {
        set(state => ({ 
          auth: { ...state.auth, isLoading: false } 
        }));
        throw error;
      }
    },
    
    logout: () => {
      localStorage.removeItem('refreshToken');
      set(state => ({
        auth: {
          ...state.auth,
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }
      }));
    },
    
    refreshToken: async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (!response.ok) throw new Error('Token refresh failed');
      
      const { accessToken } = await response.json();
      
      set(state => ({
        auth: { ...state.auth, accessToken }
      }));
    },
    
    updateUser: (updates) => {
      set(state => ({
        auth: {
          ...state.auth,
          user: state.auth.user ? { ...state.auth.user, ...updates } : null
        }
      }));
    },
    
    setLoading: (loading) => {
      set(state => ({
        auth: { ...state.auth, isLoading: loading }
      }));
    },
  },
});
```

### 3.3 Game Store Slice
```typescript
// src/stores/game-slice.ts
import { StateCreator } from 'zustand';
import { AppState } from './index';

export interface GameState {
  currentGame: Game | null;
  gameState: LiveGameState | null;
  players: Player[];
  isConnected: boolean;
  connectionError: string | null;
}

export interface GameActions {
  setCurrentGame: (game: Game | null) => void;
  updateGameState: (gameState: LiveGameState) => void;
  updatePlayers: (players: Player[]) => void;
  makeMove: (row: number, col: number, value: number) => void;
  joinGame: (gameId: string, role: 'player' | 'spectator') => Promise<void>;
  leaveGame: () => void;
  setConnection: (connected: boolean, error?: string) => void;
}

export interface GameSlice {
  game: GameState;
  gameActions: GameActions;
}

export const createGameSlice: StateCreator<
  AppState,
  [],
  [],
  GameSlice
> = (set, get) => ({
  game: {
    currentGame: null,
    gameState: null,
    players: [],
    isConnected: false,
    connectionError: null,
  },
  
  gameActions: {
    setCurrentGame: (game) => {
      set(state => ({
        game: { ...state.game, currentGame: game }
      }));
    },
    
    updateGameState: (gameState) => {
      set(state => ({
        game: { ...state.game, gameState }
      }));
    },
    
    updatePlayers: (players) => {
      set(state => ({
        game: { ...state.game, players }
      }));
    },
    
    makeMove: (row, col, value) => {
      const { game } = get();
      if (!game.currentGame || !game.isConnected) return;
      
      // Optimistic update
      const newGrid = game.gameState?.grid.map((gridRow, r) =>
        r === row 
          ? gridRow.map((cell, c) => c === col ? value : cell)
          : gridRow
      );
      
      if (newGrid) {
        set(state => ({
          game: {
            ...state.game,
            gameState: state.game.gameState 
              ? { ...state.game.gameState, grid: newGrid }
              : null
          }
        }));
      }
      
      // Send move to server via WebSocket
      window.gameSocket?.emit('game-move', {
        gameId: game.currentGame.id,
        move: { row, col, value, moveType: 'place' }
      });
    },
    
    joinGame: async (gameId, role) => {
      try {
        const response = await fetch(`/api/games/${gameId}/join`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${get().auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role })
        });
        
        if (!response.ok) throw new Error('Failed to join game');
        
        const { game } = await response.json();
        set(state => ({
          game: { ...state.game, currentGame: game }
        }));
        
      } catch (error) {
        set(state => ({
          game: { 
            ...state.game, 
            connectionError: error instanceof Error ? error.message : 'Unknown error'
          }
        }));
        throw error;
      }
    },
    
    leaveGame: () => {
      const { game } = get();
      if (game.currentGame) {
        window.gameSocket?.emit('leave-game', { 
          gameId: game.currentGame.id 
        });
      }
      
      set(state => ({
        game: {
          ...state.game,
          currentGame: null,
          gameState: null,
          players: [],
          isConnected: false,
          connectionError: null,
        }
      }));
    },
    
    setConnection: (connected, error) => {
      set(state => ({
        game: {
          ...state.game,
          isConnected: connected,
          connectionError: error || null,
        }
      }));
    },
  },
});
```

## 4. Real-time Communication

### 4.1 WebSocket Service
```typescript
// src/lib/websocket.ts
import { io, Socket } from 'socket.io-client';
import { useAppStore } from '@/stores';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(accessToken: string) {
    if (this.socket?.connected) return;

    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, {
      auth: { token: accessToken },
      transports: ['websocket', 'polling'],
      timeout: 5000,
    });

    this.setupEventListeners();
    window.gameSocket = this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      useAppStore.getState().gameActions.setConnection(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      useAppStore.getState().gameActions.setConnection(false, reason);
      
      if (reason === 'io server disconnect') {
        // Server disconnected, need to reconnect manually
        this.reconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      useAppStore.getState().gameActions.setConnection(false, error.message);
    });

    // Game event listeners
    this.socket.on('game-state-updated', (gameState) => {
      useAppStore.getState().gameActions.updateGameState(gameState);
    });

    this.socket.on('player-joined', (player) => {
      const currentPlayers = useAppStore.getState().game.players;
      useAppStore.getState().gameActions.updatePlayers([...currentPlayers, player]);
    });

    this.socket.on('player-left', ({ userId }) => {
      const currentPlayers = useAppStore.getState().game.players;
      const updatedPlayers = currentPlayers.filter(p => p.id !== userId);
      useAppStore.getState().gameActions.updatePlayers(updatedPlayers);
    });

    this.socket.on('game-completed', (results) => {
      // Handle game completion
      useAppStore.getState().gameActions.updateGameState(results.gameState);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      useAppStore.getState().gameActions.setConnection(false, error.message);
    });
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
    
    setTimeout(() => {
      console.log(`Reconnection attempt ${this.reconnectAttempts}`);
      this.socket?.connect();
    }, delay);
  }

  joinGameRoom(gameId: string, role: 'player' | 'spectator') {
    this.socket?.emit('join-game', { gameId, role });
  }

  leaveGameRoom(gameId: string) {
    this.socket?.emit('leave-game', { gameId });
  }

  sendMove(gameId: string, move: GameMove) {
    this.socket?.emit('game-move', { gameId, move });
  }

  sendChatMessage(gameId: string, message: string) {
    this.socket?.emit('chat-message', { gameId, message });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    window.gameSocket = undefined;
  }
}

export const websocketService = new WebSocketService();

// Global type declaration
declare global {
  interface Window {
    gameSocket?: Socket;
  }
}
```

### 4.2 WebSocket Hook
```typescript
// src/hooks/useWebSocket.ts
import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import { websocketService } from '@/lib/websocket';

export const useWebSocket = () => {
  const { accessToken, isAuthenticated } = useAppStore(state => state.auth);
  const { isConnected, connectionError } = useAppStore(state => state.game);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      websocketService.connect(accessToken);
    }

    return () => {
      if (!isAuthenticated) {
        websocketService.disconnect();
      }
    };
  }, [isAuthenticated, accessToken]);

  return {
    isConnected,
    connectionError,
    joinRoom: websocketService.joinGameRoom.bind(websocketService),
    leaveRoom: websocketService.leaveGameRoom.bind(websocketService),
    sendMove: websocketService.sendMove.bind(websocketService),
    sendMessage: websocketService.sendChatMessage.bind(websocketService),
  };
};
```

## 5. Custom Hooks

### 5.1 Game Management Hook
```typescript
// src/hooks/useGame.ts
import { useEffect, useState } from 'react';
import { useAppStore } from '@/stores';
import { useWebSocket } from './useWebSocket';

export const useGame = (gameId: string) => {
  const { currentGame, gameState, players } = useAppStore(state => state.game);
  const { joinGame, leaveGame, makeMove } = useAppStore(state => state.gameActions);
  const { accessToken } = useAppStore(state => state.auth);
  const { isConnected, joinRoom, leaveRoom } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Join game on mount
  useEffect(() => {
    if (!gameId || !accessToken) return;

    const initializeGame = async () => {
      try {
        setIsLoading(true);
        await joinGame(gameId, 'player');
        
        if (isConnected) {
          joinRoom(gameId, 'player');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to join game');
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();

    return () => {
      leaveRoom(gameId);
      leaveGame();
    };
  }, [gameId, accessToken, isConnected]);

  // Handle WebSocket connection changes
  useEffect(() => {
    if (isConnected && currentGame) {
      joinRoom(currentGame.id, 'player');
    }
  }, [isConnected, currentGame?.id]);

  const handleCellChange = (row: number, col: number, value: number) => {
    if (!currentGame || currentGame.status !== 'active') return;
    makeMove(row, col, value);
  };

  return {
    game: currentGame,
    gameState,
    players,
    isLoading,
    error,
    isConnected,
    handleCellChange,
  };
};
```

### 5.2 API Hook
```typescript
// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { useAppStore } from '@/stores';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useApi = () => {
  const { accessToken, refreshToken } = useAppStore(state => state.authActions);
  const token = useAppStore(state => state.auth.accessToken);

  const makeRequest = useCallback(async (
    url: string,
    options: RequestInit = {},
    withAuth = true
  ) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (withAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle token refresh
    if (response.status === 401 && withAuth) {
      try {
        await refreshToken();
        const newToken = useAppStore.getState().auth.accessToken;
        
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
          response = await fetch(url, {
            ...options,
            headers,
          });
        }
      } catch (refreshError) {
        throw new Error('Authentication failed');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }, [token, refreshToken]);

  return { makeRequest };
};

export const useApiMutation = <T = any>(
  url: string,
  options: UseApiOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { makeRequest } = useApi();

  const mutate = useCallback(async (
    requestOptions: RequestInit = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await makeRequest(url, requestOptions);
      setData(result);
      options.onSuccess?.(result);
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [url, makeRequest, options]);

  return {
    mutate,
    isLoading,
    error,
    data,
  };
};
```

## 6. Component Architecture

### 6.1 Provider Setup
```typescript
// src/components/providers.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './auth-provider';
import { WebSocketProvider } from './websocket-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### 6.2 Auth Provider
```typescript
// src/components/auth-provider.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAppStore } from '@/stores';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { refreshToken, setLoading } = useAppStore(state => state.authActions);

  useEffect(() => {
    // Check for existing session on app load
    const initializeAuth = async () => {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (storedRefreshToken) {
        try {
          setLoading(true);
          await refreshToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
          localStorage.removeItem('refreshToken');
        } finally {
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, [refreshToken, setLoading]);

  return <>{children}</>;
}
```

## 7. Build Configuration

### 7.1 Next.js Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ['cdn.sudokru.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
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
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Custom webpack configuration
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
```

### 7.2 TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
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
      "@/types/*": ["./src/types/*"]
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

## 8. Performance Optimization

### 8.1 Code Splitting Strategy
```typescript
// Lazy loading for heavy components
import { lazy, Suspense } from 'react';

const TournamentBracket = lazy(() => import('@/components/tournament/TournamentBracket'));
const GameAnalytics = lazy(() => import('@/components/analytics/GameAnalytics'));

// Component with lazy loading
export function TournamentPage() {
  return (
    <div>
      <Suspense fallback={<BracketSkeleton />}>
        <TournamentBracket />
      </Suspense>
    </div>
  );
}
```

### 8.2 Bundle Optimization
```typescript
// src/lib/dynamic-imports.ts
export const dynamicImports = {
  TournamentBracket: () => import('@/components/tournament/TournamentBracket'),
  GameAnalytics: () => import('@/components/analytics/GameAnalytics'),
  ChatPanel: () => import('@/components/chat/ChatPanel'),
};

// Usage in components
import dynamic from 'next/dynamic';

const TournamentBracket = dynamic(
  () => import('@/components/tournament/TournamentBracket'),
  {
    loading: () => <BracketSkeleton />,
    ssr: false, // Disable SSR for real-time components
  }
);
```

This comprehensive frontend architecture provides a scalable, performant foundation for Sudokru's real-time multiplayer gaming platform, following Next.js 14 best practices and modern React patterns.