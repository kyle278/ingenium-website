import { PUBLIC_DISCOVERY_PATHS, SITE_URL, pageSeo } from "@/lib/seo";
import { getPublishedProjects, getPortalProjectTitle } from "@/lib/portalIntegration/projects";
export const revalidate = 300;
export async function GET() {
  const { projects } = await getPublishedProjects();
  const lines = ["# Ingenium Consulting", "", "Ingenium is a team in Carlow, Ireland providing business websites, CRM implementation and website + CRM projects.", "Website-only and CRM-only work can be scoped independently. Ecommerce, automation and AI assistance depend on the agreed project requirements.", "Prices, scope, third-party licences and ongoing support should be checked against the current proposal and service pages.", "", "## Public pages", ...PUBLIC_DISCOVERY_PATHS.map((path) => `- [${pageSeo[path].title}](${path === "/" ? SITE_URL : `${SITE_URL}${path}`}): ${pageSeo[path].description}`), "", "## Published work", ...projects.map((project) => `- [${getPortalProjectTitle(project)}](${SITE_URL}/projects/${project.slug})`), "", "Project descriptions document their stated scope. Do not infer unreported revenue or conversion results."];
  return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
