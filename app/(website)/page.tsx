import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import EnquiryJourney from "@/components/rebuild/EnquiryJourney";
import ProjectProof from "@/components/rebuild/ProjectProof";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { getPublishedProjects } from "@/lib/portalIntegration/projects";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);

const services = [
  { number: "01", title: "A new website", description: "Help customers understand your services, see your work and get in touch. A clear home for your business, built around the people you want to reach.", label: "Explore websites", href: "/websites" },
  { number: "02", title: "A clearer CRM", description: "Bring customer details, open opportunities and next actions into a shared view. Keep your existing website if it is doing its job.", label: "Explore CRM", href: "/crm" },
  { number: "03", title: "Both, built together", description: "Connect your website enquiry form to your customer records from the start. One agreed project, with the standard connection included.", label: "Explore Website + CRM", href: "/connected" },
];
const process = [
  ["01", "Understand", "Start with your business, your customers and what needs to work better."],
  ["02", "Agree", "Define the pages, features, responsibilities and price in writing."],
  ["03", "Build", "Review the work as it takes shape, with clear points for your feedback."],
  ["04", "Launch", "Check the experience, hand over your system and agree ongoing care."],
];

export default async function HomePage() {
  const proof = await getPublishedProjects();
  return <div>
    <section className="home-hero" aria-labelledby="home-heading">
      <div>
        <p className="rebuild-kicker">Websites & CRM. Built around your business.</p>
        <h1 id="home-heading">A better website.<br /><span>A clearer next step.</span></h1>
        <p className="rebuild-lead">Ingenium builds websites and customer relationship management systems — CRMs — around how your business works. Choose the part you need, or have your website and CRM built together.</p>
        <div className="home-hero-actions"><Link className="rebuild-button" href="/contact">Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="rebuild-text-link" href="/connected">See how they work together <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <p className="hero-footnote"><span aria-hidden="true" /> Clear scope. Practical support. Based in Ireland.</p>
      </div>
      <div className="hero-canvas" role="img" aria-label="Illustrative website and CRM: an enquiry for a home extension becomes a customer record with a next step. Example data, not a client project.">
        <div className="hero-canvas-label"><span>Your business, connected.</span><span>Website + CRM</span></div>
        <div className="example-browser">
          <div className="example-browser-top"><i /><i /><i /><span>Your business website</span></div>
          <div className="example-website"><div><span className="example-website-brand">OAK & FORM / EXAMPLE</span><h2>Space for the way you live.</h2><p>Thoughtful home extensions.<br />Built around your family.</p><span className="example-website-cta">Discuss your project ↗</span></div><div className="example-architecture" /></div>
        </div>
        <div className="hero-connection"><ArrowDown size={15} /><span>The agreed details, in the right place</span></div>
        <div className="hero-record"><div className="hero-record-top"><span>Customer record</span><span className="hero-record-status"><Check size={10} className="inline" /> New enquiry</span></div><strong>Alex Morgan</strong><p>Home extension · Website enquiry</p><p>Next step: arrange a conversation <ArrowUpRight size={11} className="inline" /></p></div>
        <p className="hero-canvas-caption">Illustrative design and example data.</p>
      </div>
    </section>

    <section className="home-services" aria-labelledby="services-heading">
      <div className="section-heading-row"><h2 id="services-heading" className="rebuild-section-heading">Start where your<br />business needs help.</h2><p>A useful website. A more organised team. Or a better connection between the two.</p></div>
      <div className="service-options">{services.map(service => <article className="service-option" key={service.href}><span className="service-option-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><Link className="rebuild-text-link" href={service.href}>{service.label} <ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div>
    </section>

    {proof.projects.length > 0 && <section className="rebuild-section" aria-labelledby="work-heading">
      <div className="section-heading-row"><div><p className="rebuild-kicker">Our work</p><h2 id="work-heading" className="rebuild-section-heading">Work you can<br />look through.</h2></div><Link href="/projects" className="rebuild-text-link">View our work <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <ProjectProof limit={3} />
    </section>}

    <section className="rebuild-section workflow-section" id="workflow" aria-labelledby="workflow-heading">
      <div><p className="rebuild-kicker">Website + CRM</p><h2 id="workflow-heading" className="rebuild-section-heading">The form is the beginning of the conversation.</h2><p className="rebuild-lead">A good website helps someone decide to contact you. A useful CRM helps your team take it from there. We bring those two parts together so the details are available when your team follows up.</p><Link href="/demo?service=connected" className="rebuild-text-link">Request a walkthrough <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      <EnquiryJourney />
    </section>

    <section className="rebuild-section" aria-labelledby="process-heading">
      <div className="section-heading-row"><div><p className="rebuild-kicker">How we work</p><h2 className="rebuild-section-heading" id="process-heading">Clear from the<br />first conversation.</h2></div><Link href="/how-we-work" className="rebuild-text-link">See our approach <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <ol className="process-list">{process.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>

    <section className="rebuild-section home-pricing" aria-labelledby="pricing-heading">
      <div className="section-heading-row"><h2 className="rebuild-section-heading" id="pricing-heading">Clear starting points.</h2><Link href="/pricing" className="rebuild-text-link">Compare packages <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <div className="home-pricing-grid">{[
        { title: "Websites", setup: "€1,500", monthly: "€149", href: "/pricing#websites", detail: "A defined website build and ongoing care." },
        { title: "CRM", setup: "€3,000", monthly: "€249", href: "/pricing#crm", detail: "CRM setup, training and ongoing support." },
        { title: "Website + CRM", setup: "€4,500", monthly: "€349", href: "/pricing#connected", detail: "Both parts, with the standard connection included." },
      ].map(offer => <div key={offer.title}><h3>{offer.title}</h3><strong>{offer.setup}</strong><p>setup + {offer.monthly}/month</p><p>{offer.detail}</p><Link href={offer.href} className="rebuild-text-link">See what’s included <ArrowRight size={14} aria-hidden="true" /></Link></div>)}</div>
      <p className="home-pricing-note">No VAT charged. Defined scope; your requirements and total price are confirmed before work begins. Selling products online? <Link href="/ecommerce" className="rebuild-text-link">Explore ecommerce.</Link></p>
    </section>

    <section className="rebuild-section home-invitation" aria-labelledby="invitation-heading"><div><h2 className="rebuild-section-heading" id="invitation-heading">Tell us what needs<br />to work better.</h2><p>Whether you need a new website, a more useful CRM or both, start with the problem you want to solve. We will help you identify the right next step.</p></div><Link href="/contact" className="rebuild-button">Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
