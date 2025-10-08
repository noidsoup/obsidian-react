# Quick Start Guide

## 🚀 5-Minute Setup

```bash
# 1. Install
npm install

# 2. Run tests (should see 29 passing)
npm test
# Press 'q' to quit watch mode

# 3. Start dev server
npm run dev
# Visit http://localhost:3000

# 4. Build for production
npm run build
# Creates static site in /out folder
```

## 📋 Common Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run web app tests in watch mode |
| `npm run test:ci` | Run web app tests once |
| `npm run test:sync` | Run sync tests (12 tests) |
| `npm run test:all` | Run ALL tests (37 total) |
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Test ALL + Build for production |
| `npm start` | Serve production build (port 3000) |
| `npm run sync` | Sync Obsidian → vault |
| `npm run sync:watch` | Auto-sync on changes |

## 📁 Project Structure

```
obsidian-react/
├── vault/              👈 PUT YOUR MARKDOWN FILES HERE
│   └── *.md           (Obsidian notes with YAML frontmatter)
│
├── lib/               (Business logic - tested)
│   ├── noteReader.ts  (Read & parse markdown)
│   └── notes.ts       (Aggregate notes)
│
├── app/               (UI components - tested)
│   ├── page.tsx       (Main page)
│   └── components/
│       └── NoteCard.tsx (Note display)
│
└── __tests__/         (Tests for all features)
```

## ✅ Test-Driven Workflow

### Adding Your Notes
```bash
# 1. Copy your Obsidian notes to /vault folder
cp ~/obsidian-vault/*.md ./vault/

# 2. Run tests to verify
npm test

# 3. View locally
npm run dev

# 4. Deploy (push to GitHub)
git add .
git commit -m "Add my notes"
git push
```

### Netlify Auto-Deploy
```
Push to GitHub
    ↓
Netlify runs: npm run build
    ↓
Tests run (29 tests)
    ↓
Build (if tests pass)
    ↓
Deploy (if build succeeds)
    ↓
Live site updated! 🎉
```

## 📝 Markdown Format

Your Obsidian notes should look like this:

```markdown
---
title: My Note Title
type: task
status: active
priority: high
tags: [work, important]
created: 2025-10-08
---

# Your note content here

Any markdown content works.
Properties above will show as badges.
```

## 🐛 Troubleshooting

### Tests failing?
```bash
# Run tests to see what's wrong
npm run test:ci

# Check specific test file
npm test -- noteReader.test.ts
```

### Build failing on Netlify?
1. Check Netlify build log for test errors
2. Run `npm run build` locally to reproduce
3. Fix the failing test
4. Push again

### No notes showing?
1. Check `/vault` has `.md` files
2. Verify markdown has proper YAML frontmatter (between `---` markers)
3. Check browser console for errors

## 🎯 What You Get

✅ **Static site** - No server, no database  
✅ **Tested** - 29 tests ensure quality  
✅ **Autonomous** - Push = deploy (if tests pass)  
✅ **Fast** - Netlify CDN, ~1 min builds  
✅ **Free** - Netlify free tier  
✅ **Safe** - Bad changes can't deploy  

## 📚 More Info

- [README.md](./README.md) - Full overview
- [TESTING.md](./TESTING.md) - Test documentation
- [TDD_FLOW.md](./TDD_FLOW.md) - How TDD was used
- [DEPLOY.md](./DEPLOY.md) - Deployment details

---

**Need help?** Check the docs above or review the test files to see how everything works.


