import type { Metadata } from "next";
import Link from "next/link";
import ProjectProof from "@/components/rebuild/ProjectProof";
import CurrentProjects from "@/components/rebuild/CurrentProjects";
import TemplateGallery from "@/components/rebuild/TemplateGallery";
import { getPublishedProjects, getPortalProjectTitle } from "@/lib/portalIntegration/projects";
import { SITE_URL, buildMetadata, pageSeo } from "@/lib/seo";
export const metadata: Metadata = buildMetadata(pageSeo["/projects"]);
export const revalidate = 300;
export default async function ProjectsPage() {
  const { projects } = await getPublishedProjects();
  const schema = { "@context": "https://schema.org", "@type": "ItemList", name: "Ingenium project examples", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: getPortalProjectTitle(project), url: `${SITE_URL}/projects/${project.slug}` })) };
  return <div className="rebuild-page">
    {projects.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
    <section className="rebuild-hero"><p className="rebuild-kicker">Our work</p><h1>Your next website starts here.</h1><p className="rebuild-lead">Browse website templates by industry, explore our project work and find a direction for your business.</p><a href="#templates" className="rebuild-button-secondary">Explore website templates</a></section>
    <CurrentProjects />
    <TemplateGallery />
    <section className="rebuild-section" aria-label="Project examples"><h2 className="rebuild-section-heading">A closer look at our project work.</h2><ProjectProof /></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Start with what your business needs.</h2><p>A website, a CRM project, or both built together. We will help you define the scope before the work begins.</p><Link className="rebuild-button" href="/contact">Discuss your project</Link></section>
  </div>;
}
