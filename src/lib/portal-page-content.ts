import { getSectionContentBlockKey } from "@/src/lib/content-map";
import {
  createPageContentResolver,
  getPublishedBlocks,
  type NormalizedWebsiteContentBlock,
} from "@/src/lib/portal-content";

export async function loadPortalPageContent(pageKey: string) {
  let blocks: NormalizedWebsiteContentBlock[] = [];

  try {
    blocks = await getPublishedBlocks();
  } catch (error) {
    console.error(`[portal-content] Failed to load content blocks for page "${pageKey}".`, error);
  }

  const resolver = createPageContentResolver(pageKey, blocks);

  function sectionJson<T>(sectionKey: string, fallback: T) {
    return resolver.json(sectionKey, getSectionContentBlockKey(pageKey, sectionKey), fallback);
  }

  function sectionAttrs(sectionKey: string) {
    return resolver.attrs(sectionKey, getSectionContentBlockKey(pageKey, sectionKey));
  }

  return {
    resolver,
    sectionJson,
    sectionAttrs,
  };
}
