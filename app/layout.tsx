import type { Metadata } from "next";
import { Azeret_Mono, Manrope, Public_Sans } from "next/font/google";
import Script from "next/script";

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

const GTM_ID = "GTM-KWCQSXC7";
const gtmInitScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {gtmInitScript}
        </Script>
        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <IngeniumTracking />
        {children}
      </body>
    </html>
  );
}
