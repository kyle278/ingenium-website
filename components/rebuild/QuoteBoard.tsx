import { CalendarCheck, Check, GitBranch } from "lucide-react";

export default function QuoteBoard() {
  return <figure className="crm-board">
    <figcaption><span><GitBranch size={16} aria-hidden="true" /> Quote follow-up</span><span>Illustration · sample data</span></figcaption>
    <div className="crm-board-surface">
      <div className="crm-board-record">
        <div><p>Quote Q-014</p><strong>Equipment service quote</strong></div>
        <span className="crm-board-status">Quote sent</span>
      </div>
      <ol className="crm-board-stages" aria-label="Example quote stages">
        <li><Check size={15} aria-hidden="true" /> Draft</li>
        <li aria-current="step"><span aria-hidden="true" /> Sent</li>
        <li><span aria-hidden="true" /> Decision</li>
      </ol>
      <div className="crm-board-task">
        <CalendarCheck size={23} aria-hidden="true" />
        <div><p>Next action</p><strong>Follow up on quote</strong><small>Assigned to the quote owner</small></div>
        <span>Due Thursday</span>
      </div>
    </div>
  </figure>;
}
