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
