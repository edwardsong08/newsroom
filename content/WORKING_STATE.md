# Editorial Working State

Last reconciled: 2026-08-28T03:30:28-04:00

Editorial system version: 1.0

Expected production branch: `main`

This file is the current, mutable handoff for unfinished editorial work. It may
be rewritten as truth changes. Historical events belong in `EDITORIAL_LOG.md`.

## Production snapshot

- Published articles: 1
- Homepage hero: `ES-2026-001` — *A place to think in public*
- Technology desk: 0 articles
- Career desk: 0 articles
  - Law series: 0
  - Teaching series: 0
  - Writing series: 0
- Life & Ideas desk: 1 article
- Known publication blockers: none
- Required before publishing article 2: add article lifecycle/placement metadata
  and deterministic homepage selectors to the runtime; the initial homepage
  still selects `posts[0]` as its hero.

## Active assignments

None.

## Next editorial action

Await Edward's next article submission or article idea. On intake, create a
canonical file from `_TEMPLATE.md`, register it in `ARTICLE_ARCHIVE.md`, replace
`None` above with an active checkpoint, and append an audit event.

## Active checkpoint format

Use one subsection per active article:

```md
### ES-YYYY-NNN — Working title

- Owner: agent or person currently making changes
- Status: one lifecycle status
- Objective: the outcome currently requested by Edward
- Author input preserved: yes/no and location
- Completed steps:
  - concrete completed step
- Next action: one specific resumable action
- Open questions:
  - question or `None`
- Blockers:
  - blocker or `None`
- Relevant files:
  - `content/articles/example.md`
- Last saved: YYYY-MM-DDTHH:mm:ss-04:00
```

Update the checkpoint after every meaningful stage transition and before pausing.
Do not record chain-of-thought, secrets, private contact data, or confidential
source material. Record decisions, evidence, open questions, and next actions.

## Recent completions

| Completed | Work | Result | Evidence |
| --- | --- | --- | --- |
| 2026-08-28 | Editorial operating system initialization | Added canonical records, deterministic placement policy, resumable state, and append-only audit conventions | `docs/EDITORIAL_SYSTEM.md`; `EVT-20260828-001` through `EVT-20260828-003` |

Keep at most the ten most recent items here. Older history remains in the audit
log and Git.
