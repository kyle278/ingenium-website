import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

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
  title: "Enterprise Web Design Agency | Ingenium",
  description:
    "Ingenium is the enterprise web design agency that builds conversion systems - website, CRM, AI agents, and automation - to grow your pipeline.",
  openGraph: {
    title: "Enterprise Web Design Agency | Ingenium",
    description:
      "Ingenium builds conversion systems - website, CRM, AI agents, and automation - to grow your pipeline.",
    type: "website",
    siteName: "Ingenium",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-slate-950 font-[var(--font-body)] text-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
