import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";

export const revalidate = 300;

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteStructuredData />
      <SiteNav />
      <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}
