# CLAUDE.md - AI Assistant Project Context

## Project Overview
[Brief description of what this project does, its goals, and target users. Update this section for each project.]

**Development Approach**: Frontend-first prototyping with structured documentation
**Current Phase**: [Phase 0-5 - Update as you progress]

## Tech Stack
- **Frontend**: Next.js 14+ with TypeScript
- **Development DB**: SQLite with Prisma ORM
- **Production DB**: PostgreSQL
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Testing**: Playwright MCP for browser automation
- **Documentation**: Context7 MCP for up-to-date library references

## Folder Structure
```
project-root/
├── docs/                    # All documentation organized by category
│   ├── development/        # Development guides and workflows
│   ├── planning/           # PRD, TRD, MVP matrices
│   ├── design/             # Figma prompts, style guides, wireframes
│   ├── technical/          # API specs, database schemas
│   ├── user-experience/    # User journeys, personas
│   └── infrastructure/     # CI/CD, environment configs
├── app/                    # Next.js app directory (or pages/)
├── components/             # React components
├── lib/                    # Utility functions and shared logic
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── CLAUDE.md              # This file
```

## Code Style and Conventions

### General Guidelines
- **ES Modules**: Always use `import/export` syntax (never CommonJS)
- **TypeScript**: Strict mode enabled; no `any` types without justification
- **Naming**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions/variables: camelCase (e.g., `calculateTotal`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
  - Files: kebab-case for utilities (e.g., `api-client.ts`)
- **Comments**: Minimal; prioritize clear, self-documenting code
- **Formatting**: Prettier with project config; run before commits

### Design System Integration
**CRITICAL RULE**: Never hardcode colors, spacing, or typography values.

- **Always check** `docs/design/[projectname]_style_guide.md` first
- **Always use design tokens** from the style guide
- **Never implement UI** without checking design documentation
- **If no design exists**: Follow `docs/design/figma_make_prompt_guide.md` to create one

### UI Implementation Workflow
1. Check `docs/design/[projectname]_figma_prompts.md` for existing design
2. If prompt exists → Request user to create in Figma Make → Implement from Figma
3. If no prompt → Generate one using Figma Make Prompt Generator Guide
4. Use design tokens from style guide for all visual decisions
5. Implement pixel-perfect using Figma MCP integration

## Development Workflow

### Git Workflow (MANDATORY)
**IMPORTANT**: Follow `docs/development/git_guidelines.md` exactly

- **Never commit directly** to `dev` or `main` branches
- **Always use feature branches**: `feat/`, `fix/`, `experimental/`
- **Never push, merge, or create PR** without explicit user permission
- **Branch structure**:
  - `main` → Production-ready code
  - `dev` → Default branch for development
  - Feature branches → Created from `dev`, merged back to `dev`

### Development Phases
Follow `docs/development/claude_code_entry_guide.md` for detailed phase instructions.

**Phase 0: Git & GitHub Setup**
- Initialize repository with proper branch structure
- Create README.md and organize documentation
- Set up remote repository

**Phase 1: Frontend Shell & Components** (Current focus in early development)
- Create interactive UI with mock data
- Set up Next.js, TypeScript, Tailwind, shadcn/ui
- Implement all major pages following Figma → Implementation workflow
- Add Zustand for state management

**Phase 2: API Layer Development**
- Add API structure with mock responses
- Create Next.js API routes matching OpenAPI specification
- Integrate frontend with API calls

**Phase 3: Database Integration**
- Replace mock data with real database
- Set up SQLite for development
- Implement CRUD operations with Prisma

**Phase 4: Authentication & Security**
- Add user management and security
- Implement role-based access control
- Set up session management

**Phase 5: Production Preparation**
- Migrate to PostgreSQL
- Configure CI/CD pipeline
- Performance optimization

### Common Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run ESLint

# Database
npx prisma migrate dev   # Run database migrations
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma Client

# Testing
npm test                 # Run tests
npm test -- --watch      # Run tests in watch mode

# Git (Always ask permission first)
git checkout -b feat/feature-name  # Create feature branch
git add .                          # Stage changes
git commit -m "type: description"  # Commit with conventional format
```

## MCP (Model Context Protocol) Servers

### Available MCPs
- **File System MCP**: Create project structure and component files
- **Package Manager MCP**: Install dependencies and manage packages
- **Figma MCP**: Access Figma designs for pixel-perfect implementation
- **Playwright MCP**: Browser automation and testing
- **Context7 MCP**: Access up-to-date documentation for libraries
- **Database MCP**: Execute schema, migrations, and queries
- **Git MCP**: Version control operations (requires permission)

### MCP Usage Patterns
- Use File System MCP for creating files and directory structures
- Use Package Manager MCP for all dependency installations
- Use Figma MCP when implementing designs from Figma
- Use Playwright MCP for end-to-end testing and browser automation
- Use Context7 MCP when you need current library documentation
- Use Database MCP for schema management and data operations
- Use Git MCP only after explicit user permission

## Testing and Debugging

### Testing Strategy
- **Framework**: Jest for unit tests, Playwright for E2E
- **Coverage Target**: 80% minimum for core business logic
- **Test Location**: Co-locate tests with components (`ComponentName.test.tsx`)
- **Debugging**: Use VS Code debugger; check `/logs` for errors

### Debug Workflow
1. Check browser console for client-side errors
2. Check terminal output for server-side errors
3. Use VS Code breakpoints for step-through debugging
4. Review error logs in `/logs` directory

## Documentation Reference

### Must-Read Documents (By Phase)

**Before Starting (Phase 0):**
1. `docs/planning/PRD.md` - Product Requirements (MANDATORY FIRST READ)
2. `docs/planning/TRD.md` - Technical Requirements
3. `docs/planning/mvp-feature-matrix.md` - Feature prioritization

**Phase 1 (Frontend):**
1. `docs/design/[projectname]_figma_prompts.md` - Check FIRST before any UI
2. `docs/design/[projectname]_style_guide.md` - Design tokens (ALWAYS use)
3. `docs/design/figma_make_prompt_guide.md` - Generate design prompts
4. `docs/technical/component-library.md` - Component specifications
5. `docs/technical/frontend-architecture.md` - Project structure
6. `docs/technical/project-folder-structure.md` - File organization

**Phase 2 (API):**
1. `docs/technical/api-specification.md` - OpenAPI/Swagger spec
2. `docs/technical/data-flow-diagrams.md` - Data movement
3. `docs/user-experience/user-journey-maps.md` - User flows
4. `docs/technical/error-handling-standards.md` - Error responses

**Phase 3 (Database):**
1. `docs/technical/database-schema.md` - Complete Prisma schema
2. `docs/infrastructure/environment-configuration.md` - Database connections
3. `docs/planning/PRD.md` - Validate business logic

**Phase 4 (Auth & Security):**
1. `docs/technical/authentication-authorization.md` - User roles and permissions
2. `docs/infrastructure/security-guidelines.md` - Security best practices
3. `docs/infrastructure/performance-monitoring.md` - Monitoring setup

**Phase 5 (Production):**
1. `docs/infrastructure/ci-cd-pipeline.md` - Deployment workflow
2. `docs/infrastructure/environment-configuration.md` - Production config
3. `docs/planning/mvp-feature-matrix.md` - Validate completion

## Critical Rules

### Design & UI
**YOU MUST**:
- Check design documentation before implementing ANY UI component
- Use design tokens from style guide (never hardcode visual values)
- Follow Figma → Implementation workflow for all interfaces
- Reference wireframes/mockups for layout structure

### Git & Version Control
**YOU MUST**:
- Never commit directly to `dev` or `main` branches
- Always create feature branches from `dev`
- Never push, merge, or create PR without explicit permission
- Follow conventional commit format: `type: description`

### Code Quality
**YOU MUST**:
- Write TypeScript with strict typing (no `any` without justification)
- Use ES modules exclusively (no CommonJS)
- Keep functions small and focused (single responsibility)
- Add error boundaries for React components
- Validate all API inputs and handle errors properly

### Documentation
**YOU MUST**:
- Read the PRD before starting any new project
- Consult phase-specific documents before implementing features
- Update CLAUDE.md when project structure or conventions change
- Keep documentation organized in `/docs` subdirectories

## AI Assistant Guidelines

### Context Management
- Scope conversations to single features when possible
- Use `/clear` or `/compact` commands if context becomes overloaded
- Reference specific documents using `@docs/path/to/file.md` syntax
- Ask clarifying questions if requirements are ambiguous

### Before Taking Action
**Always confirm with user before:**
- Making Git commits, pushes, or PR operations
- Installing new dependencies or packages
- Modifying database schema or running migrations
- Deleting files or making destructive changes
- Implementing UI without checking design docs

### Prompt Integration
When user asks for implementation:
1. First, review relevant documentation from `/docs`
2. Check design system if UI-related
3. Verify current development phase
4. Confirm understanding before coding
5. Implement following all conventions in this file

### Quality Checklist
Before marking any feature complete:
- [ ] Follows code style conventions
- [ ] Uses design tokens (if UI)
- [ ] Has proper error handling
- [ ] Includes appropriate tests
- [ ] Updates documentation if needed
- [ ] Validates against user journey maps

## Project-Specific Notes
[Add project-specific context, API keys, environment variables, or special considerations here. Update this section for each project.]

---

**Version**: 1.0  
**Last Updated**: [Update date when modified]  
**Maintained By**: [Your name/team]

---

## Quick Start Reminder

1. **Read PRD first** - Understand what you're building
2. **Check current phase** - Follow phase-specific documents
3. **Review design docs** - Before any UI implementation
4. **Ask permission** - Before Git operations or destructive changes
5. **Use MCPs** - Leverage available tools for efficiency
6. **Stay organized** - Keep documentation in `/docs` subdirectories