"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/mini";
import { inView, scroll } from "motion";

/** Progressive enhancement: server-rendered content is always visible without JS. */
export default function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controls: ReturnType<typeof animate>[] = [];
    const observers: (() => void)[] = [];
    const ease = [0.22, 1, 0.36, 1] as const;
    function reveal(element: Element, delay = 0, distance = 22) {
      if (preference.matches) return;
      controls.push(animate(element, { opacity: [0.15, 1], transform: [`translateY(${distance}px)`, "translateY(0px)"] }, { duration: 0.6, delay, ease }));
    }
    function stop() {
      observers.forEach(disconnect => disconnect());
      controls.forEach(control => control.cancel());
    }
    if (!preference.matches) {
      const progress = document.querySelector(".site-scroll-progress");
      if (progress) {
        const animation = animate(progress, { transform: ["scaleX(0)", "scaleX(1)"] }, { ease: "linear" });
        controls.push(animation);
        observers.push(scroll(animation));
      }
      // Keep the headline readable; the illustrated handoff is the signature moment.
      const hero = root.querySelector(".home-hero > div:first-child, .rebuild-hero");
      if (hero) controls.push(animate(hero, { transform: ["translateY(12px)", "translateY(0px)"] }, { duration: .55, ease }));
      const browser = root.querySelector(".example-browser");
      const record = root.querySelector(".hero-record");
      const connection = root.querySelector(".hero-connection");
      if (browser) controls.push(animate(browser, { opacity: [.25, 1], transform: ["translateY(22px) rotate(-5deg)", "translateY(0px) rotate(-2deg)"] }, { duration: .75, ease }));
      if (connection) reveal(connection, .3, -10);
      if (record) controls.push(animate(record, { opacity: [.1, 1], transform: ["translateY(18px) rotate(3deg)", "translateY(0px) rotate(1deg)"] }, { duration: .65, delay: .45, ease }));
      const groups = root.querySelectorAll(".service-options, .process-list, .home-pricing-grid, .rebuild-grid");
      groups.forEach(group => {
        observers.push(inView(group, () => {
          Array.from(group.children).forEach((child, index) => reveal(child, Math.min(index, 3) * .09));
        }, { amount: .12 }));
      });
      root.querySelectorAll(".section-heading-row, .workflow-section > div, .home-invitation, .rebuild-section > .rebuild-grid-two:not(.rebuild-grid), .rebuild-section > .rebuild-panel").forEach(section => {
        observers.push(inView(section, () => { reveal(section); }, { amount: .12 }));
      });
    }
    const onPreference = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", onPreference);
    return () => { stop(); preference.removeEventListener("change", onPreference); };
  }, [pathname]);
  return null;
}
