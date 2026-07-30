---
title: LanceDB project knowledge search
type: entity
created: 2026-07-30
updated: 2026-07-30
tags: [lancedb, retrieval, semantic-search]
aliases: [lancedb, project-knowledge]
status: active
---

# LanceDB project knowledge search

## What it is

Local **offline semantic index** (LanceDB + sentence-transformers) over repo markdown, rules, and docs. Python sidecar scripts in `scripts/`; index store gitignored under `uncommitted/lancedb_project_knowledge/`.

## How it's used in this project

Agents search **before** blind grep when answering "where is X" or recalling decisions:

```bash
python3 -u scripts/search_project_knowledge_lancedb.py "<question>" --top-k 8
python3 -u scripts/index_project_knowledge_lancedb.py --apply
python3 -u scripts/index_project_knowledge_lancedb.py --apply --files AGENTS.md README.md
```

Governed by `.cursor/rules/project-knowledge-lancedb.mdc` (always applied). Optional venv: `.venv-lancedb/` + `requirements-lancedb.txt`.

## Key details

- **Adoption:** [[0001-lancedb-python-sidecar-retrieval]] — Python sidecar in a Next.js repo.
- **Env:** `PROJECT_KNOWLEDGE_LANCEDB_DIR` in `.env` overrides default index path.
- **Agent duty:** re-index after editing indexed content before close-out.
- **Retrieval order:** SimpleMem (if present) → LanceDB → vault recall → long-term memory.

## Related

- [[0001-lancedb-python-sidecar-retrieval]]
- [[documentation-in-repo]]
- [[obsidian-react-app]]
- [[SCHEMA]]
