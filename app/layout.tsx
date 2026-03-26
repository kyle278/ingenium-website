import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import IngeniumTracking from "@/app/components/IngeniumTracking";
import { getPortalPublicConfigOrNull } from "@/lib/portalIntegration/config";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ingeniumconsulting.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ingenium",
  title: "Ingenium Revenue Platform | Acquisition, CRM, AI, and Automation",
  description:
    "Ingenium connects acquisition, CRM execution, AI agents, and automation into one governed revenue platform for ambitious teams.",
  keywords: [
    "revenue platform",
    "CRM implementation",
    "AI agents",
    "revenue automation",
    "website strategy",
    "RevOps",
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
  openGraph: {
    title: "Ingenium Revenue Platform | Acquisition, CRM, AI, and Automation",
    description:
      "One governed revenue platform for acquisition, CRM execution, AI agents, automation, and measurable growth.",
    type: "website",
    siteName: "Ingenium",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingenium Revenue Platform | Acquisition, CRM, AI, and Automation",
    description:
      "One governed revenue platform for acquisition, CRM execution, AI agents, automation, and measurable growth.",
  },
  alternates: { canonical: "/" },
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
