"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";

import type { CtaPosition, LeadRoute } from "@/lib/starter-website";
import QualifyDialog from "./QualifyDialog";
import { trackStarter } from "./track";

const SUBMITTED_KEY = "ingenium-starter-submitted";
const noSubscribe = () => () => {};
function readSubmitted() { try { return Boolean(sessionStorage.getItem(SUBMITTED_KEY)); } catch { return false; } }

type StarterContextValue = {
  submitted: boolean;
  formOpen: boolean;
  openForm: (position: CtaPosition, opener: HTMLElement | null) => void;
};

const StarterContext = createContext<StarterContextValue | null>(null);

export function useStarter() {
  const value = useContext(StarterContext);
  if (!value) throw new Error("useStarter must be used inside StarterProvider");
  return value;
}

export default function StarterProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<CtaPosition>("hero");
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const [justSubmitted, setSubmitted] = useState(false);
  // Remembers a submission for this tab so the same person isn't asked twice.
  const storedSubmitted = useSyncExternalStore(noSubscribe, readSubmitted, () => false);
  const submitted = justSubmitted || storedSubmitted;

  const openForm = useCallback((from: CtaPosition, element: HTMLElement | null) => {
    setPosition(from);
    setOpener(element);
    setOpen(true);
    trackStarter("starter_cta_click", { cta_position: from });
    trackStarter("starter_form_open", { cta_position: from });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Buttons may be disabled after a submission, so fall back to the page heading.
    requestAnimationFrame(() => {
      if (opener && !(opener as HTMLButtonElement).disabled && opener.isConnected) opener.focus();
      else document.querySelector<HTMLElement>("#starter-hero-heading")?.focus();
    });
  }, [opener]);

  const onSubmitted = useCallback((route: LeadRoute) => {
    setSubmitted(true);
    try { sessionStorage.setItem(SUBMITTED_KEY, route); } catch { /* Storage unavailable. */ }
  }, []);

  const value = useMemo(() => ({ submitted, formOpen: open, openForm }), [submitted, open, openForm]);

  return (
    <StarterContext.Provider value={value}>
      {children}
      <QualifyDialog open={open} position={position} onClose={close} onSubmitted={onSubmitted} />
    </StarterContext.Provider>
  );
}
