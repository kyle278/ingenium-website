import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FollowUpCalculator from "@/components/rebuild/FollowUpCalculator";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/follow-up-calculator"]);

export default function FollowUpCalculatorPage() {
  return <article className="rebuild-page">
    <header className="rebuild-hero">
      <p className="brand-eyebrow">Enquiry follow-up calculator</p>
      <h1>What are slow replies costing you?</h1>
      <p className="rebuild-lead">See the potential value of work affected by slow or missed replies. Use your own numbers; this is a rough guide, not a promise.</p>
    </header>
    <FollowUpCalculator />
    <Link href="/#follow-up-problem" className="rebuild-text-link"><ArrowLeft size={17} aria-hidden="true" />Back to the follow-up overview</Link>
  </article>;
}
