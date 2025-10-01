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
