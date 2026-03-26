export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectServiceInsight {
  key: string;
  title: string;
  summary: string;
  highlights: string[];
  metrics: ProjectMetric[];
}

export interface ProjectWebsitePreview {
  heroTitle: string;
  heroSubtitle: string;
  primaryNav: string[];
  trustLine: string;
}

export interface ProjectRecord {
  slug: string;
  projectName: string;
  clientName: string;
  industry: string;
  clientSize: string;
  timeframe: string;
  teaser: string;
  summary: string;
  services: string[];
  insights: string[];
  outcomeMetrics: ProjectMetric[];
  websiteIncluded: boolean;
  websitePreview?: ProjectWebsitePreview;
  serviceInsights: ProjectServiceInsight[];
  stack: string[];
}

function makeServiceInsight(
  key: string,
  title: string,
  summary: string,
  highlights: string[],
  metrics: ProjectMetric[],
): ProjectServiceInsight {
  return {
    key,
    title,
    summary,
    highlights,
    metrics,
  };
}

export const projects: ProjectRecord[] = [
  {
    slug: "carlow-hearing-service-led-clinic-website",
    projectName: "Carlow Hearing Service-Led Clinic Website",
    clientName: "Carlow Hearing",
    industry: "Healthcare",
    clientSize: "Specialist clinic",
    timeframe: "Healthcare service positioning refresh",
    teaser: "Clinic website architecture focused on trust, care clarity, and high-intent service routes.",
    summary:
      "Carlow Hearing needed one clear digital journey for assessments, hearing aids, PRSI support, wax removal, and aftercare. The rebuilt structure keeps the path calm, practical, and reassuring for patients researching care options.",
    services: ["Website Rebuild", "Service Architecture", "Trust Copy", "Local SEO Structure"],
    insights: [
      "Moved from generic service listing to care-decision pathways.",
      "Surfaced PRSI support and aftercare earlier in the browsing flow.",
      "Kept healthcare messaging readable, calm, and confidence-building.",
    ],
    outcomeMetrics: [
      { value: "5", label: "core clinic services clarified" },
      { value: "PRSI", label: "support path surfaced" },
      { value: "Aftercare", label: "trust signal made visible" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Hearing Care with Clear Support and Aftercare",
      heroSubtitle: "Assessments, devices, PRSI guidance, and long-term care in one calm journey.",
      primaryNav: ["Services", "PRSI Support", "Aftercare", "Contact"],
      trustLine: "Built for local patients looking for clarity and confidence",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Reframed the site around the patient decisions that actually drive enquiries and appointments.",
        [
          "Grouped services around user intent instead of disconnected pages.",
          "Reduced ambiguity between clinical services and support information.",
        ],
        [
          { value: "5", label: "service routes" },
          { value: "1", label: "unified clinic journey" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Made the next step easier for visitors who need service clarity before they are ready to contact the clinic.",
        [
          "Brought high-intent questions closer to the main service path.",
          "Used reassurance-led copy to support lower-anxiety enquiry behavior.",
        ],
        [
          { value: "PRSI", label: "funding path visible" },
          { value: "Care", label: "aftercare story anchored" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Balanced professionalism with accessibility so the site feels credible without sounding clinical or cold.",
        [
          "Strengthened service explanations for a healthcare audience.",
          "Kept the tone local, dependable, and easy to scan.",
        ],
        [
          { value: "Local", label: "clinic credibility retained" },
          { value: "Clear", label: "service hierarchy improved" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Content Architecture"],
  },
  {
    slug: "kenny-construction-limited-website-rebuild",
    projectName: "Kenny Construction Limited Website Rebuild",
    clientName: "Kenny Construction Limited",
    industry: "Construction",
    clientSize: "Established contractor",
    timeframe: "Construction service positioning refresh",
    teaser: "Construction website repositioned around delivery credibility, scope clarity, and direct project enquiry paths.",
    summary:
      "Kenny Construction needed a stronger digital presence for new builds, extensions, renovations, and grant-supported upgrades. The rebuild sharpens service scope and presents the company with a more credible, enterprise-ready tone.",
    services: ["Website Rebuild", "Service Positioning", "Quote Path", "Trust Messaging"],
    insights: [
      "Clarified the difference between major builds, extensions, and renovation work.",
      "Made grant-supported upgrade capability visible instead of buried.",
      "Strengthened first-impression credibility for higher-value construction enquiries.",
    ],
    outcomeMetrics: [
      { value: "4", label: "build categories defined" },
      { value: "Grant", label: "upgrade path surfaced" },
      { value: "Enterprise", label: "tone shifted upmarket" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Construction Delivery Built on Clarity and Confidence",
      heroSubtitle: "New builds, extensions, renovations, and grant-supported upgrades.",
      primaryNav: ["Projects", "Services", "Upgrades", "Contact"],
      trustLine: "Positioned for homeowners and higher-value project enquiries",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Structured the site around the project types prospects need to recognize immediately.",
        [
          "Separated build categories into cleaner buying paths.",
          "Used stronger category framing for project-fit conversations.",
        ],
        [
          { value: "4", label: "core categories" },
          { value: "1", label: "clear enquiry path" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Improved the route from first impression to project conversation by making service fit easier to understand.",
        [
          "Reduced ambiguity around what the business delivers.",
          "Made grant-supported upgrades part of the main evaluation journey.",
        ],
        [
          { value: "Grant", label: "upgrade visibility" },
          { value: "Fit", label: "scope clarity improved" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Shifted the site toward a more dependable, professional presentation without losing practical service clarity.",
        [
          "Raised perceived delivery quality through clearer messaging.",
          "Supported a more premium construction-first brand impression.",
        ],
        [
          { value: "Trust", label: "credibility strengthened" },
          { value: "Direct", label: "copy made more practical" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
  },
  {
    slug: "farrell-contract-cleaning-quote-flow-website",
    projectName: "Farrell Contract Cleaning Quote-Flow Website",
    clientName: "Farrell Contract Cleaning",
    industry: "Cleaning Services",
    clientSize: "Regional service business",
    timeframe: "Quote-first conversion rebuild",
    teaser: "Service business website engineered around fast quotes, segment clarity, and stronger operational trust.",
    summary:
      "Farrell Contract Cleaning serves residential, commercial, and industrial customers across Carlow and Leinster. The project focused on making quotation the primary action while preserving enough trust and service detail for multiple buyer types.",
    services: ["Website Rebuild", "Quote Flow Design", "Service Segmentation", "Trust Positioning"],
    insights: [
      "Balanced residential and B2B demand without a split-brand experience.",
      "Kept quotation as the dominant action instead of generic contact friction.",
      "Supported a wider regional footprint while staying grounded in local credibility.",
    ],
    outcomeMetrics: [
      { value: "3", label: "service verticals organized" },
      { value: "<1m", label: "tailored quote path" },
      { value: "Leinster", label: "regional footprint framed clearly" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Consider It Clean",
      heroSubtitle: "Residential, commercial, and industrial cleaning with a faster route to a tailored quote.",
      primaryNav: ["Residential", "Commercial", "Industrial", "Get Quote"],
      trustLine: "Designed around fast intent capture for Carlow and Leinster buyers",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Created a clearer service hierarchy so buyers can self-identify the right path quickly.",
        [
          "Separated three demand types without fragmenting the brand.",
          "Held quotation as the primary conversion outcome throughout the site.",
        ],
        [
          { value: "3", label: "service routes" },
          { value: "1", label: "dominant quote action" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Focused the user journey on rapid enquiry momentum with less hesitation between service interest and quote request.",
        [
          "Improved the handoff from service page to contact path.",
          "Used conversion language that works for both domestic and business buyers.",
        ],
        [
          { value: "<1m", label: "quote path" },
          { value: "Fast", label: "first-step expectation set" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Reinforced dependability and range while avoiding the generic feel common in local service websites.",
        [
          "Used service-specific copy instead of vague claims.",
          "Made regional delivery feel practical and believable.",
        ],
        [
          { value: "Regional", label: "coverage clarified" },
          { value: "Trusted", label: "brand tone strengthened" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Portal Tracking"],
  },
  {
    slug: "holland-pianos-ireland-premium-service-website",
    projectName: "Holland Pianos Ireland Premium Service Website",
    clientName: "Holland Pianos",
    industry: "Retail",
    clientSize: "Premium showroom and specialist service provider",
    timeframe: "Heritage-led positioning refresh",
    teaser: "Premium showroom website balancing product discovery with specialist service credibility.",
    summary:
      "Holland Pianos combines showroom sales with tuning, hire, restoration, and moving services. The work focused on using heritage and specialist expertise as trust assets while keeping product and service intent routes distinct.",
    services: ["Website Rebuild", "Heritage Positioning", "Service Navigation", "Premium Copy"],
    insights: [
      "Turned generational expertise into a visible conversion asset.",
      "Separated service enquiries from showroom browsing more clearly.",
      "Maintained a premium tone without making the site feel inaccessible.",
    ],
    outcomeMetrics: [
      { value: "7", label: "generations of expertise surfaced" },
      { value: "5", label: "service lines clarified" },
      { value: "Carlow", label: "showroom identity anchored" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Fine Pianos and Specialist Care",
      heroSubtitle: "Showroom, tuning, hire, restoration, and moving guided by seven generations of expertise.",
      primaryNav: ["Pianos", "Tuning", "Hire", "Contact"],
      trustLine: "Heritage positioned as a practical reason to enquire",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Built clearer routes for buyers who are browsing instruments and clients who need specialist services.",
        [
          "Separated showroom and service journeys without diluting either.",
          "Used a more premium visual and content hierarchy throughout.",
        ],
        [
          { value: "5", label: "service lines" },
          { value: "2", label: "core buyer intents" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Improved the bridge between specialist credibility and enquiry action for a high-consideration purchase category.",
        [
          "Used expertise as a conversion cue rather than passive background copy.",
          "Made service fit easier to understand before contact.",
        ],
        [
          { value: "7", label: "heritage cue" },
          { value: "Clear", label: "service navigation" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Kept the tone premium and informed while still readable for buyers who are not piano experts.",
        [
          "Raised perceived quality through cleaner message framing.",
          "Supported both showroom and service credibility in one system.",
        ],
        [
          { value: "Premium", label: "tone alignment" },
          { value: "Expert", label: "service authority" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Content Design"],
  },
  {
    slug: "stone-clear-proof-led-service-website",
    projectName: "Stone Clear Proof-Led Service Website",
    clientName: "Stone Clear",
    industry: "Property Services",
    clientSize: "National specialist service business",
    timeframe: "Multi-service enquiry-path rebuild",
    teaser: "Specialist restoration website designed for broad services without losing premium positioning.",
    summary:
      "Stone Clear covers stone restoration, floor polishing, epoxy, and exterior cleaning for residential, hotel, and commercial clients across Ireland. The site work focused on clearer service taxonomy, stronger proof framing, and better alignment between premium services and buyer segments.",
    services: ["Website Rebuild", "Service Taxonomy", "Proof Positioning", "Segmented Enquiry Paths"],
    insights: [
      "Organized a broad service catalog into more navigable decision paths.",
      "Balanced high-end restoration with maintenance and exterior work.",
      "Made multi-segment demand easier to understand without flattening the offer.",
    ],
    outcomeMetrics: [
      { value: "6", label: "surface and service categories" },
      { value: "3", label: "buyer segments supported" },
      { value: "Ireland", label: "national footprint positioned clearly" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Premium Surface Restoration and Exterior Cleaning",
      heroSubtitle: "Marble, limestone, terrazzo, porcelain, epoxy, and exterior work across Ireland.",
      primaryNav: ["Services", "Sectors", "Gallery", "Contact"],
      trustLine: "Built to support residential, hotel, and commercial demand",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Restructured a wide-ranging service offer into a more premium and readable website architecture.",
        [
          "Grouped services around buyer logic instead of a flat list.",
          "Made proof and specialization more prominent in the browsing flow.",
        ],
        [
          { value: "6", label: "service groupings" },
          { value: "3", label: "sector routes" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Made it easier for visitors to identify the right service category before making contact.",
        [
          "Reduced ambiguity between restoration and maintenance work.",
          "Supported different enquiry contexts without multiplying pages unnecessarily.",
        ],
        [
          { value: "Clear", label: "service fit" },
          { value: "Premium", label: "intent framing" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Strengthened the impression of specialist capability across a wide national service footprint.",
        [
          "Used category-specific language to avoid commodity positioning.",
          "Kept quality cues visible for hospitality and commercial buyers.",
        ],
        [
          { value: "Ireland", label: "coverage signal" },
          { value: "Specialist", label: "positioning strength" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Portal Tracking"],
  },
  {
    slug: "sophie-coleman-design-portfolio-positioning-website",
    projectName: "Sophie Coleman Design Portfolio Positioning Website",
    clientName: "Sophie Coleman Design",
    industry: "Design Services",
    clientSize: "Independent design studio",
    timeframe: "Portfolio-led positioning refresh",
    teaser: "Minimal design portfolio built to turn aesthetic interest into clearer brand-identity enquiries.",
    summary:
      "Sophie Coleman Design needed a clean portfolio website focused on brand identity systems and logo design for growing businesses. The work sharpened service positioning, portfolio flow, and organic discoverability around the studio's core offer.",
    services: ["Portfolio Website", "Offer Positioning", "SEO Foundations", "Lead Capture"],
    insights: [
      "Clarified the studio's focus on brand identity and logo work.",
      "Used portfolio content to support enquiry quality rather than passive browsing.",
      "Strengthened discoverability around relevant design-service searches.",
    ],
    outcomeMetrics: [
      { value: "2", label: "core offer pillars" },
      { value: "6", label: "keyword themes surfaced" },
      { value: "Portfolio", label: "work-led enquiry path" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Brand Identity and Logo Design for Growing Businesses",
      heroSubtitle: "A cleaner portfolio path for founders and teams who need a stronger visual brand system.",
      primaryNav: ["Work", "About", "Services", "Contact"],
      trustLine: "Portfolio-led website built for clarity and high-fit enquiries",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Built a cleaner portfolio structure that keeps visual work front and center without sacrificing service clarity.",
        [
          "Made the work easier to browse and interpret.",
          "Supported a more intentional route from portfolio to enquiry.",
        ],
        [
          { value: "2", label: "offer pillars" },
          { value: "1", label: "direct enquiry path" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Used portfolio context, offer framing, and simpler navigation to improve service-fit understanding.",
        [
          "Reduced ambiguity around the studio's strongest offer.",
          "Kept the contact path aligned to the quality of the visual brand work.",
        ],
        [
          { value: "Portfolio", label: "primary proof asset" },
          { value: "Clear", label: "offer framing" },
        ],
      ),
      makeServiceInsight(
        "content",
        "SEO and Positioning",
        "Introduced keyword-aligned metadata and positioning language without making the site feel mechanical or over-optimized.",
        [
          "Supported discoverability for brand identity and logo design searches.",
          "Kept the tone editorial, clear, and commercially useful.",
        ],
        [
          { value: "6", label: "keyword themes" },
          { value: "Focused", label: "positioning language" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
  },
  {
    slug: "annos-beauty-local-salon-website",
    projectName: "Annos Beauty Local Salon Website",
    clientName: "Annos Beauty",
    industry: "Beauty Services",
    clientSize: "Local salon",
    timeframe: "Hair-and-beauty brand refresh",
    teaser: "Salon website built around local trust, service breadth, and a more cohesive hair-and-beauty story.",
    summary:
      "Annos Beauty brings hair and beauty together under one roof in Carlow. The website work focused on making that combined offer more coherent, more welcoming, and easier to understand for first-time visitors deciding whether to book.",
    services: ["Website Rebuild", "Service Positioning", "Local Trust Copy", "Gallery-Led Proof"],
    insights: [
      "Connected hair and beauty services into one clearer offer.",
      "Used local familiarity and welcoming tone as part of conversion strategy.",
      "Supported service discovery without overwhelming the browsing experience.",
    ],
    outcomeMetrics: [
      { value: "2", label: "disciplines unified" },
      { value: "6", label: "service categories surfaced" },
      { value: "Carlow", label: "local brand identity anchored" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Hair and Beauty in the Heart of Carlow",
      heroSubtitle: "A warmer, more confident salon experience with hair and beauty under one roof.",
      primaryNav: ["Services", "Gallery", "About", "Contact"],
      trustLine: "Designed to feel local, welcoming, and easy to return to",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Built a clearer salon structure so visitors can see the full offer without jumping between disconnected pages.",
        [
          "Unified hair and beauty into one cleaner service story.",
          "Used visual proof and service grouping to reduce browsing friction.",
        ],
        [
          { value: "2", label: "core disciplines" },
          { value: "6", label: "service categories" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Supported booking intent through clearer service awareness and a friendlier first impression.",
        [
          "Made the combined offer easier for new clients to understand.",
          "Kept the experience warm rather than generic or transactional.",
        ],
        [
          { value: "Warm", label: "tone direction" },
          { value: "Local", label: "booking context" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Used approachable content to reinforce a repeat-visit, relationship-led salon brand.",
        [
          "Held a welcoming tone across service and about content.",
          "Made regular-client familiarity part of the site's trust layer.",
        ],
        [
          { value: "Welcoming", label: "brand posture" },
          { value: "Clear", label: "offer hierarchy" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
  },
  {
    slug: "attic-jiu-jitsu-carlow-membership-website",
    projectName: "Attic Jiu Jitsu Carlow Membership Website",
    clientName: "Attic Jiu Jitsu Carlow",
    industry: "Sports and Fitness",
    clientSize: "Local academy",
    timeframe: "Class-structure and membership positioning refresh",
    teaser: "Academy website designed to make class fit, beginner confidence, and community culture easier to understand.",
    summary:
      "Attic Jiu Jitsu Carlow needed a more useful public website for adults, kids, teens, beginners, and mixed-level members. The work focused on class structure clarity, welcoming messaging, and stronger conversion from interest to first visit.",
    services: ["Website Rebuild", "Class Architecture", "Membership Copy", "Community Positioning"],
    insights: [
      "Clarified the academy's offer for beginners and families as well as regular adult members.",
      "Used coaching and community language to lower first-visit friction.",
      "Turned the class schedule into a clearer decision aid instead of a generic information page.",
    ],
    outcomeMetrics: [
      { value: "6", label: "class paths clarified" },
      { value: "Beginners", label: "entry route highlighted" },
      { value: "Family", label: "community offer made visible" },
    ],
    websiteIncluded: true,
    websitePreview: {
      heroTitle: "Brazilian Jiu Jitsu in Carlow for Beginners to Competitors",
      heroSubtitle: "Adults, kids, teens, gi, and no-gi classes shaped around coaching quality and academy culture.",
      primaryNav: ["Classes", "About", "Gallery", "Contact"],
      trustLine: "Designed to reduce first-session hesitation and improve class-fit clarity",
    },
    serviceInsights: [
      makeServiceInsight(
        "website",
        "Website Delivery",
        "Rebuilt the class architecture so different member types can find the right fit more easily.",
        [
          "Separated beginner, adult, and family-oriented pathways more clearly.",
          "Used stronger structure for class and membership decision-making.",
        ],
        [
          { value: "6", label: "class routes" },
          { value: "1", label: "clear first-step path" },
        ],
      ),
      makeServiceInsight(
        "conversion",
        "Conversion Path Design",
        "Lowered early friction by making training fit, coaching environment, and academy culture more visible before contact.",
        [
          "Supported beginners with more direct entry-point messaging.",
          "Used community proof to reduce intimidation for first-timers.",
        ],
        [
          { value: "Beginners", label: "path emphasized" },
          { value: "Community", label: "proof surfaced" },
        ],
      ),
      makeServiceInsight(
        "content",
        "Trust and Content Positioning",
        "Balanced academy credibility with approachability so the site appeals to committed members and nervous first-timers alike.",
        [
          "Kept the tone encouraging without losing technical legitimacy.",
          "Made family and youth pathways more visible for a wider audience.",
        ],
        [
          { value: "Approachable", label: "first-visit tone" },
          { value: "Technical", label: "academy credibility" },
        ],
      ),
    ],
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
