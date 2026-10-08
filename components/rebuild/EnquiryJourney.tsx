"use client";

import { ArrowRight, RotateCcw, Play, Pause } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAnimate } from "motion/react-mini";

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

const stages = [
  { label: "Enquiry", title: "A customer gets in touch", body: "Your website collects the details your team needs to respond.", fields: [["Where", "Your website enquiry form"], ["Collects", "The fields agreed in your scope"], ["Goal", "Enough detail to reply well"]] },
  { label: "Record", title: "The details reach your CRM", body: "The agreed form fields become a customer record, ready for your team to review.", fields: [["Lands in", "Your CRM"], ["Source", "Website enquiry"], ["Stage", "New enquiry"]] },
  { label: "Owner", title: "Someone owns the next step", body: "Your team reviews the request and confirms who will take it forward.", fields: [["Reviewed by", "Your team"], ["Owner", "The right person for the job"], ["Visible to", "Everyone who needs it"]] },
  { label: "Follow-up", title: "Keep the conversation moving", body: "Record the agreed next action so your team can see what needs to happen.", fields: [["Next action", "Saved on the customer record"], ["History", "Kept in one place"], ["Status", "Clear to the whole team"]] },
];

export default function EnquiryJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (reduce || !scope.current) return;
    const animation = animate(scope.current, { opacity: [.35, 1], transform: ["translateY(8px)", "translateY(0px)"] }, { duration: .28, ease: [.22, 1, .36, 1] });
    return () => animation.cancel();
  }, [active, reduce, animate, scope]);
  useEffect(() => {
    if (!playing || reduce) return;
    const timer = window.setTimeout(() => {
      if (active === stages.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduce]);
  function selectStage(index: number) { setPlaying(false); setActive(index); }
  const stage = stages[active];
  return <div className="journey-demo">
    <div className="journey-demo-heading"><strong>From enquiry to next step</strong><span>4 steps</span></div>
    <div className="journey-steps" role="group" aria-label="Explore the enquiry journey">
      {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="journey-content" onClick={() => selectStage(index)}>{index + 1}. {item.label}</button>)}
    </div>
    <div className="journey-progress" aria-hidden="true"><span style={{ transform: `translateX(${active * 100}%)` }} /></div>
    <div ref={scope} id="journey-content" className="journey-state" aria-live={playing && !reduce ? "off" : "polite"} aria-atomic="true">
      <h3>{stage.title}</h3><p>{stage.body}</p>
      <dl>{stage.fields.map(([label, value]) => <div key={label} className="contents"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="journey-demo-bottom"><p>Your connection and workflow are agreed in your project scope.</p><div className="journey-actions">{!reduce && <button className="rebuild-text-link" type="button" onClick={() => { if (playing) setPlaying(false); else { setActive(0); setPlaying(true); } }}>{playing ? <><Pause size={14} aria-hidden="true" /> Pause</> : <><Play size={14} aria-hidden="true" /> Play through</>}</button>}<button className="rebuild-text-link" type="button" onClick={() => selectStage((active + 1) % stages.length)}>{active === stages.length - 1 ? <>Start again <RotateCcw size={14} aria-hidden="true" /></> : <>Next step <ArrowRight size={14} aria-hidden="true" /></>}</button></div></div>
  </div>;
}
