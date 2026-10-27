import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { businessPackages, euro, hasFixedPricing, packageBookingUrl, packageCosts, packageSavings, type BusinessPackage } from "@/lib/business-packages";

export function PackageSummary({ item }: { item: BusinessPackage }) {
  return <Link className="local-package-summary" href={`/packages#${item.id}`}><span>{item.name}{item.recommended && <small>Recommended</small>}</span>{hasFixedPricing(item) ? <><strong>{item.regularPrice !== null && <small>Normally <s>{euro(item.regularPrice)}</s></small>}{euro(item.price)}<small>{item.regularPrice !== null ? "current build offer" : "one-off"}</small></strong><span className="local-package-summary-care">{euro(item.monthly)}/month care from launch</span></> : <span className="local-package-summary-care">Quoted individually for your business</span>}<span className="local-package-summary-link">{hasFixedPricing(item) ? "Compare package" : "Explore this option"}<ArrowUpRight size={15} aria-hidden="true" /></span></Link>;
}

export function PackageCard({ item }: { item: BusinessPackage }) {
  const costs = packageCosts(item);
  return <article className={`local-package-card${item.recommended ? " is-recommended" : ""}`} id={item.id}>
    <div className="local-package-card-heading"><h3>{item.name}</h3>{item.recommended && <span className="local-package-badge">Recommended</span>}{packageSavings(item) > 0 && <span className="local-package-badge">Current Starter offer</span>}</div>
    <p className="local-package-audience">{item.audience}</p>
    {hasFixedPricing(item) ? <div className="local-package-price"><span className="local-package-once">One-off build & setup</span>{item.regularPrice !== null && <p className="local-package-anchor">Normally <s>{euro(item.regularPrice)}</s> for the build</p>}<strong>{euro(item.price)}</strong><span>+ {euro(item.monthly)}/month care from launch</span>{packageSavings(item) > 0 && <small className="local-package-saving">Save {euro(packageSavings(item))} on the build. Monthly care stays {euro(item.monthly)}.</small>}</div> : <div className="local-package-price"><span className="local-package-once">An individual proposal</span><strong className="local-package-quote-price">Quoted for your business</strong><small>We confirm the setup price and ongoing costs before you decide.</small></div>}
    <p className="local-package-fit"><strong>Choose this if:</strong> {item.fit}</p>
    <p className="local-package-timing">{item.timing ? <>Planned launch: <strong>{item.timing} from kick-off</strong></> : "Delivery timing confirmed with your individual quote."}</p>
    {!hasFixedPricing(item) && <p className="local-package-scope-label">What we can help with</p>}
    <ul className="local-package-includes">{item.includes.map(text => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul>
    {item.extras.length > 0 && <div className="local-package-extras"><h4>Also included</h4><ul>{item.extras.map(text => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul><p>Included in your package price.</p></div>}
    <div className="local-package-details"><p><strong>Ongoing:</strong> {item.care}</p><p><strong>Not included:</strong> {item.excludes}</p></div>
    {costs && hasFixedPricing(item) && <details className="local-package-cost-breakdown"><summary>See the full cost breakdown</summary><dl className="local-package-totals"><div><dt>First-year total</dt><dd>{euro(costs.firstYear)}</dd></div><div><dt>Each year after</dt><dd>{euro(costs.annualAfter)}</dd></div></dl><p>Build: {euro(item.price)}. Care: {euro(item.monthly)} per month from launch. These are cost comparisons, not annual invoices.</p></details>}
    <Link className={item.recommended ? "rebuild-button" : "rebuild-button-secondary"} href={packageBookingUrl(item)} aria-label={`Book a free call about ${item.name}`}>Book a free 15-minute call<ArrowUpRight size={17} aria-hidden="true" /></Link>
  </article>;
}

export default function PackageOptions({ route = "all" }: { route?: "all" | "website" | "follow-up" | "both" }) {
  const groups = [
    { id: "website" as const, title: "I need a website", description: "Start with a focused first site, or give each main service room to shine." },
    { id: "follow-up" as const, title: "I need better enquiry and job follow-up", description: "Keep the website you have, or bring your website and follow-up together." },
  ];
  return <div className="local-package-options">{groups.filter(group => route === "all" || group.id === route || (route === "both" && group.id === "follow-up")).map(group => <section key={group.id} aria-labelledby={`packages-${group.id}`}><div className="local-package-group-heading"><h2 className="rebuild-section-heading" id={`packages-${group.id}`}>{group.title}</h2><p>{group.description}</p></div><div className="local-package-grid">{businessPackages.filter(item => item.route === group.id && (route !== "both" || item.id === "leads-to-jobs")).map(item => <PackageCard item={item} key={item.id} />)}</div></section>)}<div className="local-package-notes"><p>Website builds have a one-off price plus monthly care starting at launch. Enquiry follow-up and combined projects are quoted individually, including their ongoing costs. Any agreed extras are separate.</p><p>Launch timing starts after your agreement, deposit and content call. We confirm the schedule with you; waiting for your information or approval can move the date. Google verification and search visibility follow Google’s own process.</p><p>We confirm the platform, account arrangements and any additional requirements in your written proposal before you commit.</p></div></div>;
}
