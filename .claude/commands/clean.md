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
