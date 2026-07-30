---
title: Obsidian React app (this repository)
type: entity
created: 2026-07-30
updated: 2026-07-30
tags: [obsidian-react, nextjs, frontend]
aliases: [obsidian-react, bases viewer]
sources: ["[[readme-project-overview]]"]
status: active
---

# Obsidian React app (this repository)

## What it is

**obsidian-react** — a Next.js 15 static site that reads Obsidian markdown with YAML frontmatter and displays notes as cards with Bases property badges. Built TDD-first with Jest (app) and Python unittest (sync).

## How it's used in this project

- **UI:** `app/page.tsx`, `app/components/NoteCard.tsx`
- **Logic:** `lib/noteReader.ts`, `lib/notes.ts`
- **Upload API:** `app/api/upload` (zip → parsed notes JSON)
- **Content:** `/vault` at build time (sync, import, or committed zip)
- **Deploy:** Netlify static export → `out/` (see [[netlify-static-deploy]])

## Key details

- **GitHub:** `noidsoup/obsidian-react`
- **Package:** `obsidian-react` v0.1.0
- **Test count:** ~47 (35 Jest + 12 sync) per README; verify with `npm run test:all`
- **AI bootstrap:** LanceDB sidecar for semantic doc search ([[lancedb-project-knowledge]])

## Related

- [[documentation-in-repo]]
- [[vault-content-paths]]
- [[netlify-static-deploy]]
- [[obsidian-sync-script]]
- [[tdd-proof-chain]]
- [[SCHEMA]]
