# The Working Draft

Edward Song’s newspaper-style personal journal, built with Next.js 16 and deployed at [blog.edsong.xyz](https://blog.edsong.xyz).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Publishing a post

Posts and publication desks live in `src/lib/posts.ts`. Add a new object to the `posts` array with a unique slug, metadata, content sections, and one of these desk slugs:

- `technology`
- `career`
- `life-ideas`

Law, Teaching, and Writing are recurring series within the Career desk. The front page, category archives, article routes, sitemap, and per-page metadata are generated from this central data file.

The original front-page engraving is stored at `public/editorial/front-page-engraving.png`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The production image is built from `Dockerfile` and serves the Next.js standalone output on port `3000`. Coolify watches the GitHub `main` branch and automatically deploys new pushes. Its health check endpoint is `/api/health`.
