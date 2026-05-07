import { ButtonLink, SectionIntro, SurfaceCard } from "./sitePrimitives";

type PolicySection = {
  title: string;
  body: string;
  items?: string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  updatedLabel: string;
  sections: PolicySection[];
};

export default function PolicyPage({ eyebrow, title, summary, updatedLabel, sections }: PolicyPageProps) {
  return (
    <div className="space-y-16 pb-8 md:space-y-20">
      <section className="pt-4">
        <div className="max-w-4xl">
          <p className="type-page-kicker text-[var(--color-secondary)]">
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl type-page-title text-[var(--color-text)]">
            {title}
          </h1>
          <p className="mt-6 max-w-[68ch] type-body-lead text-[var(--color-text-soft)]">
            {summary}
          </p>
          <p className="mt-5 type-meta-kicker text-[var(--color-text-muted)]">
            {updatedLabel}
          </p>
        </div>
      </section>

      <section className="grid gap-5">
        {sections.map((section) => (
          <SurfaceCard key={section.title} className="p-6 md:p-8">
            <h2 className="type-card-title text-[var(--color-text)]">
              {section.title}
            </h2>
            <p className="mt-4 max-w-[68ch] type-body-base text-[var(--color-text-soft)]">
              {section.body}
            </p>
            {section.items ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </SurfaceCard>
        ))}
      </section>

      <section>
        <SectionIntro
          eyebrow="Questions"
          title="Use the contact route for policy, support, or review questions."
          body="These pages describe Ingenium's current public operating position. Client-specific agreements, scopes, and data terms may add more detail."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink action={{ label: "Contact Us", href: "/contact" }} />
          <ButtonLink action={{ label: "Security Review", href: "/security-review" }} variant="secondary" />
        </div>
      </section>
    </div>
  );
}
