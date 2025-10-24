/**
 * useFeatureFlagAdmin Hook
 * Admin operations for managing feature flags
 */

'use client';

import { useState, useCallback } from 'react';
import type {
  FeatureFlagWithRelations,
  CreateFeatureFlagDto,
  UpdateFeatureFlagDto,
  FlagListQuery,
} from '@/types/feature-flags';
import { useAppStore } from '@/stores';
import { toast } from 'sonner';

export interface UseFeatureFlagAdminReturn {
  flags: FeatureFlagWithRelations[];
  isLoading: boolean;
  error: Error | null;

  // CRUD operations
  fetchFlags: (query?: FlagListQuery) => Promise<void>;
  createFlag: (data: CreateFeatureFlagDto) => Promise<void>;
  updateFlag: (id: string, data: UpdateFeatureFlagDto) => Promise<void>;
  toggleFlag: (id: string, enabled: boolean) => Promise<void>;
  deleteFlag: (id: string) => Promise<void>;

  // Utility
  refreshFlags: () => Promise<void>;
}

/**
 * Hook for admin operations on feature flags
 *
 * @example
 * ```tsx
 * function FlagAdmin() {
 *   const {
 *     flags,
 *     isLoading,
 *     createFlag,
 *     toggleFlag,
 *     deleteFlag,
 *   } = useFeatureFlagAdmin();
 *
 *   const handleCreate = async () => {
 *     await createFlag({
 *       key: 'new-feature',
 *       name: 'New Feature',
 *       enabled: true,
 *     });
 *   };
 *
 *   return <FlagList flags={flags} onToggle={toggleFlag} />;
 * }
 * ```
 */
export function useFeatureFlagAdmin(): UseFeatureFlagAdminReturn {
  const [flags, setFlags] = useState<FeatureFlagWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearCache = useAppStore((state) => state.clearFlags);

  /**
   * Fetch all flags with optional filtering
   */
  const fetchFlags = useCallback(async (query?: FlagListQuery) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (query?.environment) params.append('environment', query.environment);
      if (query?.enabled !== undefined) params.append('enabled', String(query.enabled));
      if (query?.search) params.append('search', query.search);
      if (query?.page) params.append('page', String(query.page));
      if (query?.limit) params.append('limit', String(query.limit));

      const response = await fetch(`/api/v1/flags?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch flags');
      }

      const data = await response.json();
      setFlags(data.flags || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to fetch flags', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new feature flag
   */
  const createFlag = useCallback(async (data: CreateFeatureFlagDto) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create flag');
      }

      const newFlag = await response.json();
      setFlags((prev) => [newFlag, ...prev]);
      clearCache();

      toast.success('Flag created', {
        description: `${data.name} has been created successfully`,
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to create flag', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearCache]);

  /**
   * Update an existing flag
   */
  const updateFlag = useCallback(async (id: string, data: UpdateFeatureFlagDto) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/flags/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update flag');
      }

      const updatedFlag = await response.json();
      setFlags((prev) =>
        prev.map((flag) => (flag.id === id ? updatedFlag : flag))
      );
      clearCache();

      toast.success('Flag updated', {
        description: 'Changes have been saved successfully',
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to update flag', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearCache]);

  /**
   * Toggle flag enabled state
   */
  const toggleFlag = useCallback(async (id: string, enabled: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/flags/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle flag');
      }

      const { flag } = await response.json();
      setFlags((prev) =>
        prev.map((f) => (f.id === id ? { ...f, enabled: flag.enabled } : f))
      );
      clearCache();

      toast.success(
        enabled ? 'Flag enabled' : 'Flag disabled',
        {
          description: `The flag is now ${enabled ? 'active' : 'inactive'}`,
        }
      );
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to toggle flag', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearCache]);

  /**
   * Delete a flag permanently
   */
  const deleteFlag = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/flags/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete flag');
      }

      setFlags((prev) => prev.filter((flag) => flag.id !== id));
      clearCache();

      toast.success('Flag deleted', {
        description: 'The flag has been permanently deleted',
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to delete flag', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearCache]);

  /**
   * Refresh flags list
   */
  const refreshFlags = useCallback(async () => {
    await fetchFlags();
  }, [fetchFlags]);

  return {
    flags,
    isLoading,
    error,
    fetchFlags,
    createFlag,
    updateFlag,
    toggleFlag,
    deleteFlag,
    refreshFlags,
  };
}
