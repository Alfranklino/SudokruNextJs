/**
 * Feature Flag Rule Evaluator
 * Evaluates targeting rules against user context
 */

import type {
  FeatureFlagRule,
  FlagEvaluationContext,
  RuleEvaluationInput,
  RuleEvaluationResult,
} from '@/types/feature-flags';
import { RuleType, RuleOperator } from '@prisma/client';
import { getUserSegment } from './context';

/**
 * Evaluate a single rule against context
 */
export function evaluateRule(
  input: RuleEvaluationInput
): RuleEvaluationResult {
  const { rule, context } = input;

  if (!rule.enabled) {
    return {
      matched: false,
      ruleName: rule.name,
      ruleType: rule.ruleType,
    };
  }

  let matched = false;

  try {
    const parsedValue = JSON.parse(rule.value);

    switch (rule.ruleType) {
      case RuleType.USER_ID:
        matched = evaluateUserId(parsedValue, context, rule.operator);
        break;

      case RuleType.USER_SEGMENT:
        matched = evaluateUserSegment(parsedValue, context, rule.operator);
        break;

      case RuleType.ELO_RATING:
        matched = evaluateEloRating(parsedValue, context, rule.operator);
        break;

      case RuleType.SUBSCRIPTION_TIER:
        matched = evaluateSubscriptionTier(parsedValue, context, rule.operator);
        break;

      case RuleType.COUNTRY:
        matched = evaluateCountry(parsedValue, context, rule.operator);
        break;

      case RuleType.DEVICE_TYPE:
        matched = evaluateDeviceType(parsedValue, context, rule.operator);
        break;

      case RuleType.USER_ROLE:
        matched = evaluateUserRole(parsedValue, context, rule.operator);
        break;

      case RuleType.CUSTOM:
        matched = evaluateCustomRule(parsedValue, context, rule.operator);
        break;

      default:
        matched = false;
    }
  } catch (error) {
    console.error(`Error evaluating rule ${rule.name}:`, error);
    matched = false;
  }

  return {
    matched,
    ruleName: rule.name,
    ruleType: rule.ruleType,
  };
}

/**
 * Evaluate multiple rules with AND/OR logic
 */
export function evaluateRules(
  rules: FeatureFlagRule[],
  context: FlagEvaluationContext,
  logic: 'AND' | 'OR' = 'AND'
): boolean {
  if (rules.length === 0) {
    return true; // No rules means always match
  }

  // Sort by priority (higher priority first)
  const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

  const results = sortedRules.map((rule) =>
    evaluateRule({ rule, context })
  );

  if (logic === 'AND') {
    return results.every((result) => result.matched);
  } else {
    return results.some((result) => result.matched);
  }
}

// ================================
// Rule Type Evaluators
// ================================

function evaluateUserId(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.userId) return false;

  const userIds = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return userIds.includes(context.userId);
    case RuleOperator.NOT_IN:
      return !userIds.includes(context.userId);
    case RuleOperator.EQUALS:
      return context.userId === value;
    case RuleOperator.NOT_EQUALS:
      return context.userId !== value;
    default:
      return false;
  }
}

function evaluateUserSegment(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  const userSegments = getUserSegment(context);
  const targetSegments = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return targetSegments.some((segment) => userSegments.includes(segment));
    case RuleOperator.NOT_IN:
      return !targetSegments.some((segment) => userSegments.includes(segment));
    default:
      return false;
  }
}

function evaluateEloRating(
  value: number,
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.eloRating) return false;

  switch (operator) {
    case RuleOperator.GREATER_THAN:
      return context.eloRating > value;
    case RuleOperator.LESS_THAN:
      return context.eloRating < value;
    case RuleOperator.GREATER_THAN_OR_EQUAL:
      return context.eloRating >= value;
    case RuleOperator.LESS_THAN_OR_EQUAL:
      return context.eloRating <= value;
    case RuleOperator.EQUALS:
      return context.eloRating === value;
    case RuleOperator.NOT_EQUALS:
      return context.eloRating !== value;
    default:
      return false;
  }
}

function evaluateSubscriptionTier(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.subscriptionTier) return false;

  const tiers = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return tiers.includes(context.subscriptionTier);
    case RuleOperator.NOT_IN:
      return !tiers.includes(context.subscriptionTier);
    case RuleOperator.EQUALS:
      return context.subscriptionTier === value;
    case RuleOperator.NOT_EQUALS:
      return context.subscriptionTier !== value;
    default:
      return false;
  }
}

function evaluateCountry(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.country) return false;

  const countries = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return countries.includes(context.country);
    case RuleOperator.NOT_IN:
      return !countries.includes(context.country);
    case RuleOperator.EQUALS:
      return context.country === value;
    case RuleOperator.NOT_EQUALS:
      return context.country !== value;
    default:
      return false;
  }
}

function evaluateDeviceType(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.deviceType) return false;

  const devices = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return devices.includes(context.deviceType);
    case RuleOperator.NOT_IN:
      return !devices.includes(context.deviceType);
    case RuleOperator.EQUALS:
      return context.deviceType === value;
    case RuleOperator.NOT_EQUALS:
      return context.deviceType !== value;
    default:
      return false;
  }
}

function evaluateUserRole(
  value: string | string[],
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.userRole) return false;

  const roles = Array.isArray(value) ? value : [value];

  switch (operator) {
    case RuleOperator.IN:
      return roles.includes(context.userRole);
    case RuleOperator.NOT_IN:
      return !roles.includes(context.userRole);
    case RuleOperator.EQUALS:
      return context.userRole === value;
    case RuleOperator.NOT_EQUALS:
      return context.userRole !== value;
    default:
      return false;
  }
}

function evaluateCustomRule(
  value: Record<string, unknown>,
  context: FlagEvaluationContext,
  operator: RuleOperator
): boolean {
  if (!context.customAttributes) return false;

  // Custom rule evaluation logic
  // This can be extended based on specific needs
  const { key, expectedValue } = value as { key: string; expectedValue: unknown };

  if (!key || expectedValue === undefined) return false;

  const actualValue = context.customAttributes[key];

  switch (operator) {
    case RuleOperator.EQUALS:
      return actualValue === expectedValue;
    case RuleOperator.NOT_EQUALS:
      return actualValue !== expectedValue;
    case RuleOperator.IN:
      return Array.isArray(expectedValue) && expectedValue.includes(actualValue);
    case RuleOperator.NOT_IN:
      return Array.isArray(expectedValue) && !expectedValue.includes(actualValue);
    default:
      return false;
  }
}

/**
 * Calculate percentage rollout eligibility using consistent hashing
 */
export function evaluatePercentageRollout(
  userId: string,
  rolloutPercent: number
): boolean {
  if (rolloutPercent === 0) return false;
  if (rolloutPercent === 100) return true;

  // Use simple hash for consistent rollout
  const hash = hashString(userId);
  const bucket = hash % 100;

  return bucket < rolloutPercent;
}

/**
 * Simple hash function for consistent user bucketing
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
