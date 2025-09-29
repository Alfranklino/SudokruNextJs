# Sudokru Development Guide

## Getting Started with Claude Code

**This document is the entry point for Sudokru development.**

### STEP 1: Read Generic Development Framework
1. Read `claude_code_entry_guide.md` - Generic phase-based approach
2. Read `git_guidelines.md` - Version control rules
3. Understand the general development methodology

### STEP 2: Understand Sudokru Context (MANDATORY)
**Before ANY implementation, read these Sudokru-specific documents:**

1. **PRD.md** - Product requirements for real-time multiplayer Sudoku platform
2. **sudokru_ui_components.md** - 30 custom gaming components specifications
3. **sudokru_user_flows.md** - 7 user journey sequences
4. **sudokru_page_inventory.md** - 51 pages with development priorities
5. **sudokru_style_guide.md** - Complete design token system and visual specs

### STEP 3: Apply Generic Phases with Sudokru Specifications

Follow the phases from `claude_code_entry_guide.md`, but apply Sudokru-specific requirements:

#### Phase 0: GitHub Setup
- Follow `git_guidelines.md` exactly
- Repository: [your-github-repo-url]
- Default branch: `dev`

#### Phase 1: Frontend Shell & Components (Weeks 1-10)
**Generic documents to reference:**
- Frontend Architecture Document
- Component Library Documentation
- Project Folder Structure Document

**Sudokru-specific additions:**
- Reference `sudokru_style_guide.md` for complete design token system
- Implement gaming components from `sudokru_components.md` sections 1-3 (Gaming Core & Competitive UI)
- Use exact color tokens (brand-primary: #3B82F6, brand-player-1: #8B5CF6, brand-player-2: #EC4899)
- Build pages in priority order from `sudokru_page_inventory.md` MVP section
- Follow competitive gaming aesthetic with clean puzzle interfaces

**Priority Components (Weeks 1-4):**
1. **SudokuGrid** (Component #1) - Interactive 9x9 game board with real-time multiplayer support, touch/keyboard input, error highlighting
2. **NumberInput** (Component #2) - Touch-optimized number input with notes mode, large touch targets for mobile
3. **GameTimer** (Component #3) - Real-time timer with competitive features, visual warnings, multiple display formats
4. **GameStatus** (Component #4) - Real-time game state indicator with player list, connection status, game controls
5. **PlayerCard** (Component #7) - Player info display with stats, ELO rating, online status, action buttons
6. **MatchmakingQueue** (Component #6) - Real-time matchmaking with queue position, wait time, skill range visualization
7. **ConnectionStatus** (Component #15) - WebSocket connection indicator with latency display

**Priority Pages (Weeks 1-4):**
1. **Landing Page** (`/`) - Live game preview, real-time player count, "Play as Guest" CTA, feature highlights
2. **Sign Up Page** (`/signup`) - Email/OAuth registration, username checker, skill level selector
3. **Login Page** (`/login`) - Authentication with "Play as Guest" alternative
4. **Game Dashboard** (`/dashboard`) - Main navigation, recent games, quick match finder, friend activity, stats overview
5. **Single Player Game** (`/play/solo`) - Difficulty selection, game timer, hint system, pause/resume
6. **Multiplayer Lobby** (`/play/multiplayer`) - Quick match, custom rooms, spectate options, queue status
7. **Game Room** (`/game/[gameId]`) - Split-screen Sudoku, real-time opponent progress, in-game chat, spectators

**Priority Pages (Weeks 5-10):**
8. **User Profile** (`/profile`) - Avatar, gaming stats, achievements, skill rating, recent games
9. **Profile Settings** (`/settings`) - Personal info, notifications, privacy controls
10. **Game Settings** (`/settings/game`) - Difficulty preferences, timer settings, grid appearance
11. **Friends List** (`/friends`) - Friend search, online status, invite to game, activity feed
12. **Tournament Lobby** (`/tournaments`) - Active tournaments, registration, prize info, schedule
13. **Statistics Dashboard** (`/stats`) - Performance graphs, win/loss ratio, solve times, improvement trends
14. **404 Error Page** (`/404`) - Gaming-themed error with navigation

#### Phase 2: API Layer Development (Weeks 11-16)
**Generic documents to reference:**
- API Specification (OpenAPI/Swagger)
- Data Flow Diagrams
- Error Handling & Logging Standards

**Sudokru-specific additions:**
- Real-time WebSocket integration for live multiplayer features
- Matchmaking algorithm implementation with skill-based rating
- Tournament bracket generation and progression logic
- Spectator mode support with minimal performance impact
- Follow user flows from `sudokru_user_flows.md` Flow 1-2 (New User Discovery & Competitive Journey)

**Priority APIs (Weeks 11-16):**
- **Authentication APIs**: Registration, login, OAuth, password reset, email verification
- **Game Management**: Create game, join game, game state sync, move validation, game completion
- **Matchmaking**: Queue management, skill matching, opponent finding, game room creation
- **Real-time Events**: WebSocket connections, opponent progress updates, chat messages, spectator updates
- **User Management**: Profile CRUD, settings management, friend system, statistics tracking
- **Tournament System**: Tournament creation, registration, bracket generation, match scheduling

#### Phase 3: Database Integration (Weeks 17-22)
**Generic documents to reference:**
- Database Schema Documentation
- Environment Configuration Guide

**Sudokru-specific additions:**
- User table with ELO rating system and skill tracking
- Game sessions with move history for replay functionality
- Tournament tables with bracket progression tracking
- Friend relationships with activity feeds
- Achievement system with unlock tracking
- Performance statistics aggregation tables

**Key Database Features:**
- Real-time game state persistence
- Move history for game replay and analysis
- Skill rating calculations with ELO system
- Tournament bracket relationships
- Spectator session tracking
- Chat message history with moderation flags

#### Phase 4: Authentication & Security (Weeks 23-26)
**Generic documents to reference:**
- Authentication & Authorization Schema
- Security Guidelines
- Performance Requirements & Monitoring

**Sudokru-specific additions:**
- User roles: Guest, Registered, Premium, Admin, Moderator
- Game session security with cheating prevention
- Fair play monitoring and enforcement
- WebSocket connection authentication
- Rate limiting for API and game actions
- Tournament participation verification

**Security Focus:**
- Anti-cheat measures for competitive gaming
- WebSocket message validation and sanitization
- Session management with auto-reconnection
- Input validation for Sudoku moves
- Tournament integrity enforcement
- Privacy controls for spectators

#### Phase 5: Production Preparation (Weeks 27-32)
**Generic documents to reference:**
- CI/CD Pipeline Documentation
- Environment Configuration Guide
- MVP Feature Matrix (for final validation)

**Sudokru-specific additions:**
- PostgreSQL migration from SQLite
- WebSocket server scaling configuration
- Real-time monitoring for game performance
- CDN setup for static assets and game boards
- Analytics integration for competitive metrics
- Mobile PWA optimization and installation

## Sudokru-Specific Technical Requirements

### Core Technical Characteristics
- **Real-time Multiplayer:** WebSocket-based live game synchronization with <100ms latency for competitive fairness
- **Matchmaking System:** Skill-based rating (ELO) with queue management and fair opponent matching
- **Tournament Infrastructure:** Bracket generation, match scheduling, real-time progression tracking with spectator support
- **Performance:** 60fps grid interactions, smooth animations, optimized for mobile touch gaming
- **Accessibility:** WCAG 2.1 AA compliance with gaming-specific considerations (keyboard navigation, screen reader support for game states)
- **Mobile-First Gaming:** Touch-optimized interfaces with haptic feedback, large touch targets (44px minimum), responsive grid sizing

### Custom Components Priority
Follow `sudokru_components.md` implementation order:
1. **Gaming Core Components** (Components 1-5) - Weeks 1-4: SudokuGrid, NumberInput, GameTimer, GameStatus, MoveHistory
2. **Competitive UI Components** (Components 6-10) - Weeks 5-8: MatchmakingQueue, PlayerCard, TournamentBracket, Leaderboard, GameInvitation
3. **Social Gaming Components** (Components 11-14) - Weeks 9-12: FriendsList, GameChat, SpectatorPanel, ActivityFeed
4. **Real-time Communication** (Components 15-17) - Weeks 13-16: ConnectionStatus, LiveGamePreview, RealtimeNotification
5. **Analytics & Statistics** (Components 18-21) - Weeks 17-20: PerformanceChart, StatisticsWidget, GameAnalytics, ProgressTracker
6. **Mobile Gaming Components** (Components 22-25) - Weeks 21-24: TouchNumberPad, MobileGameHeader, SwipeableGameCard, PullToRefresh
7. **Advanced Gaming Components** (Components 26-30) - Weeks 25-32: GameRecorder, AIHintSystem, VoiceInterface, ThemeCustomizer, GameModeSelector

### Design System Implementation
Reference `sudokru_style_guide.md` for:
- **Three-tier token system**: Brand tokens → Alias tokens → Mapped tokens for maintainable design
- **Color system**: brand-primary (#3B82F6), brand-player-1 (#8B5CF6), brand-player-2 (#EC4899), semantic gaming colors
- **Typography**: Inter for UI, JetBrains Mono for game numbers (monospace for visual consistency)
- **Responsive grid sizing**: Desktop (450px), Tablet (360px), Mobile (270px) Sudoku grids
- **Gaming-specific spacing**: Cell padding (4px), grid gaps (1-2px), section spacing (24px)
- **Dark mode support**: Complete dark mode overrides for gaming aesthetics

### Page Development Sequence
Follow `sudokru_page_inventory.md` priorities:
- **Phase 1 MVP (Pages 1-14):** Core authentication, game engine, basic multiplayer, essential user management - Weeks 1-10
- **Phase 2 Important (Pages 15-26):** Social features, tournament system, statistics, discovery features - Weeks 11-16
- **Phase 3 Enhanced (Pages 27-34):** Advanced gaming features, community building, premium functionality - Weeks 17-24
- **Phase 4 Utility (Pages 35-51):** Support infrastructure, legal compliance, comprehensive error handling - Weeks 25-32

## Critical Reminders

### What Makes Sudokru Different
- **Real-time Competitive Focus:** Every interaction optimized for live 1v1 battles with <100ms response times
- **Gaming-First Design:** Visual hierarchy prioritizes game board clarity while maintaining competitive atmosphere
- **Social Competition:** Friend challenges, tournaments, and spectator modes create community engagement
- **Skill Progression System:** ELO-based matchmaking ensures fair competition and motivates improvement
- **Mobile Gaming Optimization:** Touch-first interfaces with large targets, haptic feedback, PWA capabilities
- **Spectator-Friendly:** Live game watching with minimal performance impact on actual players

### Development Workflow
1. Always check `sudokru_style_guide.md` before implementing UI - use exact design tokens
2. Use gaming-specific color mappings: brand-player-1, brand-player-2, brand-gold for visual hierarchy
3. Reference `sudokru_components.md` for component specifications with gaming-specific features
4. Follow user flows from `sudokru_user_flows.md` for page sequences and conversion points
5. Implement pages in priority order from `sudokru_page_inventory.md` (MVP → Important → Enhanced)
6. Maintain 60fps performance for all grid interactions and real-time updates

### Quality Standards
- **Performance:** 60fps animations, <100ms WebSocket latency, <3s page load times
- **Accessibility:** WCAG 2.1 AA compliance, keyboard navigation for all game actions, screen reader support
- **Mobile:** 44px minimum touch targets, responsive grid sizing, PWA installation support
- **Testing:** Unit tests for game logic, integration tests for multiplayer features, accessibility testing
- **Gaming UX:** Clear visual feedback for all actions, error prevention in game interface, fair disconnect handling

## Quick Reference

### When implementing a page:
1. Check priority in `sudokru_page_inventory.md` (MVP pages 1-14 first)
2. Find design specs in `sudokru_style_guide.md` (use design token system)
3. Identify custom components in `sudokru_components.md` (Gaming Core components first)
4. Apply exact color tokens: brand-primary, brand-player-1, brand-player-2, semantic colors
5. Follow user flow from `sudokru_user_flows.md` (7 complete journey sequences)

### When implementing a component:
1. Find component spec in `sudokru_components.md` (30 gaming-specific components)
2. Use design tokens from `sudokru_style_guide.md` (three-tier token system)
3. Implement with gaming-first considerations: real-time updates, touch optimization, performance
4. Test for 60fps performance and mobile touch targets (44px minimum)
5. Ensure accessibility: keyboard navigation, screen reader support, visual feedback

### When implementing real-time features:
1. Use WebSocket for live game synchronization (<100ms latency target)
2. Implement reconnection logic for fair gameplay during disconnects
3. Add visual connection status indicators (ConnectionStatus component)
4. Handle spectator mode with minimal performance impact
5. Test with simulated network conditions and latency

### When implementing matchmaking:
1. Use ELO-based skill rating system for fair matches
2. Implement queue management with position and wait time display
3. Add skill range expansion for faster matching when needed
4. Handle edge cases: queue abandonment, connection drops during matching
5. Provide clear feedback during matchmaking process

---

**Remember:** Sudokru is a competitive gaming platform first, requiring real-time performance, fair matchmaking, and engaging social features. The generic guides provide methodology; this guide provides Sudokru's competitive gaming requirements. Always apply both for successful implementation.