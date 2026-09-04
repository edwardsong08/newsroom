# Editorial Audit Log

This file is the append-only history of material editorial and publication
events. It records enough evidence for another LLM to understand what happened
without relying on chat history.

## Rules

- Append new rows; never edit, reorder, or delete an existing event.
- Correct an error by appending a `CORRECTION` event that names the earlier event
  ID.
- Use America/New_York ISO 8601 timestamps with UTC offsets.
- Event IDs use `EVT-YYYYMMDD-NNN`; inspect the log and choose the next unused
  sequence for that date.
- Record concise outcomes and evidence. Do not record hidden reasoning,
  credentials, private contact data, or confidential article material.
- Use multiple events for materially distinct stages. In particular,
  `PUBLISH_PREPARED` and `DEPLOY_VERIFIED` must be separate because only the
  latter proves that the public site is live.

## Event types

`SYSTEM_CHANGE`, `INTAKE`, `OUTLINE_SAVED`, `DRAFT_SAVED`, `REVIEW_COMPLETED`,
`AUTHOR_APPROVED`, `PUBLISH_PREPARED`, `DEPLOY_VERIFIED`, `REVISION`,
`CORRECTION`, `ARCHIVED`, `UNARCHIVED`, and `RECONCILED`.

## Events

| Timestamp | Event ID | Type | Article | Actor | Summary | Evidence / next action |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-28T03:24:27-04:00 | EVT-20260828-001 | SYSTEM_CHANGE | — | Codex | Initialized editorial system v1.0 with taxonomy, deterministic placement, lifecycle gates, resumable checkpoints, and append-only auditing. | `docs/EDITORIAL_SYSTEM.md`; next action is intake of Edward's next article. |
| 2026-08-28T03:24:27-04:00 | EVT-20260828-002 | RECONCILED | ES-2026-001 | Codex | Registered the existing live editor's note as the first canonical article and current homepage hero. No prose was changed. | Canonical source and public URL recorded in `ARTICLE_ARCHIVE.md`. |
| 2026-08-28T03:30:28-04:00 | EVT-20260828-003 | SYSTEM_CHANGE | — | Codex | Validated editorial-system paths, required metadata, instruction-file size, application lint, TypeScript, and production build. | All checks passed; system is ready for repository commit. |
| 2026-09-04T01:27:32-04:00 | EVT-20260904-001 | SYSTEM_CHANGE | — | Codex | Added the newsroom constitution, agent contracts, private Obsidian knowledge-vault specification, editorial handoff workflows, and public showcase brief. Existing article taxonomy, statuses, and placement rules were not changed. | `docs/NEWSROOM_SYSTEM.md`; next action is a synthetic intake-packet pilot before any private-source ingestion. |
