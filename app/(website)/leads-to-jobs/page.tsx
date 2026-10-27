import OutcomePage from "@/components/rebuild/OutcomePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/leads-to-jobs"]);
export default function Page() { return <OutcomePage route="both" />; }
