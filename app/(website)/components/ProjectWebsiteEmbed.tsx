"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ProjectWebsiteEmbedProps = {
  title: string;
  url: string;
};

type ExpandStyle = {
  top: number;
  left: number;
  width: number;
  height: number;
  transform: string;
};

export default function ProjectWebsiteEmbed({ title, url }: ProjectWebsiteEmbedProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandStyle, setExpandStyle] = useState<ExpandStyle | null>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState<number | null>(null);

  const beginExpand = useCallback(() => {
    if (isExpanding || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    setPlaceholderHeight(rect.height);
    setExpandStyle({
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
      width: rect.width,
      height: rect.height,
      transform: "translate(-50%, -50%) scale(1, 1)",
    });
    setIsExpanding(true);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = window.requestAnimationFrame(() => {
        const scaleX = window.innerWidth / rect.width;
        const scaleY = window.innerHeight / rect.height;

        setExpandStyle({
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
          width: rect.width,
          height: rect.height,
          transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
        });
      });
    });

    redirectTimeoutRef.current = window.setTimeout(() => {
      window.location.href = url;
    }, 3000);
  }, [isExpanding, url]);

  const handleIframeFocus = useCallback(() => {
    beginExpand();
  }, [beginExpand]);

  useEffect(() => {
    const handleWindowBlur = () => {
      if (!isPointerOver || isExpanding) return;
      if (document.activeElement === iframeRef.current) {
        beginExpand();
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [beginExpand, isExpanding, isPointerOver]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {isExpanding && placeholderHeight ? <div style={{ height: placeholderHeight }} aria-hidden="true" /> : null}

      <div
        ref={wrapperRef}
        onMouseEnter={() => setIsPointerOver(true)}
        onMouseLeave={() => setIsPointerOver(false)}
        className={`overflow-hidden border border-black/8 bg-white/72 ${
          isExpanding ? "fixed z-[100] rounded-none border-0 p-0 shadow-[0_30px_120px_rgba(20,36,61,0.24)]" : "rounded-[28px] p-3 md:p-4"
        }`}
        style={
          isExpanding && expandStyle
            ? {
                top: expandStyle.top,
                left: expandStyle.left,
                width: expandStyle.width,
                height: expandStyle.height,
                transform: expandStyle.transform,
                transformOrigin: "center center",
                transition:
                  "transform 3000ms cubic-bezier(0.22,1,0.36,1), border-radius 3000ms cubic-bezier(0.22,1,0.36,1), padding 3000ms cubic-bezier(0.22,1,0.36,1)",
              }
            : undefined
        }
      >
        <div className="relative h-full w-full">
          <iframe
            ref={iframeRef}
            src={url}
            title={title}
            onFocus={handleIframeFocus}
            className={`w-full bg-white ${
              isExpanding ? "h-full rounded-none border-0" : "h-[720px] rounded-[20px] border border-black/8"
            }`}
            loading="lazy"
          />

          {!isExpanding ? (
            <div className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-[rgba(20,36,61,0.82)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_rgba(20,36,61,0.18)]">
              Click inside preview to open site
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
              <div className="rounded-full bg-[rgba(20,36,61,0.82)] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_rgba(20,36,61,0.18)]">
                Opening live website
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
