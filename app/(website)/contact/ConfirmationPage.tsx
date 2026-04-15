import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type ConfirmationPageProps = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
};

export default function ConfirmationPage({
  title,
  body,
  primaryLabel,
  primaryHref,
}: ConfirmationPageProps) {
  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <section className="pt-10">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-[var(--color-line)] bg-white/80 px-8 py-12 text-center shadow-[0_22px_55px_rgba(22,32,51,0.06)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,87,191,0.10)]">
            <CheckCircle2 className="h-7 w-7 text-[var(--color-brand)]" />
          </div>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text)] sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-soft)]">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primaryHref}
              className="cta-lift inline-flex items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white"
            >
              {primaryLabel}
            </Link>
            <Link
              href="/"
              className="cta-lift inline-flex items-center justify-center rounded-md bg-[var(--color-panel-high)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
