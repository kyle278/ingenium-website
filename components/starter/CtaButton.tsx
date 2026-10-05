"use client";

import { ArrowRight } from "lucide-react";

import { CTA_LABEL, type CtaPosition } from "@/lib/starter-website";
import { useStarter } from "./StarterProvider";

export default function CtaButton({ position, label = CTA_LABEL, id, className = "" }: { position: CtaPosition; label?: string; id?: string; className?: string }) {
  const { submitted, openForm } = useStarter();
  if (submitted) {
    return <button id={id} type="button" className={`rebuild-button starter-cta ${className}`} disabled>Thanks, we&apos;ll be in touch</button>;
  }
  return (
    <button id={id} type="button" className={`rebuild-button starter-cta ${className}`} aria-haspopup="dialog" onClick={(event) => openForm(position, event.currentTarget)}>
      {label}
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
