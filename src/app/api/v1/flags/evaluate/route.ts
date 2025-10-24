/**
 * Feature Flag Evaluation API
 * POST /api/v1/flags/evaluate - Evaluate flags for current user/context
 */

import { NextRequest, NextResponse } from 'next/server';
import { featureFlagService } from '@/lib/feature-flags';
import { buildContextFromRequest, buildMinimalContext } from '@/lib/feature-flags';
import type { EvaluateFlagsRequest } from '@/types/feature-flags';
import { z } from 'zod';

// Validation schema
const evaluateRequestSchema = z.object({
  keys: z.array(z.string()).optional(),
  context: z
    .object({
      userId: z.string().optional(),
      username: z.string().optional(),
      email: z.string().email().optional(),
      subscriptionTier: z.enum(['FREE', 'PREMIUM']).optional(),
      userRole: z.enum(['USER', 'MODERATOR', 'ADMIN']).optional(),
      eloRating: z.number().optional(),
      country: z.string().optional(),
      deviceType: z.enum(['mobile', 'tablet', 'desktop']).optional(),
      customAttributes: z.record(z.unknown()).optional(),
    })
    .optional(),
});

/**
 * POST /api/v1/flags/evaluate
 * Evaluate feature flags for the given context
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Get user from session if authenticated
    // const session = await getServerSession();
    // const user = session?.user;

    const body = await request.json();

    // Validate request
    const validationResult = evaluateRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: EvaluateFlagsRequest = validationResult.data;

    // Build evaluation context
    let context = data.context || buildMinimalContext();

    // Merge with request context (device type, user agent, etc.)
    const requestContext = buildContextFromRequest(request);
    context = { ...requestContext, ...context };

    // Evaluate flags
    let result;
    if (data.keys && data.keys.length > 0) {
      // Evaluate specific flags
      result = await featureFlagService.evaluateFlags(data.keys, context);
    } else {
      // Evaluate all flags
      result = await featureFlagService.evaluateAllFlags(context);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error evaluating flags:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate feature flags' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/flags/evaluate
 * Evaluate all flags for authenticated user (convenience endpoint)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from session
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Build context from request and user
    const context = buildContextFromRequest(request);

    // Evaluate all flags
    const result = await featureFlagService.evaluateAllFlags(context);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error evaluating flags:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate feature flags' },
      { status: 500 }
    );
  }
}
