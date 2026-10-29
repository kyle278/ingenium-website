import { packageRequestTime } from "@/lib/package-request-time";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages, getBusinessPackage, packageBookingUrl, PACKAGE_PRICE_NOTE, PROMOTION_DEADLINE_LABEL } from "@/lib/business-packages";
import { PackagePrice, StarterPromotion } from "./PackagePricing";
import { OfferFaq } from "./OfferPage";
import EnquiryJourney from "./EnquiryJourney";

const resources: Record<string, string[]> = {
  "starter-website": ["/resources/starter-content-checklist.txt", "/resources/starter-launch-checklist.txt"],
  "business-growth": ["/resources/growth-enquiry-response.txt", "/resources/growth-pipeline-guide.txt"],
  "crm-automation": ["/resources/crm-workflow-map.txt", "/resources/crm-acceptance-checklist.txt"],
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
      { question: "What if I need extra pages, bookings or a CRM?", answer: "Business Growth includes up to five pages and basic CRM. Booking systems, ecommerce and additional integrations need a separate scope. We will help you choose the smallest useful starting point." },
    ],
  },
  "business-growth": {
    headline: "The website gets the enquiry. Your team knows what happens next.",
    intro: "Bring your website, customer details and first response together. See new enquiries in one pipeline, acknowledge them automatically and give your team a clear place to follow up.",
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
    headline: "Less chasing information. More control of your business.",
    intro: "Bring customer records, open opportunities and agreed workflows into Ingenium Portal. We map the process, configure the system and train the people who will use it.",
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
  return <EditorFlow containerId={`core-packages.v2.${item.id}.flow`} className="core-package-page">
    {item.id === "starter-website" && <StarterPromotion initialNow={now} compact />}
    <EditorSection editorId={`core-packages.v2.${item.id}.hero`} className="core-detail-hero">
      <div><Link href="/packages" className="core-back-link">All three packages</Link><p className="brand-eyebrow">{item.name}</p><h1><EditorText editorId="core-packages.v2.landing.headline" identity={item.id} tag="h1" value={copy.headline} /></h1><p className="rebuild-lead"><EditorText editorId="core-packages.v2.landing.intro" identity={item.id} tag="p" value={copy.intro} /></p><div className="core-hero-actions"><Link href={cta} className="rebuild-button">{item.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#included" className="rebuild-text-link">See what is included</a></div><p className="core-small">Free 15-minute call. A written scope and total before you decide.</p></div>
      <aside className="core-quote-panel" aria-label={`${item.name} pricing`}><h2>Your starting point</h2><PackagePrice packageId={item.id} initialNow={now} showTotal /><p><strong>Choose this if:</strong> {item.fit}</p><p><strong>Target delivery:</strong> {item.timing}, once the agreed deposit, content and access are received.</p><p className="core-small">{item.payment}</p><p className="core-small">No VAT charged. Your written quote confirms all subscription terms. Existing agreements are honoured.</p></aside>
    </EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.problem`} className="core-section core-editorial"><h2><EditorText editorId="core-packages.v2.problem.title" identity={item.id} tag="h2" value={copy.problemTitle} /></h2><div><p>{copy.problem}</p><p className="core-example-label">{copy.exampleTitle}</p><p>{copy.example}</p></div></EditorSection>
    {item.id === "business-growth" && <section className="core-section core-journey-demo" aria-label="Illustrative website enquiry journey"><div><h2>See the enquiry journey.</h2><p>This interactive example shows the kind of handover we plan with you. It is a demonstration, not a live customer record.</p></div><EnquiryJourney /></section>}
    <EditorSection editorId={`core-packages.v2.${item.id}.included`} className="core-section core-inclusions" id="included"><div><p className="brand-eyebrow">A defined scope. A usable handover.</p><h2>What you get.</h2><ul className="core-package-includes">{item.includes.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul></div><div className="core-support-stack"><article><CheckCircle2 size={22} aria-hidden="true" /><h3>Practical help included</h3><ul>{item.extras.map((text, index) => <li key={text}><a href={resources[item.id][index]} className="rebuild-text-link" download>{text}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul><p className="core-small">Included in your package price.</p></article><article><h3>What the monthly service covers</h3><p>{item.care}</p></article><article><h3>Keep the scope clear</h3><p>{item.excludes}</p></article></div></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.process`} className="core-section"><h2>A clear route from first call to handover.</h2><ol className="core-process">{copy.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.assurance`} className="core-section core-assurance"><CheckCircle2 size={28} aria-hidden="true" /><div><h2>Know what you are approving.</h2><p>We agree the deliverables, payment milestones and acceptance checks in writing. Review the work against that scope before the final balance and launch or handover. Additional work is quoted before it starts.</p>{item.id === "crm-automation" && <p>Your implementation also includes the 14-day defect warranty described above.</p>}</div></EditorSection>
    <section className="core-section core-faq"><div><h2>Before you decide.</h2><p>{item.name}, explained plainly.</p></div><OfferFaq items={[...copy.faqs]} /></section>
    <EditorSection editorId={`core-packages.v2.${item.id}.close`} className="core-section core-close"><div><h2>{item.id === "starter-website" ? "Give your business a place to be found." : item.id === "business-growth" ? "Give your next enquiry a clear next step." : "Start with the process that takes too much time."}</h2><p>Tell us how things work today. We will check the fit, explain the scope and confirm the price before you commit.</p></div><Link href={cta} className="rebuild-button">{item.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link></EditorSection>
    <nav className="core-other-paths" aria-label="Other packages">{businessPackages.filter(other => other.id !== item.id).map(other => <Link key={other.id} href={other.href}><span>{other.question}<strong>{other.name}</strong></span><ArrowRight size={20} aria-hidden="true" /></Link>)}</nav>
    <p className="core-small core-final-note">{PACKAGE_PRICE_NOTE}</p>
  </EditorFlow>;
}
