"use client";

import { useEffect, useState } from "react";

import { PRICE } from "@/lib/starter-website";
import CtaButton from "./CtaButton";
import { useStarter } from "./StarterProvider";

/** Phone-only bar: appears once the hero button scrolls away, hides while the final band is visible. */
export default function StickyBar() {
  const { submitted } = useStarter();
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("starter-hero-cta");
    const finalBand = document.getElementById("starter-final");
    if (!hero || !finalBand) return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    const finalObserver = new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting));
    heroObserver.observe(hero);
    finalObserver.observe(finalBand);
    return () => { heroObserver.disconnect(); finalObserver.disconnect(); };
  }, []);

  const visible = heroGone && !finalVisible && !submitted;
  return (
    <div className={`starter-sticky${visible ? " is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <p><strong>{PRICE.setup}</strong> + {PRICE.monthly}/month</p>
      <CtaButton position="sticky" label="Check if I qualify" />
    </div>
  );
}
