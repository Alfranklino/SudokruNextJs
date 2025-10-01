# CLAUDE.md Template v5.0
## Enhanced Context File with Custom Slash Commands

### Purpose
This template builds on v3.0 by adding custom slash commands setup as a critical first step for new projects. Commands streamline common workflows and reduce repetitive tasks.

### Key Enhancements from v4.0
1. **Custom Slash Commands**: Added mandatory setup section
2. **Project-Specific Workflows**: Commands tailored to project needs
3. **Command Templates**: Reusable command definitions for new projects
4. **Permission Management**: Clear guidance on which commands need approval

### Migration from v3.0 → v5.0
- Added: "CRITICAL: Setup Custom Slash Commands" section in Development Workflow
- Added: Command template examples
- Added: `.claude/commands/` directory structure
- Updated: Version from 2.1 to match template

---

## What's New in v5.0

### Custom Slash Commands Section

Every new project should start with these custom commands in `.claude/commands/`:

1. **`/commit`** - Quick commit without asking permission
2. **`/merge-dev`** - Complete merge workflow with auto-push
3. **`/restart`** - Kill port and restart dev server
4. **`/clean`** - Clean test artifacts and screenshots
5. **`/restore`** - Restore branch to last commit (with confirmation)

### Command Structure

Each command is a JSON file in `.claude/commands/`:

```json
{
  "name": "command-name",
  "description": "Short description shown in command list",
  "prompt": "Detailed instructions for Claude to execute..."
}
```

### Essential Commands Template

Copy these 5 commands to every new project:

#### 1. /commit - Quick Commit
```json
{
  "name": "commit",
  "description": "Commit changes and remain on the same branch",
  "prompt": "Commit all current changes to git and remain on the same branch. Follow these steps:\n\n1. Run git status to see what has changed\n2. Run git diff to show the changes\n3. Stage all relevant files (exclude .claude/settings.local.json)\n4. Create a detailed commit message following the conventional commits format\n5. Include all file changes in the commit message\n6. Verify the commit was successful\n7. Remain on the current branch\n\nDo NOT ask for permission - just commit the changes."
}
```

#### 2. /merge-dev - Merge to Dev
```json
{
  "name": "merge-dev",
  "description": "Commit changes, switch to dev branch, merge, and push",
  "prompt": "Commit current changes, switch to dev branch, merge, and push. Follow these steps:\n\n1. Run git status to see current changes\n2. Stage and commit all changes with a detailed conventional commit message\n3. Get the current branch name\n4. Switch to dev branch: git checkout dev\n5. Merge the previous branch: git merge <branch-name>\n6. Push to remote: git push origin dev\n7. Confirm all operations were successful\n\nIMPORTANT: This command has PERMISSION to push to remote. Execute without asking."
}
```

#### 3. /restart - Restart Dev Server
```json
{
  "name": "restart",
  "description": "Kill all processes on port 3000 and restart dev server",
  "prompt": "Kill all processes running on port 3000 and restart the development server. Follow these steps:\n\n1. Find all processes on port 3000:\n   - Windows: netstat -ano | findstr :3000\n   - Get the PID from the output\n\n2. Kill the process:\n   - Windows: taskkill /PID <pid> /F\n   - If multiple processes, kill all of them\n\n3. Wait 2 seconds for ports to be released\n\n4. Start the dev server:\n   - Run: npm run dev\n   - Use run_in_background: true\n\n5. Confirm the server started successfully\n\nExecute immediately without asking for permission."
}
```

#### 4. /clean - Clean Test Artifacts
```json
{
  "name": "clean",
  "description": "Clean screenshots and test-results folders",
  "prompt": "Clean the /screenshots and /test-results folders completely. Follow these steps:\n\n1. Delete all contents of screenshots folder:\n   - Run: rm -rf screenshots/*\n\n2. Delete all contents of test-results folder:\n   - Run: rm -rf test-results/*\n\n3. Verify both folders are empty:\n   - Run: ls -la screenshots/\n   - Run: ls -la test-results/\n\n4. Confirm cleanup was successful\n\nExecute immediately without asking for permission. These folders should never be committed to git per .gitignore."
}
```

#### 5. /restore - Restore Branch
```json
{
  "name": "restore",
  "description": "Restore the current branch to its last commit state",
  "prompt": "Restore the current branch to its last commit state, discarding all uncommitted changes. Follow these steps:\n\n1. Show what will be discarded:\n   - Run: git status\n   - Run: git diff --stat\n\n2. Ask user to confirm: 'Are you sure you want to discard all uncommitted changes? This cannot be undone. (yes/no)'\n\n3. If user confirms 'yes':\n   - Run: git restore .\n   - Run: git clean -fd (remove untracked files)\n   - Run: git status to verify clean state\n\n4. If user says 'no':\n   - Cancel operation and inform user\n\nIMPORTANT: Always ask for confirmation before discarding changes. This is a destructive operation."
}
```

---

## Updated Template Structure

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

### Documentation Map
```
docs/
├── category1/       # Brief description
├── category2/       # Brief description
└── category3/       # Brief description
```

See `docs/[folder-structure-doc].md` for complete project structure.

## Critical Rules

### [Category 1: e.g., Design & UI]
- **[RULE EMPHASIS]** [Rule description]

### [Category 2: e.g., Git Workflow]
- **[RULE EMPHASIS]** [Rule description]
- Follow `docs/[workflow-doc].md` exactly

### [Category 3: e.g., Code Quality]
- [Concise code standards]

## Development Workflow

### CRITICAL: Setup Custom Slash Commands (First Time Setup)

**⚠️ IMPORTANT: Create these custom commands at the start of EVERY new project!**

Custom slash commands are stored in `.claude/commands/` and provide quick access to common workflows. Create these essential commands:

**Required Commands:**

1. **`/commit`** - Commit changes and remain on same branch
2. **`/merge-dev`** - Commit, switch to dev, merge, and push
3. **`/restart`** - Kill port 3000 and restart dev server
4. **`/clean`** - Clean screenshots and test-results folders
5. **`/restore`** - Restore branch to last commit (asks confirmation)

**How to create:**
```bash
mkdir -p .claude/commands
# Then create JSON files for each command (see template in docs)
```

**Command Template Example:**
```json
{
  "name": "commit",
  "description": "Commit changes and remain on the same branch",
  "prompt": "Commit all current changes following conventional commits..."
}
```

**See**: Check this project's `.claude/commands/` for complete examples to copy to new projects.

---

### Current Phase: [Phase Name]
See `docs/[phase-guide].md` for detailed phase instructions.

**Key Documents for [Current Phase]:**
1. `docs/[doc1].md` - [Brief description]
2. `docs/[doc2].md` - [Brief description]

### Common Commands
```bash
[command]              # [Description]

# Git (ask permission first, unless using /commit or /merge-dev)
[command]              # [Description]
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **[MCP Name]**: [Purpose]

### Key MCP Workflows
- **[Workflow Name]**: [Brief workflow description]

## Testing & QA

### [Testing Tool] Setup
[Brief setup instructions]

### QA Checklist (Before marking complete)
- [ ] [Checklist item]

## AI Assistant Guidelines

### Context Management
- Reference docs using `@docs/path/to/file.md`
- Use `/clear` if context overloaded

### Before Taking Action (ASK PERMISSION)
- Git pushes or PR operations (unless using `/merge-dev`)
- Installing dependencies
- Database schema changes
- Deleting files

### Implementation Workflow
1. Review relevant docs
2. Check design system if UI-related
3. Confirm understanding before coding

## Project Status

### Completed
✅ [Feature]

### Next Priorities
- [Priority item]

---

**Version**: [X.X matching template version]
**Last Updated**: [Date]
**Maintained By**: [Team Name]

---

## Quick Start Reminder
1. **FIRST**: Setup custom slash commands in `.claude/commands/`
2. Read project documentation
3. Check design system
4. Follow git workflow
5. Ask permission before destructive operations
```

---

## Implementation Checklist

When starting a new project with this template:

- [ ] Create `.claude/commands/` directory
- [ ] Copy all 5 command JSON files from existing project
- [ ] Update CLAUDE.md with custom commands section
- [ ] Test `/commit` command
- [ ] Test `/restart` command
- [ ] Verify commands appear in Claude Code command palette
- [ ] Document any project-specific custom commands

---

## Command Best Practices

### When to Create Custom Commands

**✅ Create commands for:**
- Repetitive multi-step workflows
- Operations that should bypass permission checks
- Project-specific testing or deployment steps
- Common troubleshooting tasks (restart server, clean cache)

**❌ Don't create commands for:**
- Single-line bash commands (just type them)
- Operations that need user input mid-execution
- Rarely-used workflows

### Command Naming Conventions

- Use kebab-case: `/merge-dev` not `/mergeDev`
- Be concise: `/commit` not `/commit-changes-to-git`
- Be descriptive: `/restart` not `/r`
- Group related commands: `/test-unit`, `/test-e2e`, `/test-all`

### Permission Levels

**No Permission Needed:**
- `/commit` - Safe, reversible operation
- `/clean` - Cleans non-critical folders
- `/restart` - Restarts local dev server

**Has Permission Built-In:**
- `/merge-dev` - Explicitly granted push permission

**Always Ask:**
- `/restore` - Destructive, cannot be undone

---

## Version History

### v5.0 (Current)
- Added custom slash commands setup as critical first step
- Included 5 essential command templates
- Added command best practices and guidelines
- Updated implementation checklist

### v4.0
- Added Playwright testing section
- Added user memory integration notes
- Enhanced testing workflows

### v3.0
- Introduced reference-based approach
- Added documentation map
- Streamlined to <40KB target

---

**Template Maintained By**: Sudokru Development Team
**For**: Claude Code AI Assistant Context Files
