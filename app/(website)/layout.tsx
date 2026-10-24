import { requestPath } from "@/lib/portalIntegration/seo-runtime";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import RouteStructuredData from "./components/RouteStructuredData";
import SiteMotion from "@/components/rebuild/SiteMotion";
import { EditorProvider } from "@/components/website-editor/EditorProvider";
import { getEditorRelease } from "@/lib/website-editor/server";
import { editorParentOrigins } from "@/lib/website-editor/connection";

export const revalidate = 300;

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const pathname=await requestPath();
  const release=await getEditorRelease();
  return (
    <EditorProvider snapshot={release.snapshot} parentOrigins={editorParentOrigins()}>
    <div className="site-shell">
      <meta name="ingenium-editor-release" content={release.releaseId} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteStructuredData pathname={pathname} />
      <SiteMotion />
      <SiteNav />
      <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
    </EditorProvider>
  );
}
