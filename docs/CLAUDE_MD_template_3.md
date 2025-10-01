# CLAUDE.md Template v3.0
## Streamlined Context File for AI Assistants

### Purpose
This template provides a streamlined, reference-based approach to project context files, keeping the main CLAUDE.md under 40KB while maintaining comprehensive coverage by pointing to detailed documentation.

### Key Principles
1. **Reference, Don't Duplicate**: Point to docs instead of copying content
2. **Essential Only**: Include only critical information in main file
3. **Clear Hierarchy**: Organize by importance and frequency of use
4. **Quick Access**: Provide fast paths to detailed documentation

---

## Template Structure

```markdown
# CLAUDE.md - AI Assistant Project Context

## Project Overview
[2-3 sentences describing the project]

**Development Approach**: [Brief description]
**Current Phase**: [Current phase name and status]

## Tech Stack
- **Frontend**: [Framework, version, key tools]
- **UI**: [UI library, styling approach]
- **State**: [State management solution]
- **Database**: [Dev and prod databases]
- **Real-time**: [Real-time solution if applicable]
- **Testing**: [Testing tools]
- **Documentation**: [Documentation tools]

## Quick Reference

### Essential Documentation
**ALWAYS check these docs BEFORE implementation:**
- **[Document Purpose]**: `docs/category/filename.md` (Priority label)
- **[Document Purpose]**: `docs/category/filename.md` (Priority label)
- **[Document Purpose]**: `docs/category/filename.md` (Priority label)

### Documentation Map
```
docs/
├── category1/       # Brief description
├── category2/       # Brief description
├── category3/       # Brief description
└── category4/       # Brief description
```

See `docs/[folder-structure-doc].md` for complete project structure.

## Critical Rules

### [Category 1: e.g., Design & UI]
- **[RULE EMPHASIS]** [Rule description]
- **[RULE EMPHASIS]** [Rule description]
- **[RULE EMPHASIS]** [Rule description]

### [Category 2: e.g., Git Workflow]
- **[RULE EMPHASIS]** [Rule description]
- **[RULE EMPHASIS]** [Rule description]
- Follow `docs/[workflow-doc].md` exactly

### [Category 3: e.g., Code Quality]
- [Concise code standards]
- [Key architectural decisions]
- [Required patterns]

## Development Workflow

### Current Phase: [Phase Name]
See `docs/[phase-guide].md` for detailed phase instructions.

**Key Documents for [Current Phase]:**
1. `docs/[doc1].md` - [Brief description]
2. `docs/[doc2].md` - [Brief description]
3. `docs/[doc3].md` - [Brief description]

### Common Commands
```bash
[command]              # [Description]
[command]              # [Description]

# [Category] (permission required)
[command]              # [Description]
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **[MCP Name]**: [Purpose]
- **[MCP Name]**: [Purpose]
- **[MCP Name]**: [Purpose]

### Key MCP Workflows
- **[Workflow Name]**: [Brief workflow description]
- **[Workflow Name]**: [Brief workflow description]

## Specialized Subagents

### [Subagent Name]
**Purpose**: [1 sentence description]

**When to Trigger ([MANDATORY/OPTIONAL])**:
- [Trigger condition 1]
- [Trigger condition 2]

**Launch Command**:
```javascript
Task({
  subagent_type: "[type]",
  description: "[brief]",
  prompt: "[concise prompt with placeholders]"
})
```

**Full workflow details**: See `docs/[detailed-workflow].md` or ask for [subagent] steps.

## Testing & QA

### [Testing Tool] Testing
- **[Test Type 1]**: [Brief description]
- **[Test Type 2]**: [Brief description]
- **[Test Type 3]**: [Brief description]

### QA Checklist (Before marking complete)
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]
- [ ] **[Critical requirement with emphasis]**

## AI Assistant Guidelines

### Context Management
- Reference docs using `@docs/path/to/file.md`
- Use `/[command]` if [situation]
- [Other context management tips]

### Before Taking Action (ASK PERMISSION)
- [Action requiring permission 1]
- [Action requiring permission 2]
- [Action requiring permission 3]

### Implementation Workflow
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. **[Critical step with emphasis]**

### Quality Checklist
- [ ] [Quality check 1]
- [ ] [Quality check 2]
- [ ] **[Critical quality check]**

## Project Status

### Completed ([Phase Name])
✅ [Completed item 1]
✅ [Completed item 2]
✅ [Completed item 3]

### Next Priorities ([Phase Name])
- [Priority 1]
- [Priority 2]
- [Priority 3]

---

**Version**: [X.X]
**Last Updated**: [YYYY-MM-DD]
**Maintained By**: [Team/Person]

---

## Quick Start Reminder
1. [Quick start step 1]
2. [Quick start step 2]
3. [Quick start step 3]
4. [Critical reminder]
```

---

## Usage Guidelines

### When to Use This Template
- Starting new projects with AI assistant integration
- Refactoring existing CLAUDE.md files that exceed 40KB
- Creating standardized onboarding for AI assistants

### Customization Points
1. **Project Overview**: Adapt to project type and domain
2. **Tech Stack**: List actual technologies used
3. **Critical Rules**: Highlight project-specific constraints
4. **Documentation Map**: Match actual docs folder structure
5. **MCPs & Subagents**: Include only available/relevant tools

### Size Management
- **Target**: Keep under 10KB (approximately 200 lines)
- **Method**: Link to detailed docs instead of inline content
- **Validation**: Check file size regularly, refactor if growing

### Maintenance
- Update version number on structural changes
- Update "Last Updated" date on any change
- Keep "Current Phase" synchronized with project status
- Review quarterly for relevance and accuracy

---

## Benefits of This Approach

### For AI Assistants
✅ Faster context loading and parsing
✅ Clear hierarchy of information importance
✅ Explicit pointers to detailed documentation
✅ Reduced token usage in context window

### For Development Teams
✅ Single source of truth (docs directory)
✅ Easier to maintain and update
✅ Better separation of concerns
✅ Scalable as project grows

### For New Contributors
✅ Quick orientation to project essentials
✅ Clear paths to deeper information
✅ Consistent structure across projects
✅ Lower cognitive load for onboarding

---

## Example Reduction Strategy

### Before (Traditional Approach)
```markdown
## Playwright UI Design Testing & QA

### Overview
Playwright MCP integration enables automated UI testing, design validation, and quality assurance for [Project]. Use Playwright to verify pixel-perfect implementations against Figma designs, conduct visual regression testing, and automate user flow validation.

### Available Playwright MCP Tools

#### Navigation & Setup
- **`playwright_navigate`**: Navigate to URL with browser configuration
  - Parameters: `url`, `browserType` (chromium/firefox/webkit), `headless`, `width`, `height`, `timeout`
  - Example: Navigate to localhost:3000 with 1920x1080 viewport

[... 400+ lines of detailed Playwright documentation ...]
```

### After (Template v3.0 Approach)
```markdown
## Testing & QA

### Playwright Testing
- **Visual Testing**: Compare Figma vs live implementation
- **Interaction Testing**: Test all interactive elements
- **Responsive Testing**: Mobile, Tablet, Desktop viewports
- **Accessibility**: Keyboard nav, ARIA labels, semantic HTML

**Full Playwright workflow**: See `docs/testing/playwright_guide.md`
```

**Result**: Reduced from 400+ lines to ~10 lines (97.5% reduction)

---

## Migration Checklist

When converting existing CLAUDE.md to this template:

### Preparation
- [ ] Read current CLAUDE.md completely
- [ ] Identify duplicate content (already in docs)
- [ ] Identify truly essential vs. nice-to-have content
- [ ] Create missing docs for critical workflows

### Content Migration
- [ ] Extract detailed workflows to docs directory
- [ ] Extract MCP tool catalogs to docs/development/
- [ ] Extract testing procedures to docs/testing/
- [ ] Extract code conventions to docs/development/

### Template Population
- [ ] Fill in Project Overview (2-3 sentences)
- [ ] List Tech Stack concisely
- [ ] Create Quick Reference section
- [ ] Document Critical Rules (5-7 max)
- [ ] Add Current Phase and key docs
- [ ] Include MCP workflows (high-level only)
- [ ] Add Subagent launch commands (no detailed steps)
- [ ] Create concise QA checklist

### Validation
- [ ] File size under 40KB (ideally under 10KB)
- [ ] All essential links working
- [ ] No duplicate content with docs
- [ ] Clear pointers to detailed documentation
- [ ] Version number and date updated

### Post-Migration
- [ ] Archive old CLAUDE.md as CLAUDE_v1_archive.md
- [ ] Update documentation references in other files
- [ ] Test with AI assistant for clarity
- [ ] Gather team feedback

---

## Version History

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

---

**Template Maintained By**: Sudokru Development Team
**License**: MIT (adapt freely for your projects)
