/**
 * FlagToggle Component
 * Component that renders different content based on flag state
 */

'use client';

import React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import type { FeatureFlagKey } from '@/types/feature-flags';

export interface FlagToggleProps {
  /**
   * The feature flag key to check
   */
  flag: string | FeatureFlagKey;

  /**
   * Content to render when flag is enabled
   */
  on: React.ReactNode;

  /**
   * Content to render when flag is disabled
   */
  off: React.ReactNode;

  /**
   * Content to render while loading
   */
  loading?: React.ReactNode;

  /**
   * Default value before flag is loaded
   */
  defaultValue?: boolean;
}

/**
 * Component that toggles between two states based on feature flag
 *
 * @example
 * ```tsx
 * <FlagToggle
 *   flag="new-tournament-ui"
 *   on={<NewTournamentBracket />}
 *   off={<OldTournamentBracket />}
 *   loading={<Spinner />}
 * />
 * ```
 *
 * @example Inline toggle
 * ```tsx
 * <h1>
 *   Tournament{' '}
 *   <FlagToggle
 *     flag="beta-features"
 *     on={<Badge>BETA</Badge>}
 *     off={null}
 *   />
 * </h1>
 * ```
 */
export function FlagToggle({
  flag,
  on,
  off,
  loading = null,
  defaultValue = false,
}: FlagToggleProps) {
  const { isEnabled, isLoading } = useFeatureFlag(flag, { defaultValue });

  if (isLoading && loading) {
    return <>{loading}</>;
  }

  return <>{isEnabled ? on : off}</>;
}

/**
 * Component that renders different variants based on flag value
 */
export interface FlagVariantProps {
  /**
   * The feature flag key to check
   */
  flag: string | FeatureFlagKey;

  /**
   * Map of variant names to content
   */
  variants: Record<string, React.ReactNode>;

  /**
   * Default variant to show
   */
  defaultVariant?: string;

  /**
   * Content to render while loading
   */
  loading?: React.ReactNode;
}

/**
 * Component for A/B testing with multiple variants
 *
 * @example
 * ```tsx
 * <FlagVariant
 *   flag="homepage-hero-variant"
 *   variants={{
 *     control: <HeroControl />,
 *     variant_a: <HeroVariantA />,
 *     variant_b: <HeroVariantB />,
 *   }}
 *   defaultVariant="control"
 * />
 * ```
 */
export function FlagVariant({
  flag,
  variants,
  defaultVariant = 'control',
  loading = null,
}: FlagVariantProps) {
  const { isLoading, flags } = useFeatureFlag(flag, {
    defaultValue: false,
  }) as any;

  if (isLoading && loading) {
    return <>{loading}</>;
  }

  // For now, just use the variant key if available
  // In future, this could integrate with actual variant support
  const variantKey = defaultVariant;
  const content = variants[variantKey] || variants[defaultVariant];

  return <>{content}</>;
}
