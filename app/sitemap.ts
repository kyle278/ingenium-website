import type { MetadataRoute } from "next";

import { PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";

const routePriority: Record<
  string,
  { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/platform": { priority: 0.9, changeFrequency: "weekly" },
  "/websites": { priority: 0.9, changeFrequency: "weekly" },
  "/crm": { priority: 0.85, changeFrequency: "weekly" },
  "/ai-agents": { priority: 0.85, changeFrequency: "weekly" },
  "/automations": { priority: 0.85, changeFrequency: "weekly" },
  "/security": { priority: 0.8, changeFrequency: "monthly" },
  "/case-studies": { priority: 0.8, changeFrequency: "monthly" },
  "/implementation": { priority: 0.8, changeFrequency: "monthly" },
  "/contact": { priority: 0.9, changeFrequency: "weekly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_DISCOVERY_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: routePriority[path]?.changeFrequency ?? "monthly",
    priority: routePriority[path]?.priority ?? 0.5,
  }));
}
