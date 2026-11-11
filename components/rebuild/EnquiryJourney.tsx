"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CalendarClock } from "lucide-react";
import { enquiryExamples, getEnquiryExample, type EnquiryExample, type EnquiryExampleId } from "@/lib/enquiry-examples";

const sources = [
  { id: "website", label: "Website form" },
  { id: "manual", label: "Phone or WhatsApp" },
] as const;
const steps = ["Request", "Record", "Owner", "Follow-up"] as const;
const nextActions = ["Show the office record", "Assign an owner", "Set the follow-up", "Start again"] as const;

function journeyStages(example: EnquiryExample, fromWebsite: boolean) {
  return [
    {
      who: fromWebsite ? "Customer · website form" : "Customer · phone or WhatsApp",
      title: example.request,
      body: fromWebsite
        ? "The customer shares the details your team needs for the first reply."
        : "A customer calls or sends a message. The person who takes it collects the same job details.",
      fields: example.fields,
    },
    {
      who: fromWebsite ? "Included workflow" : "Your team · manual entry",
      title: fromWebsite ? "The office gets a record" : "A team member adds the enquiry",
      body: fromWebsite
        ? "The agreed form creates or updates the contact, creates a lead and alerts the office. The customer receives an acknowledgement by email."
        : "The person who took the call or read the message adds a lead to the shared pipeline. They reply through the original channel.",
      fields: fromWebsite
        ? [["Example email", example.acknowledgement]]
        : [["What to log", "Customer details, job details and the channel they used"]],
    },
    {
      who: "Your team · assignment",
      title: "Give the enquiry to one person",
      body: `The office assigns it to the ${example.owner.toLowerCase()}. The team can now see who is responsible for the next reply.`,
      fields: [],
    },
    {
      who: "Your team · follow-up",
      title: "Agree the next action and when it’s due",
      body: "The owner records the action and due date in the shared pipeline. The office can review what needs doing and who is handling it.",
      fields: [],
    },
  ];
}

export default function EnquiryJourney({ initialExample }: { initialExample?: EnquiryExampleId }) {
  const [scenario, setScenario] = useState(initialExample ?? enquiryExamples[0].id);
  const [source, setSource] = useState<(typeof sources)[number]["id"]>("website");
  const [active, setActive] = useState(0);
  const contentId = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const example = getEnquiryExample(scenario) ?? enquiryExamples[0];
  const fromWebsite = source === "website";
  const stage = journeyStages(example, fromWebsite)[active];

  const record = [
    ["Source", fromWebsite ? "Website form" : "Phone or WhatsApp · logged by staff"],
    ["Stage", active === 0 ? "Awaiting entry" : active < 3 ? "New enquiry" : example.stage],
    ["Owner", active < 2 ? "Not assigned" : example.owner],
    ["Next action", active < 3 ? "Not set" : example.action],
    ["Due", active < 3 ? "Not set" : example.due],
  ];

  function advance() {
    setActive((active + 1) % steps.length);
    window.requestAnimationFrame(() => heading.current?.focus());
  }

  return <div className="journey-demo">
    <div className="journey-demo-heading">
      <strong>Follow one enquiry</strong>
      <span>Illustrative example</span>
    </div>
    <div className="journey-options">
      <div className="journey-scenarios" role="group" aria-label="Choose a trade">
        {enquiryExamples.map(item => <button key={item.id} type="button" aria-pressed={scenario === item.id} aria-controls={contentId} onClick={() => { setScenario(item.id); setActive(0); }}>{item.label}</button>)}
      </div>
      <div className="journey-scenarios" role="group" aria-label="How the enquiry arrives">
        {sources.map(item => <button key={item.id} type="button" aria-pressed={source === item.id} aria-controls={contentId} onClick={() => { setSource(item.id); setActive(0); }}>{item.label}</button>)}
      </div>
    </div>
    <div className="journey-steps" role="group" aria-label="Walkthrough steps">
      {steps.map((step, index) => <button key={step} type="button" aria-pressed={active === index} aria-controls={contentId} onClick={() => setActive(index)}><span aria-hidden="true">{index + 1}</span> {step}</button>)}
    </div>
    <div className="journey-view" id={contentId} aria-live="polite" aria-atomic="true">
      <div className="journey-state">
        <p className="journey-stage-role">{stage.who}</p>
        <h3 ref={heading} tabIndex={-1}>{stage.title}</h3>
        <p>{stage.body}</p>
        {stage.fields.length > 0 && <dl className="journey-fields">{stage.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      </div>
      <div className="journey-office" data-dated={active === 3}>
        <div className="journey-office-title"><CalendarClock size={18} aria-hidden="true" /><h4>Office view</h4></div>
        <dl className="journey-fields">{record.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
    </div>
    <div className="journey-demo-bottom">
      <button className="rebuild-button" type="button" onClick={advance}>{nextActions[active]}<ArrowRight size={17} aria-hidden="true" /></button>
      <p>We agree the form questions and pipeline stages with your team. Automatic imports from other channels and extra reminders are scoped separately.</p>
    </div>
  </div>;
}
