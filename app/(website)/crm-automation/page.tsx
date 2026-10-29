import CorePackagePage from "@/components/rebuild/CorePackagePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/crm-automation"]);
export const dynamic = "force-dynamic";
export default function CrmAutomationPage() { return <CorePackagePage packageId="crm-automation" />; }
