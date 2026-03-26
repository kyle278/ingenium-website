import type { MetadataRoute } from "next";

import { projects } from "@/src/lib/projects";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumconsulting.net").replace(/\/$/, "");

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/platform", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/websites", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/crm", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/agents", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/automations", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/security", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/departments", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
