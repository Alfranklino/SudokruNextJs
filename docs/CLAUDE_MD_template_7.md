# CLAUDE.md Template v7.0
## All New Custom Slash Commands Added

### Purpose
This template updates v6.0 by documenting all 8 custom slash commands now available in the Sudokru project.

### Key Changes from v6.0 → v7.0
1. **Commands List**: Updated from 5 to 8 total commands
2. **New Commands**: Added `/new-branch`, `/inspect`, `/update-claude-md`
3. **Command Details**: Added dedicated section explaining new commands
4. **Project Status**: Updated to reflect 8 custom slash commands
5. **Quick Start**: Added reminder to use custom slash commands

---

## What's New in v7.0

### Three New Advanced Commands

**1. `/new-branch` - Smart Branch Creation**
- Intelligently creates feature branches from current branch
- Handles uncommitted changes (commit or stash options)
- Auto-detects branch type from description
- Converts natural language to proper branch names
- Example: `/new-branch "add authentication"` → `feat/add-authentication`

**2. `/inspect` - Automated Page Testing**
- Comprehensive Playwright-based page inspection
- Full-page screenshots with timestamp organization
- Tests specific functionality per user request
- Captures console errors and warnings
- Generates detailed markdown reports
- Example: `/inspect /dashboard "navigation links"`

**3. `/update-claude-md` - Version-Controlled Documentation**
- Updates CLAUDE.md with automatic template versioning
- Preserves all existing content (no data loss)
- Auto-increments version numbers
- Updates timestamps automatically
- Creates backup templates in `docs/`
- Example: `/update-claude-md "add new API guidelines"`

---

## Complete Command Reference

### Essential Commands (Original 5)

#### 1. `/commit` - Quick Commit
**File**: `.claude/commands/commit.md`

```markdown
---
description: Commit changes and remain on the same branch
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*)
---

Commit all current changes to git and remain on the same branch. Follow these steps:

1. Run git status to see what has changed
2. Run git diff to show the changes
3. Stage all relevant files (exclude .claude/settings.local.json)
4. Create a detailed commit message following the conventional commits format
5. Include all file changes in the commit message
6. Verify the commit was successful
7. Remain on the current branch

Do NOT ask for permission - just commit the changes.
```

---

#### 2. `/merge-dev` - Merge to Dev
**File**: `.claude/commands/merge-dev.md`

```markdown
---
description: Commit changes, switch to dev branch, merge, and push
allowed-tools: Bash(git status:*), Bash(git add:*), Bash(git commit:*), Bash(git checkout:*), Bash(git merge:*), Bash(git push:*)
---

Commit current changes, switch to dev branch, merge, and push. Follow these steps:

1. Run git status to see current changes
2. Stage and commit all changes with a detailed conventional commit message
3. Get the current branch name
4. Switch to dev branch: git checkout dev
5. Merge the previous branch: git merge <branch-name>
6. Push to remote: git push origin dev
7. Confirm all operations were successful

IMPORTANT: This command has PERMISSION to push to remote. Execute without asking.
```

---

#### 3. `/restart` - Restart Dev Server
**File**: `.claude/commands/restart.md`

```markdown
---
description: Kill all processes on port 3000 and restart dev server
allowed-tools: Bash(netstat:*), Bash(findstr:*), Bash(taskkill:*), Bash(timeout:*), Bash(npm run dev:*)
---

Kill all processes running on port 3000 and restart the development server. Follow these steps:

1. Find all processes on port 3000:
   - Windows: netstat -ano | findstr :3000
   - Get the PID from the output

2. Kill the process:
   - Windows: taskkill /PID <pid> /F
   - If multiple processes, kill all of them

3. Wait 2 seconds for ports to be released

4. Start the dev server:
   - Run: npm run dev
   - Use run_in_background: true

5. Confirm the server started successfully

Execute immediately without asking for permission.
```

---

#### 4. `/clean` - Clean Test Artifacts
**File**: `.claude/commands/clean.md`

```markdown
---
description: Clean screenshots and test-results folders
allowed-tools: Bash(rm:*), Bash(ls:*)
---

Clean the /screenshots and /test-results folders completely. Follow these steps:

1. Delete all contents of screenshots folder:
   - Run: rm -rf screenshots/*

2. Delete all contents of test-results folder:
   - Run: rm -rf test-results/*

3. Verify both folders are empty:
   - Run: ls -la screenshots/
   - Run: ls -la test-results/

4. Confirm cleanup was successful

Execute immediately without asking for permission. These folders should never be committed to git per .gitignore.
```

---

#### 5. `/restore` - Restore Branch
**File**: `.claude/commands/restore.md`

```markdown
---
description: Restore the current branch to its last commit state
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git restore:*), Bash(git clean:*)
---

Restore the current branch to its last commit state, discarding all uncommitted changes. Follow these steps:

1. Show what will be discarded:
   - Run: git status
   - Run: git diff --stat

2. Ask user to confirm: 'Are you sure you want to discard all uncommitted changes? This cannot be undone. (yes/no)'

3. If user confirms 'yes':
   - Run: git restore .
   - Run: git clean -fd (remove untracked files)
   - Run: git status to verify clean state

4. If user says 'no':
   - Cancel operation and inform user

IMPORTANT: Always ask for confirmation before discarding changes. This is a destructive operation.
```

---

### Advanced Commands (New in v7.0)

#### 6. `/new-branch` - Smart Branch Creation
**File**: `.claude/commands/new-branch.md`

```markdown
---
description: Create a new branch based off current branch
allowed-tools: Bash(git status:*), Bash(git checkout:*), Bash(git stash:*), Bash(git add:*), Bash(git commit:*)
argument-hint: <branch-purpose-or-name>
---

Create a new Git branch based off the current branch.

**Arguments:**
- `$ARGUMENTS` - Branch purpose or name (e.g., "add new feature", "fix-login-bug", "experimental/new-ui")

**Workflow:**

1. **Check for Uncommitted Changes**
   - Run `git status` to check working directory
   - If there are uncommitted changes, STOP and ask user:
     ```
     You have uncommitted changes. How would you like to proceed?

     1. COMMIT - Save changes to current branch permanently
     2. STASH - Temporarily save changes and create clean branch

     Please respond with: commit OR stash
     ```
   - Wait for user response before proceeding

2. **Handle User Choice**

   **If user chooses "commit":**
   - Run git diff to show changes
   - Stage all files (exclude .claude/settings.local.json)
   - Create conventional commit message
   - Commit the changes
   - Proceed to step 3

   **If user chooses "stash":**
   - Run `git stash push -m "Stashed before creating new branch"`
   - Confirm stash was successful
   - Proceed to step 3

3. **Determine Branch Name**
   - Parse `$ARGUMENTS` to determine branch name
   - If argument looks like a branch name (contains `/`, `-`, or is kebab-case):
     - Use as-is (e.g., "feat/new-feature" → `feat/new-feature`)
   - If argument is a description (e.g., "add new login feature"):
     - Convert to branch name format
     - Determine prefix based on context:
       - "fix", "bug" → `fix/`
       - "test", "testing" → `test/`
       - "experimental", "experiment" → `experimental/`
       - Default → `feat/`
     - Convert to kebab-case (e.g., "add new login feature" → `feat/add-new-login-feature`)

4. **Create and Switch to New Branch**
   - Run: `git checkout -b <branch-name>`
   - Confirm branch creation successful
   - Show current branch name

5. **Handle Stashed Changes (if applicable)**
   - If changes were stashed in step 2, ask user:
     ```
     Branch created successfully. Would you like to apply the stashed changes to this new branch?

     Please respond with: yes OR no
     ```
   - If yes: Run `git stash pop`
   - If no: Inform user they can apply later with `git stash pop`

6. **Summary**
   - Print current branch name
   - Print base branch (the branch we came from)
   - If stashed: Print stash status
   - Confirm new branch is ready

**Example Usage:**
```
/new-branch "add authentication system"          → feat/add-authentication-system
/new-branch "fix login bug"                      → fix/login-bug
/new-branch feat/new-sudoku-solver               → feat/new-sudoku-solver
/new-branch experimental/ai-hints                → experimental/ai-hints
/new-branch "test responsive design"             → test/responsive-design
```

**Important Notes:**
- ALWAYS ask permission before committing or stashing
- NEVER proceed with uncommitted changes without user choice
- Preserve exact branch name if it contains `/` or `-`
- Auto-detect branch type (feat/fix/test/experimental) from description

This command requires user interaction for uncommitted changes.
```

---

#### 7. `/inspect` - Automated Page Testing
**File**: `.claude/commands/inspect.md`

```markdown
---
description: Inspect a page with Playwright and generate report
allowed-tools: Bash(npx playwright test:*), Bash(mkdir:*), Write, Read, Glob
argument-hint: <page-url> <what-to-check>
---

Inspect a web page using Playwright and generate a comprehensive report.

**Arguments:**
- `$1` - Page URL (e.g., `/dashboard`, `http://localhost:3000/stats`)
- `$2` - What to check (e.g., "navigation links", "responsive design", "form validation")

**Workflow:**

1. **Parse Arguments**
   - Extract page URL from `$1`
   - Extract inspection focus from `$2`
   - Determine page name from URL (e.g., `/dashboard` → `dashboard`, `/stats` → `stats`)

2. **Create Folder Structure**
   - Create `screenshots/<page-name>/` if not exists
   - Create timestamp-based subfolder: `screenshots/<page-name>/YYYY-MM-DD-HHmmss/`

3. **Create Playwright Test**
   - Generate test file: `tests/inspect-<page-name>-<timestamp>.spec.ts`
   - Test should:
     - Navigate to the page
     - Wait for load state
     - Take full page screenshot
     - Check items specified in `$2`
     - Take screenshots for each check
     - Capture console errors/warnings
     - Test responsive viewports if relevant

4. **Run Test**
   - Execute: `npx playwright test tests/inspect-<page-name>-<timestamp>.spec.ts --headed`
   - Test results will auto-save to `test-results/`

5. **Generate Report**
   - Create markdown report: `screenshots/<page-name>/YYYY-MM-DD-HHmmss/report.md`
   - Report must include:
     - Page URL and inspection date/time
     - What was checked (from `$2`)
     - Screenshots with descriptions
     - Console errors/warnings found
     - Test results summary
     - Issues discovered
     - Recommendations
   - Use proper markdown formatting with image links

6. **Summary**
   - Print location of report file
   - Print location of test file
   - Print location of test results
   - Confirm inspection complete

**Example Usage:**
```
/inspect /dashboard "navigation links and player stats card"
/inspect http://localhost:3000/stats "responsive design at mobile/tablet/desktop"
/inspect /game/123 "sudoku grid interactions and validation"
```

**Output Locations:**
- Screenshots: `screenshots/<page-name>/<timestamp>/`
- Report: `screenshots/<page-name>/<timestamp>/report.md`
- Test: `tests/inspect-<page-name>-<timestamp>.spec.ts`
- Results: `test-results/inspect-<page-name>-<timestamp>-*/`

Do NOT ask for permission - just execute the inspection workflow.
```

---

#### 8. `/update-claude-md` - Version-Controlled Documentation
**File**: `.claude/commands/update-claude-md.md`

```markdown
---
description: Update CLAUDE.md and create versioned template
allowed-tools: Read, Write, Edit, Glob
argument-hint: <additions-description>
---

Update the CLAUDE.md file with new content and create a versioned template backup.

**Arguments:**
- `$ARGUMENTS` - Description of additions/changes to make to CLAUDE.md

**Workflow:**

1. **Find Latest Template Version**
   - Search for all files matching `docs/CLAUDE_MD_template_*.md`
   - Identify highest version number X (e.g., template_6.md → X=6)
   - Read the latest template file to understand current structure

2. **Read Current CLAUDE.md**
   - Read the current `CLAUDE.md` file
   - Verify it matches the latest template (or understand differences)

3. **Make Requested Changes**
   - Apply the additions/changes described in `$ARGUMENTS`
   - Ensure ALL existing content from previous version is preserved
   - Add new content in appropriate sections
   - Update version number in CLAUDE.md metadata
   - Update "Last Updated" date to current date (YYYY-MM-DD format)

4. **Create New Template Version**
   - Calculate new version: X+1
   - Save updated CLAUDE.md content to `docs/CLAUDE_MD_template_{X+1}.md`
   - Verify the new template contains:
     - ✅ All content from previous version
     - ✅ New additions from `$ARGUMENTS`
     - ✅ Updated version number
     - ✅ Updated date

5. **Update CLAUDE.md**
   - Write the updated content to `CLAUDE.md`
   - Ensure formatting is preserved

6. **Verification**
   - Confirm both files were updated successfully
   - Print summary of changes made
   - Print new version number
   - Print locations of updated files

**Example Usage:**
```
/update-claude-md "Add section about database migration workflow"
/update-claude-md "Update Phase 2 priorities to include WebSocket authentication"
/update-claude-md "Add new slash command /inspect to the commands list"
```

**Output:**
- Updated: `CLAUDE.md` (version X+1)
- Created: `docs/CLAUDE_MD_template_{X+1}.md`
- Summary of changes applied

**Important Rules:**
- NEVER remove existing content from previous versions
- ALWAYS preserve exact formatting and structure
- ALWAYS increment version number
- ALWAYS update "Last Updated" date
- ALWAYS verify new template contains all old content + additions

Do NOT ask for permission - just execute the update workflow.
```

---

## Updated CLAUDE.md Section (v7.0)

Use this section in your CLAUDE.md:

```markdown
### CRITICAL: Setup Custom Slash Commands (First Time Setup)

**⚠️ IMPORTANT: Create these custom commands at the start of EVERY new project!**

Custom slash commands are stored in `.claude/commands/` and provide quick access to common workflows. Commands MUST be **Markdown (`.md`) files**, not JSON.

**Required Commands:**

1. **`/commit`** - Commit changes and remain on same branch
2. **`/merge-dev`** - Commit, switch to dev, merge, and push
3. **`/restart`** - Kill port 3000 and restart dev server
4. **`/clean`** - Clean screenshots and test-results folders
5. **`/restore`** - Restore branch to last commit (asks confirmation)
6. **`/new-branch`** - Create new branch based off current branch
7. **`/inspect`** - Inspect page with Playwright and generate report
8. **`/update-claude-md`** - Update CLAUDE.md and create versioned template

**How to create:**
```bash
mkdir -p .claude/commands
# Then create .md files for each command (see template below)
```

**Command Template Example** (`commit.md`):
```markdown
---
description: Commit changes and remain on the same branch
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*)
---

Commit all current changes to git and remain on the same branch. Follow these steps:

1. Run git status to see what has changed
2. Run git diff to show the changes
3. Stage all relevant files (exclude .claude/settings.local.json)
4. Create a detailed commit message following the conventional commits format
5. Include all file changes in the commit message
6. Verify the commit was successful
7. Remain on the current branch

Do NOT ask for permission - just commit the changes.
```

**Key Points:**
- File format: Markdown (`.md`), NOT JSON
- Filename = command name (e.g., `commit.md` → `/commit`)
- Frontmatter with YAML (`---` delimiters)
- Optional: `description`, `allowed-tools`, `argument-hint`, `model`
- Supports `$ARGUMENTS`, `$1`, `$2` for arguments

**See**: Check this project's `.claude/commands/` for complete examples to copy to new projects.

#### New Command Details

##### `/new-branch` - Smart Branch Creation
Creates a new Git branch from current branch with intelligent naming:
- Handles uncommitted changes (commit or stash)
- Auto-detects branch type (feat/fix/test/experimental)
- Converts descriptions to kebab-case branch names
- Example: `/new-branch "add authentication"` → `feat/add-authentication`

##### `/inspect` - Automated Page Testing
Inspects pages using Playwright with comprehensive reporting:
- Takes full-page screenshots
- Tests specified functionality
- Captures console errors
- Generates markdown reports with images
- Example: `/inspect /dashboard "navigation links and stats"`

##### `/update-claude-md` - Version-Controlled Documentation
Updates CLAUDE.md with automatic versioning:
- Creates versioned template backups
- Preserves all existing content
- Updates version number and date
- Example: `/update-claude-md "add new testing guidelines"`
```

---

## Command Usage Patterns

### Daily Development Workflow

**Start new feature:**
```bash
/new-branch "add user profile page"
# Work on feature...
/commit
# More work...
/commit
/merge-dev
```

**Testing and QA:**
```bash
/inspect /profile "form validation and avatar upload"
/inspect /dashboard "responsive design"
/clean  # After reviewing test results
```

**Documentation:**
```bash
/update-claude-md "add API authentication guidelines"
/commit
```

**Server issues:**
```bash
/restart  # Port 3000 busy
```

**Made a mistake:**
```bash
/restore  # Revert to last commit
```

---

## Implementation Checklist

When starting a new project with this template:

- [ ] Create `.claude/commands/` directory
- [ ] Copy all 8 command `.md` files from Sudokru project
- [ ] Verify file extension is `.md` not `.json`
- [ ] Update CLAUDE.md with v7.0 commands section
- [ ] Test `/commit` command
- [ ] Test `/new-branch` command
- [ ] Test `/inspect` command
- [ ] Test `/update-claude-md` command
- [ ] Verify commands appear in Claude Code command palette
- [ ] Document any project-specific custom commands

---

## Command Best Practices

### When to Use Each Command

**Essential (Daily Use):**
- `/commit` - After completing any logical unit of work
- `/restart` - When dev server becomes unresponsive
- `/new-branch` - Starting any new feature/fix

**Integration (Ready to Merge):**
- `/merge-dev` - When feature is complete and tested
- `/clean` - Before committing (keep repo clean)

**Quality Assurance:**
- `/inspect` - After UI changes, before marking complete
- Regular use during development for visual regression

**Maintenance:**
- `/update-claude-md` - When project guidelines change
- `/restore` - When you want to discard all local changes

### Command Naming Conventions

**Current Pattern:**
- Kebab-case: `/new-branch`, `/merge-dev`, `/update-claude-md`
- Action-focused: `/commit`, `/restart`, `/clean`, `/inspect`, `/restore`

**When Adding New Commands:**
- Use kebab-case for multi-word commands
- Start with verb (action): `/deploy`, `/test`, `/build`
- Keep concise: `/commit` not `/commit-all-changes`
- Be specific: `/clean` not `/cleanup` or `/clear`

---

## Version History

### v7.0 (Current)
- **NEW**: Added 3 advanced commands (`/new-branch`, `/inspect`, `/update-claude-md`)
- **UPDATE**: Total commands increased from 5 to 8
- **ENHANCE**: Added detailed command descriptions section
- **IMPROVE**: Updated project status to reflect all 8 commands
- **ADD**: Command usage patterns and daily workflow examples

### v6.0
- **CRITICAL FIX**: Changed file format from JSON to Markdown
- Added YAML frontmatter with `allowed-tools`
- Updated all command examples to `.md` format
- Added argument handling documentation
- Added migration guide from v5.0

### v5.0
- Added custom slash commands setup as critical first step
- Included 5 essential command templates
- ❌ **ERROR**: Used incorrect JSON format instead of Markdown

### v4.0
- Added Playwright testing section
- Added user memory integration notes
- Enhanced testing workflows

### v3.0
- Introduced reference-based approach
- Added documentation map
- Streamlined to <40KB target

---

## Quick Reference Card

**Total Commands**: 8

**Essential (5)**:
- `/commit` - Quick commit
- `/merge-dev` - Merge to dev + push
- `/restart` - Restart dev server
- `/clean` - Clean test artifacts
- `/restore` - Restore to last commit

**Advanced (3)**:
- `/new-branch` - Smart branch creation
- `/inspect` - Automated page testing
- `/update-claude-md` - Version-controlled docs

**File Format**: `.md` (Markdown), NOT `.json`

**File Location**: `.claude/commands/`

**Documentation**: https://docs.claude.com/en/docs/claude-code/slash-commands

---

**Template Version**: 7.0
**Template Created**: 2025-09-30
**Maintained By**: Sudokru Development Team
**For**: Claude Code AI Assistant Context Files

---

## Additional Resources

- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code/slash-commands
- **Example Commands**: See `.claude/commands/` in Sudokru project
- **v6.0 → v7.0 Changes**: 3 new commands added, usage patterns documented
- **All Templates**: `docs/CLAUDE_MD_template_*.md` in Sudokru project
