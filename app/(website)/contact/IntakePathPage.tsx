import { ButtonLink, SectionIntro, SurfaceCard } from "../components/sitePrimitives";
import ContactForm from "./ContactForm";
import type { IntakePathConfig } from "./pathContent";

type IntakePathPageProps = {
  config: IntakePathConfig;
  formName: string;
  formSlug: string;
};

export default function IntakePathPage({ config, formName, formSlug }: IntakePathPageProps) {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="grid items-start gap-8 pt-4 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]">
            {config.title}
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl">
            {config.hero}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">{config.summary}</p>
          <div className="mt-8 grid gap-3">
            {config.facts.map((fact) => (
              <div key={fact} className="rounded-2xl border border-[var(--color-line)] bg-white/72 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {fact}
              </div>
            ))}
          </div>
        </div>

        <SurfaceCard className="p-6 sm:p-8">
          <SectionIntro
            eyebrow="Start here"
            title={config.title}
            body={config.outcome}
          />

          <div className="mt-6 rounded-2xl bg-[var(--color-panel-low)] px-4 py-4 text-sm text-[var(--color-text-soft)]">
            {config.nextStep}
          </div>

          <div className="mt-6">
            <ContactForm
              formName={formName}
              formSlug={formSlug}
              intent={config.intent}
              submitLabel={config.ctaLabel}
              successRedirect={config.confirmationPath}
            />
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SectionIntro
          eyebrow="FAQ"
          title="What buyers usually need to know first."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {config.faq.map((item) => (
            <SurfaceCard key={item.question} className="p-6">
              <p className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {item.question}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.answer}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="graphite-panel rounded-[36px] px-8 py-12 text-center md:px-12">
        <h2 className="mx-auto max-w-4xl font-[var(--font-display)] text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          Need a different entry point first?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink action={{ label: "Book Demo", href: "/demo" }} className="bg-white text-[var(--color-text)]" />
          <ButtonLink action={{ label: "Revenue Systems Teardown", href: "/revenue-systems-teardown" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
          <ButtonLink action={{ label: "Technical Review", href: "/technical-review" }} variant="secondary" className="border-white/18 bg-white/8 text-white" />
        </div>
      </section>
    </div>
  );
}
