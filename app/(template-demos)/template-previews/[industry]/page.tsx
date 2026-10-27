import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./preview.css";

const examples = {
  cleaning: { brand: "Clear & Co.", label: "Cleaning", eyebrow: "A fresh start for your space", title: "A cleaner space. A clearer day.", text: "Thoughtful cleaning for homes and workplaces. A simple service, built around your routine.", services: ["Home cleaning", "Office cleaning", "Deep cleaning"], note: "A fresh approach to everyday spaces.", accent: "#246b74", surface: "#e3eeeb", object: "Your space, refreshed." },
  landscaping: { brand: "Evergreen Studio", label: "Landscaping", eyebrow: "Room to grow", title: "Make more of your outdoors.", text: "Gardens designed for the way you live. From the first idea to the finishing touches, create a space that feels like yours.", services: ["Garden design", "Planting & landscaping", "Seasonal care"], note: "Good things start in the garden.", accent: "#38513c", surface: "#e7e8d8", object: "Outside, at home." },
  carpentry: { brand: "Grain Workshop", label: "Carpentry", eyebrow: "Made with purpose", title: "Built to fit. Made to last.", text: "Considered carpentry for the spaces you call home. Bespoke storage, furniture and joinery with care in every detail.", services: ["Fitted furniture", "Bespoke storage", "Interior joinery"], note: "Every room has room for something better.", accent: "#754b31", surface: "#eee3d5", object: "Details make the difference." },
} as const;

export const metadata: Metadata = { title: "Website demo mockup | Ingenium", robots: { index: false, follow: false } };
export function generateStaticParams() { return Object.keys(examples).map(industry => ({ industry })); }

export default async function TemplatePreview({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  if (!Object.hasOwn(examples, industry)) notFound();
  const example = examples[industry as keyof typeof examples];
  return <div className={`demo-site demo-${industry}`} style={{ "--demo-accent": example.accent, "--demo-surface": example.surface } as React.CSSProperties}>
    <div className="demo-banner">Demo mockup · {example.label} <Link href="/projects#templates" target="_top">Back to Ingenium ↗</Link></div>
    <header className="demo-nav"><a href="#" className="demo-brand">{example.brand}</a><nav aria-label="Example website"><a href="#services">Our services</a><a href="#approach">Our approach</a><a href="#services" className="demo-nav-cta">Explore services ↗</a></nav></header>
    <main><section className="demo-hero"><div className="demo-hero-copy"><p className="demo-eyebrow">{example.eyebrow}</p><h1>{example.title}</h1><p className="demo-lead">{example.text}</p><a href="#services" className="demo-button">Find your service <span>↗</span></a><p className="demo-hero-note">{example.note}</p></div>
      <div className="demo-art"><svg viewBox="0 0 560 580" role="img" aria-label={industry === "landscaping" ? "Illustration of a landscaped garden and home" : industry === "carpentry" ? "Illustration of bespoke shelving and handcrafted furniture" : "Illustration of a bright, tidy home"}>
        <rect width="560" height="580" fill="var(--demo-surface)" />
        {industry === "landscaping" ? <>
          <circle cx="430" cy="115" r="55" fill="#f7f0cf" /><path d="M0 390Q160 310 310 385T560 340V580H0Z" fill="#b3bd9b" /><path d="M0 470Q170 355 340 455T560 430V580H0Z" fill="#6b805e" />
          <rect x="175" y="212" width="230" height="170" fill="#f7f2e7" /><path d="M145 215L290 110L435 215Z" fill="#455448" /><rect x="215" y="265" width="65" height="117" fill="#b7c8c1" /><rect x="310" y="255" width="56" height="65" fill="#b7c8c1" />
          <path d="M260 580L285 382H317L370 580" fill="#d8d2ba" />{[75, 475].map(x => <g key={x}><rect x={x} y="275" width="13" height="170" fill="#7e7050" /><ellipse cx={x + 7} cy="252" rx="58" ry="100" fill="#38513c" /></g>)}
          <g fill="#dedcaa"><circle cx="130" cy="470" r="11" /><circle cx="432" cy="490" r="13" /><circle cx="455" cy="460" r="9" /></g>
        </> : industry === "carpentry" ? <>
          <rect x="42" y="64" width="476" height="423" fill="#d4b99b" /><rect x="64" y="86" width="432" height="379" fill="#f5eadb" />
          {[210, 355].map(y => <rect key={y} x="64" y={y} width="432" height="17" fill="#9a7150" />)}<rect x="273" y="86" width="15" height="380" fill="#9a7150" />
          <g fill="#a98561"><rect x="88" y="142" width="29" height="68" /><rect x="125" y="125" width="18" height="85" /><rect x="151" y="150" width="38" height="60" /><rect x="313" y="280" width="120" height="75" rx="8" /></g>
          <ellipse cx="385" cy="187" rx="32" ry="24" fill="#754b31" /><path d="M385 170Q350 98 368 102Q390 130 385 170M385 170Q435 108 426 108Q390 112 385 170" fill="#6a7750" />
          <path d="M0 487H560V580H0Z" fill="#c3a689" /><rect x="142" y="435" width="276" height="27" rx="8" fill="#754b31" /><path d="M162 461L148 560M396 461L410 560" stroke="#754b31" strokeWidth="15" />
        </> : <>
          <rect x="50" y="54" width="460" height="430" fill="#f5f4eb" /><rect x="80" y="88" width="180" height="215" fill="#b4d2d1" /><path d="M170 88V303M80 196H260" stroke="#f5f4eb" strokeWidth="12" /><circle cx="215" cy="133" r="24" fill="#f7edc9" />
          <path d="M0 484H560V580H0Z" fill="#c5d5cf" /><rect x="130" y="363" width="315" height="110" rx="22" fill="#718f83" /><rect x="145" y="324" width="130" height="110" rx="20" fill="#8ca99d" /><rect x="290" y="324" width="138" height="110" rx="20" fill="#8ca99d" />
          <rect x="160" y="469" width="16" height="25" fill="#536653" /><rect x="401" y="469" width="16" height="25" fill="#536653" /><ellipse cx="295" cy="512" rx="160" ry="23" fill="#a9bfb3" />
          <path d="M440 300V175M440 250Q385 180 410 170Q450 175 440 250M440 240Q495 170 478 161Q443 163 440 240" stroke="#64856b" strokeWidth="7" fill="#64856b" /><path d="M412 286H468L460 342H420Z" fill="#c2a984" /><path d="M319 117L325 133L341 139L325 145L319 162L313 145L297 139L313 133Z" fill="#246b74" />
        </>}
      </svg><div className="demo-art-caption"><span>{example.object}</span><span>01 / 03</span></div></div>
    </section>
    <section className="demo-services" id="services"><div><p className="demo-eyebrow">What we do</p><h2>A little care goes a long way.</h2></div><div className="demo-service-grid">{example.services.map((service, i) => <article key={service}><span>0{i + 1}</span><h3>{service}</h3><p>A service shaped around your space, your needs and your everyday life.</p></article>)}</div></section>
    <section className="demo-approach" id="approach"><p className="demo-eyebrow">Our approach</p><h2>Thoughtful from the start.</h2><p>Clear communication. Careful planning. A finished space that works for you.</p></section></main>
    <footer className="demo-footer">{example.brand}<p>Illustrative website mockup by Ingenium. This is a fictional business for demonstration.</p><Link href="/projects#templates" target="_top">Explore more website templates ↗</Link></footer>
  </div>;
}
