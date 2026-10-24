
import { EditorFlow, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortalProjectBySlug, getPortalProjectTitle, getPortalProjectSummary, getPortalProjectPresentation, getPublishedProjects } from "@/lib/portalIntegration/projects";
import { buildMetadata, keywordClusters } from "@/lib/seo";
export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getPublishedProjects()).projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getPortalProjectBySlug((await params).slug);
  if (!project) return { title: "Project not found | Ingenium", robots: { index: false, follow: true } };
  return buildMetadata({ title: `${getPortalProjectTitle(project)} | Ingenium`, description: getPortalProjectSummary(project)!, path: `/projects/${project.slug}`, keywords: [...keywordClusters.proof] });
}
export default async function ProjectPage({ params }: Props) {
  const project = await getPortalProjectBySlug((await params).slug);
  if (!project) notFound();
  const detail = getPortalProjectPresentation(project);
  const sections = [{ title: "The brief", value: detail.challenge }, { title: "The work", value: detail.intervention }].filter(({ value }) => !value.missing);
  const assets = detail.deliveredAssets.filter((item) => !item.missing);
  const insights = detail.insights.filter((item) => !item.missing);
  return <EditorFlow containerId="r9dfdb37774-19m" className="rebuild-page">
    <nav aria-label="Breadcrumb"><EditorLink editorId="r9dfdb37774-1bf" href="/"><EditorText editorId="r9dfdb37774-1bu" tag="Link" value={"Home"} /></EditorLink> / <EditorLink editorId="r9dfdb37774-1c8" href="/projects"><EditorText editorId="r9dfdb37774-1cv" tag="Link" value={"Our work"} /></EditorLink> / <span><EditorText editorId="r9dfdb37774-1dj" tag="span" value={getPortalProjectTitle(project)} /></span></nav>
    <EditorSection editorId="r9dfdb37774-1ey" className="rebuild-hero"><p className="rebuild-kicker"><EditorText editorId="r9dfdb37774-1gq" tag="p" value={detail.websiteStatus.missing ? "Project example" : detail.websiteStatus.label} /></p><h1><EditorText editorId="r9dfdb37774-1j5" tag="h1" value={getPortalProjectTitle(project)} /></h1><p className="rebuild-lead"><EditorText editorId="r9dfdb37774-1ky" tag="p" value={getPortalProjectSummary(project)} /></p>
      {!detail.clientName.missing && <p><EditorText editorId="r9dfdb37774-1n6" tag="p" value={detail.clientName.text} /><EditorText editorId="r9dfdb37774-1nu" tag="p" value={!detail.industry.missing ? ` · ${detail.industry.text}` : ""} /></p>}
      {detail.websiteUrl && <EditorLink editorId="r9dfdb37774-1qj" className="rebuild-text-link" href={detail.websiteUrl} target="_blank" rel="noopener noreferrer"><EditorText editorId="r9dfdb37774-1tb" tag="a" value={"Visit project website ↗"} /></EditorLink>}
    </EditorSection>
    {sections.map(({ title, value }) => <EditorSection editorId="r9dfdb37774-1vp" instanceKey={title} className="rebuild-section" key={title}><h2 className="rebuild-section-heading"><EditorText identity={title} editorId="r9dfdb37774-1y6" tag="h2" value={title} /></h2><p><EditorText identity={title} editorId="r9dfdb37774-1yl" tag="p" value={value.text} /></p></EditorSection>)}
    {assets.length > 0 && <EditorSection editorId="r9dfdb37774-205" className="rebuild-section"><h2 className="rebuild-section-heading"><EditorText editorId="r9dfdb37774-22a" tag="h2" value={"What we delivered"} /></h2><ul className="rebuild-list">{assets.map((item) => <li key={item.key}><EditorText identity={item.key} editorId="r9dfdb37774-24u" tag="li" value={item.text} /></li>)}</ul></EditorSection>}
    {insights.length > 0 && <EditorSection editorId="r9dfdb37774-26m" className="rebuild-section"><h2 className="rebuild-section-heading"><EditorText editorId="r9dfdb37774-28r" tag="h2" value={"Project details"} /></h2><ul className="rebuild-list">{insights.map((item) => <li key={item.key}><EditorText identity={item.key} editorId="r9dfdb37774-2bb" tag="li" value={item.text} /></li>)}</ul></EditorSection>}
    <EditorSection editorId="r9dfdb37774-2cf" className="rebuild-section"><h2 className="rebuild-section-heading"><EditorText editorId="r9dfdb37774-2ek" tag="h2" value={"Have a similar project in mind?"} /></h2><p><EditorText editorId="r9dfdb37774-2fn" tag="p" value={"Tell us what you want to build or improve, and we will discuss the scope with you."} /></p><EditorLink editorId="r9dfdb37774-2i1" className="rebuild-button" href={`/contact?project=${encodeURIComponent(project.slug)}`}><EditorText editorId="r9dfdb37774-2ko" tag="Link" value={"Discuss your project"} /></EditorLink>{" "}<EditorLink editorId="r9dfdb37774-2lk" className="rebuild-text-link" href="/projects"><EditorText editorId="r9dfdb37774-2n1" tag="Link" value={"Back to our work"} /></EditorLink></EditorSection>
  </EditorFlow>;
}
