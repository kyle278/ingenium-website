import { buildMetadata, pageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import OfferPage from "@/components/rebuild/OfferPage";
import { getOffer } from "@/components/rebuild/offers";

export const metadata: Metadata = buildMetadata(pageSeo["/crm"]);
export default function CrmPage() { return <OfferPage offer={getOffer("crm")} />; }
