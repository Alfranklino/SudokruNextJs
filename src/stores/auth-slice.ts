// Auth store slice following documented architecture
import { StateCreator } from 'zustand';
import type { User, LoginCredentials, AuthTokens } from '@/types/auth';
import type { AppState } from './index';

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

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }

        const { user, tokens }: { user: User; tokens: AuthTokens } = await response.json();

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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Token refresh failed');
      }

      const { accessToken, user }: { accessToken: string; user?: User } = await response.json();

      set(state => ({
        auth: {
          ...state.auth,
          accessToken,
          user: user || state.auth.user,
          isAuthenticated: true,
        }
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