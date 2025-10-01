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
