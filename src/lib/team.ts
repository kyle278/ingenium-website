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
}

export const teamMembers: TeamMemberRecord[] = [
  {
    name: "Kyle Redmond",
    role: "Founder and Developer",
    email: "kyle@ingeniumconsulting.net",
    linkedinUrl: "https://www.linkedin.com/in/kyle-redmond-2020/",
    category: "Leadership",
    initials: "KR",
    accent: "from-[rgba(0,87,191,0.18)] via-white to-[rgba(0,103,102,0.14)]",
    summary:
      "Kyle leads delivery architecture, product implementation, and the technical decisions that keep websites, CRM, and automation working as one operating system.",
    focus: ["Web architecture", "CRM implementation", "Automation design"],
  },
  {
    name: "Clayton Long",
    role: "Co-owner and Sales Lead",
    email: "clayton@ingeniumconsulting.net",
    linkedinUrl: "https://www.linkedin.com/in/clayton-long-518201368/",
    category: "Sales",
    initials: "CL",
    accent: "from-[rgba(0,103,102,0.16)] via-white to-[rgba(0,87,191,0.10)]",
    summary:
      "Clayton owns commercial conversations, qualification, and sales process clarity so prospects understand the work, the rollout, and the right next step quickly.",
    focus: ["Sales discovery", "Commercial fit", "Buyer guidance"],
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
    focus: ["Brand design", "Page layouts", "Visual consistency"],
  },
];
