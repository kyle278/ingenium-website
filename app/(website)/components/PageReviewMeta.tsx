import { LAST_REVIEWED_DISPLAY, REVIEW_CADENCE, REVIEW_OWNER } from "@/lib/review";

export default function PageReviewMeta({
  label = "Last reviewed",
}: {
  label?: string;
}) {
  return (
    <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-[var(--color-line)] bg-white/80 px-4 py-2 text-xs text-[var(--color-text-muted)]">
      <span className="font-[var(--font-mono)] uppercase tracking-[0.18em] text-[var(--color-brand)]">{label}</span>
      <span>{LAST_REVIEWED_DISPLAY}</span>
      <span>Owner: {REVIEW_OWNER}</span>
      <span>{REVIEW_CADENCE} review cadence</span>
    </div>
  );
}
