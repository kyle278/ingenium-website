import type { StaticImageData } from "next/image";

import claytonHeadshot from "../../ingeniumTeam/clayton long.jpg";
import kyleHeadshot from "../../ingeniumTeam/kyle redmond.jpg";
import sophieHeadshot from "../../ingeniumTeam/Sophie_Headshot.jpg";

export interface TeamMemberRecord {
  name: string;
  role: string;
  email: string;
  linkedinUrl: string;
  category: string;
  initials: string;
  accent: string;
  summary: string;
  focus: string[];
  image: StaticImageData;
  imageClassName?: string;
}

export const teamMembers: TeamMemberRecord[] = [
  {
    name: "Kyle Redmond",
    role: "Founder / Delivery",
    email: "kyle@ingeniumconsulting.net",
    linkedinUrl: "https://www.linkedin.com/in/kyle-redmond-2020/",
    category: "Founder / Delivery",
    initials: "KR",
    accent: "from-[rgba(0,87,191,0.18)] via-white to-[rgba(0,103,102,0.14)]",
    summary:
      "Kyle leads delivery architecture, product implementation, and the technical decisions that keep websites, CRM, and automation working as one operating system.",
    focus: ["Web design", "CRM development", "Automation and AI design"],
    image: kyleHeadshot,
  },
  {
    name: "Clayton Long",
    role: "Co-Owner / Sales",
    email: "clayton@ingeniumconsulting.net",
    linkedinUrl: "https://www.linkedin.com/in/clayton-long-518201368/",
    category: "Co-Owner / Sales",
    initials: "CL",
    accent: "from-[rgba(0,103,102,0.16)] via-white to-[rgba(0,87,191,0.10)]",
    summary:
      "Clayton owns commercial conversations, qualification, and sales process clarity so prospects understand the work, the rollout, and the right next step quickly.",
    focus: ["Sales discovery", "Commercial fit", "Buyer guidance"],
    image: claytonHeadshot,
    imageClassName: "grayscale",
  },
  {
    name: "Sophie Coleman",
    role: "Graphic Designer",
    email: "sophie@ingeniumconsulting.net",
    linkedinUrl: "https://www.linkedin.com/in/sophie-coleman-912384205/",
    category: "Design",
    initials: "SC",
    accent: "from-[rgba(24,28,31,0.08)] via-white to-[rgba(0,87,191,0.12)]",
    summary:
      "Sophie shapes the visual system across brand, layout, and presentation so the work feels polished, legible, and commercially credible from first impression onward.",
    focus: ["Graphic design", "Brand guidelines", "Design Consulting"],
    image: sophieHeadshot,
  },
];
