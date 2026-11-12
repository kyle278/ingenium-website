import CrmPackagePage from "@/components/rebuild/CrmPackagePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/crm-automation"]);
export const dynamic = "force-dynamic";
export default function CrmAutomationPage() { return <CrmPackagePage />; }
