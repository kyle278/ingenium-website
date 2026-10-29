import CorePackagePage from "@/components/rebuild/CorePackagePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/starter-website"]);
export const dynamic = "force-dynamic";
export default function StarterWebsitePage() { return <CorePackagePage packageId="starter-website" />; }
