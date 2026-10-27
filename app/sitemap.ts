import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/portalIntegration/projects";
import { PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";
import { allBlogPosts, getBlogManifest } from "@/lib/blog/client";
export const dynamic = "force-dynamic";
export const revalidate = 300;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = PUBLIC_DISCOVERY_PATHS.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
  const { projects } = await getPublishedProjects();
  const projectRoutes = projects.map((project) => ({ url: `${SITE_URL}/projects/${project.slug}`, ...(project.updatedAt && Number.isFinite(Date.parse(project.updatedAt)) ? { lastModified: new Date(project.updatedAt) } : {}) }));
  const blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const manifest = await getBlogManifest();
    if (manifest.enabled) {
      const articles = await allBlogPosts();
      blogRoutes.push({ url: `${SITE_URL}/blog` }, ...articles.filter(p => !p.seo.noindex && (!p.seo.canonical || p.seo.canonical === p.url)).map(p => ({ url: p.url, lastModified: new Date(p.modified_at) })));
    }
  } catch {
    // An optional blog connection must not remove the rest of the site from discovery.
    console.warn("Blog sitemap unavailable; returning main pages and published projects.");
  }
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
