# Sudokru - Component Library Documentation

## 1. Design System Foundation

### 1.1 Design Principles
- **Clarity:** All UI elements should clearly communicate their purpose and state
- **Consistency:** Uniform patterns across all components and interactions
- **Accessibility:** WCAG 2.1 AA compliance with proper contrast and keyboard navigation
- **Performance:** Optimized components with minimal re-renders and bundle size
- **Gaming-focused:** Visual feedback for real-time interactions and competitive elements

### 1.2 Technology Stack
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Component Library:** shadcn/ui as base, extended for gaming features
- **Icons:** Lucide React for consistent iconography
- **Animation:** Tailwind transitions + Framer Motion for complex animations
- **Testing:** Jest + React Testing Library + Storybook

### 1.3 Design Tokens

```typescript
// design-tokens.ts
export const designTokens = {
  colors: {
    // Brand Colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',  // Main brand color
      600: '#2563eb',
      900: '#1e3a8a'
    },
    
    // Game Status Colors
    success: {
      50: '#f0fdf4',
      500: '#22c55e',  // Correct move, game won
      600: '#16a34a'
    },
    
    error: {
      50: '#fef2f2',
      500: '#ef4444',  // Wrong move, error state
      600: '#dc2626'
    },
    
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',  // Hint, warning
      600: '#d97706'
    },
    
    // Competitive Colors
    competitive: {
      gold: '#ffd700',    // 1st place
      silver: '#c0c0c0',  // 2nd place
      bronze: '#cd7f32'   // 3rd place
    },
    
    // Difficulty Colors
    difficulty: {
      easy: '#22c55e',
      medium: '#f59e0b',
      hard: '#ef4444',
      expert: '#8b5cf6'
    }
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem'    // 48px
  },
  
  typography: {
    fonts: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace']
    },
    
    sizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem' // 30px
    }
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  }
};
```

## 2. Core UI Components

### 2.1 Button Component

```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
```

### 2.2 Input Component

```typescript
// components/ui/Input.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:ring-green-500'
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, label, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          className={cn(
            inputVariants({ 
              variant: error ? 'error' : variant, 
              size, 
              className 
            })
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-muted-foreground'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input, inputVariants };
```

## 3. Game-Specific Components

### 3.1 Sudoku Grid Component

```typescript
// components/game/SudokuGrid.tsx
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SudokuGridProps {
  initialGrid: number[][];
  currentGrid: number[][];
  solution?: number[][];
  readOnly?: boolean;
  showErrors?: boolean;
  highlightCell?: { row: number; col: number };
  onCellChange?: (row: number, col: number, value: number) => void;
  onCellSelect?: (row: number, col: number) => void;
  className?: string;
}

interface CellProps {
  value: number;
  isInitial: boolean;
  isError: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  onChange: (value: number) => void;
  onSelect: () => void;
  readOnly: boolean;
}

const SudokuCell = ({ 
  value, 
  isInitial, 
  isError, 
  isHighlighted, 
  isSelected,
  onChange, 
  onSelect, 
  readOnly 
}: CellProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly || isInitial) return;
    
    const key = e.key;
    if (key >= '1' && key <= '9') {
      onChange(parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      onChange(0);
    }
  };

  return (
    <button
      className={cn(
        'w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10',
        'hover:bg-gray-50',
        {
          'bg-gray-100 text-gray-800 cursor-default': isInitial,
          'bg-white cursor-pointer': !isInitial && !readOnly,
          'bg-red-50 border-red-300 text-red-600': isError,
          'bg-blue-50 border-blue-300': isHighlighted,
          'ring-2 ring-blue-500 bg-blue-100': isSelected,
          'cursor-not-allowed opacity-50': readOnly
        }
      )}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      disabled={readOnly}
      tabIndex={readOnly ? -1 : 0}
    >
      {value !== 0 ? value : ''}
    </button>
  );
};

export const SudokuGrid = ({
  initialGrid,
  currentGrid,
  solution,
  readOnly = false,
  showErrors = false,
  highlightCell,
  onCellChange,
  onCellSelect,
  className
}: SudokuGridProps) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellSelect = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
    onCellSelect?.(row, col);
  }, [onCellSelect]);

  const handleCellChange = useCallback((row: number, col: number, value: number) => {
    onCellChange?.(row, col, value);
  }, [onCellChange]);

  const isError = (row: number, col: number, value: number): boolean => {
    if (!showErrors || !solution || value === 0) return false;
    return solution[row][col] !== value;
  };

  return (
    <div className={cn('inline-block bg-black p-1', className)}>
      <div className="grid grid-cols-9 gap-0">
        {currentGrid.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            const isHighlighted = highlightCell?.row === rowIndex && highlightCell?.col === colIndex;
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const hasError = isError(rowIndex, colIndex, cellValue);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  'relative',
                  {
                    // Add thicker borders for 3x3 box separation
                    'border-r-2 border-black': (colIndex + 1) % 3 === 0 && colIndex !== 8,
                    'border-b-2 border-black': (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                  }
                )}
              >
                <SudokuCell
                  value={cellValue}
                  isInitial={isInitial}
                  isError={hasError}
                  isHighlighted={isHighlighted}
                  isSelected={isSelected}
                  onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                  onSelect={() => handleCellSelect(rowIndex, colIndex)}
                  readOnly={readOnly}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
```

### 3.2 Game Status Component

```typescript
// components/game/GameStatus.tsx
import { Clock, Users, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  gameType: 'competitive' | 'collaborative' | 'practice' | 'tournament';
  status: 'waiting' | 'active' | 'paused' | 'completed';
  timeRemaining?: number;
  playerCount: number;
  maxPlayers: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  currentPlayer?: string;
  winners?: string[];
  className?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    hard: 'text-red-600 bg-red-50',
    expert: 'text-purple-600 bg-purple-50'
  };
  return colors[difficulty as keyof typeof colors] || colors.medium;
};

const getStatusColor = (status: string) => {
  const colors = {
    waiting: 'text-yellow-600 bg-yellow-50',
    active: 'text-green-600 bg-green-50',
    paused: 'text-gray-600 bg-gray-50',
    completed: 'text-blue-600 bg-blue-50'
  };
  return colors[status as keyof typeof colors] || colors.waiting;
};

export const GameStatus = ({
  gameType,
  status,
  timeRemaining,
  playerCount,
  maxPlayers,
  difficulty,
  currentPlayer,
  winners,
  className
}: GameStatusProps) => {
  return (
    <div className={cn('bg-white rounded-lg border p-4 space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {gameType === 'tournament' && <Trophy className="w-5 h-5 text-yellow-500" />}
          {gameType === 'competitive' && <Target className="w-5 h-5 text-red-500" />}
          <h3 className="font-semibold capitalize">
            {gameType} Game
          </h3>
        </div>
        
        <div className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          getStatusColor(status)
        )}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>

      {/* Game Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span>{playerCount}/{maxPlayers} Players</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={cn(
            'px-2 py-1 rounded text-xs font-medium',
            getDifficultyColor(difficulty)
          )}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        </div>
      </div>

      {/* Timer */}
      {timeRemaining !== undefined && (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className={cn(
            'font-mono text-lg',
            timeRemaining < 60 ? 'text-red-600' : 'text-gray-900'
          )}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}

      {/* Current Player (for turn-based modes) */}
      {currentPlayer && status === 'active' && (
        <div className="text-sm text-gray-600">
          Current turn: <span className="font-medium">{currentPlayer}</span>
        </div>
      )}

      {/* Winners */}
      {winners && winners.length > 0 && status === 'completed' && (
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Results:</h4>
          <div className="space-y-1">
            {winners.map((winner, index) => (
              <div key={winner} className="flex items-center space-x-2 text-sm">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  index === 2 ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                )}>
                  {index + 1}
                </div>
                <span>{winner}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### 3.3 Player List Component

```typescript
// components/game/PlayerList.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown, Eye, CheckCircle, Clock, X } from 'lucide-react';

interface Player {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  rating: number;
  status: 'joined' | 'ready' | 'playing' | 'completed' | 'disconnected';
  role: 'player' | 'spectator';
  isHost?: boolean;
  moveCount?: number;
  errorCount?: number;
  completionTime?: number;
  isWinner?: boolean;
}

interface PlayerListProps {
  players: Player[];
  currentUserId?: string;
  showStats?: boolean;
  className?: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'playing': return <Clock className="w-4 h-4 text-blue-500" />;
    case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'disconnected': return <X className="w-4 h-4 text-red-500" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  const colors = {
    joined: 'bg-gray-100 text-gray-800',
    ready: 'bg-green-100 text-green-800',
    playing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    disconnected: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || colors.joined;
};

export const PlayerList = ({ 
  players, 
  currentUserId, 
  showStats = false, 
  className 
}: PlayerListProps) => {
  const activePlayers = players.filter(p => p.role === 'player');
  const spectators = players.filter(p => p.role === 'spectator');

  return (
    <div className={cn('space-y-4', className)}>
      {/* Active Players */}
      {activePlayers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Players ({activePlayers.length})
          </h3>
          <div className="space-y-2">
            {activePlayers.map((player) => (
              <div
                key={player.id}
                className={cn(
                  'flex items-center space-x-3 p-2 rounded-lg border',
                  player.id === currentUserId ? 'bg-blue-50 border-blue-200' : 'bg-white',
                  player.isWinner ? 'ring-2 ring-yellow-400' : ''
                )}
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>
                      {player.displayName?.[0] || player.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {player.isHost && (
                    <Crown className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {player.displayName || player.username}
                    </p>
                    {player.id === currentUserId && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                    {player.isWinner && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Rating: {player.rating}</span>
                    {showStats && player.moveCount !== undefined && (
                      <>
                        <span>•</span>
                        <span>Moves: {player.moveCount}</span>
                      </>
                    )}
                    {showStats && player.errorCount !== undefined && player.errorCount > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-red-500">Errors: {player.errorCount}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(player.status)}
                  <Badge className={cn('text-xs', getStatusColor(player.status))}>
                    {player.status}
                  </Badge>
                </div>

                {showStats && player.completionTime && (
                  <div className="text-xs text-gray-500 text-right">
                    {Math.floor(player.completionTime / 60)}:
                    {(player.completionTime % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spectators */}
      {spectators.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            Spectators ({spectators.length})
          </h3>
          <div className="space-y-1">
            {spectators.map((spectator) => (
              <div
                key={spectator.id}
                className="flex items-center space-x-2 px-2 py-1 text-sm text-gray-600"
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src={spectator.avatar} />
                  <AvatarFallback className="text-xs">
                    {spectator.displayName?.[0] || spectator.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {spectator.displayName || spectator.username}
                </span>
                {spectator.id === currentUserId && (
                  <Badge variant="outline" className="text-xs">You</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### 3.4 Tournament Bracket Component

```typescript
// components/tournament/TournamentBracket.tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Trophy, Clock, CheckCircle } from 'lucide-react';

interface Match {
  id: string;
  round: number;
  matchNumber: number;
  player1?: {
    id: string;
    username: string;
    seed?: number;
  };
  player2?: {
    id: string;
    username: string;
    seed?: number;
  };
  winner?: {
    id: string;
    username: string;
  };
  status: 'upcoming' | 'active' | 'completed';
  scheduledAt?: string;
  gameId?: string;
}

interface TournamentBracketProps {
  matches: Match[];
  format: 'single_elimination' | 'double_elimination' | 'round_robin';
  currentRound: number;
  totalRounds: number;
  onMatchClick?: (match: Match) => void;
  className?: string;
}

const MatchCard = ({ 
  match, 
  onClick, 
  isCurrentRound 
}: { 
  match: Match; 
  onClick?: (match: Match) => void;
  isCurrentRound: boolean;
}) => {
  const getStatusIcon = () => {
    switch (match.status) {
      case 'active': return <Clock className="w-3 h-3 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (match.status) {
      case 'active': return 'border-blue-300 bg-blue-50';
      case 'completed': return 'border-green-300 bg-green-50';
      case 'upcoming': return isCurrentRound ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md',
        getStatusColor(),
        onClick && 'hover:scale-105'
      )}
      onClick={() => onClick?.(match)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          Match {match.matchNumber}
        </span>
        <div className="flex items-center space-x-1">
          {getStatusIcon()}
          <Badge variant="outline" className="text-xs">
            {match.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        {/* Player 1 */}
        <div className={cn(
          'flex items-center justify-between p-2 rounded border',
          match.winner?.id === match.player1?.id ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'
        )}>
          <div className="flex items-center space-x-2">
            {match.player1?.seed && (
              <span className="text-xs bg-gray-100 rounded px-1">
                #{match.player1.seed}
              </span>
            )}
            <span className="text-sm font-medium">
              {match.player1?.username || 'TBD'}
            </span>
          </div>
          {match.winner?.id === match.player1?.id && (
            <Trophy className="w-4 h-4 text-yellow-500" />
          )}
        </div>

        {/* VS Divider */}
        <div className="text-center text-xs text-gray-400 font-medium">VS</div>

        {/* Player 2 */}
        <div className={cn(
          'flex items-center justify-between p-2 rounded border',
          match.winner?.id === match.player2?.id ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'
        )}>
          <div className="flex items-center space-x-2">
            {match.player2?.seed && (
              <span className="text-xs bg-gray-100 rounded px-1">
                #{match.player2.seed}
              </span>
            )}
            <span className="text-sm font-medium">
              {match.player2?.username || 'TBD'}
            </span>
          </div>
          {match.winner?.id === match.player2?.id && (
            <Trophy className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      </div>

      {match.scheduledAt && (
        <div className="mt-2 text-xs text-gray-500">
          {new Date(match.scheduledAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export const TournamentBracket = ({
  matches,
  format,
  currentRound,
  totalRounds,
  onMatchClick,
  className
}: TournamentBracketProps) => {
  const [selectedRound, setSelectedRound] = useState(currentRound);

  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);

  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);
  const roundMatches = matchesByRound[selectedRound] || [];

  const getRoundName = (round: number) => {
    if (format === 'single_elimination') {
      if (round === totalRounds) return 'Final';
      if (round === totalRounds - 1) return 'Semifinal';
      if (round === totalRounds - 2) return 'Quarterfinal';
      return `Round ${round}`;
    }
    return `Round ${round}`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Round Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedRound(Math.max(1, selectedRound - 1))}
            disabled={selectedRound <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h3 className="text-lg font-semibold">
            {getRoundName(selectedRound)}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedRound(Math.min(totalRounds, selectedRound + 1))}
            disabled={selectedRound >= totalRounds}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex space-x-1">
          {rounds.map((round) => (
            <Button
              key={round}
              variant={round === selectedRound ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRound(round)}
              className="text-xs"
            >
              {round}
            </Button>
          ))}
        </div>
      </div>

      {/* Round Progress */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Progress:</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          />
        </div>
        <span>{currentRound}/{totalRounds}</span>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roundMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onClick={onMatchClick}
            isCurrentRound={selectedRound === currentRound}
          />
        ))}
      </div>

      {roundMatches.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No matches in this round yet.
        </div>
      )}
    </div>
  );
};
```

## 4. Layout Components

### 4.1 Game Layout Component

```typescript
// components/layout/GameLayout.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Settings, Users, MessageCircle } from 'lucide-react';

interface GameLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  chat?: ReactNode;
  gameStatus?: ReactNode;
  showSidebar?: boolean;
  showChat?: boolean;
  onToggleSidebar?: () => void;
  onToggleChat?: () => void;
  onLeaveGame?: () => void;
  className?: string;
}

export const GameLayout = ({
  children,
  sidebar,
  chat,
  gameStatus,
  showSidebar = true,
  showChat = true,
  onToggleSidebar,
  onToggleChat,
  onLeaveGame,
  className
}: GameLayoutProps) => {
  return (
    <div className={cn('h-screen flex flex-col', className)}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onLeaveGame}>
              <Home className="w-4 h-4 mr-2" />
              Leave Game
            </Button>
            
            <div className="hidden md:block">
              {gameStatus}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden"
            >
              <Users className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleChat}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Game Status */}
        <div className="md:hidden mt-3">
          {gameStatus}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <aside className={cn(
            'w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto',
            'absolute md:relative inset-y-0 left-0 z-30 md:z-auto',
            'transform md:transform-none transition-transform duration-300',
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          )}>
            <div className="p-4">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Game Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
          {children}
        </main>

        {/* Chat Panel */}
        {showChat && (
          <aside className={cn(
            'w-80 bg-white border-l border-gray-200',
            'absolute md:relative inset-y-0 right-0 z-30 md:z-auto',
            'transform md:transform-none transition-transform duration-300',
            showChat ? 'translate-x-0' : 'translate-x-full'
          )}>
            {chat}
          </aside>
        )}
      </div>

      {/* Mobile Overlay */}
      {(showSidebar || showChat) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => {
            onToggleSidebar?.();
            onToggleChat?.();
          }}
        />
      )}
    </div>
  );
};
```

### 4.2 Dashboard Layout Component

```typescript
// components/layout/DashboardLayout.tsx
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Trophy, 
  Users, 
  Settings, 
  Menu, 
  X,
  GameController2,
  BarChart3,
  Bell
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    username: string;
    displayName?: string;
    avatar?: string;
    rating: number;
  };
  className?: string;
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: GameController2, label: 'Play', href: '/play' },
  { icon: Trophy, label: 'Tournaments', href: '/tournaments' },
  { icon: Users, label: 'Friends', href: '/friends' },
  { icon: BarChart3, label: 'Statistics', href: '/stats' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

export const DashboardLayout = ({ 
  children, 
  user, 
  className 
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn('h-screen flex', className)}>
      {/* Sidebar */}
      <aside className={cn(
        'w-64 bg-gray-900 text-white',
        'absolute md:relative inset-y-0 left-0 z-50 md:z-auto',
        'transform md:transform-none transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">Sudokru</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          {user && (
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.displayName?.[0] || user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.displayName || user.username}
                  </p>
                  <p className="text-xs text-gray-400">
                    Rating: {user.rating}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
```

## 5. Component Usage Guidelines

### 5.1 Component Composition Patterns

```typescript
// Example: Game Page Component Composition
export const GamePage = ({ gameId }: { gameId: string }) => {
  const { game, players, gameState } = useGame(gameId);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChat, setShowChat] = useState(true);

  return (
    <GameLayout
      gameStatus={
        <GameStatus
          gameType={game.type}
          status={game.status}
          timeRemaining={gameState.timeRemaining}
          playerCount={players.length}
          maxPlayers={game.maxPlayers}
          difficulty={game.difficulty}
        />
      }
      sidebar={
        <PlayerList
          players={players}
          currentUserId={currentUser.id}
          showStats={game.status === 'completed'}
        />
      }
      chat={<GameChat gameId={gameId} />}
      showSidebar={showSidebar}
      showChat={showChat}
      onToggleSidebar={() => setShowSidebar(!showSidebar)}
      onToggleChat={() => setShowChat(!showChat)}
    >
      <SudokuGrid
        initialGrid={game.puzzle.initialGrid}
        currentGrid={gameState.grid}
        solution={game.puzzle.solution}
        readOnly={game.status !== 'active'}
        showErrors={true}
        onCellChange={handleCellChange}
      />
    </GameLayout>
  );
};
```

### 5.2 Responsive Design Guidelines

```css
/* Mobile-first responsive utilities */
.game-grid {
  @apply w-full max-w-sm mx-auto;
}

@screen md {
  .game-grid {
    @apply max-w-md;
  }
}

@screen lg {
  .game-grid {
    @apply max-w-lg;
  }
}

/* Touch-friendly sizing for mobile */
.sudoku-cell {
  @apply min-h-[2.5rem] min-w-[2.5rem];
}

@screen md {
  .sudoku-cell {
    @apply min-h-[3rem] min-w-[3rem];
  }
}
```

### 5.3 Accessibility Guidelines

- All interactive components support keyboard navigation
- Color-only information is supplemented with icons or text
- Focus indicators are clearly visible
- Screen reader announcements for game state changes
- High contrast mode support
- Minimum touch target size of 44px on mobile

### 5.4 Performance Optimization

```typescript
// Component memoization for expensive renders
export const SudokuGrid = memo(({ 
  initialGrid, 
  currentGrid, 
  onCellChange 
}: SudokuGridProps) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison for grid arrays
  return JSON.stringify(prevProps.currentGrid) === JSON.stringify(nextProps.currentGrid);
});

// Lazy loading for large components
const TournamentBracket = lazy(() => import('./TournamentBracket'));

// Use callback memoization for event handlers
const handleCellChange = useCallback((row: number, col: number, value: number) => {
  // Handle cell change
}, [gameId, playerId]);
```

This comprehensive component library provides all the building blocks needed for Sudokru's gaming interface, with proper TypeScript support, accessibility features, and responsive design patterns.