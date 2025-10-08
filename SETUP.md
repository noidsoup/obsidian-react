# Complete Setup Guide

This is your **fully automated Obsidian-to-Web system**. Everything is built, tested, and ready.

## What You Have

✅ **Web App** - Next.js app to display Obsidian notes  
✅ **Sync System** - Automated sync from Obsidian vault  
✅ **37 Tests** - Every feature proven to work  
✅ **Watch Mode** - Auto-sync on file changes  
✅ **Build Pipeline** - Tests → Build → Deploy  

## 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
pip install watchdog  # Optional, for watch mode
```

### 2. Configure Sync

```bash
# Copy example config
cp sync.config.json.example sync.config.json
```

Edit `sync.config.json`:
```json
{
  "obsidian_vault_path": "~/Documents/YourObsidianVault",
  "flatten": true,
  "clean": false
}
```

### 3. Sync Your Notes

```bash
npm run sync
```

Your Obsidian notes are now in `/vault`!

### 4. Start Development

```bash
# Terminal 1: Auto-sync
npm run sync:watch

# Terminal 2: Dev server
npm run dev
```

Visit http://localhost:3000 - your notes are live!

### 5. Deploy to Netlify

```bash
# Run all tests
npm run test:all

# Build
npm run build

# Push to GitHub
git add .
git commit -m "Initial setup"
git push

# Connect to Netlify
# (One-time: netlify.com → New site → Import from Git)
```

Done! Your site auto-deploys on every push.

## Workflow

### Daily Use

```bash
# Option 1: Auto-sync (recommended)
npm run sync:watch    # Terminal 1
npm run dev           # Terminal 2
# Edit in Obsidian → Auto-syncs → Hot reloads!

# Option 2: Manual sync
# Edit in Obsidian
npm run sync
# View at localhost:3000
```

### Deploy Updates

```bash
npm run sync          # Sync latest notes
npm run test:all      # Run all 37 tests
npm run build         # Build (includes tests)
git add .
git commit -m "Update notes"
git push              # Auto-deploys to Netlify
```

## Commands Reference

### Testing
```bash
npm test              # Web tests (watch mode)
npm run test:ci       # Web tests (once)
npm run test:sync     # Sync tests (12 tests)
npm run test:all      # ALL tests (37 tests)
```

### Development
```bash
npm run dev           # Dev server with hot reload
npm start             # Serve production build
npm run build         # Test + build for production
```

### Sync
```bash
npm run sync          # One-time sync
npm run sync:watch    # Auto-sync on changes
npm run sync:clean    # Sync + remove old files
```

## What Gets Tested

### Web App (25 tests)
- ✅ File reading from `/vault`
- ✅ YAML frontmatter parsing
- ✅ Note components rendering
- ✅ Page integration
- ✅ Empty state handling
- ✅ Edge cases

### Sync System (12 tests)
- ✅ Markdown file filtering
- ✅ Hidden file skipping
- ✅ Content copying
- ✅ Frontmatter preservation
- ✅ Subdirectory handling
- ✅ Clean mode
- ✅ Config loading
- ✅ Error handling

**Total: 37 automated tests prove everything works**

## File Structure

```
obsidian-react/
├── 📝 Your Content
│   └── vault/                    ← Synced from Obsidian
│       └── *.md
│
├── 🔧 Sync System (12 tests)
│   ├── sync/
│   │   ├── __tests__/
│   │   │   └── sync.test.py
│   │   └── sync_obsidian.py
│   ├── sync.config.json          ← Your config
│   └── requirements.txt
│
├── 🌐 Web App (25 tests)
│   ├── app/
│   │   ├── __tests__/
│   │   ├── components/
│   │   └── page.tsx
│   ├── lib/
│   │   ├── __tests__/
│   │   └── *.ts
│   └── package.json
│
├── 📚 Documentation
│   ├── README.md                 ← Overview
│   ├── SETUP.md                  ← This file
│   ├── SYNC.md                   ← Sync documentation
│   ├── TESTING.md                ← Test details
│   ├── TDD_FLOW.md               ← TDD methodology
│   ├── PROJECT_RULES.md          ← Core rules
│   ├── QUICKSTART.md             ← Quick reference
│   └── DEPLOY.md                 ← Deployment guide
│
└── ⚙️ Config
    ├── jest.config.js
    ├── next.config.js
    ├── netlify.toml
    └── tsconfig.json
```

## Troubleshooting

### Sync not working?
```bash
# Test the sync system
npm run test:sync

# Check your config
cat sync.config.json

# Try manual path
python sync/sync_obsidian.py ~/Documents/YourVault
```

### Tests failing?
```bash
# See which tests fail
npm run test:all

# Run specific test suite
npm run test:ci        # Web tests
npm run test:sync      # Sync tests
```

### Build failing?
```bash
# Tests must pass first
npm run test:all

# Check for errors
npm run build
```

### Nothing showing on website?
1. Check `/vault` has `.md` files: `ls vault/`
2. Check files have YAML frontmatter
3. Run dev server: `npm run dev`
4. Check browser console for errors

## Advanced Features

### Watch Mode

Auto-sync when Obsidian files change:

```bash
npm run sync:watch
```

Now edit any note in Obsidian → it syncs instantly!

### Clean Mode

Remove files from `/vault` that aren't in Obsidian:

```bash
npm run sync:clean
```

Keeps `/vault` exactly matching your Obsidian vault.

### Flatten vs Preserve Structure

**Flatten (default):** All notes go to `/vault` root
```json
{"flatten": true}
```

**Preserve:** Keep folder structure from Obsidian
```json
{"flatten": false}
```

### Pre-commit Hook

Auto-sync before every commit:

```bash
# .git/hooks/pre-commit
#!/bin/bash
npm run sync
git add vault/
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Quality Assurance

Every deployment is automatically tested:

```
Push to GitHub
    ↓
Netlify: npm run build
    ↓
npm run test:all
    ↓
├─ Jest: 25 web app tests
└─ Python: 12 sync tests
    ↓
✅ All pass? → next build
❌ Any fail? → Deploy BLOCKED
    ↓
Static site generated
    ↓
Deploy to CDN
```

**No broken deployments possible.**

## Support

- **Sync Issues**: See [SYNC.md](./SYNC.md)
- **Testing**: See [TESTING.md](./TESTING.md)
- **Deployment**: See [DEPLOY.md](./DEPLOY.md)
- **Quick Reference**: See [QUICKSTART.md](./QUICKSTART.md)

## Summary

You now have:

✅ **Automated sync** from Obsidian → Web  
✅ **37 tests** proving it works  
✅ **Watch mode** for real-time updates  
✅ **Build pipeline** with quality checks  
✅ **Full documentation** for everything  
✅ **Netlify deployment** ready to go  

**Zero manual work. Maximum automation.** 🚀

---

**Next Steps:**
1. Configure sync (edit `sync.config.json`)
2. Run `npm run sync`
3. Run `npm run dev`
4. View your notes at localhost:3000
5. Push to GitHub → Auto-deploys!

