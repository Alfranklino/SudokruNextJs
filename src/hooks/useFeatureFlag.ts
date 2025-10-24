/**
 * useFeatureFlag Hook
 * Hook for checking if a single feature flag is enabled
 */

'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/stores';
import type { FeatureFlagKey } from '@/types/feature-flags';

export interface UseFeatureFlagOptions {
  /**
   * Default value to use before flag is loaded
   */
  defaultValue?: boolean;

  /**
   * Whether to automatically fetch the flag if not loaded
   */
  autoFetch?: boolean;
}

export interface UseFeatureFlagReturn {
  /**
   * Whether the flag is enabled
   */
  isEnabled: boolean;

  /**
   * Whether the flag is currently loading
   */
  isLoading: boolean;

  /**
   * Any error that occurred
   */
  error: Error | null;

  /**
   * Manually refresh this flag
   */
  refresh: () => Promise<void>;
}

/**
 * Hook to check if a feature flag is enabled
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isEnabled, isLoading } = useFeatureFlag('premium-analytics');
 *
 *   if (isLoading) return <Spinner />;
 *   if (!isEnabled) return <UpgradePrompt />;
 *
 *   return <PremiumAnalytics />;
 * }
 * ```
 */
export function useFeatureFlag(
  key: string | FeatureFlagKey,
  options: UseFeatureFlagOptions = {}
): UseFeatureFlagReturn {
  const {
    defaultValue = false,
    autoFetch = true,
  } = options;

  const [localLoading, setLocalLoading] = useState(false);

  const flags = useAppStore((state) => state.flags);
  const isStoreLoading = useAppStore((state) => state.isLoading);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const error = useAppStore((state) => state.error);
  const refreshFlags = useAppStore((state) => state.refreshFlags);
  const setFlag = useAppStore((state) => state.setFlag);

  const flag = flags[key];
  const isEnabled = flag?.enabled ?? defaultValue;
  const isLoading = isStoreLoading || localLoading;

  // Auto-fetch flags if not initialized
  useEffect(() => {
    if (autoFetch && !isInitialized && !isLoading) {
      refreshFlags();
    }
  }, [autoFetch, isInitialized, isLoading, refreshFlags]);

  // Refresh function for this specific flag
  const refresh = async () => {
    setLocalLoading(true);
    try {
      // For now, we refresh all flags
      // In the future, could add single flag refresh endpoint
      await refreshFlags();
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    isEnabled,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook to check if a feature flag is enabled (simple boolean only)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const showNewUI = useFeatureFlagEnabled('new-ui-redesign');
 *   return showNewUI ? <NewUI /> : <OldUI />;
 * }
 * ```
 */
export function useFeatureFlagEnabled(
  key: string | FeatureFlagKey,
  defaultValue = false
): boolean {
  const { isEnabled } = useFeatureFlag(key, { defaultValue });
  return isEnabled;
}
