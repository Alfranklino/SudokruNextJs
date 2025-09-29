# Sudokru - Custom Components Library

## Overview
This document catalogs custom React/Next.js components for Sudokru's real-time multiplayer Sudoku platform. These components extend beyond standard shadcn/ui components to provide gaming-specific functionality and real-time interaction patterns.

## Component Architecture

### Component Categories
1. **Gaming Core Components** - Sudoku grid, game mechanics, real-time features
2. **Competitive UI Components** - Leaderboards, tournaments, matchmaking
3. **Social Gaming Components** - Friends, chat, collaboration features
4. **Real-time Communication** - WebSocket-driven live updates
5. **Analytics & Statistics** - Performance tracking, data visualization
6. **Mobile Gaming Components** - Touch-optimized gaming interfaces

## Gaming Core Components

### 1. SudokuGrid
**Purpose**: Interactive Sudoku game board with real-time multiplayer support
```tsx
interface SudokuGridProps {
  grid: number[][];
  isEditable: boolean;
  selectedCell?: { row: number; col: number };
  onCellSelect: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, value: number) => void;
  givenCells: boolean[][];
  errorCells?: boolean[][];
  opponentGrid?: number[][];
  showOpponentProgress?: boolean;
  cellSize?: 'sm' | 'md' | 'lg';
  highlightLastMove?: { row: number; col: number };
}
```
**Features**:
- 9x9 grid with proper Sudoku visual hierarchy
- Touch and keyboard input support
- Real-time opponent progress overlay
- Error highlighting and validation
- Given vs. user-entered cell differentiation
- Responsive sizing for different devices
- Accessibility support with ARIA labels

### 2. NumberInput
**Purpose**: Touch-optimized number input for Sudoku cells
```tsx
interface NumberInputProps {
  onNumberSelect: (number: number) => void;
  onNotesToggle: () => void;
  onClear: () => void;
  disabled?: boolean;
  notesMode?: boolean;
  availableNumbers?: number[];
  orientation?: 'horizontal' | 'vertical' | 'grid';
}
```
**Features**:
- Large touch targets optimized for mobile
- Visual feedback for number selection
- Notes mode toggle for pencil marks
- Clear/erase functionality
- Disabled state for invalid moves
- Horizontal, vertical, and grid layouts

### 3. GameTimer
**Purpose**: Real-time game timer with competitive features
```tsx
interface GameTimerProps {
  startTime: Date;
  isRunning: boolean;
  timeLimit?: number;
  onTimeUp?: () => void;
  showWarnings?: boolean;
  format?: 'mm:ss' | 'hh:mm:ss';
  variant?: 'default' | 'competitive' | 'warning' | 'critical';
}
```
**Features**:
- Precise millisecond timing
- Visual warning states at time thresholds
- Multiple display formats
- Pause/resume functionality
- Time limit enforcement
- Sound alerts for warnings (optional)

### 4. GameStatus
**Purpose**: Real-time game state indicator and controls
```tsx
interface GameStatusProps {
  gameState: 'waiting' | 'active' | 'paused' | 'completed' | 'abandoned';
  players: Player[];
  currentPlayer?: string;
  onPause?: () => void;
  onResume?: () => void;
  onSurrender?: () => void;
  spectatorCount?: number;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}
```
**Features**:
- Real-time connection status indicator
- Player list with online/offline status
- Game control buttons (pause, surrender)
- Spectator count display
- Game state transitions with animations
- Responsive layout for different screen sizes

### 5. MoveHistory
**Purpose**: Timeline of moves made during the game
```tsx
interface MoveHistoryProps {
  moves: GameMove[];
  currentMoveIndex?: number;
  onMoveSelect?: (moveIndex: number) => void;
  playerColors: Record<string, string>;
  maxDisplayMoves?: number;
  showTimestamps?: boolean;
}
```
**Features**:
- Chronological move display
- Player-color-coded moves
- Move replay navigation
- Timestamp display
- Scrollable history for long games
- Export functionality for analysis

## Competitive UI Components

### 6. MatchmakingQueue
**Purpose**: Real-time matchmaking status and controls
```tsx
interface MatchmakingQueueProps {
  isSearching: boolean;
  estimatedWaitTime?: number;
  queuePosition?: number;
  skillRange: { min: number; max: number };
  onCancel: () => void;
  onExpandSkillRange?: () => void;
  preferences: MatchmakingPreferences;
}
```
**Features**:
- Real-time queue position updates
- Estimated wait time display
- Skill range visualization
- Queue cancellation
- Matchmaking preferences display
- Animated searching indicator

### 7. PlayerCard
**Purpose**: Player information display with gaming stats
```tsx
interface PlayerCardProps {
  player: Player;
  showDetailedStats?: boolean;
  showOnlineStatus?: boolean;
  actions?: PlayerAction[];
  variant?: 'compact' | 'detailed' | 'leaderboard';
  rank?: number;
  isCurrentUser?: boolean;
}
```
**Features**:
- Avatar with online status indicator
- ELO rating and rank display
- Win/loss statistics
- Action buttons (challenge, friend request)
- Achievement badges
- Responsive design variants

### 8. TournamentBracket
**Purpose**: Interactive tournament bracket visualization
```tsx
interface TournamentBracketProps {
  tournament: Tournament;
  matches: Match[];
  onMatchClick?: (match: Match) => void;
  userParticipant?: string;
  highlightUserPath?: boolean;
  orientation?: 'horizontal' | 'vertical';
  responsive?: boolean;
}
```
**Features**:
- Dynamic bracket generation
- Real-time match updates
- User path highlighting
- Interactive match details
- Responsive bracket layout
- SVG-based scalable graphics

### 9. Leaderboard
**Purpose**: Ranking display with real-time updates
```tsx
interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUser?: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time';
  category: 'overall' | 'speed' | 'accuracy' | 'difficulty';
  maxEntries?: number;
  showMovement?: boolean;
  onPlayerClick?: (playerId: string) => void;
}
```
**Features**:
- Real-time ranking updates
- Current user highlighting
- Rank movement indicators
- Pagination for large leaderboards
- Category filtering
- Export and sharing options

### 10. GameInvitation
**Purpose**: Game invitation interface with acceptance controls
```tsx
interface GameInvitationProps {
  invitation: GameInvitation;
  onAccept: () => void;
  onDecline: () => void;
  onCounter?: (settings: GameSettings) => void;
  showPreview?: boolean;
  autoExpire?: number;
}
```
**Features**:
- Invitation details display
- Quick accept/decline actions
- Counter-offer functionality
- Game settings preview
- Auto-expiring invitations
- Sound/vibration notifications

## Social Gaming Components

### 11. FriendsList
**Purpose**: Social connections management interface
```tsx
interface FriendsListProps {
  friends: Friend[];
  onlineOnly?: boolean;
  onInviteToGame?: (friendId: string) => void;
  onMessageFriend?: (friendId: string) => void;
  onRemoveFriend?: (friendId: string) => void;
  sortBy?: 'name' | 'status' | 'lastSeen' | 'rating';
  showActions?: boolean;
}
```
**Features**:
- Online status indicators
- Last seen timestamps
- Quick game invitation
- Friend management actions
- Search and filtering
- Activity status display

### 12. GameChat
**Purpose**: Real-time in-game communication
```tsx
interface GameChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  currentUser: string;
  maxMessages?: number;
  showTimestamps?: boolean;
  allowEmojis?: boolean;
  moderationEnabled?: boolean;
  placeholder?: string;
}
```
**Features**:
- Real-time message display
- Emoji picker integration
- Message timestamps
- User identification
- Content moderation
- Mobile-optimized input

### 13. SpectatorPanel
**Purpose**: Spectator interface for watching games
```tsx
interface SpectatorPanelProps {
  game: Game;
  spectators: User[];
  onJoinAsSpectator: () => void;
  onLeaveSpectating: () => void;
  allowChat?: boolean;
  showPlayerStats?: boolean;
  perspectiveControl?: boolean;
}
```
**Features**:
- Player perspective switching
- Spectator count display
- Spectator chat (if enabled)
- Game statistics overlay
- Join/leave spectating controls
- Minimal interface for focus

### 14. ActivityFeed
**Purpose**: Social activity and achievement display
```tsx
interface ActivityFeedProps {
  activities: Activity[];
  showFilters?: boolean;
  maxActivities?: number;
  onActivityClick?: (activity: Activity) => void;
  autoRefresh?: boolean;
  groupByDate?: boolean;
}
```
**Features**:
- Real-time activity updates
- Activity type filtering
- Date-based grouping
- Infinite scroll loading
- Social interactions (like, comment)
- Achievement celebrations

## Real-time Communication Components

### 15. ConnectionStatus
**Purpose**: WebSocket connection status indicator
```tsx
interface ConnectionStatusProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  latency?: number;
  onReconnect?: () => void;
  showLatency?: boolean;
  position?: 'top' | 'bottom' | 'floating';
}
```
**Features**:
- Visual connection indicators
- Network latency display
- Reconnection controls
- Error state messaging
- Unobtrusive positioning
- Auto-hiding when connected

### 16. LiveGamePreview
**Purpose**: Real-time game preview for spectators
```tsx
interface LiveGamePreviewProps {
  gameId: string;
  players: Player[];
  currentGrid?: number[][];
  timeElapsed: number;
  onJoinSpectate?: () => void;
  onJoinGame?: () => void;
  autoUpdate?: boolean;
  showControls?: boolean;
}
```
**Features**:
- Live grid state updates
- Player progress indicators
- Game statistics overlay
- Join game/spectate options
- Auto-refresh functionality
- Minimal performance impact

### 17. RealtimeNotification
**Purpose**: Live notification system for game events
```tsx
interface RealtimeNotificationProps {
  notifications: GameNotification[];
  onDismiss: (id: string) => void;
  maxVisible?: number;
  position?: 'top-right' | 'bottom-right' | 'center';
  soundEnabled?: boolean;
  groupSimilar?: boolean;
}
```
**Features**:
- Real-time game event notifications
- Auto-dismiss timers
- Sound/vibration alerts
- Notification grouping
- Priority-based ordering
- Accessibility compliance

## Analytics & Statistics Components

### 18. PerformanceChart
**Purpose**: Interactive performance analytics visualization
```tsx
interface PerformanceChartProps {
  data: PerformanceData[];
  timeframe: 'week' | 'month' | 'year';
  metric: 'time' | 'accuracy' | 'rating' | 'winRate';
  showComparison?: boolean;
  comparisonData?: PerformanceData[];
  interactive?: boolean;
  exportable?: boolean;
}
```
**Features**:
- Multiple chart types (line, bar, area)
- Time range selection
- Metric comparison overlays
- Hover tooltips with details
- Export to image/data
- Responsive design

### 19. StatisticsWidget
**Purpose**: Key performance indicator display
```tsx
interface StatisticsWidgetProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}
```
**Features**:
- Trend indicators with animations
- Color-coded performance variants
- Loading skeleton states
- Responsive sizing options
- Icon support for context
- Percentage change calculations

### 20. GameAnalytics
**Purpose**: Detailed post-game analysis interface
```tsx
interface GameAnalyticsProps {
  gameData: GameAnalysis;
  showHeatMap?: boolean;
  showTimeBreakdown?: boolean;
  showMistakeAnalysis?: boolean;
  allowComparison?: boolean;
  exportOptions?: string[];
}
```
**Features**:
- Move-by-move analysis
- Time spent per cell heatmap
- Mistake pattern identification
- Strategy effectiveness metrics
- Comparison with previous games
- Detailed performance insights

### 21. ProgressTracker
**Purpose**: Skill development progress visualization
```tsx
interface ProgressTrackerProps {
  currentLevel: number;
  nextLevelProgress: number;
  skillAreas: SkillArea[];
  achievements: Achievement[];
  showPredictions?: boolean;
  timeframe?: 'week' | 'month' | 'all';
}
```
**Features**:
- Skill level progression
- Multi-dimensional skill tracking
- Achievement milestone display
- Progress predictions
- Motivational messaging
- Goal setting interface

## Mobile Gaming Components

### 22. TouchNumberPad
**Purpose**: Mobile-optimized number input interface
```tsx
interface TouchNumberPadProps {
  onNumberSelect: (number: number) => void;
  onNotesMode: () => void;
  onClear: () => void;
  selectedNumbers?: number[];
  notesMode?: boolean;
  layout?: 'grid' | 'row' | 'compact';
  hapticFeedback?: boolean;
}
```
**Features**:
- Large touch targets (44px minimum)
- Haptic feedback support
- Visual press states
- Notes mode toggle
- Multiple layout options
- iOS/Android platform adaptation

### 23. MobileGameHeader
**Purpose**: Compact game information header for mobile
```tsx
interface MobileGameHeaderProps {
  gameInfo: GameInfo;
  players: Player[];
  timeElapsed: number;
  onMenuToggle: () => void;
  onPause?: () => void;
  showScore?: boolean;
  variant?: 'minimal' | 'detailed';
}
```
**Features**:
- Compact information display
- Hamburger menu integration
- Timer and score display
- Player indicators
- Context-aware actions
- Responsive text sizing

### 24. SwipeableGameCard
**Purpose**: Touch-interactive game selection cards
```tsx
interface SwipeableGameCardProps {
  game: GamePreview;
  onJoin: () => void;
  onSpectate: () => void;
  onShare?: () => void;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  threshold?: number;
}
```
**Features**:
- Swipe gesture recognition
- Configurable swipe actions
- Visual feedback during swipe
- Haptic feedback support
- Smooth animations
- Accessibility compliance

### 25. PullToRefresh
**Purpose**: Mobile pull-to-refresh for live data
```tsx
interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  threshold?: number;
  pullDistance?: number;
  customIndicator?: React.ReactNode;
}
```
**Features**:
- Native pull-to-refresh behavior
- Custom refresh indicators
- Threshold customization
- Loading state management
- Smooth animation transitions
- Platform-specific styling

## Advanced Gaming Components

### 26. GameRecorder
**Purpose**: Game session recording and playback
```tsx
interface GameRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayback: (recording: GameRecording) => void;
  recordingQuality?: 'low' | 'medium' | 'high';
  includeAudio?: boolean;
}
```
**Features**:
- Real-time game state recording
- Playback controls with speed adjustment
- Quality settings for storage optimization
- Audio commentary recording
- Share recording functionality
- Privacy controls

### 27. AIHintSystem
**Purpose**: Intelligent hint and suggestion system
```tsx
interface AIHintSystemProps {
  currentGrid: number[][];
  onHintRequest: () => void;
  hintType: 'next-move' | 'technique' | 'error-check';
  maxHints?: number;
  hintsUsed: number;
  showDifficulty?: boolean;
  adaptiveHints?: boolean;
}
```
**Features**:
- Multiple hint types and difficulty levels
- Adaptive hint system based on skill
- Hint usage tracking
- Visual hint overlays on grid
- Educational explanations
- Hint limitation system

### 28. VoiceInterface
**Purpose**: Voice command integration for accessibility
```tsx
interface VoiceInterfaceProps {
  onVoiceCommand: (command: VoiceCommand) => void;
  isListening: boolean;
  onToggleListening: () => void;
  supportedCommands: string[];
  language?: string;
  confidenceThreshold?: number;
}
```
**Features**:
- Voice-to-action command processing
- Multi-language support
- Confidence threshold adjustment
- Visual feedback for voice recognition
- Command help and training
- Accessibility optimization

### 29. ThemeCustomizer
**Purpose**: Visual theme and accessibility customization
```tsx
interface ThemeCustomizerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  availableThemes: Theme[];
  customizationOptions: CustomizationOption[];
  previewMode?: boolean;
  accessibilityFeatures?: boolean;
}
```
**Features**:
- Multiple visual themes
- Color customization options
- Accessibility feature toggles
- High contrast modes
- Preview functionality
- Custom theme creation

### 30. GameModeSelector
**Purpose**: Game type and configuration selection
```tsx
interface GameModeSelectorProps {
  availableModes: GameMode[];
  selectedMode?: string;
  onModeSelect: (mode: GameMode) => void;
  onConfigureMode?: (config: GameConfig) => void;
  showDifficulty?: boolean;
  showPlayerCount?: boolean;
}
```
**Features**:
- Visual game mode presentation
- Configuration options per mode
- Difficulty level selection
- Player count options
- Mode descriptions and rules
- Quick start functionality

## Component Development Guidelines

### Design Principles
1. **Gaming-First**: Optimized for competitive gaming experiences
2. **Real-time Ready**: Designed for live multiplayer interactions
3. **Mobile Optimized**: Touch-first interface design
4. **Performance Critical**: Minimal re-renders, optimized for 60fps
5. **Accessibility Focused**: WCAG 2.1 AA compliance with gaming considerations
6. **Platform Adaptive**: Responsive design across devices

### Technical Standards
- **TypeScript**: Strict typing for all component interfaces
- **React Performance**: Memo, useMemo, useCallback optimization
- **Real-time Integration**: WebSocket event handling
- **Error Boundaries**: Graceful error handling and recovery
- **Testing Coverage**: Unit tests, integration tests, accessibility tests
- **Documentation**: Comprehensive Storybook stories

### Implementation Requirements
- **State Management**: Zustand store integration
- **Styling**: Tailwind CSS with design tokens
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for complex animations
- **Touch Events**: React gesture handler integration
- **Sound**: Web Audio API for game sounds

### Mobile Considerations
- **Touch Targets**: Minimum 44px interactive elements
- **Gesture Support**: Swipe, pinch, long press recognition
- **Performance**: 60fps animations, memory optimization
- **Battery Life**: Efficient rendering, background state management
- **Offline Support**: Service worker integration for core components
- **PWA Features**: Installation prompts, app-like behavior

### Accessibility Requirements
- **Screen Readers**: ARIA labels, role definitions, live regions
- **Keyboard Navigation**: Tab order, keyboard shortcuts
- **Visual Accessibility**: High contrast support, text scaling
- **Motor Accessibility**: Large touch targets, gesture alternatives
- **Cognitive Accessibility**: Clear labeling, consistent patterns
- **Gaming Accessibility**: Pause functionality, speed adjustments

This comprehensive component library provides the foundation for Sudokru's competitive gaming platform while maintaining excellent usability and accessibility standards.