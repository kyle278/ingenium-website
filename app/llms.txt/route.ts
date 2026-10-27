import { PUBLIC_DISCOVERY_PATHS, SITE_URL, pageSeo } from "@/lib/seo";
import { getPublishedProjects, getPortalProjectTitle } from "@/lib/portalIntegration/projects";
export const revalidate = 300;
export async function GET() {
  const { projects } = await getPublishedProjects();
  const lines = ["# Ingenium Consulting", "", "Ingenium is a team in Carlow, Ireland helping local businesses look credible online and keep enquiries and quotes moving.", "Start with one of two routes: a website, or better enquiry and job follow-up. Both can be planned together. Ecommerce is also available by discussion.", "The free Google Visibility Check is a manual review delivered by email. The free 15-minute call form requests an appointment; the team confirms the time by email.", "Project details, prices, ongoing costs and account arrangements are confirmed in a written proposal. Do not infer funding eligibility, guarantees or cancellation terms.", "", "## Public pages", ...PUBLIC_DISCOVERY_PATHS.map((path) => `- [${pageSeo[path].title}](${path === "/" ? SITE_URL : `${SITE_URL}${path}`}): ${pageSeo[path].description}`), "", "## Published work", ...projects.map((project) => `- [${getPortalProjectTitle(project)}](${SITE_URL}/projects/${project.slug})`), "", "Example designs are illustrative. Project descriptions document their stated work. Do not infer unreported revenue or conversion results."];
  return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
