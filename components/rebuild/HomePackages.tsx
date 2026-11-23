import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { EditorText } from "@/components/website-editor/Editable";
import { businessPackages, packageBookingUrl, PACKAGE_PRICE_NOTE } from "@/lib/business-packages";
import { PackagePrice } from "./PackagePricing";
import styles from "./home-packages.module.css";

const categories = {
  "starter-website": "Online presence",
  "business-growth": "Website + CRM + follow-up",
  "crm-automation": "Business operations",
};

export default function HomePackages({ initialNow }: { initialNow: number }) {
  return <div className={styles.packages}>
    <header className={styles.heading}>
      <h2 id="packages-heading"><EditorText editorId="home.packages.heading" tag="h2" value="Three packages. Start where it hurts most." /></h2>
      <p><EditorText editorId="home.packages.intro" tag="p" value="You don't need to buy everything at once. Start with a website, add follow-up when you're ready, bring the whole operation together when it makes sense." /></p>
    </header>
    <div className={styles.grid}>
      {businessPackages.map(item => <article key={item.id} id={item.id} className={`${styles.card} ${item.recommended ? styles.featured : ""}`} aria-labelledby={`home-${item.id}-heading`}>
        {item.recommended && <p className={styles.recommended}>Recommended</p>}
        <p className={styles.category}>{categories[item.id]}</p>
        <h3 id={`home-${item.id}-heading`}><Link href={item.href}><EditorText editorId="home.packages.name" identity={item.id} tag="h3" value={item.name} /></Link></h3>
        <p className={styles.audience}><EditorText editorId="home.packages.audience" identity={item.id} tag="p" value={item.audience} /></p>
        <div className={styles.price}><PackagePrice packageId={item.id} initialNow={initialNow} /></div>
        <ul className={styles.includes}>{item.includes.map(inclusion => <li key={inclusion}><Check size={17} aria-hidden="true" /><EditorText editorId="home.packages.inclusion" identity={`${item.id}:${inclusion}`} tag="span" value={inclusion} /></li>)}</ul>
        <div className={styles.bottom}>
          <p>Target delivery: <strong>{item.timing}</strong></p>
          <Link href={packageBookingUrl(item)} className={item.recommended ? "rebuild-button" : "rebuild-button-secondary"}>
            {item.recommended ? "Start with Business Growth" : `Ask about ${item.name}`}{item.recommended && <ArrowUpRight size={17} aria-hidden="true" />}
          </Link>
        </div>
      </article>)}
    </div>
    <div className={styles.notes}>
      <p>{PACKAGE_PRICE_NOTE} <Link href="/packages#compare" className="rebuild-text-link">Compare everything included<ArrowUpRight size={15} aria-hidden="true" /></Link></p>
      <p>Delivery starts after the agreed deposit, content and access are received. Feedback and third-party dependencies affect the schedule.</p>
    </div>
  </div>;
}
