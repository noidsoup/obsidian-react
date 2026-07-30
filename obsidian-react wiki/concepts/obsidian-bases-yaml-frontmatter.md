---
title: Obsidian Bases YAML frontmatter
type: concept
created: 2026-07-30
updated: 2026-07-30
tags: [obsidian, bases, yaml, frontmatter]
aliases: [bases, frontmatter, yaml-properties]
status: active
---

# Obsidian Bases YAML frontmatter

## Definition

Obsidian notes can include YAML frontmatter between `---` delimiters. The app treats these key-value pairs as **Bases properties** and renders them as badges on each note card.

## Application here

Parsed by `gray-matter` in `lib/noteReader.ts`. Example note:

```markdown
---
title: My Note
type: task
status: active
tags: [work, important]
---

Your note content here...
```

- **Title:** from `title` field, or filename if absent.
- **Badges:** all frontmatter keys except duplicated title; arrays shown comma-separated.
- **Upload + sync:** frontmatter preserved through both ingestion paths.

## Tradeoffs

| Pro | Con |
|-----|-----|
| Rich metadata without custom DB | Notes without frontmatter show no badges |
| Compatible with Obsidian Bases | Only markdown ingested (no attachments) |

## Related

- [[obsidian-react-app]]
- [[vault-content-paths]]
- [[docs-upload-feature]]
- [[SCHEMA]]
