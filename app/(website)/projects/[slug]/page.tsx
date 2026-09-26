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
  return <div className="rebuild-page">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/projects">Our work</Link> / <span>{getPortalProjectTitle(project)}</span></nav>
    <section className="rebuild-hero"><p className="rebuild-kicker">{detail.websiteStatus.missing ? "Project example" : detail.websiteStatus.label}</p><h1>{getPortalProjectTitle(project)}</h1><p className="rebuild-lead">{getPortalProjectSummary(project)}</p>
      {!detail.clientName.missing && <p>{detail.clientName.text}{!detail.industry.missing ? ` · ${detail.industry.text}` : ""}</p>}
      {detail.websiteUrl && <a className="rebuild-text-link" href={detail.websiteUrl} target="_blank" rel="noopener noreferrer">Visit project website ↗</a>}
    </section>
    {sections.map(({ title, value }) => <section className="rebuild-section" key={title}><h2 className="rebuild-section-heading">{title}</h2><p>{value.text}</p></section>)}
    {assets.length > 0 && <section className="rebuild-section"><h2 className="rebuild-section-heading">What we delivered</h2><ul className="rebuild-list">{assets.map((item) => <li key={item.key}>{item.text}</li>)}</ul></section>}
    {insights.length > 0 && <section className="rebuild-section"><h2 className="rebuild-section-heading">Project details</h2><ul className="rebuild-list">{insights.map((item) => <li key={item.key}>{item.text}</li>)}</ul></section>}
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Have a similar project in mind?</h2><p>Tell us what you want to build or improve, and we will discuss the scope with you.</p><Link className="rebuild-button" href={`/contact?project=${encodeURIComponent(project.slug)}`}>Discuss your project</Link>{" "}<Link className="rebuild-text-link" href="/projects">Back to our work</Link></section>
  </div>;
}
