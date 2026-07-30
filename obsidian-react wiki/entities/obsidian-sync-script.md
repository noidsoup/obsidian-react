---
title: Obsidian sync script
type: entity
created: 2026-07-30
updated: 2026-07-30
tags: [sync, python, obsidian]
aliases: [sync_obsidian.py, vault-sync]
sources: ["[[docs-sync-system]]"]
status: active
---

# Obsidian sync script

## What it is

Python script `sync/sync_obsidian.py` that copies markdown files from a local Obsidian vault into the project's `/vault` folder. Tested by `sync/__tests__/sync.test.py` (12 tests).

## How it's used in this project

```bash
npm run sync              # one-time sync (reads sync.config.json)
npm run sync:watch        # watchdog auto-sync
npm run sync:clean        # sync + remove orphan vault files
npm run test:sync         # run 12 Python tests
```

Config: `sync.config.json` (gitignored; copy from `sync.config.json.example`).

CLI overrides: vault path, `--dest`, `--no-flatten`, `--clean`, `--watch`.

## Key details

| Behavior | Detail |
|----------|--------|
| Synced | `.md` files, YAML frontmatter, subdirs (flattened by default) |
| Skipped | `.obsidian/`, hidden files, non-markdown |
| Watch dep | `pip install watchdog` |
| Build integration | `test:sync` part of `npm run test:all` |

## Related

- [[docs-sync-system]]
- [[vault-content-paths]]
- [[obsidian-react-app]]
- [[local-dev-and-verify]]
- [[SCHEMA]]
