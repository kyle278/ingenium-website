import { packageRequestTime } from "@/lib/package-request-time";

import { EditorLink, EditorText } from "@/components/website-editor/Editable";
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
  const initialNow = await packageRequestTime();
  return <div className="rebuild-page local-page call-page">
    <header className="call-page-heading">
      <p className="local-location">{selectedPackage?.name || <EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.e87875779ea2" tag="p" value="A useful first conversation" />}</p>
      <h1><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.f7d0980dce5c" tag="h1" identity={selectedPackage?.id || "general"} value={selectedPackage ? "Request a free callback." : "Book a free call."} /></h1>
      <p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.158e23fa8168" tag="p" value="15 minutes to work out your next step. Leave your number and we’ll get in touch to confirm a time." /></p>
    </header>
    <div className="call-page-layout"><div>{calendar && !selectedPackage && <BookingCalendar url={calendar} />}<LocalRequestForm key={`${selectedPackage?.id || "general"}:${service || "not-sure"}`} kind="call" initialService={selectedPackage?.service || (validService(service) ? service : "not-sure")} initialPackage={selectedPackage?.id} initialNow={initialNow} /></div>
      <aside className="call-page-aside" aria-label="About your free call"><h2><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.170edfc38887" tag="h2" value={"A little clarity goes a long way."} /></h2><ul className="local-call-benefits"><li><Clock3 size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.9ca3cf5da9cd" tag="strong" value={"Just 15 minutes."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.cb211f513728" tag="p" value={"Enough to understand where you’re getting stuck."} /></p></div></li><li><NotebookPen size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.81edb16358d6" tag="strong" value={"Nothing to prepare."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.2802658323cc" tag="p" value={"No brief, content or technical knowledge needed."} /></p></div></li><li><MessageCircle size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.cc2ff4f17e33" tag="strong" value={"A practical next step."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.bf3b73788a2a" tag="p" value={"We’ll recommend where to start and explain what happens next."} /></p></div></li></ul><p className="local-direct-contact"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.1a6edbd626e4" tag="p" value={"Prefer to get in touch directly?"} /><br /><EditorLink editorId="rebuild.app.website.book.a.call.page.tsx.link.5028377b0834" href="mailto:hello@ingeniumconsulting.net"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.2378971e6ce4" tag="a" value={"hello@ingeniumconsulting.net"} /></EditorLink><br /><EditorLink editorId="rebuild.app.website.book.a.call.page.tsx.link.3b643bb96a78" href="tel:+353858302554"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.c61fde38ea3b" tag="a" value={"+353 85 830 2554"} /></EditorLink></p></aside>
    </div>
  </div>;
}
