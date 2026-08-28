# Editorial System

Version: 1.0

Owner and final editorial authority: Edward Song

Publication: *The Working Draft*

## Purpose

This document defines how an article moves from supplied text to a verified page
and how published articles are selected for the homepage and archives. The goal
is to preserve Edward's voice while making routine editorial decisions
consistent, explainable, and resumable by another LLM.

The governing principle is:

> Metadata determines placement. Editorial judgment sets the metadata. Code
> applies it predictably.

## Repository records

| Record | Purpose | Mutation rule |
| --- | --- | --- |
| `content/articles/<slug>.md` | Canonical article copy and metadata | Revise deliberately; retain revision history in Git and the audit log |
| `content/ARTICLE_ARCHIVE.md` | Complete article registry | Update whenever identity, status, placement, revision, or URL changes |
| `content/WORKING_STATE.md` | Resume checkpoint for active work | Rewrite to reflect current truth |
| `content/EDITORIAL_LOG.md` | Chronological evidence trail | Append only |
| `src/lib/posts.ts` | Current runtime adapter used by the site | Keep synchronized with approved canonical copy |

Markdown files beginning with `_`, including `_TEMPLATE.md`, are templates and
must never be treated as articles.

## Taxonomy

### Desks

Every article has exactly one top-level desk.

| Slug | Display name | Use for |
| --- | --- | --- |
| `technology` | Technology | Software, systems, tools, design, building, and technical decisions |
| `career` | Career | Lessons and experiences from work, professional transitions, and accumulated craft |
| `life-ideas` | Life & Ideas | Personal essays about attention, habits, meaning, philosophy, and life outside a job title |

Do not create a new top-level desk for one article. Propose a new desk only after
at least five published articles form a coherent body that no existing desk can
hold.

### Career series

`Law`, `Teaching`, and `Writing` are recurring series inside `career`, not
top-level desks. Store them as lowercase slugs:

- `law`
- `teaching`
- `writing`

An article may have at most one series. A non-Career article normally has
`series: null`. A broader article about changing professions can belong to
Career without a series.

### Genres

Genre describes the form of the writing, independently of its subject.

| Slug | Meaning |
| --- | --- |
| `essay` | Developed personal or conceptual argument |
| `dispatch` | Short, timely observation or field note |
| `analysis` | Structured examination of a question, system, or trend |
| `retrospective` | Lessons drawn from a completed experience or period |
| `guide` | Practical, reusable instruction |
| `commentary` | A position or response to an idea or event |
| `editor-note` | Publication-level note from the author |
| `review` | Considered assessment of a work, product, or experience |
| `interview` | Edited question-and-answer conversation |

If the author supplies only a category-like word:

- `law`, `teaching`, or `writing` maps to desk `career` and the matching series.
- `philosophy`, `life`, or `personal` normally maps to desk `life-ideas`; retain
  the supplied concept as a tag when useful.
- `technology` maps to desk `technology`.

The agent may recommend a genre, but must expose the recommendation when the
author's intent is ambiguous.

### Tags

Tags are optional, lowercase, and specific. Prefer zero to five. Tags refine
discovery; they never replace desks or series. Reuse an existing tag before
creating a synonym.

## Canonical article metadata

Every real article file must begin with YAML front matter containing these
fields. The template in `content/articles/_TEMPLATE.md` is the copyable starting
point.

| Field | Rule |
| --- | --- |
| `schemaVersion` | Integer; currently `1` |
| `id` | Stable `ES-YYYY-NNN`; never reuse or change after assignment |
| `slug` | Lowercase kebab-case; freeze after first publication unless redirect work is included |
| `title` | Author-approved headline |
| `deck` | One-sentence supporting line; may differ from excerpt |
| `excerpt` | Plain-text summary suitable for cards and metadata |
| `author` | `Edward Song` unless explicitly changed |
| `status` | One lifecycle value from the next section |
| `createdAt` | ISO date of first repository intake |
| `publishedAt` | ISO date chosen by the author, or `null` before publication |
| `updatedAt` | ISO date of the latest substantive change |
| `desk` | One desk slug |
| `series` | One permitted series slug or `null` |
| `genre` | One genre slug |
| `tags` | Zero to five tag slugs |
| `placement.homeSlot` | `hero`, `featured`, `standard`, or `none` |
| `placement.categoryLead` | Boolean |
| `placement.priority` | Integer `0`-`100`; default `50` |
| `image.src` | Repository path or `null` |
| `image.alt` | Meaningful alt text, or `null` only when no image exists |
| `image.credit` | Source/license or original-art statement, or `null` |
| `revision` | Positive integer, beginning at `1` |
| `publishedUrl` | Canonical public URL or `null` |

Derived values such as formatted dates, reading time, and word count should be
calculated from canonical metadata and text when practical. If the current
runtime requires a stored value, regenerate it when the article changes.

## Lifecycle and permitted transitions

| Status | Meaning | Normal next status |
| --- | --- | --- |
| `idea` | Topic only; no usable submission yet | `intake` |
| `intake` | Author material captured and identity assigned | `outlining` or `drafting` |
| `outlining` | Structure under development | `drafting` |
| `drafting` | Prose is being written or assembled | `in-review` |
| `in-review` | Editorial, factual, privacy, and presentation checks underway | `awaiting-author` or `drafting` |
| `awaiting-author` | Questions or approval are with Edward | `approved` or `drafting` |
| `approved` | Edward explicitly approved this revision | `scheduled` or `published` |
| `scheduled` | Approved and assigned a future publication date | `published` or `approved` |
| `published` | Live and verified at its canonical URL | `revising` or `archived` |
| `revising` | A published article is being materially changed | `awaiting-author` |
| `archived` | Intentionally withdrawn from normal listings | `revising` only with author direction |

Status transitions are not aspirational. Do not mark a stage complete until its
gate has actually been satisfied. Skipping `outlining` is acceptable when the
author supplies a complete article; skipping approval or live verification is
not.

## Homepage and archive placement

Only articles with `status: published`, a non-future `publishedAt`, complete
required metadata, and no unresolved publication blocker are eligible.

### Selection order

On any one page, assign articles to slots in this order and exclude already used
articles from later slots:

1. Homepage hero
2. Explicit homepage features
3. Desk leads
4. Latest articles
5. Remaining chronological archive entries

The same article may appear on the homepage and its desk archive, but it must not
appear twice on the same rendered page.

### Current runtime note

The initial one-article implementation still selects `posts[0]` as its hero and
does not yet render separate Featured or Latest article packages. Until the
runtime adapter is upgraded, keep the article designated as `homeSlot: hero`
first in `src/lib/posts.ts`. The first publishing task that needs another
homepage story must add placement metadata and deterministic selectors to the
runtime before deployment; it must not imitate the policy by manually arranging
an increasingly fragile array.

### Homepage hero

- Exactly zero or one eligible article may declare `homeSlot: hero`.
- If exactly one exists, it is the hero until Edward changes the metadata.
- A hero requires an image, alt text, deck/excerpt, valid desk, publication date,
  and live route.
- If more than one eligible article declares `hero`, publishing is blocked until
  the conflict is resolved.
- If none declares `hero`, choose from eligible `featured` or `standard` articles
  by `priority` descending, then `publishedAt` descending, then `slug` ascending.
- Never replace a hero merely because it is old. When it has remained for more
  than 45 days, flag it for editorial review during the next publication task.

### Homepage featured and latest areas

- `homeSlot: featured` expresses editorial intent; it does not guarantee a
  particular visual position when space is limited.
- Sort explicit features by `priority` descending, then date descending, then
  slug ascending.
- Build the Latest list from the newest remaining eligible articles by date
  descending, then slug ascending.
- `homeSlot: none` excludes an article from homepage packages but not its desk
  archive or direct URL.
- The evergreen desk explainer cards and editorial principles are navigation and
  publication furniture, not article slots; they remain unless a deliberate
  design change removes them.

### Desk archives and leads

- At most one eligible article in each desk may set `categoryLead: true`.
- If one exists, it leads that desk archive.
- If none exists, the newest eligible article in the desk is the lead.
- If multiple leads exist in one desk, publishing is blocked until reconciled.
- Remaining articles sort by `publishedAt` descending, then `slug` ascending.
- Career series are filters or labels within the Career archive; they do not
  remove articles from the broader Career chronology.

### Empty and small collections

- Never fabricate sample stories to make a section look populated.
- Zero articles: show an honest empty state.
- One article: use a single-story treatment; do not duplicate it into a grid.
- Two articles: prefer an asymmetric pair rather than an empty four-card grid.

## Article intake contract

When Edward supplies article text, a date, and category or genre:

1. Preserve the supplied prose in a canonical article file before substantive
   rewriting.
2. Assign the next unused article ID and a proposed slug.
3. Normalize the date without changing its meaning. Ask if the date is ambiguous.
4. Map the supplied category to a desk and optional series.
5. Record the supplied genre or propose one visibly.
6. Draft missing presentation metadata—title only if absent, deck, excerpt,
   tags, and image brief—without inventing facts.
7. Create the archive row at the truthful current status.
8. Create an active checkpoint in `WORKING_STATE.md`.
9. Append an intake event to `EDITORIAL_LOG.md`.
10. Continue through the workflow requested by the author, stopping at any gate
    that requires information or approval.

Ask only questions that materially affect truth, privacy, structure, or
publication. Safe presentational details may be proposed and labeled.

## Editorial review gates

### Content gate

- The article has a clear central idea and coherent structure.
- Titles, quotations, links, and named entities are accurate.
- Autobiographical claims come from the author or a cited source.
- Unverified claims are resolved, removed, or transparently qualified.
- No private or confidential detail is exposed unintentionally.
- Copyedits preserve the author's voice and intended meaning.

### Presentation gate

- Desk, optional series, genre, dates, slug, excerpt, and placement are valid.
- Images have permission or provenance, useful alt text, and appropriate credit.
- The article has no placeholder text or unresolved `TODO`.
- The hero and category-lead uniqueness rules pass.
- The article does not duplicate another article's ID or slug.

### Approval gate

- Edward has explicitly approved the exact revision intended for publication.
- Material edits made after approval return the article to `awaiting-author`.
- Typographic corrections that do not change meaning may proceed, but still
  require an audit entry when made after publication.

### Technical gate

- Canonical Markdown and `src/lib/posts.ts` agree.
- Runtime selection code implements every placement field used by the article;
  no placement may depend on undocumented array order beyond the temporary
  one-article exception recorded above.
- Internal links and public asset paths resolve.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- The commit contains the article, archive update, working-state update, and
  pre-publication audit event.

### Live gate

- GitHub CI succeeds and Coolify deploys the intended commit.
- The canonical URL loads the intended title, article, date, and desk.
- Homepage/category placement follows metadata and contains no duplicate.
- Desktop and mobile checks pass with no material overflow.
- Browser console shows no application error.
- Only after these checks may the archive and working state say `published` and
  the audit log record `DEPLOY_VERIFIED` with evidence.

## Revisions, corrections, and withdrawal

- Preserve `publishedAt` for revisions; change `updatedAt` and increment
  `revision` for substantive changes.
- Record what changed and why without copying sensitive draft material into the
  audit log.
- Factual corrections should be visible to readers when the correction is
  material to the article's meaning.
- Never erase an audit event. Append a `CORRECTION` event referencing the earlier
  event ID.
- Archiving or unpublishing an article requires explicit author direction. Keep
  its canonical source and audit history unless the author explicitly requests
  deletion and the target is confirmed.

## Resume and concurrency rules

- `WORKING_STATE.md` must always name the current stage, completed steps, next
  action, blockers, relevant files, and last saved timestamp for active work.
- Before taking over an active article, read its checkpoint and relevant audit
  entries. Continue from the recorded next action rather than restarting.
- One agent owns an article at a time. If another active owner is recorded, do
  not make concurrent editorial changes without explicit coordination.
- If work pauses, save a checkpoint before ending the task.
- When work completes, remove it from Active assignments, add it to Recent
  completions, and append the final evidence event.

## System changes

Changes to taxonomy, metadata, status vocabulary, or placement rules require a
version bump in this document and a `SYSTEM_CHANGE` audit event. Migrate existing
article records in the same change or record a clear, bounded migration task in
`WORKING_STATE.md`.
