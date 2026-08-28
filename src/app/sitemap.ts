import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const baseUrl = "https://blog.edsong.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date("2026-08-28"), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-08-28"), priority: 0.6 },
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.8,
    })),
  ];
}
