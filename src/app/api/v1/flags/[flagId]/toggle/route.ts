/**
 * Feature Flag Toggle API
 * POST /api/v1/flags/[flagId]/toggle - Toggle flag enabled state
 */

import { NextRequest, NextResponse } from 'next/server';
import { featureFlagService } from '@/lib/feature-flags';
import { db } from '@/lib/db';
import type { ToggleFlagRequest } from '@/types/feature-flags';
import { z } from 'zod';

const toggleRequestSchema = z.object({
  enabled: z.boolean(),
  reason: z.string().max(500).optional(),
});

/**
 * POST /api/v1/flags/[flagId]/toggle
 * Toggle feature flag enabled state
 */
export async function POST(
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

    // Validate request
    const validationResult = toggleRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: ToggleFlagRequest = validationResult.data;

    // Check if flag exists
    const existingFlag = await db.featureFlag.findUnique({
      where: { id: flagId },
    });

    if (!existingFlag) {
      return NextResponse.json({ error: 'Flag not found' }, { status: 404 });
    }

    const previousState = existingFlag.enabled;

    // Toggle flag
    const flag = await featureFlagService.toggleFlag(
      flagId,
      data.enabled
      // session.user.id // toggledBy
    );

    return NextResponse.json({
      flag,
      previousState,
      newState: flag.enabled,
      toggledAt: new Date(),
    });
  } catch (error) {
    console.error('Error toggling flag:', error);
    return NextResponse.json(
      { error: 'Failed to toggle feature flag' },
      { status: 500 }
    );
  }
}
