import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import IngeniumTracking from "@/app/components/IngeniumTracking";
import { getPortalPublicConfigOrNull } from "@/lib/portalIntegration/config";
import {
  DEFAULT_DESCRIPTION,
  ORGANIZATION_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  buildMetadata,
  keywordClusters,
  pageSeo,
} from "@/lib/seo";

import "./globals.css";

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata(pageSeo["/"]),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  keywords: [
    ...keywordClusters.platform,
    ...keywordClusters.websites,
    ...keywordClusters.crm,
    ...keywordClusters.ai,
    ...keywordClusters.automation,
    ...keywordClusters.governance,
  ],
  authors: [{ name: ORGANIZATION_LEGAL_NAME }],
  creator: ORGANIZATION_LEGAL_NAME,
  publisher: ORGANIZATION_LEGAL_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const portalPublicConfig = getPortalPublicConfigOrNull();

  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${interBody.variable} ${ibmPlexMono.variable} min-h-screen bg-[var(--color-bg)] font-[var(--font-body)] text-[var(--color-text)] antialiased`}
      >
        {portalPublicConfig ? (
          <IngeniumTracking
            portalAppUrl={portalPublicConfig.portalAppUrl}
            siteId={portalPublicConfig.siteId}
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
