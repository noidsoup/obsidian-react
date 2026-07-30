---
title: Vault content paths
type: concept
created: 2026-07-30
updated: 2026-07-30
tags: [vault, upload, sync, build]
aliases: [three-paths, vault-ingestion]
status: active
---

# Vault content paths

## Definition

Three distinct ways markdown notes reach the static site — each suited to a different user or workflow.

## Application here

| Path | Who | How | Persistence |
|------|-----|-----|-------------|
| **Upload** | End user (non-dev) | Zip vault in browser → `POST /api/upload` | Session only; refresh clears |
| **Sync** | Developer | `npm run sync` from local Obsidian → `/vault` | Local files until git push |
| **Committed vault** | Deploy | `vault.zip` in repo root or synced `/vault` in git | Baked into static build on Netlify |

### Build-time read

`getAllNotes()` reads `/vault` at **build time** for the static export. Upload path is **runtime** (client-side display after API parse).

### Shared rules (all paths)

- `.md` files only
- Skip `.obsidian/`, hidden files, attachments
- YAML frontmatter → Bases badges ([[obsidian-bases-yaml-frontmatter]])

## Tradeoffs

| Path | Best for | Limitation |
|------|----------|------------|
| Upload | Quick demo, friend's vault | 10 MB, no persistence |
| Sync | Active development | Requires local Obsidian + config |
| Git vault | Production deploy | Manual sync/commit cycle |

## Related

- [[docs-upload-feature]]
- [[docs-sync-system]]
- [[obsidian-sync-script]]
- [[netlify-static-deploy]]
- [[obsidian-react-app]]
- [[SCHEMA]]
