
import { EditorFlow, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
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
  return <EditorFlow containerId="rebuild.app.website.projects.page.tsx.flow.12de2a1b9223" className="rebuild-page">
    {projects.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
    <EditorSection editorId="rebuild.app.website.projects.page.tsx.section.0ed990aa626f" className="rebuild-hero"><p className="rebuild-kicker"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.fc967e87a6e8" tag="p" value={"Our work"} /></p><h1><EditorText editorId="rebuild.app.website.projects.page.tsx.text.34e925cac5f1" tag="h1" value={"Your next website starts here."} /></h1><p className="rebuild-lead"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.2e84c31326d3" tag="p" value={"Browse website templates by industry, explore our project work and find a direction for your business."} /></p><EditorLink editorId="rebuild.app.website.projects.page.tsx.link.99703a770d08" href="#templates" className="rebuild-button-secondary"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.552f91becddb" tag="a" value={"Explore website templates"} /></EditorLink></EditorSection>
    <CurrentProjects />
    <TemplateGallery />
    <EditorSection editorId="rebuild.app.website.projects.page.tsx.section.16a55d5c5857" className="rebuild-section" aria-label="Project examples"><h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.808d31dfbf36" tag="h2" value={"A closer look at our project work."} /></h2><ProjectProof /></EditorSection>
    <EditorSection editorId="rebuild.app.website.projects.page.tsx.section.a43a651d4b87" className="rebuild-section"><h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.9320bdcd7a58" tag="h2" value={"Start with what your business needs."} /></h2><p><EditorText editorId="rebuild.app.website.projects.page.tsx.text.2928dea28bce" tag="p" value={"A website, a CRM project, or both built together. We will help you define the scope before the work begins."} /></p><EditorLink editorId="rebuild.app.website.projects.page.tsx.link.685ed1d0f741" className="rebuild-button" href="/contact"><EditorText editorId="rebuild.app.website.projects.page.tsx.text.ed43933a8854" tag="Link" value={"Discuss your project"} /></EditorLink></EditorSection>
  </EditorFlow>;
}
