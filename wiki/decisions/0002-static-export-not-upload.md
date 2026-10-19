---
title: "0002 — Static export with build-time notes, not a runtime upload server"
type: decision
summary: "Accepted 2025-10-08: the site is a Next.js static export reading vault/ at build time; the zip-upload page and API stay in the code but are not served."
status: active
created: 2026-10-19
updated: 2026-10-19
last_verified: 2026-10-19
sources: ["commit 9bac2a5", "commit 92a23e9", next.config.js, app/page.tsx, app/api/upload/route.ts, AGENTS.md, UPLOAD_FEATURE.md]
tags: [architecture, deploy]
---

# 0002 — Static export with build-time notes, not a runtime upload server

## Status

Accepted 2025-10-08 (commit 92a23e9, "Fix tests for static deployment workflow"). Reconstructed from git history on 2026-10-19; no written ADR existed.

## Context

The first commit (9bac2a5) shipped a client-side page with a zip upload form backed by `app/api/upload/route.ts`, and `FINAL_DELIVERY.md` / `UPLOAD_FEATURE.md` describe that flow. Netlify hosting was set up as a static site (`netlify.toml`, publish `out/`).

## Decision

- `next.config.js` sets `output: 'export'`. The home page reads notes from `vault/` at build time with `getAllNotes()` and, when empty, tells you to run `npm run import-vault`.
- The page tests were rewritten for that empty state (commit 92a23e9). The upload form, route and `lib/zipExtractor.ts` remain in the repo with their tests, but nothing renders or serves them.

## Consequences

- No server runtime, no upload limits, nothing to maintain after deploy.
- New notes need a rebuild: replace `vault.zip` (or sync) and push.
- The root docs still advertise upload. Either re-enable upload on a runtime host (Netlify Functions or a server build) or delete the dead code and fix the docs — undecided *(as of 2026-10-19)*.

## Related

- [[vault-content-paths]] · [[docs-upload-feature]] · [[netlify-static-deploy]] · [[gotchas]]
