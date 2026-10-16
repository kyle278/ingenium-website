import { requestPath } from "@/lib/portalIntegration/seo-runtime";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";
import SiteMotion from "@/components/rebuild/SiteMotion";

export const revalidate = 300;

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const pathname=await requestPath();
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteStructuredData pathname={pathname} />
      <SiteMotion />
      <SiteNav />
      <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}
