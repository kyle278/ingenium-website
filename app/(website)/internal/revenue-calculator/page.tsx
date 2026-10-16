import RevenueExitCalculator from "./RevenueExitCalculator";
import { buildManagedMetadata as buildMetadata } from "@/lib/portalIntegration/seo-runtime";
import {  pageSeo } from "@/lib/seo";

export async function generateMetadata() { return buildMetadata(pageSeo["/internal/revenue-calculator"]); }

export default function RevenueCalculatorPage() {
  return <RevenueExitCalculator />;
}
