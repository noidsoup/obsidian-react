# AGENTS.md — Obsidian Bases Viewer (`obsidian-react`)

**This repo:** a Next.js site that shows Obsidian notes as a static Netlify site. Each note's YAML frontmatter ("Bases" properties) renders as badges. Notes are read from `vault/` at build time; `vault/` is filled from a `vault.zip` in the repo root (prebuild), from a local Obsidian vault (`npm run sync`), or from any zip (`npm run import-vault <zip>`).
**Stack:** Next.js 15 App Router with `output: 'export'` (static `out/`), React 18, TypeScript, `gray-matter`, `adm-zip`; Jest 29 + React Testing Library (jsdom); a stdlib Python 3 sync script in `sync/` (`watchdog` only for watch mode); npm (`.npmrc` sets `legacy-peer-deps`); Netlify on Node 20.

Claude Code loads this file through `.claude/CLAUDE.md`; always-on rules are in `.claude/rules/`.

**Project wiki:** read `wiki/index.md` before non-trivial work; open pages it points to only when relevant.
After a repeated failure, check `wiki/gotchas.md`. Writing to the wiki: follow `wiki/SCHEMA.md`.

## Working rules

1. **Think before coding.** State assumptions, surface tradeoffs, ask before guessing.
2. **Simplicity first.** Minimum code that solves the problem; no speculative abstractions.
3. **Surgical changes.** Touch only what the task needs. Match the existing style.
4. **Read before you write.** Read the file's exports and its caller before adding to it.
5. **Fail loud.** If you can't be sure it worked, say so. Never report skipped work as done.
6. **Check after every change.** Run the type check / tests from "Commands" after each edit.
7. **Behavior changes ship with tests**, where a test runner exists (see "What can be verified").
8. **Never ratchet a test to match current output.** Find why it changed; decide whether the code or the test is wrong.

## Retrieval order (read before acting)

Governed by `.claude/rules/pre-task-retrieval.md`. Cheapest-first:
1. LanceDB (`.venv-lancedb/bin/python -u scripts/search_project_knowledge_lancedb.py "<question>" --top-k 8`)
→ 2. cross-repo vault recall → 3. long-term memory.

The LanceDB index covers `AGENTS.md`, `README.md`, `MEMORY.md`, `AI_SESSION_MEMORY.md`, `.claude/rules/` and `wiki/`. It skips the other root docs (add them with `PROJECT_KNOWLEDGE_LANCEDB_EXTRA_DIRS` in `.env`).

## Invariants (always apply)

1. **Verify before done.** Run `npm run verify` and paste the real result. See `.claude/rules/verify-before-done.md`.
2. **Prove it with a test** (`PROJECT_RULES.md`). Write the failing test first. Jest tests live in `lib/__tests__/`, `app/__tests__/` and `app/components/__tests__/`; sync tests in `sync/__tests__/sync.test.py`. Never weaken a test to go green.
3. **`npm test` is `jest --watch` and never exits.** Use `npm run test:ci` in scripts and agent runs.
4. **`vault/` is generated** (gitignored). Prebuild wipes and re-extracts it when `vault.zip` exists, and `import-vault` always wipes it. Never hand-edit notes there.
5. **Notes are personal content.** `vault.zip` and `vault/` hold a person's own Obsidian notes; commit only notes meant to be public (`DEPLOY.md`). `sync.config.json` holds a local vault path and is gitignored; copy it from `sync.config.json.example`.
6. **No app secrets.** The app reads no env vars. Only the LanceDB scripts read `.env` (gitignored; see `.env.example`).
7. **Docs drift from the code.** `README.md` and `UPLOAD_FEATURE.md` describe a zip-upload page, but `app/page.tsx` does not render `UploadForm`, and the static export (`out/`) has no `/api/upload`. Test counts in the root docs (25 to 47) are stale; the runners report 33 Jest and 12 sync tests. Trust the code and the runner output.

## Commands (tested) — definition of done

Runtime: Node 22.22 / npm 10.9 locally (no `.nvmrc`, no `engines`); Netlify builds on Node 20 (`netlify.toml`).
Python 3.9 system `python3` for the sync tests. · Last verified: 2026-10-22 on `origin/main` (7601caf).

| Task | Command (root) | Result 2026-10-22 |
| ---- | -------------- | ----------------- |
| Install | `npm ci` | exit 0, 5s |
| Type check | `npx tsc --noEmit` | exit 2: 17 errors, all in test files (baseline below). Writes `tsconfig.tsbuildinfo` (gitignored). |
| Test (Jest) | `npm run test:ci` | exit 0: 5 suites, 33 tests |
| Test (sync) | `python3 sync/__tests__/sync.test.py` | exit 0: 12 tests. `npm run test:sync` exits 127 (`python: command not found`) on this Mac. |
| Verify gate | `npm run verify` (`bash .verify.sh`) | exit 0, 11s: Jest + build (adds a temporary `python` shim) |
| Build | `npm run build` | via verify: exit 0, static export of `/` |
| Dev server | `npm run dev` | port 3000, "Ready" in ~1s; page renders "No notes found." with an empty `vault/` |
| Not run | `npm start` (fetches `serve@latest` at run time), `npm run sync` (needs a local `sync.config.json`) | |

All scripts:

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

## Known baseline

`origin/main` 7601caf, 2026-10-22: **`npx tsc --noEmit` reports 17 errors**, all TS2339 `toBeInTheDocument`
in `app/__tests__/page.test.tsx` (4) and `app/components/__tests__/NoteCard.test.tsx` (13): the jest-dom
matcher types are not visible to `tsc` (the import is in `jest.setup.js`). `next build` still passes, and
Jest, sync tests, and the build are clean.

## What can be verified

Jest (lib, page, NoteCard), the Python sync tests, the type check (against the baseline above), and the
static build. UI changes: look at them on the dev server. Netlify deploys are not something agents run.

## Running locally and logging in

No login: the site is public and static, with no auth and no backend. Local runs read only `vault/`
(empty unless you add `vault.zip`, run `npm run import-vault <zip>`, or `npm run sync`).

## Dev vs production gotchas

- Netlify uses Node 20; this Mac runs Node 22. Nothing pins Node locally.
- `next build` lists `/api/upload` as a dynamic route, yet `out/` contains no `api/`: the upload API exists only under `next dev`.

## Git and push safety

- Owner: personal (`noidsoup/obsidian-react`). Default branch: `main`. Work on a branch.
- Push to origin only with Nicholas's OK. Netlify deploys from the repo: never run `netlify deploy`.
- Root `CLAUDE.md` is git-excluded (Origin rewrites it); commit with `git -c core.hooksPath=.git/hooks commit`
  to keep Origin trailers out.

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
| Context7 library IDs | `.cursor/context7-libraries.md` (see `.claude/rules/context7.md`) |
| Recent decisions | `AI_SESSION_MEMORY.md`, `MEMORY.md` |
| Workflows (plan, tdd, gate, migrate…) | global `.loops/` (say "use the loops") |

## Continuity

At close-out: append to `AI_SESSION_MEMORY.md`, update `MEMORY.md`, re-index changed
docs. The AI maintains these — not the human.
