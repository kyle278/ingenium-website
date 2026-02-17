"use client";

import { useEffect } from "react";

function isEditorMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get("portal_editor") === "1";
}

export default function PortalEditorBridge() {
  useEffect(() => {
    if (!isEditorMode()) {
      return;
    }

    window.parent.postMessage({ type: "portal-content-editor-ready" }, "*");

    const clickHandler = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const editableNode = target.closest<HTMLElement>(
        "[data-content-block-key][data-page-key][data-section-key]",
      );

      if (!editableNode) {
        return;
      }

      const blockKey = editableNode.dataset.contentBlockKey;
      const pageKey = editableNode.dataset.pageKey;
      const sectionKey = editableNode.dataset.sectionKey;

      if (!blockKey || !pageKey || !sectionKey) {
        return;
      }

      window.parent.postMessage(
        {
          type: "portal-content-block-selected",
          blockKey,
          pageKey,
          sectionKey,
        },
        "*",
      );
    };

    window.addEventListener("click", clickHandler, true);

    return () => {
      window.removeEventListener("click", clickHandler, true);
    };
  }, []);

  return null;
}
