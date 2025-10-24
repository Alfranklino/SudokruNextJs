/**
 * useFeatureFlagBatch Hook
 * Hook for checking multiple feature flags efficiently
 */

'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import type { FeatureFlagKey } from '@/types/feature-flags';

export interface UseFeatureFlagBatchReturn {
  /**
   * Map of flag keys to their enabled state
   */
  flags: Record<string, boolean>;

  /**
   * Whether flags are currently loading
   */
  isLoading: boolean;

  /**
   * Any error that occurred
   */
  error: Error | null;

  /**
   * Check if a specific flag is enabled
   */
  isEnabled: (key: string) => boolean;

  /**
   * Refresh all flags
   */
  refresh: () => Promise<void>;
}

/**
 * Hook to check multiple feature flags at once
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { flags, isLoading } = useFeatureFlagBatch([
 *     'premium-analytics',
 *     'new-tournament-ui',
 *     'collaborative-mode'
 *   ]);
 *
 *   if (isLoading) return <Spinner />;
 *
 *   return (
 *     <>
 *       {flags['premium-analytics'] && <PremiumAnalytics />}
 *       {flags['new-tournament-ui'] && <NewTournamentUI />}
 *       {flags['collaborative-mode'] && <CollaborativeMode />}
 *     </>
 *   );
 * }
 * ```
 */
export function useFeatureFlagBatch(
  keys: (string | FeatureFlagKey)[],
  autoFetch = true
): UseFeatureFlagBatchReturn {
  const allFlags = useAppStore((state) => state.flags);
  const isLoading = useAppStore((state) => state.isLoading);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const error = useAppStore((state) => state.error);
  const refreshFlags = useAppStore((state) => state.refreshFlags);
  const isEnabledFn = useAppStore((state) => state.isEnabled);

  // Auto-fetch flags if not initialized
  useEffect(() => {
    if (autoFetch && !isInitialized && !isLoading) {
      refreshFlags();
    }
  }, [autoFetch, isInitialized, isLoading, refreshFlags]);

  // Build flags object for requested keys
  const flags: Record<string, boolean> = {};
  keys.forEach((key) => {
    flags[key] = allFlags[key]?.enabled ?? false;
  });

  return {
    flags,
    isLoading,
    error,
    isEnabled: isEnabledFn,
    refresh: refreshFlags,
  };
}

/**
 * Hook to get all available feature flags
 *
 * @example
 * ```tsx
 * function AdminDashboard() {
 *   const { flags, isLoading } = useAllFeatureFlags();
 *
 *   return (
 *     <div>
 *       {Object.entries(flags).map(([key, result]) => (
 *         <FlagRow key={key} flagKey={key} result={result} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAllFeatureFlags() {
  const flags = useAppStore((state) => state.flags);
  const isLoading = useAppStore((state) => state.isLoading);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const error = useAppStore((state) => state.error);
  const refreshFlags = useAppStore((state) => state.refreshFlags);
  const isEnabledFn = useAppStore((state) => state.isEnabled);

  // Auto-fetch on mount if not initialized
  useEffect(() => {
    if (!isInitialized && !isLoading) {
      refreshFlags();
    }
  }, [isInitialized, isLoading, refreshFlags]);

  return {
    flags,
    isLoading,
    error,
    isEnabled: isEnabledFn,
    refresh: refreshFlags,
  };
}
