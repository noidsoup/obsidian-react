# Wiki Schema

> This file tells the LLM how to maintain this wiki. Read it at the start of every session that touches wiki pages.

## Project

- **Name**: Obsidian Bases Viewer (obsidian-react)
- **Domain**: Next.js static site that displays Obsidian notes with YAML frontmatter (Bases properties) as badges. Supports vault upload (zip), developer sync from a local Obsidian vault, or committed `/vault` markdown for Netlify builds. TDD-first: Jest + Python sync tests gate every deploy.

## Directory structure

The vault folder at the project root is **`obsidian-react wiki/`** (repository folder basename `obsidian-react`, a space, then `wiki`) — not bare `wiki/`.

```
obsidian-react wiki/
├── SCHEMA.md          ← you are here (LLM instructions)
├── index.md           ← content catalog, organized by type
├── log.md             ← chronological operations log
├── sources/           ← summaries of ingested documents
├── entities/          ← concrete things (tools, services, APIs, configs)
├── concepts/          ← patterns, principles, architectural ideas
├── decisions/         ← architecture decision records (ADRs)
├── guides/            ← how-tos, runbooks, procedures
├── memories/          ← SimpleMem mirror + how-to (when present)
└── assets/            ← images, diagrams, attachments
```

## Page conventions

### Filenames

- **Kebab-case**, lowercase: `obsidian-sync-script.md`, `netlify-static-deploy.md`
- Singular nouns for entities: `obsidian-react-app.md` not `obsidian-react-apps.md`
- Verb-noun for guides: `local-dev-and-verify.md`
- Decisions use numbered prefix: `0001-lancedb-python-sidecar-retrieval.md`

### Frontmatter

Every page MUST have YAML frontmatter:

```yaml
---
title: Human-Readable Page Title
type: source | entity | concept | decision | guide
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [relevant, tags]
aliases: [alternate-name, abbreviation]
sources: ["[[source-page]]"]
status: active | draft | superseded | archived
---
```

### Links

Use Obsidian-style wikilinks exclusively:

- `[[page-name]]` for standard links
- `[[page-name|display text]]` for aliased links
- `[[page-name#section]]` for section links
- Never use markdown-style `[text](url)` for internal wiki links (reserve for external URLs)

### Page structure

Every page follows this skeleton:

```markdown
---
(frontmatter)
---

# Title

One-paragraph summary of what this page covers.

## Content sections
(varies by page type)

## Related
- [[linked-page-1]]
- [[linked-page-2]]
```

## Page types

### Source (`sources/`)

Summary of an ingested document, article, file, or conversation.

- **Key points** (bulleted takeaways)
- **Detailed notes**
- **Entities mentioned** — `[[wikilinks]]`
- **Concepts discussed** — `[[wikilinks]]`

### Entity (`entities/`)

A concrete thing: tool, service, API, library, config.

- **What it is** / **How it's used in this project** / **Key details** / **Related**

### Concept (`concepts/`)

A pattern, principle, or architectural idea.

- **Definition** / **Application here** / **Tradeoffs** / **Related**

### Decision (`decisions/`)

ADR. Filename: `NNNN-short-title.md`.

- **Status** / **Context** / **Decision** / **Consequences** / **Related**

### Guide (`guides/`)

How-to or runbook.

- **Prerequisites** / **Steps** / **Troubleshooting** / **Related**

## Operations

### Obsidian (human viewer)

Open the folder **`obsidian-react wiki/`** as a vault (Obsidian → Open folder as vault). Graph view and backlinks work with wikilinks.

### Ingest

When the user provides a new source: create `sources/…`, update entities/concepts/decisions/guides, refresh `index.md`, append `log.md`.

### Ingest existing docs

Migrate from repo markdown in batches; synthesize; do **not** delete original files without human sign-off.

### Query

Read `index.md`, then relevant pages; answer with `[[wikilinks]]`; offer to file synthesis as new pages.

### Lint

Orphans, dead links, index drift, stale frontmatter, thin pages — report as checklist; fix with user approval.

## Style rules

- Clear, direct prose. Prefer concrete paths, commands, and versions.
- Use project terminology: vault, Bases, frontmatter, sync, upload.
- Update `updated` in frontmatter when editing a page.

## Relationship to other project files

- **README.md**, **PROJECT_RULES.md**, **TESTING.md**, **SYNC.md**, **UPLOAD_FEATURE.md**: ingested into `sources/` + derived pages (2026-07-30). Original files **not** deleted.
- **`memories/memories.json`**: SimpleMem CLI store (when added). Wiki mirror: [[simplemem-in-wiki]].
- **AI_SESSION_MEMORY.md**: Session breadcrumbs; wiki is compiled long-form knowledge.
- **AGENTS.md**: Agent index at repo root; complements this SCHEMA.
- **LanceDB**: Local semantic search — see [[lancedb-project-knowledge]].
