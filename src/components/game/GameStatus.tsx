// GameStatus component following the documented design
'use client';

import { Clock, Users, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { GameType, GameStatus as GameStatusType, Difficulty } from '@/types/game';

interface GameStatusProps {
  gameType: GameType;
  status: GameStatusType;
  timeRemaining?: number;
  playerCount: number;
  maxPlayers: number;
  difficulty: Difficulty;
  currentPlayer?: string;
  winners?: string[];
  className?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getDifficultyColor = (difficulty: Difficulty) => {
  const colors = {
    easy: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    hard: 'text-red-600 bg-red-50 border-red-200',
    expert: 'text-purple-600 bg-purple-50 border-purple-200'
  };
  return colors[difficulty];
};

const getStatusColor = (status: GameStatusType) => {
  const colors = {
    waiting: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    active: 'text-green-600 bg-green-50 border-green-200',
    paused: 'text-gray-600 bg-gray-50 border-gray-200',
    completed: 'text-blue-600 bg-blue-50 border-blue-200',
    abandoned: 'text-red-600 bg-red-50 border-red-200'
  };
  return colors[status] || colors.waiting;
};

const getGameTypeIcon = (gameType: GameType) => {
  switch (gameType) {
    case 'tournament':
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 'competitive':
      return <Target className="w-5 h-5 text-red-500" />;
    default:
      return <Users className="w-5 h-5 text-blue-500" />;
  }
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
    <Card className={cn('p-4 space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getGameTypeIcon(gameType)}
          <h3 className="font-semibold text-gray-900 capitalize">
            {gameType} Game
          </h3>
        </div>

        <Badge
          className={cn(
            'text-xs font-medium border',
            getStatusColor(status)
          )}
          variant="outline"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {/* Game Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">
            {playerCount}/{maxPlayers} Players
          </span>
        </div>

        <div className="flex items-center justify-end">
          <Badge
            className={cn(
              'text-xs font-medium border',
              getDifficultyColor(difficulty)
            )}
            variant="outline"
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Timer */}
      {timeRemaining !== undefined && (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className={cn(
            'font-mono text-lg font-semibold',
            timeRemaining < 60 ? 'text-red-600' : 'text-gray-900'
          )}>
            {formatTime(timeRemaining)}
          </span>
          {timeRemaining < 60 && (
            <span className="text-xs text-red-500 animate-pulse">
              Low time!
            </span>
          )}
        </div>
      )}

      {/* Current Player (for turn-based modes) */}
      {currentPlayer && status === 'active' && (
        <div className="text-sm">
          <span className="text-gray-600">Current turn: </span>
          <span className="font-medium text-blue-600">{currentPlayer}</span>
        </div>
      )}

      {/* Winners */}
      {winners && winners.length > 0 && status === 'completed' && (
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Results:</h4>
          <div className="space-y-1">
            {winners.slice(0, 3).map((winner, index) => (
              <div key={winner} className="flex items-center space-x-2 text-sm">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                )}>
                  {index + 1}
                </div>
                <span className="text-gray-700">{winner}</span>
                {index === 0 && (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            ))}
            {winners.length > 3 && (
              <div className="text-xs text-gray-500 mt-1">
                +{winners.length - 3} more players
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Message */}
      {status === 'waiting' && (
        <div className="text-xs text-gray-500 text-center py-2">
          Waiting for more players to join...
        </div>
      )}

      {status === 'paused' && (
        <div className="text-xs text-yellow-600 text-center py-2">
          Game is paused
        </div>
      )}
    </Card>
  );
};