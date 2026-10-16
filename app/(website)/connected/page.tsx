import { buildManagedMetadata as buildMetadata } from "@/lib/portalIntegration/seo-runtime";
import {  pageSeo } from "@/lib/seo";

import OfferPage from "@/components/rebuild/OfferPage";
import { getOffer } from "@/components/rebuild/offers";

export async function generateMetadata() { return buildMetadata(pageSeo["/connected"]); }
export default function ConnectedPage() { return <OfferPage offer={getOffer("connected")} />; }
