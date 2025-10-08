# Super Simple Deployment Guide

## 🎯 The Easiest Workflow

### For You (One-Time Setup)

1. **Get her vault.zip**
   - She sends you `vault.zip`
   - Or she exports it herself

2. **Put it in the repo**
   ```bash
   # Copy her vault.zip to project root
   cp /path/to/her/vault.zip ./vault.zip
   ```

3. **Push to GitHub**
   ```bash
   git add vault.zip
   git commit -m "Add vault content"
   git push
   ```

4. **Netlify auto-deploys**
   - Netlify sees the push
   - Runs build (extracts vault.zip → builds site)
   - Deploys live
   - Done!

---

## 🚀 How It Works

**Build Process (Automatic):**
```
git push
    ↓
Netlify runs: npm run build:netlify
    ↓
prebuild.js finds vault.zip
    ↓
Extracts to /vault folder
    ↓
Tests run (47 tests)
    ↓
Next.js builds static site
    ↓
Deploy to CDN
    ↓
Live! 🎉
```

---

## 📝 File Structure

```
obsidian-react/
├── vault.zip          ← PUT HER VAULT HERE
├── vault/             ← Auto-generated (don't commit)
├── scripts/
│   └── prebuild.js    ← Auto-extracts vault.zip
└── ... (rest of app)
```

---

## 🔄 Updating Her Vault

**Easy Updates:**

1. **She gives you new vault.zip**
2. **Replace the old one**
   ```bash
   cp /path/to/new/vault.zip ./vault.zip
   ```
3. **Push**
   ```bash
   git add vault.zip
   git commit -m "Update vault"
   git push
   ```
4. **Netlify auto-deploys the update**

---

## 🌐 Initial Netlify Setup

### Step 1: Push to GitHub

```bash
# Make sure vault.zip is in repo
git add .
git commit -m "Initial commit with vault"
git push
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select `obsidian-react` repo
5. **Netlify auto-detects everything from `netlify.toml`**
6. Click "Deploy"

**That's it!** Netlify will:
- Run prebuild (extract vault.zip)
- Run tests
- Build site
- Deploy

---

## ✅ What Gets Deployed

**Static Site:**
- All her markdown notes
- Properties displayed as badges
- Dark theme
- Fast loading
- Mobile-friendly

**Permanent Display:**
- She just visits the URL
- No upload needed
- Always shows her notes
- Updates when you push new vault.zip

---

## 🎯 Simple Workflow Summary

**For Initial Deploy:**
```bash
1. Get vault.zip from her
2. cp vault.zip ./
3. git add vault.zip
4. git push
5. Connect to Netlify (one-time)
6. Done!
```

**For Updates:**
```bash
1. Get new vault.zip
2. cp new-vault.zip ./vault.zip
3. git add vault.zip
4. git commit -m "Update"
5. git push
6. Done! (auto-deploys)
```

---

## 🔧 Advanced: Build Locally First

**Test before pushing:**

```bash
# 1. Add vault.zip to repo
cp /path/to/vault.zip ./

# 2. Test build locally
npm run build:netlify

# 3. Preview
npm start
# Visit http://localhost:3000

# 4. If good, push
git add .
git commit -m "Add vault"
git push
```

---

## 📊 What Happens on Netlify

**Build Log you'll see:**

```
📦 Found vault.zip - importing...
✅ Imported 47 markdown files from vault.zip
📁 Files ready in vault/ folder

Running tests...
✅ 25 tests passed (web app)
✅ 12 tests passed (sync system)

Building Next.js...
✅ Build complete
✅ Static site generated in /out

Deploying...
✅ Live at: https://your-site.netlify.app
```

---

## 🎁 Benefits

✅ **No manual sync** - Just drop vault.zip and push  
✅ **Automated** - Netlify handles everything  
✅ **Tested** - 47 tests run before deploy  
✅ **Fast** - Static site, CDN-delivered  
✅ **Simple** - She just visits the URL  

---

## 🆘 Troubleshooting

### "No vault.zip found"
**Cause:** vault.zip not in repo root  
**Fix:** Make sure vault.zip is in the root directory

### "Build failed"
**Cause:** Tests failed or zip is corrupted  
**Fix:** Check Netlify build log, test locally first

### "No notes showing"
**Cause:** vault.zip has no markdown files  
**Fix:** Make sure her vault has `.md` files

---

## 📞 Quick Reference

**Deploy Command (Netlify):** `npm run build:netlify`  
**Local Test:** `npm run build:netlify && npm start`  
**Update Vault:** Replace vault.zip → commit → push  

**Deploy Time:** ~1-2 minutes  
**Update Time:** ~1-2 minutes  

---

**That's it! Simplest deployment possible.** 🚀

