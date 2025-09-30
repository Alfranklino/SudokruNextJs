# CLAUDE.md - AI Assistant Project Context

## Project Overview
Sudokru is a modern, multiplayer Sudoku gaming platform that brings the classic puzzle game into the digital age with real-time competition, tournaments, social features, and comprehensive player progression systems. Built for puzzle enthusiasts worldwide, Sudokru combines competitive gaming with social connectivity.

**Development Approach**: Frontend-first prototyping with structured documentation
**Current Phase**: Phase 1 (Frontend Shell & Components) - Transitioning to Phase 2

## Tech Stack
- **Frontend**: Next.js 15.5.4 with TypeScript and App Router
- **Development DB**: SQLite with Prisma ORM
- **Production DB**: PostgreSQL
- **UI**: Tailwind CSS v4 + shadcn/ui components
- **State Management**: Zustand
- **Real-time**: Socket.io (client ready, server pending)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Playwright MCP for browser automation
- **Documentation**: Context7 MCP for up-to-date library references
- **Icons**: Lucide React

## Folder Structure
```
sudokru/
├── docs/                    # All documentation organized by category
│   ├── development/        # Development guides and workflows
│   │   ├── claude_code_entry_guide.md
│   │   ├── git_guidelines.md
│   │   ├── sudokru_dev_guide.md
│   │   ├── sudokru_environment.md
│   │   └── sudokru_folder_structure.md
│   ├── planning/           # PRD, TRD, MVP matrices
│   │   ├── sudokru_prd.md
│   │   ├── sudokru_mvp_matrix.md
│   │   ├── sudokru_prototyping_roadmap.md
│   │   └── sudokru_implementation_package.md
│   ├── design/             # Figma prompts, style guides, wireframes
│   │   ├── sudokru_figma_prompts.md
│   │   ├── sudokru_style_guide.md
│   │   ├── sudokru_components.md
│   │   ├── sudokru_ui_components.md
│   │   ├── sudokru_page_inventory.md
│   │   └── figma_make_prompt_guide.md
│   ├── technical/          # API specs, database schemas
│   │   ├── sudokru_api_spec.md
│   │   ├── sudokru_database_schema.md
│   │   ├── sudokru_frontend_architecture.md
│   │   ├── sudokru_trd.md
│   │   ├── sudokru_auth_authorization.md
│   │   ├── sudokru_data_flow.md
│   │   └── sudokru_error_logging.md
│   ├── user-experience/    # User journeys, personas
│   │   ├── sudokru_user_journeys.md
│   │   └── sudokru_user_flows.md
│   └── infrastructure/     # CI/CD, environment configs (pending)
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   │   ├── game/          # Game-specific components
│   │   ├── ui/            # shadcn/ui base components
│   │   └── providers/     # Context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and shared logic
│   ├── stores/            # Zustand state management
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles and themes
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── CLAUDE.md             # This file
```

## Code Style and Conventions

### General Guidelines
- **ES Modules**: Always use `import/export` syntax (never CommonJS)
- **TypeScript**: Strict mode enabled; no `any` types without justification
- **Naming**:
  - Components: PascalCase (e.g., `SudokuGrid.tsx`)
  - Functions/variables: camelCase (e.g., `validateMove`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_PLAYERS`)
  - Files: kebab-case for utilities (e.g., `game-logic.ts`)
- **Comments**: Minimal; prioritize clear, self-documenting code
- **Formatting**: Prettier with project config; run before commits

### Design System Integration
**CRITICAL RULE**: Never hardcode colors, spacing, or typography values.

- **Always check** `docs/design/sudokru_style_guide.md` first
- **Always use design tokens** from the style guide
- **Never implement UI** without checking design documentation
- **If no design exists**: Follow `docs/design/figma_make_prompt_guide.md` to create one

### UI Implementation Workflow
1. Check `docs/design/sudokru_figma_prompts.md` for existing design
2. If prompt exists → Request user to create in Figma Make → Implement from Figma
3. If no prompt → Generate one using Figma Make Prompt Generator Guide
4. Use design tokens from style guide for all visual decisions
5. Implement pixel-perfect using Figma MCP integration
6. **MANDATORY: Launch Figma QA Validator subagent** (see "Specialized Subagents" section)
   - Automatically validate implementation against Figma design
   - Run comprehensive QA testing (visual, interactive, accessibility)
   - Review QA report and fix all Critical/High priority issues
   - Re-run validation until PASS status achieved

## Development Workflow

### Git Workflow (MANDATORY)
**IMPORTANT**: Follow `docs/development/git_guidelines.md` exactly

- **Never commit directly** to `dev` or `main` branches
- **Always use feature branches**: `feat/`, `fix/`, `experimental/`
- **Never push, merge, or create PR** without explicit user permission
- **Branch structure**:
  - `main` → Production-ready code
  - `dev` → Default branch for development
  - Feature branches → Created from `dev`, merged back to `dev`

### Development Phases
Follow `docs/development/claude_code_entry_guide.md` for detailed phase instructions.

**Phase 0: Git & GitHub Setup** ✅ Complete
- Repository initialized with proper branch structure
- README.md created and documentation organized
- Remote repository configured

**Phase 1: Frontend Shell & Components** ✅ Complete
- Next.js 15.5.4 with TypeScript and App Router
- Tailwind CSS v4 + shadcn/ui component library
- Interactive Sudoku grid with real-time updates
- Game status tracking and player management
- Zustand state management with mock data
- Responsive design with mobile support
- Comprehensive type definitions

**Phase 2: API Layer Development** 🔄 Current Phase
- Add API structure with mock responses
- Create Next.js API routes matching OpenAPI specification
- Integrate frontend with API calls (SWR or React Query)
- Add loading states and error boundaries
- Implement form validation and submission

**Phase 3: Database Integration** ⏳ Upcoming
- Replace mock data with real database
- Set up SQLite for development
- Implement CRUD operations with Prisma
- Add data validation using schemas

**Phase 4: Authentication & Security** ⏳ Planned
- Add user management and security
- Implement role-based access control
- Set up session management with NextAuth.js
- Add security headers and CORS policies

**Phase 5: Production Preparation** ⏳ Future
- Migrate to PostgreSQL
- Configure CI/CD pipeline
- Performance optimization and monitoring
- Production deployment

### Common Commands
```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production with Turbopack
npm start                # Start production server
npm run lint             # Run ESLint

# Database (Phase 3+)
npx prisma migrate dev   # Run database migrations
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma Client

# Testing (Phase 2+)
npm test                 # Run tests
npm test -- --watch      # Run tests in watch mode

# Git (Always ask permission first)
git checkout -b feat/feature-name  # Create feature branch from dev
git add .                          # Stage changes
git commit -m "type: description"  # Commit with conventional format
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **File System MCP**: Create project structure and component files
- **Package Manager MCP**: Install dependencies and manage packages
- **Figma MCP**: Access Figma designs for pixel-perfect implementation
- **Playwright MCP**: Browser automation and testing
- **Context7 MCP**: Access up-to-date documentation for libraries
- **Database MCP**: Execute schema, migrations, and queries
- **Git MCP**: Version control operations (requires permission)
- **IDE MCP**: Get diagnostics and execute code in Jupyter notebooks

### MCP Usage Patterns
- Use File System MCP for creating files and directory structures
- Use Package Manager MCP for all dependency installations
- Use Figma MCP when implementing designs from Figma
- Use Playwright MCP for end-to-end testing and browser automation
- Use Context7 MCP when you need current library documentation
- Use Database MCP for schema management and data operations
- Use Git MCP only after explicit user permission

## Specialized Subagents

### Figma QA Validator Subagent

**Purpose**: Automatically validate UI implementations against Figma designs using visual comparison and comprehensive QA testing.

**When to Trigger**:
- **MANDATORY**: After completing any UI component or page implementation from Figma designs
- **MANDATORY**: Before marking any Figma-based implementation as complete
- **Optional**: When user explicitly requests Figma QA validation

**Tool Access Required**:
- Figma MCP (`mcp__figma-remote-mcp__get_screenshot`)
- Playwright MCP (all playwright tools)
- Read tool (to check design documentation)

**Autonomous Workflow**:

**Step 1: Gather Context**
- Read implementation details (component/page name, URL path, file locations)
- Extract Figma URL and node ID from `docs/design/sudokru_figma_prompts.md`
- Identify relevant design tokens from `docs/design/sudokru_style_guide.md`
- Confirm dev server is running at `http://localhost:3000`

**Step 2: Capture Figma Reference**
- Use Figma MCP `get_screenshot` with fileKey and nodeId
- Save screenshot as reference: `figma-{component-name}-baseline.png`
- If Figma capture fails, report to user and request Figma URL verification

**Step 3: Capture Live Implementation**
- Use Playwright `navigate` to component/page URL
- Wait for page load and React hydration (2-3 seconds)
- Capture screenshots at multiple viewports:
  - **Mobile**: 375x667 → `live-{component-name}-mobile.png`
  - **Tablet**: 768x1024 → `live-{component-name}-tablet.png`
  - **Desktop**: 1920x1080 → `live-{component-name}-desktop.png`
- Use `fullPage: true` for full page captures
- Use `savePng: true` to save files to Downloads

**Step 4: Visual Comparison Analysis**
- Compare Figma baseline vs. live desktop implementation
- Analyze pixel-perfect alignment
- Identify discrepancies in:
  - **Colors**: Verify all colors use design tokens (check computed styles)
  - **Spacing**: Verify margins/padding match design system values
  - **Typography**: Verify font-family, sizes, weights use token values
  - **Layout**: Verify positioning, alignment, grid structure
  - **Component States**: Verify default, hover, active, disabled states

**Step 5: Interactive Element Testing**
- Test all buttons (click, hover states)
- Test all input fields (fill, validation)
- Test all links (navigation)
- Test dropdown/select components
- Test modals/dialogs (open, close)
- Capture screenshots of each interactive state
- Use Playwright `console_logs` to check for errors after each interaction

**Step 6: Responsive Behavior Validation**
- Verify mobile layout differs appropriately from desktop
- Check tablet breakpoint behavior
- Verify no horizontal scrolling at any viewport
- Test touch targets (minimum 44x44px on mobile)

**Step 7: Accessibility Audit**
- Use Playwright `get_visible_html` with `cleanHtml: true`
- Verify ARIA labels on all interactive elements
- Check semantic HTML (proper heading hierarchy, button vs div, etc.)
- Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Verify focus indicators are visible and styled
- Check color contrast ratios against WCAG standards

**Step 8: Design Token Compliance Check**
- Use Playwright `get_visible_html` to extract inline styles
- Flag any hardcoded color values (e.g., `#123456`, `rgb()`)
- Flag any hardcoded spacing values not from Tailwind/design system
- Flag any hardcoded font values
- Report file:line locations for each violation

**Step 9: Generate Comprehensive QA Report**
- Compile all findings into structured report
- Include screenshot links/paths
- Provide specific file:line references for issues
- Categorize by severity (Critical, High, Medium, Low)
- Include recommended fixes with exact code changes

**Success Criteria**:
- ✅ All screenshots captured successfully (Figma + 3 viewports)
- ✅ Visual comparison completed with findings documented
- ✅ All interactive elements tested
- ✅ Accessibility audit completed
- ✅ Design token compliance checked
- ✅ Console logs reviewed (no critical errors)
- ✅ QA report generated with actionable recommendations

**Output Format**:
```markdown
# Figma QA Validation Report

**Component/Page**: {name}
**URL Path**: {path}
**Date**: {timestamp}
**Overall Status**: ✅ PASS / ⚠️ NEEDS MINOR FIXES / ❌ NEEDS MAJOR FIXES

---

## 📸 Visual Comparison

### Figma Design Reference
![Figma Design](path/to/figma-{component-name}-baseline.png)

### Live Implementation
- **Desktop (1920x1080)**: ![Desktop](path/to/live-{component-name}-desktop.png)
- **Tablet (768x1024)**: ![Tablet](path/to/live-{component-name}-tablet.png)
- **Mobile (375x667)**: ![Mobile](path/to/live-{component-name}-mobile.png)

### Differences Identified
- ✅ **Layout**: Pixel-perfect match with Figma design
- ❌ **Spacing**: Hardcoded `margin: 20px` at `ComponentName.tsx:45` (should use `spacing.md` token)
- ⚠️ **Color**: Button hover state uses hardcoded `#3b82f6` at `ComponentName.tsx:78` (should use `colors.primary.600`)
- ✅ **Typography**: All text uses design tokens correctly

---

## 🎨 Design Token Compliance

### ✅ Passed (Using Design Tokens)
- Primary button background: `bg-primary-500` ✓
- Heading font: `font-heading` ✓
- Card padding: `p-spacing-lg` ✓

### ❌ Failed (Hardcoded Values)
1. **Color hardcoded** at `src/components/Button.tsx:78`
   - Current: `backgroundColor: '#3b82f6'`
   - Should be: `bg-primary-600` or `className="bg-primary-600"`

2. **Spacing hardcoded** at `src/components/Card.tsx:45`
   - Current: `margin: '20px'`
   - Should be: `m-spacing-md` or use `spacing.md` token

---

## 🖱️ Interactive Testing

### Button Interactions
- ✅ Click events fire correctly
- ✅ Hover state displays properly
- ❌ Focus state missing visible indicator (accessibility issue)
- ✅ Disabled state styled correctly

### Form Inputs
- ✅ Text input accepts keyboard input
- ✅ Validation messages display on invalid input
- ✅ Submit button triggers form submission
- ⚠️ Email validation allows invalid format "test@" (should reject)

### Navigation
- ✅ All links navigate to correct routes
- ✅ Back button functionality works
- ✅ Mobile menu toggles correctly

---

## ♿ Accessibility Audit

### ✅ Passed
- Semantic HTML used (button, nav, header elements)
- ARIA labels present on icon-only buttons
- Heading hierarchy correct (h1 → h2 → h3)
- Color contrast ratio meets WCAG AA (4.5:1)

### ❌ Failed
1. **Missing focus indicator** on primary button
   - Location: `src/components/Button.tsx:34`
   - Fix: Add `focus:ring-2 focus:ring-primary-500` class

2. **Missing alt text** on logo image
   - Location: `src/components/Header.tsx:12`
   - Fix: Add `alt="Sudokru Logo"`

### ⚠️ Warnings
- Tab order could be improved (settings button before main content)
- Consider adding `aria-live` region for game status updates

---

## 📱 Responsive Behavior

### Mobile (375x667)
- ✅ Layout adjusts correctly
- ✅ Touch targets meet 44x44px minimum
- ✅ No horizontal scrolling
- ⚠️ Button text truncated on very small screens (consider shorter label)

### Tablet (768x1024)
- ✅ Grid layout transitions correctly
- ✅ Navigation menu collapses appropriately
- ✅ All content accessible

### Desktop (1920x1080)
- ✅ Max-width container prevents over-stretching
- ✅ All interactive elements accessible
- ✅ Layout matches Figma design

---

## 🐛 Console Errors/Warnings

### Errors
- None ✅

### Warnings
- ⚠️ React warning: "Each child in a list should have a unique key prop"
  - Location: `src/components/GameList.tsx:23`
  - Fix: Add `key={game.id}` to mapped elements

---

## 📊 Summary

### Critical Issues (Must Fix) 🔴
1. Hardcoded color in button hover state (`Button.tsx:78`)
2. Missing focus indicator on primary button (`Button.tsx:34`)

### High Priority (Should Fix) 🟠
1. Hardcoded spacing in Card component (`Card.tsx:45`)
2. Missing alt text on logo image (`Header.tsx:12`)

### Medium Priority (Nice to Fix) 🟡
1. Email validation too permissive
2. React key prop warning in GameList
3. Button text truncation on small mobile screens

### Low Priority (Optional) ⚪
1. Tab order optimization
2. Consider aria-live regions

---

## ✅ Recommendations

1. **Fix all hardcoded design values** (Critical)
   - Replace hardcoded colors with design tokens
   - Replace hardcoded spacing with design system values

2. **Add missing accessibility features** (Critical)
   - Add focus indicators to all interactive elements
   - Add alt text to all images

3. **Improve form validation** (High)
   - Strengthen email regex validation

4. **Clean up React warnings** (Medium)
   - Add keys to list items

**Estimated time to fix all issues**: 30-45 minutes

---

**Next Steps**:
1. Address Critical issues immediately
2. Fix High Priority issues before commit
3. Create GitHub issue for Medium/Low priority items
4. Re-run QA validation after fixes applied
```

**How to Launch This Subagent**:

When you complete a Figma-based implementation, automatically use the Task tool:

```javascript
Task({
  subagent_type: "general-purpose",
  description: "Figma QA validation",
  prompt: `You are the Figma QA Validator subagent. Your task is to validate the implementation of {component-name} at URL path {url-path} against the Figma design.

Follow the EXACT workflow specified in CLAUDE.md under "Figma QA Validator Subagent":
1. Gather context from docs/design/sudokru_figma_prompts.md
2. Capture Figma screenshot using fileKey: {fileKey}, nodeId: {nodeId}
3. Capture live screenshots at 3 viewports using Playwright
4. Perform visual comparison analysis
5. Test all interactive elements
6. Validate responsive behavior
7. Run accessibility audit
8. Check design token compliance
9. Generate comprehensive QA report in the specified format

Use these tools:
- mcp__figma-remote-mcp__get_screenshot
- mcp__playwright__* (all playwright tools)
- Read tool for documentation

Return the complete QA report with all sections filled out, including specific file:line references for any issues found.`
})
```

## Testing and Debugging

### Testing Strategy
- **Framework**: Jest for unit tests (pending), Playwright for E2E
- **Coverage Target**: 80% minimum for core business logic
- **Test Location**: Co-locate tests with components (`ComponentName.test.tsx`)
- **Debugging**: Use VS Code debugger; check browser console for errors

### Debug Workflow
1. Check browser console for client-side errors
2. Check terminal output for server-side errors (Next.js dev server)
3. Use VS Code breakpoints for step-through debugging
4. Review Zustand DevTools for state management issues
5. Use React DevTools for component inspection

## Playwright UI Design Testing & QA

### Overview
Playwright MCP integration enables automated UI testing, design validation, and quality assurance for Sudokru. Use Playwright to verify pixel-perfect implementations against Figma designs, conduct visual regression testing, and automate user flow validation.

### Available Playwright MCP Tools

#### Navigation & Setup
- **`playwright_navigate`**: Navigate to URL with browser configuration
  - Parameters: `url`, `browserType` (chromium/firefox/webkit), `headless`, `width`, `height`, `timeout`
  - Example: Navigate to localhost:3000 with 1920x1080 viewport

#### Screenshots & Visual Testing
- **`playwright_screenshot`**: Capture full page or specific elements
  - Parameters: `name`, `selector`, `fullPage`, `savePng`, `storeBase64`, `width`, `height`
  - Use for: Visual regression testing, design validation, documentation

#### Interaction Testing
- **`playwright_click`**: Click elements on the page
- **`playwright_fill`**: Fill input fields
- **`playwright_select`**: Select dropdown options
- **`playwright_hover`**: Hover over elements
- **`playwright_press_key`**: Simulate keyboard input
- **`playwright_drag`**: Drag and drop elements

#### Advanced Interactions
- **`playwright_iframe_click`**: Click elements within iframes
- **`playwright_iframe_fill`**: Fill inputs within iframes
- **`playwright_upload_file`**: Upload files to input elements
- **`playwright_click_and_switch_tab`**: Handle new tab navigation

#### Content Inspection
- **`playwright_get_visible_text`**: Extract visible text content
- **`playwright_get_visible_html`**: Get HTML with optional cleaning
  - Parameters: `selector`, `cleanHtml`, `minify`, `removeScripts`, `removeComments`, `maxLength`

#### Browser Control
- **`playwright_go_back`**: Navigate browser history backward
- **`playwright_go_forward`**: Navigate browser history forward
- **`playwright_close`**: Close browser and release resources
- **`playwright_evaluate`**: Execute JavaScript in browser console
- **`playwright_console_logs`**: Retrieve and filter console logs

#### HTTP Testing
- **`playwright_get`**: Perform HTTP GET requests
- **`playwright_post`**: Perform HTTP POST requests
- **`playwright_put`**: Perform HTTP PUT requests
- **`playwright_patch`**: Perform HTTP PATCH requests
- **`playwright_delete`**: Perform HTTP DELETE requests
- **`playwright_expect_response`**: Wait for HTTP responses
- **`playwright_assert_response`**: Validate HTTP response content

#### Test Generation
- **`start_codegen_session`**: Record user actions and generate test code
- **`end_codegen_session`**: Finalize and save generated tests
- **`get_codegen_session`**: Check session status
- **`clear_codegen_session`**: Clear session without saving

### UI Design Testing Workflow

#### 1. Initial Setup
```bash
# Ensure dev server is running
npm run dev

# Playwright MCP is already configured in Claude Code
# No additional installation needed
```

#### 2. Figma Design Validation Workflow

**Step 2.1: Get Figma Design Reference**
1. Open `docs/design/sudokru_figma_prompts.md`
2. Identify the component/page to test
3. Use Figma MCP to get screenshot: `mcp__figma-remote-mcp__get_screenshot`
4. Save Figma design as reference image

**Step 2.2: Capture Live Implementation**
1. Navigate to page: `playwright_navigate` with `url: "http://localhost:3000/page-path"`
2. Wait for page load and hydration
3. Take screenshot: `playwright_screenshot` with:
   - `name: "component-name-live"`
   - `fullPage: true` (or `selector: ".component-class"` for specific elements)
   - `savePng: true` for file storage

**Step 2.3: Visual Comparison**
1. Compare Figma screenshot vs. live screenshot
2. Verify design token usage:
   - Colors match style guide
   - Spacing matches design system
   - Typography matches tokens
   - Responsive breakpoints work correctly

**Step 2.4: Report Discrepancies**
- Document any pixel differences
- Note hardcoded values that should use design tokens
- Identify missing responsive behavior
- List accessibility issues

#### 3. Component Testing Workflow

**Test Interactive Components (e.g., SudokuGrid)**
```
1. Navigate to game page
   - playwright_navigate: url="http://localhost:3000/game/play"

2. Capture initial state
   - playwright_screenshot: name="sudoku-grid-initial", selector=".sudoku-grid"

3. Test cell selection
   - playwright_click: selector="[data-cell='0-0']"
   - playwright_screenshot: name="sudoku-grid-cell-selected"

4. Test number input
   - playwright_press_key: key="5", selector="[data-cell='0-0']"
   - playwright_screenshot: name="sudoku-grid-number-entered"

5. Verify state updates
   - playwright_get_visible_html: selector=".sudoku-grid"
   - Check for correct data attributes and classes

6. Test error states
   - playwright_click: selector="[data-cell='0-1']"
   - playwright_press_key: key="5" (duplicate number)
   - playwright_screenshot: name="sudoku-grid-error-state"
```

**Test Form Components**
```
1. Navigate to form page
   - playwright_navigate: url="http://localhost:3000/auth/login"

2. Test input validation
   - playwright_fill: selector="input[name='email']", value="invalid-email"
   - playwright_click: selector="button[type='submit']"
   - playwright_screenshot: name="form-validation-error"

3. Test successful submission
   - playwright_fill: selector="input[name='email']", value="user@example.com"
   - playwright_fill: selector="input[name='password']", value="password123"
   - playwright_click: selector="button[type='submit']"
   - playwright_screenshot: name="form-submit-success"
```

#### 4. Responsive Design Testing

**Test Multiple Viewports**
```
1. Mobile view (375x667)
   - playwright_navigate: url="http://localhost:3000", width=375, height=667
   - playwright_screenshot: name="homepage-mobile", fullPage=true

2. Tablet view (768x1024)
   - playwright_navigate: url="http://localhost:3000", width=768, height=1024
   - playwright_screenshot: name="homepage-tablet", fullPage=true

3. Desktop view (1920x1080)
   - playwright_navigate: url="http://localhost:3000", width=1920, height=1080
   - playwright_screenshot: name="homepage-desktop", fullPage=true

4. Ultra-wide view (2560x1440)
   - playwright_navigate: url="http://localhost:3000", width=2560, height=1440
   - playwright_screenshot: name="homepage-ultrawide", fullPage=true
```

#### 5. User Flow Testing

**Complete Game Flow**
```
1. Start at landing page
   - playwright_navigate: url="http://localhost:3000"
   - playwright_screenshot: name="flow-1-landing"

2. Navigate to dashboard
   - playwright_click: selector="a[href='/dashboard']"
   - playwright_screenshot: name="flow-2-dashboard"

3. Start new game
   - playwright_click: selector="button[data-action='new-game']"
   - playwright_screenshot: name="flow-3-game-setup"

4. Select difficulty
   - playwright_click: selector="button[data-difficulty='medium']"
   - playwright_screenshot: name="flow-4-difficulty-selected"

5. Play game
   - playwright_click: selector="button[data-action='start-game']"
   - playwright_screenshot: name="flow-5-game-started"

6. Verify game state
   - playwright_get_visible_html: selector=".game-container"
   - playwright_console_logs: type="error" (check for errors)
```

#### 6. Accessibility Testing

**Keyboard Navigation**
```
1. Navigate to page
   - playwright_navigate: url="http://localhost:3000/game/play"

2. Test Tab navigation
   - playwright_press_key: key="Tab"
   - playwright_screenshot: name="a11y-focus-first-element"
   - Repeat and verify focus order

3. Test keyboard shortcuts
   - playwright_press_key: key="Escape" (should close modals)
   - playwright_press_key: key="Enter" (should activate buttons)
   - playwright_press_key: key="ArrowDown" (should navigate grid)

4. Test screen reader attributes
   - playwright_get_visible_html: cleanHtml=true
   - Verify aria-labels, roles, and semantic HTML
```

#### 7. Error State Testing

**Test Error Boundaries and States**
```
1. Test network errors
   - playwright_navigate: url="http://localhost:3000"
   - playwright_evaluate: script="window.navigator.onLine = false"
   - playwright_click: selector="button[data-action='fetch-data']"
   - playwright_screenshot: name="error-network-offline"

2. Test validation errors
   - Test with invalid inputs
   - Capture error messages
   - Verify error styling matches design system

3. Test loading states
   - playwright_click: selector="button[data-action='load-data']"
   - playwright_screenshot: name="loading-state"
   - Wait for completion
   - playwright_screenshot: name="loaded-state"

4. Check console for errors
   - playwright_console_logs: type="error"
   - Document all console errors/warnings
```

#### 8. Visual Regression Testing

**Create Baseline Screenshots**
```
1. After implementing new feature/component
2. Capture screenshots of all states (default, hover, active, disabled, error)
3. Store in /tests/visual-regression/baselines/
4. Document viewport and browser used
```

**Compare Against Baselines**
```
1. Before merging changes
2. Capture new screenshots with same parameters
3. Compare pixel-by-pixel against baselines
4. Flag any unexpected visual changes
5. Update baselines if changes are intentional
```

### QA Testing Checklist

Before marking any UI feature complete, verify:

**Design Compliance**
- [ ] Matches Figma design pixel-perfectly
- [ ] Uses design tokens from `sudokru_style_guide.md`
- [ ] No hardcoded colors, spacing, or typography
- [ ] Responsive at all breakpoints (mobile, tablet, desktop)

**Functionality**
- [ ] All interactive elements work correctly
- [ ] Form validation displays proper errors
- [ ] Loading states appear during async operations
- [ ] Error boundaries catch and display errors gracefully

**Accessibility**
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] Focus indicators visible and styled correctly
- [ ] ARIA labels present on interactive elements
- [ ] Semantic HTML used (buttons, links, headings)
- [ ] Color contrast meets WCAG standards

**Performance**
- [ ] Page loads in under 3 seconds
- [ ] No console errors or warnings
- [ ] Images optimized and lazy-loaded
- [ ] Animations smooth (60fps)

**Cross-Browser**
- [ ] Tested in Chrome/Chromium
- [ ] Tested in Firefox
- [ ] Tested in Safari/WebKit

**User Flows**
- [ ] Complete user journey works end-to-end
- [ ] Navigation between pages works correctly
- [ ] State persists appropriately (Zustand)
- [ ] Real-time updates work (when implemented)

### Common Playwright Commands for Sudokru

```bash
# Start browser and navigate to dev server
playwright_navigate: url="http://localhost:3000", headless=false, width=1920, height=1080

# Test Sudoku grid interaction
playwright_click: selector="[data-testid='cell-0-0']"
playwright_press_key: key="5"
playwright_screenshot: name="sudoku-move-made"

# Test navigation
playwright_click: selector="a[href='/dashboard']"
playwright_screenshot: name="dashboard-page"

# Test forms
playwright_fill: selector="input[name='username']", value="testuser"
playwright_fill: selector="input[name='password']", value="testpass123"
playwright_click: selector="button[type='submit']"

# Capture full page for documentation
playwright_screenshot: name="feature-documentation", fullPage=true, savePng=true

# Check for errors
playwright_console_logs: type="error"

# Get component HTML for debugging
playwright_get_visible_html: selector=".sudoku-grid", cleanHtml=true

# Close browser when done
playwright_close
```

### Integration with Development Workflow

**During Development (Phase 1-2)**
- Test components as you build them
- Capture screenshots for documentation
- Verify design token usage
- Test interactive functionality

**Before Committing**
- Run QA testing checklist
- Capture visual regression baselines
- Test all viewport sizes
- Check console for errors

**During PR Review**
- Include screenshots in PR description
- Document tested user flows
- Note any accessibility considerations
- Attach Playwright test results

**Continuous Integration (Phase 5)**
- Automate Playwright tests in CI/CD pipeline
- Generate visual regression reports
- Block merges if tests fail
- Archive screenshots for historical comparison

### Best Practices

1. **Always test in non-headless mode first** to see what's happening
2. **Use data-testid attributes** for stable selectors (add to components)
3. **Wait for network idle** before screenshots (set timeout appropriately)
4. **Test all interactive states**: default, hover, active, focus, disabled, error
5. **Document viewport sizes** used for baseline screenshots
6. **Clear browser state** between tests (cookies, localStorage)
7. **Test with realistic data** that matches production scenarios
8. **Capture full page screenshots** for documentation and regression testing
9. **Check console logs** for warnings and errors after every test
10. **Use descriptive screenshot names** with component-state-viewport pattern

## Documentation Reference

### Must-Read Documents (By Phase)

**Before Starting (Phase 0):**
1. `docs/planning/sudokru_prd.md` - Product Requirements (MANDATORY FIRST READ)
2. `docs/technical/sudokru_trd.md` - Technical Requirements
3. `docs/planning/sudokru_mvp_matrix.md` - Feature prioritization
4. `docs/planning/sudokru_prototyping_roadmap.md` - Development phases

**Phase 1 (Frontend):** ✅
1. `docs/design/sudokru_figma_prompts.md` - Check FIRST before any UI
2. `docs/design/sudokru_style_guide.md` - Design tokens (ALWAYS use)
3. `docs/design/figma_make_prompt_guide.md` - Generate design prompts
4. `docs/design/sudokru_components.md` - Component specifications
5. `docs/design/sudokru_ui_components.md` - UI component library
6. `docs/technical/sudokru_frontend_architecture.md` - Project structure
7. `docs/development/sudokru_folder_structure.md` - File organization

**Phase 2 (API):** 🔄 Current
1. `docs/technical/sudokru_api_spec.md` - OpenAPI/Swagger spec
2. `docs/technical/sudokru_data_flow.md` - Data movement
3. `docs/user-experience/sudokru_user_journeys.md` - User flows
4. `docs/user-experience/sudokru_user_flows.md` - Detailed user flows
5. `docs/technical/sudokru_error_logging.md` - Error responses

**Phase 3 (Database):**
1. `docs/technical/sudokru_database_schema.md` - Complete Prisma schema
2. `docs/development/sudokru_environment.md` - Database connections
3. `docs/planning/sudokru_prd.md` - Validate business logic

**Phase 4 (Auth & Security):**
1. `docs/technical/sudokru_auth_authorization.md` - User roles and permissions
2. `docs/development/sudokru_environment.md` - Security configuration
3. Infrastructure security docs (pending creation)

**Phase 5 (Production):**
1. Infrastructure CI/CD docs (pending creation)
2. `docs/development/sudokru_environment.md` - Production config
3. `docs/planning/sudokru_mvp_matrix.md` - Validate completion

## Critical Rules

### Design & UI
**YOU MUST**:
- Check design documentation before implementing ANY UI component
- Use design tokens from `sudokru_style_guide.md` (never hardcode visual values)
- Follow Figma → Implementation workflow for all interfaces
- Reference `sudokru_figma_prompts.md` for existing designs
- Generate new prompts using `figma_make_prompt_guide.md` when needed

### Git & Version Control
**YOU MUST**:
- Never commit directly to `dev` or `main` branches
- Always create feature branches from `dev`
- Never push, merge, or create PR without explicit permission
- Follow conventional commit format: `type: description`
- Refer to `docs/development/git_guidelines.md` for complete workflow

### Code Quality
**YOU MUST**:
- Write TypeScript with strict typing (no `any` without justification)
- Use ES modules exclusively (no CommonJS)
- Keep functions small and focused (single responsibility)
- Add error boundaries for React components
- Validate all API inputs and handle errors properly
- Use Zustand for state management (no prop drilling)

### Documentation
**YOU MUST**:
- Read `sudokru_prd.md` before starting any new feature
- Consult phase-specific documents before implementing features
- Update CLAUDE.md when project structure or conventions change
- Keep documentation organized in `/docs` subdirectories

## AI Assistant Guidelines

### Context Management
- Scope conversations to single features when possible
- Use `/clear` or `/compact` commands if context becomes overloaded
- Reference specific documents using `@docs/path/to/file.md` syntax
- Ask clarifying questions if requirements are ambiguous

### Before Taking Action
**Always confirm with user before:**
- Making Git commits, pushes, or PR operations
- Installing new dependencies or packages
- Modifying database schema or running migrations
- Deleting files or making destructive changes
- Implementing UI without checking design docs

### Prompt Integration
When user asks for implementation:
1. First, review relevant documentation from `/docs`
2. Check design system if UI-related
3. Verify current development phase
4. Confirm understanding before coding
5. Implement following all conventions in this file
6. **If implementing from Figma design: AUTOMATICALLY launch Figma QA Validator subagent** (DO NOT wait for user to ask)

### Proactive Subagent Usage
**CRITICAL**: You MUST proactively launch the Figma QA Validator subagent in these scenarios:
- ✅ **After completing any Figma-based UI implementation** (component or page)
- ✅ **Before marking Figma implementation as complete**
- ✅ **After fixing issues and re-implementing from Figma**

**DO NOT:**
- ❌ Wait for user to explicitly request QA validation
- ❌ Skip validation because implementation "looks correct"
- ❌ Mark implementation complete without QA report

**How to Launch:**
```javascript
// Automatically use Task tool after Figma implementation
Task({
  subagent_type: "general-purpose",
  description: "Figma QA validation",
  prompt: "You are the Figma QA Validator subagent. Validate [component-name] at [url-path] against Figma design. Follow the exact workflow in CLAUDE.md under 'Figma QA Validator Subagent'. Use Figma MCP and Playwright MCP. Return complete QA report."
})
```

### Quality Checklist
Before marking any feature complete:
- [ ] Follows code style conventions
- [ ] Uses design tokens (if UI)
- [ ] Has proper error handling
- [ ] Includes appropriate tests (when applicable)
- [ ] Updates documentation if needed
- [ ] Validates against user journey maps
- [ ] **If Figma-based: Figma QA Validator subagent launched and QA report reviewed**
- [ ] **If Figma-based: All Critical and High priority issues from QA report fixed**

## Project-Specific Notes

### Sudokru Core Features
- **Real-time Multiplayer**: WebSocket integration required (Phase 2)
- **Game Modes**: Speed Race, Accuracy Challenge, Casual Play
- **Difficulty Levels**: Easy, Medium, Hard, Expert
- **Tournament System**: Single/Double Elimination, Round-Robin, Swiss
- **ELO Rating**: Skill-based matchmaking and ranking
- **Social Features**: Friends, chat, profiles, custom rooms

### Current State (Phase 1 Complete)
- ✅ Interactive Sudoku grid component fully functional
- ✅ Zustand stores: auth, game, UI state management
- ✅ Mock data for prototyping and development
- ✅ Responsive design with mobile support
- ✅ Dashboard, game pages, and navigation implemented
- ✅ Type definitions comprehensive and well-structured

### Next Priorities (Phase 2)
- WebSocket server setup for real-time communication
- API routes for game creation, joining, and moves
- Sudoku puzzle generation and validation logic
- User authentication with NextAuth.js
- Database integration preparation (Prisma setup)

### Environment Variables (Phase 2+)
```bash
# Database
DATABASE_URL="file:./dev.db"  # SQLite for development

# Authentication (Phase 4)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate-secure-secret]"

# WebSocket (Phase 2)
WEBSOCKET_SERVER_URL="http://localhost:3001"

# Production (Phase 5)
DATABASE_URL="postgresql://..."  # PostgreSQL for production
```

### Known Issues / Technical Debt
- None currently - Phase 1 complete and stable
- Hydration issues resolved in previous commits
- Ready for Phase 2 implementation

---

**Version**: 1.0
**Last Updated**: 2025-09-29
**Maintained By**: Sudokru Development Team

---

## Quick Start Reminder

1. **Read PRD first** - `docs/planning/sudokru_prd.md` - Understand what you're building
2. **Check current phase** - Phase 2 (API Layer) - Follow phase-specific documents
3. **Review design docs** - Before any UI implementation, check `sudokru_figma_prompts.md`
4. **Ask permission** - Before Git operations or destructive changes
5. **Use MCPs** - Leverage available tools for efficiency
6. **Stay organized** - Keep documentation in `/docs` subdirectories
7. **Follow conventions** - ES modules, TypeScript strict mode, design tokens only
- Never push to remote without my approval.