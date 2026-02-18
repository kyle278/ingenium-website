"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  offsetPx?: number;
  direction?: "up" | "left" | "right";
  blur?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  durationMs = 500,
  offsetPx = 16,
  direction = "up",
  blur = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (visible) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      data-revealed={visible ? "true" : "false"}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : direction === "left"
            ? `translate3d(-${offsetPx}px, 0, 0)`
            : direction === "right"
              ? `translate3d(${offsetPx}px, 0, 0)`
              : `translate3d(0, ${offsetPx}px, 0)`,
        filter: blur && !visible ? "blur(4px)" : "blur(0px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
