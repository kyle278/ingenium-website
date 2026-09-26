import { buildMetadata, pageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata(pageSeo["/how-we-work"]);

const steps = [
  { title: "Understand what needs to change", body: "We review your current website or process and discuss where it is causing difficulty. Bring a page that no longer explains the business, an enquiry that became hard to track or a task your team repeats.", detail: "For a straightforward project, this helps us identify a defined package. More complex requirements begin with paid discovery." },
  { title: "Agree the scope", body: "We set out the pages, records, features and connections included in the project. We also agree responsibilities, review rounds, payment, care and acceptance checks.", detail: "Your proposal identifies dependencies such as content, account access or decisions your team needs to provide." },
  { title: "Build and review", body: "We develop the agreed work and bring it back for review at the planned points. You nominate a person to collect feedback so changes can be considered together.", detail: "If a new request changes the scope, we discuss its cost and effect on the schedule before proceeding." },
  { title: "Check the real journey", body: "We check the agreed pages, forms and workflows against the acceptance criteria. For a connected project, that includes following an enquiry from the website into the CRM and reviewing it with an intended user.", detail: "The checks reflect what your team needs to do, not just how a screen looks." },
  { title: "Launch and hand over", body: "We agree the launch steps and provide the included handover or training. You receive the information needed to use the delivered work and the route for support.", detail: "Any open items are recorded with a next action and an owner." },
  { title: "Review after launch", body: "We review the agreed measures and practical feedback after the team has used the work.", detail: "That helps identify whether a small adjustment, further training or a separately scoped improvement would be useful." },
];

export default function HowWeWorkPage() {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">How we work</p><h1>A clear process from first conversation to handover.</h1><p className="rebuild-lead">You should know what is being built, what decisions you need to make and what will be checked before launch. We agree those details at the start of the project.</p><Link href="/contact" className="rebuild-button mt-8">Discuss your project<ArrowRight size={18} aria-hidden="true" /></Link></section>
    <ol className="list-none p-0" aria-label="Project stages">{steps.map((step, index) => <li className="rebuild-section" key={step.title}><div className="rebuild-grid-two"><div><p className="rebuild-kicker">0{index + 1}</p><h2 className="rebuild-section-heading">{step.title}</h2></div><div className="space-y-5"><p>{step.body}</p><p>{step.detail}</p></div></div></li>)}</ol>
    <section className="rebuild-section"><div className="rebuild-grid-two"><h2 className="rebuild-section-heading">What helps a project move forward.</h2><ul className="rebuild-list"><li>One person who can approve the work and consolidate feedback.</li><li>Content and images supplied in the agreed format.</li><li>Access to the systems involved in the scope.</li><li>Clear decisions about enquiries, customer records and responsibility.</li><li>Time for the intended users to test and learn the workflow.</li></ul></div></section>
    <section className="rebuild-section"><div className="rebuild-grid-two"><h2 className="rebuild-section-heading">Timelines are agreed around the actual work.</h2><p>We confirm a schedule once the scope, dependencies and delivery capacity are understood. If something changes, we discuss the effect on the plan instead of leaving the date unclear.</p></div></section>
    <section className="rebuild-section"><div className="rebuild-panel"><h2 className="rebuild-section-heading">Start with the problem you want to solve.</h2><p className="rebuild-lead">You do not need a finished specification to talk to us. A clear example of what is difficult is enough to begin.</p><Link href="/contact" className="rebuild-button mt-7">Discuss your project<ArrowRight size={18} aria-hidden="true" /></Link></div></section>
  </div>;
}
