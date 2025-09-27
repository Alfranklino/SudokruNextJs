# Sudokru - Error Handling & Logging Standards

## 1. Error Classification System

### 1.1 Error Categories

```typescript
// Error type hierarchy
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  BUSINESS_LOGIC = 'business_logic',
  EXTERNAL_SERVICE = 'external_service',
  DATABASE = 'database',
  NETWORK = 'network',
  SYSTEM = 'system',
  USER_INPUT = 'user_input',
  RATE_LIMIT = 'rate_limit',
  GAME_ENGINE = 'game_engine',
  REAL_TIME = 'real_time'
}

export enum ErrorSeverity {
  LOW = 'low',           // Minor issues, non-blocking
  MEDIUM = 'medium',     // Important issues, degraded experience
  HIGH = 'high',         // Critical issues, blocking user actions
  CRITICAL = 'critical'  // System-breaking issues, immediate attention
}

export enum ErrorCode {
  // Authentication (1000-1099)
  INVALID_CREDENTIALS = 1001,
  TOKEN_EXPIRED = 1002,
  TOKEN_INVALID = 1003,
  ACCOUNT_SUSPENDED = 1004,
  ACCOUNT_BANNED = 1005,
  EMAIL_NOT_VERIFIED = 1006,
  TWO_FACTOR_REQUIRED = 1007,
  TWO_FACTOR_INVALID = 1008,

  // Authorization (1100-1199)
  INSUFFICIENT_PERMISSIONS = 1101,
  PREMIUM_REQUIRED = 1102,
  ADMIN_REQUIRED = 1103,
  ROLE_REQUIRED = 1104,

  // Validation (2000-2099)
  INVALID_INPUT = 2001,
  MISSING_REQUIRED_FIELD = 2002,
  INVALID_EMAIL_FORMAT = 2003,
  USERNAME_TOO_SHORT = 2004,
  PASSWORD_TOO_WEAK = 2005,
  INVALID_MOVE_FORMAT = 2006,
  INVALID_GAME_SETTINGS = 2007,

  // Business Logic (3000-3099)
  GAME_NOT_FOUND = 3001,
  GAME_FULL = 3002,
  GAME_ALREADY_STARTED = 3003,
  GAME_ALREADY_COMPLETED = 3004,
  INVALID_GAME_STATE = 3005,
  PLAYER_NOT_IN_GAME = 3006,
  NOT_PLAYER_TURN = 3007,
  TOURNAMENT_NOT_FOUND = 3008,
  TOURNAMENT_FULL = 3009,
  TOURNAMENT_CLOSED = 3010,

  // Game Engine (3100-3199)
  INVALID_SUDOKU_MOVE = 3101,
  PUZZLE_GENERATION_FAILED = 3102,
  SOLUTION_VALIDATION_FAILED = 3103,
  GRID_CORRUPTION = 3104,

  // External Services (4000-4099)
  STRIPE_ERROR = 4001,
  SENDGRID_ERROR = 4002,
  OAUTH_PROVIDER_ERROR = 4003,
  CDN_ERROR = 4004,

  // Database (5000-5099)
  DATABASE_CONNECTION_FAILED = 5001,
  QUERY_TIMEOUT = 5002,
  CONSTRAINT_VIOLATION = 5003,
  TRANSACTION_FAILED = 5004,
  MIGRATION_FAILED = 5005,

  // Real-time (6000-6099)
  WEBSOCKET_CONNECTION_FAILED = 6001,
  MESSAGE_DELIVERY_FAILED = 6002,
  ROOM_JOIN_FAILED = 6003,
  BROADCAST_FAILED = 6004,

  // Rate Limiting (7000-7099)
  RATE_LIMIT_EXCEEDED = 7001,
  DAILY_LIMIT_EXCEEDED = 7002,
  CONCURRENT_LIMIT_EXCEEDED = 7003,

  // System (8000-8099)
  INTERNAL_SERVER_ERROR = 8001,
  SERVICE_UNAVAILABLE = 8002,
  TIMEOUT = 8003,
  OUT_OF_MEMORY = 8004,
  DISK_SPACE_LOW = 8005,

  // Network (9000-9099)
  CONNECTION_TIMEOUT = 9001,
  DNS_RESOLUTION_FAILED = 9002,
  SSL_CERTIFICATE_ERROR = 9003,
}
```

### 1.2 Custom Error Classes

```typescript
// Base application error class
export abstract class AppError extends Error {
  abstract readonly category: ErrorCategory;
  abstract readonly severity: ErrorSeverity;
  abstract readonly code: ErrorCode;
  abstract readonly userMessage: string;
  
  public readonly timestamp: Date;
  public readonly context: Record<string, any>;
  public readonly correlationId: string;

  constructor(
    message: string,
    context: Record<string, any> = {},
    correlationId?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.context = context;
    this.correlationId = correlationId || generateCorrelationId();
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      category: this.category,
      severity: this.severity,
      code: this.code,
      userMessage: this.userMessage,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      correlationId: this.correlationId,
      stack: this.stack,
    };
  }

  toUserResponse() {
    return {
      error: this.userMessage,
      code: this.code,
      correlationId: this.correlationId,
    };
  }
}

// Authentication errors
export class AuthenticationError extends AppError {
  readonly category = ErrorCategory.AUTHENTICATION;
  readonly severity = ErrorSeverity.MEDIUM;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    context: Record<string, any> = {}
  ) {
    super(message, context);
    this.code = code;
    this.userMessage = userMessage;
  }
}

// Authorization errors
export class AuthorizationError extends AppError {
  readonly category = ErrorCategory.AUTHORIZATION;
  readonly severity = ErrorSeverity.HIGH;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string = 'You do not have permission to perform this action',
    context: Record<string, any> = {}
  ) {
    super(message, context);
    this.code = code;
    this.userMessage = userMessage;
  }
}

// Validation errors
export class ValidationError extends AppError {
  readonly category = ErrorCategory.VALIDATION;
  readonly severity = ErrorSeverity.LOW;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    public readonly fields: Record<string, string[]> = {},
    context: Record<string, any> = {}
  ) {
    super(message, { ...context, fields });
    this.code = code;
    this.userMessage = userMessage;
  }

  toUserResponse() {
    return {
      ...super.toUserResponse(),
      fields: this.fields,
    };
  }
}

// Business logic errors
export class BusinessLogicError extends AppError {
  readonly category = ErrorCategory.BUSINESS_LOGIC;
  readonly severity = ErrorSeverity.MEDIUM;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    context: Record<string, any> = {}
  ) {
    super(message, context);
    this.code = code;
    this.userMessage = userMessage;
  }
}

// Game engine errors
export class GameEngineError extends AppError {
  readonly category = ErrorCategory.GAME_ENGINE;
  readonly severity = ErrorSeverity.HIGH;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string = 'A game error occurred. Please try again.',
    context: Record<string, any> = {}
  ) {
    super(message, context);
    this.code = code;
    this.userMessage = userMessage;
  }
}

// External service errors
export class ExternalServiceError extends AppError {
  readonly category = ErrorCategory.EXTERNAL_SERVICE;
  readonly severity = ErrorSeverity.HIGH;

  constructor(
    code: ErrorCode,
    service: string,
    message: string,
    userMessage: string = 'External service temporarily unavailable',
    context: Record<string, any> = {}
  ) {
    super(message, { ...context, service });
    this.code = code;
    this.userMessage = userMessage;
  }
}

// System errors
export class SystemError extends AppError {
  readonly category = ErrorCategory.SYSTEM;
  readonly severity = ErrorSeverity.CRITICAL;

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string = 'System error occurred. Our team has been notified.',
    context: Record<string, any> = {}
  ) {
    super(message, context);
    this.code = code;
    this.userMessage = userMessage;
  }
}
```

## 2. Error Factory Functions

### 2.1 Predefined Error Creators

```typescript
// src/lib/errors/factories.ts
export const ErrorFactory = {
  // Authentication errors
  invalidCredentials: (correlationId?: string) =>
    new AuthenticationError(
      ErrorCode.INVALID_CREDENTIALS,
      'Invalid email/username or password provided',
      'Invalid credentials. Please check your email/username and password.',
      {},
      correlationId
    ),

  tokenExpired: (correlationId?: string) =>
    new AuthenticationError(
      ErrorCode.TOKEN_EXPIRED,
      'JWT token has expired',
      'Your session has expired. Please log in again.',
      {},
      correlationId
    ),

  accountSuspended: (reason?: string, correlationId?: string) =>
    new AuthenticationError(
      ErrorCode.ACCOUNT_SUSPENDED,
      `Account suspended: ${reason || 'Policy violation'}`,
      'Your account has been temporarily suspended. Please contact support.',
      { reason },
      correlationId
    ),

  twoFactorRequired: (correlationId?: string) =>
    new AuthenticationError(
      ErrorCode.TWO_FACTOR_REQUIRED,
      'Two-factor authentication required',
      'Please enter your 2FA code to continue.',
      {},
      correlationId
    ),

  // Authorization errors
  insufficientPermissions: (requiredPermission: string, correlationId?: string) =>
    new AuthorizationError(
      ErrorCode.INSUFFICIENT_PERMISSIONS,
      `Missing required permission: ${requiredPermission}`,
      'You do not have permission to perform this action.',
      { requiredPermission },
      correlationId
    ),

  premiumRequired: (feature: string, correlationId?: string) =>
    new AuthorizationError(
      ErrorCode.PREMIUM_REQUIRED,
      `Premium subscription required for feature: ${feature}`,
      'This feature requires a premium subscription. Please upgrade your account.',
      { feature },
      correlationId
    ),

  // Validation errors
  invalidInput: (field: string, value: any, correlationId?: string) =>
    new ValidationError(
      ErrorCode.INVALID_INPUT,
      `Invalid input for field: ${field}`,
      'Please check your input and try again.',
      { [field]: ['Invalid value provided'] },
      { field, value },
      correlationId
    ),

  missingRequiredField: (field: string, correlationId?: string) =>
    new ValidationError(
      ErrorCode.MISSING_REQUIRED_FIELD,
      `Missing required field: ${field}`,
      'Please fill in all required fields.',
      { [field]: ['This field is required'] },
      { field },
      correlationId
    ),

  // Game errors
  gameNotFound: (gameId: string, correlationId?: string) =>
    new BusinessLogicError(
      ErrorCode.GAME_NOT_FOUND,
      `Game not found: ${gameId}`,
      'The game you are looking for does not exist or has been deleted.',
      { gameId },
      correlationId
    ),

  gameFull: (gameId: string, maxPlayers: number, correlationId?: string) =>
    new BusinessLogicError(
      ErrorCode.GAME_FULL,
      `Game ${gameId} is full (${maxPlayers} players)`,
      'This game is full. Please try joining another game.',
      { gameId, maxPlayers },
      correlationId
    ),

  invalidSudokuMove: (row: number, col: number, value: number, reason: string, correlationId?: string) =>
    new GameEngineError(
      ErrorCode.INVALID_SUDOKU_MOVE,
      `Invalid Sudoku move at (${row}, ${col}) = ${value}: ${reason}`,
      'This move is not allowed by Sudoku rules.',
      { row, col, value, reason },
      correlationId
    ),

  // Rate limiting errors
  rateLimitExceeded: (limit: number, window: string, correlationId?: string) =>
    new BusinessLogicError(
      ErrorCode.RATE_LIMIT_EXCEEDED,
      `Rate limit exceeded: ${limit} requests per ${window}`,
      'You are making requests too quickly. Please slow down and try again.',
      { limit, window },
      correlationId
    ),

  // External service errors
  stripeError: (stripeCode: string, message: string, correlationId?: string) =>
    new ExternalServiceError(
      ErrorCode.STRIPE_ERROR,
      'stripe',
      `Stripe error [${stripeCode}]: ${message}`,
      'Payment processing error. Please try again or contact support.',
      { stripeCode },
      correlationId
    ),

  // System errors
  databaseConnectionFailed: (correlationId?: string) =>
    new SystemError(
      ErrorCode.DATABASE_CONNECTION_FAILED,
      'Unable to connect to database',
      'Service temporarily unavailable. Please try again in a few moments.',
      {},
      correlationId
    ),

  internalServerError: (originalError: Error, correlationId?: string) =>
    new SystemError(
      ErrorCode.INTERNAL_SERVER_ERROR,
      `Internal server error: ${originalError.message}`,
      'An unexpected error occurred. Our team has been notified.',
      { originalError: originalError.stack },
      correlationId
    ),
};
```

## 3. Logging Architecture

### 3.1 Logger Configuration

```typescript
// src/lib/logger.ts
import winston from 'winston';
import { AppError } from './errors';

// Log levels
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  DEBUG = 'debug',
}

// Log format for different environments
const createFormat = () => {
  const baseFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        correlationId: meta.correlationId,
        userId: meta.userId,
        service: 'sudokru-web',
        environment: process.env.NODE_ENV,
        ...meta,
      });
    })
  );

  if (process.env.NODE_ENV === 'development') {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf(({ timestamp, level, message, correlationId, userId, ...meta }) => {
        const correlation = correlationId ? `[${correlationId}]` : '';
        const user = userId ? `{${userId}}` : '';
        return `${timestamp} ${level} ${correlation} ${user}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
      })
    );
  }

  return baseFormat;
};

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: createFormat(),
  defaultMeta: {
    service: 'sudokru-web',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Console transport
    new winston.transports.Console(),

    // File transports for production
    ...(process.env.NODE_ENV === 'production' ? [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ] : []),

    // External logging services for production
    ...(process.env.DATADOG_API_KEY ? [
      new winston.transports.Http({
        host: 'http-intake.logs.datadoghq.com',
        path: `/v1/input/${process.env.DATADOG_API_KEY}`,
        ssl: true,
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': process.env.DATADOG_API_KEY,
        },
      }),
    ] : []),
  ],
});

// Structured logging methods
export const log = {
  error: (message: string, error?: Error | AppError, meta: Record<string, any> = {}) => {
    if (error instanceof AppError) {
      logger.error(message, {
        ...meta,
        error: error.toJSON(),
        correlationId: error.correlationId,
      });
    } else if (error) {
      logger.error(message, {
        ...meta,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });
    } else {
      logger.error(message, meta);
    }
  },

  warn: (message: string, meta: Record<string, any> = {}) => {
    logger.warn(message, meta);
  },

  info: (message: string, meta: Record<string, any> = {}) => {
    logger.info(message, meta);
  },

  debug: (message: string, meta: Record<string, any> = {}) => {
    logger.debug(message, meta);
  },

  // Specialized logging methods
  userAction: (userId: string, action: string, meta: Record<string, any> = {}) => {
    logger.info(`User action: ${action}`, {
      ...meta,
      userId,
      eventType: 'user_action',
    });
  },

  gameEvent: (gameId: string, event: string, meta: Record<string, any> = {}) => {
    logger.info(`Game event: ${event}`, {
      ...meta,
      gameId,
      eventType: 'game_event',
    });
  },

  securityEvent: (userId: string, event: string, meta: Record<string, any> = {}) => {
    logger.warn(`Security event: ${event}`, {
      ...meta,
      userId,
      eventType: 'security_event',
    });
  },

  performanceMetric: (metric: string, value: number, unit: string, meta: Record<string, any> = {}) => {
    logger.info(`Performance metric: ${metric}`, {
      ...meta,
      metric,
      value,
      unit,
      eventType: 'performance_metric',
    });
  },

  externalServiceCall: (service: string, endpoint: string, duration: number, success: boolean, meta: Record<string, any> = {}) => {
    logger.info(`External service call: ${service}`, {
      ...meta,
      service,
      endpoint,
      duration,
      success,
      eventType: 'external_service_call',
    });
  },
};
```

### 3.2 Request Logging Middleware

```typescript
// src/lib/middleware/request-logger.ts
import { NextRequest, NextResponse } from 'next/server';
import { log } from '../logger';
import { generateCorrelationId } from '../utils';

export function requestLogger(request: NextRequest) {
  const correlationId = request.headers.get('x-correlation-id') || generateCorrelationId();
  const startTime = Date.now();

  // Extract request information
  const requestInfo = {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    correlationId,
  };

  // Log incoming request
  log.info('Incoming request', requestInfo);

  // Create response interceptor
  return NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  }).then((response) => {
    const duration = Date.now() - startTime;
    
    // Log response
    log.info('Request completed', {
      ...requestInfo,
      status: response.status,
      duration,
    });

    // Add correlation ID to response headers
    response.headers.set('x-correlation-id', correlationId);

    return response;
  });
}
```

## 4. Error Handling Patterns

### 4.1 API Route Error Handler

```typescript
// src/lib/api-error-handler.ts
import { NextRequest, NextResponse } from 'next/server';
import { AppError, ErrorFactory } from './errors';
import { log } from './logger';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function withErrorHandler(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    const correlationId = request.headers.get('x-correlation-id') || generateCorrelationId();

    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error, correlationId);
    }
  };
}

export function handleApiError(error: unknown, correlationId?: string): NextResponse {
  // Handle known application errors
  if (error instanceof AppError) {
    log.error('Application error occurred', error, { correlationId });
    
    return NextResponse.json(
      error.toUserResponse(),
      { 
        status: getHttpStatusFromError(error),
        headers: { 'x-correlation-id': correlationId || error.correlationId },
      }
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const validationError = ErrorFactory.invalidInput('validation', error.errors, correlationId);
    
    log.error('Validation error occurred', validationError, { 
      correlationId,
      zodErrors: error.errors 
    });

    return NextResponse.json(
      {
        error: 'Validation failed',
        code: validationError.code,
        correlationId: validationError.correlationId,
        fields: error.errors.reduce((acc, err) => {
          const field = err.path.join('.');
          if (!acc[field]) acc[field] = [];
          acc[field].push(err.message);
          return acc;
        }, {} as Record<string, string[]>),
      },
      { 
        status: 400,
        headers: { 'x-correlation-id': correlationId || validationError.correlationId },
      }
    );
  }

  // Handle Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error, correlationId);
    log.error('Database error occurred', prismaError, { correlationId });
    
    return NextResponse.json(
      prismaError.toUserResponse(),
      { 
        status: getHttpStatusFromError(prismaError),
        headers: { 'x-correlation-id': correlationId || prismaError.correlationId },
      }
    );
  }

  // Handle unknown errors
  const systemError = ErrorFactory.internalServerError(error as Error, correlationId);
  log.error('Unexpected error occurred', systemError, { correlationId });

  return NextResponse.json(
    systemError.toUserResponse(),
    { 
      status: 500,
      headers: { 'x-correlation-id': correlationId || systemError.correlationId },
    }
  );
}

function getHttpStatusFromError(error: AppError): number {
  switch (error.category) {
    case ErrorCategory.AUTHENTICATION:
      return 401;
    case ErrorCategory.AUTHORIZATION:
      return 403;
    case ErrorCategory.VALIDATION:
    case ErrorCategory.USER_INPUT:
      return 400;
    case ErrorCategory.BUSINESS_LOGIC:
      if (error.code === ErrorCode.GAME_NOT_FOUND || error.code === ErrorCode.TOURNAMENT_NOT_FOUND) {
        return 404;
      }
      return 400;
    case ErrorCategory.RATE_LIMIT:
      return 429;
    case ErrorCategory.EXTERNAL_SERVICE:
    case ErrorCategory.DATABASE:
    case ErrorCategory.SYSTEM:
      return 500;
    default:
      return 500;
  }
}

function handlePrismaError(error: PrismaClientKnownRequestError, correlationId?: string): AppError {
  switch (error.code) {
    case 'P2002':
      // Unique constraint violation
      return ErrorFactory.invalidInput(
        'unique_constraint',
        `Duplicate value for field: ${error.meta?.target}`,
        correlationId
      );
    case 'P2025':
      // Record not found
      return ErrorFactory.gameNotFound('unknown', correlationId);
    case 'P2003':
      // Foreign key constraint violation
      return new ValidationError(
        ErrorCode.CONSTRAINT_VIOLATION,
        `Foreign key constraint violation: ${error.message}`,
        'Referenced record does not exist.',
        {},
        { prismaCode: error.code },
        correlationId
      );
    default:
      return ErrorFactory.databaseConnectionFailed(correlationId);
  }
}
```

### 4.2 React Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { log } from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = generateCorrelationId();
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    log.error('React Error Boundary caught error', error, {
      errorInfo: errorInfo.componentStack,
      errorId: this.state.errorId,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Report to external error tracking service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          errorBoundary: true,
          errorId: this.state.errorId,
        },
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Something went wrong
              </h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="flex space-x-3">
              <Button onClick={this.handleRetry} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
            
            {this.state.errorId && (
              <p className="text-xs text-gray-500 mt-4">
                Error ID: {this.state.errorId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for error reporting
export function useErrorHandler() {
  const reportError = (error: Error, context?: Record<string, any>) => {
    const errorId = generateCorrelationId();
    
    log.error('Manual error report', error, {
      ...context,
      errorId,
      source: 'useErrorHandler',
    });

    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
        tags: { errorId, source: 'useErrorHandler' },
      });
    }

    return errorId;
  };

  return { reportError };
}
```

## 5. User-Facing Error Messages

### 5.1 Error Message Standards

```typescript
// src/lib/error-messages.ts
export const USER_ERROR_MESSAGES = {
  // Authentication
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email/username or password. Please try again.',
  [ErrorCode.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
  [ErrorCode.ACCOUNT_SUSPENDED]: 'Your account has been temporarily suspended. Please contact support for assistance.',
  [ErrorCode.TWO_FACTOR_REQUIRED]: 'Please enter your 2FA authentication code to continue.',
  [ErrorCode.TWO_FACTOR_INVALID]: 'Invalid 2FA code. Please check your authenticator app and try again.',

  // Authorization
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 'You do not have permission to perform this action.',
  [ErrorCode.PREMIUM_REQUIRED]: 'This feature is only available to premium subscribers. Please upgrade your account.',
  [ErrorCode.ADMIN_REQUIRED]: 'Administrator access required.',

  // Game-specific
  [ErrorCode.GAME_NOT_FOUND]: 'This game no longer exists or has been removed.',
  [ErrorCode.GAME_FULL]: 'This game is full. Please try joining another game.',
  [ErrorCode.GAME_ALREADY_STARTED]: 'This game has already started and cannot be joined.',
  [ErrorCode.INVALID_SUDOKU_MOVE]: 'This move violates Sudoku rules. Please try a different number.',
  [ErrorCode.NOT_PLAYER_TURN]: 'It is not your turn to make a move.',

  // Tournament
  [ErrorCode.TOURNAMENT_NOT_FOUND]: 'This tournament does not exist or has been cancelled.',
  [ErrorCode.TOURNAMENT_FULL]: 'This tournament is full. Registration has closed.',
  [ErrorCode.TOURNAMENT_CLOSED]: 'Registration for this tournament has closed.',

  // Rate limiting
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'You are making requests too quickly. Please slow down and try again.',
  [ErrorCode.DAILY_LIMIT_EXCEEDED]: 'You have reached your daily limit. Please try again tomorrow or upgrade to premium.',

  // System
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Something went wrong on our end. Our team has been notified.',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable. Please try again in a few moments.',
  [ErrorCode.DATABASE_CONNECTION_FAILED]: 'Database connection issue. Please try again shortly.',

  // Default fallback
  default: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
} as const;

export function getUserErrorMessage(code: ErrorCode): string {
  return USER_ERROR_MESSAGES[code] || USER_ERROR_MESSAGES.default;
}
```

### 5.2 Toast Notification Integration

```typescript
// src/hooks/useErrorToast.ts
import { useToast } from '@/components/ui/use-toast';
import { AppError } from '@/lib/errors';
import { getUserErrorMessage } from '@/lib/error-messages';

export function useErrorToast() {
  const { toast } = useToast();

  const showError = (error: Error | AppError | string, title?: string) => {
    let message: string;
    let description: string | undefined;
    let errorId: string | undefined;

    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof AppError) {
      message = error.userMessage;
      description = process.env.NODE_ENV === 'development' ? error.message : undefined;
      errorId = error.correlationId;
    } else {
      message = 'An unexpected error occurred';
      description = process.env.NODE_ENV === 'development' ? error.message : undefined;
    }

    toast({
      title: title || 'Error',
      description: (
        <div>
          <p>{message}</p>
          {description && (
            <details className="mt-2">
              <summary className="text-xs opacity-70 cursor-pointer">Technical Details</summary>
              <p className="text-xs opacity-70 mt-1">{description}</p>
            </details>
          )}
          {errorId && (
            <p className="text-xs opacity-50 mt-2">Error ID: {errorId}</p>
          )}
        </div>
      ),
      variant: 'destructive',
    });
  };

  const showWarning = (message: string, title?: string) => {
    toast({
      title: title || 'Warning',
      description: message,
      variant: 'default',
    });
  };

  const showSuccess = (message: string, title?: string) => {
    toast({
      title: title || 'Success',
      description: message,
    });
  };

  return {
    showError,
    showWarning,
    showSuccess,
  };
}
```

## 6. Monitoring and Alerting

### 6.1 Error Monitoring Configuration

```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';
import { AppError } from './errors';
import { log } from './logger';

export function initializeErrorMonitoring() {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      
      // Performance monitoring
      tracesSampleRate: 0.1,
      profilesSampleRate: 0.1,
      
      // Error filtering
      beforeSend: (event, hint) => {
        const error = hint.originalException;
        
        // Don't send certain types of errors to Sentry
        if (error instanceof AppError) {
          // Only send high severity errors to Sentry
          if (error.severity === 'low' || error.severity === 'medium') {
            return null;
          }
          
          // Add custom context
          event.extra = {
            ...event.extra,
            errorCategory: error.category,
            errorSeverity: error.severity,
            errorCode: error.code,
            correlationId: error.correlationId,
          };
        }
        
        return event;
      },
      
      // Custom error tags
      initialScope: {
        tags: {
          component: 'sudokru-web',
        },
      },
    });
  }
}

// Custom error tracking
export const errorMonitoring = {
  captureError: (error: Error | AppError, context?: Record<string, any>) => {
    // Log locally
    log.error('Error captured for monitoring', error, context);
    
    // Send to external monitoring
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
        tags: error instanceof AppError ? {
          errorCategory: error.category,
          errorCode: error.code.toString(),
        } : {},
      });
    }
  },

  captureMessage: (message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) => {
    log[level](message, context);
    
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureMessage(message, level, {
        extra: context,
      });
    }
  },

  setUserContext: (userId: string, userInfo?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.setUser({
        id: userId,
        ...userInfo,
      });
    }
  },

  clearUserContext: () => {
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.setUser(null);
    }
  },
};
```

### 6.2 Alert Configuration

```typescript
// src/lib/alerts.ts
import { AppError, ErrorSeverity, ErrorCategory } from './errors';
import { log } from './logger';

interface AlertRule {
  category?: ErrorCategory;
  severity?: ErrorSeverity;
  threshold?: number;
  timeWindow?: number; // minutes
  channels: AlertChannel[];
}

enum AlertChannel {
  EMAIL = 'email',
  SLACK = 'slack',
  PAGERDUTY = 'pagerduty',
  SMS = 'sms',
}

const ALERT_RULES: AlertRule[] = [
  // Critical system errors - immediate alerts
  {
    severity: ErrorSeverity.CRITICAL,
    threshold: 1,
    timeWindow: 1,
    channels: [AlertChannel.PAGERDUTY, AlertChannel.SLACK, AlertChannel.EMAIL],
  },
  
  // High severity errors - quick response needed
  {
    severity: ErrorSeverity.HIGH,
    threshold: 5,
    timeWindow: 5,
    channels: [AlertChannel.SLACK, AlertChannel.EMAIL],
  },
  
  // Database connection issues
  {
    category: ErrorCategory.DATABASE,
    threshold: 3,
    timeWindow: 2,
    channels: [AlertChannel.PAGERDUTY, AlertChannel.SLACK],
  },
  
  // Authentication issues spike
  {
    category: ErrorCategory.AUTHENTICATION,
    threshold: 20,
    timeWindow: 10,
    channels: [AlertChannel.SLACK],
  },
  
  // Game engine errors
  {
    category: ErrorCategory.GAME_ENGINE,
    threshold: 10,
    timeWindow: 5,
    channels: [AlertChannel.SLACK, AlertChannel.EMAIL],
  },
];

export class AlertManager {
  private errorCounts = new Map<string, { count: number; firstSeen: Date }>();

  processError(error: AppError): void {
    // Check each alert rule
    for (const rule of ALERT_RULES) {
      if (this.shouldAlert(error, rule)) {
        this.sendAlert(error, rule);
      }
    }
  }

  private shouldAlert(error: AppError, rule: AlertRule): boolean {
    // Check if error matches rule criteria
    if (rule.category && error.category !== rule.category) {
      return false;
    }
    
    if (rule.severity && error.severity !== rule.severity) {
      return false;
    }

    // Check threshold and time window
    if (rule.threshold && rule.timeWindow) {
      const key = this.getErrorKey(error, rule);
      const now = new Date();
      const existing = this.errorCounts.get(key);

      if (!existing) {
        this.errorCounts.set(key, { count: 1, firstSeen: now });
        return false;
      }

      // Check if within time window
      const timeDiff = (now.getTime() - existing.firstSeen.getTime()) / (1000 * 60);
      if (timeDiff > rule.timeWindow) {
        // Reset counter
        this.errorCounts.set(key, { count: 1, firstSeen: now });
        return false;
      }

      // Increment counter
      existing.count++;
      
      // Check if threshold is reached
      return existing.count >= rule.threshold;
    }

    return true;
  }

  private getErrorKey(error: AppError, rule: AlertRule): string {
    const parts = [];
    if (rule.category) parts.push(error.category);
    if (rule.severity) parts.push(error.severity);
    parts.push(error.code.toString());
    return parts.join(':');
  }

  private async sendAlert(error: AppError, rule: AlertRule): Promise<void> {
    const alertData = {
      title: `Sudokru Error Alert: ${error.category}`,
      message: error.message,
      severity: error.severity,
      correlationId: error.correlationId,
      context: error.context,
      timestamp: error.timestamp,
    };

    // Send to configured channels
    await Promise.all(
      rule.channels.map(channel => this.sendToChannel(channel, alertData))
    );

    log.warn('Alert sent', {
      error: error.toJSON(),
      rule,
      channels: rule.channels,
    });
  }

  private async sendToChannel(channel: AlertChannel, alertData: any): Promise<void> {
    try {
      switch (channel) {
        case AlertChannel.SLACK:
          await this.sendSlackAlert(alertData);
          break;
        case AlertChannel.EMAIL:
          await this.sendEmailAlert(alertData);
          break;
        case AlertChannel.PAGERDUTY:
          await this.sendPagerDutyAlert(alertData);
          break;
        case AlertChannel.SMS:
          await this.sendSMSAlert(alertData);
          break;
      }
    } catch (err) {
      log.error('Failed to send alert to channel', err as Error, {
        channel,
        alertData,
      });
    }
  }

  private async sendSlackAlert(alertData: any): Promise<void> {
    if (!process.env.SLACK_WEBHOOK_URL) return;

    const payload = {
      text: `🚨 ${alertData.title}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${alertData.title}*\n${alertData.message}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Severity:* ${alertData.severity}`,
            },
            {
              type: 'mrkdwn',
              text: `*Correlation ID:* ${alertData.correlationId}`,
            },
            {
              type: 'mrkdwn',
              text: `*Time:* ${alertData.timestamp}`,
            },
          ],
        },
      ],
    };

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  private async sendEmailAlert(alertData: any): Promise<void> {
    // Implementation for email alerts
    // Could use SendGrid, AWS SES, etc.
  }

  private async sendPagerDutyAlert(alertData: any): Promise<void> {
    // Implementation for PagerDuty alerts
  }

  private async sendSMSAlert(alertData: any): Promise<void> {
    // Implementation for SMS alerts
  }
}

export const alertManager = new AlertManager();
```

## 7. Development and Debugging

### 7.1 Development Error Tools

```typescript
// src/lib/dev-tools.ts
export class DevErrorTools {
  static logErrorDetails(error: AppError): void {
    if (process.env.NODE_ENV !== 'development') return;

    console.group(`🔥 ${error.name}`);
    console.log('Message:', error.message);
    console.log('User Message:', error.userMessage);
    console.log('Category:', error.category);
    console.log('Severity:', error.severity);
    console.log('Code:', error.code);
    console.log('Correlation ID:', error.correlationId);
    console.log('Context:', error.context);
    console.log('Stack:', error.stack);
    console.groupEnd();
  }

  static createTestError(category: ErrorCategory, severity: ErrorSeverity): AppError {
    const testErrors = {
      [ErrorCategory.AUTHENTICATION]: () => ErrorFactory.invalidCredentials(),
      [ErrorCategory.GAME_ENGINE]: () => ErrorFactory.invalidSudokuMove(0, 0, 5, 'Test error'),
      [ErrorCategory.SYSTEM]: () => ErrorFactory.internalServerError(new Error('Test system error')),
    };

    return testErrors[category]?.() || ErrorFactory.internalServerError(new Error('Unknown test error'));
  }
}

// Development error testing endpoint
// src/app/api/dev/test-error/route.ts (only in development)
import { NextRequest, NextResponse } from 'next/server';
import { DevErrorTools } from '@/lib/dev-tools';
import { ErrorCategory, ErrorSeverity } from '@/lib/errors';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const { category, severity } = await request.json();
  
  const testError = DevErrorTools.createTestError(
    category as ErrorCategory,
    severity as ErrorSeverity
  );

  DevErrorTools.logErrorDetails(testError);
  
  throw testError; // This will be caught by the error handler
}
```

### 7.2 Error Analytics Dashboard

```typescript
// src/lib/error-analytics.ts
export interface ErrorMetrics {
  totalErrors: number;
  errorsByCategory: Record<ErrorCategory, number>;
  errorsBySeverity: Record<ErrorSeverity, number>;
  topErrors: Array<{ code: ErrorCode; count: number; message: string }>;
  errorTrends: Array<{ timestamp: string; count: number }>;
  affectedUsers: number;
  averageResolutionTime: number;
}

export class ErrorAnalytics {
  async getErrorMetrics(timeRange: '1h' | '1d' | '7d' | '30d'): Promise<ErrorMetrics> {
    const startTime = this.getStartTime(timeRange);
    
    // In a real implementation, this would query your analytics database
    // This is a simplified example
    
    const errors = await prisma.errorLog.findMany({
      where: {
        createdAt: { gte: startTime },
      },
      include: {
        user: { select: { id: true } },
      },
    });

    return {
      totalErrors: errors.length,
      errorsByCategory: this.groupByCategory(errors),
      errorsBySeverity: this.groupBySeverity(errors),
      topErrors: this.getTopErrors(errors),
      errorTrends: this.getErrorTrends(errors, timeRange),
      affectedUsers: new Set(errors.map(e => e.userId).filter(Boolean)).size,
      averageResolutionTime: this.calculateAverageResolutionTime(errors),
    };
  }

  private getStartTime(timeRange: string): Date {
    const now = new Date();
    switch (timeRange) {
      case '1h': return new Date(now.getTime() - 60 * 60 * 1000);
      case '1d': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default: return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  }

  private groupByCategory(errors: any[]): Record<ErrorCategory, number> {
    return errors.reduce((acc, error) => {
      const category = error.category as ErrorCategory;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<ErrorCategory, number>);
  }

  private groupBySeverity(errors: any[]): Record<ErrorSeverity, number> {
    return errors.reduce((acc, error) => {
      const severity = error.severity as ErrorSeverity;
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<ErrorSeverity, number>);
  }

  private getTopErrors(errors: any[]): Array<{ code: ErrorCode; count: number; message: string }> {
    const errorCounts = errors.reduce((acc, error) => {
      const key = `${error.code}:${error.message}`;
      if (!acc[key]) {
        acc[key] = { code: error.code, count: 0, message: error.message };
      }
      acc[key].count++;
      return acc;
    }, {} as Record<string, { code: ErrorCode; count: number; message: string }>);

    return Object.values(errorCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getErrorTrends(errors: any[], timeRange: string): Array<{ timestamp: string; count: number }> {
    // Implementation for error trends over time
    // This would group errors by time intervals and return counts
    return [];
  }

  private calculateAverageResolutionTime(errors: any[]): number {
    // Implementation for calculating average time to resolve errors
    // This would look at error reports and their resolution timestamps
    return 0;
  }
}

export const errorAnalytics = new ErrorAnalytics();
```

This comprehensive error handling and logging system provides robust error management for Sudokru, ensuring proper error classification, user-friendly messaging, detailed logging for debugging, and monitoring capabilities for maintaining system health.# Sudokru - Error Handling & Logging Standards

## 1. Error Classification System

### 1.1 Error Categories

```typescript
// Error type hierarchy
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  BUSINESS_LOGIC = 'business_logic',
  EXTERNAL_SERVICE = 'external_service',
  DATABASE = 'database',
  NETWORK = 'network',
  SYSTEM = 'system',
  USER_INPUT = 'user_input',
  RATE_LIMIT = 'rate_limit',
  GAME_ENGINE = 'game_engine',
  REAL_TIME = 'real_time'
}

export enum ErrorSever