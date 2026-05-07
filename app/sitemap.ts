import type { MetadataRoute } from "next";

import { PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";
import { projects } from "@/src/lib/projects";

const routePriority: Record<
  string,
  { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/platform": { priority: 0.9, changeFrequency: "weekly" },
  "/services": { priority: 0.9, changeFrequency: "weekly" },
  "/websites": { priority: 0.9, changeFrequency: "weekly" },
  "/crm": { priority: 0.85, changeFrequency: "weekly" },
  "/ai-agents": { priority: 0.85, changeFrequency: "weekly" },
  "/automations": { priority: 0.85, changeFrequency: "weekly" },
  "/security": { priority: 0.8, changeFrequency: "monthly" },
  "/data-handling": { priority: 0.58, changeFrequency: "monthly" },
  "/privacy": { priority: 0.5, changeFrequency: "monthly" },
  "/security-review": { priority: 0.62, changeFrequency: "monthly" },
  "/support": { priority: 0.58, changeFrequency: "monthly" },
  "/implementation-methodology": { priority: 0.62, changeFrequency: "monthly" },
  "/case-studies": { priority: 0.8, changeFrequency: "monthly" },
  "/projects": { priority: 0.75, changeFrequency: "monthly" },
  "/implementation": { priority: 0.8, changeFrequency: "monthly" },
  "/about": { priority: 0.7, changeFrequency: "monthly" },
  "/team": { priority: 0.7, changeFrequency: "monthly" },
  "/demo": { priority: 0.78, changeFrequency: "monthly" },
  "/revenue-systems-teardown": { priority: 0.76, changeFrequency: "monthly" },
  "/technical-review": { priority: 0.76, changeFrequency: "monthly" },
  "/contact": { priority: 0.9, changeFrequency: "weekly" },
};

const SITE_CONTENT_LAST_REVIEWED = new Date("2026-05-07");
const APRIL_REVIEW_DATE = new Date("2026-04-15");

const routeLastModified: Partial<Record<string, Date>> = {
  "/demo": APRIL_REVIEW_DATE,
  "/revenue-systems-teardown": APRIL_REVIEW_DATE,
  "/technical-review": APRIL_REVIEW_DATE,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = PUBLIC_DISCOVERY_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: routeLastModified[path] ?? SITE_CONTENT_LAST_REVIEWED,
    changeFrequency: routePriority[path]?.changeFrequency ?? "monthly",
    priority: routePriority[path]?.priority ?? 0.5,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: SITE_CONTENT_LAST_REVIEWED,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...projectRoutes];
}
