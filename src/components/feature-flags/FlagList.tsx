/**
 * FlagList Component
 * Displays a list of feature flags with actions
 */

'use client';

import React from 'react';
import type { FeatureFlagWithRelations } from '@/types/feature-flags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Copy, Eye } from 'lucide-react';

export interface FlagListProps {
  flags: FeatureFlagWithRelations[];
  isLoading?: boolean;
  onToggle?: (id: string, enabled: boolean) => void;
  onEdit?: (flag: FeatureFlagWithRelations) => void;
  onDelete?: (id: string) => void;
  onView?: (flag: FeatureFlagWithRelations) => void;
}

export function FlagList({
  flags,
  isLoading = false,
  onToggle,
  onEdit,
  onDelete,
  onView,
}: FlagListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (flags.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No feature flags found</p>
          <p className="text-sm text-muted-foreground">
            Create your first feature flag to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {flags.map((flag) => (
        <Card key={flag.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{flag.name}</CardTitle>
                  <Badge
                    variant={flag.enabled ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                  <Badge variant="outline">{flag.environment}</Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {flag.key}
                  </code>
                  {flag.description && (
                    <span className="text-sm">{flag.description}</span>
                  )}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                {onToggle && (
                  <Switch
                    checked={flag.enabled}
                    onCheckedChange={(enabled) => onToggle(flag.id, enabled)}
                  />
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(flag)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    )}
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(flag)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(flag.key);
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Key
                    </DropdownMenuItem>
                    {onDelete && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(flag.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Flag Metadata */}
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              {flag.rolloutPercent > 0 && (
                <div className="flex items-center gap-1">
                  <span>Rollout:</span>
                  <Badge variant="outline">{flag.rolloutPercent}%</Badge>
                </div>
              )}
              {flag.rules && flag.rules.length > 0 && (
                <div className="flex items-center gap-1">
                  <span>Rules:</span>
                  <Badge variant="outline">{flag.rules.length}</Badge>
                </div>
              )}
              {flag.overrides && flag.overrides.length > 0 && (
                <div className="flex items-center gap-1">
                  <span>Overrides:</span>
                  <Badge variant="outline">{flag.overrides.length}</Badge>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
