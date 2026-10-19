---
title: Obsidian React app (this repository)
type: entity
created: 2026-07-30
updated: 2026-10-19
tags: [obsidian-react, nextjs, frontend]
aliases: [obsidian-react, bases viewer]
sources: ["[[readme-project-overview]]"]
status: active
summary: "The repo's Next.js 15 static site: where UI, note parsing and tests live; upload code is dormant."
last_verified: 2026-10-19
---

# Obsidian React app (this repository)

## What it is

**obsidian-react** — a Next.js 15 static site that reads Obsidian markdown with YAML frontmatter and displays notes as cards with Bases property badges. Built TDD-first with Jest (app) and Python unittest (sync).

## How it's used in this project

- **UI:** `app/page.tsx`, `app/components/NoteCard.tsx`
- **Logic:** `lib/noteReader.ts`, `lib/notes.ts`
- **Upload API:** `app/api/upload` (zip → parsed notes JSON) — in the code but not served by the static export ([[0002-static-export-not-upload]])
- **Content:** `/vault` at build time (sync, import, or committed zip)
- **Deploy:** Netlify static export → `out/` (see [[netlify-static-deploy]])

## Key details

- **GitHub:** `noidsoup/obsidian-react`
- **Package:** `obsidian-react` v0.1.0
- **Test count:** 33 Jest + 12 sync per the runners (commit da9606c, 2026-10-10); README's ~47 is stale. Verify with `npm run verify`
- **AI bootstrap:** LanceDB sidecar for semantic doc search ([[lancedb-project-knowledge]])

## Related

- [[documentation-in-repo]]
- [[vault-content-paths]]
- [[netlify-static-deploy]]
- [[obsidian-sync-script]]
- [[tdd-proof-chain]]
- [[SCHEMA]]
