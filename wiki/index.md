---
title: Index
type: overview
summary: Start here. Must-know facts, then one line per page.
status: active
created: 2026-07-30
updated: 2026-10-19
last_verified: 2026-10-19
sources: []
tags: [meta]
---

# obsidian-react wiki

## Must know

- The zip-upload feature in the root docs is not live; the site is a static export that reads `vault/` at build time ([[0002-static-export-not-upload]]).
- `npm test` never exits (watch mode); use `npm run verify` or `npm run test:ci` ([[gotchas]]).
- `vault/` is generated and wiped by prebuild/import; never hand-edit it ([[vault-content-paths]]).
- Notes are someone's personal content; commit only public ones (`AGENTS.md`).
- Root-doc test counts are stale: 33 Jest + 12 sync is the truth (2026-10-10).

## Overview

- [[overview]] — what this is, who it's for, where it runs
- [[gotchas]] — known traps; check after a repeated failure

## Entities

- [[obsidian-react-app]] — the Next.js 15 static site: UI, logic, tests
- [[netlify-static-deploy]] — Netlify build (`build:netlify`, Node 20, `out/`)
- [[obsidian-sync-script]] — `sync/sync_obsidian.py`: local Obsidian vault → `vault/`
- [[lancedb-project-knowledge]] — offline semantic search over repo docs and this wiki

## Concepts

- [[vault-content-paths]] — the ways notes reach the site, and which are live
- [[obsidian-bases-yaml-frontmatter]] — frontmatter parsed as Bases badges
- [[tdd-proof-chain]] — test first; build blocks on red

## Decisions

- [[0001-lancedb-python-sidecar-retrieval]] — Python LanceDB sidecar in a Next.js repo
- [[0002-static-export-not-upload]] — static export with build-time notes; upload code left dormant

## Guides

- [[local-dev-and-verify]] — dev server, tests, verify gate, sync, deploy
- [[documentation-in-repo]] — which root doc holds what vs this wiki

## Sources

- [[readme-project-overview]] — digest of README.md (partly stale)
- [[docs-project-rules]] — digest of PROJECT_RULES.md (prove it with a test)
- [[docs-sync-system]] — digest of SYNC.md
- [[docs-upload-feature]] — superseded: digest of UPLOAD_FEATURE.md (flow not live)
- [[simplemem-in-wiki]] — archived: SimpleMem placeholder (never installed)

## Meta

- [[SCHEMA]] — how to write here · [[log]] — change history
