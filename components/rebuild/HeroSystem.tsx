"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, CheckCheck, Globe2, LayoutTemplate, Link2, Pause, Play, RotateCcw, Users } from "lucide-react";

const stages = [
  { label: "Your website", text: "Make the right first impression.", detail: "Clear services. Credible work. An easy way to get in touch." },
  { label: "The connection", text: "Give every enquiry a place to go.", detail: "The agreed form details arrive in your customer record." },
  { label: "Your next step", text: "Keep the conversation moving.", detail: "Your team can see the enquiry, its owner and the next action." },
];

export default function HeroSystem() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [transfer, setTransfer] = useState(0);
  function selectStage(index: number) {
    setPlaying(false);
    setPaused(false);
    setActive(index);
    if (index === 1) setTransfer(value => value + 1);
  }
  function sendExample() {
    setPaused(false);
    setActive(reduced ? 2 : 1);
    setTransfer(value => value + 1);
    setPlaying(!reduced);
  }
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(preference.matches); if (preference.matches) setPlaying(false); };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      if (active === stages.length - 1) setPlaying(false);
      else setActive(value => value + 1);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduced]);
  return <div className="connection-demo" data-stage={active} data-paused={paused}>
    <div className="connection-demo-heading"><span><Link2 aria-hidden="true" /> Built to work together</span><span>Example walkthrough</span></div>
    <div className="connection-scene">
      <div className="connection-architecture" aria-hidden="true"><span /><span /><span /></div>
      <div className="scene-coordinate scene-coordinate-top" aria-hidden="true">Website / First impression</div>
      <svg className="connection-route" viewBox="0 0 640 560" aria-hidden="true">
        <path className="connection-route-rail" d="M230 260 C230 348 560 280 560 350 S440 390 440 430" />
        <path className="connection-route-core" d="M230 260 C230 348 560 280 560 350 S440 390 440 430" />
        <g key={transfer} className="connection-packet"><rect x="-17" y="-12" width="34" height="24" rx="5" /><path d="m-11 -5 11 8 11-8" /></g>
      </svg>
      <div className="demo-website">
        <div className="demo-browser"><span className="demo-browser-dots" aria-hidden="true"><i /><i /><i /></span><span><Globe2 aria-hidden="true" /> yourbusiness.ie</span><ArrowUpRight aria-hidden="true" /></div>
        <div className="demo-website-nav"><strong><span aria-hidden="true" /> Your business</strong><span>Services <i /> Our work</span></div>
        <div className="demo-website-body"><div><span className="demo-mini-label">Built around you</span><h2>Good work.<br />Clearly shown.</h2><button type="button" className="demo-example-cta" aria-label="Try an example enquiry" onClick={sendExample}>{active === 0 ? "Try an enquiry" : "Try it again"}{active === 0 ? <ArrowUpRight aria-hidden="true" /> : <Check aria-hidden="true" />}</button></div><div className="demo-architecture-art" aria-hidden="true"><div /><div /><div /><span /></div></div>
        <div className="demo-website-footer"><Check aria-hidden="true" /> Your services, clearly explained.<ArrowRight aria-hidden="true" /></div>
      </div>
      <div className="connection-dock"><Image src="/brand/ingenium-icon.png" alt="" width={512} height={512} sizes="64px" /><div><strong>One clear connection.</strong><span>{active === 0 ? "Ready when your customer is." : active === 1 ? "Passing the details to your CRM." : "From first enquiry to next action."}</span></div><span className="connection-dock-status" aria-hidden="true"><Check /></span></div>
      <div className="demo-record">
        <div className="demo-record-heading"><span className="demo-record-icon"><Users aria-hidden="true" /></span><div><span>Your CRM</span><strong>Website project enquiry</strong></div><span className="demo-record-status"><Check aria-hidden="true" /> {active === 0 ? "Ready to connect" : active === 1 ? "Receiving" : "Received"}</span></div>
        <div className="demo-record-fields"><div><span>Source</span><strong>Website form</strong></div><div><span>Owner</span><strong>Your team</strong></div><div><span>Next action</span><strong>Arrange a call <ArrowUpRight aria-hidden="true" /></strong></div></div>
        <div className="demo-record-timeline"><span /><span /><span /><span /><strong>{active === 2 ? "Ready to follow up" : "Enquiry → Record → Next action"}</strong></div>
      </div>
      <div className="connection-receipt" aria-hidden="true"><span><CheckCheck /></span><div><strong>Enquiry received.</strong><span>Your team can take it from here.</span></div></div>
      <span className="scene-coordinate scene-coordinate-bottom" aria-hidden="true">CRM / The next conversation</span>
    </div>
    <div className="demo-stage-controls" role="group" aria-label="Explore the website to CRM connection">
      {stages.map((stage, index) => <button key={stage.label} type="button" aria-pressed={active === index} aria-controls="hero-demo-caption" onClick={() => selectStage(index)}><span aria-hidden="true">{index === 0 ? <LayoutTemplate /> : index === 1 ? <Link2 /> : <CheckCheck />}</span>{stage.label}</button>)}
    </div>
    <div className="demo-caption"><div id="hero-demo-caption" aria-live={playing ? "off" : "polite"} aria-atomic="true"><strong>{stages[active].text}</strong><p>{stages[active].detail}</p></div>{!reduced && <button type="button" className="demo-play" aria-label={playing ? "Pause walkthrough" : active === 2 ? "Replay walkthrough" : "Play walkthrough"} onClick={() => { if (playing) { setPlaying(false); setPaused(true); } else { if (!paused || active === 2) { setActive(0); setTransfer(value => value + 1); } setPaused(false); setPlaying(true); } }}>{playing ? <Pause /> : active === 2 ? <RotateCcw /> : <Play />}</button>}</div>
    <p className="brand-demo-note">An illustrative journey. No enquiry is sent.</p>
  </div>;
}
