import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <div className="site-grid" />
      <div
        className="glow"
        style={{
          top: "-20%",
          left: "-10%",
          width: "520px",
          height: "520px",
          background: "rgba(15, 118, 110, 0.35)",
        }}
      />
      <div
        className="glow"
        style={{
          bottom: "-30%",
          right: "-10%",
          width: "620px",
          height: "620px",
          background: "rgba(224, 122, 47, 0.28)",
        }}
      />
      <div className="relative z-10">
        <div className="site-container pt-10">
          <SiteNav />
        </div>
        <main className="site-container py-16">{children}</main>
        <div className="site-container pb-16">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
