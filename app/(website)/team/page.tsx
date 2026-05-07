import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { buildMetadata, pageSeo } from "@/lib/seo";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = buildMetadata(pageSeo["/team"]);

const teamMembers = [
  {
    name: "Kyle Redmond",
    role: "Founder and Developer",
    email: "kyle@ingeniumconsulting.net",
    category: "Leadership",
    initials: "KR",
    accent: "from-[rgba(0,87,191,0.18)] via-white to-[rgba(0,103,102,0.14)]",
    summary:
      "Kyle leads delivery architecture, product implementation, and the technical decisions that keep websites, CRM, and automation working as one operating system.",
    focus: ["Web architecture", "CRM implementation", "Automation design"],
  },
  {
    name: "Clayton Long",
    role: "Co-owner and Sales Lead",
    email: "clayton@ingeniumconsulting.net",
    category: "Sales",
    initials: "CL",
    accent: "from-[rgba(0,103,102,0.16)] via-white to-[rgba(0,87,191,0.10)]",
    summary:
      "Clayton owns commercial conversations, qualification, and sales process clarity so prospects understand the work, the rollout, and the right next step quickly.",
    focus: ["Sales discovery", "Commercial fit", "Buyer guidance"],
  },
  {
    name: "Sophie Coleman",
    role: "Graphic Designer",
    email: "sophie@ingeniumconsulting.net",
    category: "Design",
    initials: "SC",
    accent: "from-[rgba(24,28,31,0.08)] via-white to-[rgba(0,87,191,0.12)]",
    summary:
      "Sophie shapes the visual system across brand, layout, and presentation so the work feels polished, legible, and commercially credible from first impression onward.",
    focus: ["Brand design", "Page layouts", "Visual consistency"],
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-24 pb-4 md:space-y-32">
      <section className="pt-8">
        <ScrollReveal>
          <div className="max-w-4xl">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Meet the Team
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            The people building Ingenium with you.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            Ingenium stays intentionally small. That means strategy, sales, development, and design are handled by
            named people instead of being buried behind a generic agency structure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="cta-lift inline-flex items-center gap-2 rounded-[10px] bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-6 py-3 text-sm font-semibold text-white"
            >
              Talk to the Team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="cta-lift inline-flex items-center gap-2 rounded-[10px] border border-[var(--color-brand)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--color-brand)]"
            >
              Learn How We Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="space-y-10">
        <ScrollReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
              Our team
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-4xl">
              The people you will actually work with.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
              Clear roles, short context, and direct access to the people behind the work.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Leadership", "Sales", "Design"].map((tag, index) => (
              <span
                key={tag}
                className={`inline-flex rounded-full px-4 py-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] ${
                  index === 0
                    ? "bg-[var(--color-secondary)] text-white"
                    : "bg-[var(--color-panel-high)] text-[var(--color-text-soft)]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member, index) => (
          <ScrollReveal key={member.email} delayMs={index * 60} blur>
            <article
              className="mineral-panel panel-hover overflow-hidden rounded-[32px] p-0 shadow-[0_20px_60px_rgba(24,28,31,0.08)]"
            >
            <div className={`relative overflow-hidden bg-gradient-to-br ${member.accent} p-6`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_42%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="inline-flex rounded-full bg-white/80 px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-soft)]">
                  {member.category}
                </span>
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Ingenium Consulting
                </span>
              </div>
              <div className="relative mt-8 flex aspect-[4/5] items-end rounded-[26px] bg-[rgba(255,255,255,0.62)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-semibold tracking-[-0.06em] text-[var(--color-text)] shadow-[0_8px_24px_rgba(24,28,31,0.08)]">
                  {member.initials}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-[var(--color-brand)]">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{member.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {member.focus.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full bg-[var(--color-panel-low)] px-3 py-1.5 text-xs text-[var(--color-text-soft)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={`mailto:${member.email}`}
                className="cta-lift mt-6 inline-flex items-center gap-2 rounded-[10px] border border-[var(--color-brand)] bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--color-brand)]"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            </div>
            </article>
          </ScrollReveal>
        ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <ScrollReveal className="mineral-panel rounded-[32px] p-8">
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand)]">
            Why this matters
          </p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            You should know who is doing the work before you start the conversation.
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              "Founder-level technical oversight instead of outsourced execution.",
              "Clear commercial contact from the first sales conversation onward.",
              "Dedicated design ownership so the visual standard stays consistent.",
            ].map((point) => (
              <div key={point} className="rounded-2xl bg-[var(--color-panel-low)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {point}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="graphite-panel relative overflow-hidden rounded-[36px] p-10 md:p-14" delayMs={80} direction="left" blur>
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-35" />
          <div className="relative">
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-cyan-200">
              Start the conversation
            </p>
            <h2 className="mt-4 max-w-3xl font-[var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
              Want to speak with the team directly?
            </h2>
            <p className="mt-4 max-w-xl text-white/72">
              Book a strategy call and we will map your website, CRM, automation, and AI priorities with the right people in the room.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="cta-lift inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)]"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="cta-lift inline-flex items-center gap-2 rounded-[10px] border border-white/24 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                Learn How We Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
