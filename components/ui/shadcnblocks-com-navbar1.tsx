"use client";

import Image from "next/image";
import {
  Bot,
  BriefcaseBusiness,
  FolderKanban,
  Layers3,
  LayoutTemplate,
  LineChart,
  Menu,
  ShieldCheck,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MenuChild = {
  title: string;
  url: string;
  description: string;
  icon?: React.ReactNode;
};

type MenuItem = {
  title: string;
  url?: string;
  description?: string;
  items?: MenuChild[];
};

interface Navbar1Props {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
    strapline?: string;
  };
  menu: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  primaryAction: {
    text: string;
    url: string;
  };
  secondaryAction: {
    text: string;
    url: string;
  };
}

function NavAnchor({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function renderMenuItem(item: MenuItem, pathname: string) {
  const active = item.url ? pathname === item.url || pathname.startsWith(`${item.url}/`) : false;
  return { active };
}

function renderMobileMenuItem(item: MenuItem, pathname: string) {
  if (item.items?.length) {
    const isOpen = item.items.some((subItem) => pathname === subItem.url || pathname.startsWith(`${subItem.url}/`));
    return (
      <AccordionItem key={item.title} value={item.title} className="rounded-[24px] border-b-0 bg-[var(--color-panel-low)] px-4">
        <AccordionTrigger
          className={cn(
            "py-4 text-sm font-semibold hover:no-underline",
            isOpen ? "text-[var(--color-brand)]" : "text-[var(--color-text)]",
          )}
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="grid gap-2">
          {item.items.map((subItem) => (
            <NavAnchor
              key={subItem.title}
              className="flex gap-4 rounded-2xl bg-white px-4 py-4 leading-none outline-none transition-colors hover:bg-[var(--color-panel-mid)]"
              href={subItem.url}
            >
              {subItem.icon ? (
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-panel-low)] text-[var(--color-brand)]">
                  {subItem.icon}
                </div>
              ) : null}
              <div>
                <div className="text-sm font-semibold text-[var(--color-text)]">{subItem.title}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-soft)]">{subItem.description}</p>
              </div>
            </NavAnchor>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  if (!item.url) {
    return null;
  }

  return (
    <NavAnchor
      key={item.title}
      href={item.url}
      className={cn(
        "rounded-[24px] px-4 py-4 text-sm font-semibold",
        pathname === item.url || pathname.startsWith(`${item.url}/`)
          ? "bg-white text-[var(--color-brand)]"
          : "bg-[var(--color-panel-low)] text-[var(--color-text)]",
      )}
    >
      {item.title}
    </NavAnchor>
  );
}

function Navbar1({ logo, menu, mobileExtraLinks = [], primaryAction, secondaryAction }: Navbar1Props) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto max-w-[1280px] rounded-[28px] transition-all duration-300",
          scrolled
            ? "ghost-outline bg-[rgba(247,250,254,0.88)] shadow-[0_4px_24px_rgba(24,28,31,0.08)] backdrop-blur-xl"
            : "bg-[rgba(247,250,254,0.78)] shadow-[0_4px_18px_rgba(24,28,31,0.04)] backdrop-blur-lg",
        )}
      >
        <div className="hidden items-center justify-between px-6 py-3 text-[11px] text-[var(--color-text-muted)] lg:flex">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Connected websites. Intelligent growth.
          </p>
          <div className="flex items-center gap-5">
            {mobileExtraLinks.map((link) => (
              <NavAnchor key={link.url} href={link.url} className="hover:text-[var(--color-text)]">
                {link.name}
              </NavAnchor>
            ))}
          </div>
        </div>

        <nav className="hidden items-center justify-between px-5 py-4 lg:flex">
          <div className="flex items-center gap-6">
            <NavAnchor href={logo.url} className="flex items-center gap-3">
              <Image src={logo.src} className="h-7 w-7" alt={logo.alt} width={30} height={30} priority />
              <div className="min-w-0">
                <span className="block font-[var(--font-display)] text-sm font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-base">
                  {logo.title}
                </span>
                {logo.strapline ? (
                  <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {logo.strapline}
                  </span>
                ) : null}
              </div>
            </NavAnchor>
            <div className="flex items-center gap-1">
              {menu.map((item) => {
                const { active } = renderMenuItem(item, pathname);
                const dropdownActive = item.items?.some(
                  (subItem) => pathname === subItem.url || pathname.startsWith(`${subItem.url}/`),
                );

                if (item.items?.length) {
                  const isOpen = openDropdown === item.title;

                  return (
                    <div
                      key={item.title}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.title)}
                      onMouseLeave={() => setOpenDropdown((value) => (value === item.title ? null : value))}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDropdown((value) => (value === item.title ? null : item.title))}
                        className={cn(
                          "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                          dropdownActive || isOpen
                            ? "bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                            : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]",
                        )}
                      >
                        {item.title}
                      </button>

                      {isOpen ? (
                        <div className="absolute left-0 top-full z-20 mt-3 w-[440px] rounded-[28px] border border-[var(--color-line)] bg-[rgba(247,250,254,0.96)] p-3 shadow-[0_18px_50px_rgba(20,36,61,0.12)] backdrop-blur-xl">
                          <div className="grid gap-2">
                            {item.items.map((subItem) => (
                              <NavAnchor
                                key={subItem.title}
                                className={cn(
                                  "block rounded-[22px] border border-transparent bg-white px-4 py-4 transition-colors hover:bg-[var(--color-panel-low)]",
                                  pathname === subItem.url || pathname.startsWith(`${subItem.url}/`)
                                    ? "border-[var(--color-line)] bg-[var(--color-panel-low)]"
                                    : "",
                                )}
                                href={subItem.url}
                              >
                                <div className="flex gap-4">
                                  {subItem.icon ? (
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-panel-low)] text-[var(--color-brand)]">
                                      {subItem.icon}
                                    </div>
                                  ) : null}
                                  <div>
                                    <div className="text-sm font-semibold text-[var(--color-text)]">{subItem.title}</div>
                                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-soft)]">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </div>
                              </NavAnchor>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (!item.url) {
                  return null;
                }

                return (
                  <NavAnchor
                    key={item.title}
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-[var(--color-panel-high)] text-[var(--color-brand)]"
                        : "text-[var(--color-text-soft)] hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]",
                    )}
                    href={item.url}
                  >
                    {item.title}
                  </NavAnchor>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-[var(--color-text-soft)] hover:text-[var(--color-text)]">
              <NavAnchor href={secondaryAction.url}>{secondaryAction.text}</NavAnchor>
            </Button>
            <Button asChild size="sm" className="cta-lift">
              <NavAnchor href={primaryAction.url}>{primaryAction.text}</NavAnchor>
            </Button>
          </div>
        </nav>

        <div className="flex items-center justify-between px-5 py-4 lg:hidden">
          <NavAnchor href={logo.url} className="flex items-center gap-3">
            <Image src={logo.src} className="h-7 w-7" alt={logo.alt} width={30} height={30} priority />
            <div className="min-w-0">
              <span className="block font-[var(--font-display)] text-sm font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-base">
                {logo.title}
              </span>
              {logo.strapline ? (
                <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {logo.strapline}
                </span>
              ) : null}
            </div>
          </NavAnchor>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ghost-outline rounded-full bg-[rgba(255,255,255,0.86)]">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-[rgba(250,251,253,0.98)]">
              <SheetHeader>
                <SheetTitle>
                  <NavAnchor href={logo.url} className="flex items-center gap-3">
                    <Image src={logo.src} className="h-8 w-8" alt={logo.alt} width={32} height={32} />
                    <span>{logo.title}</span>
                  </NavAnchor>
                </SheetTitle>
              </SheetHeader>
              <div className="my-6 flex flex-col gap-6">
                <div className="grid gap-3">
                  <Button asChild className="cta-lift w-full">
                    <NavAnchor href={primaryAction.url}>{primaryAction.text}</NavAnchor>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <NavAnchor href={secondaryAction.url}>{secondaryAction.text}</NavAnchor>
                  </Button>
                </div>

                <Accordion type="single" collapsible className="flex w-full flex-col gap-1">
                  {menu.map((item) => renderMobileMenuItem(item, pathname))}
                </Accordion>

                {mobileExtraLinks.length > 0 ? (
                  <div className="border-t border-[var(--color-line)] py-4">
                    <div className="grid grid-cols-2 gap-2">
                      {mobileExtraLinks.map((link) => (
                        <NavAnchor
                          key={link.url}
                          className="inline-flex min-h-10 items-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
                          href={link.url}
                        >
                          {link.name}
                        </NavAnchor>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}

const ingeniumNavbarData: Navbar1Props = {
  logo: {
    url: "/",
    src: "/logo.svg",
    alt: "Ingenium logo",
    title: "Ingenium Consulting",
    strapline: "Website + CRM + AI",
  },
  menu: [
    { title: "Home", url: "/" },
    {
      title: "Solutions",
      description: "Delivery tracks across website acquisition, CRM, automation, and AI execution.",
      items: [
        {
          title: "Services",
          url: "/services",
          description: "Overview of the connected website, CRM, automation, and AI service stack.",
          icon: <BriefcaseBusiness className="size-5 shrink-0" />,
        },
        {
          title: "Websites",
          url: "/websites",
          description: "Lead-focused sites designed to feed the wider operating system.",
          icon: <LayoutTemplate className="size-5 shrink-0" />,
        },
        {
          title: "CRM",
          url: "/crm",
          description: "Custom pipeline structure, ownership rules, and shared commercial visibility.",
          icon: <Users className="size-5 shrink-0" />,
        },
        {
          title: "Automations",
          url: "/automations",
          description: "Campaign, follow-up, and operational handoffs without brittle manual work.",
          icon: <LineChart className="size-5 shrink-0" />,
        },
        {
          title: "AI Agents",
          url: "/ai-agents",
          description: "AI support embedded into real business workflows rather than running beside them.",
          icon: <Bot className="size-5 shrink-0" />,
        },
        {
          title: "Departments",
          url: "/departments",
          description: "See how marketing, sales, and operations work from one connected system.",
          icon: <Layers3 className="size-5 shrink-0" />,
        },
      ],
    },
    {
      title: "Platform",
      description: "Platform design, governance, and implementation routes.",
      items: [
        {
          title: "Platform Overview",
          url: "/platform",
          description: "The operating layer connecting acquisition, CRM execution, reporting, and AI.",
          icon: <Layers3 className="size-5 shrink-0" />,
        },
        {
          title: "Implementation",
          url: "/implementation",
          description: "How we scope, build, connect, and roll out the system with your team.",
          icon: <BriefcaseBusiness className="size-5 shrink-0" />,
        },
        {
          title: "Security",
          url: "/security",
          description: "Controls, auditability, and operational discipline across the connected stack.",
          icon: <ShieldCheck className="size-5 shrink-0" />,
        },
      ],
    },
    {
      title: "Proof",
      description: "Examples, detailed projects, and diagnostic entry points.",
      items: [
        {
          title: "Case Studies",
          url: "/case-studies",
          description: "Outcome-led examples showing how route structure and systems design improve conversion.",
          icon: <FolderKanban className="size-5 shrink-0" />,
        },
        {
          title: "Projects",
          url: "/projects",
          description: "Browse website delivery work and the service insights behind each build.",
          icon: <LayoutTemplate className="size-5 shrink-0" />,
        },
        {
          title: "Technical Review",
          url: "/technical-review",
          description: "An entry point for teams that need a sharper view of their current setup and risks.",
          icon: <ShieldCheck className="size-5 shrink-0" />,
        },
        {
          title: "Revenue Systems Teardown",
          url: "/revenue-systems-teardown",
          description: "A guided review of acquisition, handoff, automation, and reporting gaps.",
          icon: <LineChart className="size-5 shrink-0" />,
        },
      ],
    },
    {
      title: "Company",
      description: "Who Ingenium is and how to start the conversation.",
      items: [
        {
          title: "About",
          url: "/about",
          description: "The mission, values, and operating philosophy behind Ingenium Consulting.",
          icon: <Users className="size-5 shrink-0" />,
        },
        {
          title: "Team",
          url: "/team",
          description: "Meet the team behind the connected growth system.",
          icon: <Users className="size-5 shrink-0" />,
        },
        {
          title: "Contact",
          url: "/contact",
          description: "Start with a direct conversation about your current stack and next step.",
          icon: <BriefcaseBusiness className="size-5 shrink-0" />,
        },
      ],
    },
  ],
  mobileExtraLinks: [
    { name: "Technical review", url: "/technical-review" },
    { name: "Revenue teardown", url: "/revenue-systems-teardown" },
    { name: "Projects", url: "/projects" },
    { name: "Contact", url: "/contact" },
  ],
  secondaryAction: {
    text: "See the Platform",
    url: "/platform",
  },
  primaryAction: {
    text: "Book Demo",
    url: "/demo",
  },
};

export { Navbar1, ingeniumNavbarData };
