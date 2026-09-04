<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# The Newsroom operating instructions

These instructions apply to the entire repository. Keep this file concise enough
to load on every run; the detailed editorial contract lives in
`docs/EDITORIAL_SYSTEM.md`.

## Required context

Before editing application code, follow the Next.js rule above and read the
relevant local framework documentation.

Before creating, editing, reviewing, scheduling, publishing, revising, or
archiving an article, read these files in order:

1. `docs/EDITORIAL_SYSTEM.md`
2. `content/WORKING_STATE.md`
3. `content/ARTICLE_ARCHIVE.md`
4. The relevant canonical article in `content/articles/`
5. The most recent relevant entries in `content/EDITORIAL_LOG.md`

Do not load unrelated article bodies merely for general context.

## Sources of truth

- `content/articles/<slug>.md` is the canonical editorial copy.
- `content/ARTICLE_ARCHIVE.md` is the canonical article registry.
- `content/WORKING_STATE.md` is the mutable resume checkpoint for unfinished
  editorial work.
- `content/EDITORIAL_LOG.md` is the append-only audit history.
- `src/lib/posts.ts` is currently the runtime publication adapter. A published
  article must match its canonical Markdown source.
- `docs/EDITORIAL_SYSTEM.md` owns taxonomy, metadata, placement, workflow, and
  publishing rules.

When records disagree, stop the publishing flow, reconcile them against the
author's latest explicit direction, and record the reconciliation in the audit
log. Never silently choose one conflicting version.

## Authorial integrity

- Edward Song is the author and final editorial authority.
- Preserve supplied article text before making substantive edits.
- Never invent autobiographical facts, employers, dates, cases, clients,
  students, quotations, credentials, outcomes, or private experiences.
- Mark missing or uncertain material as an explicit question or `TODO`; do not
  turn an inference into a fact.
- Treat legal, employment, student, client, health, and family details as
  potentially sensitive. Flag privacy, confidentiality, defamation, and
  identification risks before publication.
- Separate copyediting from substantive rewriting. Summarize material changes
  for author review.
- Do not change an article to `approved`, `scheduled`, or `published` without
  explicit author authorization. A direct request such as "publish this" counts
  as authorization for that article and revision.

## Editorial workflow

Use only the statuses defined in `docs/EDITORIAL_SYSTEM.md`. For every article:

1. Capture the submission without losing the author's original meaning.
2. Create or update its canonical file and archive row.
3. Save the current stage, completed steps, next action, and blockers in
   `content/WORKING_STATE.md`.
4. Append a material event to `content/EDITORIAL_LOG.md`.
5. Draft and review with unsupported claims visibly flagged.
6. Obtain author approval before publication.
7. Synchronize the approved canonical copy to the runtime adapter.
8. Validate metadata, placement, links, images, accessibility, and the build.
9. Commit and push only when authorized; then verify CI, Coolify, the public URL,
   and browser errors.
10. Reconcile the archive, working state, and audit log before declaring the
    article published.

Save a checkpoint after every meaningful stage transition and before pausing a
partially completed article. Read-only discussion does not require audit churn.

## Placement invariants

- Metadata determines placement; agents do not choose slots by taste alone.
- At most one eligible published article may declare `homeSlot: hero`.
- A hero must have a usable image and meaningful alt text.
- Do not show the same article twice on the same page.
- At most one article per desk may declare `categoryLead: true`.
- If no explicit hero or category lead exists, use the deterministic fallback in
  `docs/EDITORIAL_SYSTEM.md`.
- Career is the desk; Law, Teaching, and Writing are series within Career.
- Genre and desk are separate metadata dimensions.
- A hero older than 45 days should trigger a review suggestion, not an automatic
  replacement.

## State and audit discipline

- `content/WORKING_STATE.md` is a current snapshot and may be rewritten.
- `content/EDITORIAL_LOG.md` is append-only. Never edit or delete an old event;
  append a correction event that references it.
- Use America/New_York ISO 8601 timestamps with UTC offsets.
- Use the next unused event ID in the form `EVT-YYYYMMDD-NNN`.
- Record evidence, not unsupported claims. A deployment is not successful until
  the public site is verified.
- Never store secrets, credentials, private contact data, or confidential source
  material in editorial records.

## Definition of done

For documentation-only editorial-system changes, check links, paths, vocabulary,
status names, and schema consistency.

For application or publication changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```

Publication work is complete only when the canonical article, runtime content,
archive, working state, and audit trail agree and the live article has been
checked at desktop and mobile widths.

## Newsroom orchestration and context saving

The broader human/AI newsroom is defined in these documents:

- `docs/NEWSROOM_SYSTEM.md` — constitution, hierarchy, invariants, and change control.
- `docs/AGENT_ROSTER.md` — role contracts, read/write scopes, and specialist selection.
- `docs/KNOWLEDGE_VAULT.md` — private Obsidian layout, source registry, privacy tiers, and ingestion.
- `docs/EDITORIAL_WORKFLOWS.md` — assignment packets, handoffs, review gates, and acceptance.
- `docs/NEWSROOM_SHOWCASE.md` — safe public presentation of the system.

The newsroom is a client of the server-hosted Personal Knowledge Platform, not
the owner of Edward's life vault. Read `docs/PERSONAL_BRAIN_INTEGRATION.md` when
an assignment needs personal context, source intake, Obsidian projection, or a
cross-application durable delta.

At the start of a material task, the Personal Systems Director is the normal
front door for Edward. The Managing Editor is the blog-level front door after an
approved editorial packet exists. Each must identify the assignment, allowed
source scope, privacy ceiling, current status, next action, and blockers. Save
durable context to the brain packet, working state, canonical article, or
append-only audit log; never rely on hidden model memory. Access to personal
notes is packet-scoped and enforced by the orchestrator. No broad local, Drive,
or Gmail scan is implied by a user request; source scope must be explicitly
authorized and dry-run inventoried first.
