---
title: Upload feature guide
type: source
created: 2026-07-30
updated: 2026-10-19
tags: [upload, zip, user-facing]
sources: ["UPLOAD_FEATURE.md"]
status: superseded
summary: "Superseded digest of UPLOAD_FEATURE.md: the browser zip upload, which the static export doesn't serve."
last_verified: 2026-10-19
---

# Upload feature guide

Compiled from `UPLOAD_FEATURE.md`: browser zip upload for non-developer users.

> **Superseded (checked 2026-10-19):** this flow is not live. The site is a static export and the page doesn't render the upload form — see [[0002-static-export-not-upload]].

## Key points

- **Flow:** Visit site → choose `vault.zip` → upload → notes display instantly with Bases badges.
- **Included:** All `.md` files, YAML frontmatter, nested folders (flattened to list).
- **Skipped:** `.obsidian/`, hidden files, images/PDFs, non-markdown attachments.
- **Privacy:** Server-side processing; zips not stored permanently; session-only (refresh clears notes).
- **Endpoint:** `POST /api/upload` → `{ success, notesCount, notes[] }`.

## Detailed notes

### Limits

| Constraint | Value |
|------------|-------|
| Max zip size | 10 MB (Netlify free tier) |
| Notes tested | 1000+ |
| Upload time | ~2–5 s typical |

### Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "No markdown notes found" | Empty or wrong zip | Zip actual vault folder with `.md` files |
| "Only .zip files allowed" | Wrong extension | Use `.zip` only |
| Stuck "Uploading…" | Large vault / slow network | Wait or try smaller vault |
| Missing property badges | No YAML frontmatter | Notes still display; badges optional |

### Test coverage

- 11 tests for zip extraction
- 5 tests for upload UI
- Part of total ~47 test suite

## Entities mentioned

- [[obsidian-react-app]]
- [[netlify-static-deploy]]

## Concepts discussed

- [[obsidian-bases-yaml-frontmatter]]
- [[vault-content-paths]]

## Related

- [[readme-project-overview]]
- [[SCHEMA]]
