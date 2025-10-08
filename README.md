# Obsidian Bases Viewer

A simple Next.js app that displays Obsidian notes with Bases properties as a static website.

**Built with Test-Driven Development** - Every feature has tests that run before deployment.

## ⚡ Project Rule: Prove Your Logic Every Time

**No code ships without automated proof.** Every feature must have tests. See [PROJECT_RULES.md](./PROJECT_RULES.md) for details.

## How It Works

### 🎯 New: Simple Upload Feature

**She uploads her vault.zip → Sees her notes instantly!**

1. **She visits the site**
2. **Uploads her Obsidian vault as .zip**
3. **Views all her notes with Bases properties**
4. **No setup, no sync, just upload!**

See [UPLOAD_FEATURE.md](./UPLOAD_FEATURE.md) for complete upload guide.

### Alternative: Developer Sync

1. **Add Your Notes**: Put your Obsidian markdown files in the `/vault` folder  
2. **Deploy**: Push to GitHub and connect to Netlify
3. **Auto-Build**: Netlify automatically rebuilds when you push new notes
4. **Quality Assured**: Tests run automatically - deploy fails if tests fail

## Setup

### Local Development

```bash
# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Build and preview production
npm run build
npm start
```

Visit `http://localhost:3000` to see your notes.

### Run Tests

```bash
# Watch mode (for development)
npm test

# CI mode (runs once)
npm run test:ci
```

### Deploy to Netlify

1. Push this repo to GitHub
2. Connect to Netlify
3. Netlify will auto-detect the settings from `netlify.toml`
4. Done! Your site will build automatically

**Note**: Netlify will run all tests before building. Deploy fails if any test fails.

## Adding Notes

### Automatic Sync (Recommended)

```bash
# One-time setup
cp sync.config.json.example sync.config.json
# Edit with your Obsidian vault path

# Sync your notes
npm run sync

# Or auto-sync on changes
npm run sync:watch
```

See [SYNC.md](./SYNC.md) for full documentation.

### Manual Method

1. Export your Obsidian notes as markdown files
2. Add them to the `/vault` folder
3. Commit and push to GitHub
4. Netlify automatically rebuilds (after tests pass)

## Obsidian Bases Format

This app reads YAML frontmatter from your markdown files. Example:

```markdown
---
title: My Note
type: task
status: active
tags: [work, important]
---

Your note content here...
```

All properties in the frontmatter will be displayed as badges.

## Test-Driven Development

This project uses TDD with **47 automated tests**:
- 35 tests for the web app (Jest + React Testing Library)
  - Including upload functionality
  - Zip extraction and parsing
- 12 tests for the sync system (Python unittest)

See [TESTING.md](./TESTING.md) for details.

## Autonomous Operation

Once deployed, this runs completely autonomously:
- ✅ Static site (no server needed)
- ✅ Reads from `/vault` folder at build time
- ✅ Auto-rebuilds on git push (via Netlify)
- ✅ Tests run automatically before each build
- ✅ Deploy blocked if tests fail
- ✅ No backend, no database, no maintenance

## Project Structure

```
obsidian-react/
├── lib/                    # Business logic (tested)
│   ├── __tests__/
│   ├── noteReader.ts
│   └── notes.ts
├── app/                    # UI components (tested)
│   ├── __tests__/
│   ├── components/
│   │   ├── __tests__/
│   │   └── NoteCard.tsx
│   ├── page.tsx
│   └── layout.tsx
├── vault/                  # Your markdown files
├── jest.config.js          # Test configuration
├── netlify.toml            # Deploy configuration
└── package.json            # Build runs tests first
```

