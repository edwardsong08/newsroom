# Article Archive

This is the canonical registry for every real article in *The Working Draft*,
including unpublished and archived work. Full text lives in one Markdown file
per article under `content/articles/`; this registry is the fast index LLMs read
before opening individual article bodies.

Do not add templates, discarded title experiments, or fabricated sample stories.
Assign the next unused `ES-YYYY-NNN` ID when a real idea or submission enters the
workflow. IDs are permanent even if a title or slug later changes.

## Registry

| ID | Title | Status | Date | Desk | Series | Genre | Home | Desk lead | Rev. | Canonical source | Public URL |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| ES-2026-001 | A place to think in public | published | 2026-08-28 | Life & Ideas | — | Editor's note | Hero | Yes | 1 | [Source](articles/a-place-to-think-in-public.md) | [Live](https://blog.edsong.xyz/posts/a-place-to-think-in-public) |

## Registry rules

- Use only lifecycle statuses from `docs/EDITORIAL_SYSTEM.md`.
- `Date` is the intended or actual publication date; use `—` before one exists.
- Keep display labels readable here even though article front matter uses slugs.
- Update a row whenever status, date, desk, series, genre, placement, revision,
  canonical path, or public URL changes.
- Never delete a row merely because an article is archived. Change its status and
  retain its identity and source path.
- The article file, this row, runtime content, and public page must agree before
  publication is considered complete.

## Adding an article

1. Read `docs/EDITORIAL_SYSTEM.md` and `content/WORKING_STATE.md`.
2. Copy `content/articles/_TEMPLATE.md` to a lowercase kebab-case filename.
3. Assign the next unused article ID.
4. Preserve the author's supplied text and enter truthful metadata.
5. Add a registry row at the current status—usually `intake`.
6. Add an active checkpoint to `content/WORKING_STATE.md`.
7. Append an `INTAKE` event to `content/EDITORIAL_LOG.md`.

The archive is an index, not a substitute for the canonical article file or the
append-only audit history.
