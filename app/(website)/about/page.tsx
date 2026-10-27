import type { Metadata } from "next";
import TeamGrid from "@/components/rebuild/TeamGrid";
import Link from "next/link";

import { buildMetadata, pageSeo, ORGANIZATION_ADDRESS, ORGANIZATION_PHONE, ORGANIZATION_EMAIL, ORGANIZATION_SAME_AS } from "@/lib/seo";
export const metadata: Metadata = buildMetadata(pageSeo["/about"]);
export default function AboutPage() {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">About Ingenium</p><h1>A small team. A clear way of working.</h1><p className="rebuild-lead">We’re a Carlow-based team bringing design, website development and CRM implementation together. You work directly with the people planning the project, building it and explaining how to use it.</p><Link className="rebuild-button" href="/book-a-call">Book a free 15-minute call</Link></section>
    <section id="team" className="rebuild-section"><h2 className="rebuild-section-heading">Meet the team.</h2><TeamGrid /></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">You know your business. We make it clear online.</h2><div className="rebuild-grid rebuild-grid-two"><article className="rebuild-panel"><h3>A useful starting point</h3><p>Tell us where customers get stuck. We’ll recommend a sensible first step and explain the work and costs before you decide.</p></article><article className="rebuild-panel"><h3>We draft. You approve.</h3><p>You don’t need to write website copy or learn new software on your own. We do the building, share the work and talk it through with you.</p></article></div><Link className="rebuild-text-link" href="/how-it-works">How it works →</Link></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Based in Carlow, Ireland.</h2><p>Ingenium Consulting is the public brand of Ingenium Digital Consulting.</p><address style={{ fontStyle: "normal" }}>{ORGANIZATION_ADDRESS.streetAddress}, {ORGANIZATION_ADDRESS.addressLocality}, {ORGANIZATION_ADDRESS.postalCode}, Ireland<br /><a href="tel:+353858302554">{ORGANIZATION_PHONE}</a><br /><a href={`mailto:${ORGANIZATION_EMAIL}`}>{ORGANIZATION_EMAIL}</a></address><p><a className="rebuild-text-link" href={ORGANIZATION_SAME_AS[0]} target="_blank" rel="noopener noreferrer">Google Business Profile</a>{" · "}<a className="rebuild-text-link" href={ORGANIZATION_SAME_AS[1]} target="_blank" rel="noopener noreferrer">Company LinkedIn</a></p><Link className="rebuild-button" href="/book-a-call">Book a free 15-minute call</Link></section>
  </div>;
}
