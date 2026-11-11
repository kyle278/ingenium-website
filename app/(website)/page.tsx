import { packageRequestTime } from "@/lib/package-request-time";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Globe2, MessagesSquare, Workflow } from "lucide-react";
import { EditorFlow, EditorSection, EditorText } from "@/components/website-editor/Editable";
import { businessPackages, PACKAGE_PRICE_NOTE, starterPromotionActive } from "@/lib/business-packages";
import { enquiryExamples, enquiryExamplePath } from "@/lib/enquiry-examples";
import { PackagePrice, StarterPromotion } from "@/components/rebuild/PackagePricing";
import PackageOptions from "@/components/rebuild/PackageOptions";
import CurrentProjects from "@/components/rebuild/CurrentProjects";
import { HomeTeam } from "@/components/rebuild/HomeStory";
import { OfferFaq } from "@/components/rebuild/OfferPage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/"]);
export const dynamic = "force-dynamic";
const icons = [Globe2, MessagesSquare, Workflow];
const faqs = [
  { question: "Which package should I start with?", answer: "Choose Starter Website for a first online presence. Choose Business Growth when you need a website and a better way to manage its enquiries. Choose CRM & Automation when an established team needs customer records and processes brought together. A free call can help you decide." },
  { question: "Will you guarantee more leads or sales?", answer: "We agree the website, CRM and workflow deliverables, then test those with you. Sales also depend on demand, traffic, pricing and your team's follow-up. Advertising, ongoing SEO and revenue guarantees are not part of these packages." },
  { question: "Can I keep my current website?", answer: "Yes. CRM & Automation can work around an existing website, with one agreed integration subject to feasibility. A website rebuild is not required." },
  { question: "What does the monthly subscription cover?", answer: "Starter covers hosting and technical care. Business Growth adds Ingenium Portal CRM access and one agreed workflow. CRM & Automation covers the agreed CRM, workflows and support. Your proposal documents allowances, billing, cancellation and data export." },
  { question: "Can I move to another package later?", answer: "Yes. Start with what your business needs now. We review what can be reused and quote the additional work before an upgrade. An upgrade is not automatically included in the initial fee." },
];
export default async function HomePage() {
  const now = await packageRequestTime();
  return <EditorFlow containerId="core-packages.v2.home.flow" className="core-home">
    {starterPromotionActive(now) && <StarterPromotion initialNow={now} />}
    <EditorSection editorId="core-packages.v2.home.hero" className="core-home-hero" aria-labelledby="home-heading">
      <div className="core-home-hero-copy"><p className="brand-eyebrow"><EditorText editorId="core-packages.v2.home.position" tag="p" value="Business growth & automation for Irish businesses" /></p><h1 id="home-heading"><span><EditorText editorId="core-packages.v2.home.headline.online" tag="span" value="Get online." /></span><span><EditorText editorId="core-packages.v2.home.headline.follow" tag="span" value="Follow up." /></span><span><EditorText editorId="core-packages.v2.home.headline.time" tag="span" value="Get time back." /></span></h1><p className="rebuild-lead"><EditorText editorId="core-packages.v2.home.intro" tag="p" value="A professional website. A clearer way to manage enquiries. Less repetitive admin. Choose the support your business needs now, with room to grow." /></p><div className="core-hero-actions"><a className="rebuild-button" href="#packages">Find my package<ArrowDown size={18} aria-hidden="true" /></a><Link href="/results" className="rebuild-text-link">See our work<ArrowUpRight size={17} aria-hidden="true" /></Link></div><p className="core-small">Based in Carlow. Working with businesses across Ireland.</p></div>
      <nav className="core-path-selector" aria-label="Choose one of our three packages"><p>What would make the biggest difference?</p>{businessPackages.map((item, index) => { const Icon = icons[index]; return <Link key={item.id} href={item.href} className={item.recommended ? "is-featured" : ""}><div className="core-path-icon"><Icon size={23} aria-hidden="true" /></div><div><span className="core-path-question">{item.question}</span><strong>{item.name}</strong><PackagePrice packageId={item.id} initialNow={now} compact /></div><ArrowUpRight className="core-path-arrow" size={19} aria-hidden="true" /></Link>; })}</nav>
    </EditorSection>
    <div className="core-trust-line"><span><Check size={18} aria-hidden="true" />Clear scope and price before work starts</span><span><Check size={18} aria-hidden="true" />Built and configured for you</span><span><Check size={18} aria-hidden="true" />A handover your team can use</span></div>
    <EditorSection editorId="core-packages.v2.home.packages" className="core-section" id="packages" aria-labelledby="packages-heading"><div className="core-section-heading"><div><p className="brand-eyebrow">Three packages. Three clear starting points.</p><h2 id="packages-heading">Start with the problem<br />you need to solve.</h2></div><p>You do not need to buy everything at once. Establish your presence, connect your enquiries or bring your operations together.</p></div><PackageOptions /><Link href="/packages#compare" className="rebuild-text-link core-compare-link">Compare the full scope<ArrowUpRight size={17} aria-hidden="true" /></Link></EditorSection>
    <EditorSection editorId="core-packages.v2.home.service-businesses" className="core-section core-editorial"><h2>Built around the way<br />service businesses work.</h2><div><p>A landscaper waiting on quote approvals. A cleaning firm juggling new enquiries. A contractor searching for the latest customer details. The tools should make the next action clearer.</p><div className="core-sector-tags"><span>Landscaping & outdoor services</span><span>Trades & contracting</span><span>Cleaning & property services</span><span>Specialist professional services</span></div><p className="core-small">Starting out? Starter gives referrals somewhere to check you. Already busy? Business Growth and CRM & Automation help organise what comes next.</p></div></EditorSection>
    <section className="core-section core-close core-home-example" aria-labelledby="home-example-heading">
      <div>
        <h2 id="home-example-heading">Where did the last quote get stuck?</h2>
        <p>Pick a sample request and see what the customer sends, what the office sees and who follows up.</p>
        <nav className="growth-example-links" aria-label="Sample quote enquiries">
          <div>{enquiryExamples.map(example => <Link key={example.id} href={enquiryExamplePath(example.id)}>{example.label}</Link>)}</div>
        </nav>
      </div>
      <Link href="/quote-follow-up" className="rebuild-button-secondary">Check your last five enquiries<ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
    <CurrentProjects home />
    <EditorSection editorId="core-packages.v2.home.how" className="core-section"><div className="core-section-heading"><h2>You run the business.<br />We handle the setup.</h2><p>No technical brief needed for the first call. Bring one example of what is getting in the way.</p></div><ol className="core-process"><li><span>01</span><h3>A useful first conversation</h3><p>Tell us how customers find you and where work gets stuck. We recommend a useful starting point.</p></li><li><span>02</span><h3>A scope you can review</h3><p>See what is included, what we need from you, the payment stages and the delivery target in writing.</p></li><li><span>03</span><h3>Build, test and hand over</h3><p>Review the agreed work with us. We check the enquiry or workflow journey and show you how to use it.</p></li></ol></EditorSection>
    <HomeTeam />
    <section className="core-section core-faq"><div><h2>A clearer decision.</h2><p>Choose the starting point that fits today.</p></div><OfferFaq items={faqs} /></section>
    <EditorSection editorId="core-packages.v2.home.close" className="core-section core-close"><div><h2>What needs to work<br />better in your business?</h2><p>A free 15-minute call to find the right starting point. No technical preparation needed.</p></div><Link href="/book-a-call" className="rebuild-button">Help me choose a package<ArrowUpRight size={18} aria-hidden="true" /></Link></EditorSection>
    <p className="core-small core-final-note">{PACKAGE_PRICE_NOTE}</p>
  </EditorFlow>;
}
