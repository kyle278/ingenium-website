"use client";
import { useEffect } from "react";
import { analyticsAllowed, trackPortalEvent } from "@/lib/enquiry-client";
export default function BlogAnalytics({
  postId,
  revisionId,
}: {
  postId: string;
  revisionId: string;
}) {
  useEffect(() => {
    let viewed = false;
    const milestones = new Set<number>();
    const properties = { blog_post_id: postId, blog_revision_id: revisionId };
    function view() {
      if (!viewed && analyticsAllowed()) {
        trackPortalEvent("blog_article_view", properties);
        viewed = true;
      }
    }
    function scroll() {
      if (!analyticsAllowed()) return;
      const article = document.querySelector<HTMLElement>(
        "article[data-blog-post]",
      );
      if (!article) return;
      const top = article.getBoundingClientRect().top + window.scrollY;
      const depth = Math.min(
        100,
        Math.max(
          0,
          ((window.scrollY + innerHeight - top) / article.offsetHeight) * 100,
        ),
      );
      for (const value of [25, 50, 75, 100])
        if (depth >= value && !milestones.has(value)) {
          milestones.add(value);
          trackPortalEvent("blog_article_scroll", {
            ...properties,
            scroll_depth: String(value),
          });
        }
    }
    function click(event: MouseEvent) {
      const target = event.target;
      if (target instanceof Element && target.closest(".blog-cta a"))
        trackPortalEvent("blog_cta_click", {
          ...properties,
          cta_position: "article",
        });
    }
    view();
    window.addEventListener("ingenium-consent-change", view);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("ingenium-consent-change", view);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("click", click);
    };
  }, [postId, revisionId]);
  return null;
}
