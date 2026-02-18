"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type ElementTag = "span" | "p" | "div";

interface AnimatedMetricProps {
  value: string | number;
  className?: string;
  as?: ElementTag;
  durationMs?: number;
  delayMs?: number;
}

interface NumberToken {
  start: number;
  end: number;
  raw: string;
  target: number;
  decimals: number;
  hasComma: boolean;
}

const numberPattern = /-?\d{1,3}(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?/g;

function parseTokens(text: string): NumberToken[] {
  const matches = Array.from(text.matchAll(numberPattern));

  return matches
    .map((match) => {
      const raw = match[0];
      const start = match.index;

      if (typeof start !== "number") {
        return null;
      }

      const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
      const hasComma = raw.includes(",");
      const target = Number.parseFloat(raw.replace(/,/g, ""));

      if (Number.isNaN(target)) {
        return null;
      }

      return {
        start,
        end: start + raw.length,
        raw,
        target,
        decimals,
        hasComma,
      };
    })
    .filter((token): token is NumberToken => Boolean(token));
}

function formatToken(token: NumberToken, progress: number) {
  if (progress >= 1) {
    return token.raw;
  }

  const current = token.target * progress;
  const rounded =
    token.decimals > 0
      ? Number(current.toFixed(token.decimals))
      : Math.round(current);

  if (token.hasComma) {
    return rounded.toLocaleString("en-US", {
      minimumFractionDigits: token.decimals,
      maximumFractionDigits: token.decimals,
    });
  }

  if (token.decimals > 0) {
    return rounded.toFixed(token.decimals);
  }

  return String(rounded);
}

function buildDisplayValue(text: string, tokens: NumberToken[], progress: number) {
  if (tokens.length === 0) {
    return text;
  }

  let cursor = 0;
  let output = "";

  tokens.forEach((token) => {
    output += text.slice(cursor, token.start);
    output += formatToken(token, progress);
    cursor = token.end;
  });

  output += text.slice(cursor);
  return output;
}

export default function AnimatedMetric({
  value,
  className,
  as = "span",
  durationMs = 900,
  delayMs = 0,
}: AnimatedMetricProps) {
  const textValue = String(value);
  const tokens = useMemo(() => parseTokens(textValue), [textValue]);
  const ref = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (tokens.length === 0) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const rafId = window.requestAnimationFrame(() => {
        setProgress(1);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [tokens.length]);

  useEffect(() => {
    if (!hasEntered || tokens.length === 0) {
      return;
    }

    let rafId = 0;
    const startAt = performance.now() + delayMs;

    const tick = (timestamp: number) => {
      if (timestamp < startAt) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const elapsed = timestamp - startAt;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [delayMs, durationMs, hasEntered, tokens.length]);

  const displayValue = useMemo(
    () => buildDisplayValue(textValue, tokens, progress),
    [progress, textValue, tokens],
  );

  if (as === "p") {
    return (
      <p ref={ref as RefObject<HTMLParagraphElement>} className={className}>
        {displayValue}
      </p>
    );
  }

  if (as === "div") {
    return (
      <div ref={ref as RefObject<HTMLDivElement>} className={className}>
        {displayValue}
      </div>
    );
  }

  return (
    <span ref={ref as RefObject<HTMLSpanElement>} className={className}>
      {displayValue}
    </span>
  );
}
