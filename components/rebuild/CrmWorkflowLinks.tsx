import Link from "next/link";
import { ArrowUpRight, CalendarCheck, GitBranch } from "lucide-react";

export default function CrmWorkflowLinks() {
  return <div className="crm-workflow-links">
    <Link href="/crm-automation#quote-example">
      <GitBranch size={20} aria-hidden="true" />
      <span><strong>Follow up an open quote</strong><small>Give the quote owner a dated task.</small></span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
    <Link href="/crm-automation#renewal-example">
      <CalendarCheck size={20} aria-hidden="true" />
      <span><strong>Review a service renewal</strong><small>Prompt the owner before it’s due.</small></span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  </div>;
}
