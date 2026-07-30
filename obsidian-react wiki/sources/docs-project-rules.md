---
title: Project rules — prove your logic
type: source
created: 2026-07-30
updated: 2026-07-30
tags: [tdd, project-rules]
sources: ["PROJECT_RULES.md"]
status: active
---

# Project rules — prove your logic

Compiled from `PROJECT_RULES.md`: the non-negotiable proof-chain rule for this repo.

## Key points

- **Core rule:** Every feature, change, and fix MUST have an automated test that proves it works.
- **Forbidden:** "I think this works", manual-only verification, shipping without CI proof.
- **Build pipeline:** `npm run build` → `npm run test:all` → `next build` → deploy only on green.
- **Process:** Write test (RED) → minimal code (GREEN) → refactor (stay GREEN) → edge cases.

## Detailed notes

### Proof chain

```
Feature Idea → Write Test → RED → Write Code → GREEN → Refactor → Deploy
```

### Build enforcement

```bash
npm run build
  ↓
npm run test:ci + test:sync   # all must pass
  ↓
next build                    # only if tests pass
  ↓
Deploy                        # Netlify blocks on failure
```

### Checklist for new features

- Test written first; fails before code exists
- Test passes after implementation
- Edge cases covered
- All existing tests still pass

## Entities mentioned

- [[obsidian-react-app]]
- [[netlify-static-deploy]]

## Concepts discussed

- [[tdd-proof-chain]]

## Related

- [[docs-project-rules]]
- [[local-dev-and-verify]]
- [[SCHEMA]]
