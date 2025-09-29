# Sudokru - Style Guide & Design Tokens

## Overview
This document defines the visual foundation for Sudokru, the real-time multiplayer Sudoku gaming platform. The design system emphasizes competitive gaming aesthetics with clean puzzle-solving interfaces, following a three-tier token system for maintainable design consistency.

## Brand Identity Context
- **Industry:** Competitive puzzle gaming
- **Target Audience:** Ages 25-65, competitive and casual puzzle enthusiasts
- **Brand Personality:** Intelligent, competitive, accessible, modern
- **Platform:** Web-first with mobile optimization

## Color System Architecture

### Brand Tokens (Core Brand Colors)
```
Primary Brand Colors:
- brand-primary: #3B82F6 (Blue 500 - Intelligence, trust, competition)
- brand-secondary: #10B981 (Emerald 500 - Success, achievement)
- brand-accent: #F59E0B (Amber 500 - Energy, highlights, warnings)

Brand Neutrals:
- brand-neutral-50: #F8FAFC (Almost white)
- brand-neutral-100: #F1F5F9 (Light gray)
- brand-neutral-200: #E2E8F0 (Border gray)
- brand-neutral-300: #CBD5E1 (Subtle gray)
- brand-neutral-400: #94A3B8 (Medium gray)
- brand-neutral-500: #64748B (Text secondary)
- brand-neutral-600: #475569 (Text primary)
- brand-neutral-700: #334155 (Dark text)
- brand-neutral-800: #1E293B (Very dark)
- brand-neutral-900: #0F172A (Darkest)

Semantic Brand Colors:
- brand-success: #10B981 (Emerald 500 - Correct moves, wins)
- brand-warning: #F59E0B (Amber 500 - Time warnings, hints)
- brand-error: #EF4444 (Red 500 - Incorrect moves, errors)
- brand-info: #3B82F6 (Blue 500 - Information, tips)

Gaming-Specific Colors:
- brand-player-1: #8B5CF6 (Violet 500 - Player 1 indicator)
- brand-player-2: #EC4899 (Pink 500 - Player 2 indicator)
- brand-gold: #FCD34D (Yellow 300 - Tournament wins, premium)
- brand-silver: #D1D5DB (Gray 300 - Second place)
- brand-bronze: #F97316 (Orange 500 - Third place)
```

### Alias Tokens (Semantic Meanings)
```
Background Aliases:
- bg-primary: brand-primary
- bg-secondary: brand-secondary
- bg-surface: brand-neutral-50
- bg-surface-elevated: #FFFFFF
- bg-overlay: brand-neutral-900 (with 80% opacity)
- bg-game-board: #FFFFFF
- bg-cell-default: #FFFFFF
- bg-cell-given: brand-neutral-100
- bg-cell-player: brand-neutral-50
- bg-cell-opponent: brand-player-2 (with 10% opacity)
- bg-cell-error: brand-error (with 10% opacity)
- bg-cell-selected: brand-primary (with 15% opacity)

Text Aliases:
- text-primary: brand-neutral-700
- text-secondary: brand-neutral-500
- text-tertiary: brand-neutral-400
- text-inverse: brand-neutral-50
- text-on-primary: #FFFFFF
- text-on-secondary: #FFFFFF
- text-success: brand-success
- text-warning: brand-warning
- text-error: brand-error
- text-player-1: brand-player-1
- text-player-2: brand-player-2

Border Aliases:
- border-default: brand-neutral-200
- border-subtle: brand-neutral-100
- border-strong: brand-neutral-300
- border-interactive: brand-primary
- border-game-grid: brand-neutral-800
- border-subgrid: brand-neutral-300
- border-cell: brand-neutral-200
- border-cell-selected: brand-primary

State Aliases:
- state-success: brand-success
- state-warning: brand-warning
- state-error: brand-error
- state-info: brand-info
- state-focus: brand-primary
- state-hover: brand-primary (with 10% opacity)
- state-active: brand-primary (with 20% opacity)
- state-disabled: brand-neutral-300
```

### Mapped Tokens (Component-Specific)
```
Button Mappings:
- button-primary-bg: bg-primary
- button-primary-text: text-on-primary
- button-primary-border: bg-primary
- button-secondary-bg: bg-surface
- button-secondary-text: text-primary
- button-secondary-border: border-default
- button-success-bg: state-success
- button-success-text: text-on-primary
- button-destructive-bg: state-error
- button-destructive-text: text-on-primary

Input Mappings:
- input-bg: bg-surface-elevated
- input-border: border-default
- input-border-focus: border-interactive
- input-text: text-primary
- input-placeholder: text-tertiary
- input-error-border: state-error
- input-success-border: state-success

Sudoku Grid Mappings:
- grid-bg: bg-game-board
- grid-border-main: border-game-grid
- grid-border-sub: border-subgrid
- cell-bg-default: bg-cell-default
- cell-bg-given: bg-cell-given
- cell-bg-user: bg-cell-player
- cell-bg-opponent: bg-cell-opponent
- cell-bg-error: bg-cell-error
- cell-bg-selected: bg-cell-selected
- cell-text-given: text-primary
- cell-text-user: text-primary
- cell-text-error: text-error

Gaming UI Mappings:
- timer-bg: bg-surface-elevated
- timer-text: text-primary
- timer-warning: text-warning
- timer-critical: text-error
- progress-bg: bg-surface
- progress-fill-self: brand-player-1
- progress-fill-opponent: brand-player-2
- leaderboard-gold: brand-gold
- leaderboard-silver: brand-silver
- leaderboard-bronze: brand-bronze

Card Mappings:
- card-bg: bg-surface-elevated
- card-border: border-subtle
- card-shadow: brand-neutral-900 (with 10% opacity)
- card-hover-shadow: brand-neutral-900 (with 20% opacity)

Navigation Mappings:
- nav-bg: bg-surface-elevated
- nav-text: text-secondary
- nav-text-active: text-primary
- nav-border: border-subtle
- nav-item-hover: state-hover
```

## Typography System

### Brand Typography Tokens
```
Font Families:
- font-family-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- font-family-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- font-family-mono: "JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", monospace
- font-family-game: "JetBrains Mono", "SF Mono", Monaco, monospace (for Sudoku numbers)

Font Weights:
- font-weight-light: 300
- font-weight-regular: 400
- font-weight-medium: 500
- font-weight-semibold: 600
- font-weight-bold: 700
- font-weight-black: 900

Base Sizes:
- font-size-xs: 0.75rem (12px)
- font-size-sm: 0.875rem (14px)
- font-size-base: 1rem (16px)
- font-size-lg: 1.125rem (18px)
- font-size-xl: 1.25rem (20px)
- font-size-2xl: 1.5rem (24px)
- font-size-3xl: 1.875rem (30px)
- font-size-4xl: 2.25rem (36px)
- font-size-5xl: 3rem (48px)
- font-size-6xl: 3.75rem (60px)

Game-Specific Sizes:
- font-size-cell-number: 1.5rem (24px) - Desktop Sudoku cells
- font-size-cell-number-mobile: 1.25rem (20px) - Mobile Sudoku cells
- font-size-cell-notes: 0.75rem (12px) - Note numbers in cells
- font-size-timer: 1.875rem (30px) - Game timer
- font-size-score: 2.25rem (36px) - Final scores

Line Heights:
- line-height-tight: 1.25
- line-height-normal: 1.5
- line-height-relaxed: 1.75
- line-height-cell: 1 (for centered Sudoku numbers)
```

### Typography Alias Tokens
```
Heading Aliases:
- text-h1: font-size-5xl + font-weight-bold + line-height-tight
- text-h2: font-size-4xl + font-weight-bold + line-height-tight
- text-h3: font-size-3xl + font-weight-semibold + line-height-tight
- text-h4: font-size-2xl + font-weight-semibold + line-height-tight
- text-h5: font-size-xl + font-weight-medium + line-height-tight
- text-h6: font-size-lg + font-weight-medium + line-height-tight

Body Aliases:
- text-body-lg: font-size-lg + font-weight-regular + line-height-relaxed
- text-body: font-size-base + font-weight-regular + line-height-normal
- text-body-sm: font-size-sm + font-weight-regular + line-height-normal

UI Aliases:
- text-button: font-size-base + font-weight-medium + line-height-tight
- text-button-sm: font-size-sm + font-weight-medium + line-height-tight
- text-caption: font-size-sm + font-weight-regular + line-height-normal
- text-overline: font-size-xs + font-weight-semibold + line-height-tight + letter-spacing-wide
- text-code: font-family-mono + font-size-sm + line-height-normal

Game Aliases:
- text-cell-number: font-family-game + font-size-cell-number + font-weight-semibold + line-height-cell
- text-cell-number-mobile: font-family-game + font-size-cell-number-mobile + font-weight-semibold + line-height-cell
- text-cell-notes: font-family-game + font-size-cell-notes + font-weight-regular + line-height-cell
- text-timer: font-family-mono + font-size-timer + font-weight-bold + line-height-tight
- text-score: font-family-primary + font-size-score + font-weight-black + line-height-tight
```

### Mapped Typography Tokens
```
Component-Specific Typography:
- nav-item-text: text-body + font-weight-medium
- nav-section-text: text-overline + text-tertiary
- button-primary-text: text-button + text-on-primary
- button-secondary-text: text-button + text-primary
- input-text: text-body
- input-label-text: text-caption + font-weight-medium
- input-error-text: text-caption + text-error
- card-title-text: text-h6
- card-body-text: text-body
- modal-title-text: text-h4
- toast-text: text-body-sm
- badge-text: text-caption + font-weight-semibold

Gaming UI Typography:
- game-title-text: text-h3 + font-weight-black
- player-name-text: text-body + font-weight-semibold
- difficulty-label-text: text-caption + font-weight-medium + letter-spacing-wide
- stats-label-text: text-caption + text-secondary
- stats-value-text: text-xl + font-weight-bold
- leaderboard-rank-text: text-h5 + font-weight-black
- tournament-name-text: text-h4 + font-weight-bold
- chat-message-text: text-body-sm
- game-status-text: text-body + font-weight-medium
```

## Spacing & Layout System

### Spacing Scale
```
- space-0: 0
- space-1: 0.25rem (4px)
- space-2: 0.5rem (8px)
- space-3: 0.75rem (12px)
- space-4: 1rem (16px)
- space-5: 1.25rem (20px)
- space-6: 1.5rem (24px)
- space-8: 2rem (32px)
- space-10: 2.5rem (40px)
- space-12: 3rem (48px)
- space-16: 4rem (64px)
- space-20: 5rem (80px)
- space-24: 6rem (96px)

Game-Specific Spacing:
- space-cell-padding: 0.25rem (4px)
- space-grid-gap: 1px
- space-subgrid-gap: 2px
- space-game-section: 1.5rem (24px)
```

### Layout Grid
```
- columns-mobile: 4
- columns-tablet: 8  
- columns-desktop: 12
- gutter-mobile: 1rem (16px)
- gutter-tablet: 1.5rem (24px)
- gutter-desktop: 2rem (32px)
- margin-mobile: 1rem (16px)
- margin-tablet: 2rem (32px)
- margin-desktop: 3rem (48px)
```

## Dark Mode Considerations
```
Dark Mode Overrides:
- bg-surface: brand-neutral-900
- bg-surface-elevated: brand-neutral-800
- bg-game-board: brand-neutral-800
- bg-cell-default: brand-neutral-700
- bg-cell-given: brand-neutral-600
- text-primary: brand-neutral-100
- text-secondary: brand-neutral-300
- text-tertiary: brand-neutral-400
- border-default: brand-neutral-600
- border-subtle: brand-neutral-700
- border-strong: brand-neutral-500
- card-shadow: #000000 (with 40% opacity)
```

## Responsive Typography Scale
```
Mobile (320px+):
- Scale factor: 0.9x for headings h1-h3
- Reduce cell number size for touch targets
- Optimize line-height for readability

Tablet (768px+):
- Scale factor: 1x (base scale)
- Standard game grid sizing

Desktop (1024px+):
- Scale factor: 1.1x for display headings
- Larger game elements for precision
- Enhanced spacing for multiple panels
```

## Component Specifications

### Sudoku Grid Specifications
```
Grid Dimensions:
- Desktop: 450px × 450px (50px per cell)
- Tablet: 360px × 360px (40px per cell)
- Mobile: 270px × 270px (30px per cell)

Cell Specifications:
- Border radius: 2px
- Border width: 1px (inner), 2px (subgrid), 3px (main grid)
- Number size scales with cell size
- Touch target minimum: 44px × 44px
```

### Interactive Elements
```
Button Heights:
- button-xs: 1.5rem (24px)
- button-sm: 2rem (32px)
- button-md: 2.5rem (40px)
- button-lg: 3rem (48px)
- button-xl: 3.5rem (56px)

Border Radius:
- radius-sm: 0.25rem (4px)
- radius-md: 0.375rem (6px)
- radius-lg: 0.5rem (8px)
- radius-xl: 0.75rem (12px)
- radius-full: 9999px

Shadows:
- shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
- shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
- shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
- shadow-game: 0 8px 25px rgba(59, 130, 246, 0.15)
```

## Accessibility Requirements
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18px+ or 14px+ bold)
- Focus indicators must have 3:1 contrast against background
- Interactive elements must have 44x44px minimum touch target
- Game grid cells maintain accessibility in both light and dark modes
- Color is never the only means of conveying information (supplemented with icons, text, or patterns)

## Implementation Notes

### CSS Custom Properties Structure
```css
:root {
  /* Brand Tokens */
  --brand-primary: #3B82F6;
  --brand-secondary: #10B981;
  
  /* Alias Tokens */
  --bg-primary: var(--brand-primary);
  --text-primary: var(--brand-neutral-700);
  
  /* Mapped Tokens */
  --button-primary-bg: var(--bg-primary);
  --cell-number-font: var(--font-family-game);
  
  /* Game-specific */
  --grid-size-desktop: 450px;
  --cell-size-desktop: 50px;
}

@media (max-width: 768px) {
  :root {
    --grid-size-mobile: 270px;
    --cell-size-mobile: 30px;
  }
}
```

### Framework Integration
- **Next.js + Tailwind**: Extend theme configuration with custom tokens
- **shadcn/ui**: Override component themes with gaming-specific colors
- **CSS Modules**: Import tokens as CSS custom properties
- **Component Library**: Create game-specific component variants

This style guide provides the comprehensive visual foundation for Sudokru's competitive gaming interface while maintaining excellent usability for puzzle-solving activities.