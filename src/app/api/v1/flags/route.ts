/**
 * Feature Flags API Routes
 * GET /api/v1/flags - List all flags
 * POST /api/v1/flags - Create new flag
 */

import { NextRequest, NextResponse } from 'next/server';
import { featureFlagService } from '@/lib/feature-flags';
import type { CreateFeatureFlagDto, FlagListQuery } from '@/types/feature-flags';
import { z } from 'zod';

// Validation schemas
const createFlagSchema = z.object({
  key: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(200),
  description: z.string().max(500).optional(),
  enabled: z.boolean().default(false),
  defaultValue: z.boolean().default(false),
  flagType: z.enum(['BOOLEAN', 'STRING', 'NUMBER', 'JSON']).default('BOOLEAN'),
  environment: z.enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'ALL']).default('ALL'),
  rolloutPercent: z.number().min(0).max(100).default(0),
  rules: z
    .array(
      z.object({
        name: z.string(),
        ruleType: z.enum([
          'USER_ID',
          'USER_SEGMENT',
          'ELO_RATING',
          'SUBSCRIPTION_TIER',
          'COUNTRY',
          'DEVICE_TYPE',
          'USER_ROLE',
          'CUSTOM',
        ]),
        operator: z.enum([
          'EQUALS',
          'NOT_EQUALS',
          'IN',
          'NOT_IN',
          'GREATER_THAN',
          'LESS_THAN',
          'GREATER_THAN_OR_EQUAL',
          'LESS_THAN_OR_EQUAL',
          'CONTAINS',
          'STARTS_WITH',
          'ENDS_WITH',
        ]),
        value: z.union([z.string(), z.array(z.string()), z.number(), z.array(z.number())]),
        priority: z.number().default(0),
        enabled: z.boolean().default(true),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        key: z.string(),
        name: z.string(),
        description: z.string().optional(),
        value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())]),
        weight: z.number().min(0).max(100).default(0),
      })
    )
    .optional(),
});

/**
 * GET /api/v1/flags
 * List all feature flags with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const searchParams = request.nextUrl.searchParams;
    const enabledParam = searchParams.get('enabled');
    const archivedParam = searchParams.get('archived');

    const query: FlagListQuery = {
      environment: searchParams.get('environment') as any,
      enabled: enabledParam !== null ? enabledParam === 'true' : undefined,
      archived: archivedParam !== null ? archivedParam === 'true' : undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '50'),
    };

    // Get all flags
    const allFlags = await featureFlagService.getAllFlags();

    // Apply filters
    let filteredFlags = allFlags;

    if (query.environment && query.environment !== 'ALL') {
      filteredFlags = filteredFlags.filter(
        (flag) => flag.environment === query.environment || flag.environment === 'ALL'
      );
    }

    if (query.enabled !== undefined) {
      filteredFlags = filteredFlags.filter((flag) => flag.enabled === query.enabled);
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredFlags = filteredFlags.filter(
        (flag) =>
          flag.key.toLowerCase().includes(searchLower) ||
          flag.name.toLowerCase().includes(searchLower) ||
          flag.description?.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFlags = filteredFlags.slice(startIndex, endIndex);

    return NextResponse.json({
      flags: paginatedFlags,
      pagination: {
        total: filteredFlags.length,
        page,
        limit,
        totalPages: Math.ceil(filteredFlags.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching flags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature flags' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/flags
 * Create a new feature flag
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication and authorization check
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const body = await request.json();

    // Validate request body
    const validationResult = createFlagSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: CreateFeatureFlagDto = validationResult.data;

    // Check if flag key already exists
    const existingFlags = await featureFlagService.getAllFlags();
    if (existingFlags.some((flag) => flag.key === data.key)) {
      return NextResponse.json(
        { error: 'Flag with this key already exists' },
        { status: 409 }
      );
    }

    // Create flag
    const flag = await featureFlagService.createFlag(
      data
      // session.user.id // createdBy
    );

    return NextResponse.json(flag, { status: 201 });
  } catch (error) {
    console.error('Error creating flag:', error);
    return NextResponse.json(
      { error: 'Failed to create feature flag' },
      { status: 500 }
    );
  }
}
