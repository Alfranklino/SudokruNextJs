// Sudoku solving techniques analyzer
import type { Grid } from './validator';
import type { HintResult } from '@/types/hint';

/**
 * Get all possible candidate values for a specific cell
 */
export function getCandidates(grid: Grid, row: number, col: number): number[] {
  if (grid[row][col] !== 0) return [];

  const used = new Set<number>();

  // Check row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] !== 0) used.add(grid[row][c]);
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] !== 0) used.add(grid[r][col]);
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] !== 0) used.add(grid[r][c]);
    }
  }

  // Return unused numbers
  const candidates: number[] = [];
  for (let n = 1; n <= 9; n++) {
    if (!used.has(n)) candidates.push(n);
  }

  return candidates;
}

/**
 * Find a Naked Single - a cell with only one possible candidate
 * This is the easiest technique
 */
export function findNakedSingle(grid: Grid, solution: Grid): HintResult | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const candidates = getCandidates(grid, row, col);

        if (candidates.length === 1) {
          const value = candidates[0];

          // Verify it matches the solution
          if (solution[row][col] === value) {
            return {
              row,
              col,
              value,
              technique: 'Naked Single',
              explanation: `Cell R${row + 1}C${col + 1} can only be ${value}. All other numbers (1-9) already appear in its row, column, or 3×3 box.`,
              difficulty: 'easy'
            };
          }
        }
      }
    }
  }

  return null;
}

/**
 * Find a Hidden Single - a number that can only go in one place within a unit (row, column, or box)
 * Slightly more complex than Naked Single
 */
export function findHiddenSingle(grid: Grid, solution: Grid): HintResult | null {
  // Check rows
  for (let row = 0; row < 9; row++) {
    for (let num = 1; num <= 9; num++) {
      // Skip if number already in row
      if (grid[row].includes(num)) continue;

      const possibleCols: number[] = [];
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const candidates = getCandidates(grid, row, col);
          if (candidates.includes(num)) {
            possibleCols.push(col);
          }
        }
      }

      // If only one place for this number
      if (possibleCols.length === 1) {
        const col = possibleCols[0];
        if (solution[row][col] === num) {
          return {
            row,
            col,
            value: num,
            technique: 'Hidden Single (Row)',
            explanation: `${num} can only go in R${row + 1}C${col + 1} within row ${row + 1}. All other cells in this row either contain numbers or cannot have ${num} due to constraints.`,
            difficulty: 'easy'
          };
        }
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    for (let num = 1; num <= 9; num++) {
      // Skip if number already in column
      let found = false;
      for (let row = 0; row < 9; row++) {
        if (grid[row][col] === num) {
          found = true;
          break;
        }
      }
      if (found) continue;

      const possibleRows: number[] = [];
      for (let row = 0; row < 9; row++) {
        if (grid[row][col] === 0) {
          const candidates = getCandidates(grid, row, col);
          if (candidates.includes(num)) {
            possibleRows.push(row);
          }
        }
      }

      // If only one place for this number
      if (possibleRows.length === 1) {
        const row = possibleRows[0];
        if (solution[row][col] === num) {
          return {
            row,
            col,
            value: num,
            technique: 'Hidden Single (Column)',
            explanation: `${num} can only go in R${row + 1}C${col + 1} within column ${col + 1}. All other cells in this column either contain numbers or cannot have ${num} due to constraints.`,
            difficulty: 'easy'
          };
        }
      }
    }
  }

  // Check 3x3 boxes
  for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
    const boxRow = Math.floor(boxIndex / 3) * 3;
    const boxCol = (boxIndex % 3) * 3;

    for (let num = 1; num <= 9; num++) {
      // Skip if number already in box
      let found = false;
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if (grid[r][c] === num) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) continue;

      const possibleCells: Array<{ row: number; col: number }> = [];
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if (grid[r][c] === 0) {
            const candidates = getCandidates(grid, r, c);
            if (candidates.includes(num)) {
              possibleCells.push({ row: r, col: c });
            }
          }
        }
      }

      // If only one place for this number
      if (possibleCells.length === 1) {
        const { row, col } = possibleCells[0];
        if (solution[row][col] === num) {
          return {
            row,
            col,
            value: num,
            technique: 'Hidden Single (Box)',
            explanation: `${num} can only go in R${row + 1}C${col + 1} within its 3×3 box. All other cells in this box either contain numbers or cannot have ${num} due to constraints.`,
            difficulty: 'easy'
          };
        }
      }
    }
  }

  return null;
}

/**
 * Find any valid move by checking the solution
 * Fallback when no technique-based hint is found
 */
export function findAnyValidMove(grid: Grid, solution: Grid): HintResult | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const value = solution[row][col];
        return {
          row,
          col,
          value,
          technique: 'Direct Fill',
          explanation: `Place ${value} in R${row + 1}C${col + 1}. This is a valid move that advances the puzzle.`,
          difficulty: 'easy'
        };
      }
    }
  }

  return null;
}

/**
 * Find the best hint using the easiest available technique
 * Tries techniques in order of difficulty (easiest first)
 */
export function findBestHint(currentGrid: Grid, solution: Grid): HintResult | null {
  // Try Naked Single first (easiest)
  let hint = findNakedSingle(currentGrid, solution);
  if (hint) return hint;

  // Try Hidden Single (still easy, but more complex)
  hint = findHiddenSingle(currentGrid, solution);
  if (hint) return hint;

  // Fallback: Just find any valid move
  hint = findAnyValidMove(currentGrid, solution);
  return hint;
}
