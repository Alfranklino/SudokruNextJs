# Figma Make Prompt Generator Guide

## Purpose
This guide instructs Claude Code on how to generate Figma Make prompts using project-specific design documentation when implementing UI components and pages.

## Workflow Overview

### The UI Implementation Process
1. **Identify need** - New page or component required
2. **Consult design docs** - Check `[projectname]_figma_prompts.md` for existing prompt
3. **Generate Figma Make prompt** - Use `[projectname]_style_guide.md` tokens if custom prompt needed
4. **User creates in Figma Make** - User takes prompt to Figma Make tool
5. **Convert to Figma** - User converts Figma Make output to Figma design
6. **Implement with Figma MCP** - Claude Code accesses design via Figma MCP and implements pixel-perfect

## When to Generate Figma Make Prompts

### Trigger Points
Generate a Figma Make prompt when:
- **New page needed** that isn't in `[projectname]_figma_prompts.md`
- **Custom component required** not covered in existing prompts
- **Major UI decision** requires visual design (layouts, complex interactions)
- **Design iteration** needed on existing components
- **Responsive variant** not yet designed
- **Edge case UI** not specified in original design docs

### Do NOT Generate Prompts For
- Standard shadcn/ui components (use as-is)
- Minor styling adjustments (apply design tokens directly)
- Text content changes
- Logic/functionality changes without UI impact

## How to Generate Figma Make Prompts

### Step 1: Check Existing Documentation

**ALWAYS check first:**
```
1. Open [projectname]_figma_prompts.md
2. Search for the component/page name
3. If prompt exists → provide that prompt number to user
4. If prompt doesn't exist → proceed to Step 2
```

**Example:**
```
User: "I need to implement the Settings page"
Claude: "Checking [projectname]_figma_prompts.md... 
        Found: Prompt 74 - Settings and Preferences Layout
        Use Prompt 74 from the figma_prompts document."
```

### Step 2: Gather Design Tokens

**If no existing prompt, extract tokens from `[projectname]_style_guide.md`:**

```
Required tokens:
- Colors (brand, semantic, state colors)
- Typography (font families, sizes, weights)
- Spacing (layout grid, margins, gutters)
- Component specs (border radius, shadows, etc.)
- Responsive breakpoints
```

**Example extraction:**
```javascript
// From sudokru_style_guide.md
Primary Color: #3B82F6 (Blue 500)
Secondary Color: #10B981 (Emerald 500)
Font Primary: Inter
Font Game: JetBrains Mono
Spacing: 8-point system (4px, 8px, 16px, 24px, 32px)
Border Radius: 4px (sm), 6px (md), 8px (lg)
```

### Step 3: Structure the Figma Make Prompt

**Use this template structure:**

```markdown
## Prompt [Number]: [Component/Page Name]

Create [description of UI element] for [project context].

**Visual Design:**
- [Layout structure]
- [Color specifications with exact hex codes]
- [Typography specifications with font families and sizes]
- [Spacing and sizing specifications]
- [Visual hierarchy and emphasis]

**Component States:** (if applicable)
- [Default state]
- [Hover state]
- [Active state]
- [Disabled state]
- [Error state]

**Functionality:** (if applicable)
- [User interactions]
- [Data display requirements]
- [Responsive behavior]

**Context:**
- [How this fits in the application]
- [User goals and use cases]
- [Integration with other components]

**Technical Constraints:**
- [Framework compatibility: Next.js, Tailwind CSS]
- [Accessibility requirements]
- [Performance considerations]
```

### Step 4: Inject Design Tokens

**Replace generic values with exact tokens:**

❌ **Bad (Generic):**
```
- Primary button: Blue background with white text
- Font: Sans-serif font
- Spacing: Standard spacing
```

✅ **Good (Specific Tokens):**
```
- Primary button: #3B82F6 background with #FFFFFF text, 
  6px border radius, 2rem height
- Font: Inter font family, 1rem (16px) size, 500 weight
- Spacing: 1.5rem (24px) between sections, 1rem (16px) padding
```

### Step 5: Provide Complete Prompt to User

**Output format:**

```markdown
I need to generate a Figma Make prompt for [component/page name].

Here's the complete prompt based on your style guide:

---

[COMPLETE FIGMA MAKE PROMPT]

---

**Next Steps:**
1. Copy this prompt to Figma Make
2. Generate the design in Figma Make
3. Convert the output to a Figma design file
4. Share the Figma link with me
5. I'll use Figma MCP to implement it pixel-perfect

**Design Tokens Used:**
- Colors: [list specific colors]
- Typography: [list specific fonts]
- Spacing: [list specific spacing values]
- Components: [list any referenced components]
```

## Figma Make Prompt Quality Standards

### Must Include
- **Exact hex color codes** from style guide
- **Specific font names and sizes** (not generic descriptions)
- **Precise spacing values** using project's spacing scale
- **Component dimensions** with responsive variants
- **Interactive states** if component has user interactions
- **Accessibility requirements** (contrast ratios, ARIA needs)

### Must NOT Include
- Generic descriptions like "blue-ish" or "medium size"
- Vague instructions like "make it modern"
- Missing responsive specifications
- Incomplete state definitions
- Assumptions about unstated requirements

## Integration with Development Workflow

### Phase 1: Frontend Shell
**High Frequency** - Many new components and pages

**Typical workflow:**
1. Review `[projectname]_page_inventory.md` for next priority page
2. Check `[projectname]_figma_prompts.md` for existing prompt
3. If not found, generate custom prompt using style guide
4. Wait for user to create and share Figma design
5. Use Figma MCP to implement pixel-perfect
6. Validate against `[projectname]_user_flows.md`

### Phase 2-5: Later Phases
**Lower Frequency** - Refinements and edge cases

**Typical workflow:**
1. Identify UI gap during implementation
2. Check if covered in existing prompts
3. Generate custom prompt if needed
4. Follow same Figma Make → Figma → Implementation flow

## Project-Specific Context Requirements

### Include in Every Prompt
- **Project name and type** (e.g., "Sudokru - competitive multiplayer Sudoku platform")
- **Target audience** (e.g., "ages 25-65, competitive puzzle enthusiasts")
- **Brand personality** (e.g., "intelligent, competitive, accessible, modern")
- **Platform context** (e.g., "web-first with mobile optimization")

### Gaming Platform Example
```markdown
Create a game timer component for Sudokru, a competitive 
multiplayer Sudoku gaming platform targeting ages 25-65.

**Brand Context:**
- Competitive gaming aesthetic
- Intelligence and strategy focus
- Clean, modern puzzle-solving interface
- Real-time multiplayer considerations
```

## Validation Checklist

Before providing a Figma Make prompt to the user, verify:

- [ ] Checked `[projectname]_figma_prompts.md` for existing prompt
- [ ] Used exact hex codes from `[projectname]_style_guide.md`
- [ ] Used exact font specifications from style guide
- [ ] Used project's spacing scale (not arbitrary values)
- [ ] Included all interactive states if applicable
- [ ] Specified responsive behavior for different screen sizes
- [ ] Included accessibility requirements
- [ ] Provided project context and brand personality
- [ ] Structured prompt clearly with sections
- [ ] Listed which design tokens were used

## Common Mistakes to Avoid

### ❌ Mistake 1: Not Checking Existing Prompts
```
User: "I need a login form"
Claude: [Generates new prompt without checking]
```
**Should be:**
```
Claude: "Checking figma_prompts.md... Found Prompt 3: Login Page.
        Use existing Prompt 3."
```

### ❌ Mistake 2: Generic Color Descriptions
```
"Use a blue primary button with a green success state"
```
**Should be:**
```
"Primary button: #3B82F6 background
Success state: #10B981 background"
```

### ❌ Mistake 3: Missing Responsive Specs
```
"Create a card component with standard sizing"
```
**Should be:**
```
"Card dimensions: 
- Mobile: 100% width, 16px padding
- Tablet: 360px width, 24px padding  
- Desktop: 400px width, 32px padding"
```

### ❌ Mistake 4: Incomplete State Definitions
```
"Button with hover effect"
```
**Should be:**
```
"Button states:
- Default: #3B82F6 bg, no shadow
- Hover: #3B82F6 bg, 0 4px 6px shadow
- Active: #2563EB bg, inset shadow
- Disabled: #E5E7EB bg, 50% opacity"
```

## Figma MCP Integration

### After Figma Design is Ready

**User provides Figma link:**
```
User: "Here's the Figma design: [figma-link]"
```

**Claude Code response:**
```
I'll access the Figma design using the Figma MCP and 
implement it pixel-perfect.

[Uses Figma MCP to read design specifications]
[Implements component with exact measurements]
[Validates against style guide tokens]
[Tests responsive behavior]

Implementation complete. The component matches the Figma 
design specifications exactly.
```

## Documentation Updates

### When Creating Custom Prompts

**Important:** If you generate a custom Figma Make prompt that doesn't exist in the original documentation, document it:

```markdown
**Generated Custom Prompt:**
Component: [Name]
Date: [Date]
Reason: [Why this wasn't in original docs]
Prompt: [Full prompt text]
Figma Link: [Once created]

This should be added to [projectname]_figma_prompts.md 
for future reference.
```

## Example: Complete Workflow

### Scenario: Implementing Game Statistics Card

**Step 1: Check existing documentation**
```
Claude: "Checking sudokru_figma_prompts.md for 
        'Game Statistics' or 'Statistics Card'...
        Not found in existing prompts.
        I'll generate a custom prompt."
```

**Step 2: Gather design tokens**
```
Claude: "Extracting from sudokru_style_guide.md:
        - Card bg: #FFFFFF
        - Border: #E2E8F0, 1px
        - Shadow: 0 1px 2px rgba(0,0,0,0.05)
        - Border radius: 8px
        - Primary text: #334155
        - Secondary text: #64748B
        - Font: Inter, 16px regular
        - Spacing: 24px padding"
```

**Step 3: Generate prompt**
```
Claude: "Here's your Figma Make prompt:

## Game Statistics Card Component

Create a statistics display card for Sudokru, showing 
player performance metrics in competitive Sudoku games.

**Visual Design:**
- Card container: White background (#FFFFFF), 
  8px border radius, 1px solid border (#E2E8F0)
- Drop shadow: 0 1px 2px rgba(0,0,0,0.05)
- Internal padding: 24px all sides
- Stats layout: 2x2 grid with 16px gap

**Typography:**
- Stat labels: Inter font, 14px, 500 weight, 
  #64748B color
- Stat values: Inter font, 24px, 700 weight, 
  #334155 color
- Card title: Inter font, 18px, 600 weight, 
  #1E293B color

**Content Structure:**
- Title: "Your Statistics"
- Four stats: Games Played, Win Rate, Avg Time, Rating
- Each stat: Label above value
- Values: Number with unit (%, mins, points)

**Next Steps:**
1. Use this prompt in Figma Make
2. Convert to Figma design
3. Share Figma link
4. I'll implement with Figma MCP"
```

**Step 4: User completes Figma process**
```
User: "Here's the Figma: [link]"
```

**Step 5: Implementation**
```
Claude: [Uses Figma MCP to access design]
        [Implements StatisticsCard component]
        [Validates against style guide]
        "Component implemented pixel-perfect from Figma."
```

---

**Remember:** This workflow ensures design consistency by always referencing the project's design system while enabling rapid UI development through Figma Make automation.