import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EditorFlow, EditorImage, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import CrmWorkflowLinks from "@/components/rebuild/CrmWorkflowLinks";
import CurrentProjects from "@/components/rebuild/CurrentProjects";
import FarrellQuoteProof from "@/components/rebuild/FarrellQuoteProof";
import ProjectProof from "@/components/rebuild/ProjectProof";
import QuoteBoard from "@/components/rebuild/QuoteBoard";
import TemplateGallery from "@/components/rebuild/TemplateGallery";
import { getBusinessPackage, packageBookingUrl } from "@/lib/business-packages";
import { getPublishedProjects } from "@/lib/portalIntegration/projects";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/results"]);
const crm = getBusinessPackage("crm-automation")!;
const growth = getBusinessPackage("business-growth")!;

const websiteExamples = [
  { src: "/template-previews/carpentry-demo.png", title: "For the trade people recommend.", text: "A carpentry example: clear services, local relevance and an easy way to get in touch." },
  { src: "/template-previews/landscaping-demo.png", title: "For the local favourite.", text: "A landscaping example: show the work, explain the services and make the next step clear." },
];

export default async function ResultsPage() {
  const { projects } = await getPublishedProjects();

  return <EditorFlow containerId="rebuild.app.website.results.page.tsx.flow.ef446cdafbd9" className="local-page core-packages-page">
    <EditorSection editorId="rebuild.app.website.results.page.tsx.section.2b4bb7136778" className="crm-hero work-hero" aria-labelledby="work-heading">
      <div className="crm-hero-copy">
        <p className="brand-eyebrow"><EditorText editorId="rebuild.app.website.results.page.tsx.text.dbf55680228b" tag="p" value="Our work & examples" /></p>
        <h1 id="work-heading"><EditorText editorId="rebuild.app.website.results.page.tsx.text.a1ecb6c99b75" tag="h1" value="See what happens after the enquiry." /></h1>
        <p className="rebuild-lead"><EditorText editorId="rebuild.app.website.results.page.tsx.text.09c42820c76f" tag="p" value="See how a team can use CRM to manage quotes and renewals. When the website is part of the problem, see what a better enquiry form can add." /></p>
        <div className="core-hero-actions">
          <a href="#crm-workflows" className="rebuild-button">See CRM workflows <ArrowDown size={17} aria-hidden="true" /></a>
          <a href="#enquiry-journey" className="rebuild-button-secondary">See a published enquiry form <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <EditorLink editorId="rebuild.app.website.results.page.tsx.link.5def5fbd66d2" href="#current-projects" className="home-starter-link rebuild-text-link"><EditorText editorId="rebuild.app.website.results.page.tsx.text.91d578066a4c" tag="Link" value="Browse website projects" /> <ArrowDown size={15} aria-hidden="true" /></EditorLink>
      </div>
      <QuoteBoard />
    </EditorSection>

    <EditorSection editorId="rebuild.results.crm-workflows" id="crm-workflows" className="crm-entry-section crm-entry-panel crm-results-entry" aria-labelledby="results-crm-heading">
      <div>
        <h2 id="results-crm-heading">Who takes the next step?</h2>
        <p>Two CRM examples using sample data show what triggers the task, who takes it and what the team checks.</p>
        <Link href={crm.href} className="rebuild-text-link core-compare-link">Explore CRM &amp; Automation <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <CrmWorkflowLinks />
    </EditorSection>

    <FarrellQuoteProof editorId="rebuild.results.enquiry-proof" id="enquiry-journey" />

    {projects.length > 0 && <EditorSection editorId="rebuild.app.website.results.page.tsx.section.af8332bc031c" className="rebuild-section">
      <h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.results.page.tsx.text.8f9fd56fc00f" tag="h2" value="Published project work." /></h2>
      <p><EditorText editorId="rebuild.app.website.results.page.tsx.text.564fc12b085a" tag="p" value="See what we delivered and how each project was scoped." /></p>
      <ProjectProof />
    </EditorSection>}

    <CurrentProjects heading="Website projects" />
    <EditorSection editorId="rebuild.app.website.results.page.tsx.section.576f826e08f9" id="examples" className="local-example-pair" aria-label="Illustrative website designs">
      {websiteExamples.map(example => <article key={example.src}>
        <EditorImage editorId="rebuild.app.website.results.page.tsx.image.81381015912b" identity={example.src} src={example.src} alt={example.text} width={1200} height={800} sizes="(max-width: 820px) 90vw, 580px" />
        <div>
          <span className="local-example-label"><EditorText editorId="rebuild.app.website.results.page.tsx.text.50c0dde3d1a4" identity={example.src} tag="span" value="Illustrative design" /></span>
          <h2><EditorText editorId="rebuild.app.website.results.page.tsx.text.c22bafde752b" identity={example.src} tag="h2" value={example.title} /></h2>
          <p><EditorText editorId="rebuild.app.website.results.page.tsx.text.50c4ef6822b22" identity={example.src} tag="p" value={example.text} /></p>
        </div>
      </article>)}
    </EditorSection>
    <EditorSection editorId="rebuild.app.website.results.page.tsx.section.974054632349" className="rebuild-section">
      <h2 className="rebuild-section-heading"><EditorText editorId="rebuild.app.website.results.page.tsx.text.623f3013b05f" tag="h2" value="Website designs by industry." /></h2>
      <TemplateGallery />
    </EditorSection>

    <section className="core-section core-close">
      <div><h2>Talk through a process your team wants to improve.</h2><p>Bring a recent quote or enquiry to a free 15-minute call.</p></div>
      <div className="package-call-actions">
        <Link href={packageBookingUrl(crm)} className="rebuild-button">Discuss your CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <Link href={packageBookingUrl(growth)} className="rebuild-button-secondary">Discuss Business Growth <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </EditorFlow>;
}
