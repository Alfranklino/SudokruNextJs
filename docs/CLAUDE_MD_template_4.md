# CLAUDE.md Template v4.0
## Updated Context File Template with Playwright Integration

### Purpose
This template reflects the current state of CLAUDE.md for Sudokru, including Playwright testing setup and best practices learned during implementation.

### Key Updates from v3.0
1. **Playwright Integration**: Added local Playwright setup instead of MCP dependency
2. **Testing Strategy**: Clarified browser automation approach
3. **User Memory Integration**: Added user-specific preferences and constraints
4. **Practical Workflows**: Included real-world testing patterns

---

## Template Structure

```markdown
# CLAUDE.md - AI Assistant Project Context

## Project Overview
[2-3 sentences describing the project and its core purpose]

**Development Approach**: [Brief description of development methodology]
**Current Phase**: [Phase name and number]

## Tech Stack
- **Frontend**: [Framework, version, routing approach]
- **UI**: [UI library, styling solution]
- **State**: [State management library]
- **Database**: [Dev database], [Prod database], [ORM]
- **Real-time**: [Real-time communication solution]
- **Testing**: [Testing framework and approach]
- **Documentation**: [Documentation tools]

## Quick Reference

### Essential Documentation
**ALWAYS check these docs BEFORE implementation:**
- **[Document Type]**: `docs/[path]/[filename].md` ([Priority Level])
- **[Document Type]**: `docs/[path]/[filename].md` ([Priority Level])
- **[Document Type]**: `docs/[path]/[filename].md` ([Priority Level])
- **[Document Type]**: `docs/[path]/[filename].md` ([Priority Level])

### Documentation Map
```
docs/
├── development/     # [Brief description]
├── planning/        # [Brief description]
├── design/          # [Brief description]
├── technical/       # [Brief description]
└── user-experience/ # [Brief description]
```

See `docs/development/[folder-structure-doc].md` for complete project structure.

## Critical Rules

### Design & UI
- **NEVER** hardcode colors, spacing, or typography
- **ALWAYS** check `docs/design/[style-guide].md` first
- **ALWAYS** check `docs/design/[figma-prompts].md` for existing designs
- **MANDATORY**: Launch [QA Tool/Subagent] after [specific implementations]

### Git Workflow
- **NEVER** commit directly to `dev` or `main`
- **ALWAYS** use feature branches: `feat/`, `fix/`, `experimental/`, `test/`
- **NEVER** push, merge, or create PR without explicit permission
- Follow `docs/development/git_guidelines.md` exactly

### Code Quality
- ES Modules only (never CommonJS)
- TypeScript strict mode (no `any` without justification)
- Use design tokens from style guide
- [State management] for state (no prop drilling)

## Development Workflow

### Current Phase: [Phase Name and Number]
See `docs/development/[entry-guide].md` for detailed phase instructions.

**Key Documents for [Current Phase]:**
1. `docs/[category]/[doc1].md` - [Brief description]
2. `docs/[category]/[doc2].md` - [Brief description]
3. `docs/[category]/[doc3].md` - [Brief description]
4. `docs/[category]/[doc4].md` - [Brief description]

### Common Commands
```bash
[dev-command]              # Start dev server
[build-command]            # Production build
[lint-command]             # Run linter
[test-command]             # Run tests (if applicable)

# Git (ask permission first)
git checkout -b [type]/[feature-name]
git commit -m "[type]: [description]"
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **[MCP Name]**: [Purpose and use case]
- **[MCP Name]**: [Purpose and use case]
- **[MCP Name]**: [Purpose and use case]
- **[Other MCPs]**: [Brief list]

### Key MCP Workflows
- **[Workflow Name]**: [Brief workflow description]
- **[Workflow Name]**: [Brief workflow description]
- **[Workflow Name]**: [Brief workflow description]

### Important Notes
- **[Tool] MCP Limitations**: [Known issues or constraints]
- **Preferred Approach**: [When to use local tools vs MCP]

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
- **Visual Testing**: Compare Figma vs live implementation
- **Interaction Testing**: Test all interactive elements
- **Responsive Testing**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)
- **Accessibility**: Keyboard nav, ARIA labels, semantic HTML
- **Performance**: Console errors, load times, animations
- **Screenshot Capture**: Full page or element-specific

### Sample Test Script
```typescript
import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test('[test description]', async ({ page }) => {
  await page.goto('http://localhost:[port]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '[screenshot-name].png', fullPage: true });
});
```

### QA Checklist (Before marking complete)
- [ ] Matches design specifications
- [ ] Uses design tokens (no hardcoded values)
- [ ] Responsive at all breakpoints
- [ ] All interactive elements work
- [ ] Keyboard navigation works
- [ ] No console errors/warnings
- [ ] **[Critical QA step with emphasis]**

## Specialized Subagents

### [Subagent Name]
**Purpose**: [1-2 sentence description]

**When to Trigger ([MANDATORY/OPTIONAL])**:
- [Trigger condition 1]
- [Trigger condition 2]

**Launch Command**:
```javascript
Task({
  subagent_type: "[type]",
  description: "[brief description]",
  prompt: "[concise prompt with placeholders]"
})
```

**Full workflow details**: See `docs/[workflow-doc].md` or ask for [subagent] steps.

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
- [Other critical actions]

### Implementation Workflow
1. Review relevant docs from `/docs`
2. Check design system if UI-related
3. Verify current development phase
4. Confirm understanding before coding
5. **[Critical step with emphasis]**

### Quality Checklist
- [ ] Follows code style conventions
- [ ] Uses design tokens (if UI)
- [ ] Has proper error handling
- [ ] Updates documentation if needed
- [ ] **[Critical quality check]**

## Project Status

### Completed ([Phase Name])
✅ [Completed feature 1]
✅ [Completed feature 2]
✅ [Completed feature 3]
✅ [Completed feature 4]
✅ [Completed feature 5]

### Next Priorities ([Phase Name])
- [Priority item 1]
- [Priority item 2]
- [Priority item 3]
- [Priority item 4]
- [Priority item 5]

---

**Version**: [X.X]
**Last Updated**: [YYYY-MM-DD]
**Maintained By**: [Team/Person Name]

---

## Quick Start Reminder
1. Read `docs/[category]/[prd-or-main-doc].md` first
2. Check `docs/design/[design-doc].md` before UI work
3. Use design tokens from `docs/design/[style-guide].md`
4. Follow `docs/development/git_guidelines.md` for commits
5. Ask permission before Git operations
6. [Critical project-specific reminder]

## User Memory Integration

### User Preferences (from user-memory)
Add user-specific preferences and constraints here:

- [User preference 1]
- [User preference 2]
- [User preference 3]

### Example User Memory Entries
```markdown
- Never push a branch to remote without expressly asking for permission.
- REMEMBER: Always run the app on port [port]. If in use, kill the process on it and restart the app. Do not use a new port.
```
```

---

## Implementation Notes for Sudokru

### What Changed from Template v3.0

#### 1. Playwright Testing Section Enhanced
**Before (v3.0)**:
```markdown
### Playwright Testing
- Visual Testing: Compare Figma vs live implementation
- Interaction Testing: Test all interactive elements
```

**After (v4.0)**:
```markdown
### Playwright Testing Setup

**Local Playwright Installation (Preferred Method)**:
[Detailed installation and usage commands]

**Why Local Playwright > Playwright MCP:**
[5-6 bullet points explaining advantages]

### Sample Test Script
[Complete working example]
```

**Rationale**:
- Discovered Playwright MCP has browser installation issues
- Local Playwright is more reliable and provides better control
- Developers need concrete examples, not just concepts

#### 2. Testing Capabilities Expanded
Added specific viewport sizes, testing types, and screenshot capabilities based on actual implementation experience.

#### 3. User Memory Integration Section
New section to capture user-specific preferences and constraints that should be remembered across sessions.

**Example from Sudokru**:
- Never push without permission (user constraint)
- Always use port 3000 (project constraint)

#### 4. Branch Naming Convention Updated
Added `test/` prefix to feature branch types:
```markdown
- **ALWAYS** use feature branches: `feat/`, `fix/`, `experimental/`, `test/`
```

This accommodates testing-focused branches like `test/playwright`.

#### 5. Project Status - Testing Added
**Updated**:
```markdown
### Completed (Phase 1)
✅ Interactive Sudoku grid
✅ Zustand state management
✅ Responsive design
✅ Dashboard and navigation
✅ Type definitions
✅ Playwright testing setup (local)
```

#### 6. Common Commands - Testing Added
```markdown
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run lint             # Run ESLint
npx playwright test      # Run Playwright tests
```

---

## Migration Guide: v3.0 → v4.0

### For Existing Projects

1. **Add Playwright Section** (if using Playwright):
   - Install `@playwright/test` as dependency
   - Add browser installation instructions
   - Include sample test script
   - Explain local vs MCP approach

2. **Add User Memory Section**:
   - Review conversation history for user preferences
   - Document project-specific constraints
   - Add user workflow preferences

3. **Update Branch Types**:
   - Add `test/` to feature branch naming conventions

4. **Enhance Testing Documentation**:
   - Be specific about viewport sizes
   - List actual testing capabilities used
   - Provide working code examples

5. **Update Project Status**:
   - Add testing setup to completed items
   - Include testing dependencies

### Size Impact
- v3.0 Target: ~10KB
- v4.0 Target: ~12-15KB (additional testing detail justified by practical value)

---

## Lessons Learned (Sudokru Implementation)

### What Worked Well
✅ **Reference-based approach**: Kept CLAUDE.md concise while maintaining comprehensive coverage
✅ **Clear documentation map**: Easy to find detailed information
✅ **Critical rules emphasis**: NEVER/ALWAYS rules prevent common mistakes
✅ **Phase-based organization**: Clear guidance on current priorities

### What Needed Improvement
⚠️ **MCP assumptions**: Template assumed MCPs work perfectly; reality showed limitations
⚠️ **Testing details**: Needed more concrete examples and installation steps
⚠️ **User preferences**: No place to document user-specific workflows

### Best Practices Moving Forward
1. **Test your tools**: Don't assume MCPs work until verified
2. **Prefer local installations**: More reliable than external servers
3. **Include working examples**: Especially for complex tools like Playwright
4. **Document user preferences**: Capture constraints as you learn them
5. **Update project status regularly**: Keep completed/next items current

---

## Version History

### v4.0 (2025-10-01)
- Added comprehensive Playwright testing section
- Included local vs MCP comparison
- Added user memory integration section
- Enhanced with working code examples
- Added `test/` branch naming convention
- Documented lessons learned from Sudokru implementation

### v3.0 (2025-09-30)
- Initial template creation
- Reference-based approach
- ~10KB target size
- Documentation-first strategy

---

## Related Documents
- See `docs/development/sudokru_folder_structure.md` for documentation organization
- See `docs/development/git_guidelines.md` for version control workflow
- See `docs/development/claude_code_entry_guide.md` for AI assistant onboarding
- See `docs/testing/playwright_guide.md` for comprehensive Playwright documentation (create if needed)

---

**Template Maintained By**: Sudokru Development Team
**License**: MIT (adapt freely for your projects)
**Based On**: Real-world implementation experience with Claude Code and Playwright
