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
        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
          Meet the Team
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
          The team behind Ingenium delivery.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
          Strategy, technical architecture, and brand execution all sit in one senior team.
          Every engagement has direct leadership oversight.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.email}
            className="mineral-panel metric-card rounded-[28px] p-6"
          >
            <div className="aspect-[4/5] rounded-xl bg-[var(--color-panel-low)] p-4">
              <div className="ghost-outline flex h-full items-center justify-center rounded-lg bg-white/70 text-center">
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  {member.photoLabel}
                </p>
              </div>
            </div>

            <h2 className="mt-5 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
              {member.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-soft)]">{member.role}</p>
            <a
              href={`mailto:${member.email}`}
              className="cta-lift mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--color-panel-high)] px-4 py-2 text-sm font-medium text-[var(--color-brand)]"
            >
              <Mail className="h-4 w-4" />
              {member.email}
            </a>
          </article>
        ))}
      </section>

      <section className="graphite-panel relative overflow-hidden rounded-[36px] p-10 text-center md:p-14">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
            Want to talk to the team directly?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/72">
            Book a strategy call and we will map your website, CRM, automation, and AI priorities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)]"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="cta-lift inline-flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white"
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
