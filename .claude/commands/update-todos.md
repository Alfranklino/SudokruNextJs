---
description: Add or update todos for a feature in .claude/todos/
allowed-tools: Read, Write, Edit, Glob, Bash(ls:*)
argument-hint: "[feature-name]"
---

You are tasked with creating or updating a todo list for a feature in the `.claude/todos/` directory.

## Parameters

**Feature Name**: `$1` (optional)
- If provided: Use this as the feature name
- If not provided: Infer from current git branch or recent work context

## Instructions

### Step 1: Determine Feature Name

1. **If `$1` is provided**: Use it as the feature name
2. **If `$1` is empty**:
   - Check current git branch name (e.g., `feat/feature-flag-system` → `feature-flag-system`)
   - If branch is `dev` or `main`, ask user: "What feature are these todos for?"
   - Use context from recent conversation to infer the feature

### Step 2: Check for Existing Todos

1. List files in `.claude/todos/` directory
2. **If matching file exists** (e.g., `feature-flags.md` for feature "feature-flags"):
   - Ask user: "Found existing todos for '[feature-name]'. Do you want to:
     - **update** (append new tasks to existing file)
     - **replace** (overwrite the entire file)
     - **create-new** (create a new file with different name)"
   - Wait for user confirmation before proceeding

3. **If similar files exist** (fuzzy match):
   - Example: User says "hints" but `feature-flags.md` exists (which contains hints)
   - Ask: "Did you mean '[similar-feature]'? I found these related todos:
     - `feature-flags.md` (contains hint-related tasks)

     Do you want to update this file or create a new one?"

4. **If ambiguous**:
   - Ask for clarification: "I need more details. What feature are these todos for? Options:
     - Create new: `[inferred-name].md`
     - Update existing: [list existing todo files]
     - Specify a different name"

### Step 3: Gather Todo Information

Ask the user what todos they want to add. Provide examples:

"What todos should I add for '[feature-name]'? You can provide:
- A list of tasks
- A description of what needs to be done
- Priority/status information
- Or just tell me to document remaining work from our conversation"

### Step 4: Structure the Todo Document

Create or update the file at `.claude/todos/[feature-name].md` with this structure:

```markdown
# [Feature Name] - Next Steps

## Current Status
**Progress**: [X/Y tasks complete or percentage]
**Status**: [✅ Complete | 🚧 In Progress | ⏸️ Paused | ❌ Not Started]
**Working**: [Brief description of what's currently working]

---

## Completed Tasks ✅

1. ✅ **[Task Name]** - [Brief description]
2. ✅ **[Task Name]** - [Brief description]

---

## Remaining Tasks 🚧

### Task 1: [Task Name]
**Priority**: [High | Medium | Low]
**Effort**: [Low (1-2h) | Medium (3-5h) | High (6+h)]
**Status**: [Not Started | In Progress | Blocked]

**Description**: [What needs to be done]

**Why it matters**: [Impact/rationale]

**Files to modify**:
- `path/to/file.ts`

**Recommendation**: ✅ **[Do it | Skip | Optional]** - [reasoning]

---

## Decision Matrix

| Task | Priority | Effort | Impact | Recommend? |
|------|----------|--------|--------|------------|
| Task 1 | 🔴 High | Low | High | ✅ Yes |
| Task 2 | 🟡 Medium | Medium | Medium | ⏸️ Later |

---

## File References

- **[Component]**: `path/to/file.ts`
- **[Config]**: `path/to/config.ts`

---

**Last Updated**: [YYYY-MM-DD]
**Version**: [X.Y]
**Status**: [Status description]
```

### Step 5: Update CLAUDE.md

After creating/updating the todo file:

1. Read `CLAUDE.md`
2. Find the "Current todos:" section
3. Update the list to include the new/updated todo file
4. If creating a new file, add it to the list with status

### Step 6: Confirm Completion

Show the user:
1. Path to the created/updated file
2. Summary of what was added/changed
3. Confirmation that CLAUDE.md was updated

## Examples

**Example 1: Create new todo**
```
User: /update-todos authentication
Claude: Creating todos for 'authentication'. What tasks should I add?
User: [provides tasks]
Claude: [creates .claude/todos/authentication.md and updates CLAUDE.md]
```

**Example 2: Update existing**
```
User: /update-todos feature-flags
Claude: Found existing todos for 'feature-flags'. Do you want to update or replace?
User: update
Claude: What new tasks should I add?
User: [provides tasks]
Claude: [appends to existing file]
```

**Example 3: Infer from branch**
```
User: /update-todos
Claude: [checks branch: feat/websocket-integration]
Claude: I see you're on branch 'feat/websocket-integration'.
        Should I create todos for 'websocket-integration'?
User: yes
Claude: [proceeds]
```

**Example 4: Ambiguous**
```
User: /update-todos hints
Claude: I found these related todos:
        - feature-flags.md (contains hint-related tasks)

        Did you mean to update 'feature-flags' or create new 'hints' todos?
User: update feature-flags
Claude: [proceeds to update]
```

## Important Notes

- **ALWAYS** ask for confirmation before overwriting existing files
- **ALWAYS** check for similar/related todos before creating new ones
- **NEVER** assume - if ambiguous, ask the user
- Use the structured format consistently
- Include practical details (file paths, effort estimates, priorities)
- Update CLAUDE.md after creating/updating todos
- Use emojis for status (✅ ❌ 🚧 ⏸️ 🔴 🟡 🟢)

## Edge Cases

1. **No `.claude/todos/` directory**: Create it first
2. **Empty `$1` and can't infer**: Ask user directly
3. **Multiple similar matches**: Show all and let user choose
4. **User wants to delete todos**: Confirm, then remove file and update CLAUDE.md
