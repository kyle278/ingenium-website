import { revalidatePath, revalidateTag } from "next/cache";
import { createSeoReceiver } from "@/lib/portalIntegration/seo-receiver";
import {
  readSeoRevision,
  seoConfiguration,
  SEO_CACHE_TAG,
} from "@/lib/portalIntegration/seo-runtime";
import { SITE_URL } from "@/lib/seo";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  const config = seoConfiguration(),
    secret = process.env.INGENIUM_SEO_SIGNING_SECRET?.trim();
  if (!config || !secret)
    return Response.json(
      { error: "SEO connection is not configured" },
      { status: 503 },
    );
  const receive = createSeoReceiver({
    portalOrigin:
      process.env.INGENIUM_SEO_PORTAL_ORIGIN ||
      "https://portal.ingeniumconsulting.net",
    siteKey: config.key,
    secret,
    snapshotBaseUrl: config.base,
    apply: async (release) => {
      const current = await readSeoRevision(true);
      if (
        !current ||
        current.id !== release.id ||
        current.revision !== release.revision
      )
        throw new Error("The publishing manifest does not serve this revision");
      revalidateTag(SEO_CACHE_TAG, { expire: 0 });
      revalidatePath("/", "layout");
      const response = await fetch(
          `${SITE_URL}/?__ingenium_seo_probe=${release.id}`,
          { cache: "no-store", signal: AbortSignal.timeout(25000) },
        ),
        html = await response.text();
      if (
        !response.ok ||
        !new RegExp(
          `<meta[^>]+name="ingenium-seo-revision"[^>]+content="${release.id}"`,
        ).test(html)
      )
        throw new Error("The live renderer has not served this revision");
      return { id: current.id, revision: current.revision };
    },
  });
  return receive(request);
}
