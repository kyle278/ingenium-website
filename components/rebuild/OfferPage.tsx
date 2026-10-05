import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { Offer } from "./offers";

export function OfferFaq({ items }: { items: Offer["faqs"] }) {
  return <div className="rebuild-faq">
    {items.map(({ question, answer }) => <details key={question}>
      <summary><span>{question}</span><Plus size={18} aria-hidden="true" /></summary>
      <p>{answer}</p>
    </details>)}
  </div>;
}

export function OfferPrice({ offer }: { offer: Offer }) {
  return <div>
    <p className="rebuild-price">{offer.setup} <span className="text-base font-normal">setup</span></p>
    <p className="mt-2 text-xl font-semibold">+ {offer.monthly.toLowerCase()}/month</p>
    <p className="mt-3 text-sm">No VAT charged. Scope confirmed before work begins.</p>
  </div>;
}

export default function OfferPage({ offer }: { offer: Offer }) {
  return <div className="rebuild-page">
    <section className="rebuild-hero">
      <p className="rebuild-kicker">{offer.name}</p>
      <div className="rebuild-grid-two items-start">
        <div><h1>{offer.title}</h1><p className="rebuild-lead">{offer.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><Link className="rebuild-button" href={offer.href}>{offer.cta}<ArrowRight size={18} aria-hidden="true" /></Link><Link className="rebuild-text-link" href="#included">See what is included</Link></div>
        </div>
        <aside className="rebuild-panel" aria-label={`${offer.packageName} starting scope`}>
          <p className="rebuild-kicker">{offer.packageName}</p><OfferPrice offer={offer} /><p className="mt-6">{offer.audience}</p>
          <div className="mt-6 border-t border-current/15 pt-5 text-sm"><p>Defined implementation. Ongoing care.</p><Link className="rebuild-text-link mt-3 inline-flex" href="/pricing">Compare all packages <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </aside>
      </div>
    </section>
    <section className="rebuild-section" aria-labelledby="benefits-title">
      <div className="rebuild-section-heading"><p className="rebuild-kicker">Made useful</p><h2 id="benefits-title">{offer.benefitsTitle}</h2></div>
      <div className="rebuild-grid">{offer.benefits.map((benefit, index) => <article key={benefit.title} className="border-t border-current/15 pt-6"><p className="rebuild-kicker">0{index + 1}</p><h3 className="mt-4">{benefit.title}</h3><p className="mt-3">{benefit.body}</p></article>)}</div>
    </section>
    <section className="rebuild-section" id="included" aria-labelledby="included-title">
      <div className="rebuild-grid-two items-start">
        <div className="rebuild-section-heading"><p className="rebuild-kicker">The starting scope</p><h2 id="included-title">{offer.packageName}</h2><p>{offer.audience}</p><div className="mt-8"><OfferPrice offer={offer} /></div><Link className="rebuild-button mt-8" href={offer.href}>{offer.cta}<ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div><ul className="rebuild-list">{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul><div className="mt-8 space-y-4 border-t border-current/15 pt-6"><p>{offer.care}</p><p>{offer.exclusions}</p><p className="text-sm">Implementation plus 12 months of service {offer.slug === "ecommerce" ? "starts at" : "totals"} <strong>{offer.annual}</strong>, excluding {offer.slug === "ecommerce" ? "platform costs and " : ""}agreed extras. This is a cost comparison, not a minimum service term.</p></div></div>
      </div>
    </section>
    {offer.sections.map((section) => <section className="rebuild-section" key={section.title}><div className="rebuild-grid-two"><h2 className="rebuild-section-heading">{section.title}</h2><div className="space-y-5">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.link && <Link className="rebuild-text-link" href={section.link.href}>{section.link.label}<ArrowRight size={16} aria-hidden="true" /></Link>}</div></div></section>)}
    <section className="rebuild-section" aria-labelledby="faq-title"><div className="rebuild-grid-two"><div className="rebuild-section-heading"><p className="rebuild-kicker">Before you decide</p><h2 id="faq-title">A few useful answers.</h2><p>If your question is specific to your business, bring it to the conversation.</p></div><OfferFaq items={offer.faqs} /></div></section>
    <section className="rebuild-section"><div className="rebuild-panel"><p className="rebuild-kicker">The next step</p><h2 className="rebuild-section-heading">{offer.closing.title}</h2><p className="rebuild-lead">{offer.closing.body}</p><Link className="rebuild-button mt-7" href={offer.href}>{offer.cta}<ArrowRight size={18} aria-hidden="true" /></Link></div></section>
  </div>;
}
