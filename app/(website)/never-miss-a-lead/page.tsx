import OutcomePage from "@/components/rebuild/OutcomePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/never-miss-a-lead"]);
export default function Page() { return <OutcomePage route="followup" />; }
