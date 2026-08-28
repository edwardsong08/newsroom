# Edward Song’s blog

A small editorial blog built with Next.js 16 and deployed at [blog.edsong.xyz](https://blog.edsong.xyz).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Publishing a post

Posts live in `src/lib/posts.ts`. Add a new object to the `posts` array with a unique slug, metadata, and content sections. The homepage, article route, sitemap, and per-post metadata are generated from that file.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The production image is built from `Dockerfile` and serves the Next.js standalone output on port `3000`. Coolify watches the GitHub `main` branch and automatically deploys new pushes. Its health check endpoint is `/api/health`.
