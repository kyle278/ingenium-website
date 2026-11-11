import CorePackagePage from "@/components/rebuild/CorePackagePage";
import { getEnquiryExample } from "@/lib/enquiry-examples";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/business-growth"]);
export const dynamic = "force-dynamic";
export default async function BusinessGrowthPage({ searchParams }: { searchParams: Promise<{ example?: string | string[] }> }) {
  const { example } = await searchParams;
  return <CorePackagePage packageId="business-growth" initialExample={getEnquiryExample(example)?.id} />;
}
