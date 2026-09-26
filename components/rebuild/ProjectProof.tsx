import Link from "next/link";
import { getPublishedProjects, getPortalProjectTitle, getPortalProjectSummary, getPortalProjectPresentation } from "@/lib/portalIntegration/projects";

export default async function ProjectProof({ limit }: { limit?: number }) {
  const result = await getPublishedProjects();
  const projects = typeof limit === "number" ? result.projects.slice(0, limit) : result.projects;
  if (!projects.length) return <div className="rebuild-panel">
    <h3>{result.status === "unavailable" ? "Project examples are temporarily unavailable." : "See how we approach your project."}</h3>
    <p>{result.status === "unavailable" ? "You can still explore our services and discuss the kind of work you need." : "Explore what a website or CRM project includes, how we review the work with you, and what happens at launch."}</p>
    <Link className="rebuild-text-link" href="/how-we-work">How we work →</Link>{" "}<Link className="rebuild-text-link" href="/contact">Discuss your project →</Link>
  </div>;
  return <div className="rebuild-grid rebuild-grid-two">{projects.map((project) => {
    const presentation = getPortalProjectPresentation(project);
    return <article className="rebuild-panel" key={project.id}>
      {!presentation.websiteStatus.missing && <p className="rebuild-kicker">{presentation.websiteStatus.label}</p>}
      <h3><Link href={`/projects/${project.slug}`}>{getPortalProjectTitle(project)}</Link></h3><p>{getPortalProjectSummary(project)}</p>
      {presentation.services.some((service) => !service.missing) && <p>{presentation.services.filter((service) => !service.missing).map((service) => service.text).join(" · ")}</p>}
      <Link className="rebuild-text-link" href={`/projects/${project.slug}`}>View project →</Link>
    </article>;
  })}</div>;
}
