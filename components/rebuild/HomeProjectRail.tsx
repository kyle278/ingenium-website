"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { EditorSection, EditorText } from "@/components/website-editor/Editable";
import { currentProjects } from "@/lib/current-projects";
import styles from "./home-project-rail.module.css";

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

export default function HomeProjectRail({ editorId }: { editorId: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const bleed = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const direction = useRef(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);

  useEffect(() => {
    const element = bleed.current;
    if (!element) return;
    const resize = new ResizeObserver(() => element.style.setProperty("--rail-width", `${document.documentElement.clientWidth}px`));
    resize.observe(document.documentElement);
    const observer = new IntersectionObserver(entries => { visible.current = entries.some(entry => entry.isIntersecting); });
    observer.observe(element);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const element = rail.current;
    if (!element || paused || hovered || focused || reducedMotion) return;
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (visible.current && !document.hidden) {
        const end = element.scrollWidth - element.clientWidth;
        position = Math.max(0, Math.min(end, position + elapsed * .035 * direction.current));
        element.scrollLeft = position;
        if (position >= end) direction.current = -1;
        if (position <= 0) direction.current = 1;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, hovered, focused, reducedMotion]);

  function move(step: number) {
    setPaused(true);
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector("li");
    const track = element.querySelector("ul");
    const gap = track ? Number.parseFloat(getComputedStyle(track).columnGap) || 0 : 0;
    element.scrollBy({ left: step * ((card?.getBoundingClientRect().width || element.clientWidth) + gap), behavior: reducedMotion ? "instant" : "smooth" });
  }

  return <EditorSection editorId={editorId} id="current-projects" className={`core-section ${styles.section}`} aria-labelledby="home-work-heading">
    <header className={styles.heading}>
      <h2 id="home-work-heading"><EditorText editorId={`${editorId}.heading`} tag="h2" value="Built for real Irish businesses." /></h2>
      <div className={styles.actions}>
        <Link href="/results#current-projects" className="rebuild-text-link">See all projects<ArrowUpRight size={17} aria-hidden="true" /></Link>
        <div className={styles.controls} aria-label="Project scrolling controls">
          <button type="button" aria-label="Previous projects" aria-controls="home-project-rail" onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
          {!reducedMotion && <button type="button" aria-label={paused ? "Resume automatic project scrolling" : "Pause automatic project scrolling"} aria-controls="home-project-rail" onClick={() => setPaused(value => !value)}>{paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}</button>}
          <button type="button" aria-label="Next projects" aria-controls="home-project-rail" onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </header>
    <div ref={bleed} className={styles.bleed}>
      <div ref={rail} id="home-project-rail" className={styles.rail} role="region" aria-label="Recent website projects. Scroll to explore." tabIndex={0}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onPointerDown={() => setPaused(true)} onWheel={event => { if (event.deltaX) setPaused(true); }}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
          if (event.key === "Home" || event.key === "End") { event.preventDefault(); setPaused(true); event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant" }); }
        }}>
        <ul className={styles.track}>
          {currentProjects.map(project => <li key={project.slug}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.card} aria-label={`Visit ${project.name} website (opens in a new tab)`}>
              <div className={styles.preview}><Image src={"image" in project ? project.image : `/project-previews/${project.slug}.webp`} alt={`Screenshot of the ${project.name} website`} width={1200} height={833} sizes="(max-width: 600px) 80vw, 380px" /></div>
              <div className={styles.caption}><div><h3>{project.name}</h3><p>{new URL(project.url).hostname.replace(/^www\./, "")}</p></div><ArrowUpRight size={18} aria-hidden="true" /></div>
            </a>
          </li>)}
        </ul>
      </div>
    </div>
    <p className={styles.hint}>Scroll or swipe to explore. Select a project to visit its website.</p>
  </EditorSection>;
}
