/**
 * Specific Feature Flag API Routes
 * GET /api/v1/flags/[flagId] - Get flag details
 * PUT /api/v1/flags/[flagId] - Update flag
 * DELETE /api/v1/flags/[flagId] - Delete flag
 */

import { NextRequest, NextResponse } from 'next/server';
import { featureFlagService } from '@/lib/feature-flags';
import { db } from '@/lib/db';
import type { UpdateFeatureFlagDto } from '@/types/feature-flags';
import { z } from 'zod';

const updateFlagSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  description: z.string().max(500).optional(),
  enabled: z.boolean().optional(),
  defaultValue: z.boolean().optional(),
  rolloutPercent: z.number().min(0).max(100).optional(),
  environment: z
    .enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'ALL'])
    .optional(),
});

/**
 * GET /api/v1/flags/[flagId]
 * Get specific flag with all relations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { flagId: string } }
) {
  try {
    const { flagId } = params;

    const flag = await db.featureFlag.findUnique({
      where: { id: flagId },
      include: {
        rules: {
          orderBy: { priority: 'desc' },
        },
        variants: true,
        overrides: {
          where: {
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
          },
        },
        auditLogs: {
          take: 50,
          orderBy: { timestamp: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
          },
        },
      },
    });

    if (!flag) {
      return NextResponse.json({ error: 'Flag not found' }, { status: 404 });
    }

    return NextResponse.json(flag);
  } catch (error) {
    console.error('Error fetching flag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature flag' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/v1/flags/[flagId]
 * Update feature flag
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { flagId: string } }
) {
  try {
    // TODO: Add authentication and authorization check
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const { flagId } = params;
    const body = await request.json();

    // Validate request body
    const validationResult = updateFlagSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: UpdateFeatureFlagDto = validationResult.data;

    // Check if flag exists
    const existingFlag = await db.featureFlag.findUnique({
      where: { id: flagId },
    });

    if (!existingFlag) {
      return NextResponse.json({ error: 'Flag not found' }, { status: 404 });
    }

    // Update flag
    const flag = await featureFlagService.updateFlag(
      flagId,
      data
      // session.user.id // updatedBy
    );

    return NextResponse.json(flag);
  } catch (error) {
    console.error('Error updating flag:', error);
    return NextResponse.json(
      { error: 'Failed to update feature flag' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/flags/[flagId]
 * Delete feature flag permanently
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { flagId: string } }
) {
  try {
    // TODO: Add authentication and authorization check
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const { flagId } = params;

    // Check if flag exists
    const existingFlag = await db.featureFlag.findUnique({
      where: { id: flagId },
    });

    if (!existingFlag) {
      return NextResponse.json({ error: 'Flag not found' }, { status: 404 });
    }

    // Delete flag
    await featureFlagService.deleteFlag(flagId);

    return NextResponse.json({ success: true, message: 'Flag deleted successfully' });
  } catch (error) {
    console.error('Error deleting flag:', error);
    return NextResponse.json(
      { error: 'Failed to delete feature flag' },
      { status: 500 }
    );
  }
}
