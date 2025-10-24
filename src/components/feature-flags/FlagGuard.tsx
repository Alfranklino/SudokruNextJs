/**
 * FlagGuard Component
 * Conditionally renders children based on feature flag state
 */

'use client';

import React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import type { FeatureFlagKey } from '@/types/feature-flags';

export interface FlagGuardProps {
  /**
   * The feature flag key to check
   */
  flag: string | FeatureFlagKey;

  /**
   * Children to render when flag is enabled
   */
  children: React.ReactNode;

  /**
   * Fallback to render when flag is disabled
   */
  fallback?: React.ReactNode;

  /**
   * Fallback to render while loading
   */
  loading?: React.ReactNode;

  /**
   * Default value before flag is loaded
   */
  defaultValue?: boolean;

  /**
   * Invert the flag (render children when flag is disabled)
   */
  invert?: boolean;
}

/**
 * Guard component that conditionally renders children based on feature flag
 *
 * @example
 * ```tsx
 * <FlagGuard flag="premium-analytics" fallback={<UpgradePrompt />}>
 *   <PremiumAnalyticsDashboard />
 * </FlagGuard>
 * ```
 *
 * @example With loading state
 * ```tsx
 * <FlagGuard
 *   flag="new-tournament-ui"
 *   loading={<Spinner />}
 *   fallback={<OldTournamentUI />}
 * >
 *   <NewTournamentUI />
 * </FlagGuard>
 * ```
 *
 * @example Inverted (show when flag is OFF)
 * ```tsx
 * <FlagGuard flag="maintenance-mode" invert>
 *   <AppContent />
 * </FlagGuard>
 * ```
 */
export function FlagGuard({
  flag,
  children,
  fallback = null,
  loading = null,
  defaultValue = false,
  invert = false,
}: FlagGuardProps) {
  const { isEnabled, isLoading } = useFeatureFlag(flag, { defaultValue });

  if (isLoading && loading) {
    return <>{loading}</>;
  }

  const shouldRender = invert ? !isEnabled : isEnabled;

  if (shouldRender) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Guard that only renders when flag is enabled
 */
export function FlagEnabled({
  flag,
  children,
}: {
  flag: string | FeatureFlagKey;
  children: React.ReactNode;
}) {
  return <FlagGuard flag={flag}>{children}</FlagGuard>;
}

/**
 * Guard that only renders when flag is disabled
 */
export function FlagDisabled({
  flag,
  children,
}: {
  flag: string | FeatureFlagKey;
  children: React.ReactNode;
}) {
  return <FlagGuard flag={flag} invert>{children}</FlagGuard>;
}
