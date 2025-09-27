# Sudokru - Environment Configuration Guide

## 1. Environment Overview

Sudokru supports three distinct environments, each with specific configurations optimized for their purpose:

- **Development:** Local development with hot reloading and debugging tools
- **Staging:** Production-like environment for testing and QA
- **Production:** Live environment with optimized performance and security

## 2. Development Environment Setup

### 2.1 Prerequisites

```bash
# Required software versions
Node.js: 18.17.0 or higher
npm: 9.0.0 or higher
Git: 2.40.0 or higher

# Optional but recommended
Docker: 24.0.0 or higher (for PostgreSQL)
VS Code: Latest version
```

### 2.2 Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/sudokru.git
cd sudokru

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Generate database
npx prisma generate
npx prisma migrate dev --name init

# Seed database with test data
npm run db:seed

# Start development server
npm run dev
```

### 2.3 Development Environment Variables

```bash
# .env.local (Development)

# ================================
# CACHING & PERFORMANCE
# ================================
REDIS_URL="redis://staging-redis:6379"
REDIS_PASSWORD="staging-redis-password"

# CDN Configuration
NEXT_PUBLIC_CDN_URL="https://cdn-staging.sudokru.com"

# ================================
# FEATURE FLAGS
# ================================
NEXT_PUBLIC_ENABLE_TOURNAMENTS=true
NEXT_PUBLIC_ENABLE_PREMIUM=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG_PANEL=true

# ================================
# SECURITY
# ================================
CORS_ORIGINS="https://staging.sudokru.com"
RATE_LIMIT_MAX=1000
RATE_LIMIT_WINDOW_MS=900000

# ================================
# LOGGING
# ================================
LOG_LEVEL=info
LOG_FORMAT=json
```

### 3.2 Staging Deployment Configuration

```yaml
# .github/workflows/staging-deploy.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]
  pull_request:
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}
      
      - name: Build application
        run: npm run build
        env:
          NEXTAUTH_SECRET: ${{ secrets.STAGING_NEXTAUTH_SECRET }}
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

## 4. Production Environment

### 4.1 Production Environment Variables

```bash
# .env.production (Production)

# ================================
# CORE APPLICATION SETTINGS
# ================================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://sudokru.com
NEXT_PUBLIC_API_URL=https://sudokru.com/api

# ================================
# DATABASE CONFIGURATION
# ================================
# Production PostgreSQL with connection pooling
DATABASE_URL="postgresql://username:password@prod-host:5432/sudokru_prod?connection_limit=100"
DATABASE_POOL_SIZE=50
DATABASE_TIMEOUT=30000

# Read replicas for analytics queries
DATABASE_READ_URL="postgresql://username:password@read-replica-host:5432/sudokru_prod"

# ================================
# AUTHENTICATION
# ================================
NEXTAUTH_SECRET="highly-secure-production-secret-key-32-chars-min"
NEXTAUTH_URL="https://sudokru.com"

# Production OAuth Apps
GOOGLE_CLIENT_ID="prod-google-client-id"
GOOGLE_CLIENT_SECRET="prod-google-client-secret"
GITHUB_CLIENT_ID="prod-github-client-id"
GITHUB_CLIENT_SECRET="prod-github-client-secret"
DISCORD_CLIENT_ID="prod-discord-client-id"
DISCORD_CLIENT_SECRET="prod-discord-client-secret"

# ================================
# REAL-TIME COMMUNICATION
# ================================
NEXT_PUBLIC_WEBSOCKET_URL="wss://ws.sudokru.com"

# WebSocket cluster configuration
WEBSOCKET_REDIS_HOST="prod-redis-cluster.abc123.cache.amazonaws.com"
WEBSOCKET_REDIS_PORT=6379
WEBSOCKET_REDIS_PASSWORD="prod-redis-password"

# ================================
# EXTERNAL SERVICES
# ================================
# Stripe Live Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_live_..."

# SendGrid Production
SENDGRID_API_KEY="SG.production_key"
SENDGRID_FROM_EMAIL="noreply@sudokru.com"
SENDGRID_TEMPLATE_WELCOME="d-abc123"
SENDGRID_TEMPLATE_PASSWORD_RESET="d-def456"

# ================================
# ANALYTICS & MONITORING
# ================================
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_SENTRY_DSN="https://production-sentry-dsn"
NEXT_PUBLIC_HOTJAR_ID="production-hotjar-id"

# Error tracking
SENTRY_ORG="sudokru"
SENTRY_PROJECT="sudokru-web"
SENTRY_AUTH_TOKEN="production-sentry-token"

# ================================
# CACHING & PERFORMANCE
# ================================
# Redis Cluster for production
REDIS_URL="redis://prod-redis-cluster:6379"
REDIS_PASSWORD="prod-redis-secure-password"
REDIS_CLUSTER_ENABLED=true

# CDN Configuration
NEXT_PUBLIC_CDN_URL="https://cdn.sudokru.com"
CDN_PURGE_TOKEN="production-cdn-purge-token"

# ================================
# SECURITY
# ================================
CORS_ORIGINS="https://sudokru.com,https://www.sudokru.com"
RATE_LIMIT_MAX=500
RATE_LIMIT_WINDOW_MS=900000

# Security headers
CSP_REPORT_URI="https://sudokru.report-uri.com/r/d/csp/enforce"
HSTS_MAX_AGE=31536000

# ================================
# FEATURE FLAGS
# ================================
NEXT_PUBLIC_ENABLE_TOURNAMENTS=true
NEXT_PUBLIC_ENABLE_PREMIUM=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG_PANEL=false

# ================================
# LOGGING & MONITORING
# ================================
LOG_LEVEL=warn
LOG_FORMAT=json
LOG_DESTINATION=datadog

# Datadog APM
DD_API_KEY="production-datadog-api-key"
DD_APP_KEY="production-datadog-app-key"
DD_SERVICE="sudokru-web"
DD_ENV="production"

# ================================
# BACKUP & DISASTER RECOVERY
# ================================
BACKUP_S3_BUCKET="sudokru-backups-prod"
BACKUP_S3_REGION="us-east-1"
BACKUP_S3_ACCESS_KEY="backup-access-key"
BACKUP_S3_SECRET_KEY="backup-secret-key"
```

### 4.2 Production Deployment Configuration

```yaml
# .github/workflows/production-deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run security audit
        run: npm audit --audit-level=high
      
      - name: Scan for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./

  test-suite:
    runs-on: ubuntu-latest
    needs: security-scan
    
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test:coverage
      
      - name: E2E tests
        run: npm run e2e:ci

  deploy-production:
    runs-on: ubuntu-latest
    needs: [security-scan, test-suite]
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Database migration
        run: npm run db:migrate:deploy
        env:
          DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
      
      - name: Build application
        run: npm run build
        env:
          NEXTAUTH_SECRET: ${{ secrets.PROD_NEXTAUTH_SECRET }}
          DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 5. Environment-Specific Configurations

### 5.1 Database Configuration by Environment

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Environment-specific connection pooling
const dbConfig = {
  development: {
    connectionLimit: 10,
    idleTimeout: 30000,
  },
  staging: {
    connectionLimit: 20,
    idleTimeout: 60000,
  },
  production: {
    connectionLimit: 50,
    idleTimeout: 180000,
    readReplicas: process.env.DATABASE_READ_URL ? [process.env.DATABASE_READ_URL] : [],
  },
};

export const getDbConfig = () => dbConfig[process.env.NODE_ENV as keyof typeof dbConfig] || dbConfig.development;
```

### 5.2 Feature Flags Implementation

```typescript
// src/lib/feature-flags.ts
export const featureFlags = {
  enableTournaments: process.env.NEXT_PUBLIC_ENABLE_TOURNAMENTS === 'true',
  enablePremium: process.env.NEXT_PUBLIC_ENABLE_PREMIUM === 'true',
  enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDebugPanel: process.env.NEXT_PUBLIC_ENABLE_DEBUG_PANEL === 'true',
} as const;

// Usage in components
import { featureFlags } from '@/lib/feature-flags';

export function TournamentButton() {
  if (!featureFlags.enableTournaments) {
    return null;
  }
  
  return <Button>Join Tournament</Button>;
}
```

### 5.3 Logging Configuration

```typescript
// src/lib/logger.ts
import winston from 'winston';

const logLevel = process.env.LOG_LEVEL || 'info';
const logFormat = process.env.LOG_FORMAT === 'json' ? winston.format.json() : winston.format.simple();

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  defaultMeta: {
    service: 'sudokru-web',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    
    // File transport for production
    ...(process.env.NODE_ENV === 'production' ? [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
      }),
    ] : []),
    
    // External logging service for production
    ...(process.env.DD_API_KEY ? [
      new winston.transports.Http({
        host: 'http-intake.logs.datadoghq.com',
        path: `/v1/input/${process.env.DD_API_KEY}`,
        ssl: true,
      }),
    ] : []),
  ],
});
```

## 6. Environment Validation

### 6.1 Environment Schema Validation

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  
  // Optional with defaults
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  REDIS_URL: z.string().optional(),
  
  // Feature flags
  NEXT_PUBLIC_ENABLE_TOURNAMENTS: z.string().transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_PREMIUM: z.string().transform(val => val === 'true'),
  
  // External services
  STRIPE_SECRET_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
```

### 6.2 Startup Health Checks

```typescript
// src/lib/health-check.ts
export async function performHealthChecks() {
  const checks = [
    checkDatabase(),
    checkRedis(),
    checkExternalServices(),
  ];

  const results = await Promise.allSettled(checks);
  
  const failures = results
    .map((result, index) => ({ result, check: checks[index].name }))
    .filter(({ result }) => result.status === 'rejected');

  if (failures.length > 0) {
    console.error('Health check failures:', failures);
    
    if (process.env.NODE_ENV === 'production') {
      // Alert monitoring system
      // Exit process for container restart
      process.exit(1);
    }
  }
}

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { service: 'database', status: 'healthy' };
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`);
  }
}

async function checkRedis() {
  if (!process.env.REDIS_URL) return { service: 'redis', status: 'disabled' };
  
  try {
    // Redis connection check
    return { service: 'redis', status: 'healthy' };
  } catch (error) {
    throw new Error(`Redis connection failed: ${error}`);
  }
}
```

## 7. Security Configuration

### 7.1 Environment-Specific Security Headers

```typescript
// next.config.js - Security headers by environment
const securityHeaders = {
  development: [
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
  ],
  
  staging: [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin',
    },
  ],
  
  production: [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.sudokru.com",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: blob: *.sudokru.com",
        "connect-src 'self' *.sudokru.com wss://*.sudokru.com",
      ].join('; '),
    },
  ],
};

const headers = securityHeaders[process.env.NODE_ENV] || securityHeaders.development;
```

### 7.2 CORS Configuration

```typescript
// src/lib/cors.ts
import { NextRequest } from 'next/server';

const corsOrigins = {
  development: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  staging: ['https://staging.sudokru.com'],
  production: ['https://sudokru.com', 'https://www.sudokru.com'],
};

export function getCorsOrigins(): string[] {
  const env = process.env.NODE_ENV as keyof typeof corsOrigins;
  return corsOrigins[env] || corsOrigins.development;
}

export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  
  const allowedOrigins = getCorsOrigins();
  return allowedOrigins.includes(origin);
}
```

## 8. Monitoring and Observability

### 8.1 Environment-Specific Monitoring

```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

// Initialize monitoring based on environment
export function initializeMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      profilesSampleRate: 0.1,
      beforeSend: (event) => {
        // Filter out sensitive data
        if (event.request?.cookies) {
          delete event.request.cookies;
        }
        return event;
      },
    });
  }
  
  // Development monitoring (lighter)
  if (process.env.NODE_ENV === 'development') {
    console.log('Development monitoring enabled');
  }
}
```

This comprehensive environment configuration guide ensures secure, scalable deployment across all environments while maintaining development efficiency and production reliability. CORE APPLICATION SETTINGS
# ================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# ================================
# DATABASE CONFIGURATION
# ================================
# SQLite for development (fast setup)
DATABASE_URL="file:./dev.db"

# Alternative: Local PostgreSQL via Docker
# DATABASE_URL="postgresql://sudokru:password@localhost:5432/sudokru_dev"

# ================================
# AUTHENTICATION
# ================================
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Development Keys (use test credentials)
GOOGLE_CLIENT_ID="your-dev-google-client-id"
GOOGLE_CLIENT_SECRET="your-dev-google-client-secret"
GITHUB_CLIENT_ID="your-dev-github-client-id"
GITHUB_CLIENT_SECRET="your-dev-github-client-secret"
DISCORD_CLIENT_ID="your-dev-discord-client-id"
DISCORD_CLIENT_SECRET="your-dev-discord-client-secret"

# ================================
# REAL-TIME COMMUNICATION
# ================================
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3001"
WEBSOCKET_PORT=3001

# ================================
# EXTERNAL SERVICES (TEST KEYS)
# ================================
# Stripe Test Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."

# SendGrid (use test API key with limited sending)
SENDGRID_API_KEY="SG.test_key"
SENDGRID_FROM_EMAIL="noreply@localhost"

# ================================
# ANALYTICS & MONITORING
# ================================
# Disable analytics in development
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_SENTRY_DSN=""

# ================================
# FEATURE FLAGS
# ================================
NEXT_PUBLIC_ENABLE_TOURNAMENTS=true
NEXT_PUBLIC_ENABLE_PREMIUM=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# ================================
# DEVELOPMENT TOOLS
# ================================
# Enable debug logging
DEBUG=sudokru:*
LOG_LEVEL=debug

# Prisma Studio
PRISMA_STUDIO_PORT=5555

# Storybook
STORYBOOK_PORT=6006
```

### 2.4 Development Scripts

```json
// package.json scripts for development
{
  "scripts": {
    "dev": "next dev",
    "dev:debug": "NODE_OPTIONS='--inspect' next dev",
    "dev:turbo": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset --force",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build"
  }
}
```

### 2.5 Docker Development Setup

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: sudokru-postgres-dev
    environment:
      POSTGRES_USER: sudokru
      POSTGRES_PASSWORD: password
      POSTGRES_DB: sudokru_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    container_name: sudokru-redis-dev
    ports:
      - "6379:6379"
    volumes:
      - redis_dev_data:/data

  mailhog:
    image: mailhog/mailhog
    container_name: sudokru-mailhog
    ports:
      - "1025:1025"  # SMTP port
      - "8025:8025"  # Web UI port

volumes:
  postgres_dev_data:
  redis_dev_data:
```

```bash
# Start development services
docker-compose -f docker-compose.dev.yml up -d

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://sudokru:password@localhost:5432/sudokru_dev"
REDIS_URL="redis://localhost:6379"
SMTP_HOST="localhost"
SMTP_PORT=1025
```

## 3. Staging Environment

### 3.1 Staging Environment Variables

```bash
# .env.staging (Staging)

# ================================
# CORE APPLICATION SETTINGS
# ================================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.sudokru.com
NEXT_PUBLIC_API_URL=https://staging.sudokru.com/api

# ================================
# DATABASE CONFIGURATION
# ================================
# Staging PostgreSQL (Railway/Supabase/PlanetScale)
DATABASE_URL="postgresql://username:password@staging-host:5432/sudokru_staging"
DATABASE_POOL_SIZE=20

# ================================
# AUTHENTICATION
# ================================
NEXTAUTH_SECRET="staging-secret-key-different-from-prod"
NEXTAUTH_URL="https://staging.sudokru.com"

# OAuth Staging Apps (separate from production)
GOOGLE_CLIENT_ID="staging-google-client-id"
GOOGLE_CLIENT_SECRET="staging-google-client-secret"
GITHUB_CLIENT_ID="staging-github-client-id"
GITHUB_CLIENT_SECRET="staging-github-client-secret"

# ================================
# REAL-TIME COMMUNICATION
# ================================
NEXT_PUBLIC_WEBSOCKET_URL="wss://staging-ws.sudokru.com"

# ================================
# EXTERNAL SERVICES
# ================================
# Stripe Test Mode (even in staging)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_staging_..."
STRIPE_SECRET_KEY="sk_test_staging_..."
STRIPE_WEBHOOK_SECRET="whsec_staging_..."

# SendGrid with limited sending
SENDGRID_API_KEY="SG.staging_key"
SENDGRID_FROM_EMAIL="staging@sudokru.com"

# ================================
# ANALYTICS & MONITORING
# ================================
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_SENTRY_DSN="https://staging-sentry-dsn"
NEXT_PUBLIC_HOTJAR_ID="staging-hotjar-id"

# ================================
#