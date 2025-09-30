// Number availability tracker - shows remaining count for each number
'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberTrackerProps {
  currentGrid: number[][];
  onNumberSelect?: (number: number) => void;
  selectedNumber?: number | null;
  className?: string;
}

export function NumberTracker({
  currentGrid,
  onNumberSelect,
  selectedNumber,
  className
}: NumberTrackerProps) {
  // Count how many times each number appears in the grid
  const getNumberCount = (num: number): number => {
    let count = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentGrid[row][col] === num) {
          count++;
        }
      }
    }
    return count;
  };

  const getColorClass = (remaining: number): string => {
    if (remaining === 0) return 'text-slate-400';
    if (remaining <= 3) return 'text-orange-600';
    if (remaining <= 6) return 'text-blue-600';
    return 'text-emerald-600';
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
        const count = getNumberCount(num);
        const remaining = 9 - count;
        const isComplete = remaining === 0;
        const isSelected = selectedNumber === num;

        return (
          <button
            key={num}
            onClick={() => onNumberSelect?.(num)}
            disabled={isComplete}
            className={cn(
              'relative flex flex-col items-center justify-center',
              'w-10 h-12 rounded-lg border-2 transition-all duration-200',
              'hover:shadow-md active:scale-95',
              isComplete && 'opacity-50 cursor-not-allowed bg-slate-50',
              !isComplete && 'hover:border-blue-400 bg-white',
              isSelected && !isComplete && 'border-blue-500 bg-blue-50 shadow-sm',
              !isSelected && !isComplete && 'border-slate-200'
            )}
            aria-label={`Number ${num}: ${remaining} remaining`}
          >
            {/* Number */}
            <span className={cn(
              'font-mono font-bold text-lg leading-none',
              isComplete ? 'text-slate-400' : 'text-slate-700'
            )}>
              {num}
            </span>

            {/* Remaining count or checkmark */}
            <div className="mt-0.5">
              {isComplete ? (
                <Check className="w-3 h-3 text-emerald-500" />
              ) : (
                <span className={cn(
                  'text-xs font-semibold',
                  getColorClass(remaining)
                )}>
                  {remaining}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}