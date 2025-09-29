# Sudokru - API Specification (OpenAPI/Swagger)

## OpenAPI 3.0 Specification

```yaml
openapi: 3.0.3
info:
  title: Sudokru API
  description: Real-time multiplayer Sudoku gaming platform API
  version: 1.0.0
  contact:
    name: Sudokru API Support
    email: api@sudokru.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.sudokru.com/v1
    description: Production server
  - url: https://staging-api.sudokru.com/v1
    description: Staging server
  - url: http://localhost:3000/api/v1
    description: Development server

security:
  - BearerAuth: []
  - ApiKeyAuth: []

paths:
  # ================================
  # AUTHENTICATION ENDPOINTS
  # ================================
  
  /auth/register:
    post:
      tags: [Authentication]
      summary: Register new user account
      description: Create a new user account with email and password
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegistration'
      responses:
        '201':
          description: User successfully registered
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '400':
          $ref: '#/components/responses/ValidationError'
        '409':
          description: Email or username already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      tags: [Authentication]
      summary: Authenticate user
      description: Login with email/username and password
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserLogin'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/refresh:
    post:
      tags: [Authentication]
      summary: Refresh access token
      description: Get new access token using refresh token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken:
                  type: string
              required: [refreshToken]
      responses:
        '200':
          description: Token refreshed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

  /auth/logout:
    post:
      tags: [Authentication]
      summary: Logout user
      description: Invalidate current session
      responses:
        '200':
          description: Logout successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  # ================================
  # USER MANAGEMENT ENDPOINTS
  # ================================

  /users/me:
    get:
      tags: [Users]
      summary: Get current user profile
      description: Retrieve authenticated user's profile information
      responses:
        '200':
          description: User profile retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          $ref: '#/components/responses/Unauthorized'

    put:
      tags: [Users]
      summary: Update user profile
      description: Update authenticated user's profile information
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfileUpdate'
      responses:
        '200':
          description: Profile updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '400':
          $ref: '#/components/responses/ValidationError'

  /users/me/statistics:
    get:
      tags: [Users]
      summary: Get user statistics
      description: Retrieve detailed statistics for authenticated user
      responses:
        '200':
          description: Statistics retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserStatistics'

  /users/search:
    get:
      tags: [Users]
      summary: Search users
      description: Search for users by username or display name
      parameters:
        - name: query
          in: query
          required: true
          schema:
            type: string
            minLength: 3
          description: Search query string
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 20
          description: Maximum number of results
      responses:
        '200':
          description: Search results
          content:
            application/json:
              schema:
                type: object
                properties:
                  users:
                    type: array
                    items:
                      $ref: '#/components/schemas/UserSearchResult'
                  total:
                    type: integer

  # ================================
  # GAME ENDPOINTS
  # ================================

  /games:
    get:
      tags: [Games]
      summary: List games
      description: Get list of games with optional filtering
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [waiting, active, completed]
          description: Filter by game status
        - name: type
          in: query
          schema:
            type: string
            enum: [competitive, collaborative, tournament, practice]
          description: Filter by game type
        - name: difficulty
          in: query
          schema:
            $ref: '#/components/schemas/Difficulty'
          description: Filter by difficulty level
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Games retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GameListResponse'

    post:
      tags: [Games]
      summary: Create new game
      description: Create a new game session
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GameCreation'
      responses:
        '201':
          description: Game created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Game'
        '400':
          $ref: '#/components/responses/ValidationError'

  /games/{gameId}:
    get:
      tags: [Games]
      summary: Get game details
      description: Retrieve detailed information about a specific game
      parameters:
        - $ref: '#/components/parameters/GameId'
      responses:
        '200':
          description: Game details retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GameDetails'
        '404':
          $ref: '#/components/responses/NotFound'

  /games/{gameId}/join:
    post:
      tags: [Games]
      summary: Join game
      description: Join an existing game as a player or spectator
      parameters:
        - $ref: '#/components/parameters/GameId'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                role:
                  type: string
                  enum: [player, spectator]
                  default: player
      responses:
        '200':
          description: Successfully joined game
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GameJoinResponse'
        '400':
          description: Cannot join game (full, already joined, etc.)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /games/{gameId}/leave:
    post:
      tags: [Games]
      summary: Leave game
      description: Leave a game session
      parameters:
        - $ref: '#/components/parameters/GameId'
      responses:
        '200':
          description: Successfully left game
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  /games/{gameId}/moves:
    post:
      tags: [Games]
      summary: Make game move
      description: Submit a move in an active game
      parameters:
        - $ref: '#/components/parameters/GameId'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GameMove'
      responses:
        '200':
          description: Move submitted successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GameMoveResponse'
        '400':
          description: Invalid move
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

    get:
      tags: [Games]
      summary: Get game moves
      description: Retrieve move history for a game
      parameters:
        - $ref: '#/components/parameters/GameId'
        - name: fromTimestamp
          in: query
          schema:
            type: integer
          description: Get moves from this timestamp
      responses:
        '200':
          description: Moves retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  moves:
                    type: array
                    items:
                      $ref: '#/components/schemas/GameMoveHistory'

  # ================================
  # TOURNAMENT ENDPOINTS
  # ================================

  /tournaments:
    get:
      tags: [Tournaments]
      summary: List tournaments
      description: Get list of tournaments with filtering options
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [upcoming, registration, active, completed]
        - name: difficulty
          in: query
          schema:
            $ref: '#/components/schemas/Difficulty'
        - name: format
          in: query
          schema:
            type: string
            enum: [single_elimination, double_elimination, round_robin]
      responses:
        '200':
          description: Tournaments retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TournamentListResponse'

    post:
      tags: [Tournaments]
      summary: Create tournament
      description: Create a new tournament (admin only)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TournamentCreation'
      responses:
        '201':
          description: Tournament created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tournament'
        '403':
          $ref: '#/components/responses/Forbidden'

  /tournaments/{tournamentId}:
    get:
      tags: [Tournaments]
      summary: Get tournament details
      description: Retrieve detailed tournament information including bracket
      parameters:
        - name: tournamentId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Tournament details retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TournamentDetails'

  /tournaments/{tournamentId}/register:
    post:
      tags: [Tournaments]
      summary: Register for tournament
      description: Register authenticated user for tournament
      parameters:
        - name: tournamentId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successfully registered for tournament
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TournamentRegistrationResponse'
        '400':
          description: Cannot register (full, closed, requirements not met)

  /tournaments/{tournamentId}/bracket:
    get:
      tags: [Tournaments]
      summary: Get tournament bracket
      description: Retrieve current tournament bracket and match results
      parameters:
        - name: tournamentId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Bracket retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TournamentBracket'

  # ================================
  # SOCIAL ENDPOINTS
  # ================================

  /social/friends:
    get:
      tags: [Social]
      summary: Get friends list
      description: Retrieve user's friends list
      responses:
        '200':
          description: Friends list retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  friends:
                    type: array
                    items:
                      $ref: '#/components/schemas/Friend'

  /social/friends/requests:
    get:
      tags: [Social]
      summary: Get friend requests
      description: Retrieve pending friend requests
      responses:
        '200':
          description: Friend requests retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  sent:
                    type: array
                    items:
                      $ref: '#/components/schemas/FriendRequest'
                  received:
                    type: array
                    items:
                      $ref: '#/components/schemas/FriendRequest'

    post:
      tags: [Social]
      summary: Send friend request
      description: Send a friend request to another user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userId:
                  type: string
                message:
                  type: string
                  maxLength: 200
              required: [userId]
      responses:
        '200':
          description: Friend request sent successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  /social/friends/requests/{requestId}/accept:
    post:
      tags: [Social]
      summary: Accept friend request
      description: Accept a pending friend request
      parameters:
        - name: requestId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Friend request accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  /social/friends/requests/{requestId}/decline:
    post:
      tags: [Social]
      summary: Decline friend request
      description: Decline a pending friend request
      parameters:
        - name: requestId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Friend request declined
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  # ================================
  # LEADERBOARD ENDPOINTS
  # ================================

  /leaderboards/global:
    get:
      tags: [Leaderboards]
      summary: Get global leaderboard
      description: Retrieve global player rankings by ELO rating
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
      responses:
        '200':
          description: Leaderboard retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LeaderboardResponse'

  /leaderboards/friends:
    get:
      tags: [Leaderboards]
      summary: Get friends leaderboard
      description: Retrieve leaderboard showing only user's friends
      responses:
        '200':
          description: Friends leaderboard retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LeaderboardResponse'

  # ================================
  # NOTIFICATION ENDPOINTS
  # ================================

  /notifications:
    get:
      tags: [Notifications]
      summary: Get notifications
      description: Retrieve user's notifications
      parameters:
        - name: unread
          in: query
          schema:
            type: boolean
          description: Filter for unread notifications only
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Notifications retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  notifications:
                    type: array
                    items:
                      $ref: '#/components/schemas/Notification'
                  unreadCount:
                    type: integer

  /notifications/{notificationId}/read:
    post:
      tags: [Notifications]
      summary: Mark notification as read
      description: Mark a specific notification as read
      parameters:
        - name: notificationId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Notification marked as read
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  /notifications/mark-all-read:
    post:
      tags: [Notifications]
      summary: Mark all notifications as read
      description: Mark all user's notifications as read
      responses:
        '200':
          description: All notifications marked as read
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

  # ================================
  # ANALYTICS ENDPOINTS
  # ================================

  /analytics/user/performance:
    get:
      tags: [Analytics]
      summary: Get user performance analytics
      description: Retrieve detailed performance analytics for authenticated user
      parameters:
        - name: timeframe
          in: query
          schema:
            type: string
            enum: [7d, 30d, 90d, 1y, all]
            default: 30d
        - name: difficulty
          in: query
          schema:
            $ref: '#/components/schemas/Difficulty'
      responses:
        '200':
          description: Analytics retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAnalytics'

  /analytics/game/{gameId}:
    get:
      tags: [Analytics]
      summary: Get game analytics
      description: Retrieve detailed analytics for a specific game
      parameters:
        - $ref: '#/components/parameters/GameId'
      responses:
        '200':
          description: Game analytics retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GameAnalytics'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

  parameters:
    GameId:
      name: gameId
      in: path
      required: true
      schema:
        type: string
        pattern: '^[a-zA-Z0-9]{25}
      description: Unique game identifier

  responses:
    Unauthorized:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: "Authentication required"
            code: "UNAUTHORIZED"

    Forbidden:
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: "Insufficient permissions"
            code: "FORBIDDEN"

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: "Resource not found"
            code: "NOT_FOUND"

    ValidationError:
      description: Validation error
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
              code:
                type: string
                example: "VALIDATION_ERROR"
              details:
                type: array
                items:
                  type: object
                  properties:
                    field:
                      type: string
                    message:
                      type: string

  schemas:
    # ================================
    # AUTHENTICATION SCHEMAS
    # ================================

    UserRegistration:
      type: object
      required: [email, username, password]
      properties:
        email:
          type: string
          format: email
          example: "user@sudokru.com"
        username:
          type: string
          minLength: 3
          maxLength: 20
          pattern: '^[a-zA-Z0-9_]+
          example: "sudoku_master"
        password:
          type: string
          minLength: 8
          example: "securePassword123"
        displayName:
          type: string
          maxLength: 50
          example: "Sudoku Master"

    UserLogin:
      type: object
      required: [identifier, password]
      properties:
        identifier:
          type: string
          description: Email or username
          example: "user@sudokru.com"
        password:
          type: string
          example: "securePassword123"

    AuthResponse:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserProfile'
        tokens:
          $ref: '#/components/schemas/TokenResponse'

    TokenResponse:
      type: object
      properties:
        accessToken:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        refreshToken:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        expiresIn:
          type: integer
          description: Access token expiration in seconds
          example: 3600

    # ================================
    # USER SCHEMAS
    # ================================

    UserProfile:
      type: object
      properties:
        id:
          type: string
          example: "clp123456789"
        email:
          type: string
          format: email
          example: "user@sudokru.com"
        username:
          type: string
          example: "sudoku_master"
        displayName:
          type: string
          example: "Sudoku Master"
        avatar:
          type: string
          format: uri
          example: "https://cdn.sudokru.com/avatars/user123.jpg"
        bio:
          type: string
          example: "Competitive Sudoku player since 2020"
        country:
          type: string
          example: "US"
        subscription:
          $ref: '#/components/schemas/SubscriptionInfo'
        preferences:
          $ref: '#/components/schemas/UserPreferences'
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    UserProfileUpdate:
      type: object
      properties:
        displayName:
          type: string
          maxLength: 50
        bio:
          type: string
          maxLength: 200
        country:
          type: string
          minLength: 2
          maxLength: 2
        preferences:
          $ref: '#/components/schemas/UserPreferences'

    UserPreferences:
      type: object
      properties:
        preferredDifficulty:
          $ref: '#/components/schemas/Difficulty'
        soundEnabled:
          type: boolean
          default: true
        animationsEnabled:
          type: boolean
          default: true
        profileVisibility:
          type: string
          enum: [public, friends, private]
          default: public

    UserStatistics:
      type: object
      properties:
        gamesPlayed:
          type: integer
          example: 150
        gamesWon:
          type: integer
          example: 95
        winRate:
          type: number
          format: float
          example: 0.633
        eloRating:
          type: integer
          example: 1450
        peakRating:
          type: integer
          example: 1520
        averageSolveTime:
          type: integer
          description: Average solve time in seconds
          example: 425
        bestSolveTime:
          type: integer
          description: Best solve time in seconds
          example: 180
        currentStreak:
          type: integer
          example: 7
        longestStreak:
          type: integer
          example: 23
        difficultyStats:
          type: object
          properties:
            easy:
              $ref: '#/components/schemas/DifficultyStats'
            medium:
              $ref: '#/components/schemas/DifficultyStats'
            hard:
              $ref: '#/components/schemas/DifficultyStats'
            expert:
              $ref: '#/components/schemas/DifficultyStats'

    DifficultyStats:
      type: object
      properties:
        played:
          type: integer
        won:
          type: integer
        winRate:
          type: number
          format: float
        averageTime:
          type: integer

    SubscriptionInfo:
      type: object
      properties:
        tier:
          type: string
          enum: [free, premium]
        status:
          type: string
          enum: [active, cancelled, expired]
        startDate:
          type: string
          format: date-time
        endDate:
          type: string
          format: date-time

    UserSearchResult:
      type: object
      properties:
        id:
          type: string
        username:
          type: string
        displayName:
          type: string
        avatar:
          type: string
        eloRating:
          type: integer
        isOnline:
          type: boolean

    # ================================
    # GAME SCHEMAS
    # ================================

    Difficulty:
      type: string
      enum: [easy, medium, hard, expert]
      example: medium

    GameCreation:
      type: object
      required: [type, difficulty]
      properties:
        type:
          type: string
          enum: [competitive, collaborative, practice]
        mode:
          type: string
          enum: [speed, accuracy, casual]
          default: casual
        difficulty:
          $ref: '#/components/schemas/Difficulty'
        timeLimit:
          type: integer
          minimum: 60
          maximum: 3600
          description: Time limit in seconds
        isPrivate:
          type: boolean
          default: false
        maxPlayers:
          type: integer
          minimum: 2
          maximum: 8
          default: 2

    Game:
      type: object
      properties:
        id:
          type: string
          example: "clp987654321"
        type:
          type: string
          enum: [competitive, collaborative, tournament, practice]
        mode:
          type: string
          enum: [speed, accuracy, casual]
        difficulty:
          $ref: '#/components/schemas/Difficulty'
        status:
          type: string
          enum: [waiting, active, paused, completed, abandoned]
        timeLimit:
          type: integer
        maxPlayers:
          type: integer
        currentPlayers:
          type: integer
        isPrivate:
          type: boolean
        creator:
          $ref: '#/components/schemas/UserSearchResult'
        createdAt:
          type: string
          format: date-time
        startedAt:
          type: string
          format: date-time
        estimatedDuration:
          type: integer
          description: Estimated duration in seconds

    GameDetails:
      allOf:
        - $ref: '#/components/schemas/Game'
        - type: object
          properties:
            puzzle:
              $ref: '#/components/schemas/SudokuPuzzle'
            players:
              type: array
              items:
                $ref: '#/components/schemas/GamePlayer'
            spectators:
              type: array
              items:
                $ref: '#/components/schemas/UserSearchResult'
            settings:
              type: object
              additionalProperties: true

    SudokuPuzzle:
      type: object
      properties:
        id:
          type: string
        difficulty:
          $ref: '#/components/schemas/Difficulty'
        initialGrid:
          type: array
          items:
            type: array
            items:
              type: integer
              minimum: 0
              maximum: 9
          minItems: 9
          maxItems: 9
          description: 9x9 grid with initial clues (0 for empty cells)
        clueCount:
          type: integer
          example: 32

    GamePlayer:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserSearchResult'
        status:
          type: string
          enum: [joined, ready, playing, completed, disconnected]
        role:
          type: string
          enum: [player, spectator]
        currentGrid:
          type: array
          items:
            type: array
            items:
              type: integer
          description: Player's current puzzle state
        moveCount:
          type: integer
        errorCount:
          type: integer
        completionTime:
          type: integer
        score:
          type: integer
        isWinner:
          type: boolean
        joinedAt:
          type: string
          format: date-time

    GameMove:
      type: object
      required: [row, col, value]
      properties:
        row:
          type: integer
          minimum: 0
          maximum: 8
        col:
          type: integer
          minimum: 0
          maximum: 8
        value:
          type: integer
          minimum: 0
          maximum: 9
          description: Number to place (0 to clear cell)
        moveType:
          type: string
          enum: [place, clear, note]
          default: place

    GameMoveResponse:
      type: object
      properties:
        isValid:
          type: boolean
        isComplete:
          type: boolean
        timeFromStart:
          type: integer
          description: Time in milliseconds from game start
        gameState:
          $ref: '#/components/schemas/GameState'

    GameMoveHistory:
      type: object
      properties:
        id:
          type: string
        userId:
          type: string
        username:
          type: string
        row:
          type: integer
        col:
          type: integer
        value:
          type: integer
        moveType:
          type: string
        timeFromStart:
          type: integer
        isCorrect:
          type: boolean
        timestamp:
          type: string
          format: date-time

    GameState:
      type: object
      properties:
        gameId:
          type: string
        status:
          type: string
        players:
          type: array
          items:
            $ref: '#/components/schemas/GamePlayer'
        timeRemaining:
          type: integer
        currentTurn:
          type: string
          description: User ID of current turn (for turn-based modes)

    GameJoinResponse:
      type: object
      properties:
        success:
          type: boolean
        game:
          $ref: '#/components/schemas/GameDetails'
        playerRole:
          type: string
          enum: [player, spectator]

    GameListResponse:
      type: object
      properties:
        games:
          type: array
          items:
            $ref: '#/components/schemas/Game'
        pagination:
          $ref: '#/components/schemas/PaginationInfo'

    # ================================
    # TOURNAMENT SCHEMAS
    # ================================

    TournamentCreation:
      type: object
      required: [name, format, maxPlayers, difficulty, startTime]
      properties:
        name:
          type: string
          minLength: 3
          maxLength: 100
        description:
          type: string
          maxLength: 500
        format:
          type: string
          enum: [single_elimination, double_elimination, round_robin]
        maxPlayers:
          type: integer
          minimum: 8
          maximum: 128
        difficulty:
          $ref: '#/components/schemas/Difficulty'
        timeLimit:
          type: integer
          minimum: 300
          maximum: 1800
        minRating:
          type: integer
          minimum: 800
          maximum: 2400
        maxRating:
          type: integer
          minimum: 800
          maximum: 2400
        entryFee:
          type: integer
          minimum: 0
          description: Entry fee in cents
        isPremiumOnly:
          type: boolean
          default: false
        prizePool:
          type: integer
          minimum: 0
          description: Prize pool in cents
        registrationStart:
          type: string
          format: date-time
        registrationEnd:
          type: string
          format: date-time
        startTime:
          type: string
          format: date-time

    Tournament:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        format:
          type: string
        status:
          type: string
          enum: [upcoming, registration, active, completed, cancelled]
        maxPlayers:
          type: integer
        currentPlayers:
          type: integer
        difficulty:
          $ref: '#/components/schemas/Difficulty'
        timeLimit:
          type: integer
        entryFee:
          type: integer
        prizePool:
          type: integer
        isPremiumOnly:
          type: boolean
        currentRound:
          type: integer
        totalRounds:
          type: integer
        registrationStart:
          type: string
          format: date-time
        registrationEnd:
          type: string
          format: date-time
        startTime:
          type: string
          format: date-time
        endTime:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time

    TournamentDetails:
      allOf:
        - $ref: '#/components/schemas/Tournament'
        - type: object
          properties:
            participants:
              type: array
              items:
                $ref: '#/components/schemas/TournamentParticipant'
            matches:
              type: array
              items:
                $ref: '#/components/schemas/TournamentMatch'
            prizeDistribution:
              type: object
              additionalProperties:
                type: integer

    TournamentParticipant:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserSearchResult'
        seedPosition:
          type: integer
        currentRound:
          type: integer
        isEliminated:
          type: boolean
        finalPosition:
          type: integer
        ratingAtEntry:
          type: integer
        registeredAt:
          type: string
          format: date-time

    TournamentMatch:
      type: object
      properties:
        id:
          type: string
        round:
          type: integer
        matchNumber:
          type: integer
        player1:
          $ref: '#/components/schemas/UserSearchResult'
        player2:
          $ref: '#/components/schemas/UserSearchResult'
        winner:
          $ref: '#/components/schemas/UserSearchResult'
        gameId:
          type: string
        status:
          type: string
          enum: [upcoming, active, completed]
        scheduledAt:
          type: string
          format: date-time
        startedAt:
          type: string
          format: date-time
        completedAt:
          type: string
          format: date-time

    TournamentBracket:
      type: object
      properties:
        tournamentId:
          type: string
        format:
          type: string
        currentRound:
          type: integer
        totalRounds:
          type: integer
        rounds:
          type: array
          items:
            type: object
            properties:
              round:
                type: integer
              matches:
                type: array
                items:
                  $ref: '#/components/schemas/TournamentMatch'

    TournamentRegistrationResponse:
      type: object
      properties:
        success:
          type: boolean
        tournament:
          $ref: '#/components/schemas/Tournament'
        seedPosition:
          type: integer
        registrationTime:
          type: string
          format: date-time

    TournamentListResponse:
      type: object
      properties:
        tournaments:
          type: array
          items:
            $ref: '#/components/schemas/Tournament'
        pagination:
          $ref: '#/components/schemas/PaginationInfo'

    # ================================
    # SOCIAL SCHEMAS
    # ================================

    Friend:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserSearchResult'
        friendshipDate:
          type: string
          format: date-time
        isOnline:
          type: boolean
        lastSeen:
          type: string
          format: date-time

    FriendRequest:
      type: object
      properties:
        id:
          type: string
        requester:
          $ref: '#/components/schemas/UserSearchResult'
        requestee:
          $ref: '#/components/schemas/UserSearchResult'
        message:
          type: string
        status:
          type: string
          enum: [pending, accepted, declined]
        createdAt:
          type: string
          format: date-time

    # ================================
    # LEADERBOARD SCHEMAS
    # ================================

    LeaderboardResponse:
      type: object
      properties:
        leaderboard:
          type: array
          items:
            $ref: '#/components/schemas/LeaderboardEntry'
        userRank:
          type: integer
          description: Current user's rank in the leaderboard
        pagination:
          $ref: '#/components/schemas/PaginationInfo'

    LeaderboardEntry:
      type: object
      properties:
        rank:
          type: integer
        user:
          $ref: '#/components/schemas/UserSearchResult'
        eloRating:
          type: integer
        gamesPlayed:
          type: integer
        winRate:
          type: number
          format: float
        averageSolveTime:
          type: integer
        lastActive:
          type: string
          format: date-time

    # ================================
    # NOTIFICATION SCHEMAS
    # ================================

    Notification:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum: [friend_request, game_invite, tournament_start, achievement, system]
        title:
          type: string
        message:
          type: string
        data:
          type: object
          additionalProperties: true
          description: Additional notification-specific data
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # ================================
    # ANALYTICS SCHEMAS
    # ================================

    UserAnalytics:
      type: object
      properties:
        timeframe:
          type: string
        gamesPlayed:
          type: integer
        winRate:
          type: number
          format: float
        averageSolveTime:
          type: integer
        ratingChange:
          type: integer
        performanceByDifficulty:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/DifficultyStats'
        dailyStats:
          type: array
          items:
            type: object
            properties:
              date:
                type: string
                format: date
              gamesPlayed:
                type: integer
              winRate:
                type: number
              averageTime:
                type: integer

    GameAnalytics:
      type: object
      properties:
        gameId:
          type: string
        duration:
          type: integer
        moves:
          type: integer
        errors:
          type: integer
        hints:
          type: integer
        playerCount:
          type: integer
        completionRate:
          type: number
          format: float
        averageRating:
          type: number
          format: float

    # ================================
    # COMMON SCHEMAS
    # ================================

    PaginationInfo:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer
        hasNext:
          type: boolean
        hasPrev:
          type: boolean

    SuccessResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: "Operation completed successfully"

    Error:
      type: object
      properties:
        error:
          type: string
        code:
          type: string
        details:
          type: object
          additionalProperties: true
      required: [error, code]

# ================================
# WEBHOOK SCHEMAS
# ================================

webhooks:
  gameStateUpdate:
    post:
      summary: Game state update webhook
      description: Fired when game state changes (WebSocket alternative)
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                event:
                  type: string
                  example: "game.state.updated"
                gameId:
                  type: string
                gameState:
                  $ref: '#/components/schemas/GameState'
                timestamp:
                  type: string
                  format: date-time
      responses:
        '200':
          description: Webhook received successfully

  tournamentUpdate:
    post:
      summary: Tournament update webhook
      description: Fired when tournament status or bracket changes
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                event:
                  type: string
                  example: "tournament.bracket.updated"
                tournamentId:
                  type: string
                tournament:
                  $ref: '#/components/schemas/Tournament'
                timestamp:
                  type: string
                  format: date-time
      responses:
        '200':
          description: Webhook received successfully
```

## Real-time WebSocket Events

```yaml
# WebSocket Event Documentation
# Connection: wss://api.sudokru.com/socket.io

events:
  # Connection Events
  connect:
    description: Client connects to WebSocket
    payload: null
    
  authenticate:
    description: Authenticate WebSocket connection
    payload:
      token: string (JWT token)
    response:
      success: boolean
      user: UserProfile
      
  disconnect:
    description: Client disconnects
    payload: null

  # Game Events
  join-game:
    description: Join a game room
    payload:
      gameId: string
      role: "player" | "spectator"
    response:
      success: boolean
      game: GameDetails
      
  leave-game:
    description: Leave a game room
    payload:
      gameId: string
    response:
      success: boolean
      
  game-move:
    description: Submit a move in game
    payload:
      gameId: string
      move: GameMove
    broadcast:
      event: "game-state-updated"
      payload: GameState
      
  game-state-updated:
    description: Game state has changed
    payload: GameState
    
  player-joined:
    description: Player joined the game
    payload:
      gameId: string
      player: GamePlayer
      
  player-left:
    description: Player left the game
    payload:
      gameId: string
      userId: string
      
  game-started:
    description: Game has started
    payload:
      gameId: string
      startTime: string (ISO date)
      
  game-completed:
    description: Game has finished
    payload:
      gameId: string
      results: GameResults
      
  # Chat Events
  chat-message:
    description: Send chat message in game
    payload:
      gameId: string
      message: string
    broadcast:
      event: "chat-message-received"
      payload: ChatMessage
      
  chat-message-received:
    description: Chat message received
    payload: ChatMessage
    
  # Tournament Events
  tournament-bracket-updated:
    description: Tournament bracket has changed
    payload:
      tournamentId: string
      bracket: TournamentBracket
      
  tournament-match-ready:
    description: Tournament match is ready to start
    payload:
      tournamentId: string
      matchId: string
      participants: string[]
      
  # Error Events
  error:
    description: WebSocket error occurred
    payload:
      code: string
      message: string
      details?: object
```

## Rate Limiting

```yaml
rate_limits:
  authentication:
    login: "5 requests per minute per IP"
    register: "3 requests per minute per IP"
    
  games:
    create: "10 requests per minute per user"
    join: "20 requests per minute per user"
    move: "60 requests per minute per user"
    list: "100 requests per minute per user"
    
  social:
    friend_request: "10 requests per hour per user"
    search_users: "30 requests per minute per user"
    
  tournaments:
    create: "5 requests per hour per user" (admin only)
    register: "10 requests per minute per user"
    
  general:
    api_calls: "1000 requests per hour per authenticated user"
    websocket_messages: "100 messages per minute per connection"
```

## Authentication Flow

```yaml
authentication_flows:
  jwt_flow:
    description: "Standard JWT-based authentication"
    steps:
      1: "POST /auth/login with credentials"
      2: "Receive access token (1 hour expiry) and refresh token"
      3: "Include 'Authorization: Bearer {token}' in subsequent requests"
      4: "Use refresh token to get new access token when expired"
      
  oauth_flow:
    description: "OAuth authentication with external providers"
    providers: ["google", "github", "discord"]
    steps:
      1: "GET /auth/oauth/{provider} to initiate OAuth"
      2: "User redirected to provider for authorization"
      3: "Provider redirects back with authorization code"
      4: "Backend exchanges code for user info and creates session"
      5: "User receives JWT tokens same as standard flow"
      
  websocket_auth:
    description: "WebSocket connection authentication"
    steps:
      1: "Connect to WebSocket endpoint"
      2: "Send 'authenticate' event with JWT token"
      3: "Receive authentication confirmation"
      4: "Join game rooms and receive real-time updates"
```

## Error Codes

```yaml
error_codes:
  # Authentication Errors (1000-1099)
  INVALID_CREDENTIALS: 1001
  TOKEN_EXPIRED: 1002
  TOKEN_INVALID: 1003
  ACCOUNT_SUSPENDED: 1004
  EMAIL_NOT_VERIFIED: 1005
  
  # Authorization Errors (1100-1199)
  INSUFFICIENT_PERMISSIONS: 1101
  PREMIUM_REQUIRED: 1102
  ADMIN_REQUIRED: 1103
  
  # Validation Errors (2000-2099)
  INVALID_INPUT: 2001
  MISSING_REQUIRED_FIELD: 2002
  INVALID_EMAIL_FORMAT: 2003
  USERNAME_TOO_SHORT: 2004
  PASSWORD_TOO_WEAK: 2005
  
  # Game Errors (3000-3099)
  GAME_NOT_FOUND: 3001
  GAME_FULL: 3002
  GAME_ALREADY_STARTED: 3003
  INVALID_MOVE: 3004
  NOT_PLAYER_TURN: 3005
  GAME_ALREADY_COMPLETED: 3006
  ALREADY_IN_GAME: 3007
  
  # Tournament Errors (3100-3199)
  TOURNAMENT_NOT_FOUND: 3101
  TOURNAMENT_FULL: 3102
  REGISTRATION_CLOSED: 3103
  RATING_REQUIREMENTS_NOT_MET: 3104
  ALREADY_REGISTERED: 3105
  TOURNAMENT_NOT_STARTED: 3106
  
  # Social Errors (4000-4099)
  USER_NOT_FOUND: 4001
  FRIENDSHIP_EXISTS: 4002
  CANNOT_FRIEND_SELF: 4003
  FRIEND_REQUEST_PENDING: 4004
  
  # System Errors (5000-5099)
  INTERNAL_SERVER_ERROR: 5001
  SERVICE_UNAVAILABLE: 5002
  RATE_LIMIT_EXCEEDED: 5003
  MAINTENANCE_MODE: 5004
```

## API Usage Examples

### Authentication Example
```javascript
// Register new user
const registerResponse = await fetch('/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'player@sudokru.com',
    username: 'sudoku_pro',
    password: 'securePassword123',
    displayName: 'Sudoku Pro'
  })
});

// Login existing user
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    identifier: 'player@sudokru.com',
    password: 'securePassword123'
  })
});

const { user, tokens } = await loginResponse.json();
const accessToken = tokens.accessToken;
```

### Game Creation and Management
```javascript
// Create new competitive game
const gameResponse = await fetch('/api/v1/games', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'competitive',
    mode: 'speed',
    difficulty: 'medium',
    timeLimit: 900,
    maxPlayers: 2
  })
});

const game = await gameResponse.json();

// Join existing game
const joinResponse = await fetch(`/api/v1/games/${gameId}/join`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ role: 'player' })
});

// Make a move
const moveResponse = await fetch(`/api/v1/games/${gameId}/moves`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    row: 0,
    col: 0,
    value: 5,
    moveType: 'place'
  })
});
```

### WebSocket Real-time Communication
```javascript
import io from 'socket.io-client';

const socket = io('wss://api.sudokru.com', {
  auth: { token: accessToken }
});

// Join game room
socket.emit('join-game', { 
  gameId: 'clp123456789', 
  role: 'player' 
});

// Listen for game state updates
socket.on('game-state-updated', (gameState) => {
  console.log('Game state updated:', gameState);
  updateGameUI(gameState);
});

// Send move
socket.emit('game-move', {
  gameId: 'clp123456789',
  move: { row: 0, col: 0, value: 5, moveType: 'place' }
});

// Listen for chat messages
socket.on('chat-message-received', (message) => {
  console.log('New chat message:', message);
  addChatMessage(message);
});
```

### Tournament Management
```javascript
// Get upcoming tournaments
const tournamentsResponse = await fetch('/api/v1/tournaments?status=upcoming', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Register for tournament
const registerResponse = await fetch(`/api/v1/tournaments/${tournamentId}/register`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Get tournament bracket
const bracketResponse = await fetch(`/api/v1/tournaments/${tournamentId}/bracket`, {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

### Analytics and Statistics
```javascript
// Get user performance analytics
const analyticsResponse = await fetch('/api/v1/analytics/user/performance?timeframe=30d', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Get global leaderboard
const leaderboardResponse = await fetch('/api/v1/leaderboards/global?limit=100', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

// Get game-specific analytics
const gameAnalyticsResponse = await fetch(`/api/v1/analytics/game/${gameId}`, {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

## API Testing

### Postman Collection Setup
```json
{
  "info": {
    "name": "Sudokru API",
    "description": "Complete API testing collection for Sudokru"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{accessToken}}",
        "type": "string"
      }
    ]
  },
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "exec": [
          "// Auto-refresh token if expired",
          "const token = pm.environment.get('accessToken');",
          "if (!token || isTokenExpired(token)) {",
          "  refreshAccessToken();",
          "}"
        ]
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000/api/v1"
    },
    {
      "key": "accessToken",
      "value": ""
    }
  ]
}
```

### Automated Testing Scripts
```javascript
// Jest test example for API endpoints
describe('Game API Endpoints', () => {
  let accessToken;
  let gameId;

  beforeAll(async () => {
    // Login and get access token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        identifier: 'test@sudokru.com',
        password: 'testPassword123'
      });
    
    accessToken = loginResponse.body.tokens.accessToken;
  });

  test('POST /games - Create new game', async () => {
    const response = await request(app)
      .post('/api/v1/games')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        type: 'competitive',
        difficulty: 'medium',
        maxPlayers: 2
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('competitive');
    gameId = response.body.id;
  });

  test('POST /games/:id/join - Join game', async () => {
    const response = await request(app)
      .post(`/api/v1/games/${gameId}/join`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ role: 'player' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /games/:id/moves - Make move', async () => {
    const response = await request(app)
      .post(`/api/v1/games/${gameId}/moves`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        row: 0,
        col: 0,
        value: 5
      });

    expect(response.status).toBe(200);
    expect(response.body.isValid).toBeDefined();
  });
});
```

This comprehensive API specification provides complete documentation for all Sudokru endpoints, authentication flows, real-time WebSocket events, error handling, and usage examples. It serves as both developer documentation and testing reference for the entire API surface.