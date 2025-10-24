/**
 * Feature Flags Module
 * Central export point for feature flag functionality
 */

// Service
export { featureFlagService, default as FeatureFlagService } from './service';

// Cache
export { flagCache, default as FlagCache } from './cache';

// Context builders
export {
  buildContextFromUser,
  buildContextFromRequest,
  buildMinimalContext,
  mergeContexts,
  getUserSegment,
  validateContext,
  getEnvironment,
  createTestContext,
} from './context';

// Evaluators
export {
  evaluateRule,
  evaluateRules,
  evaluatePercentageRollout,
} from './evaluator';

// Re-export types
export type * from '@/types/feature-flags';
