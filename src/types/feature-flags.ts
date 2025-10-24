/**
 * Feature Flag Type Definitions
 * Comprehensive types for the feature flag system
 */

import type {
  FeatureFlag,
  FeatureFlagRule,
  FeatureFlagOverride,
  FeatureFlagVariant,
  FeatureFlagAudit,
  FlagType,
  Environment,
  RuleType,
  RuleOperator,
  FlagAction,
  User,
  SubscriptionTier,
  UserRole,
} from '@prisma/client';

// ================================
// Core Flag Types
// ================================

export type {
  FeatureFlag,
  FeatureFlagRule,
  FeatureFlagOverride,
  FeatureFlagVariant,
  FeatureFlagAudit,
  FlagType,
  Environment,
  RuleType,
  RuleOperator,
  FlagAction,
};

// ================================
// Flag Evaluation Context
// ================================

export interface FlagEvaluationContext {
  userId?: string;
  username?: string;
  email?: string;
  subscriptionTier?: SubscriptionTier;
  userRole?: UserRole;
  eloRating?: number;
  country?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  userAgent?: string;
  ipAddress?: string;
  environment?: Environment;
  customAttributes?: Record<string, unknown>;
}

// ================================
// Flag Evaluation Result
// ================================

export interface FlagEvaluationResult {
  key: string;
  enabled: boolean;
  value: boolean | string | number | object;
  variant?: string;
  reason: EvaluationReason;
  metadata?: {
    ruleMatched?: string;
    rolloutPercent?: number;
    override?: boolean;
  };
}

export type EvaluationReason =
  | 'default'
  | 'override'
  | 'rule_match'
  | 'rollout'
  | 'disabled'
  | 'error';

// ================================
// Flag with Relations
// ================================

export interface FeatureFlagWithRelations extends FeatureFlag {
  rules?: FeatureFlagRule[];
  overrides?: FeatureFlagOverride[];
  variants?: FeatureFlagVariant[];
}

// ================================
// Flag Creation & Update DTOs
// ================================

export interface CreateFeatureFlagDto {
  key: string;
  name: string;
  description?: string;
  enabled?: boolean;
  defaultValue?: boolean;
  flagType?: FlagType;
  environment?: Environment;
  rolloutPercent?: number;
  createdBy?: string;
  rules?: CreateFlagRuleDto[];
  variants?: CreateFlagVariantDto[];
}

export interface UpdateFeatureFlagDto {
  name?: string;
  description?: string;
  enabled?: boolean;
  defaultValue?: boolean;
  rolloutPercent?: number;
  environment?: Environment;
}

export interface CreateFlagRuleDto {
  name: string;
  ruleType: RuleType;
  operator: RuleOperator;
  value: string | string[] | number | number[];
  priority?: number;
  enabled?: boolean;
}

export interface CreateFlagVariantDto {
  key: string;
  name: string;
  description?: string;
  value: string | number | boolean | object;
  weight?: number;
}

export interface CreateFlagOverrideDto {
  flagId: string;
  userId: string;
  value: boolean;
  reason?: string;
  expiresAt?: Date;
}

// ================================
// Flag Evaluation Request/Response
// ================================

export interface EvaluateFlagsRequest {
  keys?: string[]; // Specific flag keys to evaluate (optional, all if not provided)
  context: FlagEvaluationContext;
}

export interface EvaluateFlagsResponse {
  flags: Record<string, FlagEvaluationResult>;
  evaluatedAt: Date;
  context: FlagEvaluationContext;
}

// ================================
// Rule Evaluation
// ================================

export interface RuleEvaluationInput {
  rule: FeatureFlagRule;
  context: FlagEvaluationContext;
}

export interface RuleEvaluationResult {
  matched: boolean;
  ruleName: string;
  ruleType: RuleType;
}

// ================================
// Flag Management API Types
// ================================

export interface FlagListQuery {
  environment?: Environment;
  enabled?: boolean;
  archived?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface FlagListResponse {
  flags: FeatureFlagWithRelations[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ToggleFlagRequest {
  enabled: boolean;
  reason?: string;
}

export interface ToggleFlagResponse {
  flag: FeatureFlag;
  previousState: boolean;
  newState: boolean;
  toggledAt: Date;
}

// ================================
// Audit Log Types
// ================================

export interface FlagAuditLogQuery {
  flagId?: string;
  userId?: string;
  action?: FlagAction;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface FlagAuditLogResponse {
  logs: FeatureFlagAudit[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ================================
// User Segment Types
// ================================

export type UserSegment =
  | 'all'
  | 'free_users'
  | 'premium_users'
  | 'new_users'
  | 'active_users'
  | 'high_rated'
  | 'low_rated'
  | 'tournament_players'
  | 'beta_testers'
  | 'moderators'
  | 'admins';

export interface UserSegmentDefinition {
  key: UserSegment;
  name: string;
  description: string;
  matcher: (context: FlagEvaluationContext) => boolean;
}

// ================================
// Cache Types
// ================================

export interface FlagCacheEntry {
  flag: FeatureFlagWithRelations;
  cachedAt: Date;
  ttl: number; // seconds
}

export interface FlagCacheOptions {
  ttl?: number; // Time to live in seconds
  forceRefresh?: boolean;
}

// ================================
// WebSocket Event Types
// ================================

export interface FlagUpdateEvent {
  type: 'flag_updated' | 'flag_toggled' | 'flag_created' | 'flag_archived';
  flagKey: string;
  flag: FeatureFlag;
  timestamp: Date;
  userId?: string;
}

export interface FlagEvaluationUpdateEvent {
  type: 'evaluation_changed';
  userId: string;
  flagKey: string;
  previousValue: boolean;
  newValue: boolean;
  reason: EvaluationReason;
  timestamp: Date;
}

// ================================
// Hook Return Types
// ================================

export interface UseFeatureFlagReturn {
  isEnabled: boolean;
  isLoading: boolean;
  error?: Error;
  refresh: () => Promise<void>;
}

export interface UseFeatureFlagsReturn {
  flags: Record<string, boolean>;
  isLoading: boolean;
  error?: Error;
  refresh: () => Promise<void>;
  isEnabled: (key: string) => boolean;
}

export interface UseFeatureFlagAdminReturn {
  flags: FeatureFlagWithRelations[];
  isLoading: boolean;
  error?: Error;
  createFlag: (data: CreateFeatureFlagDto) => Promise<FeatureFlag>;
  updateFlag: (id: string, data: UpdateFeatureFlagDto) => Promise<FeatureFlag>;
  toggleFlag: (id: string, enabled: boolean) => Promise<FeatureFlag>;
  deleteFlag: (id: string) => Promise<void>;
  archiveFlag: (id: string) => Promise<FeatureFlag>;
  refresh: () => Promise<void>;
}

// ================================
// Utility Types
// ================================

export type FlagKey = string;
export type FlagValue = boolean | string | number | object;

export interface FlagDefaults {
  [key: string]: FlagValue;
}

// ================================
// Error Types
// ================================

export class FlagEvaluationError extends Error {
  constructor(
    message: string,
    public flagKey: string,
    public context?: FlagEvaluationContext
  ) {
    super(message);
    this.name = 'FlagEvaluationError';
  }
}

export class FlagNotFoundError extends Error {
  constructor(public flagKey: string) {
    super(`Feature flag not found: ${flagKey}`);
    this.name = 'FlagNotFoundError';
  }
}

export class FlagValidationError extends Error {
  constructor(message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = 'FlagValidationError';
  }
}

// ================================
// Predefined Flag Keys (Type-safe)
// ================================

/**
 * Predefined feature flags for Sudokru
 * Add new flags here for type safety across the app
 */
export const FEATURE_FLAGS = {
  // Tournament Features
  NEW_TOURNAMENT_BRACKET_UI: 'new-tournament-bracket-ui',
  TOURNAMENT_LIVE_STREAMING: 'tournament-live-streaming',
  TOURNAMENT_CHAT: 'tournament-chat',

  // Premium Features
  PREMIUM_ANALYTICS: 'premium-analytics',
  PREMIUM_THEMES: 'premium-themes',
  ADVANCED_STATISTICS: 'advanced-statistics',

  // Game Features
  COLLABORATIVE_MODE: 'collaborative-mode',
  HINT_SYSTEM: 'hint-system',
  UNLIMITED_HINTS_FOR_GUESTS: 'unlimited-hints-for-guests',
  PUZZLE_GENERATOR_V2: 'puzzle-generator-v2',
  REAL_TIME_MULTIPLAYER: 'real-time-multiplayer',

  // UI Experiments
  NEW_LANDING_PAGE: 'new-landing-page',
  DARK_MODE_V2: 'dark-mode-v2',
  MOBILE_REDESIGN: 'mobile-redesign',

  // Social Features
  FRIEND_SYSTEM: 'friend-system',
  IN_GAME_CHAT: 'in-game-chat',
  SOCIAL_SHARING: 'social-sharing',

  // Performance
  LAZY_LOAD_GAMES: 'lazy-load-games',
  WEBSOCKET_OPTIMIZATION: 'websocket-optimization',
  CLIENT_SIDE_CACHING: 'client-side-caching',

  // Beta Features
  AI_OPPONENT: 'ai-opponent',
  PUZZLE_EDITOR: 'puzzle-editor',
  CUSTOM_GAME_MODES: 'custom-game-modes',
} as const;

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];
