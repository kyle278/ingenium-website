import CorePackagePage from "@/components/rebuild/CorePackagePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/business-growth"]);
export const dynamic = "force-dynamic";
export default function BusinessGrowthPage() { return <CorePackagePage packageId="business-growth" />; }
