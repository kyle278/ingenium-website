import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck, Check, Clock3, GitBranch, ShieldCheck } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages, getBusinessPackage, packageBookingUrl, PACKAGE_PRICE_NOTE } from "@/lib/business-packages";
import { packageRequestTime } from "@/lib/package-request-time";
import { OfferFaq } from "./OfferPage";
import { PackagePrice } from "./PackagePricing";
import QuoteBoard from "./QuoteBoard";

const packageId = "crm-automation";
const editorBase = `core-packages.v2.${packageId}`;
const resourceLinks = ["/resources/crm-workflow-map.txt", "/resources/crm-acceptance-checklist.txt"];

const copy = {
  headline: "Know who owns the next step on every open quote.",
  intro: "See which quotes are open, who owns them and when follow-up is due. We set up one sales pipeline in Ingenium Portal and test the first workflow with the people who’ll use it.",
  problemTitle: "Why Ingenium Portal?",
  problem: "Ingenium Portal is the customer relationship management (CRM) system we build and support. We start with one team and one pipeline, and test the agreed workflow with your team before handover.",
  exampleTitle: "Keep the tools that already work.",
  example: "We agree what stays in your existing tools and what needs to move. If a connection would help, we check feasibility and access. Your written proposal sets out the agreed setup, support and data export arrangements.",
  steps: [
    { title: "Map the work before choosing the system", output: "Workflow map and written scope", text: "Review your current tools, roles, data and handovers. Agree one pipeline, up to five standard custom fields, workflow requirements and acceptance checks. Complex discovery is priced separately first." },
    { title: "Configure, connect and test", output: "Configured pipeline and test records", text: "Configure Ingenium Portal, up to three workflows and one feasible external integration. Import one cleaned contact dataset, with record limits and field mapping agreed before implementation." },
    { title: "Train, accept and hand over", output: "Team training and handover", text: "Set up up to five initial users, review basic dashboards and provide up to three hours of training. The agreed functionality has a 14-day defect warranty after handover." },
  ],
  faqs: [
    { question: "Do we need to replace our website?", answer: "No. This is a CRM and automation implementation. We can review one agreed connection to your existing website or another supported system. A website build is an additional service." },
    { question: "What if we already have a CRM or job-management software?", answer: "Bring one handover that’s hard to manage today. We’ll look at where the work sits and tell you if your existing tools can handle it with a better setup." },
    { question: "What does ‘from €3,000’ include?", answer: "A defined base implementation: discovery and scope, one pipeline, up to five custom fields, up to three workflows, one cleaned contact import, one feasible integration, basic dashboards, up to five initial users and up to three hours of training. The final price depends on your data, process and integration requirements." },
    { question: "What counts as one integration?", answer: "One agreed connection to an external service, subject to feasibility, access and the defined data flow. Complex or multi-system integrations need separate scope. Third-party subscription and API charges are additional." },
    { question: "Will you clean all our historical data?", answer: "The base implementation imports one cleaned contact dataset in the agreed format. We agree record limits and data quality requirements first. Deduplication, reconstruction, attachments and large or multi-system migrations are separate work." },
    { question: "How is data export agreed?", answer: "Your written proposal sets out data export and handover. Tell us which records you need to keep and we’ll confirm the arrangements before work starts." },
    { question: "What happens if the agreed functionality has a defect?", answer: "The 14-day warranty after handover covers defects in the agreed implementation. We correct covered defects without an additional implementation charge. New features and scope changes are quoted separately." },
    { question: "How do the monthly costs and handover work?", answer: "Your proposal defines platform access, user and execution allowances, backups, monitoring, support availability, billing, cancellation and data export. The proposed subscription starts from €199 per month; additional users, services or usage may change it." },
  ],
} as const;

export default async function CrmPackagePage() {
  const item = getBusinessPackage(packageId)!;
  const now = await packageRequestTime();
  const callback = packageBookingUrl(item);

  return <EditorFlow containerId={`${editorBase}.flow`} className="core-package-page crm-page">
    <EditorSection editorId={`${editorBase}.hero`} className="crm-hero" aria-labelledby="crm-heading">
      <div className="crm-hero-copy">
        <Link href="/packages" className="core-back-link">All three packages</Link>
        <p className="brand-eyebrow">{item.name}</p>
        <h1 id="crm-heading"><EditorText editorId="core-packages.v2.landing.headline" identity={item.id} tag="h1" value={copy.headline} /></h1>
        <p className="rebuild-lead"><EditorText editorId="core-packages.v2.landing.intro" identity={item.id} tag="p" value={copy.intro} /></p>
        <div className="core-hero-actions">
          <a href="#package-example" className="rebuild-button">See the workflow <ArrowDown size={18} aria-hidden="true" /></a>
          <Link href={callback} className="rebuild-button-secondary">Discuss your CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <p className="crm-call-note"><Clock3 size={16} aria-hidden="true" /> Free 15-minute callback</p>
      </div>
      <QuoteBoard />
    </EditorSection>

    <nav className="crm-jump-links" aria-label="On this page">
      <a href="#package-example">Workflow examples</a>
      <a href="#crm-implementation">Implementation</a>
      <a href="#included">Scope &amp; pricing</a>
      <a href="#crm-questions">FAQs</a>
    </nav>

    <EditorSection editorId={`${editorBase}.examples`} className="crm-section crm-examples" id="package-example" aria-labelledby="package-example-heading">
      <header className="crm-section-heading">
        <h2 id="package-example-heading">The quote went out. Who follows up?</h2>
        <div>
          <p>Two sample workflows show when someone takes ownership and how your team checks the handover.</p>
          <a href="#renewal-example" className="rebuild-text-link">Jump to the renewal example <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </header>
      <div className="crm-example-grid">
        <article className="crm-example" id="quote-example">
          <header>
            <span className="crm-example-icon"><GitBranch size={22} aria-hidden="true" /></span>
            <div><p>Example with sample data</p><h3>Quote follow-up</h3></div>
          </header>
          <dl className="crm-example-steps">
            <div><dt>Trigger</dt><dd>An estimator moves a sample quote to “Quote sent”.</dd></div>
            <div><dt>Task</dt><dd>The workflow creates a follow-up task for the quote owner, due on Thursday in this example.</dd></div>
            <div><dt>What your team tests</dt><dd>Check who receives the task, where it appears and whether the due date is right.</dd></div>
          </dl>
        </article>
        <article className="crm-example crm-example-renewal" id="renewal-example">
          <header>
            <span className="crm-example-icon"><CalendarCheck size={22} aria-hidden="true" /></span>
            <div><p>Example with sample data</p><h3>Service renewal follow-up</h3></div>
          </header>
          <dl className="crm-example-steps">
            <div><dt>Trigger</dt><dd>A customer’s service renewal is due next month. The record has a renewal date and a named owner.</dd></div>
            <div><dt>Task</dt><dd>Create a task for the owner to review the renewal before it’s due.</dd></div>
            <div><dt>What your team tests</dt><dd>Use a sample date to check that the owner receives the task once, with the right due date.</dd></div>
          </dl>
        </article>
      </div>
      <div className="crm-section-links">
        <a href={resourceLinks[1]} className="rebuild-text-link">See the acceptance checklist <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </EditorSection>

    <EditorSection editorId={`${editorBase}.problem`} className="crm-section crm-fit" aria-labelledby="crm-fit-heading">
      <h2 id="crm-fit-heading"><EditorText editorId="core-packages.v2.problem.title" identity={item.id} tag="h2" value={copy.problemTitle} /></h2>
      <div><p>{copy.problem}</p><h3>{copy.exampleTitle}</h3><p>{copy.example}</p>
        <div className="crm-section-links">
          <Link href="/security" className="rebuild-text-link">Review security and data handling <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link href="/blog/move-from-spreadsheets-into-a-crm" className="rebuild-text-link">Prepare a contact import <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </EditorSection>

    <EditorSection editorId={`${editorBase}.process`} className="crm-section crm-implementation" id="crm-implementation" aria-labelledby="crm-implementation-heading">
      <div>
        <h2 id="crm-implementation-heading">From first call to a working handover.</h2>
        <p>See what your team reviews at each stage before the system becomes part of the day-to-day work.</p>
        <a href={resourceLinks[0]} className="crm-on-dark-link" download>Download the workflow map <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <ol className="crm-implementation-steps">
        {copy.steps.map(({ title, text, output }, index) => <li key={title}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{title}</h3><p>{text}</p><strong>{output}</strong></div>
        </li>)}
      </ol>
    </EditorSection>

    <EditorSection editorId={`${editorBase}.included`} className="crm-section" id="included" aria-labelledby="crm-scope-heading">
      <header className="crm-section-heading">
        <h2 id="crm-scope-heading">What you get and what it costs.</h2>
        <p>Start with one team and an agreed scope. Your written quote confirms the price, allowances and delivery schedule.</p>
      </header>
      <div className="crm-scope">
        <div className="crm-scope-details">
          <h3>Implementation includes</h3>
          <ul className="core-package-includes">{item.includes.map(text => <li key={text}><Check size={19} aria-hidden="true" />{text}</li>)}</ul>
          <div className="crm-scope-notes">
            <div><h3>Monthly service</h3><p>{item.care}</p></div>
            <div><h3>Scoped separately</h3><p>{item.excludes}</p></div>
          </div>
        </div>
        <aside className="core-quote-panel crm-price" aria-label={`${item.name} pricing`}>
          <h3>Your starting point</h3>
          <PackagePrice packageId={item.id} initialNow={now} showTotal />
          <p><strong>Choose this if:</strong> {item.fit}</p>
          <p><strong>Target delivery:</strong> {item.timing}, once the agreed deposit, content and access are received.</p>
          <p className="core-small">{item.payment}</p>
          <p className="core-small">No VAT charged. Your written quote confirms all subscription terms. Existing agreements are honoured.</p>
          <Link href="/packages#compare" className="rebuild-text-link">Compare scope and pricing <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </aside>
      </div>
    </EditorSection>

    <EditorSection editorId={`${editorBase}.assurance`} className="crm-section crm-assurance" aria-labelledby="crm-assurance-heading">
      <ShieldCheck size={30} aria-hidden="true" />
      <div><h2 id="crm-assurance-heading">Know what you’re approving.</h2><p>Review the agreed functionality and acceptance checks before the final balance and handover. The agreed implementation includes a 14-day defect warranty. Additional work is quoted before it starts.</p></div>
    </EditorSection>

    <EditorSection editorId={`${editorBase}.faq`} className="crm-section core-faq" id="crm-questions" aria-labelledby="crm-questions-heading">
      <div><h2 id="crm-questions-heading">Questions before you decide.</h2><p>Existing tools, data import, ongoing costs and handover.</p></div>
      <OfferFaq items={[...copy.faqs]} />
    </EditorSection>

    <EditorSection editorId={`${editorBase}.close`} className="crm-section crm-close" aria-labelledby="crm-close-heading">
      <div>
        <h2 id="crm-close-heading">Bring one handover your team repeats.</h2>
        <p>We’ll use the free 15-minute call to talk through a recent quote or renewal, the tools your team uses and what would be useful to test first.</p>
      </div>
      <Link href={callback} className="rebuild-button">Discuss your CRM <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </EditorSection>
    <nav className="core-other-paths" aria-label="Other packages">{businessPackages.filter(other => other.id !== item.id).map(other => <Link key={other.id} href={other.href}><span>{other.question}<strong>{other.name}</strong></span><ArrowRight size={20} aria-hidden="true" /></Link>)}</nav>
    <p className="core-small core-final-note">{PACKAGE_PRICE_NOTE}</p>
  </EditorFlow>;
}
