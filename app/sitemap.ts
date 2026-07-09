import type { MetadataRoute } from "next";
import { topics } from "@/data/topics";
import { getWritings } from "@/lib/substack";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003";
  const writings = await getWritings();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/temas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/analizador`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/comparar`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/escritos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 }
  ];

  const topicPages: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${baseUrl}/temas/${topic.slug}`,
    lastModified: new Date(topic.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  const writingPages: MetadataRoute.Sitemap = writings.map((writing) => ({
    url: `${baseUrl}/escritos/${writing.slug}`,
    lastModified: new Date(writing.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7
  }));

  return [...staticPages, ...topicPages, ...writingPages];
}
