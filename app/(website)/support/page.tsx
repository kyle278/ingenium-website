import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, pageSeo, ORGANIZATION_EMAIL } from "@/lib/seo";
export const metadata: Metadata = buildMetadata(pageSeo["/support"]);
export default function SupportPage() {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">Client support</p><h1>Tell us what needs attention.</h1><p className="rebuild-lead">Use your agreed project or support channel. If you do not have one, email us with the affected page or system and a short description of the issue.</p><a className="rebuild-button" href={`mailto:${ORGANIZATION_EMAIL}?subject=Support%20request`}>Email support</a></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Help us understand the problem.</h2><ul className="rebuild-list"><li>The website address or system affected.</li><li>What happened, what you expected, and when it started.</li><li>The business impact and any recent changes.</li><li>A screenshot if useful, with unnecessary personal information removed.</li></ul><p>Do not send passwords or sensitive customer records by email. We will agree a suitable way to share information if it is needed.</p></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">What support covers.</h2><p>Your agreement defines the support scope, hours and response expectations. Work may include bug investigation, form or CRM issues, and small changes where included. New features may require a separate estimate.</p><p>Response times depend on issue severity, business hours and third-party involvement. Without a written service level, support is handled on a commercially reasonable basis.</p></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Urgent production issue?</h2><p>Use the emergency route in your agreement, if one is provided. Explain the business impact and mark the request as urgent. Vendor outages, DNS changes and payment services may need action from another provider.</p><p>This page does not create a 24-hour or emergency response guarantee.</p></section>
    <section className="rebuild-section"><h2 className="rebuild-section-heading">Planning something new?</h2><Link className="rebuild-text-link" href="/contact">Discuss a new project →</Link>{" "}<Link className="rebuild-text-link" href="/data-handling">Data handling →</Link></section>
  </div>;
}
