import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import IngeniumTracking from "@/app/components/IngeniumTracking";
import { getPortalPublicConfigOrNull } from "@/lib/portalIntegration/config";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, buildMetadata, keywordClusters, pageSeo } from "@/lib/seo";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
  authors: [{ name: "Ingenium Digital Consulting" }],
  creator: "Ingenium Digital Consulting",
  publisher: "Ingenium Digital Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-slate-950 font-[var(--font-body)] text-slate-50 antialiased`}
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
