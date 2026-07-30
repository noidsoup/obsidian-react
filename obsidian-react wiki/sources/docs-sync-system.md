---
title: Obsidian vault sync system
type: source
created: 2026-07-30
updated: 2026-07-30
tags: [sync, python, developer]
sources: ["SYNC.md"]
status: active
---

# Obsidian vault sync system

Compiled from `SYNC.md`: developer workflow to copy local Obsidian notes into `/vault`.

## Key points

- **Setup:** `cp sync.config.json.example sync.config.json` → set `obsidian_vault_path`.
- **Commands:** `npm run sync`, `sync:watch`, `sync:clean`, `test:sync` (12 Python tests).
- **Behavior:** Copies `.md` only; skips `.obsidian/`, hidden files, non-markdown; optional flatten and clean modes.
- **Watch mode:** Requires `pip install watchdog`; auto-syncs on vault file changes.

## Detailed notes

### Configuration (`sync.config.json`)

```json
{
  "obsidian_vault_path": "~/Documents/MyObsidianVault",
  "flatten": true,
  "clean": false
}
```

| Option | Default | Meaning |
|--------|---------|---------|
| `obsidian_vault_path` | required | Source Obsidian vault |
| `flatten` | `true` | All notes → `/vault` root |
| `clean` | `false` | Remove vault files not in source |

### Deployment workflow

```bash
npm run sync
npm run test:all
npm run build
git add vault/ && git commit && git push
# Netlify auto-deploys
```

### Integration with build

`npm run build` runs `test:all` (Jest + sync tests) before `next build`.

## Entities mentioned

- [[obsidian-sync-script]]
- [[obsidian-react-app]]
- [[netlify-static-deploy]]

## Concepts discussed

- [[vault-content-paths]]
- [[tdd-proof-chain]]

## Related

- [[local-dev-and-verify]]
- [[SCHEMA]]
