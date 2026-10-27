import Link from "next/link";
import { ArrowUpRight, Check, Globe2, MessagesSquare } from "lucide-react";
import { OfferFaq } from "./OfferPage";
import { businessPackages, packagePriceLabel } from "@/lib/business-packages";
import { PackageSummary } from "./PackageOptions";

export const localBusinessFaqs = [
  { question: "Do I need to write anything?", answer: "No blank page to wrestle with. Tell us about your business, your services and the places you cover. We draft the website copy for you to check and approve." },
  { question: "What if I already have a Facebook page?", answer: "Keep it. A website gives people one place to check your services, see your work and contact you, even if they don’t use Facebook. We can look at how the two work together." },
  { question: "Can you help if I already have a website?", answer: "Yes. If your website does its job, we can focus on what happens after someone gets in touch. If it needs work too, we’ll look at both together." },
  { question: "How much will it cost?", answer: `The 7-Day Starter Website is ${packagePriceLabel(businessPackages[0])}. The Phone Ringing Website, with up to five pages, is ${packagePriceLabel(businessPackages[1])}. CRM and website-plus-follow-up work are quoted individually, with setup and ongoing costs explained in your proposal.` },
  { question: "Is there a contract, and who owns the site?", answer: "Before you commit, your written agreement will explain the accounts, ownership, ongoing charges and what happens if you leave. We’ll talk you through those details so you can make an informed decision." },
  { question: "What happens on the free call?", answer: "We spend 15 minutes on your business, what customers find online and where enquiries get stuck. You leave with a clearer next step. You don’t need a technical brief or prepared content." },
];

export function CallLink({ service, secondary = false, children = "Book a free 15-minute call" }: { service?: string; secondary?: boolean; children?: React.ReactNode }) {
  return <Link className={secondary ? "rebuild-button-secondary" : "rebuild-button"} href={`/book-a-call${service ? `?service=${service}` : ""}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function RouteChoices() {
  return <div className="local-routes">
    <article className="local-route" id="website-route"><Globe2 className="local-route-icon" size={30} aria-hidden="true" /><h3>I need a website</h3><p>You’re good at what you do. Give people a place to see that when they look you up.</p><ul><li><Check size={17} aria-hidden="true" />Look credible when referrals check you</li><li><Check size={17} aria-hidden="true" />Make your services and area clear</li><li><Check size={17} aria-hidden="true" />Make getting in touch easy on a phone</li></ul><div className="local-route-packages">{businessPackages.filter(item => item.route === "website").map(item => <PackageSummary item={item} key={item.id} />)}</div><Link className="rebuild-text-link" href="/phone-ringing-website">Find my website starting point<ArrowUpRight size={18} aria-hidden="true" /></Link></article>
    <article className="local-route" id="follow-up-route"><MessagesSquare className="local-route-icon" size={30} aria-hidden="true" /><h3>I need better enquiry and job follow-up</h3><p>The enquiries are coming in. Make it easier to remember who needs a reply and which quote needs a nudge.</p><ul><li><Check size={17} aria-hidden="true" />Keep the next action in view</li><li><Check size={17} aria-hidden="true" />Know which quotes need a follow-up</li><li><Check size={17} aria-hidden="true" />Keep your team on the same page</li></ul><div className="local-route-packages">{businessPackages.filter(item => item.route === "follow-up").map(item => <PackageSummary item={item} key={item.id} />)}</div><Link className="rebuild-text-link" href="/never-miss-a-lead">Get my follow-up organised<ArrowUpRight size={18} aria-hidden="true" /></Link></article>
  </div>;
}
export const simpleSteps = [
  { title: "A short call. In your words.", body: "Start with a free 15-minute chat. Tell us what you do and what’s getting in the way. We’ll recommend the smallest useful next step." },
  { title: "We draft. You approve.", body: "Once we agree the work, we gather the details and do the writing and building. You review it with us, without needing to learn the technology." },
  { title: "Ready for real enquiries.", body: "We check the customer journey with you, from finding your services to getting in touch, then show your team how to take it from there." },
];
export function SimpleSteps() { return <ol className="local-steps">{simpleSteps.map((step, i) => <li key={step.title}><span className="local-step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>; }
export function LocalFaq() { return <section className="rebuild-section local-faq"><div><h2 className="rebuild-section-heading">A few things you might be wondering.</h2><p>You don’t need to have it all figured out before we talk.</p></div><OfferFaq items={localBusinessFaqs} /></section>; }
export function NextStep({ title = "Good at your job? Let’s make that easier to see.", body = "Tell us about your business. We’ll help you work out what will make the biggest difference next." }: { title?: string; body?: string }) {
  return <section className="rebuild-section local-next"><div><h2>{title}</h2><p>{body}</p></div><div><CallLink /><span>15 minutes. No preparation needed.</span></div></section>;
}
