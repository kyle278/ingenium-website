import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-intro">
          <Link href="/" className="site-brand" aria-label="Ingenium home"><Image src="/brand/ingenium-logo.png" width={1000} height={245} sizes="204px" className="site-brand-logo" alt="" /></Link>
          <p>Websites and CRM.<br />A clearer way forward.</p>
          <span>Based in Carlow, Ireland.</span>
        </div>
        <div><h2>Find your next step</h2><Link href="/packages">Two routes</Link><Link href="/phone-ringing-website">I need a website</Link><Link href="/never-miss-a-lead">I need better follow-up</Link><Link href="/leads-to-jobs">I need both</Link><Link href="/visibility-check">Free visibility check</Link></div>
        <div><h2>Get to know us</h2><Link href="/results">Our work & examples</Link><Link href="/how-it-works">How it works</Link><Link href="/about">About & team</Link><Link href="/blog">Blog</Link><Link href="/ecommerce">Ecommerce</Link><Link href="/support">Support</Link></div>
        <div><h2>Let’s talk</h2><a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a><a href="tel:+353858302554">+353 85 830 2554</a><Link href="/book-a-call">Book a free 15-minute call ↗</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ingenium Digital Consulting</span><div><Link href="/security">Security</Link><Link href="/data-handling">Data handling</Link><Link href="/privacy">Privacy</Link><a href="#cookie-settings">Cookie settings</a></div></div>
    </footer>
  );
}
