import OfferTotal from "@/components/website-editor/OfferTotal";

import { EditorFlow, EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { Offer } from "./offers";

export function OfferFaq({ items }: { items: Offer["faqs"] }) {
  return <div className="rebuild-faq">
    {items.map(({ question, answer }) => <details key={question}>
      <summary><span><EditorText identity={question} editorId="r2075f1ea94-8s" tag="span" value={question} /></span><Plus size={18} aria-hidden="true" /></summary>
      <p><EditorText identity={question} editorId="r2075f1ea94-av" tag="p" value={answer} /></p>
    </details>)}
  </div>;
}

export function OfferPrice({ offer }: { offer: Offer }) {
  return <div>
    <p className="rebuild-price"><EditorText editorId={"offer."+offer.slug+".setup"} identity={offer.slug} tag="p" value={offer.setup} /> <span className="text-base font-normal"><EditorText editorId="r2075f1ea94-gp" tag="span" value={"setup"} /></span></p>
    <p className="mt-2 text-xl font-semibold"><EditorText editorId="r2075f1ea94-ih" tag="p" value={"+ "} /><EditorText editorId={"offer."+offer.slug+".monthly"} identity={offer.slug} tag="p" value={offer.monthly.toLowerCase()} /><EditorText editorId="r2075f1ea94-jc" tag="p" value={"/month"} /></p>
    <p className="mt-3 text-sm"><EditorText editorId="r2075f1ea94-kk" tag="p" value={"No VAT charged. Scope confirmed before work begins."} /></p>
  </div>;
}

export default function OfferPage({ offer }: { offer: Offer }) {
  return <EditorFlow containerId="r2075f1ea94-oo" className="rebuild-page">
    <EditorSection editorId="r2075f1ea94-po" className="rebuild-hero">
      <p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-ro" tag="p" value={offer.name} /></p>
      <div className="rebuild-grid-two items-start">
        <div><h1><EditorText editorId="r2075f1ea94-u5" tag="h1" value={offer.title} /></h1><p className="rebuild-lead"><EditorText editorId="r2075f1ea94-vf" tag="p" value={offer.description} /></p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><EditorLink editorId="r2075f1ea94-xy" className="rebuild-button" href={offer.href}><EditorText editorId="r2075f1ea94-zd" tag="Link" value={offer.cta} /><ArrowRight size={18} aria-hidden="true" /></EditorLink><EditorLink editorId="r2075f1ea94-112" className="rebuild-text-link" href="#included"><EditorText editorId="r2075f1ea94-12j" tag="Link" value={"See what is included"} /></EditorLink></div>
        </div>
        <aside className="rebuild-panel" aria-label={`${offer.packageName} starting scope`}>
          <p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-17o" tag="p" value={offer.packageName} /></p><OfferPrice offer={offer} /><p className="mt-6"><EditorText editorId="r2075f1ea94-19n" tag="p" value={offer.audience} /></p>
          <div className="mt-6 border-t border-current/15 pt-5 text-sm"><p><EditorText editorId="r2075f1ea94-1cc" tag="p" value={"Defined implementation. Ongoing care."} /></p><EditorLink editorId="r2075f1ea94-1dh" className="rebuild-text-link mt-3 inline-flex" href="/pricing"><EditorText editorId="r2075f1ea94-1fe" tag="Link" value={"Compare all packages "} /><ArrowRight size={15} aria-hidden="true" /></EditorLink></div>
        </aside>
      </div>
    </EditorSection>
    <EditorSection editorId="r2075f1ea94-1j1" className="rebuild-section" aria-labelledby="benefits-title">
      <div className="rebuild-section-heading"><p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-1n6" tag="p" value={"Made useful"} /></p><h2 id="benefits-title"><EditorText editorId="r2075f1ea94-1o9" tag="h2" value={offer.benefitsTitle} /></h2></div>
      <div className="rebuild-grid">{offer.benefits.map((benefit, index) => <article key={benefit.title} className="border-t border-current/15 pt-6"><p className="rebuild-kicker"><EditorText identity={benefit.title} editorId="r2075f1ea94-1u6" tag="p" value={"0"} /><EditorText identity={benefit.title} editorId="r2075f1ea94-1u7" tag="p" value={index + 1} /></p><h3 className="mt-4"><EditorText identity={benefit.title} editorId="r2075f1ea94-1v7" tag="h3" value={benefit.title} /></h3><p className="mt-3"><EditorText identity={benefit.title} editorId="r2075f1ea94-1wb" tag="p" value={benefit.body} /></p></article>)}</div>
    </EditorSection>
    <EditorSection editorId="r2075f1ea94-1xx" className="rebuild-section" id="included" aria-labelledby="included-title">
      <div className="rebuild-grid-two items-start">
        <div className="rebuild-section-heading"><p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-240" tag="p" value={"The starting scope"} /></p><h2 id="included-title"><EditorText editorId="r2075f1ea94-25a" tag="h2" value={offer.packageName} /></h2><p><EditorText editorId="r2075f1ea94-261" tag="p" value={offer.audience} /></p><div className="mt-8"><OfferPrice offer={offer} /></div><EditorLink editorId="r2075f1ea94-285" className="rebuild-button mt-8" href={offer.href}><EditorText editorId="r2075f1ea94-29p" tag="Link" value={offer.cta} /><ArrowRight size={18} aria-hidden="true" /></EditorLink></div>
        <div><ul className="rebuild-list">{offer.includes.map((item) => <li key={item}><EditorText identity={item} editorId="r2075f1ea94-2e1" tag="li" value={item} /></li>)}</ul><div className="mt-8 space-y-4 border-t border-current/15 pt-6"><p><EditorText editorId="r2075f1ea94-2ge" tag="p" value={offer.care} /></p><p><EditorText editorId="r2075f1ea94-2gx" tag="p" value={offer.exclusions} /></p><p className="text-sm"><EditorText editorId="r2075f1ea94-2i6" tag="p" value={"Implementation plus 12 months of service "} /><EditorText editorId="r2075f1ea94-2jb" tag="p" value={offer.slug === "ecommerce" ? "starts at" : "totals"} /> <strong><OfferTotal offer={offer}/></strong><EditorText editorId="r2075f1ea94-2lo" tag="p" value={", excluding "} /><EditorText editorId="r2075f1ea94-2m0" tag="p" value={offer.slug === "ecommerce" ? "platform costs and " : ""} /><EditorText editorId="r2075f1ea94-2nl" tag="p" value={"agreed extras. This is a cost comparison, not a minimum service term."} /></p></div></div>
      </div>
    </EditorSection>
    {offer.sections.map((section) => <EditorSection editorId="r2075f1ea94-2rv" instanceKey={section.title} className="rebuild-section" key={section.title}><div className="rebuild-grid-two"><h2 className="rebuild-section-heading"><EditorText identity={section.title} editorId="r2075f1ea94-2vi" tag="h2" value={section.title} /></h2><div className="space-y-5">{section.paragraphs.map((paragraph) => <p key={paragraph}><EditorText identity={paragraph} editorId="r2075f1ea94-2yf" tag="p" value={paragraph} /></p>)}{section.link && <EditorLink identity={section.title} editorId="r2075f1ea94-2zd" className="rebuild-text-link" href={section.link.href}><EditorText identity={section.title} editorId="r2075f1ea94-312" tag="Link" value={section.link.label} /><ArrowRight size={16} aria-hidden="true" /></EditorLink>}</div></div></EditorSection>)}
    <EditorSection editorId="r2075f1ea94-33v" className="rebuild-section" aria-labelledby="faq-title"><div className="rebuild-grid-two"><div className="rebuild-section-heading"><p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-38l" tag="p" value={"Before you decide"} /></p><h2 id="faq-title"><EditorText editorId="r2075f1ea94-39p" tag="h2" value={"A few useful answers."} /></h2><p><EditorText editorId="r2075f1ea94-3ai" tag="p" value={"If your question is specific to your business, bring it to the conversation."} /></p></div><OfferFaq items={offer.faqs} /></div></EditorSection>
    <EditorSection editorId="r2075f1ea94-3ed" className="rebuild-section"><div className="rebuild-panel"><p className="rebuild-kicker"><EditorText editorId="r2075f1ea94-3h3" tag="p" value={"The next step"} /></p><h2 className="rebuild-section-heading"><EditorText editorId="r2075f1ea94-3io" tag="h2" value={offer.closing.title} /></h2><p className="rebuild-lead"><EditorText editorId="r2075f1ea94-3k6" tag="p" value={offer.closing.body} /></p><EditorLink editorId="r2075f1ea94-3ku" className="rebuild-button mt-7" href={offer.href}><EditorText editorId="r2075f1ea94-3me" tag="Link" value={offer.cta} /><ArrowRight size={18} aria-hidden="true" /></EditorLink></div></EditorSection>
  </EditorFlow>;
}
