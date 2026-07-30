---
title: Local dev and verify
type: guide
created: 2026-07-30
updated: 2026-07-30
tags: [dev, verify, netlify]
status: active
---

# Local dev and verify

## Prerequisites

- Node.js 20+
- `npm install`
- (Optional) Python 3 for sync + LanceDB
- (Optional) `sync.config.json` for Obsidian sync

## Steps

### Development

```bash
npm install
npm run dev
# http://localhost:3000
```

### Tests

```bash
npm test              # Jest watch
npm run test:ci       # Jest once
npm run test:sync     # Python sync tests
npm run test:all      # both suites
```

### Production build

```bash
npm run build         # test:all + next build
npm start             # serve out/ on :3000
```

### Verify gate

```bash
bash .verify.sh       # npm test + npm build (repo ground-truth)
```

### Obsidian sync (optional)

```bash
cp sync.config.json.example sync.config.json
# edit obsidian_vault_path
npm run sync
npm run sync:watch    # requires: pip install watchdog
```

### LanceDB search (optional)

```bash
python3 -m venv .venv-lancedb
.venv-lancedb/bin/pip install -r requirements-lancedb.txt
.venv-lancedb/bin/python -u scripts/index_project_knowledge_lancedb.py --apply
.venv-lancedb/bin/python -u scripts/search_project_knowledge_lancedb.py "how does upload work"
```

### Deploy

Push to GitHub → Netlify runs `npm run build:netlify` → publishes `out/`. See [[netlify-static-deploy]].

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Sync "No source vault" | Create `sync.config.json` with valid path |
| Watch mode fails | `pip install watchdog` |
| LanceDB search empty | Run `index_project_knowledge_lancedb.py --apply` |
| Build fails on tests | Fix failing Jest/sync test before deploy |

## Related

- [[obsidian-react-app]]
- [[tdd-proof-chain]]
- [[obsidian-sync-script]]
- [[netlify-static-deploy]]
- [[lancedb-project-knowledge]]
- [[SCHEMA]]
