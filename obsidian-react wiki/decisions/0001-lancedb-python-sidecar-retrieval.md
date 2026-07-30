---
title: LanceDB Python sidecar for retrieval
type: decision
created: 2026-07-30
updated: 2026-07-30
tags: [lancedb, retrieval, adr]
status: accepted
---

# LanceDB Python sidecar for retrieval

## Status

Accepted (2026-07-30)

## Context

obsidian-react is a **Next.js** repo without a native Python runtime. Agents still need semantic search over markdown, rules, and session docs. Options considered:

1. **Python sidecar** — copy LanceDB scripts from Python repos; index reads markdown only.
2. **Cross-repo vault recall** — rely on central ghembed index (machine-dependent).
3. **Platform-only retrieval** — Honcho / session search only (no per-repo index).

## Decision

Adopt **Option A: Python sidecar**. Ship `scripts/index_project_knowledge_lancedb.py`, `scripts/search_project_knowledge_lancedb.py`, `scripts/project_knowledge_lancedb_common.py`, `requirements-lancedb.txt`, and `.cursor/rules/project-knowledge-lancedb.mdc`. Index store under gitignored `uncommitted/lancedb_project_knowledge/`.

## Consequences

- **Easier:** Fast offline semantic recall; consistent with fleet repos; agents search before grep.
- **Harder:** Requires Python venv setup (`.venv-lancedb`); agents must re-index after doc edits.
- **Retrieval order:** SimpleMem → LanceDB → vault → long-term memory (per AGENTS bootstrap).

## Related

- [[lancedb-project-knowledge]]
- [[documentation-in-repo]]
- [[local-dev-and-verify]]
- [[SCHEMA]]
