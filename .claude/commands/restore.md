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
