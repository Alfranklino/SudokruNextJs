/**
 * FlagProvider Component
 * Provider that initializes and manages feature flags for the app
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/stores';
import type { FlagEvaluationContext, EvaluateFlagsResponse } from '@/types/feature-flags';

export interface FlagProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Initial evaluation context
   */
  context?: Partial<FlagEvaluationContext>;

  /**
   * Initial flag values (for SSR)
   */
  initialFlags?: EvaluateFlagsResponse;

  /**
   * Loading fallback while flags are being fetched
   */
  loading?: React.ReactNode;

  /**
   * Whether to show loading state on initial load
   */
  showLoadingState?: boolean;

  /**
   * Callback when flags are loaded
   */
  onFlagsLoaded?: (flags: EvaluateFlagsResponse) => void;

  /**
   * Callback when flags fail to load
   */
  onError?: (error: Error) => void;
}

/**
 * Provider component that initializes feature flags for the application
 *
 * @example
 * ```tsx
 * // In your root layout or app component
 * export default function RootLayout({ children }) {
 *   return (
 *     <FlagProvider loading={<Spinner />}>
 *       {children}
 *     </FlagProvider>
 *   );
 * }
 * ```
 *
 * @example With SSR
 * ```tsx
 * // Server component
 * async function getServerSideFlags() {
 *   const response = await fetch('http://localhost:3000/api/v1/flags/evaluate');
 *   return response.json();
 * }
 *
 * export default async function RootLayout({ children }) {
 *   const initialFlags = await getServerSideFlags();
 *
 *   return (
 *     <FlagProvider initialFlags={initialFlags}>
 *       {children}
 *     </FlagProvider>
 *   );
 * }
 * ```
 */
export function FlagProvider({
  children,
  context,
  initialFlags,
  loading = null,
  showLoadingState = false,
  onFlagsLoaded,
  onError,
}: FlagProviderProps) {
  const [isInitializing, setIsInitializing] = useState(!initialFlags);

  const setFlags = useAppStore((state) => state.setFlags);
  const setLoading = useAppStore((state) => state.setLoading);
  const setError = useAppStore((state) => state.setError);
  const isInitialized = useAppStore((state) => state.isInitialized);

  useEffect(() => {
    // If we have initial flags from SSR, use them
    if (initialFlags) {
      setFlags(initialFlags);
      setIsInitializing(false);
      onFlagsLoaded?.(initialFlags);
      return;
    }

    // Otherwise, fetch flags from API
    const fetchFlags = async () => {
      setLoading(true);
      setIsInitializing(true);

      try {
        const response = await fetch('/api/v1/flags/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ context }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch flags: ${response.statusText}`);
        }

        const data: EvaluateFlagsResponse = await response.json();
        setFlags(data);
        onFlagsLoaded?.(data);
      } catch (error) {
        console.error('Error fetching feature flags:', error);
        const err = error as Error;
        setError(err);
        onError?.(err);
      } finally {
        setIsInitializing(false);
        setLoading(false);
      }
    };

    if (!isInitialized) {
      fetchFlags();
    }
  }, [initialFlags, context, isInitialized, setFlags, setLoading, setError, onFlagsLoaded, onError]);

  // Show loading state if configured
  if (showLoadingState && isInitializing && loading) {
    return <>{loading}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to get the initialization state of the flag provider
 */
export function useFlagProviderStatus() {
  const isInitialized = useAppStore((state) => state.isInitialized);
  const isLoading = useAppStore((state) => state.isLoading);
  const error = useAppStore((state) => state.error);

  return {
    isInitialized,
    isLoading,
    error,
  };
}
