export type Offer = {
  slug: string; name: string; packageName: string; title: string; description: string;
  cta: string; href: string; setup: string; monthly: string; annual: string; audience: string;
  benefitsTitle: string; benefits: { title: string; body: string }[];
  includes: string[]; care: string; exclusions: string;
  sections: { title: string; paragraphs: string[]; link?: { href: string; label: string } }[];
  faqs: { question: string; answer: string }[]; closing: { title: string; body: string };
};

export const offers: Offer[] = [
  {
    slug: "websites", name: "Websites", packageName: "Website Launch",
    title: "Make it easier for customers to choose your business.",
    description: "Your website should explain what you do, give people reasons to trust you and make getting in touch straightforward. We build the pages and enquiry routes around those decisions.",
    cta: "Request a website review", href: "/contact?service=website", setup: "€1,500", monthly: "€149", annual: "€3,288",
    audience: "For a business that needs a defined website build and someone to look after it after launch.",
    benefitsTitle: "Give each page a clear job.",
    benefits: [
      { title: "Explain your services", body: "Help visitors find the service that matches their needs, understand what is involved and decide whether you are the right fit." },
      { title: "Show the work behind the words", body: "Bring relevant projects, photographs and approved customer feedback into the places where people are deciding whether to enquire." },
      { title: "Make the next step straightforward", body: "Use clear contact routes and forms that ask for the information you need to start a useful conversation." },
    ],
    includes: ["Up to five agreed pages in one language", "A design adapted to your brand and content", "Layouts for mobile, tablet and desktop", "Light editing of the copy you supply", "One standard enquiry form", "Basic page titles, descriptions and technical search setup", "Agreed website measurement", "Two consolidated review rounds", "One handover session"],
    care: "The monthly service includes hosting, basic maintenance and up to one hour of small changes.",
    exclusions: "Original brand development, extensive copywriting, photography, ecommerce and custom applications are quoted separately.",
    sections: [
      { title: "Your part in the project.", paragraphs: ["You bring the knowledge of your business. We help turn it into a website people can use.", "Before building, we agree who will supply the text, images, project details and required policy content. We also identify one person to bring your team's feedback together. That gives everyone a clear way to review the work and make decisions."] },
      { title: "You can start with the website.", paragraphs: ["A CRM is optional. If your current enquiry process works for you, we can build around it. If you also need help managing enquiries, we can discuss the combined website and CRM package."], link: { href: "/connected", label: "See Website + CRM" } },
    ],
    faqs: [
      { question: "Can you work with our existing branding?", answer: "Yes. We review your current logo, colours, imagery and other brand materials before defining the design. If the brand itself needs substantial work, we scope that separately." },
      { question: "Can we keep our domain?", answer: "Yes. An existing domain can remain the address of your new website. We review access and any required changes as part of the launch plan." },
      { question: "Do we need to write all the content?", answer: "The standard package includes light editing of material you supply. If you need research, interviews or substantial new copy, we can quote that work before the project starts." },
      { question: "Will the website work on phones?", answer: "The build includes mobile layouts and checks of the agreed pages and forms across representative screen sizes." },
      { question: "Will a new website improve our Google rankings?", answer: "We include basic technical search setup. Rankings also depend on your content, competition and other factors, so we do not promise a particular position or number of leads." },
      { question: "How long will it take?", answer: "We agree a schedule after reviewing the scope and our delivery capacity. Content readiness, feedback and access to your existing services all affect the launch date." },
    ],
    closing: { title: "Show us the website you want to improve.", body: "Tell us what feels out of date, unclear or difficult to manage. We will review the fit and discuss the next step with you." },
  },
  {
    slug: "crm", name: "CRM", packageName: "CRM Launch",
    title: "Know what is happening with your open enquiries.",
    description: "When customer details are spread across inboxes and spreadsheets, it is hard to see who is following up. We help your team bring contacts, opportunities and next actions into one usable CRM.",
    cta: "Discuss your CRM", href: "/contact?service=crm", setup: "€3,000", monthly: "€249", annual: "€5,988",
    audience: "For a team that needs customer details, opportunities and next actions in one place.",
    benefitsTitle: "Start with the work your team does.",
    benefits: [
      { title: "Customer details together", body: "Keep the relevant information with the customer record so colleagues can see the context." },
      { title: "A shared view of opportunities", body: "See which enquiries are new, which need attention and which have moved forward." },
      { title: "Clear next actions", body: "Make responsibility and follow-up visible to the people doing the work." },
    ],
    includes: ["Setup for up to five users", "One agreed sales pipeline", "Standard fields matched to the agreed process", "One clean CSV import of up to 2,000 records", "One agreed report or dashboard", "Two training sessions", "A review of the team's use after launch"],
    care: "The monthly service includes the agreed platform allowance and up to two hours of support or configuration changes.",
    exclusions: "Complex data cleaning, historical attachments, additional systems, external software licences and new custom features are quoted separately.",
    sections: [
      { title: "A CRM should reflect how you work.", paragraphs: ["A customer relationship management system should reflect how an enquiry becomes a customer. We start by understanding that process, then agree the records, stages and responsibilities your team needs."] },
      { title: "Keep the parts that already work.", paragraphs: ["You do not need a website rebuild to start a CRM project. We review your existing tools and identify where the difficulty actually sits. The right next step may be a clearer process, a configuration change, a migration or a more substantial build."] },
      { title: "Moving from an existing system.", paragraphs: ["We first review what data you have, what your team uses and what needs to move. We then agree the import, checks and handover. Larger or more complicated migrations begin with a separate discovery stage so the work can be scoped properly."] },
    ],
    faqs: [
      { question: "Is this a custom CRM built from scratch?", answer: "The standard package configures an agreed set of Ingenium CRM features. A new module or a substantially different process needs its own scope and price." },
      { question: "Can you help if we already use a CRM?", answer: "Yes. Tell us which system you use and what is difficult. We will review whether configuration, training, migration or a different approach is the right next step before proposing work." },
      { question: "Can our existing website stay?", answer: "Yes. A CRM project can stand on its own. If you need your current website connected, we review that connection as part of the scope." },
      { question: "What does a clean CSV import mean?", answer: "The records are provided in an agreed spreadsheet format, with the required columns and consistent values. We review a sample first. Substantial deduplication, reconstruction or data cleaning is additional work." },
      { question: "Will you train our team?", answer: "The standard package includes two training sessions based on the agreed day-to-day tasks. We also identify a person in your team to own the process after launch." },
      { question: "Can we automate parts of the process?", answer: "We can discuss a specific task you want to reduce or remove. Any automation is scoped separately, including the checks, permissions and human review it needs." },
    ],
    closing: { title: "Bring one example of a difficult handoff.", body: "An enquiry, quote or customer record that became hard to track is a useful starting point. Tell us what happened and what you would like your team to see instead." },
  },
  {
    slug: "connected", name: "Website + CRM", packageName: "Connected Launch",
    title: "Your website and CRM, built to work together.",
    description: "Make the enquiry form and the follow-up process part of the same project. Ingenium builds your website and CRM together, with the agreed form-to-record connection included.",
    cta: "Request a walkthrough", href: "/demo?service=connected", setup: "€4,500", monthly: "€349", annual: "€8,688",
    audience: "For a business that wants its website and customer records planned and delivered together.",
    benefitsTitle: "Carry the conversation beyond the contact form.",
    benefits: [
      { title: "Collect the right details", body: "Choose the questions that help your team understand the enquiry." },
      { title: "Keep the context with the record", body: "Bring the agreed contact details, service interest and available source information into the CRM." },
      { title: "Give your team a clear place to work", body: "Review the record, confirm who owns it and manage the next step in the agreed CRM process." },
    ],
    includes: ["Up to five website pages in one language", "One standard enquiry form connected to your Ingenium CRM", "CRM setup for up to five users and one pipeline", "Agreed contact, enquiry and service fields", "One clean CSV import of up to 2,000 records", "One agreed CRM report or dashboard", "Two website review rounds, handover and two CRM training sessions", "Checks of the complete enquiry journey before launch"],
    care: "The monthly service includes hosting, the agreed CRM platform allowance and up to three hours of care across the combined website and CRM.",
    exclusions: "Accounting systems, stock tools, external CRMs, file uploads and other additional requirements are reviewed separately. You receive an agreed scope before extra work begins.",
    sections: [
      { title: "The included connection is clearly defined.", paragraphs: ["The standard package connects the agreed form on your Ingenium website to the agreed records in your Ingenium CRM. That connection is part of the build price.", "Someone has found your business, looked through your services and decided to enquire. The next person they speak to should be able to see what they asked for. We agree what the form collects and where those details belong."] },
      { title: "See the enquiry journey.", paragraphs: ["In a walkthrough, we can show how the agreed information moves from a website form into a customer record and how a team member handles the next step.", "You can bring a sample of your current process so the conversation stays relevant to your business."], link: { href: "/demo?service=connected", label: "Request a walkthrough" } },
    ],
    faqs: [
      { question: "What do you mean by built together?", answer: "We plan the website form and the CRM record in the same project. The agreed fields and connection are tested together before launch." },
      { question: "Is the connection an extra charge?", answer: "The standard connection described in the package is included. Connections to other systems, additional forms or unusual data requirements are agreed separately." },
      { question: "Do all integrations come with the package?", answer: "No. The package covers the specified Ingenium website-to-CRM connection. Tell us which other tools need to be involved and we will scope those requirements." },
      { question: "Does every next step happen automatically?", answer: "Your team reviews and progresses enquiries in the agreed CRM process. If you want to automate a particular action, we discuss and scope that separately." },
      { question: "Can we begin with one part?", answer: "Yes. Website and CRM projects are also available separately. We can discuss the most useful starting point and any later work it may require." },
      { question: "What if our process is more complicated?", answer: "We begin with discovery when the requirements do not fit the standard package. That lets us review your data, systems and responsibilities before committing to a build scope." },
    ],
    closing: { title: "Start with one real enquiry.", body: "Show us where it arrives, who responds and what happens afterwards. We will use that to discuss whether a connected website and CRM would help." },
  },
  {
    slug: "ecommerce", name: "Ecommerce", packageName: "Commerce Launch",
    title: "Make your products easier to buy online.",
    description: "An online shop needs clear product information, a straightforward checkout and an order process your team can manage. We scope those parts together before building.",
    cta: "Discuss your online shop", href: "/contact?service=ecommerce", setup: "From €3,500", monthly: "From €199", annual: "€5,888",
    audience: "For a defined storefront with straightforward product and delivery requirements.",
    benefitsTitle: "Start with how you sell.",
    benefits: [
      { title: "Product information people can use", body: "Organise descriptions, photographs and the details that help customers choose." },
      { title: "A checkout that matches the sale", body: "Plan payment, delivery choices and the information required to place an order." },
      { title: "A workable order process", body: "Agree how your team will see orders, handle changes and manage routine customer questions." },
    ],
    includes: ["Up to 50 simple products supplied in an agreed format", "One currency", "One agreed payment provider", "Straightforward shipping configuration", "Placement of the policy content you supply", "A test purchase and refund check", "A handover session"],
    care: "The monthly service includes up to 1.5 hours of care for the agreed storefront.",
    exclusions: "Platform subscriptions, paid apps and payment-provider fees are additional. Product photography, complex variants, stock or ERP connections and multi-market selling need a separate scope.",
    sections: [
      { title: "Choose the right starting point.", paragraphs: ["We review your product range, the information customers need and what happens after an order is placed. That helps us choose an appropriate storefront and agree the work around it."] },
      { title: "What we need from you.", paragraphs: ["We agree the product information, images, prices and fulfilment details before the build. You approve your tax settings, delivery terms, returns policy and other trading information. If any of these are still being decided, we factor that into the project plan."] },
    ],
    faqs: [
      { question: "Which ecommerce platform do you use?", answer: "We choose the platform after reviewing the shop's requirements and the services your team already uses. The platform and its charges are identified in the proposal." },
      { question: "Can you connect our stock system?", answer: "We can review the requirement. Stock connections are additional work and depend on the systems, data and access involved." },
      { question: "Can we sell products and take service enquiries?", answer: "Yes, both can be considered in the same website scope. Tell us which purchases can happen online and which need a conversation first." },
      { question: "Do you write our trading policies?", answer: "You supply and approve the trading and policy content. We place it in the agreed areas of the site. Specialist policy advice is outside the standard build." },
    ],
    closing: { title: "Tell us about your products and orders.", body: "Let us know what you sell, approximately how many products you have and which systems your team uses. We will discuss the right starting scope." },
  },
];

export function getOffer(slug: string): Offer {
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) throw new Error(`Unknown offer: ${slug}`);
  return offer;
}
