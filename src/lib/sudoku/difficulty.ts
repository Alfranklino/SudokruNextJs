// Sudoku difficulty configuration

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface DifficultyConfig {
  minClues: number;
  maxClues: number;
  name: string;
  description: string;
  averageTime: number; // in seconds
  rating: number; // 1-5 stars
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    minClues: 36,
    maxClues: 46,
    name: 'Easy',
    description: 'Perfect for beginners and learning basic techniques',
    averageTime: 300, // 5 minutes
    rating: 1,
  },
  medium: {
    minClues: 30,
    maxClues: 35,
    name: 'Medium',
    description: 'Intermediate puzzles with moderate complexity',
    averageTime: 600, // 10 minutes
    rating: 3,
  },
  hard: {
    minClues: 26,
    maxClues: 29,
    name: 'Hard',
    description: 'Advanced puzzles requiring strategic thinking',
    averageTime: 1200, // 20 minutes
    rating: 4,
  },
  expert: {
    minClues: 22,
    maxClues: 25,
    name: 'Expert',
    description: 'Master-level puzzles for true Sudoku experts',
    averageTime: 1800, // 30 minutes
    rating: 5,
  },
};

/**
 * Gets the number of clues to leave in the puzzle based on difficulty
 */
export function getClueCount(difficulty: Difficulty): number {
  const config = DIFFICULTY_CONFIG[difficulty];
  const min = config.minClues;
  const max = config.maxClues;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets difficulty configuration
 */
export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIG[difficulty];
}