"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { enquiryExamples, type EnquiryExample, type EnquiryExampleId } from "@/lib/enquiry-examples";

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

function journeyStages(scenario: EnquiryExample) {
  return [
    { label: "Enquiry", title: scenario.request, body: "See the details a customer could send in the agreed website form.", fields: scenario.fields },
    { label: "Record", title: "The office gets a record", body: "The agreed workflow captures the enquiry, notifies your team and emails the customer an acknowledgement.", fields: [["Stage", "New enquiry"], ["Example email", scenario.acknowledgement]] },
    { label: "Owner", title: "Your team agrees who handles it", body: "The person reviewing the request decides who takes it forward and records that owner in the shared pipeline.", fields: [["Owner", scenario.owner], ["Stage", scenario.stage]] },
    { label: "Follow-up", title: "The next action is visible", body: "Your team records the next action and updates the stage as the enquiry moves forward.", fields: [["Next action", scenario.action], ["Owner", scenario.owner]] },
  ];
}

export default function EnquiryJourney({ initialExample }: { initialExample?: EnquiryExampleId }) {
  const [scenario, setScenario] = useState(initialExample || enquiryExamples[0].id);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const example = enquiryExamples.find(item => item.id === scenario) ?? enquiryExamples[0];
  const stages = journeyStages(example);
  useEffect(() => {
    if (!playing || reduce) return;
    const timer = window.setTimeout(() => {
      if (active === stages.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduce, stages.length]);
  function selectStage(index: number) { setPlaying(false); setActive(index); }
  const stage = stages[active];
  return <div className="journey-demo">
    <div className="journey-demo-heading"><strong>Sample enquiry</strong><span>Illustrative example</span></div>
    <div className="journey-scenarios" role="group" aria-label="Choose an example">
      {enquiryExamples.map(item => <button key={item.id} type="button" aria-pressed={scenario === item.id} aria-controls="journey-content" onClick={() => { setScenario(item.id); selectStage(0); }}>{item.label}</button>)}
    </div>
    <div className="journey-steps" role="group" aria-label="Explore the enquiry journey">
      {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="journey-content" onClick={() => selectStage(index)}>{item.label}</button>)}
    </div>
    <div className="journey-progress" aria-hidden="true"><span style={{ transform: `translateX(${active * 100}%)` }} /></div>
    <div id="journey-content" className="journey-state" aria-live={playing && !reduce ? "off" : "polite"} aria-atomic="true">
      <h3>{stage.title}</h3><p>{stage.body}</p>
      <dl>{stage.fields.map(([label, value]) => <div key={label} className="contents"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="journey-next-action">
      <strong>Where this request ends up</strong>
      <span>{example.action} · {example.owner}</span>
    </div>
    <div className="journey-demo-bottom"><p>Form fields, notifications and pipeline stages are agreed with your team.</p><div className="journey-actions">{!reduce && <button className="rebuild-text-link" type="button" onClick={() => { if (playing) setPlaying(false); else { setActive(0); setPlaying(true); } }}>{playing ? "Pause" : "Play through"}</button>}<button className="rebuild-text-link" type="button" onClick={() => selectStage((active + 1) % stages.length)}>{active === stages.length - 1 ? "Start again" : "Next step"}</button></div></div>
  </div>;
}
