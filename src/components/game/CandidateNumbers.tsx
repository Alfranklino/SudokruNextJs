// CandidateNumbers - Display system for candidate numbers in sudoku cells
'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface CandidateNumbersProps {
  candidates: Set<number>;
  cellSize?: 'small' | 'medium' | 'large';
  className?: string;
}

// Position mapping for 3x3 grid layout
// 1 2 3
// 4 5 6
// 7 8 9
const CANDIDATE_POSITIONS = {
  1: { row: 0, col: 0 }, // top-left
  2: { row: 0, col: 1 }, // top-center
  3: { row: 0, col: 2 }, // top-right
  4: { row: 1, col: 0 }, // middle-left
  5: { row: 1, col: 1 }, // middle-center
  6: { row: 1, col: 2 }, // middle-right
  7: { row: 2, col: 0 }, // bottom-left
  8: { row: 2, col: 1 }, // bottom-center
  9: { row: 2, col: 2 }, // bottom-right
} as const;

export const CandidateNumbers = memo(({
  candidates,
  cellSize = 'medium',
  className
}: CandidateNumbersProps) => {
  if (candidates.size === 0) {
    return null;
  }

  // Size configurations for different cell dimensions
  const sizeConfig = {
    small: {
      containerSize: 'w-8 h-8', // For mobile/small screens
      fontSize: 'text-[6px]',
      gap: 'gap-[1px]',
      padding: 'p-[1px]'
    },
    medium: {
      containerSize: 'w-10 h-10 md:w-12 md:h-12', // Standard size
      fontSize: 'text-[7px] md:text-[8px]',
      gap: 'gap-[1px] md:gap-[2px]',
      padding: 'p-[2px]'
    },
    large: {
      containerSize: 'w-12 h-12 md:w-14 md:h-14', // For larger displays
      fontSize: 'text-[8px] md:text-[9px]',
      gap: 'gap-[2px]',
      padding: 'p-[2px] md:p-[3px]'
    }
  };

  const config = sizeConfig[cellSize];

  return (
    <div
      className={cn(
        'absolute inset-0 grid grid-cols-3 grid-rows-3',
        config.containerSize,
        config.gap,
        config.padding,
        'pointer-events-none', // Allow clicks to pass through to cell
        className
      )}
      aria-label={`Candidate numbers: ${Array.from(candidates).sort().join(', ')}`}
    >
      {/* Render all 9 positions */}
      {Array.from({ length: 9 }, (_, index) => {
        const number = index + 1;
        const isCandidate = candidates.has(number);
        const position = CANDIDATE_POSITIONS[number as keyof typeof CANDIDATE_POSITIONS];

        return (
          <div
            key={number}
            className={cn(
              'flex items-center justify-center relative',
              'transition-all duration-200',
              config.fontSize,
              {
                // Active candidate styling
                'text-purple-600 font-medium opacity-90': isCandidate,
                // Inactive position styling
                'text-transparent': !isCandidate,
              }
            )}
            style={{
              gridRow: position.row + 1,
              gridColumn: position.col + 1,
            }}
          >
            {isCandidate && (
              <>
                {/* Number display */}
                <span className="relative z-10 select-none font-mono">
                  {number}
                </span>

                {/* Subtle background indicator */}
                <div className="absolute inset-0 bg-purple-50 rounded-[1px] opacity-60 -z-10" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
});

CandidateNumbers.displayName = 'CandidateNumbers';

// Enhanced candidate display with visual state indicators
interface CandidateDisplayProps extends CandidateNumbersProps {
  showBackground?: boolean;
  highlightMode?: boolean;
}

export const CandidateDisplay = memo(({
  candidates,
  cellSize = 'medium',
  showBackground = true,
  highlightMode = false,
  className
}: CandidateDisplayProps) => {
  if (candidates.size === 0) {
    return null;
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Background indicator for cells with candidates */}
      {showBackground && (
        <div
          className={cn(
            'absolute inset-0 rounded-sm transition-all duration-200',
            highlightMode
              ? 'bg-purple-100 border border-purple-200'
              : 'bg-gray-50 border border-gray-100'
          )}
        />
      )}

      {/* Candidate numbers grid */}
      <CandidateNumbers
        candidates={candidates}
        cellSize={cellSize}
        className="relative z-10"
      />

      {/* Count indicator for many candidates */}
      {candidates.size >= 6 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 text-white text-[6px] rounded-full flex items-center justify-center font-bold z-20">
          {candidates.size}
        </div>
      )}
    </div>
  );
});

CandidateDisplay.displayName = 'CandidateDisplay';

// Utility component for managing candidate state
interface CandidateManagerProps {
  candidates: Set<number>;
  onToggleCandidate: (number: number) => void;
  cellSize?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  className?: string;
}

export const CandidateManager = memo(({
  candidates,
  onToggleCandidate,
  cellSize = 'medium',
  interactive = false,
  className
}: CandidateManagerProps) => {
  const handleCandidateClick = (number: number, event: React.MouseEvent) => {
    if (interactive) {
      event.stopPropagation();
      onToggleCandidate(number);
    }
  };

  return (
    <div className={cn('relative w-full h-full', className)}>
      <div
        className={cn(
          'absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[1px] p-[2px]',
          interactive ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {Array.from({ length: 9 }, (_, index) => {
          const number = index + 1;
          const isCandidate = candidates.has(number);
          const position = CANDIDATE_POSITIONS[number as keyof typeof CANDIDATE_POSITIONS];

          return (
            <button
              key={number}
              className={cn(
                'flex items-center justify-center text-[8px] font-mono transition-all duration-150',
                'rounded-[1px] relative',
                {
                  // Interactive candidate styling
                  'text-purple-600 bg-purple-50 hover:bg-purple-100 font-medium':
                    isCandidate && interactive,
                  // Non-interactive candidate styling
                  'text-purple-600 bg-purple-50 font-medium':
                    isCandidate && !interactive,
                  // Empty position styling
                  'text-transparent': !isCandidate,
                  // Interactive empty position
                  'hover:bg-gray-100 hover:text-gray-400':
                    !isCandidate && interactive,
                }
              )}
              style={{
                gridRow: position.row + 1,
                gridColumn: position.col + 1,
              }}
              onClick={(e) => handleCandidateClick(number, e)}
              disabled={!interactive}
              tabIndex={interactive ? 0 : -1}
              aria-label={`${isCandidate ? 'Remove' : 'Add'} candidate ${number}`}
            >
              {(isCandidate || interactive) && number}
            </button>
          );
        })}
      </div>
    </div>
  );
});

CandidateManager.displayName = 'CandidateManager';