import Script from "next/script";

import { PORTAL_SITE_ID, PORTAL_TRACKING_ENDPOINT } from "@/lib/portalIntegration/public";

const trackerInitScript = `
(function () {
  var portalUrl = "https://portal.ingeniumconsulting.net";
  var siteId = "${PORTAL_SITE_ID}";

  function initTracker() {
    if (!window.IngeniumTracker || !siteId) return false;

    window.IngeniumTracker.init({
      endpoint: "${PORTAL_TRACKING_ENDPOINT}",
      siteId: siteId
    });

    return true;
  }

  if (!initTracker()) {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (initTracker() || attempts > 40) {
        window.clearInterval(timer);
      }
    }, 150);
  }
})();
`;

export default function IngeniumTracking() {
  if (!PORTAL_SITE_ID) return null;

  return (
    <>
      <Script
        src="https://portal.ingeniumconsulting.net/ingenium-tracker.js"
        strategy="afterInteractive"
      />
      <Script
        id="ingenium-tracker-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: trackerInitScript }}
      />
    </>
  );
}
