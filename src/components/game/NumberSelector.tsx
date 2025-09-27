// NumberSelector - Floating number selection widget
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Eraser, Edit3, X } from 'lucide-react';

interface NumberSelectorProps {
  isVisible: boolean;
  position: { x: number; y: number };
  selectedCell: { row: number; col: number } | null;
  currentValue?: number;
  candidateNumbers?: Set<number>;
  onNumberSelect: (number: number) => void;
  onClear: () => void;
  onClose: () => void;
  className?: string;
}

type SelectionMode = 'number' | 'notes';

export const NumberSelector = ({
  isVisible,
  position,
  selectedCell,
  currentValue,
  candidateNumbers = new Set(),
  onNumberSelect,
  onClear,
  onClose,
  className
}: NumberSelectorProps) => {
  const [mode, setMode] = useState<SelectionMode>('number');
  const [localCandidates, setLocalCandidates] = useState<Set<number>>(candidateNumbers);

  // Update local candidates when props change
  useEffect(() => {
    setLocalCandidates(candidateNumbers);
  }, [candidateNumbers]);

  // Reset mode when cell changes
  useEffect(() => {
    if (selectedCell) {
      setMode('number');
    }
  }, [selectedCell]);

  const handleNumberClick = (number: number) => {
    if (mode === 'number') {
      onNumberSelect(number);
    } else {
      // Toggle candidate number
      const newCandidates = new Set(localCandidates);
      if (newCandidates.has(number)) {
        newCandidates.delete(number);
      } else {
        newCandidates.add(number);
      }
      setLocalCandidates(newCandidates);
      // In a real implementation, this would call a candidate update function
    }
  };

  const handleModeToggle = () => {
    setMode(prev => prev === 'number' ? 'notes' : 'number');
  };

  if (!isVisible || !selectedCell) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed z-50 select-none',
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Card className="p-3 shadow-xl border-2 border-blue-200 bg-white/95 backdrop-blur-sm animate-in zoom-in-95 duration-200">
        {/* Header with mode toggle and close */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Button
              variant={mode === 'number' ? 'default' : 'outline'}
              size="sm"
              onClick={handleModeToggle}
              className={cn(
                'h-8 px-3 text-xs font-medium transition-all duration-200',
                mode === 'number'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              )}
            >
              <span className="mr-1">123</span>
              Number
            </Button>
            <Button
              variant={mode === 'notes' ? 'default' : 'outline'}
              size="sm"
              onClick={handleModeToggle}
              className={cn(
                'h-8 px-3 text-xs font-medium transition-all duration-200',
                mode === 'notes'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'text-purple-600 hover:bg-purple-50'
              )}
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Notes
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Current cell info */}
        <div className="text-xs text-gray-500 mb-3 text-center">
          Cell ({selectedCell.row + 1}, {selectedCell.col + 1})
          {currentValue && (
            <span className="ml-2 font-medium text-blue-600">
              Current: {currentValue}
            </span>
          )}
        </div>

        {/* Number grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <NumberButton
              key={number}
              number={number}
              mode={mode}
              isSelected={currentValue === number}
              isCandidate={localCandidates.has(number)}
              onClick={() => handleNumberClick(number)}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Eraser className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        {/* Candidate numbers display (when in notes mode) */}
        {mode === 'notes' && localCandidates.size > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Active candidates:</div>
            <div className="flex flex-wrap gap-1">
              {Array.from(localCandidates).sort().map((num) => (
                <span
                  key={num}
                  className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-purple-100 text-purple-700 rounded"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// Individual number button component
interface NumberButtonProps {
  number: number;
  mode: SelectionMode;
  isSelected: boolean;
  isCandidate: boolean;
  onClick: () => void;
}

const NumberButton = ({
  number,
  mode,
  isSelected,
  isCandidate,
  onClick
}: NumberButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        'w-12 h-12 p-0 text-lg font-semibold transition-all duration-200 relative',
        'hover:scale-105 active:scale-95',
        // Number mode styling
        mode === 'number' && [
          'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
          isSelected && 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
        ],
        // Notes mode styling
        mode === 'notes' && [
          'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
          isCandidate && 'bg-purple-100 border-purple-400 text-purple-700'
        ]
      )}
    >
      <span className="relative z-10">{number}</span>

      {/* Candidate indicator dot */}
      {mode === 'number' && isCandidate && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full" />
      )}

      {/* Selection indicator */}
      {isSelected && mode === 'number' && (
        <div className="absolute inset-0 bg-blue-500/20 rounded-md" />
      )}
    </Button>
  );
};