import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/src/lib/team";
import { buildMetadata, pageSeo, ORGANIZATION_ADDRESS, ORGANIZATION_PHONE, ORGANIZATION_EMAIL, ORGANIZATION_SAME_AS } from "@/lib/seo";
export const metadata: Metadata = buildMetadata(pageSeo["/about"]);
export default function AboutPage() {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">About Ingenium</p><h1>A small team. Clear responsibilities.</h1><p className="rebuild-lead">We help businesses plan and build websites, CRM systems, and the connections between them. You work with the people responsible for the design, delivery and next steps.</p><Link className="rebuild-button" href="/contact">Discuss your project</Link></section>
    <section id="team" className="rebuild-section"><h2 className="rebuild-section-heading">Meet the team.</h2><div className="rebuild-grid">
      {teamMembers.map((member) => <article className="rebuild-panel" key={member.name}>
        <Image src={member.image} alt={member.name} width={320} height={320} sizes="(max-width: 700px) 90vw, 320px" style={{ width: "100%", maxWidth: 320, height: "auto", aspectRatio: "1", objectFit: "cover", borderRadius: 12 }} />
        <h3>{member.name}</h3><p className="rebuild-kicker">{member.role}</p>
        <p>{member.name === "Kyle Redmond" ? "Kyle leads technical delivery, website development and CRM implementation." : member.name === "Clayton Long" ? "Clayton handles project conversations, commercial fit and the scope of work." : "Sophie leads visual design across brand, layout and presentation."}</p>
        <p>{member.focus.join(" · ")}</p><p><a className="rebuild-text-link" href={`mailto:${member.email}`}>Email {member.name.split(" ")[0]}</a>{" · "}<a className="rebuild-text-link" href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>{member.websiteUrl && <> · <a className="rebuild-text-link" href={member.websiteUrl} target="_blank" rel="noopener noreferrer">Portfolio</a></>}</p>
      </article>)}
    </div></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Agree the work. Review it together.</h2><div className="rebuild-grid rebuild-grid-two"><article className="rebuild-panel"><h3>Scope before build</h3><p>We agree what is included, what you need to provide and how decisions will be made.</p></article><article className="rebuild-panel"><h3>Visible progress</h3><p>Review the design and workflow at agreed stages, with changes discussed before they affect the scope.</p></article></div><Link className="rebuild-text-link" href="/how-we-work">How we work →</Link></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Based in Carlow, Ireland.</h2><p>Ingenium Consulting is the public brand of Ingenium Digital Consulting.</p><address style={{ fontStyle: "normal" }}>{ORGANIZATION_ADDRESS.streetAddress}, {ORGANIZATION_ADDRESS.addressLocality}, {ORGANIZATION_ADDRESS.postalCode}, Ireland<br /><a href="tel:+353858302554">{ORGANIZATION_PHONE}</a><br /><a href={`mailto:${ORGANIZATION_EMAIL}`}>{ORGANIZATION_EMAIL}</a></address><p><a className="rebuild-text-link" href={ORGANIZATION_SAME_AS[0]} target="_blank" rel="noopener noreferrer">Google Business Profile</a>{" · "}<a className="rebuild-text-link" href={ORGANIZATION_SAME_AS[1]} target="_blank" rel="noopener noreferrer">Company LinkedIn</a></p><Link className="rebuild-button" href="/contact">Talk to the team</Link></section>
  </div>;
}
