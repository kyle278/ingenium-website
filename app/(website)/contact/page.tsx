import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";

const expectations = [
  "We respond within 1 business day",
  "Strategy call includes conversion roadmap",
  "Security review available on request",
];

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition hover:bg-emerald-800";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white";
const card = "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const cardSoft =
  "rounded-3xl border border-emerald-200/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-900";

export default function ContactPage() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start">
        <div className="space-y-6">
          <div className={chip}>Contact</div>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-tight tracking-tight">
            Book a Website Strategy Call.
          </h1>
          <p className="text-lg text-slate-600">
            Tell us about your website goals and we will map the conversion plan, timeline, and rollout.
          </p>
          <div className="grid gap-3 text-sm text-slate-600">
            {expectations.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={cardSoft + " space-y-4"}>
          <div className="text-xs text-slate-500">Contact form</div>
          <form className="space-y-4">
            <div className="grid gap-3">
              <input
                className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm"
                placeholder="Full name"
                type="text"
              />
              <input
                className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm"
                placeholder="Work email"
                type="email"
              />
              <input
                className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm"
                placeholder="Company"
                type="text"
              />
              <input
                className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm"
                placeholder="Role"
                type="text"
              />
              <textarea
                className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm min-h-[120px]"
                placeholder="Tell us about your goals"
              />
            </div>
            <button type="button" className={primaryButton + " w-full"}>
              Submit request
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-slate-500">
              Prefer email? Reach us at <span className="text-emerald-700">hello@ingeniumconsulting.net</span>.
            </p>
          </form>
        </div>
      </section>

      <section className={card + " p-8"}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <Mail className="h-5 w-5 text-emerald-700" />
            <div className="text-lg font-semibold">Email</div>
            <p className="text-sm text-slate-600">hello@ingeniumconsulting.net</p>
          </div>
          <div className="space-y-3">
            <PhoneCall className="h-5 w-5 text-emerald-700" />
            <div className="text-lg font-semibold">Availability</div>
            <p className="text-sm text-slate-600">Mon-Fri · 9am-6pm</p>
          </div>
          <div className="space-y-3">
            <MapPin className="h-5 w-5 text-emerald-700" />
            <div className="text-lg font-semibold">Global presence</div>
            <p className="text-sm text-slate-600">US + EU delivery teams</p>
          </div>
        </div>
      </section>

      <section className={cardSoft + " p-10 text-center space-y-4"}>
        <div className={chip}>Next steps</div>
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight">
          Want a deeper walkthrough?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We can share a full website roadmap, platform overview, and security packet.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/case-studies" className={secondaryButton}>
            View case studies
          </Link>
          <Link href="/security" className={primaryButton}>
            Request security packet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
