import { packageRequestTime } from "@/lib/package-request-time";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bell, Check, CheckCircle2, FileText, ListTodo } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages, getBusinessPackage, packageBookingUrl, PACKAGE_PRICE_NOTE, PROMOTION_DEADLINE_LABEL, starterPromotionActive } from "@/lib/business-packages";
import { enquiryExamples, enquiryExamplePath, type EnquiryExampleId } from "@/lib/enquiry-examples";
import { PackagePrice, StarterPromotion } from "./PackagePricing";
import { OfferFaq } from "./OfferPage";
import EnquiryJourney from "./EnquiryJourney";

const resources: Record<string, string[]> = {
  "starter-website": ["/resources/starter-content-checklist.txt", "/resources/starter-launch-checklist.txt"],
  "business-growth": ["/resources/growth-enquiry-response.txt", "/resources/growth-pipeline-guide.txt"],
};
const examples = {
  carpentry: { label: "Illustrative website", title: "A one-page carpentry site", description: "See how services, work and an enquiry can fit on one page.", image: "/template-previews/carpentry-demo.png", href: "/template-previews/carpentry", link: "Explore the carpentry demo" },
  landscaping: { label: "Illustrative website", title: "A landscaping website", description: "See how a site can make different garden jobs and the next step clear.", image: "/template-previews/landscaping-demo.png", href: "/template-previews/landscaping", link: "Explore the landscaping demo" },
};
const content = {
  "starter-website": {
    headline: "A first website for a business getting started.",
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
    headline: "Connect your website to your enquiry process.",
    intro: "If the website needs work as well as your enquiry process, we build a new site and connect its forms to Ingenium Portal. Your team gets a shared pipeline and one agreed workflow for new website enquiries.",
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
      { question: "What if our website already works well?", answer: "Start with CRM & Automation. We’ll review your existing setup and what it would take to connect it, subject to feasibility. You can scope website work separately if it would help." },
      { question: "Will this bring me more leads?", answer: "The website is designed to make enquiring easier, and the CRM helps you manage those enquiries. This package does not include advertising, ongoing SEO or a guaranteed number of leads or sales." },
      { question: "What does the included workflow do?", answer: "For the agreed website enquiry form, it creates or updates a contact, creates a lead, notifies your business and sends an acknowledgement email. Additional follow-up sequences, reminder workflows and third-party integrations are quoted separately." },
      { question: "Does it collect WhatsApp and Facebook messages automatically?", answer: "No. The base package connects the agreed website forms. Your team can add other enquiries to the CRM manually. Automatic messaging-channel connections require a feasibility review and separate quote." },
      { question: "What are the CRM and email limits?", answer: "We confirm the number of users, records, monthly emails and workflow executions, plus support availability, in your written proposal before you commit. The indicative €99 subscription covers the allowances in that agreement." },
      { question: "Why are the prices indicative?", answer: "From €1,500 setup and from €99 per month are the indicative starting prices for this defined starting scope. We confirm delivery feasibility, allowances and the final total in your proposal. Extras require agreement before work starts." },
      { question: "Does the website include content writing?", answer: "You supply your business details, text and images. We organise and lightly edit the supplied content. New copywriting, photography and brand development can be quoted separately." },
    ],
  },
} as const;

export default async function CorePackagePage({ packageId, initialExample }: { packageId: keyof typeof content; initialExample?: EnquiryExampleId }) {
  const item = getBusinessPackage(packageId)!;
  const copy = content[packageId];
  const now = await packageRequestTime();
  const cta = packageBookingUrl(item);
  const isGrowth = item.id === "business-growth";
  const isStarter = item.id === "starter-website";
  const promotionActive = isStarter && starterPromotionActive(now);
  const faqs = isStarter && !promotionActive ? copy.faqs.slice(2) : copy.faqs;
  const pricePanel = <aside className="core-quote-panel" aria-label={`${item.name} pricing`}>
    <h2>Your starting point</h2>
    <PackagePrice packageId={item.id} initialNow={now} showTotal />
    <p><strong>Choose this if:</strong> {item.fit}</p>
    <p><strong>Target delivery:</strong> {item.timing}, once the agreed deposit, content and access are received.</p>
    <p className="core-small">{item.payment}</p>
    <p className="core-small">No VAT charged. Your written quote confirms all subscription terms. Existing agreements are honoured.</p>
  </aside>;

  return <EditorFlow containerId={`core-packages.v2.${item.id}.flow`} className="core-package-page">
    {promotionActive && <StarterPromotion initialNow={now} compact />}
    <EditorSection editorId={`core-packages.v2.${item.id}.hero`} className={isGrowth ? "core-detail-hero growth-package-hero" : "core-detail-hero"}>
      <div>
        <Link href="/packages" className="core-back-link">All three packages</Link>
        <p className="brand-eyebrow">{item.name}</p>
        <h1><EditorText editorId="core-packages.v2.landing.headline" identity={item.id} tag="h1" value={copy.headline} /></h1>
        <p className="rebuild-lead"><EditorText editorId="core-packages.v2.landing.intro" identity={item.id} tag="p" value={copy.intro} /></p>
        <div className="core-hero-actions">
          {isGrowth ? <>
            <a href="#enquiry-demo" className="rebuild-button">See the enquiry workflow <ArrowRight size={17} aria-hidden="true" /></a>
            <Link href={cta} className="rebuild-button-secondary">Discuss Business Growth <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </> : <>
            <Link href={cta} className="rebuild-button">Request a free callback <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#package-example" className="rebuild-text-link">See one-page examples</a>
          </>}
        </div>
        <p className="core-small">We’ll contact you to agree a time for a free 15-minute call.</p>
        {isGrowth && <div className="growth-hero-price">
          <PackagePrice packageId={item.id} initialNow={now} compact />
          <a href="#included" className="rebuild-text-link">See scope and pricing <ArrowRight size={16} aria-hidden="true" /></a>
        </div>}
        {isGrowth && <nav className="growth-example-links" aria-label="See a quote example from your trade">
          <span>See an enquiry from your trade</span>
          <div>{enquiryExamples.map(example => <Link key={example.id} href={enquiryExamplePath(example.id)} aria-current={example.id === initialExample ? "true" : undefined}>{example.label}</Link>)}</div>
        </nav>}
      </div>
      {isGrowth ? <figure className="crm-board growth-intake-board">
        <figcaption><span>How one website enquiry is handled</span><span>Workflow illustration</span></figcaption>
        <ol>
          <li><FileText size={22} aria-hidden="true" /><div><strong>Customer submits the form</strong><p>They tell you what they need and how to reach them.</p></div></li>
          <li><ListTodo size={22} aria-hidden="true" /><div><strong>The enquiry reaches Portal</strong><p>The workflow records the contact and creates a lead in your pipeline.</p></div></li>
          <li><Bell size={22} aria-hidden="true" /><div><strong>Your team gets notified</strong><p>The customer gets an acknowledgement while your team takes the next step.</p></div></li>
        </ol>
      </figure> : pricePanel}
    </EditorSection>
    <nav className="core-fit-links" aria-label="Other ways to start">
      {isGrowth ? <>
        <Link href="/crm-automation">Already have a website that works? Start with CRM &amp; Automation <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/starter-website">Just need a first website? See Starter <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </> : <>
        <Link href="/business-growth">Need more pages and enquiry tracking? See Business Growth <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/crm-automation">Already have a website? Improve your follow-up with CRM <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/ecommerce">Need to take orders online? Explore ecommerce <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </>}
    </nav>
    {isGrowth && <section className="core-section core-journey-demo" id="enquiry-demo" aria-labelledby="enquiry-demo-heading">
      <div className="core-section-heading">
        <h2 id="enquiry-demo-heading">From “No owner yet” to a dated follow-up.</h2>
        <div>
          <p>Follow one sample quote request from the moment it arrives to the moment someone owns the next action.</p>
          <a href="#package-example" className="rebuild-text-link">See a live quote form<ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <EnquiryJourney key={initialExample ?? "default"} initialExample={initialExample} />
    </section>}
    <section className="core-section core-proof" id="package-example" aria-labelledby="package-example-heading">
      <div className="core-section-heading">
        <h2 id="package-example-heading">{isGrowth ? "See how a real customer asks for a quote." : "See what fits on one page."}</h2>
      </div>
      {isGrowth ? <>
        <article className="growth-proof">
          <div className="growth-proof-copy">
            <p className="brand-eyebrow">Published client website</p>
            <h3>Farrell Contract Cleaning</h3>
            <p>The website we built gives home and business customers a dedicated route to ask for a quote. The first step asks what type of cleaning they need and how they prefer to be contacted.</p>
            <a href="https://www.farrellcleaning.ie/quote" className="rebuild-button" target="_blank" rel="noopener noreferrer">Open Farrell’s live quote form<ArrowUpRight size={17} aria-hidden="true" /></a>
            <p className="core-small">You can inspect the first step without entering any details. The walkthrough above uses sample records to show how your team could handle follow-up.</p>
          </div>
          <figure className="growth-proof-capture">
            <Image src="/project-previews/farrell-quote-mobile.webp" alt="First step of Farrell Contract Cleaning’s live quote form on a phone, showing service type and preferred contact method" width={716} height={1394} sizes="(max-width: 600px) 75vw, 290px" />
            <figcaption>Live quote form on mobile · Step 1 of 3</figcaption>
          </figure>
        </article>
        <div className="growth-proof-next">
          <div>
            <h3>What would happen to your last enquiry?</h3>
            <p>Bring an example and invite the person who handles intake. On the free 15-minute call, we’ll trace where it came from, who saw it and what should happen next.</p>
          </div>
          <div>
            <Link href={cta} className="rebuild-button">Request a free callback<ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/quote-follow-up" className="rebuild-text-link">Check your last five enquiries<ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href={examples.landscaping.href} className="rebuild-text-link">{examples.landscaping.link}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </> : <div className="core-proof-grid">{[examples.carpentry, examples.landscaping].map(example => <article key={example.title}>
        <Image src={example.image} alt={`Homepage preview for ${example.title}`} width={1200} height={800} sizes="(max-width: 700px) 90vw, 550px" />
        <div>
          <p className="brand-eyebrow">{example.label}</p>
          <h3>{example.title}</h3>
          <p>{example.description}</p>
          <Link href={example.href} className="rebuild-text-link">{example.link}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </article>)}</div>}
      {isStarter && <div className="core-readiness">
        <div><h3>What to have ready</h3><p>Your business and service details, approved text and photos, and access to the domain you want to use.</p></div>
        <div><h3>What we’ll do</h3><p>Organise your material into one mobile-friendly page, test calls and enquiries, and look after hosting and technical care from launch.</p></div>
        <a href="/resources/starter-content-checklist.txt" className="rebuild-text-link" download>Download the content checklist<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>}
    </section>
    <EditorSection editorId={`core-packages.v2.${item.id}.problem`} className="core-section core-editorial">
      <h2><EditorText editorId="core-packages.v2.problem.title" identity={item.id} tag="h2" value={copy.problemTitle} /></h2>
      <div>
        <p>{copy.problem}</p>
        <p className="core-example-label">{copy.exampleTitle}</p>
        <p>{copy.example}</p>
      </div>
    </EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.included`} className="core-section core-inclusions" id="included"><div><p className="brand-eyebrow">A defined scope. A usable handover.</p><h2>What you get.</h2><ul className="core-package-includes">{item.includes.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul></div><div className="core-support-stack">{isGrowth && pricePanel}<article><CheckCircle2 size={22} aria-hidden="true" /><h3>Practical help included</h3><ul>{item.extras.map((text, index) => <li key={text}><a href={resources[item.id][index]} className="rebuild-text-link" download>{text}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul><p className="core-small">Included in your package price.</p></article><article><h3>What the monthly service covers</h3><p>{item.care}</p></article><article><h3>Keep the scope clear</h3><p>{item.excludes}</p></article></div></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.process`} className="core-section"><h2>A clear route from first call to handover.</h2><ol className="core-process">{copy.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></EditorSection>
    <EditorSection editorId={`core-packages.v2.${item.id}.assurance`} className="core-section core-assurance"><CheckCircle2 size={28} aria-hidden="true" /><div><h2>Know what you are approving.</h2><p>We agree the deliverables, payment milestones and acceptance checks in writing. Review the work against that scope before the final balance and launch or handover. Additional work is quoted before it starts.</p></div></EditorSection>
    <section className="core-section core-faq"><div><h2>Before you decide.</h2><p>{item.name}, explained plainly.</p></div><OfferFaq items={[...faqs]} /></section>
    <EditorSection editorId={`core-packages.v2.${item.id}.close`} className="core-section core-close">
      <div>
        <h2>{isStarter ? "Give referrals a site you can share." : "Bring one enquiry that got stuck."}</h2>
        <p>We’ll use the free 15-minute call to check the fit and talk through what we would put in scope.</p>
      </div>
      <Link href={cta} className="rebuild-button">Request a free callback<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </EditorSection>
    <nav className="core-other-paths" aria-label="Other packages">{[...businessPackages].reverse().filter(other => other.id !== item.id).map(other => <Link key={other.id} href={other.href}><span>{other.question}<strong>{other.name}</strong></span><ArrowRight size={20} aria-hidden="true" /></Link>)}</nav>
    <p className="core-small core-final-note">{PACKAGE_PRICE_NOTE}</p>
  </EditorFlow>;
}
