import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import LocalBusinessHero from "@/components/rebuild/LocalBusinessHero";
import CurrentProjects from "@/components/rebuild/CurrentProjects";
import { CallLink, LocalFaq, NextStep, SimpleSteps } from "@/components/rebuild/LocalBusinessSections";
import { HomeServiceRoutes, HomeStartingPoints, HomeTeam, HomeWork } from "@/components/rebuild/HomeStory";
import EnquiryJourney from "@/components/rebuild/EnquiryJourney";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/"]);
export default function HomePage() {
  return <div className="brand-home"><LocalBusinessHero />
    <section className="brand-section" aria-labelledby="routes-heading" id="two-routes"><div className="brand-section-heading"><div><p className="brand-eyebrow">Start where you need us</p><h2 id="routes-heading">A stronger first impression.<br />A better follow-through.</h2></div><p>Some businesses need a new website. Others need a clearer way to handle the enquiries they already receive. We can help with either, or build them together.</p></div><HomeServiceRoutes /></section>
    <section className="brand-section brand-connection" id="connection" aria-labelledby="connection-heading"><div className="brand-connection-copy"><p className="brand-eyebrow">The connection matters</p><h2 id="connection-heading">The form is the start.<br />What happens next?</h2><p>A customer has looked through your services and decided to get in touch. Your team should be able to see what they asked for and who needs to respond.</p><p>We agree what the form collects, where the details belong and how your team takes the next step. Explore an example of that journey.</p><Link href="/leads-to-jobs" className="rebuild-text-link">Explore websites and CRM together<ArrowUpRight size={17} aria-hidden="true" /></Link><span className="brand-small-note">Connections and automated actions are agreed in your project scope.</span></div><EnquiryJourney /></section>
    <CurrentProjects home />
    <HomeWork />
    <HomeTeam />
    <section className="brand-section brand-process" aria-labelledby="process-heading"><div className="brand-section-heading"><div><p className="brand-eyebrow">A process you can follow</p><h2 id="process-heading">We do the building.<br />You stay in the picture.</h2></div><div><p>Clear responsibilities, work you can review, and a handover your team can use.</p><Link href="/how-it-works" className="rebuild-text-link">How we work<ArrowUpRight size={17} aria-hidden="true" /></Link></div></div><SimpleSteps /><p className="brand-small-note">You bring accurate business details, relevant assets and feedback. We agree the scope, responsibilities and timing before work begins.</p></section>
    <HomeStartingPoints />
    <section className="brand-section brand-visibility"><Search size={30} aria-hidden="true" /><div><h2>Not sure what customers find today?</h2><p>Request a free Google Visibility Check. We’ll review your business, service and town, then email practical next steps.</p></div><Link href="/visibility-check" className="rebuild-button-secondary">Get my free visibility check<ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    <LocalFaq /><NextStep title="Let’s make your next enquiry easier to take forward." body="Tell us what needs to work better. We’ll help you find the right scope, from a focused website to a connected customer journey." /><div className="local-mobile-call"><CallLink>Book a free call</CallLink></div>
  </div>;
}
