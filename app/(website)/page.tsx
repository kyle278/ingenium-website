import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessagesSquare, Workflow } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { getBusinessPackage, packageBookingUrl, starterPromotionActive } from "@/lib/business-packages";
import { enquiryExamples, enquiryExamplePath } from "@/lib/enquiry-examples";
import { packageRequestTime } from "@/lib/package-request-time";
import { PackagePrice, StarterPromotion } from "@/components/rebuild/PackagePricing";
import CrmWorkflowLinks from "@/components/rebuild/CrmWorkflowLinks";
import { HomeTeam } from "@/components/rebuild/HomeStory";
import { OfferFaq } from "@/components/rebuild/OfferPage";
import QuoteBoard from "@/components/rebuild/QuoteBoard";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/"]);
export const dynamic = "force-dynamic";

const crm = getBusinessPackage("crm-automation")!;
const growth = getBusinessPackage("business-growth")!;
const starter = getBusinessPackage("starter-website")!;
const faqs = [
  { question: "Can I keep my current website?", answer: "Yes. CRM & Automation can work around an existing website, with one agreed integration subject to feasibility. A website rebuild is not required." },
  { question: "Which package should I start with?", answer: "Choose CRM & Automation when your team needs a clearer way to handle customers, quotes or follow-up. Choose Business Growth when you need a website and a better way to manage its enquiries. Starter Website gives a smaller business its first online presence." },
  { question: "Will you guarantee more leads or sales?", answer: "We agree the website, CRM and workflow deliverables, then test those with you. Sales also depend on demand, traffic, pricing and your team's follow-up. Advertising, ongoing SEO and revenue guarantees are not part of these packages." },
  { question: "What does the monthly subscription cover?", answer: "CRM & Automation covers the agreed CRM, workflows and support. Business Growth includes website care, Ingenium Portal CRM access and one agreed workflow. Starter covers hosting and technical care. Your proposal documents allowances, billing, cancellation and data export." },
  { question: "Can I move to another package later?", answer: "Yes. Start with what your business needs now. We review what can be reused and quote the additional work before an upgrade. An upgrade is not automatically included in the initial fee." },
];

export default async function HomePage() {
  const now = await packageRequestTime();

  return <EditorFlow containerId="core-packages.v2.home.flow" className="core-home">
    <EditorSection editorId="core-packages.v2.home.hero" className="crm-hero home-hero" aria-labelledby="home-heading">
      <div className="crm-hero-copy">
        <p className="brand-eyebrow"><EditorText editorId="core-packages.v2.home.position" tag="p" value="Business growth & automation for Irish businesses" /></p>
        <h1 id="home-heading"><EditorText editorId="core-packages.v2.home.headline.workflow" tag="h1" value="Give every enquiry and quote a clear next step." /></h1>
        <p className="rebuild-lead"><EditorText editorId="core-packages.v2.home.intro" tag="p" value="We set up CRM and workflows around how your team works. Keep the website you have, or add a new one when you need a better way to bring in enquiries." /></p>
        <div className="core-hero-actions">
          <Link href={crm.href} className="rebuild-button">Explore CRM &amp; Automation <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href={growth.href} className="rebuild-button-secondary">Explore Business Growth <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <Link href={starter.href} className="home-starter-link rebuild-text-link">Buying your first site? Explore Starter Website <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
      <QuoteBoard />
    </EditorSection>

    <EditorSection editorId="core-packages.v2.home.packages" className="core-section home-offers" id="packages" aria-labelledby="packages-heading">
      <header className="core-section-heading">
        <h2 id="packages-heading">Where does the work get stuck?</h2>
        <p>Start with the part your team needs to improve. See what each option does in practice.</p>
      </header>
      <div className="home-offer-grid">
        <article className="home-offer home-offer-crm" id="crm-automation" aria-labelledby="home-crm-heading">
          <p className="home-offer-label"><Workflow size={20} aria-hidden="true" /> CRM &amp; Automation</p>
          <h3 id="home-crm-heading">Get quotes and renewals out of inboxes.</h3>
          <p>Keep your website. Start with one team and set up an agreed workflow in Ingenium Portal so people know who owns the next step and when it’s due.</p>
          <PackagePrice packageId={crm.id} initialNow={now} compact />
          <CrmWorkflowLinks />
        </article>
        <article className="home-offer home-offer-growth" id="business-growth" aria-labelledby="home-growth-heading">
          <p className="home-offer-label"><MessagesSquare size={20} aria-hidden="true" /> Business Growth</p>
          <h3 id="home-growth-heading">Connect a better website to your sales process.</h3>
          <p>Get a new website and a shared place to manage its enquiries. See how a request reaches the team and gets a first response.</p>
          <PackagePrice packageId={growth.id} initialNow={now} compact />
          <nav className="growth-example-links" aria-label="Sample website enquiries">
            <div>{enquiryExamples.map(example => <Link key={example.id} href={enquiryExamplePath(example.id)}>{example.label}</Link>)}</div>
          </nav>
          <Link href="/quote-follow-up" className="rebuild-text-link">Check your last five enquiries <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>
      </div>
      <div className="home-offer-footer" id="starter-website">
        <div><h3>Starter Website</h3><p>A first site for a small business.</p></div>
        <Link href={starter.href} className="rebuild-text-link">Explore Starter Website <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <Link href="/packages#compare" className="rebuild-text-link">Compare all three packages <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      {starterPromotionActive(now) && <StarterPromotion initialNow={now} compact />}
    </EditorSection>

    <EditorSection editorId="core-packages.v2.home.how" className="core-section" aria-labelledby="home-process-heading">
      <div className="core-section-heading">
        <h2 id="home-process-heading">From one handover to a setup your team can use.</h2>
        <p>Bring a real enquiry, quote or renewal to the first call. We’ll talk through who handles it and what needs to happen next.</p>
      </div>
      <ol className="core-process">
        <li><span>01</span><h3>Map the work</h3><p>Walk through how your team handles it today, which tools it uses and where the handover gets stuck.</p></li>
        <li><span>02</span><h3>Agree what to build</h3><p>Get a written scope with the deliverables, access we need, payment stages and what your team will test.</p></li>
        <li><span>03</span><h3>Test it with your team</h3><p>Follow a sample through the agreed setup. Check who receives it and what they see before handover.</p></li>
      </ol>
      <Link href="/crm-automation#crm-implementation" className="rebuild-text-link core-compare-link">See how a CRM implementation works <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </EditorSection>

    <EditorSection editorId="core-packages.v2.home.project-proof" className="core-section home-proof" id="current-projects" aria-labelledby="home-project-heading">
      <div>
        <p className="brand-eyebrow">Published client website · Farrell Contract Cleaning</p>
        <h2 id="home-project-heading">A clearer way to request a cleaning quote.</h2>
        <p>We built a dedicated quote form for Farrell. Customers can choose the type of cleaning they need and tell the team how they prefer to be contacted.</p>
        <div className="core-hero-actions">
          <Link href="/business-growth#package-example" className="rebuild-button">See the published quote example <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/results#current-projects" className="rebuild-text-link">See more website projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <figure className="home-proof-capture">
        <div>
          <Image src="/project-previews/farrell-quote-mobile.webp" alt="Farrell’s quote form showing cleaning service and contact method choices on a phone" width={716} height={1394} sizes="208px" />
        </div>
        <figcaption>First step of Farrell’s live quote form</figcaption>
      </figure>
    </EditorSection>

    <HomeTeam />
    <section className="core-section core-faq" aria-labelledby="home-faq-heading"><div><h2 id="home-faq-heading">Questions before you decide.</h2><p>Existing websites, scope and ongoing support.</p></div><OfferFaq items={faqs} /></section>
    <EditorSection editorId="core-packages.v2.home.close" className="core-section core-close home-close">
      <div><h2>Which handover would you fix first?</h2><p>Use a free 15-minute call to talk through a recent enquiry, quote or renewal and decide what’s worth testing.</p></div>
      <div className="home-close-actions">
        <Link href={packageBookingUrl(crm)} className="rebuild-button">Discuss your CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <Link href={packageBookingUrl(growth)} className="rebuild-button-secondary">Discuss Business Growth <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </EditorSection>
  </EditorFlow>;
}
