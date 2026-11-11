"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { businessPackages, euro, getBusinessPackage, packageCosts, packageSetup, promotionTimeLeft, PROMOTION_DEADLINE_LABEL, STARTER_PROMOTION, starterPromotionActive } from "@/lib/business-packages";

function useOfferTime(initialNow: number) {
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    const update = () => setNow(Date.now());
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 1000);
    window.addEventListener("focus", update);
    return () => { clearTimeout(initial); clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);
  return now;
}
export function StarterPromotion({ initialNow, compact = false }: { initialNow: number; compact?: boolean }) {
  const now = useOfferTime(initialNow);
  if (!starterPromotionActive(now)) return null;
  const left = promotionTimeLeft(now);
  return <aside className={`package-promotion${compact ? " is-compact" : ""}`} aria-label="Starter Website offer">
    <div className="package-promotion-copy"><Clock3 size={20} aria-hidden="true" /><div><strong>Starter Website. <s>€795</s> €495 setup.</strong><p>Save €300 on setup. Hosting &amp; technical care: €50/month from launch.</p></div></div>
    <div className="package-countdown-wrap"><div className="package-countdown" role="timer" aria-live="off" aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes and ${left.seconds} seconds remaining`}>
      {Object.entries(left).map(([label, value]) => <span key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></span>)}
    </div><p>Ends <time dateTime={STARTER_PROMOTION.endsAt}>{PROMOTION_DEADLINE_LABEL}</time></p></div>
    {!compact && <Link href="/starter-website" className="package-promotion-link">Explore Starter<ArrowUpRight size={17} aria-hidden="true" /></Link>}
  </aside>;
}
export function PackagePrice({ packageId, initialNow, compact = false, showTotal = false }: { packageId: string; initialNow: number; compact?: boolean; showTotal?: boolean }) {
  const now = useOfferTime(initialNow);
  const item = getBusinessPackage(packageId) || businessPackages[0];
  const promotional = item.id === "starter-website" && starterPromotionActive(now);
  const from = item.pricing === "indicative-from";
  const costs = packageCosts(item, now);
  return <div className={`core-package-price${compact ? " is-compact" : ""}`}>
    {!compact && <p className="core-price-status">{promotional ? <>Standard setup <s>€795</s> · save €300</> : item.pricing === "fixed" ? "One-off setup" : "Indicative pricing · scope confirmed first"}</p>}
    <p className="core-price-amount">{from && <span>From </span>}<strong>{euro(packageSetup(item, now))}</strong><span> setup</span></p>
    <p className="core-price-monthly">+ {from ? "from " : ""}{euro(item.monthly)}/month <span>from launch</span></p>
    {showTotal && <p className="core-price-total">Setup + 12 subscription months: {from ? "from " : ""}{euro(costs.firstYear)}. This comparison is not a minimum contract term.</p>}
  </div>;
}
