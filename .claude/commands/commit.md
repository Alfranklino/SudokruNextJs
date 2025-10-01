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
