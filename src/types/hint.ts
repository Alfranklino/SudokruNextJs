// Hint system types for Sudoku assistance
export interface HintResult {
  row: number;
  col: number;
  value: number;
  technique: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  affectedCells?: Array<{ row: number; col: number }>;
}

export type SudokuTechnique =
  | 'Naked Single'
  | 'Hidden Single'
  | 'Naked Pair'
  | 'Hidden Pair'
  | 'Pointing Pair'
  | 'Box/Line Reduction';
