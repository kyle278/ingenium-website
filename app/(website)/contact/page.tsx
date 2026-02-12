import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

const expectations = [
  "We respond within 1 business day",
  "Strategy call includes conversion roadmap",
  "Security review available on request",
];

export default function ContactPage() {
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start">
        <div className="space-y-6">
          <div className="chip">Contact</div>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            Book a Website Strategy Call.
          </h1>
          <p className="text-lg text-muted">
            Tell us about your website goals and we will map the conversion plan, timeline, and rollout.
          </p>
          <div className="grid gap-3 text-sm text-muted">
            {expectations.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6 space-y-4">
          <div className="text-xs text-muted">Contact form</div>
          <form className="space-y-4">
            <div className="grid gap-3">
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Full name"
                type="text"
              />
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Work email"
                type="email"
              />
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Company"
                type="text"
              />
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Role"
                type="text"
              />
              <textarea
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm min-h-[120px]"
                placeholder="Tell us about your goals"
              />
            </div>
            <button type="button" className="btn-primary w-full text-sm">
              Submit request
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted">
              Prefer email? Reach us at <span className="text-[var(--accent)]">hello@ingeniumconsulting.net</span>.
            </p>
          </form>
        </div>
      </section>

      <section className="card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <Mail className="h-5 w-5 text-[var(--accent)]" />
            <div className="text-lg section-title">Email</div>
            <p className="text-sm text-muted">hello@ingeniumconsulting.net</p>
          </div>
          <div className="space-y-3">
            <PhoneCall className="h-5 w-5 text-[var(--accent)]" />
            <div className="text-lg section-title">Availability</div>
            <p className="text-sm text-muted">Mon-Fri · 9am-6pm</p>
          </div>
          <div className="space-y-3">
            <MapPin className="h-5 w-5 text-[var(--accent)]" />
            <div className="text-lg section-title">Global presence</div>
            <p className="text-sm text-muted">US + EU delivery teams</p>
          </div>
        </div>
      </section>

      <section className="card-soft p-10 text-center space-y-4">
        <div className="chip">Next steps</div>
        <h2 className="section-title text-3xl md:text-4xl">
          Want a deeper walkthrough?
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          We can share a full website roadmap, platform overview, and security packet.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/case-studies" className="btn-secondary text-sm">
            View case studies
          </Link>
          <Link href="/security" className="btn-primary text-sm">
            Request security packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
