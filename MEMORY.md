# Obsidian React Viewer - Project Memory

## Project Purpose
Display Obsidian Bases content on a static Netlify site with autonomous operation.
**Built entirely with Test-Driven Development (TDD).**

## ⚡ Core Rule
**PROVE YOUR LOGIC EVERY TIME** - No code ships without automated tests. See PROJECT_RULES.md.

## Architecture
- **Framework**: Next.js 15 with App Router, TypeScript
- **Testing**: Jest + React Testing Library
- **Development Method**: Test-Driven Development (TDD)
- **Deployment**: Netlify (static site generation)
- **Content Source**: `/vault` folder with markdown files
- **Parser**: gray-matter for YAML frontmatter

## Key Features
- ✅ Reads markdown files from `/vault` at build time
- ✅ Parses YAML frontmatter (Bases properties)
- ✅ Displays notes with properties as badges
- ✅ Dark theme, simple UI
- ✅ Zero runtime dependencies (static export)
- ✅ Full test coverage (unit, component, integration)
- ✅ Tests run before every build
- ✅ Deploy fails if tests fail

## Workflow
1. User adds Obsidian markdown files to `/vault`
2. Push to GitHub
3. Netlify runs: tests → build → deploy
4. Site updates autonomously (only if tests pass)

## TDD Structure
All features built with TDD (test-first):

**Business Logic (lib/)**
- `noteReader.ts` - File reading & parsing
- `notes.ts` - Note aggregation

**UI Components (app/)**
- `NoteCard.tsx` - Individual note display
- `page.tsx` - Main page

**All have corresponding `__tests__/` directories**

## Dependencies
**Production:**
- next: 15.0.2
- react: 18.3.1
- gray-matter: 4.0.3
- TypeScript

**Development:**
- jest: 29.7.0
- @testing-library/react: 14.1.2
- @testing-library/jest-dom: 6.1.5

## Configuration
- `jest.config.js`: Test configuration
- `jest.setup.js`: Test setup
- `package.json`: Build = tests + build (tests must pass)
- `next.config.js`: Static export mode
- `netlify.toml`: Build settings, runs `npm run build` (includes tests)
- `/vault`: Content folder

## Test Coverage
- ✅ 29 tests across all features
- ✅ Unit tests for utilities
- ✅ Component tests for UI
- ✅ Integration tests for page
- ✅ Edge cases covered (empty vault, no frontmatter, etc.)

