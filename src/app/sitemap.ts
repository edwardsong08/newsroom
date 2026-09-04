import type { MetadataRoute } from "next";
import { desks, posts } from "@/lib/posts";

const baseUrl = "https://news.edsong.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date("2026-08-28"), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-08-28"), priority: 0.6 },
    { url: `${baseUrl}/system`, lastModified: new Date("2026-09-04"), priority: 0.6 },
    ...desks.map((desk) => ({
      url: `${baseUrl}/category/${desk.slug}`,
      lastModified: new Date("2026-08-28"),
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.8,
    })),
  ];
}
