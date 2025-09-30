// Game configuration and highlighting options

export interface HighlightConfig {
  /** Highlight all cells in the same row and column as the selected cell */
  highlightRowColumn: boolean;

  /** Highlight all cells with the same number as the selected cell */
  highlightSameNumber: boolean;

  /** Show error highlighting for incorrect moves */
  showErrors: boolean;
}

export const DEFAULT_HIGHLIGHT_CONFIG: HighlightConfig = {
  highlightRowColumn: true,
  highlightSameNumber: true,
  showErrors: true,
};

export const ADVANCED_HIGHLIGHT_CONFIG: HighlightConfig = {
  highlightRowColumn: false,
  highlightSameNumber: false,
  showErrors: false,
};