import { packageRequestTime } from "@/lib/package-request-time";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages, getBusinessPackage, packageBookingUrl, PACKAGE_PRICE_NOTE, PROMOTION_DEADLINE_LABEL, starterPromotionActive } from "@/lib/business-packages";
import { PackagePrice, StarterPromotion } from "./PackagePricing";
import { OfferFaq } from "./OfferPage";
import EnquiryJourney from "./EnquiryJourney";

const resources: Record<string, string[]> = {
  "starter-website": ["/resources/starter-content-checklist.txt", "/resources/starter-launch-checklist.txt"],
  "business-growth": ["/resources/growth-enquiry-response.txt", "/resources/growth-pipeline-guide.txt"],
  "crm-automation": ["/resources/crm-workflow-map.txt", "/resources/crm-acceptance-checklist.txt"],
};
const examples = {
  carpentry: { label: "Illustrative website", title: "A one-page carpentry site", description: "See how services, work and an enquiry can fit on one page.", image: "/template-previews/carpentry-demo.png", href: "/template-previews/carpentry", link: "Explore the carpentry demo" },
  landscaping: { label: "Illustrative website", title: "A landscaping website", description: "See how a site can make different garden jobs and the next step clear.", image: "/template-previews/landscaping-demo.png", href: "/template-previews/landscaping", link: "Explore the landscaping demo" },
  cleaning: { label: "Published website", title: "Farrell Contract Cleaning", description: "The site presents commercial and residential services with a clear quote request.", image: "/project-previews/farrell-cleaning.webp", href: "https://www.farrellcleaning.ie/", link: "Visit the published website" },
};
const content = {
  "starter-website": {
    headline: "A proper website. A clear first step.",
    intro: "When someone hears your name, give them somewhere to see your work, understand your services and contact you. We build it and look after the technical side.",
    problemTitle: "Good at your work. Ready to show it.",
    problem: "Your customers might hear about you through a recommendation, a van sign or a Facebook post. A clear website helps them check you out and take the next step, even if they do not use social media.",
    exampleTitle: "Built for the business you have today.",
    example: "An electrician needs to show the services they offer, the areas they cover, examples of their work and how to ask for a quote. One well-planned page can do that without a larger project.",
    steps: [
      { title: "Send the essentials", text: "Use our checklist to supply your business details, service area, text, images and domain access. We agree the five sections and scope." },
      { title: "Review your website", text: "We build the mobile-friendly page. You review it and send one consolidated round of changes within the agreed scope." },
      { title: "Approve, launch and get enquiries", text: "We check the enquiry form, connect your domain and hand over the site. Monthly hosting and technical care begin at launch." },
    ],
    faqs: [
      { question: "What does the €495 offer cover?", answer: "The same defined Starter Website scope as the €795 standard setup. It is a temporary €300 saving on setup only. Hosting and technical care remain €50 per month from launch." },
      { question: "How do I secure the promotional price?", answer: `Send a Starter Website quote request through this website before ${PROMOTION_DEADLINE_LABEL}. We honour the promotional setup price for eligible requests received before the deadline, subject to agreeing the Starter scope. An unsent form or an external calendar appointment alone does not reserve the offer. There is no payment to request a quote; the written proposal confirms the deposit, total and subscription terms.` },
      { question: "When do the five working days start?", answer: "After we have the agreed deposit, required content and access. The schedule depends on you supplying materials and feedback promptly. It is a target delivery period, confirmed in your proposal." },
      { question: "Do I need to write the content?", answer: "You supply your business information, website text and images. We provide a checklist and organise that material into the agreed sections. Copywriting from scratch is quoted separately." },
      { question: "What is included in €50 per month?", answer: "Hosting, SSL, routine technical maintenance, basic uptime monitoring, infrastructure management and standard technical support. Domain registration, content changes, redesigns and new features are separate unless agreed in writing." },
      { question: "Can I link to a booking system I already use?", answer: "Tell us which booking service you use and share its public booking link. We can review a simple link in the Starter scope. A new booking system, taking payments on the website or synchronising bookings needs separate scope." },
      { question: "Who handles changes after launch?", answer: "The monthly service covers hosting and technical care. If you expect to change prices, services or class times regularly, tell us before the build. Your written scope will confirm how changes, domain access and any additional charges work." },
      { question: "What if I need extra pages or a CRM?", answer: "Business Growth includes up to five pages and basic CRM. Ecommerce and additional integrations need a separate scope." },
    ],
  },
  "business-growth": {
    headline: "See which quotes need a reply.",
    intro: "Business Growth gives service firms a website for the jobs they want and a shared pipeline for the enquiries it brings in. Your team can see who is handling each request and what needs to happen next.",
    problemTitle: "Who needs a quote? Who needs a reply?",
    problem: "A request comes through your website. Another arrives by phone. A customer messages about last week's quote. When the next action lives in someone's head, it is easy for a conversation to stall.",
    exampleTitle: "From a landscaping enquiry to a visible next step.",
    example: "A visitor asks about a garden project. Their website enquiry creates a CRM contact and lead, alerts your business and sends an acknowledgement. Your team can see the enquiry, update the stage and manage the next action. Phone calls and messages can be recorded manually; automatic imports from those channels are separate integrations.",
    steps: [
      { title: "Agree your enquiry journey", text: "Choose the website pages, form questions, sales stages and acknowledgement. We document the scope and the CRM, email and workflow allowances." },
      { title: "Build the website and connect the first response", text: "We create up to five pages and configure one CRM pipeline and one basic workflow: capture the contact and lead, notify your team and acknowledge the enquiry." },
      { title: "Test it together and train your team", text: "Follow a test enquiry from the form to the CRM and email. Use up to two hours of training to learn the day-to-day process before launch." },
    ],
    faqs: [
      { question: "Will this bring me more leads?", answer: "The website is designed to make enquiring easier, and the CRM helps you manage those enquiries. This package does not include advertising, ongoing SEO or a guaranteed number of leads or sales." },
      { question: "What does the included workflow do?", answer: "For the agreed website enquiry form, it creates or updates a contact, creates a lead, notifies your business and sends an acknowledgement email. Additional follow-up sequences, reminder workflows and third-party integrations are quoted separately." },
      { question: "Does it collect WhatsApp and Facebook messages automatically?", answer: "No. The base package connects the agreed website forms. Your team can add other enquiries to the CRM manually. Automatic messaging-channel connections require a feasibility review and separate quote." },
      { question: "What are the CRM and email limits?", answer: "We confirm the number of users, records, monthly emails and workflow executions, plus support availability, in your written proposal before you commit. The indicative €99 subscription covers the allowances in that agreement." },
      { question: "Why are the prices indicative?", answer: "From €1,500 setup and from €99 per month are the indicative starting prices for this defined starting scope. We confirm delivery feasibility, allowances and the final total in your proposal. Extras require agreement before work starts." },
      { question: "Does the website include content writing?", answer: "You supply your business details, text and images. We organise and lightly edit the supplied content. New copywriting, photography and brand development can be quoted separately." },
    ],
  },
  "crm-automation": {
    headline: "Keep your website. Fix the handover.",
    intro: "Bring customer records, open quotes and agreed workflows into Ingenium Portal. We start with one process your team already runs, check what can connect and train the people who will use it.",
    problemTitle: "Your spreadsheets have become another job.",
    problem: "Customer details live in one file. Quotes are in an inbox. Follow-ups depend on who remembers. As your team grows, keeping those separate pieces aligned takes more and more effort.",
    exampleTitle: "Give a contracting team one shared view.",
    example: "Keep contacts, companies, leads and opportunities together. See which quotes are open, who owns the next action and where follow-up is due. Agree up to three workflows, such as lead assignment, follow-up reminders and tasks triggered by a stage change.",
    steps: [
      { title: "Map the work before choosing the system", text: "Review your current tools, roles, data and handovers. Agree one pipeline, up to five standard custom fields, workflow requirements and acceptance checks. Complex discovery is priced separately first." },
      { title: "Configure, connect and test", text: "Configure Ingenium Portal, up to three workflows and one feasible external integration. Import one cleaned contact dataset, with record limits and field mapping agreed before implementation." },
      { title: "Train, accept and hand over", text: "Set up up to five initial users, review basic dashboards and provide up to three hours of training. The agreed functionality has a 14-day defect warranty after handover." },
    ],
    faqs: [
      { question: "Do we need to replace our website?", answer: "No. This is a CRM and automation implementation. We can review one agreed connection to your existing website or another supported system. A website build is an additional service." },
      { question: "What does ‘from €3,000’ include?", answer: "A defined base implementation: discovery and scope, one pipeline, up to five custom fields, up to three workflows, one cleaned contact import, one feasible integration, basic dashboards, up to five initial users and up to three hours of training. The final price depends on your data, process and integration requirements." },
      { question: "What counts as one integration?", answer: "One agreed connection to an external service, subject to feasibility, access and the defined data flow. Complex or multi-system integrations need separate scope. Third-party subscription and API charges are additional." },
      { question: "Will you clean all our historical data?", answer: "The base implementation imports one cleaned contact dataset in the agreed format. We agree record limits and data quality requirements first. Deduplication, reconstruction, attachments and large or multi-system migrations are separate work." },
      { question: "What happens if the agreed functionality has a defect?", answer: "The 14-day warranty after handover covers defects in the agreed implementation. We correct covered defects without an additional implementation charge. New features and scope changes are quoted separately." },
      { question: "How do the monthly costs and handover work?", answer: "Your proposal defines platform access, user and execution allowances, backups, monitoring, support availability, billing, cancellation and data export. The proposed subscription starts from €199 per month; additional users, services or usage may change it." },
    ],
  },
} as const;

export default async function CorePackagePage({ packageId }: { packageId: keyof typeof content }) {
  const item = getBusinessPackage(packageId)!;
  const copy = content[packageId];
  const now = await packageRequestTime();
  const cta = packageBookingUrl(item);
  const isGrowth = item.id === "business-growth";
  const isStarter = item.id === "starter-website";
  const promotionActive = isStarter && starterPromotionActive(now);
  const faqs = isStarter && !promotionActive ? copy.faqs.slice(2) : copy.faqs;
  const websiteExamples = isStarter ? [examples.carpentry, examples.landscaping] : [examples.cleaning, examples.landscaping];
  return <EditorFlow containerId={`core-packages.v2.${item.id}.flow`} className="core-package-page">
    {promotionActive && <StarterPromotion initialNow={now} compact />}
    <EditorSection editorId={`core-packages.v2.${item.id}.hero`} className="core-detail-hero">
      <div>
        <Link href="/packages" className="core-back-link">All three packages</Link>
        <p className="brand-eyebrow">{item.name}</p>
        <h1><EditorText editorId="core-packages.v2.landing.headline" identity={item.id} tag="h1" value={copy.headline} /></h1>
        <p className="rebuild-lead"><EditorText editorId="core-packages.v2.landing.intro" identity={item.id} tag="p" value={copy.intro} /></p>
        <div className="core-hero-actions">
          <Link href={cta} className="rebuild-button">Request a free callback<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a href={isGrowth ? "#enquiry-demo" : "#package-example"} className="rebuild-text-link">{isGrowth ? "See a sample enquiry" : isStarter ? "See one-page examples" : "See an implementation example"}</a>
        </div>
        <p className="core-small">We’ll contact you to agree a time for a free 15-minute call.</p>
      </div>
      <aside className="core-quote-panel" aria-label={`${item.name} pricing`}><h2>Your starting point</h2><PackagePrice packageId={item.id} initialNow={now} showTotal /><p><strong>Choose this if:</strong> {item.fit}</p><p><strong>Target delivery:</strong> {item.timing}, once the agreed deposit, content and access are received.</p><p className="core-small">{item.payment}</p><p className="core-small">No VAT charged. Your written quote confirms all subscription terms. Existing agreements are honoured.</p></aside>
    </EditorSection>
    <nav className="core-fit-links" aria-label="Other ways to start">
      {isGrowth ? <>
        <Link href="/crm-automation">Happy with your website? See CRM &amp; Automation <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/starter-website">Just need a first website? See Starter <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </> : isStarter ? <>
        <Link href="/business-growth">Need more pages and enquiry tracking? See Business Growth <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/ecommerce">Need to take orders online? Explore ecommerce <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </> : <>
        <Link href="/business-growth">Need a new website as well? See Business Growth <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/packages#compare">Compare scope and pricing <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </>}
    </nav>
    {isGrowth && <section className="core-section core-journey-demo" id="enquiry-demo" aria-labelledby="enquiry-demo-heading">
      <div>
        <h2 id="enquiry-demo-heading">Follow a quote request from the website to the office.</h2>
        <dl className="core-workflow-split">
          <div><dt>What happens automatically</dt><dd>The website creates a record, alerts your team and acknowledges the request.</dd></div>
          <div><dt>What your team handles</dt><dd>Staff choose the owner and update the stage and next action. They can enter calls and messages manually. Automatic channel connections and extra reminders are scoped separately.</dd></div>
        </dl>
        <Link href="/quote-follow-up" className="rebuild-text-link">Check your last five enquiries<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <EnquiryJourney />
    </section>}
    <section className="core-section core-proof" id="package-example" aria-labelledby="package-example-heading">
      <div className="core-section-heading">
        <h2 id="package-example-heading">{isGrowth ? "See how customers can ask for a quote." : isStarter ? "See what fits on one page." : "Start with one workflow your team can test."}</h2>
        {isGrowth && <p>Compare a published website with a design example. The sample enquiry above illustrates the CRM handover.</p>}
      </div>
      {isStarter || isGrowth ? <div className="core-proof-grid">{websiteExamples.map(example => <article key={example.title}>
        <Image src={example.image} alt={`Homepage preview for ${example.title}`} width={1200} height={800} sizes="(max-width: 700px) 90vw, 550px" />
        <div>
          <p className="brand-eyebrow">{example.label}</p>
          <h3>{example.title}</h3>
          <p>{example.description}</p>
          <Link href={example.href} className="rebuild-text-link">{example.link}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>)}</div> : <div className="core-proof-grid">
        <article className="core-record-example">
          <p className="brand-eyebrow">Illustrative workflow</p>
          <h3>A quote needs a follow-up.</h3>
          <dl className="core-workflow-split">
            <div><dt>Trigger</dt><dd>An estimator moves an open quote to “Quote sent”.</dd></div>
            <div><dt>Action</dt><dd>The agreed workflow creates a follow-up task for the person who owns the quote.</dd></div>
            <div><dt>Acceptance check</dt><dd>Move a sample quote and check who receives the task and when it is due.</dd></div>
          </dl>
        </article>
        <article className="core-record-example">
          <h3>Agree the connection before the build.</h3>
          <p>Bring the name of your current tool and an example record. We review access, what needs to move and what one feasible connection can cover.</p>
          <p>Your proposal sets out data import, user access, support, export and what the team will test before handover.</p>
          <a href="/resources/crm-acceptance-checklist.txt" className="rebuild-text-link">See the acceptance checklist<ArrowUpRight size={16} aria-hidden="true" /></a>
        </article>
      </div>}
    </section>
    <EditorSection editorId={`core-packages.v2.${item.id}.problem`} className="core-section core-editorial"><h2><EditorText editorId="core-packages.v2.problem.title" identity={item.id} tag="h2" value={copy.problemTitle} /></h2><div><p>{copy.problem}</p><p className="core-example-label">{copy.exampleTitle}</p><p>{copy.example}</p></div></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.included`} className="core-section core-inclusions" id="included"><div><p className="brand-eyebrow">A defined scope. A usable handover.</p><h2>What you get.</h2><ul className="core-package-includes">{item.includes.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul></div><div className="core-support-stack"><article><CheckCircle2 size={22} aria-hidden="true" /><h3>Practical help included</h3><ul>{item.extras.map((text, index) => <li key={text}><a href={resources[item.id][index]} className="rebuild-text-link" download>{text}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul><p className="core-small">Included in your package price.</p></article><article><h3>What the monthly service covers</h3><p>{item.care}</p></article><article><h3>Keep the scope clear</h3><p>{item.excludes}</p></article></div></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.process`} className="core-section"><h2>A clear route from first call to handover.</h2><ol className="core-process">{copy.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.assurance`} className="core-section core-assurance"><CheckCircle2 size={28} aria-hidden="true" /><div><h2>Know what you are approving.</h2><p>We agree the deliverables, payment milestones and acceptance checks in writing. Review the work against that scope before the final balance and launch or handover. Additional work is quoted before it starts.</p>{item.id === "crm-automation" && <p>Your implementation also includes the 14-day defect warranty described above.</p>}</div></EditorSection>
    <section className="core-section core-faq"><div><h2>Before you decide.</h2><p>{item.name}, explained plainly.</p></div><OfferFaq items={[...faqs]} /></section>
    <EditorSection editorId={`core-packages.v2.${item.id}.close`} className="core-section core-close">
      <div>
        <h2>{isStarter ? "Give referrals a site you can share." : isGrowth ? "Bring one enquiry that got stuck." : "Bring one handover your team repeats."}</h2>
        <p>We’ll use the free 15-minute call to check the fit and talk through what we would put in scope.</p>
      </div>
      <Link href={cta} className="rebuild-button">Request a free callback<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </EditorSection>
    <nav className="core-other-paths" aria-label="Other packages">{businessPackages.filter(other => other.id !== item.id).map(other => <Link key={other.id} href={other.href}><span>{other.question}<strong>{other.name}</strong></span><ArrowRight size={20} aria-hidden="true" /></Link>)}</nav>
    <p className="core-small core-final-note">{PACKAGE_PRICE_NOTE}</p>
  </EditorFlow>;
}
