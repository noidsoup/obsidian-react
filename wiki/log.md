---
title: Log
type: overview
summary: Append-only history of wiki changes. Newest last.
status: active
created: 2026-07-30
updated: 2026-10-19
last_verified: 2026-10-19
sources: []
tags: [meta]
---

# Log

Format: `## [YYYY-MM-DD] ingest|session|lint|query|seed|upgrade | one line`. Keep ≤150 entries; move older ones to `log/YYYY.md`. Newest last.

## [2026-07-30] create | Wiki bootstrapped

Initial vault **`obsidian-react wiki/`** created (SCHEMA, index, log, Obsidian settings, `memories/`). Ingested README, PROJECT_RULES, UPLOAD_FEATURE, SYNC, TESTING context into `sources/`; added entities ([[obsidian-react-app]], [[lancedb-project-knowledge]], [[netlify-static-deploy]], [[obsidian-sync-script]]), concepts ([[tdd-proof-chain]], [[obsidian-bases-yaml-frontmatter]], [[vault-content-paths]]), guides ([[documentation-in-repo]], [[local-dev-and-verify]]), ADR [[0001-lancedb-python-sidecar-retrieval]]. Added root **`WIKI.md`** and **`.cursor/rules/llm-wiki.mdc`**. **Did not delete** any root markdown files.

## [2026-10-19] upgrade | Renamed `obsidian-react wiki/` → `wiki/` and moved to the standard schema

- `git mv` keeps history and `.obsidian/`. New SCHEMA.md from the standard template; index rebuilt with a Must-know block; added [[overview]], [[gotchas]], [[0002-static-export-not-upload]] (reconstructed from commit 92a23e9).
- Spot-checked against code: upload flow not live (marked [[docs-upload-feature]] superseded; fixed [[vault-content-paths]], [[obsidian-react-app]], [[netlify-static-deploy]], [[readme-project-overview]]); test counts 33 + 12; verify gate is `test:ci` + build; LanceDB now indexes `wiki/`.
- `memories/` marked archived. Updated old-folder references in AGENTS.md, WIKI.md, `.claude/rules/llm-wiki.md`.
