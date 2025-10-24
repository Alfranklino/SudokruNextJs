// Store composition following the documented architecture
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './auth-slice';
import { createGameSlice, GameSlice } from './game-slice';
import { createUISlice, UISlice } from './ui-slice';
import { createFeatureFlagSlice, FeatureFlagSlice } from './feature-flag-slice';

export type AppState = AuthSlice & GameSlice & UISlice & FeatureFlagSlice;

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createGameSlice(...a),
      ...createUISlice(...a),
      ...createFeatureFlagSlice(...a),
    })
  )
);

// Expose individual store selectors for performance
export const useAuth = () => useAppStore(state => state.auth);
export const useAuthActions = () => useAppStore(state => state.authActions);
export const useGame = () => useAppStore(state => state.game);
export const useGameActions = () => useAppStore(state => state.gameActions);
export const useUI = () => useAppStore(state => state.ui);
export const useUIActions = () => useAppStore(state => state.uiActions);

// Feature Flags selectors
export const useFeatureFlags = () => useAppStore(state => ({
  flags: state.flags,
  isLoading: state.isLoading,
  isInitialized: state.isInitialized,
  error: state.error,
  isEnabled: state.isEnabled,
  getFlagValue: state.getFlagValue,
  refreshFlags: state.refreshFlags,
}));