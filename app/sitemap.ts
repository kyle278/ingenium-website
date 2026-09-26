import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/portalIntegration/projects";
import { PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";
export const revalidate = 300;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = PUBLIC_DISCOVERY_PATHS.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
  const { projects } = await getPublishedProjects();
  const projectRoutes = projects.map((project) => ({ url: `${SITE_URL}/projects/${project.slug}`, ...(project.updatedAt && Number.isFinite(Date.parse(project.updatedAt)) ? { lastModified: new Date(project.updatedAt) } : {}) }));
  return [...staticRoutes, ...projectRoutes];
}
