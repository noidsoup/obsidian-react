---
title: Overview
type: overview
summary: What the Obsidian Bases Viewer is, who it was built for, how notes get in, and where it deploys.
status: active
created: 2026-10-19
updated: 2026-10-19
last_verified: 2026-10-19
sources: [AGENTS.md, README.md, FINAL_DELIVERY.md, netlify.toml, next.config.js, package.json, app/page.tsx, "commit 92a23e9", "commit da9606c"]
tags: [overview]
---

# obsidian-react (Obsidian Bases Viewer)

A small Next.js site that shows Obsidian notes as cards, with each note's YAML frontmatter ("Bases" properties) as badges. It is a static export: notes are read from `vault/` at build time and baked into `out/` (`AGENTS.md`, `next.config.js`).

## What and why

- **Built for** a non-developer who wanted to see her Obsidian vault on a web page (`FINAL_DELIVERY.md`, "she uploads vault.zip"). Built in one day, 2025-10-08 (`git log`).
- **What shipped is not what the delivery doc says.** The doc promises a browser zip upload. The same day, the app moved to a static export and the home page stopped rendering the upload form; notes now come in at build time ([[0002-static-export-not-upload]]).
- **Since then:** only agent-setup commits (Context7, LanceDB, wiki, Claude Code rules in 2026). No feature work since 2025-10-08.

## People and roles

| Who | Role |
|---|---|
| Nicholas | Owner and developer. |
| The friend ("she" in `FINAL_DELIVERY.md`) | Intended reader of her own notes. Her notes are personal content (`AGENTS.md` invariant 5). |

## Where it runs

| Environment | URL / host | Deploys from |
|---|---|---|
| Local dev | `npm run dev` → http://localhost:3000 | working tree |
| Local static preview | `npm start` (serves `out/` on :3000) | `npm run build` |
| Netlify | site URL not recorded in the repo (docs use the placeholder `your-site.netlify.app`) *(unverified whether a site exists)* | `npm run build:netlify` → `out/`, Node 20 (`netlify.toml`) |
| GitHub | `noidsoup/obsidian-react` | `main` |

## How notes get in

`vault.zip` in the repo root (extracted by `scripts/prebuild.js`), `npm run sync` from a local vault, or `npm run import-vault <zip>`. Details: [[vault-content-paths]].

## Key links

- Agent rules: `AGENTS.md` (loaded via `.claude/CLAUDE.md`), `.claude/rules/`.
- Gate: `npm run verify` (Jest once + `npm run build`, which also runs the 12 sync tests) — [[local-dev-and-verify]].
- TDD rule: `PROJECT_RULES.md` — [[tdd-proof-chain]].

## Related

- [[gotchas]] · [[obsidian-react-app]] · [[index]]
