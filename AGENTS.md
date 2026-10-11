# AGENTS.md — Obsidian Bases Viewer (`obsidian-react`)

**This repo:** a Next.js site that shows Obsidian notes as a static Netlify site. Each note's YAML frontmatter ("Bases" properties) renders as badges. Notes are read from `vault/` at build time; `vault/` is filled from a `vault.zip` in the repo root (prebuild), from a local Obsidian vault (`npm run sync`), or from any zip (`npm run import-vault <zip>`).
**Stack:** Next.js 15 App Router with `output: 'export'` (static `out/`), React 18, TypeScript, `gray-matter`, `adm-zip`; Jest 29 + React Testing Library (jsdom); a stdlib Python 3 sync script in `sync/` (`watchdog` only for watch mode); npm (`.npmrc` sets `legacy-peer-deps`); Netlify on Node 20.

Claude Code loads this file through `.claude/CLAUDE.md`; always-on rules are in `.claude/rules/`.

## Retrieval order (read before acting)

Governed by `.claude/rules/pre-task-retrieval.md`. Cheapest-first:
1. LanceDB (`.venv-lancedb/bin/python -u scripts/search_project_knowledge_lancedb.py "<question>" --top-k 8`)
→ 2. cross-repo vault recall → 3. long-term memory.

The LanceDB index covers `AGENTS.md`, `README.md`, `MEMORY.md`, `AI_SESSION_MEMORY.md` and `.claude/rules/`. It skips the wiki and the other root docs (add the wiki with `PROJECT_KNOWLEDGE_LANCEDB_EXTRA_DIRS` in `.env`); for those, start at `obsidian-react wiki/index.md`.

## Invariants (always apply)

1. **Verify before done.** Run `npm run verify` and paste the real result. See `.claude/rules/verify-before-done.md`.
2. **Prove it with a test** (`PROJECT_RULES.md`). Write the failing test first. Jest tests live in `lib/__tests__/`, `app/__tests__/` and `app/components/__tests__/`; sync tests in `sync/__tests__/sync.test.py`. Never weaken a test to go green.
3. **`npm test` is `jest --watch` and never exits.** Use `npm run test:ci` in scripts and agent runs.
4. **`vault/` is generated** (gitignored). Prebuild wipes and re-extracts it when `vault.zip` exists, and `import-vault` always wipes it. Never hand-edit notes there.
5. **Notes are personal content.** `vault.zip` and `vault/` hold a person's own Obsidian notes; commit only notes meant to be public (`DEPLOY.md`). `sync.config.json` holds a local vault path and is gitignored; copy it from `sync.config.json.example`.
6. **No app secrets.** The app reads no env vars. Only the LanceDB scripts read `.env` (gitignored; see `.env.example`).
7. **Docs drift from the code.** `README.md` and `UPLOAD_FEATURE.md` describe a zip-upload page, but `app/page.tsx` does not render `UploadForm`, and the static export (`out/`) has no `/api/upload`. Test counts in the root docs (25 to 47) are stale; the runners report 33 Jest and 12 sync tests. Trust the code and the runner output.

## Definition of done (commands)

```bash
npm run verify          # .verify.sh: Jest once + npm run build — the agent gate
npm run test:ci         # Jest once (lib, components, page)
npm run test:sync       # Python sync tests; calls `python` (else: python3 sync/__tests__/sync.test.py)
npm run test:all        # test:ci + test:sync
npm run dev             # next dev on :3000 (also in .claude/launch.json)
npm run build           # prebuild (vault.zip -> vault/) + test:all + next build -> out/
npm run build:netlify   # what Netlify runs: prebuild + test:ci + next build
npm start               # serve out/ on :3000
npm run sync            # copy notes from sync.config.json's vault into vault/
```

## Topic → where

| Need | Open |
| ---- | ---- |
| Note reading + frontmatter parsing | `lib/noteReader.ts`, `lib/notes.ts` |
| Page and note card UI | `app/page.tsx`, `app/components/NoteCard.tsx`, `app/globals.css` |
| Zip upload (API, form, extractor) | `app/api/upload/route.ts`, `app/components/UploadForm.tsx`, `lib/zipExtractor.ts`, `UPLOAD_FEATURE.md` |
| Build-time vault import | `scripts/prebuild.js`, `scripts/import-vault.js` |
| Obsidian → `vault/` sync | `sync/sync_obsidian.py`, `SYNC.md`, `sync.config.json.example` |
| TDD rule and test inventory | `PROJECT_RULES.md`, `TESTING.md`, `TDD_FLOW.md` |
| Netlify deploy | `netlify.toml`, `DEPLOY.md`, `SIMPLE_DEPLOY.md` |
| Project wiki (Obsidian vault) | `obsidian-react wiki/`: read `obsidian-react wiki/SCHEMA.md` first (`.claude/rules/llm-wiki.md`) |
| Context7 library IDs | `.cursor/context7-libraries.md` (see `.claude/rules/context7.md`) |
| Recent decisions | `AI_SESSION_MEMORY.md`, `MEMORY.md` |
| Workflows (plan, tdd, gate, migrate…) | global `.loops/` (say "use the loops") |

## Continuity

At close-out: append to `AI_SESSION_MEMORY.md`, update `MEMORY.md`, re-index changed
docs. The AI maintains these — not the human.
