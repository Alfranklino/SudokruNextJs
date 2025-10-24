/**
 * FlagDashboard Component
 * Complete admin dashboard for managing feature flags
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useFeatureFlagAdmin } from '@/hooks/useFeatureFlagAdmin';
import type { FeatureFlagWithRelations, CreateFeatureFlagDto } from '@/types/feature-flags';
import { FlagList } from './FlagList';
import { FlagForm } from './FlagForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { toast } from 'sonner';

export function FlagDashboard() {
  const {
    flags,
    isLoading,
    fetchFlags,
    createFlag,
    updateFlag,
    toggleFlag,
    deleteFlag,
  } = useFeatureFlagAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [environmentFilter, setEnvironmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFlag, setEditingFlag] = useState<FeatureFlagWithRelations | null>(null);

  // Fetch flags on mount
  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  // Filter flags
  const filteredFlags = flags.filter((flag) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !flag.key.toLowerCase().includes(query) &&
        !flag.name.toLowerCase().includes(query) &&
        !flag.description?.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Environment filter
    if (environmentFilter !== 'all' && flag.environment !== environmentFilter) {
      return false;
    }

    // Status filter
    if (statusFilter === 'enabled' && !flag.enabled) {
      return false;
    }
    if (statusFilter === 'disabled' && flag.enabled) {
      return false;
    }

    return true;
  });

  const handleCreateFlag = async (data: CreateFeatureFlagDto) => {
    try {
      await createFlag(data);
      setIsCreateDialogOpen(false);
    } catch (error) {
      // Error is already toasted in the hook
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      await toggleFlag(id, enabled);
    } catch (error) {
      // Error is already toasted
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flag? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteFlag(id);
    } catch (error) {
      // Error is already toasted
    }
  };

  const stats = {
    total: flags.length,
    enabled: flags.filter((f) => f.enabled).length,
    disabled: flags.filter((f) => !f.enabled).length,
    withRules: flags.filter((f) => f.rules && f.rules.length > 0).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feature Flags</h1>
          <p className="text-muted-foreground mt-1">
            Manage feature flags and rollouts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => fetchFlags()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Flag
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Flags</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enabled</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.enabled}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Disabled</CardDescription>
            <CardTitle className="text-3xl text-gray-500">{stats.disabled}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>With Rules</CardDescription>
            <CardTitle className="text-3xl">{stats.withRules}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flags by key, name, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Environment Filter */}
            <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Environments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="DEVELOPMENT">Development</SelectItem>
                <SelectItem value="STAGING">Staging</SelectItem>
                <SelectItem value="PRODUCTION">Production</SelectItem>
                <SelectItem value="ALL">All (Multi-env)</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Flag List */}
      <FlagList
        flags={filteredFlags}
        isLoading={isLoading}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={(flag) => setEditingFlag(flag)}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Feature Flag</DialogTitle>
            <DialogDescription>
              Add a new feature flag to control feature rollouts
            </DialogDescription>
          </DialogHeader>
          <FlagForm
            onSubmit={handleCreateFlag}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingFlag} onOpenChange={() => setEditingFlag(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Feature Flag</DialogTitle>
            <DialogDescription>
              Update the feature flag configuration
            </DialogDescription>
          </DialogHeader>
          {editingFlag && (
            <FlagForm
              initialData={editingFlag}
              isEdit
              onSubmit={async (data) => {
                await updateFlag(editingFlag.id, data);
                setEditingFlag(null);
              }}
              onCancel={() => setEditingFlag(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
