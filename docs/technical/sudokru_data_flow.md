# Sudokru - Data Flow Diagrams

## 1. System Architecture Data Flow

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Browser]
        Mobile[Mobile Browser]
        PWA[PWA App]
    end
    
    subgraph "CDN & Load Balancing"
        CDN[Cloudflare CDN]
        LB[Load Balancer]
    end
    
    subgraph "Application Layer"
        NextJS[Next.js App Router]
        API[API Routes]
        Auth[NextAuth.js]
        Socket[Socket.io Server]
    end
    
    subgraph "State Management"
        Zustand[Zustand Store]
        Redis[Redis Cache]
        SessionStore[Session Store]
    end
    
    subgraph "Data Layer"
        Prisma[Prisma ORM]
        SQLite[SQLite Dev DB]
        PostgreSQL[PostgreSQL Prod DB]
    end
    
    subgraph "External Services"
        OAuth[OAuth Providers]
        Stripe[Stripe Payments]
        Email[Email Service]
    end
    
    Web --> CDN
    Mobile --> CDN
    PWA --> CDN
    CDN --> LB
    LB --> NextJS
    
    NextJS --> API
    NextJS --> Auth
    NextJS --> Socket
    
    API --> Zustand
    API --> Redis
    API --> Prisma
    
    Auth --> SessionStore
    Auth --> OAuth
    
    Socket --> Redis
    Socket --> Prisma
    
    Prisma --> SQLite
    Prisma --> PostgreSQL
    
    API --> Stripe
    API --> Email
    
    classDef client fill:#e1f5fe
    classDef server fill:#f3e5f5
    classDef database fill:#e8f5e8
    classDef external fill:#fff3e0
    
    class Web,Mobile,PWA client
    class NextJS,API,Auth,Socket,Zustand,Redis server
    class Prisma,SQLite,PostgreSQL database
    class OAuth,Stripe,Email external
```

## 2. User Authentication Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as Next.js API
    participant Auth as NextAuth.js
    participant DB as Database
    participant OAuth as OAuth Provider
    participant Redis as Redis Cache
    
    Note over U,Redis: Registration Flow
    U->>C: Fill registration form
    C->>API: POST /api/auth/register
    API->>DB: Check email/username uniqueness
    DB-->>API: Validation result
    API->>DB: Create user record
    API->>Auth: Generate JWT tokens
    Auth-->>API: Access & refresh tokens
    API->>Redis: Cache session data
    API-->>C: Return user profile + tokens
    C-->>U: Registration successful
    
    Note over U,Redis: Login Flow
    U->>C: Enter credentials
    C->>API: POST /api/auth/login
    API->>DB: Validate credentials
    DB-->>API: User data
    API->>Auth: Generate JWT tokens
    Auth-->>API: Access & refresh tokens
    API->>Redis: Cache session data
    API->>DB: Update last login timestamp
    API-->>C: Return user profile + tokens
    C-->>U: Login successful
    
    Note over U,Redis: OAuth Flow
    U->>C: Click OAuth login
    C->>Auth: Initiate OAuth flow
    Auth->>OAuth: Redirect to provider
    OAuth-->>Auth: Authorization code
    Auth->>OAuth: Exchange code for profile
    OAuth-->>Auth: User profile data
    Auth->>DB: Create/update user
    Auth->>Redis: Cache session data
    Auth-->>C: Return tokens
    C-->>U: Login successful
    
    Note over U,Redis: Token Refresh Flow
    C->>API: Request with expired token
    API-->>C: 401 Unauthorized
    C->>API: POST /api/auth/refresh
    API->>Redis: Validate refresh token
    Redis-->>API: Token validation
    API->>Auth: Generate new access token
    Auth-->>API: New access token
    API-->>C: Return new token
    C->>API: Retry original request
    API-->>C: Success response
```

## 3. Real-time Game Data Flow

```mermaid
sequenceDiagram
    participant P1 as Player 1
    participant P2 as Player 2
    participant C1 as Client 1
    participant C2 as Client 2
    participant Socket as Socket.io Server
    participant API as Game API
    participant Redis as Redis Cache
    participant DB as Database
    participant Puzzle as Puzzle Engine
    
    Note over P1,Puzzle: Game Creation & Joining
    P1->>C1: Create game
    C1->>API: POST /api/games
    API->>Puzzle: Generate puzzle
    Puzzle-->>API: Puzzle data
    API->>DB: Save game & puzzle
    API->>Redis: Cache game state
    API-->>C1: Game created
    
    P2->>C2: Join game
    C2->>API: POST /api/games/:id/join
    API->>DB: Add player to game
    API->>Redis: Update game state
    API-->>C2: Join successful
    
    Note over P1,Puzzle: WebSocket Connection
    C1->>Socket: Connect & authenticate
    Socket->>Redis: Validate session
    C1->>Socket: join-game event
    Socket->>Redis: Add to game room
    
    C2->>Socket: Connect & authenticate
    C2->>Socket: join-game event
    Socket->>Redis: Add to game room
    Socket-->>C1: player-joined event
    Socket-->>C2: game-state-updated event
    
    Note over P1,Puzzle: Real-time Gameplay
    P1->>C1: Make move (row: 0, col: 0, value: 5)
    C1->>Socket: game-move event
    Socket->>API: Validate move
    API->>Puzzle: Check Sudoku rules
    Puzzle-->>API: Move validation result
    API->>DB: Save move record
    API->>Redis: Update game state
    Redis-->>Socket: Updated game state
    Socket-->>C1: game-state-updated event
    Socket-->>C2: game-state-updated event
    
    P2->>C2: Make move (row: 1, col: 1, value: 3)
    C2->>Socket: game-move event
    Socket->>API: Validate move
    API->>Puzzle: Check Sudoku rules
    API->>DB: Save move record
    API->>Redis: Update game state
    Socket-->>C1: game-state-updated event
    Socket-->>C2: game-state-updated event
    
    Note over P1,Puzzle: Game Completion
    P1->>C1: Final move (completes puzzle)
    C1->>Socket: game-move event
    Socket->>API: Validate move
    API->>Puzzle: Check completion
    Puzzle-->>API: Game completed
    API->>DB: Update game status & results
    API->>DB: Update player statistics
    API->>Redis: Clear game state
    Socket-->>C1: game-completed event
    Socket-->>C2: game-completed event
```

## 4. Tournament System Data Flow

```mermaid
flowchart TD
    subgraph "Tournament Creation"
        A[Admin Creates Tournament] --> B[Validate Tournament Settings]
        B --> C[Save Tournament to DB]
        C --> D[Open Registration]
    end
    
    subgraph "Registration Phase"
        D --> E[Players Register]
        E --> F{Check Requirements}
        F -->|Pass| G[Add to Participants]
        F -->|Fail| H[Reject Registration]
        G --> I{Max Players Reached?}
        I -->|No| E
        I -->|Yes| J[Close Registration]
    end
    
    subgraph "Bracket Generation"
        J --> K[Generate Bracket]
        K --> L[Seed Players by Rating]
        L --> M[Create Matches]
        M --> N[Schedule Round 1]
    end
    
    subgraph "Tournament Execution"
        N --> O[Start Tournament]
        O --> P[Players Join Matches]
        P --> Q[Play Games]
        Q --> R[Record Results]
        R --> S{Round Complete?}
        S -->|No| Q
        S -->|Yes| T{Tournament Complete?}
        T -->|No| U[Advance Winners]
        U --> V[Schedule Next Round]
        V --> P
        T -->|Yes| W[Distribute Prizes]
        W --> X[Update Statistics]
    end
    
    subgraph "Data Storage"
        Y[(Tournament DB)]
        Z[(Match Results)]
        AA[(Player Stats)]
    end
    
    C --> Y
    G --> Y
    M --> Y
    R --> Z
    X --> AA
    
    subgraph "Real-time Updates"
        BB[WebSocket Notifications]
        CC[Bracket Updates]
        DD[Match Notifications]
    end
    
    K --> BB
    R --> CC
    P --> DD
```

## 5. State Management Data Flow

```mermaid
graph LR
    subgraph "Client State (Zustand)"
        UserState[User State]
        GameState[Game State]
        UIState[UI State]
        TournamentState[Tournament State]
    end
    
    subgraph "Server State"
        API[API Responses]
        WS[WebSocket Events]
        Cache[Redis Cache]
    end
    
    subgraph "Persistence"
        LocalStorage[Browser Storage]
        DB[(Database)]
    end
    
    subgraph "State Actions"
        Login[Login Action]
        JoinGame[Join Game Action]
        MakeMove[Make Move Action]
        UpdateProfile[Update Profile Action]
    end
    
    API --> UserState
    API --> GameState
    API --> TournamentState
    
    WS --> GameState
    WS --> TournamentState
    
    UserState --> LocalStorage
    UIState --> LocalStorage
    
    Login --> UserState
    Login --> API
    
    JoinGame --> GameState
    JoinGame --> WS
    
    MakeMove --> GameState
    MakeMove --> WS
    
    UpdateProfile --> UserState
    UpdateProfile --> API
    
    API --> DB
    Cache --> API
    
    classDef clientState fill:#e3f2fd
    classDef serverState fill:#f1f8e9
    classDef persistence fill:#fff3e0
    classDef actions fill:#fce4ec
    
    class UserState,GameState,UIState,TournamentState clientState
    class API,WS,Cache serverState
    class LocalStorage,DB persistence
    class Login,JoinGame,MakeMove,UpdateProfile actions
```

## 6. Database Transaction Flow

```mermaid
sequenceDiagram
    participant API as API Route
    participant Prisma as Prisma Client
    participant DB as PostgreSQL
    participant Cache as Redis Cache
    
    Note over API,Cache: Game Move Transaction
    API->>Prisma: Begin transaction
    Prisma->>DB: START TRANSACTION
    
    API->>Prisma: Validate move
    Prisma->>DB: SELECT game state
    DB-->>Prisma: Current game data
    Prisma-->>API: Validation result
    
    alt Valid Move
        API->>Prisma: Insert move record
        Prisma->>DB: INSERT INTO game_moves
        
        API->>Prisma: Update player state
        Prisma->>DB: UPDATE player_games
        
        API->>Prisma: Check game completion
        Prisma->>DB: SELECT puzzle solution
        DB-->>Prisma: Solution data
        
        alt Game Completed
            API->>Prisma: Update game status
            Prisma->>DB: UPDATE games SET status = 'completed'
            
            API->>Prisma: Update player statistics
            Prisma->>DB: UPDATE user_statistics
            
            API->>Prisma: Calculate ELO changes
            Prisma->>DB: UPDATE user_statistics SET elo_rating
        end
        
        Prisma->>DB: COMMIT TRANSACTION
        API->>Cache: Update game state cache
        Cache-->>API: Cache updated
        
    else Invalid Move
        Prisma->>DB: ROLLBACK TRANSACTION
        API-->>API: Return error
    end
```

## 7. Caching Strategy Data Flow

```mermaid
flowchart TD
    subgraph "Request Flow"
        A[Client Request] --> B{Cache Hit?}
        B -->|Yes| C[Return Cached Data]
        B -->|No| D[Query Database]
        D --> E[Cache Result]
        E --> F[Return Data]
    end
    
    subgraph "Cache Layers"
        G[Browser Cache]
        H[CDN Cache]
        I[Redis Cache]
        J[Database Query Cache]
    end
    
    subgraph "Cache Invalidation"
        K[Data Update Event]
        K --> L[Invalidate Related Caches]
        L --> M[Update Redis]
        L --> N[Broadcast Changes]
        N --> O[Update Client State]
    end
    
    subgraph "Cached Data Types"
        P[User Profiles]
        Q[Game States]
        R[Leaderboards]
        S[Tournament Brackets]
        T[Puzzle Data]
    end
    
    A --> G
    G --> H
    H --> I
    I --> J
    J --> D
    
    P --> I
    Q --> I
    R --> I
    S --> I
    T --> I
    
    classDef request fill:#e1f5fe
    classDef cache fill:#f3e5f5
    classDef data fill:#e8f5e8
    
    class A,B,C,D,E,F request
    class G,H,I,J,K,L,M,N,O cache
    class P,Q,R,S,T data
```

## 8. Payment Processing Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as Payment API
    participant Stripe as Stripe
    participant DB as Database
    participant Email as Email Service
    
    Note over U,Email: Premium Subscription Flow
    U->>C: Click upgrade to premium
    C->>API: GET /api/subscription/plans
    API-->>C: Available plans
    C-->>U: Show pricing options
    
    U->>C: Select plan & payment method
    C->>API: POST /api/subscription/create
    API->>Stripe: Create customer
    Stripe-->>API: Customer ID
    API->>DB: Save customer ID
    
    API->>Stripe: Create subscription
    Stripe-->>API: Subscription details
    API->>DB: Save subscription
    API-->>C: Return subscription status
    
    Note over U,Email: Payment Webhook Flow
    Stripe->>API: Webhook: payment.succeeded
    API->>DB: Update subscription status
    API->>DB: Update user permissions
    API->>Email: Send confirmation email
    Email-->>U: Payment confirmation
    
    Note over U,Email: Failed Payment Flow
    Stripe->>API: Webhook: payment.failed
    API->>DB: Mark subscription as past due
    API->>Email: Send payment failed notice
    Email-->>U: Payment retry notice
    
    Note over U,Email: Cancellation Flow
    U->>C: Cancel subscription
    C->>API: POST /api/subscription/cancel
    API->>Stripe: Cancel at period end
    Stripe-->>API: Cancellation confirmed
    API->>DB: Update subscription
    API->>Email: Send cancellation confirmation
    Email-->>U: Cancellation confirmed
```

## 9. Error Handling Data Flow

```mermaid
flowchart TD
    subgraph "Error Sources"
        A[Client Error]
        B[API Error]
        C[Database Error]
        D[External Service Error]
        E[Network Error]
    end
    
    subgraph "Error Detection"
        F[Try-Catch Blocks]
        G[HTTP Status Codes]
        H[Validation Errors]
        I[Timeout Detection]
    end
    
    subgraph "Error Processing"
        J[Error Classification]
        K[Error Logging]
        L[User Notification]
        M[Retry Logic]
        N[Fallback Actions]
    end
    
    subgraph "Error Recovery"
        O[Automatic Retry]
        P[Manual Recovery]
        Q[Graceful Degradation]
        R[Circuit Breaker]
    end
    
    A --> F
    B --> G
    C --> F
    D --> I
    E --> I
    
    F --> J
    G --> J
    H --> J
    I --> J
    
    J --> K
    J --> L
    J --> M
    J --> N
    
    M --> O
    L --> P
    N --> Q
    M --> R
    
    classDef source fill:#ffebee
    classDef detection fill:#fff3e0
    classDef processing fill:#e8f5e8
    classDef recovery fill:#e3f2fd
    
    class A,B,C,D,E source
    class F,G,H,I detection
    class J,K,L,M,N processing
    class O,P,Q,R recovery
```

## 10. Analytics Data Flow

```mermaid
sequenceDiagram
    participant U as User Action
    participant C as Client
    participant API as Analytics API
    participant Queue as Event Queue
    participant Processor as Data Processor
    participant Warehouse as Data Warehouse
    participant Dashboard as Analytics Dashboard
    
    Note over U,Dashboard: Event Collection
    U->>C: Perform action (game move, login, etc.)
    C->>API: Send analytics event
    API->>Queue: Queue event for processing
    Queue-->>API: Event queued
    API-->>C: Acknowledgment
    
    Note over U,Dashboard: Batch Processing
    Queue->>Processor: Process events batch
    Processor->>Processor: Aggregate and transform data
    Processor->>Warehouse: Store processed data
    
    Note over U,Dashboard: Real-time Metrics
    Processor->>Dashboard: Update real-time metrics
    Dashboard->>Dashboard: Update visualizations
    
    Note over U,Dashboard: Reporting
    Dashboard->>Warehouse: Query historical data
    Warehouse-->>Dashboard: Return aggregated data
    Dashboard->>Dashboard: Generate reports
    
    Note over U,Dashboard: User Analytics Request
    U->>C: View personal statistics
    C->>API: GET /api/analytics/user/performance
    API->>Warehouse: Query user data
    Warehouse-->>API: User analytics
    API-->>C: Return analytics
    C-->>U: Display statistics
```

## 11. Security Data Flow

```mermaid
flowchart TD
    subgraph "Input Validation"
        A[Client Input] --> B[Schema Validation]
        B --> C[Sanitization]
        C --> D[Rate Limiting]
    end
    
    subgraph "Authentication"
        D --> E[JWT Verification]
        E --> F[Session Validation]
        F --> G[Permission Check]
    end
    
    subgraph "Authorization"
        G --> H{Has Permission?}
        H -->|Yes| I[Process Request]
        H -->|No| J[Deny Access]
    end
    
    subgraph "Data Protection"
        I --> K[Encrypt Sensitive Data]
        K --> L[Audit Log]
        L --> M[Database Transaction]
    end
    
    subgraph "Response Security"
        M --> N[Filter Response Data]
        N --> O[Add Security Headers]
        O --> P[Return Response]
    end
    
    subgraph "Security Monitoring"
        Q[Intrusion Detection]
        R[Anomaly Detection]
        S[Security Alerts]
        T[Incident Response]
    end
    
    J --> Q
    L --> R
    R --> S
    S --> T
    
    classDef input fill:#ffebee
    classDef auth fill:#e8f5e8
    classDef protection fill:#e3f2fd
    classDef monitoring fill:#fff3e0
    
    class A,B,C,D input
    class E,F,G,H,I,J auth
    class K,L,M,N,O,P protection
    class Q,R,S,T monitoring
```

## 12. Mobile PWA Data Flow

```mermaid
sequenceDiagram
    participant M as Mobile Browser
    participant SW as Service Worker
    participant Cache as Browser Cache
    participant API as Server API
    participant Push as Push Service
    
    Note over M,Push: PWA Installation
    M->>SW: Install service worker
    SW->>Cache: Cache app shell
    SW->>Cache: Cache static assets
    SW-->>M: Installation complete
    
    Note over M,Push: Offline Capability
    M->>SW: Request app data
    SW->>Cache: Check cache first
    Cache-->>SW: Cached data (if available)
    alt Cache Hit
        SW-->>M: Return cached data
    else Cache Miss
        SW->>API: Fetch from server
        API-->>SW: Fresh data
        SW->>Cache: Update cache
        SW-->>M: Return fresh data
    end
    
    Note over M,Push: Background Sync
    M->>SW: Queue action (offline)
    SW->>SW: Store in IndexedDB
    SW->>SW: Wait for connectivity
    SW->>API: Sync queued actions
    API-->>SW: Sync complete
    SW->>M: Update UI
    
    Note over M,Push: Push Notifications
    API->>Push: Send notification
    Push->>SW: Deliver notification
    SW->>M: Show notification
    M->>SW: User interaction
    SW->>M: Open relevant screen
```

## Data Flow Optimization Strategies

### 1. Real-time Performance Optimization

```yaml
websocket_optimization:
  connection_pooling:
    description: "Reuse WebSocket connections across multiple game rooms"
    implementation: "Socket.io namespaces and rooms"
    benefits: "Reduced memory usage, better scalability"
    
  message_batching:
    description: "Batch multiple game state updates into single message"
    implementation: "Accumulate updates over 50ms window"
    benefits: "Reduced network overhead, smoother UI updates"
    
  selective_broadcasting:
    description: "Send updates only to relevant players/spectators"
    implementation: "Room-based message filtering"
    benefits: "Reduced bandwidth, improved privacy"

database_optimization:
  connection_pooling:
    description: "Maintain persistent database connections"
    configuration: "Max 100 connections, 30s timeout"
    benefits: "Reduced connection overhead"
    
  query_optimization:
    description: "Use indexes and optimized queries for real-time data"
    implementation: "Composite indexes on game_id + timestamp"
    benefits: "Sub-100ms query response times"
    
  read_replicas:
    description: "Use read replicas for analytics and leaderboards"
    implementation: "Master-slave PostgreSQL setup"
    benefits: "Reduced load on primary database"
```

### 2. Caching Strategy Details

```yaml
cache_layers:
  browser_cache:
    duration: "Static assets: 1 year, API responses: 5 minutes"
    invalidation: "Version-based for assets, ETag for API"
    
  cdn_cache:
    duration: "Static assets: 1 year, dynamic content: 1 hour"
    invalidation: "Webhook-triggered purge on updates"
    
  redis_cache:
    game_states: "TTL: 2 hours, updated on every move"
    user_sessions: "TTL: 24 hours, sliding expiration"
    leaderboards: "TTL: 5 minutes, updated on game completion"
    puzzle_cache: "TTL: 24 hours, 1000 puzzles per difficulty"
    
  database_cache:
    query_cache: "Built-in PostgreSQL query cache"
    prepared_statements: "Prisma prepared statement cache"
```

### 3. Error Recovery Patterns

```yaml
retry_strategies:
  exponential_backoff:
    initial_delay: 100ms
    max_delay: 30s
    max_attempts: 5
    jitter: true
    
  circuit_breaker:
    failure_threshold: 5
    timeout: 30s
    recovery_time: 60s
    
  graceful_degradation:
    game_moves: "Store locally, sync when connection restored"
    leaderboards: "Show cached data with staleness indicator"
    tournaments: "Allow offline viewing, block registration"

connection_resilience:
  websocket_reconnection:
    automatic: true
    max_attempts: 10
    backoff_strategy: "exponential"
    
  http_request_retry:
    idempotent_requests: "Auto-retry with exponential backoff"
    non_idempotent: "User confirmation required"
    
  offline_support:
    single_player: "Full offline capability"
    multiplayer: "Queue actions for sync"
```

### 4. State Synchronization Patterns

```yaml
client_state_sync:
  optimistic_updates:
    description: "Update UI immediately, rollback if server rejects"
    use_cases: ["Game moves", "Profile updates", "Chat messages"]
    rollback_strategy: "Restore previous state + error notification"
    
  conflict_resolution:
    strategy: "Server state always wins"
    implementation: "Compare timestamps and sequence numbers"
    user_notification: "Show conflict resolution to user"
    
  state_reconciliation:
    frequency: "On reconnection and every 30 seconds"
    method: "Delta sync with version vectors"
    fallback: "Full state refresh if delta fails"

server_state_sync:
  database_consistency:
    isolation_level: "READ_COMMITTED"
    transaction_strategy: "Short-lived transactions"
    deadlock_handling: "Automatic retry with backoff"
    
  cache_consistency:
    write_through: "Update cache immediately after database"
    invalidation: "Event-driven cache invalidation"
    eventual_consistency: "Acceptable for analytics data"
```

### 5. Analytics Data Pipeline

```yaml
data_collection:
  client_events:
    - user_action: "Click, scroll, focus events"
    - game_events: "Moves, errors, completion times"
    - performance: "Load times, error rates"
    - engagement: "Session duration, feature usage"
    
  server_events:
    - api_calls: "Response times, error rates"
    - database: "Query performance, connection metrics"
    - business: "User registrations, subscription changes"
    
data_processing:
  real_time:
    tool: "Redis Streams"
    use_cases: ["Live leaderboards", "Real-time dashboards"]
    latency: "<1 second"
    
  batch_processing:
    tool: "Scheduled jobs"
    frequency: "Hourly for reports, daily for aggregations"
    use_cases: ["User analytics", "Business intelligence"]
    
data_storage:
  time_series: "Game performance metrics"
  aggregated: "Daily/weekly/monthly summaries"
  raw_events: "30-day retention for debugging"
```

This comprehensive data flow documentation provides detailed insights into how data moves through the Sudokru system, from user interactions to database storage, including real-time gaming, authentication, payments, and analytics. The diagrams and optimization strategies ensure efficient, scalable, and reliable data handling across all system components.