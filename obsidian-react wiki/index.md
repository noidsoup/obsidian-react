---
title: Wiki Index
type: index
created: 2026-07-30
updated: 2026-07-30
---

# Obsidian React Wiki

> Content catalog. The LLM reads this first when answering queries. Conventions: [[SCHEMA]].

## Session memories (SimpleMem)

| Page | Purpose |
|------|---------|
| [[simplemem-in-wiki]] | Where **`memories/memories.json`** and the wiki archive relate; refresh when SimpleMem is added. |

## Sources

| Page | Summary | Date |
|------|---------|------|
| [[readme-project-overview]] | Next.js static viewer, upload + sync + deploy paths, TDD | 2026-07-30 |
| [[docs-project-rules]] | Proof-chain rule: no code ships without automated tests | 2026-07-30 |
| [[docs-upload-feature]] | Zip upload flow, privacy, API endpoint, limits | 2026-07-30 |
| [[docs-sync-system]] | Python sync Obsidian → `/vault`, watch mode, 12 tests | 2026-07-30 |

## Entities

| Page | What it is |
|------|------------|
| [[obsidian-react-app]] | This repo: Next.js 15 static site for Obsidian Bases notes. |
| [[lancedb-project-knowledge]] | Local offline semantic search over repo docs (LanceDB + sentence-transformers). |
| [[netlify-static-deploy]] | Netlify build, `out/` publish, test-gated pipeline. |
| [[obsidian-sync-script]] | Python `sync/sync_obsidian.py` — copies `.md` from local vault to `/vault`. |

## Concepts

| Page | Summary |
|------|---------|
| [[tdd-proof-chain]] | Write test → RED → GREEN → refactor; build blocks deploy on failure. |
| [[obsidian-bases-yaml-frontmatter]] | YAML frontmatter parsed as Bases properties, shown as badges. |
| [[vault-content-paths]] | Three ways notes reach the site: upload, sync, or committed vault. |

## Decisions

| # | Decision | Status |
|---|----------|--------|
| [[0001-lancedb-python-sidecar-retrieval]] | Python sidecar LanceDB for semantic doc search in a Next.js repo | Accepted |

## Guides

| Page | Purpose |
|------|---------|
| [[documentation-in-repo]] | AGENTS, README, root docs vs vault; ingest note. |
| [[local-dev-and-verify]] | `npm run dev`, tests, `.verify.sh`, Netlify deploy. |
