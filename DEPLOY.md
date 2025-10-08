# Deployment Guide

## Quick Start (4 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```
All tests should pass. Press `q` to quit watch mode.

### 3. Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000` - you should see the example note.

### 4. Deploy to Netlify

**Option A: Via GitHub (Recommended - Autonomous)**
1. Push this repo to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select this repo
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy"

**Done!** Every time you push to GitHub, Netlify:
1. Runs all tests
2. Builds the site (only if tests pass)
3. Deploys (only if build succeeds)

**Option B: Drag & Drop (One-time)**
1. Run tests: `npm run test:ci`
2. Build locally: `npm run build` (includes tests)
3. Drag the `/out` folder to Netlify

## Test-Driven Development

This project uses TDD. **Tests run automatically before every build.**

### Run Tests Locally

```bash
# Watch mode (for development)
npm test

# CI mode (runs once, like Netlify does)
npm run test:ci

# Build (runs tests first)
npm run build
```

### What Gets Tested

✅ All markdown file reading logic  
✅ YAML frontmatter parsing  
✅ Note component rendering  
✅ Page integration  
✅ Edge cases (empty vault, missing properties, etc.)

**29 tests** ensure quality. See [TESTING.md](./TESTING.md) for details.

## Adding Your Obsidian Notes

### Method 1: Manual Copy
1. Go to your Obsidian vault
2. Copy `.md` files to this project's `/vault` folder
3. **Run tests**: `npm test` (ensure nothing broke)
4. Commit and push

### Method 2: Sync
- Set up a script/workflow to copy notes from Obsidian → `/vault`
- Or use Obsidian Git plugin to sync to this repo
- Tests will run automatically on push

## Updating Content

Since this is static, any content changes require a rebuild:
1. Update markdown files in `/vault`
2. (Optional) Run tests locally: `npm test`
3. Push to GitHub
4. Netlify runs tests → builds → deploys (takes ~1-2 minutes)

## Build Pipeline

The build process is:
```
npm run build
  ↓
npm run test:ci (all tests must pass)
  ↓
next build (only runs if tests pass)
  ↓
Deploys to Netlify (only if build succeeds)
```

**If any test fails, the entire build fails and deploy is blocked.**

## Troubleshooting

### Build Failed on Netlify
1. Check the build log - it will show which test failed
2. Run `npm run test:ci` locally to reproduce
3. Fix the issue and push again

### Tests Pass Locally But Fail on Netlify
- Ensure all files are committed
- Check that `/vault` has at least one `.md` file
- Verify Node version matches (20) in `netlify.toml`

## Tips

- **Keep it simple**: The `/vault` folder is your content source
- **Privacy**: Only commit notes you want public
- **Properties**: Add YAML frontmatter for rich metadata display
- **Quality**: Tests ensure nothing breaks
- **No maintenance**: Once deployed, it runs autonomously with quality checks

