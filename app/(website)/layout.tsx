import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_-10%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(251,146,60,0.18),transparent_45%)]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-size:88px_88px] [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)]" />
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <SiteNav />
        </div>
        <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">{children}</main>
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
