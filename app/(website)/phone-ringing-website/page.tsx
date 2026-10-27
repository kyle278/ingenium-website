import OutcomePage from "@/components/rebuild/OutcomePage";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/phone-ringing-website"]);
export default function Page() { return <OutcomePage route="website" />; }
