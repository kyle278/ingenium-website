import Image from "next/image";
import { BatteryFull, Cable, Car, Clock, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Signal, Star, Tractor, Wifi, Zap } from "lucide-react";

type Kind = "electrician" | "barber";

/**
 * A phone showing an example one-page site. Each example is a different design, so
 * visitors see the site is built for their business, not a template with the name swapped.
 * All sizes inside the screen use container units, so the mockup scales with its slot.
 */
export default function PhoneMockup({ kind, priority = false, className = "" }: { kind: Kind; priority?: boolean; className?: string }) {
  return (
    <div className={`starter-phone ${className}`} aria-hidden="true">
      <div className="starter-phone-frame">
        <div className={`starter-phone-screen is-${kind}`}>
          <StatusBar dark={kind === "barber"} />
          {/* The site scrolls slowly down and back up inside the screen (CSS only, off for reduced motion). */}
          <div className="mock-scroll">
            {kind === "electrician" ? <ElectricianSite priority={priority} /> : <BarberSite priority={priority} />}
          </div>
          {kind === "electrician" && <div className="mock-elec-callbar"><Phone />085 123 4567</div>}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div className={`mock-status${dark ? " is-dark" : ""}`}>
      <span>9:41</span>
      <i className="mock-island" />
      <span className="mock-status-icons"><Signal /><Wifi /><BatteryFull /></span>
    </div>
  );
}

function ElectricianSite({ priority }: { priority: boolean }) {
  return (
    <div className="mock-elec">
      <div className="mock-elec-alert"><Zap />24/7 emergency call-outs</div>
      <header className="mock-elec-nav">
        <span className="mock-elec-logo"><b><Zap /></b>Walsh<em>Electric</em></span>
        <Menu />
      </header>
      <div className="mock-elec-photo">
        <Image src="/starter/example-electrician.webp" alt="" fill sizes="(min-width: 900px) 220px, 46vw" priority={priority} />
        <span className="mock-elec-badge"><ShieldCheck />Safe Electric registered</span>
      </div>
      <div className="mock-elec-body">
        <p className="mock-elec-area"><MapPin />Carlow · Kilkenny · Laois</p>
        <h4>Reliable electricians for homes and farms.</h4>
        <div className="mock-elec-actions">
          <span className="is-primary"><Phone />Call now</span>
          <span>Free quote</span>
        </div>
        <p className="mock-elec-reviews"><span>★★★★★</span>4.9 from 38 Google reviews</p>
        <div className="mock-elec-services">
          <span><Cable />Rewiring</span>
          <span><Zap />Fault finding</span>
          <span><Car />EV chargers</span>
          <span><Tractor />Farms &amp; sheds</span>
        </div>
        <div className="mock-elec-quote">
          <p>&ldquo;Turned up the same day, found the fault in ten minutes and left the place spotless.&rdquo;</p>
          <span>Siobhán, Bagenalstown</span>
        </div>
        <div className="mock-elec-form">
          <b>Get a free quote</b>
          <i>Your name</i>
          <i>Phone number</i>
          <i className="is-tall">What do you need done?</i>
          <span>Send request</span>
        </div>
        <p className="mock-elec-footer">Walsh Electric · RECI registered · Carlow</p>
      </div>
    </div>
  );
}

function BarberSite({ priority }: { priority: boolean }) {
  return (
    <div className="mock-barber">
      <div className="mock-barber-hero">
        <Image src="/starter/example-barber.webp" alt="" fill sizes="(min-width: 900px) 220px, 46vw" priority={priority} />
        <header className="mock-barber-nav"><span>BARROW<b>CUTS</b></span><Instagram /></header>
        <div className="mock-barber-copy">
          <small>Est. 2019 · Tullow St, Carlow</small>
          <h4>Sharp cuts.<br /><em>No waiting around.</em></h4>
          <span className="mock-barber-cta"><MessageCircle />Book on WhatsApp</span>
        </div>
      </div>
      <div className="mock-barber-menu">
        <p className="mock-barber-label">The menu</p>
        <ul>
          <li><span>Skin fade</span><i /><b>€20</b></li>
          <li><span>Cut &amp; beard</span><i /><b>€28</b></li>
          <li><span>Beard trim</span><i /><b>€12</b></li>
          <li><span>Kids&apos; cut</span><i /><b>€14</b></li>
        </ul>
        <p className="mock-barber-hours"><Clock />Tue–Sat 9–6 · Walk-ins before 4pm</p>
        <p className="mock-barber-stars"><Star /><Star /><Star /><Star /><Star /></p>
        <blockquote className="mock-barber-quote">&ldquo;Best fade in Carlow. In and out in twenty minutes.&rdquo;<span>Darragh M.</span></blockquote>
        <p className="mock-barber-label">Find us</p>
        <div className="mock-barber-map"><MapPin /><span>14 Tullow Street<br />Carlow R93</span></div>
        <span className="mock-barber-cta is-block"><MessageCircle />Book on WhatsApp</span>
        <p className="mock-barber-footer">BARROW CUTS · EST. 2019</p>
      </div>
    </div>
  );
}
