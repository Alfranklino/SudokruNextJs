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
