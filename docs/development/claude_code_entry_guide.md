# Claude Code Development Guide

## Project Overview
This project follows a **frontend-first prototyping approach** using Next.js 14+, TypeScript, and a structured documentation system. This guide tells you how to use each document to build the application systematically.

## Tech Stack
- **Frontend**: Next.js 14+ with TypeScript
- **Development DB**: SQLite with Prisma ORM
- **Production DB**: PostgreSQL
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand

## Development Phases & Document Usage

### Phase 0: Git and GitHub Setup
**Goal**: Initialize version control and remote repository

**Primary Document to Use:**
1. **git_guidelines.md** → Complete Git workflow and branching strategy

**Key Actions:**
1. Initialize Git repository locally
2. Create remote GitHub repository
3. Create `main` branch
4. Create `dev` branch and set as default on GitHub
5. Create initial commit with professional README.md
6. Never commit directly to `dev` or `main` - always use feature branches
7. Follow branch naming conventions: `feat/`, `fix/`, `experimental/`
8. Never push, merge, or create PR without explicit permission

**Success Criteria:**
- Repository initialized with proper branch structure
- README.md created and committed
- Files in /docs directory organized in the following categories (each category being a subfolder): development, planning, design, technical, user-experience, infrastructure. Documentation Files must be moved to their appropriate directory.
- A second README.md file added into the /docs directory to help understand the purpose of the docs.
- Remote repository configured
- Git workflow understood

### Phase 1: Frontend Shell & Components
**Goal**: Create interactive UI with mock data

**Primary Documents to Use:**
1. **[projectname]_figma_prompts.md** → Check for existing design prompts FIRST
2. **[projectname]_style_guide.md** → Use design tokens for all UI decisions
3. **Figma Make Prompt Generator Guide** → Generate prompts for missing designs
4. **Component Library Documentation** → Follow for shadcn/ui setup and custom component creation
5. **Frontend Architecture Document** → Use for project structure, routing, and state management setup
6. **Project Folder Structure Document** → Follow for organizing files and folders
7. **Wireframes/Low-Fi Mockups** → Reference for layout structure and user flow

**MCPs to Use:**
- File System MCP: Create project structure and component files
- Package Manager MCP: Install Next.js, TypeScript, Tailwind, shadcn/ui, Zustand
- Figma MCP: Access Figma designs for pixel-perfect implementation
- Playwright MCP: Browser automation and testing
- Context7 MCP: Access up-to-date documentation for Next.js, React, and other libraries

**UI Implementation Workflow:**
1. **Before implementing any UI component or page:**
   - Check `[projectname]_figma_prompts.md` for existing design prompt
   - If prompt exists → Request user to create in Figma Make → Implement from Figma
   - If no prompt exists or if existing prompt does not contain design system related specs → Follow "docs/design/figma_make_prompt_guide.md" to create one
2. **Always use design tokens** from `[projectname]_style_guide.md`
3. **Never hardcode colors, spacing, or typography** - reference style guide tokens

**Key Actions:**
1. Set up Next.js project with TypeScript
2. Configure Tailwind CSS and install shadcn/ui components
3. **For each component/page:**
   - Consult design documentation first
   - Generate Figma Make prompt if needed
   - Wait for Figma design from user
   - Implement pixel-perfect using Figma MCP
4. Build all major pages following the Figma → Implementation workflow
5. Implement navigation and basic routing
6. Add Zustand for state management with mock data

**Critical Reminder:**
Never implement UI without checking design documentation first. Every visual decision must reference the style guide tokens.

### Phase 2: API Layer Development
**Goal**: Add API structure with mock responses

**Primary Documents to Use:**
1. **API Specification (OpenAPI/Swagger)** → Implement exact endpoints with mock data
2. **Data Flow Diagrams** → Understand data movement between components and API
3. **User Journey Maps** → Ensure API supports all user flows
4. **Error Handling & Logging Standards** → Implement proper error responses

**MCPs to Use:**
- File System MCP: Create API route files in `/pages/api` or `/app/api`

**Key Actions:**
1. Create Next.js API routes matching the OpenAPI specification
2. Return structured mock data from all endpoints
3. Integrate frontend with real API calls (using SWR or React Query)
4. Add loading states and error boundaries
5. Implement form validation and submission

### Phase 3: Database Integration
**Goal**: Replace mock data with real database

**Primary Documents to Use:**
1. **Database Schema Documentation** → Use the complete Prisma schema provided
2. **Environment Configuration Guide** → Set up database connections and environment variables
3. **PRD (Product Requirements Document)** → Validate business logic implementation
4. **Technical Requirements Document (TRD)** → Follow architecture decisions

**MCPs to Use:**
- Database MCP: Execute schema, run migrations, seed data
- File System MCP: Create Prisma configuration files

**Key Actions:**
1. Copy the complete Prisma schema from documentation
2. Set up SQLite for development using provided commands
3. Run migrations and seed initial data
4. Replace API mock responses with real database queries
5. Implement full CRUD operations
6. Add data validation using provided schemas

### Phase 4: Authentication & Security
**Goal**: Add user management and security

**Primary Documents to Use:**
1. **Authentication & Authorization Schema** → Implement user roles and permissions
2. **Security Guidelines** → Follow security best practices
3. **Performance Requirements & Monitoring** → Implement monitoring

**MCPs to Use:**
- Package Manager MCP: Install auth libraries (NextAuth.js, etc.)
- Database MCP: Update schema with auth tables

**Key Actions:**
1. Implement authentication system following the schema
2. Add role-based access control
3. Implement session management
4. Add security headers and CORS policies
5. Set up input validation and sanitization

### Phase 5: Production Preparation
**Goal**: Deploy production-ready application

**Primary Documents to Use:**
1. **CI/CD Pipeline Documentation** → Set up deployment workflow
2. **Environment Configuration Guide** → Configure production environment
3. **MVP Feature Matrix** → Validate all core features are complete

**MCPs to Use:**
- Git MCP: Version control and deployment preparation
- Database MCP: Migrate to PostgreSQL

**Key Actions:**
1. Migrate from SQLite to PostgreSQL
2. Set up production environment variables
3. Configure CI/CD pipeline
4. Implement monitoring and logging
5. Performance optimization and testing

## Document Reference Quick Guide

### Planning Documents (Use Throughout)
- **PRD** → Feature specifications and business logic
- **TRD** → Technical architecture decisions
- **MVP Feature Matrix** → Core vs. nice-to-have features
- **Prototyping Roadmap Document** → Development phase guidance

### Implementation Documents (Use Per Phase)
- **Database Schema** → Ready-to-use Prisma schema with step-by-step implementation
- **API Specification** → Exact endpoint definitions with request/response schemas
- **Component Library** → UI component specifications and usage guidelines
- **Project Folder Structure** → File organization and naming conventions

### Configuration Documents (Use When Needed)
- **Environment Configuration** → Environment variables and setup instructions
- **Security Guidelines** → Security implementation requirements
- **Error Handling Standards** → Error codes and logging procedures
- **Performance Requirements** → Optimization targets and monitoring setup

## Getting Started: READ THIS FIRST

**STEP 1: Project Understanding (MANDATORY)**
- [ ] **Read the PRD (Product Requirements Document) FIRST** - This is critical to understand what you're building, the target users, core features, and business logic
- [ ] Review the MVP Feature Matrix to prioritize features
- [ ] Read the User Journey Maps to understand user flows
- [ ] Check the Prototyping Roadmap to understand the development approach

**STEP 2: Architecture Planning**
- [ ] Read the TRD (Technical Requirements Document) for architecture decisions
- [ ] Review the Database Schema Documentation to understand data structure
- [ ] Check the API Specification to understand system interfaces

**Only proceed to Phase 0 (Git setup) after completing Steps 1 and 2.**

## Development Phase Checklist

**Phase 0 Setup:**
- [ ] Follow git_guidelines.md exactly for repository setup
- [ ] Create main and dev branches
- [ ] Set dev as default branch on GitHub
- [ ] Create initial commit with README.md
- [ ] Understand branching and permission requirements

**Phase 1 Setup:**
- [ ] Use Project Folder Structure to create directory organization
- [ ] Follow Frontend Architecture Document for Next.js setup
- [ ] Install dependencies using Package Manager MCP
- [ ] Set up Tailwind CSS and shadcn/ui per Component Library Documentation

**Quality Assurance:**
- [ ] Each phase should result in a working, demonstrable application
- [ ] Validate against User Journey Maps after each phase
- [ ] Follow Error Handling Standards for consistent error management
- [ ] Check Performance Requirements during development

## MCP Usage Patterns

**File System MCP**: Use for creating project structure, component files, configuration files
**Database MCP**: Use for schema management, migrations, queries
**Git MCP**: Use for version control throughout development
**Package Manager MCP**: Use for dependency installation and management

## Troubleshooting

**If documentation is unclear:**
- Check the specific document's troubleshooting section
- Refer to the TRD for architectural context
- Cross-reference with related documents

**If implementation fails:**
- Verify environment configuration using the Environment Configuration Guide
- Check database setup using Database Schema Documentation
- Validate API contracts using API Specification

## Success Criteria

**Phase 0**: Git repository initialized with proper branch structure
**Phase 1**: All user interfaces working with mock data
**Phase 2**: API endpoints functional with proper error handling
**Phase 3**: Database persistence working correctly
**Phase 4**: Secure authentication and authorization implemented
**Phase 5**: Production deployment successful

---

**Remember**: This is a frontend-first approach. Each phase builds on the previous one, ensuring you always have a working, demonstrable application. Focus on completing one phase fully before moving to the next.