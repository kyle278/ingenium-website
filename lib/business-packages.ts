// User-approved launch prices. Website care starts at launch; CRM work is quoted individually.
// Grant offsets, guarantees and exit terms remain unpublished.
export const businessPackages = [
  {
    id: "7-day-starter", name: "7-Day Starter Website", route: "website", service: "website",
    price: 495, regularPrice: 795, monthly: 49, careStarts: "launch", recommended: false,
    audience: "Give people who hear your name one clear place to check your business and get in touch.",
    fit: "Your services, work and contact details fit comfortably on one page.",
    timing: "7 days", includes: ["One-page website that works on phones", "Website copy drafted for you to approve", "Click-to-call and WhatsApp buttons", "Enquiry form"],
    extras: ["Google Business Profile set up and submitted", "Review-ready QR card"],
    care: "Hosting, security and small content edits. We confirm the edit allowance in your proposal; extra pages and new features are separate.",
    excludes: "Extra pages, logo design, copywriting beyond one page and paid ads.",
  },
  {
    id: "phone-ringing-website", name: "Phone Ringing Website", route: "website", service: "website",
    price: 1495, regularPrice: null, monthly: 99, careStarts: "launch", recommended: true,
    audience: "Help customers understand each main service and feel confident asking you for a quote.",
    fit: "You offer distinct services that need their own pages, examples and enquiries.",
    timing: "14 days", includes: ["Up to 5 pages, with a page for each main service", "Service-page copy drafted for you to approve", "Local search basics for your town", "Enquiry form sending enquiries to your phone"],
    extras: ["Google Business Profile setup or tidy-up", "Review-request templates and setup"],
    care: "Hosting, security and small content edits across your pages, plus support for your review-request setup. We confirm the allowance in your proposal.",
    excludes: "Ecommerce, bookings, custom integrations and paid ads.",
  },
  {
    id: "never-miss-a-lead", name: "Never Miss a Lead System", route: "follow-up", service: "crm",
    price: null, regularPrice: null, monthly: null, careStarts: "quote", recommended: false,
    audience: "Your website works, but enquiries and quotes are getting lost in the follow-up.",
    fit: "Keep your existing website and improve what happens after an enquiry arrives.",
    extras: [],
    timing: null, includes: ["Customer records and enquiry tracking on an off-the-shelf CRM", "Your website form connected", "Follow-up templates", "One contact import", "Team training"],
    care: "Software, setup, training and ongoing support are priced in your individual proposal.",
    excludes: "Website redesign, extra data clean-up and custom code.",
  },
  {
    id: "leads-to-jobs", name: "Leads to Jobs System", route: "follow-up", service: "connected",
    price: null, regularPrice: null, monthly: null, careStarts: "quote", recommended: false,
    audience: "For busy firms that need both a better website and a better way to turn enquiries into jobs.",
    fit: "Both your website and the handover from enquiry to job need attention.",
    extras: [],
    timing: null, includes: ["Website and customer records together", "Online booking and payments", "Job tracking", "Review requests", "Integration and team training"],
    care: "Your website, software, setup and ongoing support are priced together in an individual proposal.",
    excludes: "Custom software, hardware and paid ads.",
  },
] as const;

export type BusinessPackage = (typeof businessPackages)[number];
export function getBusinessPackage(id: unknown) {
  return businessPackages.find(item => item.id === id);
}
export function hasFixedPricing(item: BusinessPackage): item is Extract<BusinessPackage, { careStarts: "launch" }> {
  return item.careStarts === "launch";
}
export function packageCosts(item: BusinessPackage) {
  if (!hasFixedPricing(item)) return null;
  return { firstYear: item.price + item.monthly * 12, annualAfter: item.monthly * 12 };
}
export function euro(value: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
export function packageSavings(item: BusinessPackage) {
  return hasFixedPricing(item) && item.regularPrice !== null ? Math.max(0, item.regularPrice - item.price) : 0;
}
export function packagePriceLabel(item: BusinessPackage) {
  if (!hasFixedPricing(item)) return "Quoted individually. Setup and ongoing costs confirmed in your proposal.";
  const current = `${euro(item.price)} one-off + ${euro(item.monthly)}/month care from launch`;
  return item.regularPrice !== null ? `Normally ${euro(item.regularPrice)} for the build; current offer ${current}. Save ${euro(packageSavings(item))} on the build; monthly care stays ${euro(item.monthly)}` : current;
}
export function packageBookingUrl(item: BusinessPackage) {
  return `/book-a-call?service=${item.service}&package=${item.id}`;
}
