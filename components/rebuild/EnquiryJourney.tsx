"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";

const stages = [
  { label: "Enquiry", title: "A customer gets in touch", body: "Your website collects the details your team needs to respond.", fields: [["Name", "Alex Morgan"], ["Interested in", "A home extension"], ["Message", "Can we discuss our plans?"]] },
  { label: "Record", title: "The details reach your CRM", body: "The agreed form fields become a customer record, ready for your team to review.", fields: [["Contact", "Alex Morgan"], ["Source", "Website enquiry"], ["Stage", "New enquiry"]] },
  { label: "Owner", title: "Someone owns the next step", body: "Your team reviews the request and confirms who will take it forward.", fields: [["Contact", "Alex Morgan"], ["Owner", "Your sales team"], ["Next step", "Arrange a conversation"]] },
  { label: "Follow-up", title: "Keep the conversation moving", body: "Record the agreed next action so your team can see what needs to happen.", fields: [["Contact", "Alex Morgan"], ["Action", "Discuss the project brief"], ["Status", "Ready for your team"]] },
];

export default function EnquiryJourney() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return <div className="journey-demo">
    <div className="journey-demo-heading"><strong>From enquiry to next step</strong><span>Example journey</span></div>
    <div className="journey-steps" role="group" aria-label="Explore the enquiry journey">
      {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="journey-content" onClick={() => setActive(index)}>{index + 1}. {item.label}</button>)}
    </div>
    <div id="journey-content" className="journey-state" aria-live="polite" aria-atomic="true">
      <h3>{stage.title}</h3><p>{stage.body}</p>
      <dl>{stage.fields.map(([label, value]) => <div key={label} className="contents"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="journey-demo-bottom"><p>Illustrative data. Your connection and workflow are agreed in your project scope.</p><button className="rebuild-text-link" type="button" onClick={() => setActive((active + 1) % stages.length)}>{active === stages.length - 1 ? <>Start again <RotateCcw size={14} aria-hidden="true" /></> : <>Next step <ArrowRight size={14} aria-hidden="true" /></>}</button></div>
  </div>;
}
