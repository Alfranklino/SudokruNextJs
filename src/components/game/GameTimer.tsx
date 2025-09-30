// Game timer component for single player mode
'use client';

import { useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameTimerProps {
  mode: 'unlimited' | 'timed';
  elapsedTime: number; // in seconds
  duration?: number | null; // total duration in seconds (for timed mode)
  isRunning: boolean;
  onTimeUpdate: (seconds: number) => void;
  className?: string;
}

export function GameTimer({
  mode,
  elapsedTime,
  duration,
  isRunning,
  onTimeUpdate,
  className
}: GameTimerProps) {
  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      onTimeUpdate(elapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, elapsedTime, onTimeUpdate]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate remaining time for timed mode
  const remainingTime = mode === 'timed' && duration ? duration - elapsedTime : 0;
  const isWarning = mode === 'timed' && remainingTime > 0 && remainingTime <= 60; // Last minute
  const isCritical = mode === 'timed' && remainingTime > 0 && remainingTime <= 30; // Last 30 seconds
  const isExpired = mode === 'timed' && remainingTime <= 0;

  // Display time (elapsed for unlimited, remaining for timed)
  const displayTime = mode === 'unlimited' ? elapsedTime : Math.max(0, remainingTime);
  const formattedTime = formatTime(displayTime);

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300',
        isExpired && 'bg-red-50 border-red-300',
        isCritical && !isExpired && 'bg-red-50 border-red-400 animate-pulse',
        isWarning && !isCritical && !isExpired && 'bg-orange-50 border-orange-300',
        !isWarning && !isCritical && !isExpired && 'bg-slate-50 border-slate-200',
        className
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {(isWarning || isCritical || isExpired) ? (
          <AlertCircle className={cn(
            'w-5 h-5',
            isExpired && 'text-red-600',
            isCritical && !isExpired && 'text-red-500',
            isWarning && !isCritical && !isExpired && 'text-orange-500'
          )} />
        ) : (
          <Clock className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* Time display */}
      <div className="flex-1">
        <div className={cn(
          'text-2xl font-bold font-mono tracking-wider',
          isExpired && 'text-red-600',
          isCritical && !isExpired && 'text-red-600',
          isWarning && !isCritical && !isExpired && 'text-orange-600',
          !isWarning && !isCritical && !isExpired && 'text-slate-900'
        )}>
          {formattedTime}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">
          {mode === 'unlimited' && 'Elapsed Time'}
          {mode === 'timed' && !isExpired && 'Time Remaining'}
          {isExpired && 'Time\'s Up!'}
        </div>
      </div>

      {/* Timer mode badge */}
      <div className="flex-shrink-0">
        {mode === 'unlimited' ? (
          <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
            Unlimited
          </div>
        ) : (
          <div className={cn(
            'px-2 py-1 text-xs font-medium rounded',
            isExpired && 'bg-red-100 text-red-700',
            isCritical && !isExpired && 'bg-red-100 text-red-700',
            isWarning && !isCritical && !isExpired && 'bg-orange-100 text-orange-700',
            !isWarning && !isCritical && !isExpired && 'bg-green-100 text-green-700'
          )}>
            Timed
          </div>
        )}
      </div>
    </div>
  );
}