import { ArrowUpRight, Check, Inbox, LayoutGrid, Lock } from "lucide-react";

const pipeline = [
  { label: "New", cards: 2, highlight: true },
  { label: "Contacted", cards: 2 },
  { label: "Proposal", cards: 1 },
  { label: "Won", cards: 1, won: true },
];

/** Decorative hero composition: a website, its enquiry form and a CRM pipeline. Structure only, no example data. */
export default function HeroSystem() {
  return <div className="hero-system" role="img" aria-label="A business website whose enquiry form feeds straight into a CRM pipeline, so new enquiries arrive ready for your team.">
    <div className="hs-grid" aria-hidden="true" />
    <div className="hs-glow" aria-hidden="true" />

    <div className="hs-site" aria-hidden="true">
      <div className="hs-site-bar"><i /><i /><i /><span className="hs-url"><Lock size={9} /> www.yourwebsite.com</span></div>
      <div className="hs-site-nav"><span className="hs-logo"><em /><b /></span><span className="hs-nav-links"><b /><b /><b /></span><span className="hs-nav-cta" /></div>
      <div className="hs-site-hero">
        <div className="hs-site-copy"><b className="hs-h" /><b className="hs-h hs-h-short" /><b className="hs-p" /><b className="hs-p hs-p-short" /><span className="hs-site-button">Get in touch <ArrowUpRight size={9} /></span></div>
        <div className="hs-site-art"><span className="hs-orb hs-orb-a" /><span className="hs-orb hs-orb-b" /><span className="hs-panel" /></div>
      </div>
      <div className="hs-site-features">{[0, 1, 2].map(i => <span key={i}><em /><b /><b /></span>)}</div>
    </div>

    <div className="hs-form" aria-hidden="true">
      <div className="hs-card-head"><span className="hs-icon hs-icon-brand"><Inbox size={11} /></span>Enquiry form</div>
      {["Name", "Email", "How can we help?"].map(label => <div className="hs-field" key={label}><span>{label}</span><b /></div>)}
      <span className="hs-submit">Send enquiry</span>
    </div>

    <svg className="hs-link" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 98 C 60 98, 40 4, 100 4" /></svg>

    <div className="hs-crm" aria-hidden="true">
      <div className="hs-card-head"><span className="hs-icon hs-icon-teal"><LayoutGrid size={11} /></span>CRM pipeline<span className="hs-synced"><i /> Synced</span></div>
      <div className="hs-columns">{pipeline.map(column => <div className="hs-column" key={column.label}>
        <span className="hs-column-label">{column.label}</span>
        {column.highlight && <div className="hs-deal hs-deal-new"><span className="hs-tag">Website</span><b /><b className="hs-short" /></div>}
        {Array.from({ length: column.cards }, (_, i) => <div className={`hs-deal${column.won ? " hs-deal-won" : ""}`} key={i}>{column.won && <Check size={9} />}<b /><b className="hs-short" /></div>)}
      </div>)}</div>
    </div>

    <div className="hs-chip" aria-hidden="true"><Check size={12} /> New enquiry added to your CRM</div>
  </div>;
}
