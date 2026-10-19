---
title: Netlify static deploy
type: entity
created: 2026-07-30
updated: 2026-10-19
tags: [netlify, deploy, ci]
aliases: [netlify, static-export]
status: active
summary: "Netlify static hosting: build:netlify (prebuild + Jest + next build), Node 20, publish out/."
last_verified: 2026-10-19
---

# Netlify static deploy

## What it is

Production hosting for [[obsidian-react-app]] via Netlify static site generation. Configuration in `netlify.toml`.

## How it's used in this project

```toml
[build]
  command = "npm run build:netlify"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

- **`build:netlify`:** `prebuild.js` → `test:ci` → `next build`. The Python sync tests do **not** run on Netlify (`package.json`).
- **Output:** `out/` directory (static HTML/JS).
- **SPA redirect:** `/*` → `/index.html` (status 200).
- **Vault:** Place `vault.zip` in repo root before deploy; prebuild extracts to `/vault`.

## Key details

- Deploy **blocked** if Jest tests fail.
- No API routes are deployed (static export), so the upload API described in `UPLOAD_FEATURE.md` isn't available ([[0002-static-export-not-upload]]).
- Auto-rebuild on git push to connected branch.
- No server runtime — fully static after build.

## Related

- [[obsidian-react-app]]
- [[tdd-proof-chain]]
- [[local-dev-and-verify]]
- [[vault-content-paths]]
- [[SCHEMA]]
