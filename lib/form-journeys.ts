import { MARKETING_NOTICE, NOTICE_VERSION, PRIVACY_NOTICE, validService } from "./enquiry-contract";
import { BUSINESS_TYPES, MAIN_NEEDS, TEAM_SIZES } from "./starter-website";

export type JourneyKind = "enquiry" | "visibility" | "brief" | "template" | "starter";
export type Answers = Record<string, string | string[]>;
export type JourneyField = { name: string; label: string; required?: boolean; type?: "email" | "tel" | "textarea"; autoComplete?: string; max?: number; min?: number; help?: string };
export type Choice = { value: string; title: string; icon?: string };
export type Question = { id: string; title: string; help: string; type: "choice" | "multi" | "fields" | "consent"; key?: string; choices?: Choice[]; fields?: JourneyField[]; when?: (answers: Answers) => boolean };
export const answer = (answers: Answers, key: string) => typeof answers[key] === "string" ? (answers[key] as string) : "";
export const serviceChoices: Choice[] = [
  { value: "website", title: "A website", icon: "website" }, { value: "crm", title: "Better follow-up", icon: "chat" },
  { value: "connected", title: "Both together", icon: "layers" }, { value: "ecommerce", title: "An online shop", icon: "shop" }, { value: "not-sure", title: "Help deciding", icon: "help" },
];
const fields = (id: string, title: string, help: string, items: JourneyField[], when?: Question["when"]): Question => ({ id, title, help, type: "fields", fields: items, when });
const choices = (id: string, title: string, help: string, options: Choice[]): Question => ({ id, key: id, title, help, type: "choice", choices: options });
const contact: Question = fields("contact", "Where should we reply?", "We’ll use your email to respond to this request. Marketing is a separate choice.", [
  { name: "first_name", label: "First name", autoComplete: "given-name", required: true, max: 80 },
  { name: "last_name", label: "Last name", autoComplete: "family-name", required: true, max: 80 },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, max: 254 },
]);
const consent: Question = { id: "consent", title: "A quick privacy check.", help: "Choose your privacy and email preferences, then send when you’re ready.", type: "consent" };
export function journeyQuestions(kind: JourneyKind): Question[] {
  if (kind === "template") return [{ ...contact, help: "We save your details with the designs you explored. Access opens here after your request is accepted; email lets us reply about a future website enquiry." }, consent];
  if (kind === "visibility") return [
    fields("business", "Which business should we check?", "We’ll review what local customers can find, then email practical next steps. There’s no instant score.", [
      { name: "company", label: "Business name", autoComplete: "organization", required: true, min: 2, max: 160 }, { name: "trade", label: "Main service", required: true, min: 2, max: 160, help: "For example, electrician or hair salon." },
    ]),
    fields("area", "Where do your customers look?", "Your main town or area helps us check relevant local searches.", [
      { name: "town", label: "Town or area", required: true, min: 2, max: 160 }, { name: "website", label: "Website or Google profile", max: 500, help: "A link helps us find the right business. Leave blank if you don’t have one." },
    ]), { ...contact, help: "Your review will be emailed here. Requesting it doesn’t book a call or sign you up for marketing." }, consent,
  ];
  if (kind === "brief") return [
    choices("current_website_status", "Where are we starting?", "This brief helps us scope your project. We’ll ask for your name and email near the end.", [
      { value: "Brand new website", title: "A new website", icon: "website" }, { value: "Refresh existing site", title: "Refresh my site", icon: "refresh" }, { value: "Full rebuild of current site", title: "A full rebuild", icon: "layers" }, { value: "Landing page first, full site later", title: "One page first", icon: "page" },
    ]),
    fields("existing-site", "What’s your current website?", "A link lets us review useful content and plan the change. You can leave this blank if you don’t have access to it.", [{ name: "website_url", label: "Website address", max: 500 }], a => ["Refresh existing site", "Full rebuild of current site"].includes(answer(a, "current_website_status"))),
    fields("business", "Tell us about the business.", "A short explanation helps us plan the right content and structure.", [
      { name: "company", label: "Business name", autoComplete: "organization", required: true, max: 160 }, { name: "business_summary", label: "What does the business do?", type: "textarea", required: true, max: 2000 },
    ]),
    choices("primary_goal", "What matters most?", "Choose the main job the website needs to do.", [
      { value: "Generate more qualified leads", title: "Get enquiries", icon: "chat" }, { value: "Improve credibility and positioning", title: "Build confidence", icon: "shield" }, { value: "Support sales conversations", title: "Support sales", icon: "chart" }, { value: "Launch a new offer or business", title: "Launch something", icon: "rocket" }, { value: "Recruit talent", title: "Recruit people", icon: "people" },
    ]),
    fields("content", "What needs a place on the site?", "A starting list is enough. We’ll agree the final pages with you.", [
      { name: "required_pages", label: "Pages or sections", type: "textarea", required: true, max: 2000, help: "For example: home, services, our work and contact. ‘Please advise’ is fine if you need help." }, { name: "target_audience", label: "Who is the site for?", max: 300, help: "For example, homeowners in Carlow. This helps us write for the right audience." },
    ]),
    { id: "features", key: "requested_features", title: "What should it support?", help: "Choose all that apply, then Continue. Leave these blank if you’d like us to advise.", type: "multi", choices: ["Lead capture forms", "Booking or consultation flow", "Blog or resources", "Projects or portfolio", "Team profiles", "Client testimonials", "CMS editing access", "Analytics and tracking", "CRM integration", "Email marketing integration", "Payments or checkout", "Members-only area"].map((value, i) => ({ value, title: ["Enquiry forms", "Bookings", "Blog", "Project portfolio", "Team profiles", "Testimonials", "Edit my content", "Analytics", "CRM connection", "Email marketing", "Online payments", "Member access"][i], icon: ["chat", "calendar", "page", "layers", "people", "shield", "edit", "chart", "layers", "mail", "shop", "lock"][i] })) },
    choices("timeline", "When are you hoping to launch?", "This is a planning preference. We’ll confirm timing in the agreed scope.", [{ value: "ASAP", title: "As soon as possible", icon: "rocket" }, { value: "Within 2-4 weeks", title: "2–4 weeks", icon: "calendar" }, { value: "Within 1-2 months", title: "1–2 months", icon: "calendar" }, { value: "This quarter", title: "This quarter", icon: "calendar" }, { value: "Just exploring", title: "Just exploring", icon: "help" }]),
    { ...contact, help: "We’ll email you to discuss the brief and agree next steps. Submitting this does not commit you to a project." }, consent,
  ];
  if (kind === "starter") return [
    choices("main_need", "What would help most?", "Tell us what you need. We’ll ask for your name and email before sending your request.", MAIN_NEEDS.map((value, i) => ({ value, title: ["A first website", "Refresh my site", "Get found locally", "Better follow-up", "Launch a business", "Selling or bookings", "Something else"][i], icon: ["website", "refresh", "search", "chat", "rocket", "shop", "help"][i] }))),
    fields("other", "What do you have in mind?", "A short explanation helps us identify a useful next step.", [{ name: "details", label: "What would you like help with?", type: "textarea", required: true, max: 300 }], a => answer(a, "main_need") === "Something else"),
    choices("team_size", "How big is your team?", "This helps us spot when you may need a wider project scope.", TEAM_SIZES.map(value => ({ value, title: value, icon: "people" }))),
    choices("business_type", "What kind of business?", "Choose the closest fit so we can put your request in context.", BUSINESS_TYPES.map((value, i) => ({ value, title: ["Trades", "Home & garden", "Beauty & wellness", "Health & fitness", "Professional services", "Food & hospitality", "Retail", "Community", "Not launched yet", "Other"][i], icon: "business" }))),
    contact, consent,
  ];
  return [choices("service", "What can we help with?", "Choose one to continue. We’ll ask for your name and email before sending an enquiry.", serviceChoices),
    fields("project", "What needs to work better?", "Tell us the problem and what a useful next step would look like. We’ll reply by email.", [{ name: "message", label: "Your request", type: "textarea", required: true, min: 10, max: 5000 }, { name: "company", label: "Business name", autoComplete: "organization", max: 160, help: "Helps us put your request in context." }]), contact, consent];
}
export function applicableQuestions(kind: JourneyKind, answers: Answers) { return journeyQuestions(kind).filter(q => !q.when || q.when(answers)); }
export function updateAnswer(answers: Answers, key: string, value: string | string[]): Answers {
  const next = { ...answers, [key]: value };
  if (key === "current_website_status" && !["Refresh existing site", "Full rebuild of current site"].includes(String(value))) delete next.website_url;
  if (key === "main_need" && value !== "Something else") delete next.details;
  return next;
}
export function buildJourneyFields(kind: JourneyKind, answers: Answers, extras: Record<string, string> = {}) {
  const active = applicableQuestions(kind, answers), result: Record<string, string> = {};
  for (const question of active) for (const key of [...(question.fields || []).map(f => f.name), ...(question.key ? [question.key] : [])]) {
    const v = answers[key]; result[key] = Array.isArray(v) ? v.join(", ") : (v || "").trim();
  }
  Object.assign(result, extras, { name: `${result.first_name || ""} ${result.last_name || ""}`.trim(), privacy_consent: answer(answers, "privacy_consent") || "false", marketing_consent: answer(answers, "marketing_consent") || "false", consent_version: NOTICE_VERSION, consent_text_snapshot: PRIVACY_NOTICE, marketing_consent_text: MARKETING_NOTICE, website_fax: answer(answers, "website_fax"), budget_range: "" });
  if (kind === "visibility") Object.assign(result, { service: "website", intent: "visibility-check", message: `Free Google Visibility Check: ${result.company}; service: ${result.trade}; town: ${result.town}; website/profile: ${result.website || "not supplied"}.` });
  if (kind === "brief") Object.assign(result, { intent: "website-project-brief", project_type: "website_build", pages_summary: result.required_pages, feature_count: String(Array.isArray(answers.requested_features) ? answers.requested_features.length : 0), accuracy_confirmation: answer(answers, "accuracy_confirmation") || "false" });
  if (kind === "enquiry") { result.service = validService(result.service) ? result.service : "not-sure"; result.biggest_growth_challenge = result.message; }
  if (kind === "starter") { result.service = "website"; result.intent = "starter-website"; result.message = `Website request: ${result.main_need}; team: ${result.team_size}; business: ${result.business_type}. ${result.details || ""}`; }
  return result;
}
