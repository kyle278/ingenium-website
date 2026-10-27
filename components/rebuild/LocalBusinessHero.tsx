import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";
import HeroSystem from "./HeroSystem";
import { CallLink } from "./LocalBusinessSections";

export default function LocalBusinessHero() {
  return <>
    <section className="brand-hero" aria-labelledby="home-heading">
      <div className="brand-hero-copy"><p className="brand-eyebrow">Websites, CRM &amp; connected systems</p>
        <h1 id="home-heading">A better website.<br />A clearer next step.</h1>
        <p className="brand-hero-lead">Help customers choose your business. Give your team a clear way to take the conversation forward.</p>
        <p className="brand-hero-description">We design and build websites, organise customer records and connect the follow-up. Start with the part you need, or bring them together.</p>
        <div className="brand-hero-actions"><CallLink /><Link href="#connection" className="rebuild-text-link">See how it connects<ArrowDown size={17} aria-hidden="true" /></Link></div>
        <p className="brand-hero-location">From Carlow, Ireland. Built around your business.</p>
      </div>
      <HeroSystem />
    </section>
    <div className="brand-principles"><p>Clear thinking.<br /><strong>From the first conversation.</strong></p><span><Check size={17} aria-hidden="true" />Design and technical delivery together</span><span><Check size={17} aria-hidden="true" />Agreed scope and costs</span><span><Check size={17} aria-hidden="true" />A practical handover</span></div>
  </>;
}
