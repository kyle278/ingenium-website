import type { Metadata } from "next";
import { BadgeCheck, CheckCircle2, Globe, MapPin, PenLine, Plus, RefreshCw, Search, Smartphone, XCircle, FileSignature, Send } from "lucide-react";

import CtaButton from "@/components/starter/CtaButton";
import PhoneMockup from "@/components/starter/PhoneMockup";
import PriceBlock, { PriceDetails, PriceHeadline } from "@/components/starter/PriceBlock";
import StarterProvider from "@/components/starter/StarterProvider";
import StickyBar from "@/components/starter/StickyBar";
import VideoSlot from "@/components/starter/VideoSlot";
import { ORGANIZATION_ADDRESS, ORGANIZATION_EMAIL, ORGANIZATION_NAME, ORGANIZATION_PHONE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { EXAMPLE_SITES, FOUNDING_PLACES_LEFT, FOUNDING_PLACES_TOTAL, PRICE, STARTER_PATH } from "@/lib/starter-website";

const TITLE = "Starter Website for Carlow & Kilkenny Businesses | Ingenium";
const DESCRIPTION = "Your business website, written for you and live in 5 working days. €495 + €50/month, domain and hosting included. Based in Carlow.";
const URL = `${SITE_URL}${STARTER_PATH}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, locale: "en_IE", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: ORGANIZATION_NAME,
  url: SITE_URL,
  email: ORGANIZATION_EMAIL,
  telephone: ORGANIZATION_PHONE,
  address: { "@type": "PostalAddress", ...ORGANIZATION_ADDRESS },
  areaServed: ["Carlow", "Kilkenny"],
};

const trust = [
  { icon: MapPin, text: "Based in Carlow" },
  { icon: PenLine, text: "Written for you" },
  { icon: FileSignature, text: "No contract" },
  { icon: Globe, text: "Domain in your name" },
];

const tiles = [
  { icon: PenLine, title: "We write it", line: "One 20-minute call and we write every word. You approve it." },
  { icon: Smartphone, title: "Built for phones", line: "A clean one-page site that looks right on any screen." },
  { icon: Search, title: "Found on Google and AI tools", line: "Set up so Google, Bing and AI assistants like ChatGPT and Claude can find and understand your business." },
  { icon: Send, title: "Enquiries straight to you", line: "A contact form, tap-to-call and a WhatsApp button." },
  { icon: Globe, title: "Your domain, your name", line: "We register it in your name and renew it while you're with us." },
  { icon: RefreshCw, title: "Changes every month", line: "Up to 30 minutes of small changes a month. Just send a message." },
];

const steps = [
  { when: "Day 0", title: "20-minute call", body: "We ask about your business; that's all the content we need." },
  { when: "Days 1–3", title: "We write and build it", body: "You get a preview link." },
  { when: "Days 4–5", title: "You approve, it goes live", body: "One round of changes, then it's live and on Google." },
];

const included = [
  "Every word written for you",
  "A one-page site built for phones",
  "Google Search Console and Bing set up",
  "Business details AI assistants like ChatGPT and Claude can read",
  "Linked to your Google Business Profile",
  "Contact form, tap-to-call and WhatsApp button",
  "Domain registered in your name",
  "Hosting and SSL certificate",
  "Backups and a monthly check",
  "One round of changes before launch",
  "Launch checks on phone and desktop",
  "Up to 30 minutes of changes a month",
];

const faqs = [
  { q: "Do I own my website and domain?", a: "The domain is registered in your name from day one. If you leave, it stays yours, and we'll give you a copy of your site's content." },
  { q: "What does the €50 a month cover?", a: "Hosting, security, backups, your domain renewal, a monthly check that everything works, and up to 30 minutes of small changes." },
  { q: "Is there a contract?", a: "No. Cancel any time with 30 days' notice." },
  { q: "What if I don't have photos?", a: "We'll use good licensed stock photos, and you can swap in your own later as part of your monthly changes." },
  { q: "Will this get me more customers?", a: "It makes you easier to find, trust and contact. We can't promise a number of calls, and nobody honestly can." },
  { q: "Can I add more pages later?", a: "Yes. We'll quote for extra pages, or move you to the full Websites package." },
  { q: "Do you charge VAT?", a: "No VAT is charged at the moment." },
  { q: "Why is it cheaper than your standard websites?", a: "It's one page, written from a single call, using our proven layout. That's how we can build it in 5 days for less." },
];

export default function StarterWebsitePage() {
  return (
    <StarterProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />

      {/* 2. Hero */}
      <section className="starter-hero starter-container" aria-labelledby="starter-hero-heading">
        <div className="starter-hero-copy">
          <p className="rebuild-kicker">STARTER WEBSITE · CARLOW &amp; KILKENNY</p>
          <h1 id="starter-hero-heading" tabIndex={-1}>Your business website, written for you and live in 5 working days.</h1>
          <p className="starter-hero-sub">Tell us about your business in a 20-minute call. We write it, build it and keep it running, so you can get back to work.</p>
          <PriceHeadline />
          <div className="starter-hero-action">
            <CtaButton position="hero" id="starter-hero-cta" />
            <p className="starter-hero-note">Takes 30 seconds. No payment needed.</p>
          </div>
          <PriceDetails />
        </div>
        <div className="starter-hero-media">
          <VideoSlot />
        </div>
      </section>

      {/* 3. Trust strip */}
      <section className="starter-container" aria-label="Why local businesses choose us">
        <ul className="starter-trust">
          {trust.map(({ icon: Icon, text }) => <li key={text}><Icon size={18} aria-hidden="true" />{text}</li>)}
        </ul>
      </section>

      {/* 4. The problem */}
      <section className="starter-section starter-container starter-problem" aria-labelledby="starter-problem-heading">
        <div>
          <h2 id="starter-problem-heading" className="starter-h2">Customers look you up before they ring.</h2>
          <p className="starter-body">Most people search for a business before they call. If they find nothing, or just a Facebook page, many move on to the next name. A simple website makes you easy to find, easy to trust and easy to contact.</p>
        </div>
        <div className="starter-search" aria-hidden="true">
          <div className="starter-search-bar"><Search size={16} />electrician near me</div>
          <div className="starter-search-result is-missing">
            <span className="starter-search-name">Your Business</span>
            <span className="starter-search-meta"><XCircle size={14} />No website</span>
          </div>
          <div className="starter-search-result is-found">
            <span className="starter-search-name">Walsh Electric</span>
            <span className="starter-search-url">walshelectric.ie</span>
            <span className="starter-search-meta"><CheckCircle2 size={14} />Website · Call · Directions</span>
          </div>
        </div>
      </section>

      {/* 5. What you get */}
      <section className="starter-section starter-container" aria-labelledby="starter-get-heading">
        <h2 id="starter-get-heading" className="starter-h2">What you get.</h2>
        <div className="starter-tiles">
          {tiles.map(({ icon: Icon, title, line }) => (
            <article key={title} className="starter-tile">
              <Icon size={22} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{line}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. How it works */}
      <section className="starter-section starter-container" aria-labelledby="starter-how-heading">
        <h2 id="starter-how-heading" className="starter-h2">How it works.</h2>
        <ol className="starter-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="starter-step-dot" aria-hidden="true">{index + 1}</span>
              <span className="starter-step-when">{step.when}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="starter-small">5 working days from your call, as long as you approve the preview within 1 working day.</p>
        <div className="starter-center"><CtaButton position="how-it-works" /></div>
      </section>

      {/* 7. Example sites */}
      <section className="starter-section starter-container" aria-labelledby="starter-examples-heading">
        <h2 id="starter-examples-heading" className="starter-h2">See what you&apos;d get.</h2>
        <div className="starter-examples">
          {EXAMPLE_SITES.map((site) => {
            const inner = (<><PhoneMockup kind={site.kind} /><span className="starter-example-label">{site.label}</span></>);
            return site.href ? (
              <a key={site.kind} href={site.href} target="_blank" rel="noopener" className="starter-example">
                {inner}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <div key={site.kind} className="starter-example">{inner}</div>
            );
          })}
        </div>
      </section>

      {/* 8. Price and what's included */}
      <section className="starter-section starter-container starter-pricing" aria-labelledby="starter-price-heading">
        <div>
          <h2 id="starter-price-heading" className="starter-h2">One price. Everything included.</h2>
          <PriceBlock />
          <CtaButton position="pricing" />
        </div>
        <div>
          <ul className="starter-included">
            {included.map((item) => <li key={item}><BadgeCheck size={18} aria-hidden="true" />{item}</li>)}
          </ul>
          <p className="starter-small starter-not-included"><strong>What&apos;s not included:</strong> online shops, bookings systems, extra pages. We&apos;ll point you to the right package if you need those.</p>
        </div>
      </section>

      {/* 9. Two promises */}
      <section className="starter-section starter-container" aria-labelledby="starter-promises-heading">
        <h2 id="starter-promises-heading" className="sr-only">Our two promises</h2>
        <div className="starter-promises">
          <article>
            <CheckCircle2 size={26} aria-hidden="true" />
            <h3>See it before you pay the balance.</h3>
            <p>You pay {PRICE.deposit} to book. The other {PRICE.balance} is due only when you&apos;ve seen the site and approved it.</p>
          </article>
          <article>
            <CheckCircle2 size={26} aria-hidden="true" />
            <h3>Live in 5 working days, or your first month is free.</h3>
            <p>Counted from your 20-minute call.</p>
          </article>
        </div>
      </section>

      {/* 10. Is it right for you? */}
      <section className="starter-section starter-container" aria-labelledby="starter-fit-heading">
        <h2 id="starter-fit-heading" className="starter-h2">Is it right for you?</h2>
        <div className="starter-fit">
          <div>
            <h3>A great fit if you:</h3>
            <ul>
              <li><CheckCircle2 size={18} aria-hidden="true" />Run a local business or are about to launch one</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />Need a professional page that explains what you do and gets you calls</li>
              <li><CheckCircle2 size={18} aria-hidden="true" />Don&apos;t have time to write a website yourself</li>
            </ul>
          </div>
          <div>
            <h3>Not the right fit if you need:</h3>
            <ul className="is-not">
              <li><XCircle size={18} aria-hidden="true" />An online shop or payments</li>
              <li><XCircle size={18} aria-hidden="true" />A booking system</li>
              <li><XCircle size={18} aria-hidden="true" />Lots of pages</li>
            </ul>
            <a className="rebuild-text-link" href="/pricing" target="_blank" rel="noopener">See our full Websites package<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </section>

      {/* 11. Questions */}
      <section className="starter-section starter-container starter-faq-wrap" aria-labelledby="starter-faq-heading">
        <h2 id="starter-faq-heading" className="starter-h2">Questions.</h2>
        <div className="rebuild-faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}<Plus size={18} aria-hidden="true" /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 12. Final call to action */}
      <section id="starter-final" className="starter-final" aria-labelledby="starter-final-heading">
        <div className="starter-container">
          <h2 id="starter-final-heading" className="starter-h2">Get your business online this month.</h2>
          {FOUNDING_PLACES_LEFT > 0 && <p>{FOUNDING_PLACES_LEFT} of {FOUNDING_PLACES_TOTAL} Founding Client places left, with the first 2 months of the plan free.</p>}
          <CtaButton position="final" />
        </div>
      </section>

      <StickyBar />
    </StarterProvider>
  );
}
