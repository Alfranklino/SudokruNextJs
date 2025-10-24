/**
 * Feature Flag Cache Manager
 * In-memory cache with TTL support for feature flags
 */

import type {
  FeatureFlagWithRelations,
  FlagCacheEntry,
  FlagCacheOptions,
} from '@/types/feature-flags';

class FlagCache {
  private cache: Map<string, FlagCacheEntry> = new Map();
  private defaultTTL: number;

  constructor(defaultTTL: number = 300) {
    // Default 5 minutes
    this.defaultTTL = defaultTTL;
  }

  /**
   * Get a flag from cache
   */
  get(key: string): FeatureFlagWithRelations | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache entry has expired
    const now = new Date();
    const expiresAt = new Date(
      entry.cachedAt.getTime() + entry.ttl * 1000
    );

    if (now > expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.flag;
  }

  /**
   * Set a flag in cache
   */
  set(
    key: string,
    flag: FeatureFlagWithRelations,
    options?: FlagCacheOptions
  ): void {
    const ttl = options?.ttl ?? this.defaultTTL;

    this.cache.set(key, {
      flag,
      cachedAt: new Date(),
      ttl,
    });
  }

  /**
   * Get all flags from cache
   */
  getAll(): FeatureFlagWithRelations[] {
    const flags: FeatureFlagWithRelations[] = [];
    const now = new Date();

    for (const [key, entry] of this.cache.entries()) {
      const expiresAt = new Date(
        entry.cachedAt.getTime() + entry.ttl * 1000
      );

      if (now > expiresAt) {
        this.cache.delete(key);
      } else {
        flags.push(entry.flag);
      }
    }

    return flags;
  }

  /**
   * Set multiple flags in cache
   */
  setMany(
    flags: FeatureFlagWithRelations[],
    options?: FlagCacheOptions
  ): void {
    flags.forEach((flag) => {
      this.set(flag.key, flag, options);
    });
  }

  /**
   * Invalidate a specific flag
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate multiple flags
   */
  invalidateMany(keys: string[]): void {
    keys.forEach((key) => this.cache.delete(key));
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    keys: string[];
    hitRate?: number;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Check if a flag exists in cache and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Singleton instance
const cacheTTL = process.env.FEATURE_FLAG_CACHE_TTL
  ? parseInt(process.env.FEATURE_FLAG_CACHE_TTL, 10)
  : 300;

export const flagCache = new FlagCache(cacheTTL);

export default flagCache;
