import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Ingenium Digital Consulting",
  description: "Enterprise websites, AI agents, CRM, and automation built to convert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${manrope.variable} min-h-screen bg-[#f7f2ea] text-slate-900 antialiased font-[var(--font-body)]`}
      >
        {children}
      </body>
    </html>
  );
}
