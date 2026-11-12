import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/quote-follow-up"]);

const checks = [
  { title: "Find the last five enquiries", detail: "Check your inbox, calls, messages and website form. Put the customer, the source and what they asked for in one list." },
  { title: "Mark where each one stands", detail: "Use stages your team can agree on, such as new, visit to arrange, quote to send, waiting for a reply or closed." },
  { title: "Give each open enquiry an owner", detail: "Name the person who will take the next action. Ask them to confirm it and agree a date." },
  { title: "Review it together next week", detail: "Check what moved and what stalled. Change the intake questions if staff keep calling customers back for the same details." },
];

export default function QuoteFollowUpGuide() {
  return <article className="rebuild-page quote-follow-up-guide">
    <header className="rebuild-hero">
      <p className="brand-eyebrow">For service businesses that quote for work</p>
      <h1>Check your last five enquiries.</h1>
      <p className="rebuild-lead">Take a few minutes with the person who answers enquiries. Find out which customers are waiting, who owns the next action and where information goes missing.</p>
    </header>
    <section className="core-section" aria-labelledby="quote-checks">
      <h2 id="quote-checks">Make a list you can use together.</h2>
      <ol className="quote-follow-up-checks">
        {checks.map(check => <li key={check.title}><h3>{check.title}</h3><p>{check.detail}</p></li>)}
      </ol>
      <div className="quote-review-actions">
        <a className="rebuild-button-secondary" href="/resources/quote-follow-up-review.csv" download>Download the five-enquiry worksheet<ArrowUpRight size={17} aria-hidden="true" /></a>
        <p className="core-small">A CSV you can open in your spreadsheet and use with the person who handles enquiries.</p>
      </div>
      <div className="core-record-example">
        <p className="brand-eyebrow">Illustrative example</p>
        <h3>Patio enquiry · Carlow</h3>
        <dl className="core-workflow-split">
          <div><dt>Source</dt><dd>Website quote form</dd></div>
          <div><dt>Stage</dt><dd>Waiting for site visit</dd></div>
          <div><dt>Owner and next action</dt><dd>Office coordinator calls Thursday to arrange a visit.</dd></div>
        </dl>
      </div>
    </section>
    <section className="core-section core-close">
      <div>
        <h2>Choose what to fix first.</h2>
        <p>If the website needs work and enquiries are hard to share, see the Business Growth example. If you want to see how a team records the owner and due date after sending a quote, <Link href="/crm-automation#package-example" className="rebuild-text-link">see the quote follow-up example</Link>.</p>
      </div>
      <Link href="/business-growth#enquiry-demo" className="rebuild-button">See a sample enquiry<ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  </article>;
}
