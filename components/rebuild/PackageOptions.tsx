import { packageRequestTime } from "@/lib/package-request-time";
import Link from "next/link";
import { ArrowUpRight, Check, Globe2, Workflow, MessagesSquare } from "lucide-react";
import { EditorText } from "@/components/website-editor/Editable";
import { businessPackages, PACKAGE_PRICE_NOTE, type BusinessPackage } from "@/lib/business-packages";
import { PackagePrice } from "./PackagePricing";
export function PackageSummary({ item }: { item: BusinessPackage }) {
  return <Link className="local-package-summary" href={item.href}><strong>{item.name}</strong><span>{item.question}</span><span className="local-package-summary-link">Explore this package <ArrowUpRight size={16} aria-hidden="true" /></span></Link>;
}
export function PackageCard({ item, initialNow, featured = item.recommended }: { item: BusinessPackage; initialNow: number; featured?: boolean }) {
  const Icon = item.id === "starter-website" ? Globe2 : item.id === "business-growth" ? MessagesSquare : Workflow;
  return <article className={`core-package-card${featured ? " is-recommended" : ""}`} id={item.id}>
    <div className="core-package-card-top"><Icon size={25} aria-hidden="true" /><span>{item.id === "crm-automation" ? "For established teams" : item.id === "business-growth" ? "Website and enquiry management" : "For a first website"}</span></div>
    <h3><EditorText editorId="core-packages.v2.name" identity={item.id} tag="h3" value={item.name} /></h3>
    <p className="core-package-outcome"><EditorText editorId="core-packages.v2.outcome" identity={item.id} tag="p" value={item.outcome} /></p>
    <PackagePrice packageId={item.id} initialNow={initialNow} />
    <p className="core-package-audience"><EditorText editorId="core-packages.v2.audience" identity={item.id} tag="p" value={item.audience} /></p>
    <ul className="core-package-includes">{item.includes.map(text => <li key={text}><Check size={17} aria-hidden="true" /><EditorText editorId="core-packages.v2.includes" identity={`${item.id}:${text}`} tag="span" value={text} /></li>)}</ul>
    <div className="core-package-card-bottom"><p>Target delivery: <strong>{item.timing}</strong></p><Link href={item.href} className={featured ? "rebuild-button" : "rebuild-button-secondary"}>Explore {item.name}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
  </article>;
}
export default async function PackageOptions({
  route = "all",
  notes = true,
  offers = businessPackages,
  featuredId,
}: {
  route?: "all" | "website" | "follow-up" | "both";
  notes?: boolean;
  offers?: readonly BusinessPackage[];
  featuredId?: BusinessPackage["id"];
}) {
  const now = await packageRequestTime();
  const items = offers.filter(item => route === "all" || (route === "both" ? item.id === "business-growth" : item.route === route));
  return <div className="core-package-options">
    <div className="core-package-grid">
      {items.map(item => <PackageCard item={item} initialNow={now} key={item.id} featured={featuredId ? item.id === featuredId : undefined} />)}
    </div>
    {notes && <div className="core-package-notes">
      <p>{PACKAGE_PRICE_NOTE}</p>
      <p>Delivery starts after the agreed deposit, content and access are received. Your feedback and any third-party dependencies affect the schedule. Existing client agreements and free-hosting commitments are honoured.</p>
    </div>}
  </div>;
}
