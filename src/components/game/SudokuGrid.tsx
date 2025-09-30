// SudokuGrid component following the documented design
'use client';

import { useState, useCallback, memo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GAME_CONFIG } from '@/lib/constants';
import { NumberSelector } from './NumberSelector';
import { CandidateNumbers } from './CandidateNumbers';
import { useCellFloatingPosition } from '@/hooks/useFloatingPosition';
import type { HighlightConfig } from '@/types/game-config';
import { DEFAULT_HIGHLIGHT_CONFIG } from '@/types/game-config';

interface SudokuGridProps {
  initialGrid: number[][];
  currentGrid: number[][];
  solution?: number[][];
  readOnly?: boolean;
  showErrors?: boolean;
  highlightCell?: { row: number; col: number };
  highlightConfig?: HighlightConfig;
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
  isRowColumnHighlighted: boolean;
  isSameNumberHighlighted: boolean;
  candidates: Set<number>;
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
  isRowColumnHighlighted,
  isSameNumberHighlighted,
  candidates,
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
    // Allow selection of any cell for highlighting purposes
    onSelect();
  };

  return (
    <button
      className={cn(
        'w-10 h-10 flex items-center justify-center text-lg font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10',
        'relative cursor-pointer',
        'border-[1px] border-solid border-gray-300',
        !isInitial && !readOnly && 'hover:bg-gray-50',
        'md:w-12 md:h-12 md:text-xl', // Larger on desktop
        {
          'bg-gray-100 text-gray-800 font-bold': isInitial,
          'bg-white': !isInitial && !readOnly && !isRowColumnHighlighted && !isSameNumberHighlighted && !isSelected && !isError,
          'bg-red-50 border-red-300 text-red-600': isError,
          'bg-blue-50 border-blue-300': isHighlighted,
          'ring-2 ring-blue-500 bg-blue-100': isSelected,
          'bg-blue-50': isRowColumnHighlighted && !isSelected && !isError && !isSameNumberHighlighted,
          'bg-purple-100': isSameNumberHighlighted && !isSelected && !isError,
          'cursor-not-allowed opacity-50': readOnly,
          // Thicker borders for 3x3 box separation (2px, dark gray)
          'border-r-[2px] border-r-gray-700': (col + 1) % 3 === 0 && col !== 8,
          'border-b-[2px] border-b-gray-700': (row + 1) % 3 === 0 && row !== 8,
          // Rounded corners for corner cells
          'rounded-tl-lg': row === 0 && col === 0,
          'rounded-tr-lg': row === 0 && col === 8,
          'rounded-bl-lg': row === 8 && col === 0,
          'rounded-br-lg': row === 8 && col === 8,
        }
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={readOnly}
      tabIndex={readOnly ? -1 : 0}
      data-row={row}
      data-col={col}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ', empty'}`}
    >
      {value !== 0 ? (
        <span className="relative z-10">{value}</span>
      ) : (
        <CandidateNumbers
          candidates={candidates}
          cellSize="medium"
          className="absolute inset-0"
        />
      )}
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
  highlightConfig = DEFAULT_HIGHLIGHT_CONFIG,
  onCellChange,
  onCellSelect,
  className
}: SudokuGridProps) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showNumberSelector, setShowNumberSelector] = useState(false);
  const [candidateNumbers, setCandidateNumbers] = useState<Map<string, Set<number>>>(new Map());
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate position for the floating number selector
  const selectorPosition = useCellFloatingPosition(
    selectedCell?.row ?? null,
    selectedCell?.col ?? null,
    gridRef.current
  );

  const handleCellSelect = useCallback((row: number, col: number) => {
    // Allow selection of any cell (including initial cells) for highlighting
    const newCell = { row, col };
    setSelectedCell(newCell);

    // Only show number selector for editable cells
    const isInitialCell = initialGrid[row][col] !== 0;
    if (!isInitialCell) {
      setShowNumberSelector(true);
    } else {
      setShowNumberSelector(false);
    }

    onCellSelect?.(row, col);
  }, [onCellSelect, initialGrid]);

  const handleCellChange = useCallback((row: number, col: number, value: number) => {
    onCellChange?.(row, col, value);
  }, [onCellChange]);

  const handleNumberSelect = useCallback((number: number) => {
    if (selectedCell && !readOnly) {
      handleCellChange(selectedCell.row, selectedCell.col, number);
      setShowNumberSelector(false);
    }
  }, [selectedCell, readOnly, handleCellChange]);

  const handleClear = useCallback(() => {
    if (selectedCell && !readOnly) {
      handleCellChange(selectedCell.row, selectedCell.col, 0);
      setShowNumberSelector(false);
    }
  }, [selectedCell, readOnly, handleCellChange]);

  const handleCloseNumberSelector = useCallback(() => {
    setShowNumberSelector(false);
    setSelectedCell(null);
  }, []);

  const handleCandidateToggle = useCallback((number: number) => {
    if (selectedCell && !readOnly) {
      const key = getCellKey(selectedCell.row, selectedCell.col);
      const currentCandidates = candidateNumbers.get(key) || new Set();
      const newCandidates = new Set(currentCandidates);

      if (newCandidates.has(number)) {
        newCandidates.delete(number);
      } else {
        newCandidates.add(number);
      }

      const newCandidateNumbers = new Map(candidateNumbers);
      if (newCandidates.size === 0) {
        newCandidateNumbers.delete(key);
      } else {
        newCandidateNumbers.set(key, newCandidates);
      }

      setCandidateNumbers(newCandidateNumbers);
    }
  }, [selectedCell, readOnly, candidateNumbers]);

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const getCandidatesForCell = (row: number, col: number) => {
    const key = getCellKey(row, col);
    return candidateNumbers.get(key) || new Set();
  };

  const isError = (row: number, col: number, value: number): boolean => {
    if (!highlightConfig.showErrors || !showErrors || !solution || value === 0) return false;
    return solution[row][col] !== value;
  };

  const isRowColumnHighlighted = (row: number, col: number): boolean => {
    if (!highlightConfig.highlightRowColumn || !selectedCell) return false;
    return selectedCell.row === row || selectedCell.col === col;
  };

  const isSameNumberHighlighted = (row: number, col: number, value: number): boolean => {
    if (!highlightConfig.highlightSameNumber || !selectedCell || value === 0) return false;
    const selectedValue = currentGrid[selectedCell.row][selectedCell.col];
    return selectedValue !== 0 && selectedValue === value;
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
    <>
      <div className={cn('inline-block rounded-xl shadow-lg overflow-hidden', className)} ref={gridRef}>
        <div
          className="grid grid-cols-9 gap-0 bg-white border-[4px] border-solid border-gray-700 rounded-xl overflow-hidden"
          role="grid"
          aria-label="Sudoku puzzle grid"
        >
        {currentGrid.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            const isHighlighted = highlightCell?.row === rowIndex && highlightCell?.col === colIndex;
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const hasError = isError(rowIndex, colIndex, cellValue);
            const isRowColHighlight = isRowColumnHighlighted(rowIndex, colIndex) && !isSelected;
            const isSameNumHighlight = isSameNumberHighlighted(rowIndex, colIndex, cellValue) && !isSelected;

            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                isInitial={isInitial}
                isError={hasError}
                isHighlighted={isHighlighted}
                isSelected={isSelected}
                isRowColumnHighlighted={isRowColHighlight}
                isSameNumberHighlighted={isSameNumHighlight}
                candidates={getCandidatesForCell(rowIndex, colIndex)}
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

    {/* Floating Number Selector Widget */}
    <NumberSelector
      isVisible={showNumberSelector && !readOnly}
      position={selectorPosition}
      selectedCell={selectedCell}
      currentValue={selectedCell ? currentGrid[selectedCell.row]?.[selectedCell.col] : undefined}
      candidateNumbers={selectedCell ? getCandidatesForCell(selectedCell.row, selectedCell.col) : new Set()}
      onNumberSelect={handleNumberSelect}
      onClear={handleClear}
      onClose={handleCloseNumberSelector}
      onCandidateToggle={handleCandidateToggle}
    />
  </>
  );
});

SudokuGrid.displayName = 'SudokuGrid';