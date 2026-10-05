import { buildMetadata, pageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { offers } from "@/components/rebuild/offers";

export const metadata: Metadata = buildMetadata(pageSeo["/services"]);

export default function ServicesPage() {
  return <div className="rebuild-page">
    <section className="rebuild-hero"><p className="rebuild-kicker">Our services</p><h1>Start with the part that needs to work better.</h1><p className="rebuild-lead">A clearer website. A more useful CRM. Or both designed together. Choose the work your business needs now, with room to discuss what comes next.</p><Link href="/contact" className="rebuild-button mt-8">Discuss your project<ArrowRight size={18} aria-hidden="true" /></Link></section>
    <section className="rebuild-section" aria-label="Our three main services"><div className="rebuild-grid">
      {offers.slice(0, 3).map((offer, index) => <article className="rebuild-panel flex flex-col" key={offer.slug}><p className="rebuild-kicker">0{index + 1}</p><h2 className="rebuild-section-heading">{offer.name}</h2><p className="mt-4">{offer.description}</p><p className="mt-6 font-semibold">{offer.setup} setup + {offer.monthly}/month</p><p className="mt-2 text-sm">No VAT charged. Defined starting scope.</p><Link href={`/${offer.slug}`} className="rebuild-text-link mt-auto pt-7">Explore {offer.name === "CRM" ? "CRM" : offer.name.toLowerCase()}<ArrowRight size={18} aria-hidden="true" /></Link></article>)}
    </div></section>
    <section className="rebuild-section"><div className="rebuild-grid-two"><div><p className="rebuild-kicker">Selling products online</p><h2 className="rebuild-section-heading">A shop built around how you sell.</h2></div><div className="space-y-5"><p>We also scope ecommerce websites around your product range, checkout and day-to-day order process. Platform costs, catalogue preparation and additional connections are made clear in the proposal.</p><Link href="/ecommerce" className="rebuild-text-link">Explore ecommerce<ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>
    <section className="rebuild-section"><div className="rebuild-grid-two"><h2 className="rebuild-section-heading">You do not need to choose every part at once.</h2><div className="space-y-5"><p>If your website works, a CRM project can stand on its own. If your enquiry process is already clear, start with the website. When both need attention, we can plan the form and the customer record together.</p><p>Tell us about the problem rather than trying to decide on a technical specification. We will discuss what fits and what needs a closer look.</p><Link href="/how-we-work" className="rebuild-text-link">See how we work<ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>
    <section className="rebuild-section"><div className="rebuild-panel"><h2 className="rebuild-section-heading">Not sure where to start?</h2><p className="rebuild-lead">Bring one example of what is getting in the way. We can use that to identify the right conversation.</p><Link href="/contact" className="rebuild-button mt-7">Discuss your project<ArrowRight size={18} aria-hidden="true" /></Link></div></section>
  </div>;
}
