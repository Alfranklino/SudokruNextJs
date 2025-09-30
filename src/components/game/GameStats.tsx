// Compact game statistics display
'use client';

import { Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameStatsProps {
  elapsedTime: number;
  moveCount: number;
  errorCount: number;
  className?: string;
}

export function GameStats({
  elapsedTime,
  moveCount,
  errorCount,
  className
}: GameStatsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      'flex items-center justify-center gap-6 text-sm',
      className
    )}>
      {/* Timer */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-600" />
        <span className="font-mono font-semibold text-slate-700">
          {formatTime(elapsedTime)}
        </span>
      </div>

      {/* Moves */}
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-blue-600" />
        <span className="text-slate-600">Moves:</span>
        <span className="font-semibold text-slate-900">{moveCount}</span>
      </div>

      {/* Errors */}
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span className="text-slate-600">Errors:</span>
        <span className="font-semibold text-red-600">{errorCount}</span>
      </div>
    </div>
  );
}