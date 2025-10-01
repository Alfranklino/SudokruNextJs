# CLAUDE.md - AI Assistant Project Context

## Project Overview
Sudokru is a modern, multiplayer Sudoku gaming platform combining competitive gaming with social connectivity.

**Development Approach**: Frontend-first prototyping with structured documentation
**Current Phase**: Phase 2 (API Layer Development)

## Tech Stack
- **Frontend**: Next.js 15.5.4, TypeScript, App Router
- **UI**: Tailwind CSS v4 + shadcn/ui
- **State**: Zustand
- **Database**: SQLite (dev), PostgreSQL (prod), Prisma ORM
- **Real-time**: Socket.io
- **Testing**: Playwright (local installation)
- **Documentation**: Context7 MCP

## Quick Reference

### Essential Documentation
**ALWAYS check these docs BEFORE implementation:**
- **Product Requirements**: `docs/planning/sudokru_prd.md` (MANDATORY FIRST READ)
- **Design System**: `docs/design/sudokru_style_guide.md` (NEVER hardcode colors/spacing)
- **Figma Designs**: `docs/design/sudokru_figma_prompts.md` (Check before any UI work)
- **Git Workflow**: `docs/development/git_guidelines.md` (Required for all commits)

### Documentation Map
```
docs/
├── development/     # Workflows, git, environment setup
├── planning/        # PRD, MVP matrix, roadmap
├── design/          # Style guide, Figma prompts, components
├── technical/       # API spec, database schema, architecture
└── user-experience/ # User journeys, flows
```

See `docs/development/sudokru_folder_structure.md` for complete project structure.

## Critical Rules

### Design & UI
- **NEVER** hardcode colors, spacing, or typography
- **ALWAYS** check `docs/design/sudokru_style_guide.md` first
- **ALWAYS** check `docs/design/sudokru_figma_prompts.md` for existing designs
- **MANDATORY**: Launch Figma QA Validator subagent after Figma implementations

### Git Workflow
- **NEVER** commit directly to `dev` or `main`
- **ALWAYS** use feature branches: `feat/`, `fix/`, `experimental/`, `test/`
- **NEVER** push, merge, or create PR without explicit permission
- Follow `docs/development/git_guidelines.md` exactly

### Code Quality
- ES Modules only (never CommonJS)
- TypeScript strict mode (no `any` without justification)
- Use design tokens from style guide
- Zustand for state management (no prop drilling)

## Development Workflow

### Current Phase: Phase 2 (API Layer)
See `docs/development/claude_code_entry_guide.md` for detailed phase instructions.

**Key Documents for Phase 2:**
1. `docs/technical/sudokru_api_spec.md` - OpenAPI specification
2. `docs/technical/sudokru_data_flow.md` - Data movement
3. `docs/user-experience/sudokru_user_journeys.md` - User flows
4. `docs/technical/sudokru_error_logging.md` - Error handling

### Common Commands
```bash
npm run dev                        # Start dev server (Turbopack)
npm run build                      # Production build
npm run lint                       # Run ESLint
npx playwright test --headed       # Run Playwright tests (visible browser)

# Git (ask permission first)
git checkout -b feat/feature-name
git commit -m "type: description"
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **Figma MCP**: Pixel-perfect implementation from designs
- **Context7 MCP**: Up-to-date library documentation
- **File System, Package Manager, Database, Git, IDE MCPs**

### Key MCP Workflows
- **UI Implementation**: Use Figma MCP → Implement → **Launch Figma QA Validator**
- **Documentation**: Use Context7 MCP for current library docs

### Important Notes
- **Playwright**: Use local installation (`@playwright/test`) instead of Playwright MCP for better control and reliability

## Specialized Subagents

### Figma QA Validator Subagent
**Purpose**: Automatically validate UI implementations against Figma designs.

**When to Trigger (MANDATORY)**:
- ✅ After completing any Figma-based UI implementation
- ✅ Before marking Figma implementation complete

**Launch Command**:
```javascript
Task({
  subagent_type: "general-purpose",
  description: "Figma QA validation",
  prompt: "Validate [component-name] at [url-path] against Figma design. Follow CLAUDE.md Figma QA Validator workflow. Use Figma MCP and Playwright MCP. Return complete QA report."
})
```

**Full workflow details**: See `CLAUDE.md` archive or ask for Figma QA validation steps.

## Testing & QA

### Playwright Testing Setup

**Local Playwright Installation (Preferred Method)**:
```bash
# Install Playwright as project dependency
npm install @playwright/test

# Install browsers for local Playwright
npx playwright install chromium

# Run tests with visible browser
npx playwright test [test-file] --headed
```

**Why Local Playwright > Playwright MCP:**
- ✅ Full control over test scripts and configuration
- ✅ Repeatable tests saved in codebase
- ✅ CI/CD integration ready
- ✅ Better error messages and debugging
- ✅ No dependency on external MCP server
- ✅ Version controlled alongside code

### Testing Capabilities
- **Visual Testing**: Compare Figma vs live implementation, screenshot capture
- **Interaction Testing**: Test all interactive elements (click, fill, hover, keyboard)
- **Responsive Testing**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)
- **Accessibility**: Keyboard nav, ARIA labels, semantic HTML
- **Performance**: Console errors, load times, animations

### Sample Test Script
```typescript
import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test('launch browser and navigate to app', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
});
```

### QA Checklist (Before marking complete)
- [ ] Matches Figma design pixel-perfectly
- [ ] Uses design tokens (no hardcoded values)
- [ ] Responsive at all breakpoints
- [ ] All interactive elements work
- [ ] Keyboard navigation works
- [ ] No console errors/warnings
- [ ] **Figma QA Validator launched (if Figma-based)**

## AI Assistant Guidelines

### Context Management
- Reference docs using `@docs/path/to/file.md`
- Use `/clear` if context overloaded
- Ask clarifying questions if ambiguous

### Before Taking Action (ASK PERMISSION)
- Git commits, pushes, or PR operations
- Installing dependencies
- Database schema changes
- Deleting files
- Implementing UI without checking design docs

### Implementation Workflow
1. Review relevant docs from `/docs`
2. Check design system if UI-related
3. Verify current development phase
4. Confirm understanding before coding
5. **If Figma-based: Launch Figma QA Validator after implementation**

### Quality Checklist
- [ ] Follows code style conventions
- [ ] Uses design tokens (if UI)
- [ ] Has proper error handling
- [ ] Updates documentation if needed
- [ ] **Figma QA report reviewed and critical issues fixed (if applicable)**

## Project Status

### Completed (Phase 1)
✅ Interactive Sudoku grid
✅ Zustand state management
✅ Responsive design
✅ Dashboard and navigation
✅ Type definitions
✅ Playwright testing setup (local)

### Next Priorities (Phase 2)
- WebSocket server setup
- API routes (Next.js)
- Sudoku puzzle generation
- Authentication (NextAuth.js)
- Database integration (Prisma)

---

**Version**: 2.1
**Last Updated**: 2025-10-01
**Maintained By**: Sudokru Development Team

---

## Quick Start Reminder
1. Read `docs/planning/sudokru_prd.md` first
2. Check `docs/design/sudokru_figma_prompts.md` before UI work
3. Use design tokens from `docs/design/sudokru_style_guide.md`
4. Follow `docs/development/git_guidelines.md` for commits
5. Ask permission before Git operations
6. Launch Figma QA Validator after Figma implementations
- Never push a branch to remote without expressly asking for permission.
- REMEMBER: Always run the app on port 3000. If in use, kill the process on it and restart the app. Do not use a new port.