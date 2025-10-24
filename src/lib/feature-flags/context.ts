/**
 * Feature Flag Evaluation Context Builder
 * Creates context from various sources (user, request, etc.)
 */

import type { User } from '@prisma/client';
import type { FlagEvaluationContext } from '@/types/feature-flags';
import { Environment } from '@prisma/client';

/**
 * Build evaluation context from user object
 */
export function buildContextFromUser(user: User): FlagEvaluationContext {
  return {
    userId: user.id,
    username: user.username,
    email: user.email,
    subscriptionTier: user.subscription,
    userRole: user.role,
    eloRating: user.eloRating,
    country: user.country ?? undefined,
    environment: getEnvironment(),
  };
}

/**
 * Build evaluation context from request headers
 */
export function buildContextFromRequest(
  request: Request,
  user?: User
): FlagEvaluationContext {
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = detectDeviceType(userAgent);
  const ipAddress = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    undefined;

  const context: FlagEvaluationContext = {
    deviceType,
    userAgent,
    ipAddress,
    environment: getEnvironment(),
  };

  if (user) {
    Object.assign(context, buildContextFromUser(user));
  }

  return context;
}

/**
 * Build minimal context (server-side without user)
 */
export function buildMinimalContext(): FlagEvaluationContext {
  return {
    environment: getEnvironment(),
  };
}

/**
 * Merge multiple contexts (later contexts override earlier ones)
 */
export function mergeContexts(
  ...contexts: Partial<FlagEvaluationContext>[]
): FlagEvaluationContext {
  return Object.assign({}, ...contexts) as FlagEvaluationContext;
}

/**
 * Detect device type from user agent
 */
function detectDeviceType(
  userAgent: string
): 'mobile' | 'tablet' | 'desktop' {
  const ua = userAgent.toLowerCase();

  // Mobile detection
  if (
    /mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua) &&
    !/ipad|tablet/i.test(ua)
  ) {
    return 'mobile';
  }

  // Tablet detection
  if (/ipad|tablet|kindle|playbook|silk/i.test(ua)) {
    return 'tablet';
  }

  return 'desktop';
}

/**
 * Get current environment
 */
export function getEnvironment(): Environment {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === 'production') {
    return Environment.PRODUCTION;
  }

  if (nodeEnv === 'test' || process.env.NEXT_PUBLIC_ENV === 'staging') {
    return Environment.STAGING;
  }

  return Environment.DEVELOPMENT;
}

/**
 * Validate context has required fields for rule evaluation
 */
export function validateContext(
  context: FlagEvaluationContext,
  requiredFields: (keyof FlagEvaluationContext)[]
): boolean {
  return requiredFields.every((field) => context[field] !== undefined);
}

/**
 * Extract user segment from context
 */
export function getUserSegment(context: FlagEvaluationContext): string[] {
  const segments: string[] = ['all'];

  if (context.subscriptionTier === 'FREE') {
    segments.push('free_users');
  } else if (context.subscriptionTier === 'PREMIUM') {
    segments.push('premium_users');
  }

  if (context.userRole === 'ADMIN') {
    segments.push('admins');
  } else if (context.userRole === 'MODERATOR') {
    segments.push('moderators');
  }

  if (context.eloRating) {
    if (context.eloRating >= 1500) {
      segments.push('high_rated');
    } else if (context.eloRating < 1000) {
      segments.push('low_rated');
    }
  }

  return segments;
}

/**
 * Create test context for development/testing
 */
export function createTestContext(
  overrides?: Partial<FlagEvaluationContext>
): FlagEvaluationContext {
  return {
    userId: 'test-user-id',
    username: 'test-user',
    email: 'test@sudokru.com',
    subscriptionTier: 'FREE',
    userRole: 'USER',
    eloRating: 1200,
    country: 'US',
    deviceType: 'desktop',
    environment: Environment.DEVELOPMENT,
    ...overrides,
  };
}
