# Newsroom brand and hostname migration

Status: prepared on 2026-09-04; production cutover is staged behind a verified
deployment.

## Decision

The public publication is now **The Newsroom**, an original broadsheet-inspired
design by Edward Song. The preferred public hostname is:

```text
https://news.edsong.xyz
```

The GitHub repository and Coolify application should use `newsroom`. The local
checkout may remain in the legacy `TOOLS AND FUN/blog` folder until the remote
rename and deployment are verified; that path is not part of the public brand.

The design takes broad editorial cues from historic American broadsheets—dense
rules, a serif display masthead, compact navigation, monochrome newsprint, and
clear front-page hierarchy—but does not copy The Record's name, logo, artwork,
or trade dress. The Record is an active publication, so its assets and exact
identity are not our source material.

## Cutover order

1. Build and verify the single-edition application locally.
2. Commit the redesign and push the deployment branch; merge to `main` only
   after checks pass.
3. Rename the GitHub repository to `newsroom` and update the Coolify Git source.
4. Add `news.edsong.xyz` to the Coolify application and Cloudflare DNS.
5. Verify HTTPS, `/api/health`, the homepage, article, category, and about pages.
6. Update canonical metadata, sitemap, robots, documentation, and external links
   to `news.edsong.xyz`.
7. Retire the `blog.edsong.xyz` route only after the new hostname is healthy and
   Edward explicitly confirms removal of the old DNS/application binding.

## Safety and rollback

- No old repository history, article records, or media are deleted as part of
  this migration.
- The old hostname is not redirected. It remains untouched until cutover is
  verified, then can be removed as a separate, explicitly confirmed action.
- If the new deployment fails, keep the old binding and roll back Coolify to the
  last successful image/commit.
- A hostname or repository rename is not evidence of a successful deployment;
  record a separate `DEPLOY_VERIFIED` audit event after public checks pass.

## Naming map

| Surface | Canonical name | Notes |
| --- | --- | --- |
| Publication | The Newsroom | Public masthead and metadata |
| Public hostname | `news.edsong.xyz` | Preferred URL |
| GitHub repository | `edwardsong08/newsroom` | Rename from legacy `blog` |
| Coolify application | `newsroom` | Same source and port 3000 |
| Local checkout | `TOOLS AND FUN/blog` | Temporary legacy path; safe to rename later |
