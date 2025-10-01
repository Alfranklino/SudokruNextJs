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
