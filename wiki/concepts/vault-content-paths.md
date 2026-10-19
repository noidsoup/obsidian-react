---
title: Vault content paths
type: concept
created: 2026-07-30
updated: 2026-10-19
tags: [vault, upload, sync, build]
aliases: [three-paths, vault-ingestion]
status: active
summary: "The ways notes reach the site (vault.zip, sync, import-vault; upload not live) and their trade-offs."
last_verified: 2026-10-19
---

# Vault content paths

## Definition

Three distinct ways markdown notes reach the static site — each suited to a different user or workflow.

## Application here

| Path | Who | How | Persistence |
|------|-----|-----|-------------|
| **Upload** *(not live — see [[0002-static-export-not-upload]])* | End user (non-dev) | Zip vault in browser → `POST /api/upload` | Session only; refresh clears |
| **Sync** | Developer | `npm run sync` from local Obsidian → `/vault` | Local files until git push |
| **Committed vault** | Deploy | `vault.zip` in repo root (prebuild extracts it); `vault/` itself is gitignored | Baked into static build on Netlify |
| **Import a zip** | Developer | `npm run import-vault <zip>` (always wipes `vault/` first) | Local files until rebuild |

### Build-time read

`getAllNotes()` reads `/vault` at **build time** for the static export. The upload path would be **runtime**, but the static export has no API routes and the page doesn't render the form (checked 2026-10-19 in `next.config.js` and `app/page.tsx`).

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
