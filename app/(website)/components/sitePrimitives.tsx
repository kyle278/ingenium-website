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
  "type-page-kicker text-[var(--color-secondary)]";

export const primaryButtonClass =
  "cta-lift type-action inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-white shadow-[0_12px_28px_rgba(20,36,61,0.12)]";

export const secondaryButtonClass =
  "cta-lift type-action inline-flex items-center justify-center rounded-[10px] border border-[var(--color-brand)] bg-transparent px-5 py-3 text-[var(--color-brand)]";

export const tertiaryButtonClass =
  "type-action inline-flex items-center justify-center text-[var(--color-brand)] hover:underline";

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
      <h2 className="mt-4 type-section-title text-[var(--color-text)]">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-[64ch] type-body-lead text-[var(--color-text-soft)]">
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
      className={`${dark ? "graphite-panel text-white" : "mineral-panel"} rounded-[18px] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function MonoTag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`tech-pill type-detail-kicker inline-flex rounded-full px-3 py-1 text-[var(--color-text-soft)] ${className}`.trim()}
    >
      {children}
    </span>
  );
}
