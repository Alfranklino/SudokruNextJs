# Sudokru - Authentication & Authorization Schema

## 1. Authentication Architecture Overview

### 1.1 Authentication Strategy
- **Primary Method:** NextAuth.js with JWT tokens
- **Session Management:** Database sessions with Redis caching
- **Multi-Factor Auth:** Optional 2FA for premium users
- **Social Login:** Google, GitHub, Discord OAuth integration
- **Token Rotation:** Automatic refresh token rotation for security

### 1.2 Security Principles
- **Zero Trust:** Every request requires authentication verification
- **Principle of Least Privilege:** Users receive minimal required permissions
- **Defense in Depth:** Multiple security layers (JWT + session + rate limiting)
- **Secure by Default:** Conservative permission model with explicit grants

## 2. User Roles and Permissions Matrix

### 2.1 User Role Hierarchy

```typescript
// User role definitions
export enum UserRole {
  GUEST = 'guest',           // Unregistered users
  USER = 'user',             // Registered free users
  PREMIUM = 'premium',       // Premium subscribers
  MODERATOR = 'moderator',   // Community moderators
  ADMIN = 'admin',           // System administrators
  SUPER_ADMIN = 'super_admin' // Full system access
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium'
}
```

### 2.2 Comprehensive Permissions Matrix

| Resource | Action | Guest | User | Premium | Moderator | Admin | Super Admin |
|----------|--------|-------|------|---------|-----------|-------|-------------|
| **Authentication** |
| Register Account | CREATE | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Login | AUTH | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Change Password | UPDATE | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Games** |
| View Public Games | READ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Public Game | CREATE | ✅ (3/day) | ✅ (5/day) | ✅ (unlimited) | ✅ | ✅ | ✅ |
| Create Game | CREATE | ❌ | ✅ (2/day) | ✅ (unlimited) | ✅ | ✅ | ✅ |
| Create Private Game | CREATE | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Spectate Games | READ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Access Game History | READ | ❌ | ✅ (own) | ✅ (own) | ✅ (all) | ✅ (all) | ✅ (all) |
| **Tournaments** |
| View Tournaments | READ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Free Tournament | CREATE | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Premium Tournament | CREATE | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Create Tournament | CREATE | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Manage Tournament | UPDATE | ❌ | ❌ | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| **Social Features** |
| Send Friend Requests | CREATE | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Chat | CREATE | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Send Messages | CREATE | ❌ | ✅ (rate limited) | ✅ | ✅ | ✅ | ✅ |
| Create Groups | CREATE | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Analytics** |
| View Own Statistics | READ | ❌ | ✅ (basic) | ✅ (advanced) | ✅ (advanced) | ✅ (advanced) | ✅ (advanced) |
| View Global Leaderboards | READ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export Data | READ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Moderation** |
| Report Users/Content | CREATE | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Review Reports | READ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Moderate Content | UPDATE | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Suspend Users | UPDATE | ❌ | ❌ | ❌ | ✅ (temp) | ✅ | ✅ |
| Ban Users | DELETE | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Administration** |
| View System Metrics | READ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Users | UPDATE | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| System Configuration | UPDATE | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Database Access | READ/WRITE | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

### 2.3 Permission Implementation

```typescript
// Permission definitions
export enum Permission {
  // Game permissions
  GAME_CREATE = 'game:create',
  GAME_JOIN = 'game:join',
  GAME_SPECTATE = 'game:spectate',
  GAME_PRIVATE_CREATE = 'game:private:create',
  
  // Tournament permissions
  TOURNAMENT_VIEW = 'tournament:view',
  TOURNAMENT_JOIN = 'tournament:join',
  TOURNAMENT_JOIN_PREMIUM = 'tournament:join:premium',
  TOURNAMENT_CREATE = 'tournament:create',
  TOURNAMENT_MANAGE = 'tournament:manage',
  
  // Social permissions
  SOCIAL_FRIEND_REQUEST = 'social:friend:request',
  SOCIAL_CHAT = 'social:chat',
  SOCIAL_GROUP_CREATE = 'social:group:create',
  
  // Analytics permissions
  ANALYTICS_BASIC = 'analytics:basic',
  ANALYTICS_ADVANCED = 'analytics:advanced',
  ANALYTICS_EXPORT = 'analytics:export',
  
  // Moderation permissions
  MODERATION_REPORT = 'moderation:report',
  MODERATION_REVIEW = 'moderation:review',
  MODERATION_CONTENT = 'moderation:content',
  MODERATION_SUSPEND = 'moderation:suspend',
  MODERATION_BAN = 'moderation:ban',
  
  // Admin permissions
  ADMIN_METRICS = 'admin:metrics',
  ADMIN_USERS = 'admin:users',
  ADMIN_SYSTEM = 'admin:system',
}

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.GUEST]: [
    Permission.GAME_SPECTATE,
    Permission.TOURNAMENT_VIEW,
  ],
  
  [UserRole.USER]: [
    Permission.GAME_CREATE,
    Permission.GAME_JOIN,
    Permission.GAME_SPECTATE,
    Permission.TOURNAMENT_VIEW,
    Permission.TOURNAMENT_JOIN,
    Permission.SOCIAL_FRIEND_REQUEST,
    Permission.SOCIAL_CHAT,
    Permission.ANALYTICS_BASIC,
    Permission.MODERATION_REPORT,
  ],
  
  [UserRole.PREMIUM]: [
    ...ROLE_PERMISSIONS[UserRole.USER],
    Permission.GAME_PRIVATE_CREATE,
    Permission.TOURNAMENT_JOIN_PREMIUM,
    Permission.SOCIAL_GROUP_CREATE,
    Permission.ANALYTICS_ADVANCED,
    Permission.ANALYTICS_EXPORT,
  ],
  
  [UserRole.MODERATOR]: [
    ...ROLE_PERMISSIONS[UserRole.PREMIUM],
    Permission.TOURNAMENT_CREATE,
    Permission.TOURNAMENT_MANAGE,
    Permission.MODERATION_REVIEW,
    Permission.MODERATION_CONTENT,
    Permission.MODERATION_SUSPEND,
  ],
  
  [UserRole.ADMIN]: [
    ...ROLE_PERMISSIONS[UserRole.MODERATOR],
    Permission.MODERATION_BAN,
    Permission.ADMIN_METRICS,
    Permission.ADMIN_USERS,
  ],
  
  [UserRole.SUPER_ADMIN]: [
    ...ROLE_PERMISSIONS[UserRole.ADMIN],
    Permission.ADMIN_SYSTEM,
  ],
};
```

## 3. JWT Token Implementation

### 3.1 Token Structure

```typescript
// JWT payload structure
export interface JWTPayload {
  // Standard claims
  sub: string;           // User ID
  iat: number;           // Issued at
  exp: number;           // Expires at
  iss: string;           // Issuer (sudokru.com)
  aud: string;           // Audience (sudokru-web)
  
  // Custom claims
  role: UserRole;
  permissions: Permission[];
  subscription: SubscriptionTier;
  sessionId: string;     // For session invalidation
  
  // Rate limiting
  dailyGameLimit: number;
  dailyTournamentLimit: number;
  
  // Security
  tokenVersion: number;  // For token invalidation
  lastPasswordChange?: number;
}

// Token generation
export function generateAccessToken(user: User): string {
  const payload: JWTPayload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    iss: 'sudokru.com',
    aud: 'sudokru-web',