"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { STARTER_PATH } from "@/lib/starter-website";
import { trackStarter } from "./track";

export default function OfferLink({ placement, className, children }: { placement: "home-strip" | "home-hero" | "services" | "websites"; className?: string; children: ReactNode }) {
  return <Link href={STARTER_PATH} className={className} onClick={() => trackStarter("starter_offer_click", { cta_position: placement })}>{children}</Link>;
}
