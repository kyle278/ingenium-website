import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/team"]);

const teamMembers = [
  {
    name: "Kyle Redmond",
    role: "Co-Owner / Technical Architect",
    email: "kyle@ingeniumconsulting.net",
    photoLabel: "Kyle Redmond photo placeholder",
  },
  {
    name: "Claytong Long",
    role: "Co-Owner / Sales Director",
    email: "clayton@ingeniumconsulting.net",
    photoLabel: "Claytong Long photo placeholder",
  },
  {
    name: "Sophie Coleman",
    role: "Lead Designer / Brand Manager",
    email: "sophie@ingeniumconsulting.net",
    photoLabel: "Sophie Coleman photo placeholder",
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="pt-8 text-center">
        <p className="font-(--font-mono) text-xs uppercase tracking-widest text-emerald-400">
          Meet the Team
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl font-(--font-display) text-4xl font-bold tracking-tight text-white sm:text-5xl">
          The team behind Ingenium delivery.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
          Strategy, technical architecture, and brand execution all sit in one senior team.
          Every engagement has direct leadership oversight.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.email}
            className="metric-card rounded-2xl border border-slate-800 bg-slate-900/55 p-6"
          >
            <div className="aspect-[4/5] rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/50 text-center">
                <p className="font-(--font-mono) text-xs uppercase tracking-widest text-slate-500">
                  {member.photoLabel}
                </p>
              </div>
            </div>

            <h2 className="mt-5 font-(--font-display) text-2xl font-semibold text-white">
              {member.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{member.role}</p>
            <a
              href={`mailto:${member.email}`}
              className="cta-lift mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:border-slate-600 hover:text-emerald-200"
            >
              <Mail className="h-4 w-4" />
              {member.email}
            </a>
          </article>
        ))}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-slate-900 p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-(--font-display) text-2xl font-bold text-white sm:text-3xl">
            Want to talk to the team directly?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Book a strategy call and we will map your website, CRM, automation, and AI priorities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="cta-lift inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              Learn How We Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
