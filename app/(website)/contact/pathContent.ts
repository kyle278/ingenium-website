export type IntakePathConfig = {
  slug: "demo" | "revenue-systems-teardown" | "technical-review";
  title: string;
  hero: string;
  summary: string;
  facts: string[];
  faq: Array<{ question: string; answer: string }>;
  nextStep: string;
  outcome: string;
  ctaLabel: string;
  intent: string;
  confirmationPath: string;
};

export const intakePaths: Record<IntakePathConfig["slug"], IntakePathConfig> = {
  demo: {
    slug: "demo",
    title: "Book a Demo",
    hero: "See the operating system, not a generic sales deck.",
    summary:
      "For service businesses replacing disconnected website, CRM, automation, and AI tools, Ingenium shows the live operating model first so buyers can judge fit quickly.",
    facts: [
      "Best for founders, revenue leaders, and operators comparing options.",
      "Focused on lead capture, CRM execution, handoff, reporting, and governed AI support.",
      "Ends with a guided walkthrough and recommended rollout shape.",
      "Last updated: April 15, 2026.",
    ],
    faq: [
      {
        question: "Who should book this?",
        answer: "Teams that want to see the platform before deciding whether a deeper audit or technical review is necessary.",
      },
      {
        question: "What happens after the form?",
        answer: "We confirm fit, share timing, and move the conversation into a live walkthrough.",
      },
    ],
    nextStep: "Role-specific next step: scheduler confirmation and a platform walkthrough.",
    outcome: "You should leave knowing whether Ingenium fits your workflow and buying stage.",
    ctaLabel: "Request Demo",
    intent: "book-demo",
    confirmationPath: "/demo/confirmed",
  },
  "revenue-systems-teardown": {
    slug: "revenue-systems-teardown",
    title: "Revenue Systems Teardown",
    hero: "Find the gaps between your website, CRM, automation, handoff, and reporting.",
    summary:
      "For service businesses with fragmented acquisition and delivery workflows, Ingenium maps the breakdowns first so you can see where revenue leaks before committing to a rebuild.",
    facts: [
      "Best for teams with traffic, leads, or CRM activity that still feels operationally messy.",
      "Focused on routing, ownership, handoff, reporting, and missing controls.",
      "Ends with an intake review and audit handoff.",
      "Last updated: April 15, 2026.",
    ],
    faq: [
      {
        question: "What does the teardown cover?",
        answer: "Lead capture, routing, CRM record quality, handoff continuity, reporting trust, and approval gaps.",
      },
      {
        question: "What happens after the form?",
        answer: "We review the current stack, confirm scope, and hand off to an audit workflow with a named owner.",
      },
    ],
    nextStep: "Role-specific next step: intake review, audit handoff, and prioritised gap list.",
    outcome: "You should leave with a clearer list of operational leaks and the order to fix them.",
    ctaLabel: "Request Teardown",
    intent: "revenue-systems-teardown",
    confirmationPath: "/revenue-systems-teardown/confirmed",
  },
  "technical-review": {
    slug: "technical-review",
    title: "Technical Review",
    hero: "Give technical stakeholders a cleaner path to evaluate architecture, controls, and risk.",
    summary:
      "For teams that need security, governance, or architecture review before moving forward, Ingenium explains the operating model in buyer-plain language and shows where approvals and audit history live.",
    facts: [
      "Best for technical leaders, procurement reviewers, and stakeholders evaluating risk.",
      "Focused on access, approvals, audit trail, data boundaries, and rollout controls.",
      "Ends with a security pack or architecture briefing request.",
      "Last updated: April 15, 2026.",
    ],
    faq: [
      {
        question: "What do you cover?",
        answer: "Permissions, approval gates, audit history, deployment boundaries, recovery posture, and review materials for stakeholders.",
      },
      {
        question: "What happens after the form?",
        answer: "We confirm the review scope and prepare the right materials for a technical or procurement conversation.",
      },
    ],
    nextStep: "Role-specific next step: security pack delivery or architecture briefing request.",
    outcome: "You should leave with the right technical evidence to continue the buying process.",
    ctaLabel: "Request Technical Review",
    intent: "technical-review",
    confirmationPath: "/technical-review/confirmed",
  },
};
