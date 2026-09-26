import { buildMetadata, pageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import OfferPage from "@/components/rebuild/OfferPage";
import { getOffer } from "@/components/rebuild/offers";

export const metadata: Metadata = buildMetadata(pageSeo["/websites"]);
export default function WebsitesPage() { return <OfferPage offer={getOffer("websites")} />; }
