import Link from "next/link";

type ActionLink = {
  label: string;
  href: string;
};

type ButtonLinkProps = {
  action: ActionLink;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
};

export const sectionEyebrowClass =
  "font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-brand)]";

export const primaryButtonClass =
  "cta-lift inline-flex items-center justify-center rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(22,32,51,0.12)]";

export const secondaryButtonClass =
  "cta-lift inline-flex items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-text)]";

export const tertiaryButtonClass =
  "inline-flex items-center justify-center text-sm font-semibold text-[var(--color-brand)]";

export function ButtonLink({ action, variant = "primary", className = "" }: ButtonLinkProps) {
  const baseClass =
    variant === "secondary"
      ? secondaryButtonClass
      : variant === "tertiary"
        ? tertiaryButtonClass
        : primaryButtonClass;

  return (
    <Link href={action.href} className={`${baseClass} ${className}`.trim()}>
      {action.label}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={sectionEyebrowClass}>{eyebrow}</p>
      <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function SurfaceCard({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "graphite-panel text-white" : "mineral-panel"} rounded-[28px] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function MonoTag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`tech-pill inline-flex rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-soft)] ${className}`.trim()}
    >
      {children}
    </span>
  );
}
