# Scout Elite Website - Development Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

## Current State
Scout Elite Website is currently in the initial development phase with minimal codebase. This repository contains only basic documentation and is ready for initial development setup.

## Working Effectively

### Initial Project Setup
Since this project is in early development, you will likely need to establish the foundational structure:

**For web development projects, common first steps include:**
- Determine the technology stack (React, Vue, Angular, static HTML, etc.)
- Initialize package.json with `npm init -y` or appropriate package manager
- Set up build tooling (Vite, Webpack, Parcel, etc.)
- Configure development server
- Add basic project structure

**Always verify the current state before assuming project type:**
- Check for existing `package.json`, `Dockerfile`, or other configuration files
- Look for source directories like `src/`, `public/`, `app/`, etc.
- Examine any existing build scripts or documentation

### Development Environment Setup
**Prerequisites to install (if needed):**
- Node.js (recommend latest LTS version)
- npm or yarn package manager
- Git (for version control)

**Common setup commands (validate each exists before running):**
```bash
# Check if package.json exists
ls package.json

# If package.json exists, install dependencies
npm install

# If no package.json, you may need to initialize the project
npm init -y
```

### Build and Test Instructions
**IMPORTANT: These commands should only be run after verifying they exist in the project.**

**Common web project commands (check package.json scripts first):**
- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run linting checks

**CRITICAL TIMING EXPECTATIONS:**
- NEVER CANCEL build operations - web builds can take 5-15 minutes
- NEVER CANCEL test suites - may take 2-10 minutes to complete
- NEVER CANCEL install operations - npm install can take 2-5 minutes
- Set timeout to 20+ minutes for build commands
- Set timeout to 15+ minutes for test commands

### Validation Requirements
**After making any changes, ALWAYS:**
1. Verify the development server starts successfully
2. Check that the website loads in a browser (if applicable)
3. Test basic navigation and functionality
4. Run any existing lint/format checks
5. Ensure any existing tests still pass

**Manual Testing Scenarios:**
- If this becomes a static website: verify pages load and links work
- If this becomes a web application: test user interactions and forms
- If this becomes an e-commerce site: test product browsing and cart functionality
- Always take screenshots of UI changes to document functionality

### Common Project Patterns

**For Static Sites:**
- Source files typically in `src/`, `pages/`, or root directory
- Built files usually in `dist/`, `build/`, or `public/`
- Common tools: Jekyll, Hugo, Gatsby, Next.js

**For Web Applications:**
- Source code in `src/` directory
- Components in `src/components/`
- Pages/routes in `src/pages/` or `src/routes/`
- Assets in `src/assets/` or `public/`
- Common frameworks: React, Vue, Angular, Svelte

**For Node.js Projects:**
- Entry point usually `index.js`, `app.js`, or `server.js`
- Routes in `routes/` or `api/` directory
- Models in `models/` directory
- Configuration in `config/` directory

### File Organization
**Key files to check for project understanding:**
- `package.json` - Project configuration and scripts
- `README.md` - Project documentation
- `.gitignore` - Files to exclude from version control
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Multi-container setup
- Configuration files: `.eslintrc`, `tsconfig.json`, `vite.config.js`, etc.

### Quality Assurance
**Before completing any work:**
- Run `npm run lint` (if available) - NEVER CANCEL, timeout 10+ minutes
- Run `npm run format` (if available) 
- Run `npm run test` (if available) - NEVER CANCEL, timeout 15+ minutes
- Verify CI will pass by running the same commands used in `.github/workflows/`

### Deployment Considerations
**Common deployment patterns:**
- Static hosting: Netlify, Vercel, GitHub Pages
- Container deployment: Docker with cloud platforms
- Traditional hosting: VPS or shared hosting for PHP/static sites

**Pre-deployment checklist:**
- Ensure build process works (`npm run build`)
- Verify all assets are included in build output
- Check environment variable configuration
- Test production build locally if possible

## Project-Specific Information
**Scout Elite Website Details:**
- Purpose: Website for Scout Elite organization
- Current state: Minimal codebase, ready for initial development
- Technology stack: To be determined based on requirements

**Update these instructions as the project evolves:**
- Add specific build commands once determined
- Include framework-specific best practices
- Document any custom tooling or workflows
- Add performance benchmarks and testing requirements

## Quick Reference Commands
**Before running any command, verify it exists in package.json scripts:**

```bash
# Project exploration
ls -la                    # List all files
cat package.json          # View project configuration (if exists)
cat README.md            # Read project documentation

# Development (after setup)
npm install              # Install dependencies - timeout 10+ minutes
npm run dev              # Start development server - NEVER CANCEL
npm run build            # Build project - timeout 20+ minutes
npm run test             # Run tests - timeout 15+ minutes

# Quality checks (if available)
npm run lint             # Check code style - timeout 10+ minutes
npm run format           # Format code
```

**Remember:** Always validate that commands exist before running them. This project may not have all these commands available yet.