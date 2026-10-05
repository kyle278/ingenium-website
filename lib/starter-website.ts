// Starter Website launch campaign: offer facts, form options and lead routing.
// Shared by the landing page, the qualification popup and /api/enquiry.

export const STARTER_PATH = "/starter-website";
export const STARTER_FORM_SLUG = "starter-website";

// Update by hand, and only while it's true.
export const FOUNDING_PLACES_TOTAL = 10;
export const FOUNDING_PLACES_LEFT = 10;

// Set NEXT_PUBLIC_STARTER_BOOKING_URL to the Cal.com or Calendly event link.
// Without it, good-fit leads see the "Kyle will email you" fallback only.
export const BOOKING_URL = process.env.NEXT_PUBLIC_STARTER_BOOKING_URL?.trim() || "";

// Hero explainer, self-hosted so no third-party player loads before consent.
// Bump the version in the file names when the video changes, so browsers fetch the new one.
export const EXPLAINER_VIDEO = {
  src: "/starter/explainer-v1-1080.mp4",
  mobileSrc: "/starter/explainer-v1-720.mp4",
  poster: "/starter/explainer-v1-poster.webp",
} as const;

// Live example sites. Leave href empty until each example is published.
export const EXAMPLE_SITES = [
  { kind: "electrician", label: "Example: electrician", href: process.env.NEXT_PUBLIC_STARTER_EXAMPLE_TRADE_URL?.trim() || "" },
  { kind: "barber", label: "Example: barber", href: process.env.NEXT_PUBLIC_STARTER_EXAMPLE_BARBER_URL?.trim() || "" },
] as const;

export const PRICE = {
  standardSetup: "€1,500",
  standardMonthly: "€149",
  setup: "€495",
  monthly: "€50",
  // Hosting plan paid yearly up front: 10 months' price for 12.
  yearly: "€500",
  setupSaving: "€1,005",
  deposit: "€250",
  balance: "€245",
} as const;

export const CTA_LABEL = "Check if my business qualifies";
export const CTA_POSITIONS = ["hero", "how-it-works", "pricing", "final", "sticky"] as const;
export type CtaPosition = (typeof CTA_POSITIONS)[number];

export const TEAM_SIZES = ["Just me", "2–5", "6–10", "11–25", "More than 25"] as const;
export const BUSINESS_TYPES = [
  "Trades and construction",
  "Home and garden services",
  "Beauty, hair and wellness",
  "Health and fitness",
  "Professional services",
  "Food, drink and hospitality",
  "Retail",
  "Community, club or charity",
  "Not launched yet",
  "Other",
] as const;
export const MAIN_NEEDS = [
  "I don't have a website yet",
  "My website is out of date or hard to use on phones",
  "Customers can't find me on Google",
  "Enquiries get lost in calls, DMs and emails",
  "I'm launching a new business",
  "I need to sell or take bookings online",
  "Something else",
] as const;
export const SOMETHING_ELSE = "Something else";
export const DETAILS_MAX = 300;
export const MIN_FILL_MS = 3000;

export const MARKETING_TEXT = "I consent to receive occasional website tips and marketing email updates from Ingenium. I can unsubscribe at any time.";

export type LeadRoute = "good-fit" | "needs-chat" | "bigger-needs";
export const LEAD_LABELS: Record<LeadRoute, string> = {
  "good-fit": "Hot",
  "needs-chat": "Warm",
  "bigger-needs": "Main package",
};

type StarterAnswers = { team_size?: string; business_type?: string; main_need?: string };

/** The two checks from the brief, in order: bigger needs first, then anything unclear. */
export function routeStarterLead(answers: StarterAnswers): LeadRoute {
  if (answers.team_size === "More than 25" || answers.main_need === "I need to sell or take bookings online") return "bigger-needs";
  if (!answers.team_size || !answers.business_type || !answers.main_need || answers.main_need === SOMETHING_ELSE) return "needs-chat";
  return "good-fit";
}

function optionOrBlank(value: unknown, options: readonly string[]) {
  return value === "" || value === undefined || (typeof value === "string" && options.includes(value));
}

/** Server-side checks for the starter form; returns an error message or null. */
export function validateStarterFields(f: Record<string, unknown>): string | null {
  if (!optionOrBlank(f.team_size, TEAM_SIZES)) return "Please choose a listed team size.";
  if (!optionOrBlank(f.business_type, BUSINESS_TYPES)) return "Please choose a listed business type.";
  if (!optionOrBlank(f.main_need, MAIN_NEEDS)) return "Please choose a listed option.";
  if (typeof f.details === "string" && f.details.length > DETAILS_MAX) return `Please keep the extra detail under ${DETAILS_MAX} characters.`;
  if (typeof f.phone === "string" && f.phone && !/^[0-9+()\s-]{6,24}$/.test(f.phone)) return "Please check the phone number.";
  if (f.marketing_consent !== "true" && f.marketing_consent !== "false") return "Please confirm your marketing preference.";
  const elapsed = Number(f.fill_ms);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return "That was quick! Please check your answers and send again.";
  return null;
}
