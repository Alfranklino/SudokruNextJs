/**
 * FlagForm Component
 * Form for creating and editing feature flags
 */

'use client';

import React, { useState } from 'react';
import type { CreateFeatureFlagDto, UpdateFeatureFlagDto } from '@/types/feature-flags';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export interface FlagFormProps {
  initialData?: Partial<CreateFeatureFlagDto>;
  onSubmit: (data: CreateFeatureFlagDto | UpdateFeatureFlagDto) => Promise<void>;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function FlagForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: FlagFormProps) {
  const [formData, setFormData] = useState<Partial<CreateFeatureFlagDto>>({
    key: initialData?.key || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    enabled: initialData?.enabled ?? false,
    defaultValue: initialData?.defaultValue ?? false,
    flagType: initialData?.flagType || 'BOOLEAN',
    environment: initialData?.environment || 'ALL',
    rolloutPercent: initialData?.rolloutPercent ?? 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};

    if (!formData.key) {
      newErrors.key = 'Key is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.key)) {
      newErrors.key = 'Key must be lowercase alphanumeric with hyphens';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData as CreateFeatureFlagDto);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Configure the basic properties of your feature flag
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key */}
          <div className="space-y-2">
            <Label htmlFor="key">
              Key <span className="text-destructive">*</span>
            </Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) =>
                setFormData({ ...formData, key: e.target.value.toLowerCase() })
              }
              placeholder="my-new-feature"
              disabled={isEdit}
              className={errors.key ? 'border-destructive' : ''}
            />
            {errors.key && (
              <p className="text-sm text-destructive">{errors.key}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Unique identifier (lowercase, hyphens allowed)
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="My New Feature"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what this feature flag controls..."
              rows={3}
            />
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <Label htmlFor="environment">Environment</Label>
            <Select
              value={formData.environment}
              onValueChange={(value: any) =>
                setFormData({ ...formData, environment: value })
              }
            >
              <SelectTrigger id="environment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Environments</SelectItem>
                <SelectItem value="DEVELOPMENT">Development Only</SelectItem>
                <SelectItem value="STAGING">Staging Only</SelectItem>
                <SelectItem value="PRODUCTION">Production Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rollout Configuration</CardTitle>
          <CardDescription>
            Control how this feature is rolled out to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enabled */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enabled">Enabled</Label>
              <p className="text-sm text-muted-foreground">
                Enable this feature flag globally
              </p>
            </div>
            <Switch
              id="enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, enabled: checked })
              }
            />
          </div>

          {/* Default Value */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="defaultValue">Default Value</Label>
              <p className="text-sm text-muted-foreground">
                Value when no rules match
              </p>
            </div>
            <Switch
              id="defaultValue"
              checked={formData.defaultValue}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, defaultValue: checked })
              }
            />
          </div>

          {/* Rollout Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rolloutPercent">Rollout Percentage</Label>
              <span className="text-sm font-medium">
                {formData.rolloutPercent}%
              </span>
            </div>
            <Slider
              id="rolloutPercent"
              value={[formData.rolloutPercent || 0]}
              onValueChange={(value) =>
                setFormData({ ...formData, rolloutPercent: value[0] })
              }
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Percentage of users who will see this feature
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Flag' : 'Create Flag'}
        </Button>
      </div>
    </form>
  );
}
