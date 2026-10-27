import { Clock3, MessageCircle, NotebookPen } from "lucide-react";
import LocalRequestForm from "@/components/rebuild/LocalRequestForm";
import BookingCalendar from "@/components/rebuild/BookingCalendar";
import { validService } from "@/lib/enquiry-contract";
import { getBusinessPackage } from "@/lib/business-packages";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/book-a-call"]);
function calendarUrl() {
  try { const url = new URL(process.env.NEXT_PUBLIC_BOOKING_URL || ""); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export default async function BookCallPage({ searchParams }: { searchParams: Promise<{ service?: string; package?: string }> }) {
  const { service, package: packageId } = await searchParams;
  const selectedPackage = getBusinessPackage(packageId);
  const calendar = calendarUrl();
  return <div className="rebuild-page local-page call-page">
    <header className="call-page-heading"><p className="local-location">A useful first conversation</p><h1>Book a free call.</h1><p>15 minutes to work out your next step. Leave your number and we’ll get in touch to confirm a time.</p></header>
    <div className="call-page-layout"><div>{calendar && <BookingCalendar url={calendar} />}<LocalRequestForm key={`${selectedPackage?.id || "general"}:${service || "not-sure"}`} kind="call" initialService={selectedPackage?.service || (validService(service) ? service : "not-sure")} initialPackage={selectedPackage?.id} /></div>
      <aside className="call-page-aside" aria-label="About your free call"><h2>A little clarity goes a long way.</h2><ul className="local-call-benefits"><li><Clock3 size={22} aria-hidden="true" /><div><strong>Just 15 minutes.</strong><p>Enough to understand where you’re getting stuck.</p></div></li><li><NotebookPen size={22} aria-hidden="true" /><div><strong>Nothing to prepare.</strong><p>No brief, content or technical knowledge needed.</p></div></li><li><MessageCircle size={22} aria-hidden="true" /><div><strong>A practical next step.</strong><p>We’ll recommend where to start and explain what happens next.</p></div></li></ul><p className="local-direct-contact">Prefer to get in touch directly?<br /><a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a><br /><a href="tel:+353858302554">+353 85 830 2554</a></p></aside>
    </div>
  </div>;
}
