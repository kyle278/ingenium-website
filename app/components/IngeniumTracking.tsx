"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

import { bootstrapIngeniumTracker } from "@/lib/portalIntegration/browserTracker";

type IngeniumTrackingProps = {
  portalAppUrl: string;
  siteId: string;
};

export default function IngeniumTracking({ portalAppUrl, siteId }: IngeniumTrackingProps) {
  const hasBootstrappedRef = useRef(false);

  const bootstrapTracker = useCallback((force = false) => {
    if (!portalAppUrl || !siteId || (hasBootstrappedRef.current && !force)) {
      return;
    }

    bootstrapIngeniumTracker({ portalAppUrl, siteId });
    hasBootstrappedRef.current = true;
  }, [portalAppUrl, siteId]);

  const onScriptLoad = useCallback(() => {
    bootstrapTracker(true);
  }, [bootstrapTracker]);

  useEffect(() => {
    bootstrapTracker();
  }, [bootstrapTracker]);

  if (!portalAppUrl || !siteId) return null;

  return (
    <Script
      src={`${portalAppUrl}/ingenium-tracker.js`}
      strategy="afterInteractive"
      onLoad={onScriptLoad}
      onError={() => bootstrapTracker()}
    />
  );
}
