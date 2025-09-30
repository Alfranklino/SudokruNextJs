// Sudoku solver using backtracking algorithm
export type Grid = number[][];

/**
 * Checks if placing a number at a specific position is valid
 */
export function isValidPlacement(
  grid: Grid,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxStartRow + i][boxStartCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Finds the next empty cell in the grid
 * Returns null if no empty cell is found
 */
export function findEmptyCell(grid: Grid): { row: number; col: number } | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Solves a Sudoku puzzle using backtracking
 * Modifies the grid in place
 * Returns true if solution found, false otherwise
 */
export function solveSudoku(grid: Grid): boolean {
  const emptyCell = findEmptyCell(grid);

  // Base case: no empty cells means puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const { row, col } = emptyCell;

  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      // Place the number
      grid[row][col] = num;

      // Recursively try to solve the rest
      if (solveSudoku(grid)) {
        return true;
      }

      // Backtrack if this path doesn't lead to solution
      grid[row][col] = 0;
    }
  }

  return false;
}

/**
 * Creates a deep copy of a grid
 */
export function copyGrid(grid: Grid): Grid {
  return grid.map(row => [...row]);
}

/**
 * Solves a Sudoku puzzle and returns the solution
 * Does not modify the original grid
 * Returns null if no solution exists
 */
export function getSolution(grid: Grid): Grid | null {
  const gridCopy = copyGrid(grid);
  const solved = solveSudoku(gridCopy);
  return solved ? gridCopy : null;
}

/**
 * Checks if a Sudoku puzzle has a unique solution
 * This is computationally expensive, use sparingly
 */
export function hasUniqueSolution(grid: Grid): boolean {
  let solutionCount = 0;
  const gridCopy = copyGrid(grid);

  function countSolutions(g: Grid): void {
    if (solutionCount > 1) return; // Early exit if multiple solutions found

    const emptyCell = findEmptyCell(g);
    if (!emptyCell) {
      solutionCount++;
      return;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num;
        countSolutions(g);
        g[row][col] = 0;
      }
    }
  }

  countSolutions(gridCopy);
  return solutionCount === 1;
}

/**
 * Validates if a completed grid is a valid Sudoku solution
 */
export function isValidSolution(grid: Grid): boolean {
  // Check all rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num < 1 || num > 9 || seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
  }

  // Check all columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
  }

  // Check all 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = grid[boxRow * 3 + i][boxCol * 3 + j];
          if (seen.has(num)) {
            return false;
          }
          seen.add(num);
        }
      }
    }
  }

  return true;
}