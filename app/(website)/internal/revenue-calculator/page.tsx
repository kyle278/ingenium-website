import RevenueExitCalculator from "./RevenueExitCalculator";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo["/internal/revenue-calculator"]);

export default function RevenueCalculatorPage() {
  return <RevenueExitCalculator />;
}
