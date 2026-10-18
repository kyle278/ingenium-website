import { PRICE } from "@/lib/starter-website";
import OfferLink from "./OfferLink";

export function StarterOfferStrip() {
  return <aside className="starter-offer-strip" aria-label="Starter Website offer">
    <div><p>Your first business website: <strong>{PRICE.setup} setup</strong>, normally {PRICE.regularSetup}. Save {PRICE.setupSaving}.</p><p className="starter-offer-strip-care">+ {PRICE.monthly}/month hosting and care</p></div>
    <OfferLink placement="home-strip">See the Starter offer <span aria-hidden="true">→</span></OfferLink>
  </aside>;
}

export default function StarterPromotion({ compact = false }: { compact?: boolean }) {
  return <aside className={`starter-promotion${compact ? " starter-promotion-compact" : ""}`} aria-labelledby={compact ? "services-starter-heading" : "home-starter-heading"}>
    <div className="starter-promotion-copy">
      <p className="rebuild-kicker">STARTER WEBSITE OFFER</p>
      <h2 id={compact ? "services-starter-heading" : "home-starter-heading"}>{compact ? "Need your first business website?" : "Your first business website. Written for you."}</h2>
      <p>{compact ? "One professional page, branded and written for your business, with an enquiry form so customers can get in touch." : "A professional one-page website that shows what you do and makes it easy for customers to enquire. Branded and written for your business."}</p>
    </div>
    <div className="starter-promotion-offer">
      <p className="starter-promotion-was">Normally <s>{PRICE.regularSetup}</s></p>
      <p className="starter-promotion-price"><span>Now</span> <strong>{PRICE.setup}</strong> <span>setup</span></p>
      <p className="starter-promotion-saving">Save {PRICE.setupSaving}</p>
      <p className="starter-promotion-care">+ {PRICE.monthly}/month {compact ? "hosting and care." : "for hosting and care."} Domain paid separately.</p>
      {!compact && <p className="starter-promotion-inclusions">One page · One enquiry form · Your branding · Copy written for you</p>}
      <OfferLink placement={compact ? "services" : "home-hero"} className="rebuild-button">{compact ? "Explore the Starter Website" : `See the ${PRICE.setup} website offer`} <span aria-hidden="true">→</span></OfferLink>
    </div>
  </aside>;
}
