---
title: Session memories in the wiki (SimpleMem)
type: guide
created: 2026-07-30
updated: 2026-07-30
tags: [simplemem, memories, wiki]
status: active
---

# Session memories in the wiki (SimpleMem)

## What lives where

| Location | Role |
|----------|------|
| **`memories/memories.json`** (repo root) | **SimpleMem** local store — what **`simplemem_cli.py`** reads/writes when configured. Commit when the CLI updates it. |
| **`obsidian-react wiki/memories/simplemem-archive.md`** | **Human-readable mirror** for Obsidian graph, wikilinks, and agents that live in the vault. |

## Current status

SimpleMem is **not yet installed** in this repo (no `memories/memories.json` or `simplemem_cli.py`). When added via AI-first bootstrap:

1. Set `SIMPLEMEM_*` in `.env` per `.env.example`.
2. Add `npm run wiki:memories` script (export JSON → archive markdown).
3. Commit both `memories/memories.json` and `obsidian-react wiki/memories/simplemem-archive.md` when entries change.

## Privacy

No secrets, tokens, or passwords in either file. Redact before `simplemem_cli.py add` if needed.

## Related

- [[documentation-in-repo]]
- [[SCHEMA]]
