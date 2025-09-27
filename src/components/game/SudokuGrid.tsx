// SudokuGrid component following the documented design
'use client';

import { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { GAME_CONFIG } from '@/lib/constants';

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
  row: number;
  col: number;
}

const SudokuCell = memo(({
  value,
  isInitial,
  isError,
  isHighlighted,
  isSelected,
  onChange,
  onSelect,
  readOnly,
  row,
  col
}: CellProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly || isInitial) return;

    const key = e.key;
    if (key >= '1' && key <= '9') {
      e.preventDefault();
      onChange(parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      e.preventDefault();
      onChange(0);
    } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      // Handle arrow key navigation
      e.preventDefault();
      // This could be enhanced to move focus to adjacent cells
    }
  };

  const handleClick = () => {
    if (!readOnly) {
      onSelect();
    }
  };

  return (
    <button
      className={cn(
        'w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10',
        'hover:bg-gray-50 relative',
        'md:w-12 md:h-12 md:text-xl', // Larger on desktop
        {
          'bg-gray-100 text-gray-800 cursor-default font-bold': isInitial,
          'bg-white cursor-pointer': !isInitial && !readOnly,
          'bg-red-50 border-red-300 text-red-600': isError,
          'bg-blue-50 border-blue-300': isHighlighted,
          'ring-2 ring-blue-500 bg-blue-100': isSelected,
          'cursor-not-allowed opacity-50': readOnly,
          // Add thicker borders for 3x3 box separation
          'border-r-2 border-gray-800': (col + 1) % 3 === 0 && col !== 8,
          'border-b-2 border-gray-800': (row + 1) % 3 === 0 && row !== 8,
        }
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={readOnly}
      tabIndex={readOnly ? -1 : 0}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ', empty'}`}
    >
      {value !== 0 ? value : ''}
    </button>
  );
});

SudokuCell.displayName = 'SudokuCell';

export const SudokuGrid = memo(({
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

  // Validate grid dimensions
  if (currentGrid.length !== GAME_CONFIG.GRID_SIZE ||
      currentGrid.some(row => row.length !== GAME_CONFIG.GRID_SIZE)) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-500">Invalid grid dimensions</p>
      </div>
    );
  }

  return (
    <div className={cn('inline-block bg-gray-800 p-1 rounded-lg shadow-lg', className)}>
      <div
        className="grid grid-cols-9 gap-0 bg-white rounded"
        role="grid"
        aria-label="Sudoku puzzle grid"
      >
        {currentGrid.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            const isHighlighted = highlightCell?.row === rowIndex && highlightCell?.col === colIndex;
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const hasError = isError(rowIndex, colIndex, cellValue);

            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                isInitial={isInitial}
                isError={hasError}
                isHighlighted={isHighlighted}
                isSelected={isSelected}
                onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                onSelect={() => handleCellSelect(rowIndex, colIndex)}
                readOnly={readOnly}
                row={rowIndex}
                col={colIndex}
              />
            );
          })
        )}
      </div>

      {/* Number input helpers for mobile */}
      <div className="mt-4 grid grid-cols-9 gap-1 md:hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="w-8 h-8 bg-gray-100 border border-gray-300 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
            onClick={() => {
              if (selectedCell && !readOnly) {
                handleCellChange(selectedCell.row, selectedCell.col, num);
              }
            }}
            disabled={!selectedCell || readOnly}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
});

SudokuGrid.displayName = 'SudokuGrid';