import type { MetadataRoute } from "next";

import { PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";
import { projects } from "@/src/lib/projects";

const routePriority: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/platform": { priority: 0.9, changeFrequency: "weekly" },
  "/websites": { priority: 0.9, changeFrequency: "weekly" },
  "/contact": { priority: 0.9, changeFrequency: "weekly" },
  "/crm": { priority: 0.8, changeFrequency: "weekly" },
  "/agents": { priority: 0.8, changeFrequency: "weekly" },
  "/automations": { priority: 0.8, changeFrequency: "weekly" },
  "/case-studies": { priority: 0.8, changeFrequency: "weekly" },
  "/projects": { priority: 0.8, changeFrequency: "weekly" },
  "/security": { priority: 0.7, changeFrequency: "monthly" },
  "/about": { priority: 0.6, changeFrequency: "monthly" },
  "/departments": { priority: 0.6, changeFrequency: "monthly" },
  "/team": { priority: 0.5, changeFrequency: "monthly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = PUBLIC_DISCOVERY_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: routePriority[path]?.changeFrequency ?? "monthly",
    priority: routePriority[path]?.priority ?? 0.5,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
