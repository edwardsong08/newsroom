# The Newsroom

Edward Song’s newspaper-style personal journal and first application over the
self-hosted Personal Knowledge Platform (the evolving 4ME OS foundation), built
with Next.js 16 and deployed at [news.edsong.xyz](https://news.edsong.xyz).

The blog is a downstream newsroom. The server-hosted brain owns source records,
provenance, privacy, canonical knowledge, and cross-application context. The
blog owns editorial workflow, article copy, taxonomy, placement, publication
verification, and its own audit trail. See
`docs/PERSONAL_BRAIN_INTEGRATION.md`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editorial system

Start with these records before writing or publishing:

- `docs/EDITORIAL_SYSTEM.md` — taxonomy, metadata, homepage/category placement,
  review gates, and publishing rules
- `docs/PERSONAL_BRAIN_INTEGRATION.md` — authority boundary and packet contract
  between the Personal Knowledge Platform and this newsroom
- `content/ARTICLE_ARCHIVE.md` — registry of every article
- `content/WORKING_STATE.md` — resumable checkpoint for unfinished work
- `content/EDITORIAL_LOG.md` — append-only audit trail
- `content/articles/_TEMPLATE.md` — starting point for a canonical article

Each article's canonical copy lives in `content/articles/<slug>.md`. The current
site runtime still reads `src/lib/posts.ts`, so approved content must be
synchronized there during publication. `AGENTS.md` defines the required workflow
for LLMs and other repository agents.

Publication desks are:

- `technology`
- `career`
- `life-ideas`

Law, Teaching, and Writing are recurring series within the Career desk. Genre is
tracked separately from desk. The editorial system defines deterministic hero,
featured-story, latest-story, and desk-lead selection without fabricating filler
content.

The original front-page engraving is stored at `public/editorial/front-page-engraving.png`.

The former `blog.edsong.xyz` identity and the experimental Non-Muggle edition
are retired. Their commits and media remain in Git history for reference; the
production application is now one canonical, original broadsheet design.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The production image is built from `Dockerfile` and serves the Next.js standalone output on port `3000`. Coolify watches the GitHub `main` branch and automatically deploys new pushes. Its health check endpoint is `/api/health`.
