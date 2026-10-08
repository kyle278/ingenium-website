import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-intro">
          <Link href="/" className="site-brand" aria-label="Ingenium home"><Image src="/brand/ingenium-logo.png" width={1000} height={245} sizes="204px" className="site-brand-logo" alt="" /></Link>
          <p>Websites and CRM,<br />built around your business.</p>
          <span>Carlow, Ireland. Working with businesses everywhere.</span>
        </div>
        <div><h2>Explore</h2><Link href="/websites">Websites</Link><Link href="/crm">CRM</Link><Link href="/connected">Website + CRM</Link><Link href="/ecommerce">Ecommerce</Link><Link href="/pricing">Pricing</Link></div>
        <div><h2>Company</h2><Link href="/projects">Our work</Link><Link href="/how-we-work">How we work</Link><Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/contact">Contact</Link><Link href="/support">Support</Link></div>
        <div><h2>Let’s talk</h2><a href="mailto:hello@ingeniumconsulting.net">hello@ingeniumconsulting.net</a><a href="tel:+353858302554">+353 85 830 2554</a><p>Tell us what needs<br />to work better.</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ingenium Digital Consulting</span><div><Link href="/security">Security</Link><Link href="/data-handling">Data handling</Link><Link href="/privacy">Privacy</Link><a href="#cookie-settings">Cookie settings</a></div></div>
    </footer>
  );
}
