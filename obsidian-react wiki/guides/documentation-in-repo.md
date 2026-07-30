---
title: Documentation in the repo vs this wiki
type: guide
created: 2026-07-30
updated: 2026-07-30
tags: [documentation, onboarding]
status: active
---

# Documentation in the repo vs this wiki

This vault (**`obsidian-react wiki/`**) holds **compiled, linked knowledge** for humans and LLMs (entities, concepts, ADRs, runbooks). It does not replace every markdown file at the repo root.

## Canonical repo docs (live outside the vault)

| Location | Role |
|----------|------|
| `AGENTS.md` | Always-on agent index: stack pointers, retrieval order, verify gate. |
| `AI_SESSION_MEMORY.md` | Dated session breadcrumbs (AI-maintained). |
| `README.md` | Human clone/setup and project overview. |
| `PROJECT_RULES.md` | TDD proof-chain rule (non-negotiable). |
| `TESTING.md` | Test inventory and TDD workflow. |
| `SYNC.md` / `UPLOAD_FEATURE.md` | Developer sync and user upload guides. |
| `WIKI.md` | Pointer to this vault (`obsidian-react wiki/`). |
| `memories/memories.json` | **SimpleMem** local store (when added). Wiki: [[simplemem-in-wiki]]. |

## Docs ingest (batch 2026-07-30)

Root markdown was compiled into **`sources/`** plus entities, concepts, guides, and **[[0001-lancedb-python-sidecar-retrieval]]**. Original files were **not** deleted.

## When to add to the wiki

- Cross-cutting **decisions** → `decisions/`
- **How-tos** that outgrow a single README section → `guides/`
- **Systems we integrate with** (Netlify, LanceDB, Obsidian sync) → `entities/` and `concepts/`

## Related

- [[SCHEMA]]
- [[obsidian-react-app]]
- [[index]]
- [[lancedb-project-knowledge]]
