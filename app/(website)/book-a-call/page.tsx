import { packageRequestTime } from "@/lib/package-request-time";

import Link from "next/link";
import { EditorLink, EditorText } from "@/components/website-editor/Editable";
import { Clock3, MessageCircle, NotebookPen } from "lucide-react";
import LocalRequestForm from "@/components/rebuild/LocalRequestForm";
import BookingCalendar from "@/components/rebuild/BookingCalendar";
import { validService } from "@/lib/enquiry-contract";
import { getBusinessPackage } from "@/lib/business-packages";
import { buildMetadata, pageSeo } from "@/lib/seo";
export const metadata = buildMetadata(pageSeo["/book-a-call"]);
const packageCall = {
  "business-growth": {
    title: "Walk through one enquiry",
    prompt: "Bring one quote request that was slow to move and, if it helps, invite the person who handles intake. A brief description is enough. We’ll look at what came in, who saw it and who should take the next action.",
    detail: "If the package fits, the next step is a written scope covering the website, agreed workflow, allowances and price.",
    href: "/business-growth#enquiry-demo",
    link: "See an enquiry example first",
  },
  "starter-website": {
    title: "Check what fits on one page",
    prompt: "Tell us which services, photos and contact details customers need, and whether you have your text, images and domain access.",
    detail: "We’ll check the brief, the materials you’ll need and when the delivery target can start. We can discuss a link to your existing booking service.",
    href: "/starter-website#package-example",
    link: "See the one-page examples first",
  },
  "crm-automation": {
    title: "Talk through one handover",
    prompt: "Think of a quote or service renewal you want to handle differently. We’ll talk through who owns it today and which tools your team uses.",
    detail: "We’ll discuss what would be useful to test first and whether it’s worth scoping a change.",
    href: "/crm-automation#package-example",
    link: "See an acceptance example first",
  },
};
function calendarUrl() {
  try { const url = new URL(process.env.NEXT_PUBLIC_BOOKING_URL || ""); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export default async function BookCallPage({ searchParams }: { searchParams: Promise<{ service?: string; package?: string }> }) {
  const { service, package: packageId } = await searchParams;
  const selectedPackage = getBusinessPackage(packageId);
  const discussion = selectedPackage && packageCall[selectedPackage.id];
  const isCrm = selectedPackage?.id === "crm-automation";
  const calendar = calendarUrl();
  const initialNow = await packageRequestTime();
  return <div className="rebuild-page local-page call-page">
    <header className="call-page-heading">
      <p className="local-location">{selectedPackage?.name || <EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.e87875779ea2" tag="p" value="A useful first conversation" />}</p>
      <h1><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.f7d0980dce5c" tag="h1" identity={selectedPackage?.id || "general"} value={isCrm ? "Request a free CRM callback." : selectedPackage ? "Request a free callback." : "Book a free call."} /></h1>
      <p>{isCrm
        ? <EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.158e23fa8168" identity="crm-automation" tag="p" value="Leave your number and we’ll get in touch to arrange a free 15-minute call about one process your team wants to improve." />
        : <EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.158e23fa8168" tag="p" value="15 minutes to work out your next step. Leave your number and we’ll get in touch to confirm a time." />}</p>
    </header>
    {discussion && !isCrm && <details className="call-discussion">
      <summary>What we’ll cover · {discussion.title}</summary>
      <p>{discussion.prompt}</p>
      <p>{discussion.detail}</p>
      <Link href={discussion.href} className="rebuild-text-link">{discussion.link}</Link>
    </details>}
    <div className="call-page-layout"><div>{calendar && !selectedPackage && <BookingCalendar url={calendar} />}<LocalRequestForm key={`${selectedPackage?.id || "general"}:${service || "not-sure"}`} kind="call" initialService={selectedPackage?.service || (validService(service) ? service : "not-sure")} initialPackage={selectedPackage?.id} initialNow={initialNow} /></div>
      <aside className="call-page-aside" aria-label="About your free call">
        {isCrm && discussion ? <div className="crm-callback-agenda">
          <h2>What we’ll cover</h2>
          <p>{discussion.prompt}</p>
          <p>{discussion.detail}</p>
          <Link href={discussion.href} className="rebuild-text-link">{discussion.link}</Link>
        </div> : <><h2><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.170edfc38887" tag="h2" value={"A little clarity goes a long way."} /></h2><ul className="local-call-benefits"><li><Clock3 size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.9ca3cf5da9cd" tag="strong" value={"Just 15 minutes."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.cb211f513728" tag="p" value={"Enough to understand where you’re getting stuck."} /></p></div></li><li><NotebookPen size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.81edb16358d6" tag="strong" value={"Nothing to prepare."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.2802658323cc" tag="p" value={"No brief, content or technical knowledge needed."} /></p></div></li><li><MessageCircle size={22} aria-hidden="true" /><div><strong><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.cc2ff4f17e33" tag="strong" value={"A practical next step."} /></strong><p><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.bf3b73788a2a" tag="p" value={"We’ll recommend where to start and explain what happens next."} /></p></div></li></ul></>}
        <p className="local-direct-contact"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.1a6edbd626e4" tag="p" value={"Prefer to get in touch directly?"} /><br /><EditorLink editorId="rebuild.app.website.book.a.call.page.tsx.link.5028377b0834" href="mailto:hello@ingeniumconsulting.net"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.2378971e6ce4" tag="a" value={"hello@ingeniumconsulting.net"} /></EditorLink><br /><EditorLink editorId="rebuild.app.website.book.a.call.page.tsx.link.3b643bb96a78" href="tel:+353858302554"><EditorText editorId="rebuild.app.website.book.a.call.page.tsx.text.c61fde38ea3b" tag="a" value={"+353 85 830 2554"} /></EditorLink></p>
      </aside>
    </div>
  </div>;
}
