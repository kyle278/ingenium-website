"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

const scenarios = [
  {
    label: "Landscaping",
    request: "New patio and side path",
    details: "Carlow · Patio installation",
    owner: "Office coordinator",
    action: "Call Thursday to arrange a site visit",
    stage: "Waiting for site visit",
    acknowledgement: "Thanks for your request. We’ll call to talk through the job and arrange a visit.",
  },
  {
    label: "Commercial cleaning",
    request: "Weekly office cleaning",
    details: "Kilkenny · Three evenings per week",
    owner: "Contracts coordinator",
    action: "Ask the facilities manager for a survey time",
    stage: "Survey to arrange",
    acknowledgement: "Thanks for getting in touch. We’ll contact you to discuss the site and arrange a survey.",
  },
];

function journeyStages(scenario: (typeof scenarios)[number]) {
  return [
    { label: "Enquiry", title: scenario.request, body: "The customer submits the agreed form on your website.", fields: [["Details", scenario.details], ["Source", "Website quote request"]] },
    { label: "Record", title: "The office gets a record", body: "The agreed workflow captures the enquiry, notifies your team and emails the customer an acknowledgement.", fields: [["Stage", "New enquiry"], ["Example email", scenario.acknowledgement]] },
    { label: "Owner", title: "Your team agrees who handles it", body: "The person reviewing the request decides who takes it forward and records that owner in the shared pipeline.", fields: [["Owner", scenario.owner], ["Stage", scenario.stage]] },
    { label: "Follow-up", title: "The next action is visible", body: "Your team records the next action and updates the stage as the enquiry moves forward.", fields: [["Next action", scenario.action], ["Owner", scenario.owner]] },
  ];
}

export default function EnquiryJourney() {
  const [scenario, setScenario] = useState(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduce = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const stages = journeyStages(scenarios[scenario]);
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
      {scenarios.map((item, index) => <button key={item.label} type="button" aria-pressed={scenario === index} aria-controls="journey-content" onClick={() => { setScenario(index); selectStage(0); }}>{item.label}</button>)}
    </div>
    <div className="journey-steps" role="group" aria-label="Explore the enquiry journey">
      {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="journey-content" onClick={() => selectStage(index)}>{item.label}</button>)}
    </div>
    <div className="journey-progress" aria-hidden="true"><span style={{ transform: `translateX(${active * 100}%)` }} /></div>
    <div id="journey-content" className="journey-state" aria-live={playing && !reduce ? "off" : "polite"} aria-atomic="true">
      <h3>{stage.title}</h3><p>{stage.body}</p>
      <dl>{stage.fields.map(([label, value]) => <div key={label} className="contents"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="journey-demo-bottom"><p>Form fields, notifications and pipeline stages are agreed with your team.</p><div className="journey-actions">{!reduce && <button className="rebuild-text-link" type="button" onClick={() => { if (playing) setPlaying(false); else { setActive(0); setPlaying(true); } }}>{playing ? "Pause" : "Play through"}</button>}<button className="rebuild-text-link" type="button" onClick={() => selectStage((active + 1) % stages.length)}>{active === stages.length - 1 ? "Start again" : "Next step"}</button></div></div>
  </div>;
}
