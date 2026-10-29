// One source for package scope, route context and the fixed, user-authorised campaign.
// Never calculate the deadline from a visitor's arrival, deployment or localStorage.
export const STARTER_PROMOTION = {
  startsAt: "2026-10-29T07:02:20.000Z",
  endsAt: "2026-11-05T07:02:20.000Z",
  setup: 495, standardSetup: 795,
} as const;
export function starterPromotionActive(now: number = Date.now()) {
  return now >= Date.parse(STARTER_PROMOTION.startsAt) && now < Date.parse(STARTER_PROMOTION.endsAt);
}
export function promotionTimeLeft(now: number) {
  const seconds = Math.max(0, Math.ceil((Date.parse(STARTER_PROMOTION.endsAt) - now) / 1000));
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds % 86400 / 3600), minutes: Math.floor(seconds % 3600 / 60), seconds: seconds % 60 };
}
export const PROMOTION_DEADLINE_LABEL = "5 November 2026 at 07:02:20 (Irish time)";
export const PACKAGE_PRICE_NOTE = "No VAT charged. Business Growth and CRM & Automation are indicative starting prices, subject to an agreed scope. Your written quote confirms the total and subscription terms before you commit.";

export const businessPackages = [
  {
    id: "starter-website", name: "Starter Website", route: "website", service: "website", href: "/starter-website",
    price: 795, regularPrice: 795, monthly: 50, careStarts: "launch", pricing: "fixed", recommended: false,
    question: "I need a professional website.", outcome: "Look the part. Make it easy to get in touch.",
    audience: "For sole traders, new businesses and local services that need one clear place to send customers.",
    fit: "You need a credible first website, and your services fit on one page.",
    timing: "5 working days", cta: "Get my Starter quote",
    includes: ["One page with up to five sections", "Mobile-friendly design matched to your brand", "Click-to-call, social links and an enquiry form", "Enquiries sent to your email", "Basic SEO, HTTPS and domain connection", "One round of revisions"],
    extras: ["Content checklist: know exactly what to send us", "Launch checklist: check your site and enquiry form together"],
    care: "Website hosting, SSL, routine technical maintenance, basic uptime monitoring and standard technical support. Subscription begins at launch unless your existing agreement says otherwise.",
    excludes: "Domain registration or renewal, extra pages, copywriting from scratch, ecommerce, bookings, CRM, custom integrations and ongoing SEO campaigns.",
    payment: "50% deposit after scope approval. The remaining 50% is due after you approve the agreed website and before launch.",
    training: "Standard website handover", revisions: "One round", workflows: "Email enquiry notifications", users: "No full CRM", integration: "Domain connection", website: "One page, up to five sections",
  },
  {
    id: "business-growth", name: "Business Growth", route: "website", service: "connected", href: "/business-growth",
    price: 1500, regularPrice: null, monthly: 99, careStarts: "launch", pricing: "indicative-from", recommended: true,
    question: "I need a website and better follow-up.", outcome: "Turn enquiries into a process you can follow.",
    audience: "For busy service businesses handling quote requests across calls, messages and email.",
    fit: "You need a stronger website and a shared place to manage the enquiries it brings in.",
    timing: "10–15 working days", cta: "Plan my Business Growth setup",
    includes: ["A conversion-focused website with up to five pages", "Basic Ingenium Portal CRM and contact records", "One sales pipeline with agreed stages", "Website enquiries captured in your CRM", "One workflow: capture, notify and acknowledge", "Basic lead reporting and up to two hours of training"],
    extras: ["Enquiry response template: give customers a clear next step", "Pipeline handover guide: know who needs a reply"],
    care: "Website hosting, Ingenium Portal CRM access, the agreed workflow, routine maintenance, standard technical support and basic technical monitoring. User, email and execution allowances are confirmed in your proposal.",
    excludes: "Paid ads, ongoing SEO, guaranteed enquiries, booking systems, complex integrations, unlimited CRM users, extra workflows, major migrations and ongoing content management.",
    payment: "60% deposit after scope approval. The remaining 40% is due after the agreed acceptance checks and before launch.",
    training: "Up to two hours", revisions: "Two rounds", workflows: "One agreed basic workflow", users: "Agreed before launch", integration: "Website forms to Ingenium Portal", website: "Up to five pages",
  },
  {
    id: "crm-automation", name: "CRM & Automation", route: "follow-up", service: "crm", href: "/crm-automation",
    price: 3000, regularPrice: null, monthly: 199, careStarts: "launch", pricing: "indicative-from", recommended: false,
    question: "I need less admin and clearer systems.", outcome: "One place for customers. Fewer manual handovers.",
    audience: "For established teams managing customers, open quotes and follow-ups across spreadsheets and separate tools.",
    fit: "Your business already has customers and processes. Keeping everything in sync is taking too much time.",
    timing: "3–6 weeks", cta: "Map my CRM & Automation project",
    includes: ["Discovery and a documented implementation scope", "Ingenium Portal CRM, one pipeline and up to five custom fields", "Up to three agreed workflows", "One cleaned contact import and one feasible integration", "Basic dashboards and up to five initial users", "Up to three hours of training and a 14-day defect warranty"],
    extras: ["Workflow map: see the triggers, owners and next actions", "Acceptance checklist: test your agreed process before handover"],
    care: "Ingenium Portal access, agreed CRM hosting and workflow execution, routine maintenance, backups, monitoring and standard support. Usage allowances, service levels and any third-party charges are documented in your proposal.",
    excludes: "A website build, bespoke CRM modules, AI agents, large migrations, advanced analytics, extra departments and complex integrations. These can be scoped separately.",
    payment: "50% deposit, 30% at the agreed milestone and 20% after acceptance and before handover. Complex or uncertain projects start with separately quoted paid discovery.",
    training: "Up to three hours", revisions: "Agreed acceptance process", workflows: "Up to three agreed workflows", users: "Up to five initial users", integration: "One agreed, subject to feasibility", website: "Available separately",
  },
] as const;
export type BusinessPackage = (typeof businessPackages)[number];
const legacyPackageIds: Record<string, string> = { "7-day-starter": "starter-website", "phone-ringing-website": "business-growth", "never-miss-a-lead": "crm-automation", "leads-to-jobs": "business-growth" };
export function getBusinessPackage(id: unknown) {
  return typeof id === "string" ? businessPackages.find(item => item.id === (legacyPackageIds[id] || id)) : undefined;
}
export function hasFixedPricing(item: BusinessPackage) { return item.pricing === "fixed"; }
export function packageSetup(item: BusinessPackage, now: number = Date.now()) {
  return item.id === "starter-website" && starterPromotionActive(now) ? STARTER_PROMOTION.setup : item.price;
}
export function packageCosts(item: BusinessPackage, now: number = Date.now()) {
  return { firstYear: packageSetup(item, now) + item.monthly * 12, annualAfter: item.monthly * 12 };
}
export function euro(value: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
}
export function packageSavings(item: BusinessPackage, now: number = Date.now()) {
  return item.regularPrice !== null ? Math.max(0, item.regularPrice - packageSetup(item, now)) : 0;
}
export function packagePriceLabel(item: BusinessPackage, now: number = Date.now()) {
  const prefix = item.pricing === "indicative-from" ? "Indicative: from " : "";
  const monthlyFrom = item.pricing === "indicative-from" ? "from " : "";
  const price = `${prefix}${euro(packageSetup(item, now))} one-off + ${monthlyFrom}${euro(item.monthly)}/month from launch`;
  return packageSavings(item, now) > 0 ? `${price}. Standard setup ${euro(item.price)}. Offer ends ${PROMOTION_DEADLINE_LABEL}` : price;
}
export function packageBookingUrl(item: BusinessPackage) {
  return `/book-a-call?service=${item.service}&package=${item.id}`;
}

// Canonical quote context recorded by the server, never a browser-supplied price.
// This is an enquiry snapshot, not a payment or a promise of sales results.
export function packageEnquirySnapshot(id: unknown, service: unknown, now: number) {
  const item = getBusinessPackage(id);
  if (!item || item.service !== service) return null;
  return {
    package_id: item.id, package_name: item.name,
    setup_eur: packageSetup(item, now), monthly_eur: item.monthly,
    pricing: item.pricing, vat_charged: false,
    requested_at: new Date(now).toISOString(),
    starter_promotion_eligible: item.id === "starter-website" && starterPromotionActive(now),
    promotion_ends_at: item.id === "starter-website" ? STARTER_PROMOTION.endsAt : null,
  };
}
