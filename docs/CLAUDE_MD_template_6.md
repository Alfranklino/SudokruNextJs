# CLAUDE.md Template v6.0
## Corrected Custom Slash Commands with Markdown Format

### Purpose
This template corrects v5.0 by fixing the slash command file format. Commands MUST use **Markdown (`.md`) files**, not JSON, according to official Claude Code documentation.

### Critical Fix from v5.0
**❌ v5.0 INCORRECT**: Used JSON files (`.claude/commands/*.json`)
**✅ v6.0 CORRECT**: Uses Markdown files (`.claude/commands/*.md`)

### Key Changes from v5.0 → v6.0
1. **File Format**: Changed from JSON to Markdown with YAML frontmatter
2. **Frontmatter**: Added `allowed-tools` for explicit tool permissions
3. **Documentation**: Updated all examples to use correct `.md` format
4. **Best Practices**: Added argument handling (`$ARGUMENTS`, `$1`, `$2`)

---

## What's New in v6.0

### Correct Command File Format

Each command is a **Markdown file** in `.claude/commands/`:

**Filename**: `command-name.md` (becomes `/command-name`)

**Structure**:
```markdown
---
description: Short description shown in command list
allowed-tools: Bash(git:*), Bash(npm:*)
argument-hint: [optional] Hint shown to user for arguments
model: [optional] Specific model to use
---

Detailed instructions for Claude to execute.

Can use:
- $ARGUMENTS (all arguments as single string)
- $1, $2, $3 (individual arguments)
- @ prefix to reference files
- ! prefix to execute bash commands
```

---

## Essential Commands Template (CORRECTED)

Copy these 5 commands to every new project:

### 1. /commit - Quick Commit

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

### 2. /merge-dev - Merge to Dev

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

### 3. /restart - Restart Dev Server

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

### 4. /clean - Clean Test Artifacts

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

### 5. /restore - Restore Branch

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

## Updated CLAUDE.md Section

Use this corrected section in your CLAUDE.md:

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
```

---

## Implementation Checklist

When starting a new project with this template:

- [ ] Create `.claude/commands/` directory
- [ ] Copy all 5 command `.md` files from existing project (NOT `.json`)
- [ ] Verify file extension is `.md` not `.json`
- [ ] Update CLAUDE.md with custom commands section (v6.0 format)
- [ ] Test `/commit` command
- [ ] Test `/restart` command
- [ ] Verify commands appear in Claude Code command palette
- [ ] Document any project-specific custom commands

---

## Command Best Practices

### File Format Requirements

**✅ CORRECT:**
```
.claude/commands/
├── commit.md
├── merge-dev.md
├── restart.md
├── clean.md
└── restore.md
```

**❌ INCORRECT:**
```
.claude/commands/
├── commit.json
├── merge-dev.json
├── restart.json
├── clean.json
└── restore.json
```

### YAML Frontmatter Fields

**Required:**
- None (frontmatter is optional)

**Recommended:**
- `description`: Brief description shown in command list
- `allowed-tools`: Explicit tool permissions (e.g., `Bash(git:*)`)

**Optional:**
- `argument-hint`: Hint for command arguments (e.g., "commit message")
- `model`: Specific model to use (e.g., `claude-sonnet-4-5`)

### Argument Handling

Commands can accept arguments:

```markdown
---
description: Create a git commit with custom message
argument-hint: commit message
---

Create a git commit with message: $ARGUMENTS
```

**Usage**: `/commit fix: update navigation links`

**Variables:**
- `$ARGUMENTS`: All arguments as single string
- `$1`, `$2`, `$3`: Individual positional arguments

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

## Migration Guide: v5.0 → v6.0

If you have existing JSON commands from v5.0:

1. **Backup existing commands** (optional)
   ```bash
   mkdir .claude/commands-backup
   cp .claude/commands/*.json .claude/commands-backup/
   ```

2. **Convert each JSON file to Markdown**

   **Before (commit.json)**:
   ```json
   {
     "name": "commit",
     "description": "Commit changes",
     "prompt": "Commit all changes..."
   }
   ```

   **After (commit.md)**:
   ```markdown
   ---
   description: Commit changes
   ---

   Commit all changes...
   ```

3. **Delete old JSON files**
   ```bash
   rm .claude/commands/*.json
   ```

4. **Test new commands**
   - Restart Claude Code (if needed)
   - Type `/` to see command list
   - Test each command

---

## Troubleshooting

### Commands don't appear in palette

**Check:**
1. File extension is `.md` not `.json`
2. Files are in `.claude/commands/` directory
3. Frontmatter uses `---` delimiters correctly
4. Restart Claude Code

### Commands appear but don't work

**Check:**
1. YAML frontmatter is valid
2. `allowed-tools` matches tools used in prompt
3. No syntax errors in markdown
4. Prompt instructions are clear and executable

### Commands ask for permission unexpectedly

**Solution:**
- Add explicit permission in prompt:
  ```markdown
  Execute without asking for permission.
  ```
- Or add to `allowed-tools`:
  ```markdown
  allowed-tools: Bash(git push:*)
  ```

---

## Version History

### v6.0 (Current)
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

**File Format**: `.md` (Markdown), NOT `.json`

**File Location**: `.claude/commands/`

**Basic Structure**:
```markdown
---
description: Command description
allowed-tools: Bash(command:*)
---

Detailed prompt for Claude to execute.
```

**Essential Commands**:
- `/commit` - Quick commit
- `/merge-dev` - Merge to dev + push
- `/restart` - Restart dev server
- `/clean` - Clean test artifacts
- `/restore` - Restore to last commit

**Documentation**: https://docs.claude.com/en/docs/claude-code/slash-commands

---

**Template Version**: 6.0
**Template Created**: 2025-09-30
**Maintained By**: Sudokru Development Team
**For**: Claude Code AI Assistant Context Files

---

## Additional Resources

- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code/slash-commands
- **Example Commands**: See `.claude/commands/` in Sudokru project
- **v5.0 → v6.0 Migration**: See "Migration Guide" section above
