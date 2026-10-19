---
title: Gotchas
type: overview
summary: Known traps. Check here after a repeated failure.
status: active
created: 2026-10-19
updated: 2026-10-19
last_verified: 2026-10-19
sources: [AGENTS.md, package.json, .verify.sh, next.config.js, app/page.tsx, "commit 92a23e9", "commit da9606c"]
tags: [gotchas]
---

# Gotchas

One line each: the trap, then the fix or the page with details.

- **`npm test` is `jest --watch` and never exits.** Use `npm run test:ci` (or `npm run verify`) in agent runs. The old `.verify.sh` hung on this until commit da9606c. → [[local-dev-and-verify]]
- **The upload feature in README / UPLOAD_FEATURE.md / FINAL_DELIVERY.md is not live.** `app/page.tsx` doesn't render `UploadForm`, and a static export (`output: 'export'`) can't serve `/api/upload`. → [[0002-static-export-not-upload]]
- **Test counts in root docs (25–47) are stale.** The runners report 33 Jest + 12 sync tests (commit da9606c). Trust runner output.
- **`vault/` is generated and gets wiped.** Prebuild re-extracts it when `vault.zip` exists, and `import-vault` always wipes it. Never hand-edit notes there (`AGENTS.md`). → [[vault-content-paths]]
- **`npm run test:sync` calls `python`, not `python3`.** On a Mac with only `python3` it fails; `.verify.sh` maps it, plain npm doesn't. Run `python3 sync/__tests__/sync.test.py` by hand (`AGENTS.md`).
- **Netlify runs only Jest, not the sync tests:** `build:netlify` = prebuild + `test:ci` + `next build` (`package.json`). → [[netlify-static-deploy]]
- **Notes are personal content.** Commit only notes meant to be public; `sync.config.json` holds a local path and is gitignored (`AGENTS.md`).
- **`.npmrc` sets `legacy-peer-deps`.** Leave it unless you've checked a clean install works without it (`AGENTS.md`; why it was added is not recorded).

## Related

- [[overview]] · [[index]]
