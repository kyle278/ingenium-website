import { Space_Grotesk, Work_Sans } from "next/font/google";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="light"
      className={`site-root ${displayFont.variable} ${bodyFont.variable} font-body`}
    >
      <div className="site-shell">
        <div className="site-grid" />
        <div
          className="site-glow"
          style={{
            top: "-24%",
            right: "-12%",
            width: "520px",
            height: "520px",
            background: "rgba(34, 211, 238, 0.35)",
          }}
        />

        <div className="relative z-10">
          <div className="site-container pt-8">
            <SiteNav />
          </div>
          <main className="site-container py-14">{children}</main>
          <div className="site-container pb-16">
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
