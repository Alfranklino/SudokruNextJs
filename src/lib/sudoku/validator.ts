// Sudoku move validation
import type { Grid } from './solver';

/**
 * Validates if a specific move is legal according to Sudoku rules
 */
export function isValidMove(
  grid: Grid,
  row: number,
  col: number,
  num: number
): boolean {
  // Empty cell (0) is always valid
  if (num === 0) {
    return true;
  }

  // Check if number is in valid range
  if (num < 1 || num > 9) {
    return false;
  }

  const currentValue = grid[row][col];

  // Check row for conflicts (skip the cell itself)
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) {
      return false;
    }
  }

  // Check column for conflicts (skip the cell itself)
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) {
      return false;
    }
  }

  // Check 3x3 box for conflicts (skip the cell itself)
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxStartRow + i;
      const c = boxStartCol + j;
      if ((r !== row || c !== col) && grid[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Checks if a move matches the solution (for showing errors)
 */
export function isCorrectMove(
  solution: Grid,
  row: number,
  col: number,
  num: number
): boolean {
  return solution[row][col] === num;
}

/**
 * Checks if the current grid matches the solution (win condition)
 */
export function isComplete(currentGrid: Grid, solution: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (currentGrid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Counts the number of filled cells
 */
export function countFilledCells(grid: Grid): number {
  let count = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== 0) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Calculates completion percentage
 */
export function getCompletionPercentage(grid: Grid): number {
  const filled = countFilledCells(grid);
  return Math.floor((filled / 81) * 100);
}

/**
 * Gets all errors in the current grid compared to solution
 */
export function getErrors(currentGrid: Grid, solution: Grid): Array<{ row: number; col: number }> {
  const errors: Array<{ row: number; col: number }> = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const current = currentGrid[row][col];
      if (current !== 0 && current !== solution[row][col]) {
        errors.push({ row, col });
      }
    }
  }

  return errors;
}

/**
 * Checks if a cell has a conflict with other cells in the grid
 */
export function hasCellConflict(grid: Grid, row: number, col: number): boolean {
  const num = grid[row][col];

  if (num === 0) {
    return false;
  }

  // Check row for duplicates
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) {
      return true;
    }
  }

  // Check column for duplicates
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) {
      return true;
    }
  }

  // Check 3x3 box for duplicates
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxStartRow + i;
      const c = boxStartCol + j;
      if ((r !== row || c !== col) && grid[r][c] === num) {
        return true;
      }
    }
  }

  return false;
}