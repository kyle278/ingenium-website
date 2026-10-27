"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Motion enhances the reading order; server-rendered content is always visible. */
export default function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const progress = document.querySelector<HTMLElement>(".site-scroll-progress");
    let frame = 0;
    function update() {
      frame = 0;
      if (!progress) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = preference.matches || range <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / range));
      progress.style.transform = `scaleX(${ratio})`;
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const process = root.querySelector(".process-list");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && process) {
        process.classList.add("is-in-view");
        observer.disconnect();
      }
    }, { threshold: .2 });
    if (process) observer.observe(process);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [pathname]);
  return null;
}
