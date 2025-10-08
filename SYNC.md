# Obsidian Vault Sync System

**Fully automated, fully tested, fully documented.**

This sync system automatically copies your Obsidian notes to the project's `/vault` folder.

## ⚡ Core Rule Applied

**Every sync function is tested first.** The sync script has 12 automated tests that prove it works.

## Quick Setup (3 steps)

### 1. Create Config File

```bash
cp sync.config.json.example sync.config.json
```

Edit `sync.config.json` with your Obsidian vault path:

```json
{
  "obsidian_vault_path": "~/Documents/MyObsidianVault",
  "flatten": true,
  "clean": false
}
```

### 2. Run Sync

```bash
npm run sync
```

Done! Your Obsidian notes are now in `/vault`.

### 3. Auto-Sync (Optional)

For automatic syncing when you save notes in Obsidian:

```bash
# Install watchdog (one-time setup)
pip install watchdog

# Start watching
npm run sync:watch
```

Now any change in your Obsidian vault automatically syncs!

## Commands

| Command | What It Does |
|---------|--------------|
| `npm run sync` | One-time sync from Obsidian → vault |
| `npm run sync:watch` | Watch mode - auto-sync on changes |
| `npm run sync:clean` | Sync + remove files in vault that aren't in Obsidian |
| `npm run test:sync` | Run sync tests (12 tests) |

## How It Works

The sync script:

✅ **Copies** all `.md` files from your Obsidian vault  
✅ **Preserves** YAML frontmatter and content  
✅ **Skips** hidden files (`.obsidian`, `.git`, etc.)  
✅ **Skips** non-markdown files (images, PDFs, etc.)  
✅ **Flattens** folder structure (optional)  
✅ **Cleans** old files (optional)  
✅ **Watches** for changes (optional)  

## Configuration Options

### `sync.config.json`

```json
{
  "obsidian_vault_path": "/path/to/vault",
  "flatten": true,
  "clean": false
}
```

**Options:**

- **`obsidian_vault_path`** (required): Path to your Obsidian vault
  - Supports `~` for home directory
  - Example: `~/Documents/MyVault`

- **`flatten`** (default: `true`): Put all notes in root of `/vault`
  - `true`: All notes go to `/vault` (ignores folders)
  - `false`: Preserves folder structure from Obsidian

- **`clean`** (default: `false`): Remove files in `/vault` not in Obsidian
  - `true`: Keeps `/vault` exactly matching Obsidian
  - `false`: Only adds/updates files, never removes

## Usage Examples

### Basic Usage

```bash
# One-time sync
npm run sync

# Output:
# Syncing from: /Users/you/Documents/ObsidianVault
# Syncing to:   vault
# Flatten:      true
# Clean:        false
#
# ✓ Synced:  47 files
#   Skipped: 12 files
#
# Sync complete!
```

### Watch Mode

```bash
# Auto-sync on changes
npm run sync:watch

# Output:
# Syncing from: /Users/you/Documents/ObsidianVault
# Syncing to:   vault
# Flatten:      true
# Clean:        false
#
# Performing initial sync...
# ✓ Synced: 47 files
#
# Watch mode - monitoring for changes...
# Press Ctrl+C to stop
#
# [12:34:56] Change detected, syncing...
# ✓ Synced: 47 files
```

### Clean Mode

```bash
# Remove files not in Obsidian
npm run sync:clean

# Output:
# ✓ Synced:  47 files
#   Skipped: 12 files
#   Removed: 3 files
```

### Command Line Arguments

You can override config with CLI args:

```bash
# Specify vault path directly
python sync/sync_obsidian.py ~/Documents/MyVault

# Custom destination
python sync/sync_obsidian.py ~/Documents/MyVault --dest custom_vault

# Preserve folder structure
python sync/sync_obsidian.py ~/Documents/MyVault --no-flatten

# Enable cleaning
python sync/sync_obsidian.py ~/Documents/MyVault --clean

# Watch mode
python sync/sync_obsidian.py ~/Documents/MyVault --watch
```

## What Gets Synced

### ✅ Synced

- All `.md` files
- YAML frontmatter
- Markdown content
- Files in subdirectories (flattened by default)

### ❌ Skipped

- `.obsidian/` folder (Obsidian config)
- Hidden files/folders (starting with `.`)
- Non-markdown files (`.png`, `.pdf`, `.json`, etc.)
- `.git/` folder

### Example

**Your Obsidian vault:**
```
MyVault/
├── .obsidian/          ← Skipped
├── Daily Notes/
│   ├── 2025-10-08.md  ← Synced
│   └── image.png       ← Skipped
├── Projects/
│   ├── Project A.md    ← Synced
│   └── Project B.md    ← Synced
└── README.md           ← Synced
```

**After sync (flatten=true):**
```
vault/
├── 2025-10-08.md
├── Project A.md
├── Project B.md
└── README.md
```

## Automated Workflow

### Local Development

```bash
# Terminal 1: Watch Obsidian vault
npm run sync:watch

# Terminal 2: Dev server
npm run dev

# Now: Edit in Obsidian → Auto-syncs → Hot reloads in browser!
```

### Deployment Workflow

```bash
# 1. Sync from Obsidian
npm run sync

# 2. Test everything (includes sync tests)
npm run test:all

# 3. Build (runs tests first)
npm run build

# 4. Push to GitHub
git add .
git commit -m "Update notes"
git push

# 5. Netlify auto-deploys
```

## Testing

The sync system has **12 comprehensive tests**:

```bash
# Run sync tests
npm run test:sync

# Output:
# ............
# ----------------------------------------------------------------------
# Ran 12 tests in 0.043s
#
# OK
```

**What's tested:**
- ✅ File filtering (markdown only, skip hidden)
- ✅ YAML frontmatter preservation
- ✅ Content copying
- ✅ Subdirectory handling
- ✅ Flattening structure
- ✅ Clean mode (removing old files)
- ✅ Config loading
- ✅ Error handling

## Troubleshooting

### "No source vault specified"
**Fix:** Create `sync.config.json` with your vault path:
```json
{
  "obsidian_vault_path": "~/Documents/MyVault"
}
```

### "Source vault does not exist"
**Fix:** Check the path in your config is correct. Try absolute path:
```json
{
  "obsidian_vault_path": "/Users/yourname/Documents/MyVault"
}
```

### Watch mode not working
**Fix:** Install watchdog:
```bash
pip install watchdog
```

### Files not showing up
**Check:**
1. Are they `.md` files? Only markdown is synced
2. Are they in hidden folders? (`.obsidian`, `.git` are skipped)
3. Run with verbose to see what's skipped

### Permission errors
**Fix:** Make sure you have read access to Obsidian vault and write access to project folder.

## Advanced Usage

### Custom Sync Script

You can import the functions in your own Python script:

```python
from sync.sync_obsidian import sync_vault, should_sync_file

# Custom sync
result = sync_vault(
    source_vault='/path/to/vault',
    dest_vault='custom_dest',
    flatten=False,
    clean=True
)

print(f"Synced {result['synced']} files")
```

### Pre-commit Hook

Auto-sync before every commit:

```bash
# .git/hooks/pre-commit
#!/bin/bash
npm run sync
git add vault/
```

### GitHub Actions

Auto-sync from Obsidian on schedule:

```yaml
# .github/workflows/sync.yml
name: Sync Obsidian
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync
        run: npm run sync
      - name: Commit
        run: |
          git add vault/
          git commit -m "Auto-sync notes" || exit 0
          git push
```

## Integration with Build Pipeline

The sync tests are now part of the build:

```bash
npm run build
    ↓
npm run test:all
    ↓
  ├─ Jest tests (25 tests)
  └─ Sync tests (12 tests)  ← New!
    ↓
next build (only if all 37 tests pass)
    ↓
Deploy
```

**Total: 37 automated tests before every deployment!**

## Summary

✅ **Fully automated** - One command to sync  
✅ **Fully tested** - 12 tests prove it works  
✅ **Watch mode** - Auto-sync on changes  
✅ **Safe** - Skips system files automatically  
✅ **Flexible** - Config file + CLI options  
✅ **Integrated** - Part of build pipeline  

**No manual copying. No guessing. Just automation.** 🚀

---

**Current Status:**
- ✅ 12 sync tests passing
- ✅ Config system ready
- ✅ Watch mode available
- ✅ Integrated with build
- ✅ Fully documented

