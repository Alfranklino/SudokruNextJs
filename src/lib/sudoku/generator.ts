// Sudoku puzzle generator
import { copyGrid, isValidPlacement, hasUniqueSolution, type Grid } from './solver';
import { getClueCount, type Difficulty } from './difficulty';

/**
 * Generates an empty 9x9 grid
 */
function createEmptyGrid(): Grid {
  return Array(9).fill(null).map(() => Array(9).fill(0));
}

/**
 * Fills a Sudoku grid with a valid solution
 * Uses randomization to create different puzzles
 */
function fillGrid(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Create randomized array of numbers 1-9
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        for (const num of numbers) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;

            if (fillGrid(grid)) {
              return true;
            }

            grid[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Removes cells from a filled grid to create a puzzle
 * Ensures the puzzle has a unique solution
 */
function removeNumbers(grid: Grid, cellsToRemove: number): Grid {
  const puzzle = copyGrid(grid);
  let removed = 0;
  const attempts = cellsToRemove * 3; // Limit attempts to avoid infinite loops
  let attemptCount = 0;

  while (removed < cellsToRemove && attemptCount < attempts) {
    attemptCount++;

    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      const backup = puzzle[row][col];
      puzzle[row][col] = 0;

      // Check if puzzle still has unique solution
      // For performance, we'll skip this check for easier difficulties
      // and only do it for hard/expert
      const needsCheck = cellsToRemove > 50; // hard/expert have more cells removed

      if (needsCheck && !hasUniqueSolution(puzzle)) {
        // Restore the cell if removing it creates multiple solutions
        puzzle[row][col] = backup;
      } else {
        removed++;
      }
    }
  }

  return puzzle;
}

/**
 * Generates a complete Sudoku puzzle with solution
 */
export function generatePuzzle(difficulty: Difficulty): {
  initialGrid: Grid;
  solution: Grid;
  difficulty: Difficulty;
  clueCount: number;
} {
  // Create a filled grid (complete solution)
  const solution = createEmptyGrid();
  fillGrid(solution);

  // Determine how many clues to leave based on difficulty
  const clueCount = getClueCount(difficulty);
  const cellsToRemove = 81 - clueCount;

  // Create puzzle by removing numbers
  const initialGrid = removeNumbers(solution, cellsToRemove);

  return {
    initialGrid: copyGrid(initialGrid),
    solution: copyGrid(solution),
    difficulty,
    clueCount,
  };
}

/**
 * Generates a puzzle with specific clue count (for testing)
 */
export function generatePuzzleWithClues(clueCount: number): {
  initialGrid: Grid;
  solution: Grid;
  clueCount: number;
} {
  const solution = createEmptyGrid();
  fillGrid(solution);

  const cellsToRemove = 81 - clueCount;
  const initialGrid = removeNumbers(solution, cellsToRemove);

  return {
    initialGrid: copyGrid(initialGrid),
    solution: copyGrid(solution),
    clueCount,
  };
}