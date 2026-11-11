export const enquiryExamples = [
  {
    id: "landscaping",
    label: "Landscaping",
    request: "Patio and side path",
    fields: [["Service", "Patio installation"], ["Location", "Carlow"], ["Timing", "Before spring"], ["Site notes", "Side access is through a gate"]],
    owner: "Office coordinator",
    action: "Call to arrange a site visit",
    due: "Thursday, 10 am",
    stage: "Waiting for site visit",
    acknowledgement: "Thanks for your request. We’ll call to talk through the job and arrange a visit.",
  },
  {
    id: "cleaning",
    label: "Commercial cleaning",
    request: "Weekly office cleaning",
    fields: [["Service", "Commercial cleaning"], ["Location", "Kilkenny"], ["Frequency", "Three evenings per week"], ["Site notes", "Facilities manager can meet on Tuesday"]],
    owner: "Contracts coordinator",
    action: "Send the cleaning quote after the survey",
    due: "Friday, 2 pm",
    stage: "Survey done · quote to send",
    acknowledgement: "Thanks for getting in touch. We’ll contact you to discuss the site and arrange a survey.",
  },
  {
    id: "windows",
    label: "Window installation",
    request: "Replacement windows for a house",
    fields: [["Service", "Window replacement"], ["Location", "Waterford"], ["Property", "Two-storey house"], ["Timing", "Looking for a survey this month"]],
    owner: "Showroom coordinator",
    action: "Call the customer to agree a survey date",
    due: "Wednesday, 11 am",
    stage: "Survey to arrange",
    acknowledgement: "Thanks for asking about replacement windows. We’ll call to discuss the job and arrange a survey.",
  },
] as const;

export type EnquiryExample = (typeof enquiryExamples)[number];
export type EnquiryExampleId = EnquiryExample["id"];

export function getEnquiryExample(value: unknown): EnquiryExample | undefined {
  return enquiryExamples.find(example => example.id === value);
}

export function enquiryExamplePath(id: EnquiryExampleId) {
  return `/business-growth?example=${id}#enquiry-demo`;
}
