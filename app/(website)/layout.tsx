import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-20 md:py-28">{children}</main>
      <SiteFooter />
    </div>
  );
}
