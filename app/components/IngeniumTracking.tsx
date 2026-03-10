"use client";

import Script from "next/script";
import { useCallback } from "react";

import { bootstrapIngeniumTracker } from "@/lib/portalIntegration/browserTracker";

type IngeniumTrackingProps = {
  portalAppUrl: string;
  siteId: string;
};

export default function IngeniumTracking({ portalAppUrl, siteId }: IngeniumTrackingProps) {
  const onScriptLoad = useCallback(() => {
    if (!portalAppUrl || !siteId) return;
    bootstrapIngeniumTracker({ portalAppUrl, siteId });
  }, [portalAppUrl, siteId]);

  if (!portalAppUrl || !siteId) return null;

  return (
    <Script
      src={`${portalAppUrl}/ingenium-tracker.js`}
      strategy="afterInteractive"
      onLoad={onScriptLoad}
    />
  );
}
