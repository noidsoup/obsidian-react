---
title: TDD proof chain
type: concept
created: 2026-07-30
updated: 2026-07-30
tags: [tdd, testing, quality]
aliases: [proof-chain, test-first]
sources: ["[[docs-project-rules]]", "PROJECT_RULES.md", "TESTING.md"]
status: active
---

# TDD proof chain

## Definition

Test-Driven Development: write an automated test that specifies behavior **before** implementation; use RED → GREEN → REFACTOR; never ship logic without CI proof.

## Application here

1. **Jest** — `lib/__tests__/`, `app/__tests__/`, `app/components/__tests__/`
2. **Python unittest** — `sync/__tests__/sync.test.py` (12 tests)
3. **Build gate** — `npm run build` runs `test:all` before `next build`
4. **Netlify** — deploy fails if `test:ci` fails

### Test areas (from TESTING.md)

| Module | Coverage |
|--------|----------|
| `noteReader.ts` | Directory read, frontmatter parse, edge cases |
| `notes.ts` | `getAllNotes()` vault aggregation |
| `NoteCard.tsx` | Render, truncate, badges, empty props |
| `page.tsx` | Empty state, note list, vault path |

## Tradeoffs

| Pro | Con |
|-----|-----|
| Autonomous deploy confidence | Slower initial feature velocity |
| Living documentation in tests | Test maintenance overhead |
| Regression safety | Requires discipline on edge cases |

## Related

- [[docs-project-rules]]
- [[obsidian-react-app]]
- [[netlify-static-deploy]]
- [[local-dev-and-verify]]
- [[SCHEMA]]
