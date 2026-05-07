import type { Metadata } from "next";
import { Azeret_Mono, Manrope, Public_Sans } from "next/font/google";

import IngeniumTracking from "@/app/components/IngeniumTracking";
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

const manropeDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const publicSansBody = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
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
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
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
  return (
    <html lang="en">
      <body
        className={`${manropeDisplay.variable} ${publicSansBody.variable} ${azeretMono.variable} min-h-screen bg-[var(--color-bg)] font-[var(--font-body)] text-[var(--color-text)] antialiased`}
      >
        <IngeniumTracking />
        {children}
      </body>
    </html>
  );
}
