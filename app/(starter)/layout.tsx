import Image from "next/image";

import { ORGANIZATION_EMAIL, ORGANIZATION_NAME, ORGANIZATION_PHONE } from "@/lib/seo";

import "./starter.css";

// Campaign landing pages: no menu and no outbound links, so the form stays the one action.
export default function StarterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="starter-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="starter-header">
        <div className="starter-container">
          <Image src="/brand/ingenium-logo.png" alt="Ingenium" width={1000} height={245} sizes="180px" className="starter-logo" priority />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="starter-footer">
        <div className="starter-container">
          <Image src="/brand/ingenium-logo.png" alt="Ingenium" width={1000} height={245} sizes="150px" className="starter-footer-logo" />
          <p>{ORGANIZATION_NAME}, Carlow</p>
          <p>
            <a href={`mailto:${ORGANIZATION_EMAIL}`}>{ORGANIZATION_EMAIL}</a>
            <a href={`tel:${ORGANIZATION_PHONE.replace(/\s/g, "")}`}>{ORGANIZATION_PHONE}</a>
          </p>
          <p>
            <a href="/privacy" target="_blank" rel="noopener">Privacy notice</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
