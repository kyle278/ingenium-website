
import Link from "next/link";
import TeamGrid from "@/components/rebuild/TeamGrid";
import { buildManagedMetadata as buildMetadata } from "@/lib/portalIntegration/seo-runtime";
import {  pageSeo } from "@/lib/seo";

export async function generateMetadata() { return buildMetadata(pageSeo["/team"]); }

export default function TeamPage() {
  return (
    <div className="rebuild-page">
      <section className="rebuild-hero">
        <p className="rebuild-kicker">Meet the team</p>
        <h1>The people behind your project.</h1>
        <p className="rebuild-lead">A small team with clear responsibilities across design, technical delivery and project conversations. You work directly with the people building your website and CRM.</p>
        <div className="home-hero-actions">
          <Link className="rebuild-button" href="/contact">Talk to the team</Link>
          <Link className="rebuild-text-link" href="/about">About Ingenium →</Link>
        </div>
      </section>
      <section className="rebuild-section">
        <h2 className="rebuild-section-heading">Meet the people you’ll work with.</h2>
        <TeamGrid />
      </section>
      <section className="rebuild-section home-invitation">
        <div><h2 className="rebuild-section-heading">Let’s talk about your next step.</h2><p>Tell us what needs to work better. We’ll help you find the right scope and the right people for the project.</p></div>
        <Link className="rebuild-button" href="/contact">Discuss your project</Link>
      </section>
    </div>
  );
}
