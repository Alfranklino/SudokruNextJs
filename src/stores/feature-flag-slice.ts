/**
 * Feature Flag Zustand Store Slice
 * Manages client-side feature flag state
 */

import type { StateCreator } from 'zustand';
import type {
  FlagEvaluationResult,
  FlagEvaluationContext,
  EvaluateFlagsResponse,
} from '@/types/feature-flags';

export interface FeatureFlagSlice {
  // State
  flags: Record<string, FlagEvaluationResult>;
  isLoading: boolean;
  isInitialized: boolean;
  error: Error | null;
  lastEvaluatedAt: Date | null;
  context: FlagEvaluationContext | null;

  // Actions
  setFlags: (response: EvaluateFlagsResponse) => void;
  setFlag: (key: string, result: FlagEvaluationResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearFlags: () => void;
  isEnabled: (key: string) => boolean;
  getFlagValue: (key: string) => boolean | string | number | object;
  refreshFlags: () => Promise<void>;
}

export const createFeatureFlagSlice: StateCreator<FeatureFlagSlice> = (set, get) => ({
  // Initial state
  flags: {},
  isLoading: false,
  isInitialized: false,
  error: null,
  lastEvaluatedAt: null,
  context: null,

  // Actions
  setFlags: (response: EvaluateFlagsResponse) => {
    set({
      flags: response.flags,
      context: response.context,
      lastEvaluatedAt: response.evaluatedAt,
      isInitialized: true,
      isLoading: false,
      error: null,
    });
  },

  setFlag: (key: string, result: FlagEvaluationResult) => {
    set((state) => ({
      flags: {
        ...state.flags,
        [key]: result,
      },
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: Error | null) => {
    set({ error, isLoading: false });
  },

  clearFlags: () => {
    set({
      flags: {},
      isInitialized: false,
      error: null,
      lastEvaluatedAt: null,
      context: null,
    });
  },

  isEnabled: (key: string): boolean => {
    const state = get();
    const flag = state.flags[key];
    return flag?.enabled ?? false;
  },

  getFlagValue: (key: string) => {
    const state = get();
    const flag = state.flags[key];
    return flag?.value ?? false;
  },

  refreshFlags: async () => {
    const state = get();
    if (!state.context) {
      console.warn('Cannot refresh flags: no context available');
      return;
    }

    set({ isLoading: true });

    try {
      const response = await fetch('/api/v1/flags/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: state.context }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh flags');
      }

      const data: EvaluateFlagsResponse = await response.json();
      state.setFlags(data);
    } catch (error) {
      console.error('Error refreshing flags:', error);
      state.setError(error as Error);
    }
  },
});
