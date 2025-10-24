/**
 * Feature Flag Service
 * Main service for evaluating and managing feature flags
 */

import { db } from '@/lib/db';
import type {
  FlagEvaluationContext,
  FlagEvaluationResult,
  EvaluateFlagsResponse,
  FeatureFlagWithRelations,
  CreateFeatureFlagDto,
  UpdateFeatureFlagDto,
  CreateFlagOverrideDto,
} from '@/types/feature-flags';
import {
  FeatureFlag,
  FeatureFlagRule,
  Environment,
  FlagAction,
} from '@prisma/client';
import { flagCache } from './cache';
import { evaluateRules, evaluatePercentageRollout } from './evaluator';
import { getEnvironment } from './context';

class FeatureFlagService {
  /**
   * Evaluate a single feature flag for given context
   */
  async evaluateFlag(
    key: string,
    context: FlagEvaluationContext
  ): Promise<FlagEvaluationResult> {
    try {
      // Check for user-specific override first
      if (context.userId) {
        const override = await this.getUserOverride(key, context.userId);
        if (override) {
          return {
            key,
            enabled: override.value,
            value: override.value,
            reason: 'override',
            metadata: { override: true },
          };
        }
      }

      // Get flag from cache or database
      let flag = flagCache.get(key);

      if (!flag) {
        flag = await this.getFlagWithRelations(key);
        if (flag) {
          flagCache.set(key, flag);
        }
      }

      if (!flag) {
        return {
          key,
          enabled: false,
          value: false,
          reason: 'default',
        };
      }

      // Check if flag is globally disabled
      if (!flag.enabled) {
        return {
          key,
          enabled: false,
          value: flag.defaultValue,
          reason: 'disabled',
          metadata: { rolloutPercent: 0 },
        };
      }

      // Check environment match
      if (
        flag.environment !== Environment.ALL &&
        flag.environment !== context.environment
      ) {
        return {
          key,
          enabled: false,
          value: flag.defaultValue,
          reason: 'default',
        };
      }

      // Evaluate targeting rules
      if (flag.rules && flag.rules.length > 0) {
        const rulesMatch = evaluateRules(flag.rules, context, 'AND');

        if (rulesMatch) {
          return {
            key,
            enabled: true,
            value: true,
            reason: 'rule_match',
            metadata: {
              ruleMatched: flag.rules[0]?.name,
            },
          };
        }
      }

      // Evaluate percentage rollout
      if (flag.rolloutPercent > 0 && context.userId) {
        const inRollout = evaluatePercentageRollout(
          context.userId,
          flag.rolloutPercent
        );

        if (inRollout) {
          return {
            key,
            enabled: true,
            value: true,
            reason: 'rollout',
            metadata: {
              rolloutPercent: flag.rolloutPercent,
            },
          };
        }
      }

      // Default to flag's default value
      return {
        key,
        enabled: flag.defaultValue,
        value: flag.defaultValue,
        reason: 'default',
        metadata: {
          rolloutPercent: flag.rolloutPercent,
        },
      };
    } catch (error) {
      console.error(`Error evaluating flag ${key}:`, error);
      return {
        key,
        enabled: false,
        value: false,
        reason: 'error',
      };
    }
  }

  /**
   * Evaluate multiple flags at once
   */
  async evaluateFlags(
    keys: string[],
    context: FlagEvaluationContext
  ): Promise<EvaluateFlagsResponse> {
    const evaluations = await Promise.all(
      keys.map((key) => this.evaluateFlag(key, context))
    );

    const flags: Record<string, FlagEvaluationResult> = {};
    evaluations.forEach((result) => {
      flags[result.key] = result;
    });

    return {
      flags,
      evaluatedAt: new Date(),
      context,
    };
  }

  /**
   * Evaluate all flags for a context
   */
  async evaluateAllFlags(
    context: FlagEvaluationContext
  ): Promise<EvaluateFlagsResponse> {
    const allFlags = await this.getAllFlags();
    const keys = allFlags.map((flag) => flag.key);
    return this.evaluateFlags(keys, context);
  }

  /**
   * Get flag with relations from database
   */
  private async getFlagWithRelations(
    key: string
  ): Promise<FeatureFlagWithRelations | null> {
    return db.featureFlag.findUnique({
      where: { key },
      include: {
        rules: {
          where: { enabled: true },
          orderBy: { priority: 'desc' },
        },
        variants: true,
        overrides: {
          where: {
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        },
      },
    });
  }

  /**
   * Get all flags from database
   */
  async getAllFlags(): Promise<FeatureFlagWithRelations[]> {
    return db.featureFlag.findMany({
      where: {
        archivedAt: null,
      },
      include: {
        rules: {
          where: { enabled: true },
          orderBy: { priority: 'desc' },
        },
        variants: true,
      },
    });
  }

  /**
   * Get user-specific override
   */
  private async getUserOverride(
    flagKey: string,
    userId: string
  ): Promise<{ value: boolean } | null> {
    const flag = await db.featureFlag.findUnique({
      where: { key: flagKey },
      select: { id: true },
    });

    if (!flag) return null;

    const override = await db.featureFlagOverride.findUnique({
      where: {
        flagId_userId: {
          flagId: flag.id,
          userId,
        },
      },
    });

    if (!override) return null;

    // Check if override has expired
    if (override.expiresAt && override.expiresAt < new Date()) {
      return null;
    }

    return { value: override.value };
  }

  // ================================
  // Flag Management Methods
  // ================================

  /**
   * Create a new feature flag
   */
  async createFlag(
    data: CreateFeatureFlagDto,
    createdBy?: string
  ): Promise<FeatureFlag> {
    const flag = await db.featureFlag.create({
      data: {
        key: data.key,
        name: data.name,
        description: data.description,
        enabled: data.enabled ?? false,
        defaultValue: data.defaultValue ?? false,
        flagType: data.flagType ?? 'BOOLEAN',
        environment: data.environment ?? Environment.ALL,
        rolloutPercent: data.rolloutPercent ?? 0,
        createdBy,
        rules: data.rules
          ? {
              create: data.rules.map((rule) => ({
                name: rule.name,
                ruleType: rule.ruleType,
                operator: rule.operator,
                value: JSON.stringify(rule.value),
                priority: rule.priority ?? 0,
                enabled: rule.enabled ?? true,
              })),
            }
          : undefined,
        variants: data.variants
          ? {
              create: data.variants.map((variant) => ({
                key: variant.key,
                name: variant.name,
                description: variant.description,
                value: JSON.stringify(variant.value),
                weight: variant.weight ?? 0,
              })),
            }
          : undefined,
      },
    });

    // Audit log
    await this.createAuditLog(flag.id, FlagAction.CREATED, createdBy);

    // Invalidate cache
    flagCache.invalidate(flag.key);

    return flag;
  }

  /**
   * Update a feature flag
   */
  async updateFlag(
    id: string,
    data: UpdateFeatureFlagDto,
    updatedBy?: string
  ): Promise<FeatureFlag> {
    const existingFlag = await db.featureFlag.findUnique({ where: { id } });

    const flag = await db.featureFlag.update({
      where: { id },
      data,
    });

    // Audit log
    await this.createAuditLog(
      flag.id,
      FlagAction.UPDATED,
      updatedBy,
      JSON.stringify(existingFlag),
      JSON.stringify(flag)
    );

    // Invalidate cache
    flagCache.invalidate(flag.key);

    return flag;
  }

  /**
   * Toggle flag enabled state
   */
  async toggleFlag(
    id: string,
    enabled: boolean,
    toggledBy?: string
  ): Promise<FeatureFlag> {
    const flag = await db.featureFlag.update({
      where: { id },
      data: { enabled },
    });

    // Audit log
    await this.createAuditLog(
      flag.id,
      enabled ? FlagAction.ENABLED : FlagAction.DISABLED,
      toggledBy
    );

    // Invalidate cache
    flagCache.invalidate(flag.key);

    return flag;
  }

  /**
   * Archive a flag
   */
  async archiveFlag(id: string, archivedBy?: string): Promise<FeatureFlag> {
    const flag = await db.featureFlag.update({
      where: { id },
      data: {
        archivedAt: new Date(),
        enabled: false,
      },
    });

    // Audit log
    await this.createAuditLog(flag.id, FlagAction.ARCHIVED, archivedBy);

    // Invalidate cache
    flagCache.invalidate(flag.key);

    return flag;
  }

  /**
   * Delete a flag permanently
   */
  async deleteFlag(id: string): Promise<void> {
    const flag = await db.featureFlag.findUnique({ where: { id } });

    await db.featureFlag.delete({ where: { id } });

    if (flag) {
      flagCache.invalidate(flag.key);
    }
  }

  /**
   * Create user override
   */
  async createOverride(data: CreateFlagOverrideDto): Promise<void> {
    await db.featureFlagOverride.create({
      data: {
        flagId: data.flagId,
        userId: data.userId,
        value: data.value,
        reason: data.reason,
        expiresAt: data.expiresAt,
      },
    });

    // Audit log
    await this.createAuditLog(
      data.flagId,
      FlagAction.OVERRIDE_ADDED,
      data.userId
    );
  }

  /**
   * Remove user override
   */
  async removeOverride(flagId: string, userId: string): Promise<void> {
    await db.featureFlagOverride.delete({
      where: {
        flagId_userId: {
          flagId,
          userId,
        },
      },
    });

    // Audit log
    await this.createAuditLog(flagId, FlagAction.OVERRIDE_REMOVED, userId);
  }

  /**
   * Create audit log entry
   */
  private async createAuditLog(
    flagId: string,
    action: FlagAction,
    userId?: string,
    previousValue?: string,
    newValue?: string
  ): Promise<void> {
    await db.featureFlagAudit.create({
      data: {
        flagId,
        userId,
        action,
        previousValue,
        newValue,
      },
    });
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    flagCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return flagCache.getStats();
  }
}

// Export singleton instance
export const featureFlagService = new FeatureFlagService();

export default featureFlagService;
