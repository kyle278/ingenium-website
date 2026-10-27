import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, Link2, MessagesSquare } from "lucide-react";
import { teamMembers } from "@/src/lib/team";
import { businessPackages, hasFixedPricing } from "@/lib/business-packages";
import { getPublishedProjects } from "@/lib/portalIntegration/projects";
import ProjectProof from "./ProjectProof";
import { PackageSummary } from "./PackageOptions";

export function HomeServiceRoutes() {
  return <div className="brand-services">
    <article className="brand-service"><Globe2 size={26} aria-hidden="true" /><h3>A website people can choose you from.</h3><p>Clear services, thoughtful design and a straightforward way to get in touch. We draft the copy and build around your business.</p><ul><li>Website design &amp; development</li><li>Content and local search basics</li><li>Enquiry forms and ongoing care</li></ul><Link href="/phone-ringing-website" className="rebuild-text-link">Explore websites<ArrowUpRight size={17} aria-hidden="true" /></Link></article>
    <article className="brand-service"><MessagesSquare size={26} aria-hidden="true" /><h3>A clearer way to handle what comes next.</h3><p>Keep customer details, quotes and next actions in view. Improve the follow-up while keeping a website that already works.</p><ul><li>CRM setup and customer records</li><li>Enquiry and quote follow-up</li><li>Practical team training</li></ul><Link href="/never-miss-a-lead" className="rebuild-text-link">Explore CRM &amp; follow-up<ArrowUpRight size={17} aria-hidden="true" /></Link></article>
    <div className="brand-connected-route"><Link2 size={25} aria-hidden="true" /><div><h3>Need both? Build the connection from the start.</h3><p>Your website and CRM planned around the same customer journey, with the scope and handover agreed together.</p></div><Link href="/leads-to-jobs" className="rebuild-text-link">Website + CRM<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    <p className="brand-commerce-link">Selling products online? <Link href="/ecommerce">Explore ecommerce<ArrowUpRight size={15} aria-hidden="true" /></Link></p>
  </div>;
}

export async function HomeWork() {
  const { projects } = await getPublishedProjects();
  return <section className="brand-section" aria-labelledby="home-work-heading">
    <div className="brand-section-heading"><div><p className="brand-eyebrow">Design you can explore</p><h2 id="home-work-heading">Give your business<br />a clearer presence.</h2></div><div><p>See how clear content, considered design and a useful next step come together.</p><Link href="/results" className="rebuild-text-link">Explore our work &amp; examples<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
    {projects.length > 0 ? <ProjectProof limit={2} /> : <div className="brand-work-grid">{[
      { image: "/template-previews/cleaning-demo.png", title: "Clear services. A confident first impression.", category: "Cleaning business · design example" },
      { image: "/template-previews/carpentry-demo.png", title: "Let the quality of the work come through.", category: "Carpentry business · design example" },
    ].map(work => <Link href="/results#examples" className="brand-work-item" key={work.image}><div className="brand-work-image"><Image src={work.image} alt={work.title} width={1200} height={800} sizes="(max-width: 820px) 90vw, 580px" /></div><div className="brand-work-caption"><div><p>{work.category}</p><h3>{work.title}</h3></div><ArrowUpRight size={22} aria-hidden="true" /></div></Link>)}</div>}
    {!projects.length && <p className="brand-small-note">These are demonstration designs for fictional businesses, showing layout and style rather than client results.</p>}
  </section>;
}

export function HomeTeam() {
  const descriptions: Record<string, string> = { "Kyle Redmond": "Websites, CRM and technical delivery.", "Clayton Long": "Your project conversations and scope.", "Sophie Coleman": "Brand, design and visual presentation." };
  return <section className="brand-section" aria-labelledby="home-team-heading">
    <div className="brand-section-heading"><div><p className="brand-eyebrow">The people behind the work</p><h2 id="home-team-heading">A small team.<br />A joined-up approach.</h2></div><div><p>You work with the people shaping the design, building the system and talking through your next step.</p><Link href="/about#team" className="rebuild-text-link">Meet the team<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
    <div className="brand-team-grid">{teamMembers.map(member => <article className="brand-person" key={member.name}><Image src={member.image} alt={member.name} width={420} height={420} sizes="(max-width: 600px) 90vw, 380px" /><div><p>{member.role}</p><h3>{member.name}</h3><p>{descriptions[member.name]}</p><Link href={`/about#${member.name.toLowerCase().replace(/\s+/g, "-")}`} className="rebuild-text-link">Meet {member.name.split(" ")[0]}<ArrowUpRight size={15} aria-hidden="true" /></Link></div></article>)}</div>
  </section>;
}

export function HomeStartingPoints() {
  return <section className="brand-section brand-starting" aria-labelledby="home-pricing-heading"><div className="brand-section-heading"><div><p className="brand-eyebrow">A clear starting point</p><h2 id="home-pricing-heading">The right scope.<br />The costs up front.</h2></div><div><p>Start with a focused website, give distinct services their own space, or scope a wider website and CRM project.</p><Link href="/packages" className="rebuild-text-link">Compare all packages<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
    <div className="brand-starting-grid">{businessPackages.filter(hasFixedPricing).map(item => <div className="brand-starting-item" key={item.id}><p>{item.id === "7-day-starter" ? "One page, with your copy drafted for you. A clear place for referrals to understand your business and get in touch." : "Up to five pages, with space to explain each service, show relevant work and make the enquiry easier."}</p><PackageSummary item={item} /></div>)}<div className="brand-custom-scope"><p className="brand-eyebrow">CRM &amp; connected projects</p><h3>Built around<br />how your team works.</h3><p>Setup, software, training and ongoing support are quoted around the people, tools and connections you need.</p><Link href="/leads-to-jobs" className="rebuild-text-link">Explore a connected project<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
  </section>;
}
