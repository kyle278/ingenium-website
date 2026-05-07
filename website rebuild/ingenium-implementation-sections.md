# Ingenium Consulting — Implementation Sections

This document contains production-ready page sections for the new site using the Ingenium brand. Each section includes a Tailwind/HTML implementation and an optional React component version.

---

## Global Tailwind Theme

Add this theme extension to `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFBFD",
        surface: "#FFFFFF",
        surfaceSoft: "#F1F5F9",
        text: "#14243D",
        muted: "#55647B",
        primary: "#1767C3",
        primaryDark: "#164EA0",
        secondary: "#13B7A8",
        accent: "#F5A623",
        border: "#D9E2EC",
      },
      boxShadow: {
        soft: "0 18px 40px rgba(20,36,61,0.08)",
      },
      borderRadius: {
        xl: "28px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

Add this base CSS in `src/index.css` or `globals.css`:

```css
:root {
  color-scheme: light;
  background: #FAFBFD;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", system-ui, sans-serif;
  background: radial-gradient(circle at top left, rgba(23,103,195,0.12), transparent 24%),
    radial-gradient(circle at bottom right, rgba(19,183,168,0.08), transparent 26%),
    #FAFBFD;
  color: #14243D;
}
::selection {
  background: rgba(23,103,195,0.14);
}
```

---

## Homepage Hero

### Tailwind / HTML

```html
<section class="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-4 lg:max-w-xl">
        <span class="inline-flex items-center rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary">
          Connected website, CRM, marketing, AI
        </span>
        <h1 class="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
          Launch a connected website that works with your CRM, marketing tools, and AI.
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-muted">
          Ingenium Consulting builds websites that do more than launch — they become the center of your growth engine.
          Capture leads, automate campaigns, and let AI keep your business moving forward.
        </p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <a href="/demo" class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5">
            Book a demo
          </a>
          <a href="#how" class="inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-text transition hover:bg-surfaceSoft">
            See how it works
          </a>
        </div>
        <p class="text-sm text-muted">Get a website, CRM and AI automation designed to work together from day one.</p>
      </div>

      <div class="relative lg:w-[520px]">
        <div class="rounded-[36px] border border-border bg-gradient-to-b from-white to-surfaceSoft p-6 shadow-soft">
          <div class="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Live platform preview
          </div>
          <div class="mt-8 rounded-[28px] bg-white p-6 shadow-xl ring-1 ring-border">
            <div class="mb-6 flex items-center justify-between">
              <span class="inline-flex h-3.5 w-3.5 rounded-full bg-secondary"></span>
              <span class="text-sm font-semibold text-muted">Growth dashboard</span>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                <span class="text-sm text-muted">Conversion lift</span>
                <strong class="text-xl text-text">18%</strong>
              </div>
              <div class="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                <span class="text-sm text-muted">Active campaigns</span>
                <strong class="text-xl text-text">42</strong>
              </div>
              <div class="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                <span class="text-sm text-muted">AI recommendations</span>
                <strong class="text-xl text-text">5</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### React Component

```tsx
export function HomepageHero() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-xl">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary">
              Connected website, CRM, marketing, AI
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Launch a connected website that works with your CRM, marketing tools, and AI.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Ingenium Consulting builds websites that do more than launch — they become the center of your growth engine.
              Capture leads, automate campaigns, and let AI keep your business moving forward.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/demo" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5">
                Book a demo
              </a>
              <a href="#how" className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-text transition hover:bg-surfaceSoft">
                See how it works
              </a>
            </div>
            <p className="text-sm text-muted">Get a website, CRM and AI automation designed to work together from day one.</p>
          </div>

          <div className="relative lg:w-[520px]">
            <div className="rounded-[36px] border border-border bg-gradient-to-b from-white to-surfaceSoft p-6 shadow-soft">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Live platform preview
              </div>
              <div className="mt-8 rounded-[28px] bg-white p-6 shadow-xl ring-1 ring-border">
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex h-3.5 w-3.5 rounded-full bg-secondary"></span>
                  <span className="text-sm font-semibold text-muted">Growth dashboard</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                    <span className="text-sm text-muted">Conversion lift</span>
                    <strong className="text-xl text-text">18%</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                    <span className="text-sm text-muted">Active campaigns</span>
                    <strong className="text-xl text-text">42</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-surfaceSoft px-4 py-4">
                    <span className="text-sm text-muted">AI recommendations</span>
                    <strong className="text-xl text-text">5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Homepage Why Section

### Tailwind / HTML

```html
<section id="why" class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-text sm:text-4xl">Why Ingenium</h2>
      <p class="mt-4 text-lg leading-8 text-muted">Your website should not be a separate tool. We connect your site, CRM, and marketing so every lead becomes part of a single growth system.</p>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-3">
      <article class="rounded-[24px] border border-border bg-surface p-8 shadow-soft">
        <div class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm0 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7Z"/></svg>
        </div>
        <h3 class="text-xl font-semibold text-text">Connected data</h3>
        <p class="mt-4 text-base leading-7 text-muted">Every form, chat, and campaign updates your CRM in real time so leads stay in sync.</p>
      </article>
      <article class="rounded-[24px] border border-border bg-surface p-8 shadow-soft">
        <div class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18h16M5 8h14M9 4l3 4 3-4"/></svg>
        </div>
        <h3 class="text-xl font-semibold text-text">AI-assisted workflows</h3>
        <p class="mt-4 text-base leading-7 text-muted">Smart agents act on your business data to automate follow-up and campaign actions.</p>
      </article>
      <article class="rounded-[24px] border border-border bg-surface p-8 shadow-soft">
        <div class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17h16M8 12h8M10 7h4"/></svg>
        </div>
        <h3 class="text-xl font-semibold text-text">Built for growth</h3>
        <p class="mt-4 text-base leading-7 text-muted">Fast launches, easy campaigns, and clear measurement designed for startups and SMEs.</p>
      </article>
    </div>
  </div>
</section>
```

### React Component

```tsx
export function HomepageWhy() {
  return (
    <section id="why" className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Why Ingenium</h2>
          <p className="mt-4 text-lg leading-8 text-muted">Your website should not be a separate tool. We connect your site, CRM, and marketing so every lead becomes part of a single growth system.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Connected data",
              description: "Every form, chat, and campaign updates your CRM in real time so leads stay in sync.",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm0 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7Z"/></svg>
              ),
              color: "primary/10",
              textColor: "primary",
            },
            {
              title: "AI-assisted workflows",
              description: "Smart agents act on your business data to automate follow-up and campaign actions.",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h16M5 8h14M9 4l3 4 3-4"/></svg>
              ),
              color: "secondary/10",
              textColor: "secondary",
            },
            {
              title: "Built for growth",
              description: "Fast launches, easy campaigns, and clear measurement designed for startups and SMEs.",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17h16M8 12h8M10 7h4"/></svg>
              ),
              color: "accent/10",
              textColor: "accent",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[24px] border border-border bg-surface p-8 shadow-soft">
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-${item.color} text-${item.textColor}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-text">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Platform Page Key Section

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Platform</p>
        <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">One operating layer across acquisition, CRM execution, handoff, reporting, and governed AI support.</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">Ingenium is most useful when the whole buyer and delivery path is connected instead of patched together.</p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="/platform" class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft">See the platform</a>
          <a href="/demo" class="inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-text">Book a demo</a>
        </div>
      </div>

      <div class="rounded-[32px] border border-border bg-surface p-8 shadow-soft">
        <div class="space-y-6">
          <article class="rounded-3xl bg-surfaceSoft p-6">
            <p class="text-sm font-semibold text-secondary">Workflow</p>
            <h2 class="mt-3 text-2xl font-bold text-text">One journey from first click to fulfilment.</h2>
            <p class="mt-4 text-base leading-7 text-muted">The platform is most useful when acquisition, sales, delivery, and reporting all read from the same operating story.</p>
          </article>
          <div class="grid gap-4">
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">01</p>
              <h3 class="mt-2 text-xl font-semibold text-text">Lead captured</h3>
              <p class="mt-2 text-sm leading-6 text-muted">A website form creates a real record with source and service context.</p>
            </div>
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">02</p>
              <h3 class="mt-2 text-xl font-semibold text-text">Automatically routed</h3>
              <p class="mt-2 text-sm leading-6 text-muted">The right owner, SLA, and lifecycle stage are set immediately.</p>
            </div>
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">03</p>
              <h3 class="mt-2 text-xl font-semibold text-text">AI assists</h3>
              <p class="mt-2 text-sm leading-6 text-muted">Ingenium prepares next steps, summaries, and draft outreach for review.</p>
            </div>
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">04</p>
              <h3 class="mt-2 text-xl font-semibold text-text">Team executes</h3>
              <p class="mt-2 text-sm leading-6 text-muted">Sales and ops work from the same record instead of bouncing between tools.</p>
            </div>
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">05</p>
              <h3 class="mt-2 text-xl font-semibold text-text">Delivery tracked</h3>
              <p class="mt-2 text-sm leading-6 text-muted">Handoff stays connected after the deal is won.</p>
            </div>
            <div class="rounded-3xl border border-border bg-white p-6">
              <p class="text-sm font-semibold text-muted">06</p>
              <h3 class="mt-2 text-xl font-semibold text-text">Reports update</h3>
              <p class="mt-2 text-sm leading-6 text-muted">Leadership sees cleaner pipeline, activity, and delivery signals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### React Component

```tsx
const platformSteps = [
  { index: "01", title: "Lead captured", text: "A website form creates a real record with source and service context." },
  { index: "02", title: "Automatically routed", text: "The right owner, SLA, and lifecycle stage are set immediately." },
  { index: "03", title: "AI assists", text: "Ingenium prepares next steps, summaries, and draft outreach for review." },
  { index: "04", title: "Team executes", text: "Sales and ops work from the same record instead of bouncing between tools." },
  { index: "05", title: "Delivery tracked", text: "Handoff stays connected after the deal is won." },
  { index: "06", title: "Reports update", text: "Leadership sees cleaner pipeline, activity, and delivery signals." },
]

export function PlatformSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Platform</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">One operating layer across acquisition, CRM execution, handoff, reporting, and governed AI support.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Ingenium is most useful when the whole buyer and delivery path is connected instead of patched together.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="/platform" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft">See the platform</a>
              <a href="/demo" className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-text">Book a demo</a>
            </div>
          </div>
          <div className="rounded-[32px] border border-border bg-surface p-8 shadow-soft">
            <div className="space-y-6">
              <article className="rounded-3xl bg-surfaceSoft p-6">
                <p className="text-sm font-semibold text-secondary">Workflow</p>
                <h2 className="mt-3 text-2xl font-bold text-text">One journey from first click to fulfilment.</h2>
                <p className="mt-4 text-base leading-7 text-muted">The platform is most useful when acquisition, sales, delivery, and reporting all read from the same operating story.</p>
              </article>
              <div className="grid gap-4">
                {platformSteps.map((step) => (
                  <div key={step.index} className="rounded-3xl border border-border bg-white p-6">
                    <p className="text-sm font-semibold text-muted">{step.index}</p>
                    <h3 className="mt-2 text-xl font-semibold text-text">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Services Page Highlights

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Services</p>
        <h2 class="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Services for connected growth</h2>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">We build websites, custom CRMs, and marketing automation that work together as one system.</p>
      </div>
      <div class="rounded-[32px] bg-surface p-8 shadow-soft ring-1 ring-border">
        <h3 class="text-lg font-semibold text-text">Start with a discovery call</h3>
        <p class="mt-4 text-sm leading-7 text-muted">We learn your current toolbox, your growth goals, and the operating gaps that matter most.</p>
        <a href="/contact" class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-4 text-base font-semibold text-white">Start a discovery call</a>
      </div>
    </div>

    <div class="mt-16 grid gap-6 lg:grid-cols-2">
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">Custom website development</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">High-performance websites built to capture leads.</h3>
        <p class="mt-4 text-base leading-7 text-muted">High-performance websites designed to capture leads, support your brand, and feed your revenue operating system.</p>
      </article>
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">CRM integration</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">Custom CRM workflows that keep handoffs clean.</h3>
        <p class="mt-4 text-base leading-7 text-muted">A custom CRM tailored to your business workflows, ownership rules, and handoff continuity.</p>
      </article>
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">Marketing automation</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">Automation that runs from the same data source.</h3>
        <p class="mt-4 text-base leading-7 text-muted">Launch email, SMS, and nurture journeys from your data without manual handoffs.</p>
      </article>
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">AI-enabled workflows</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">AI that supports review, not replaces it.</h3>
        <p class="mt-4 text-base leading-7 text-muted">AI assistants help draft next steps, prepare outreach, and keep follow-up moving through approvals.</p>
      </article>
    </div>
  </div>
</section>
```

### React Component

```tsx
const services = [
  {
    label: "Custom website development",
    title: "High-performance websites built to capture leads.",
    text: "High-performance websites designed to capture leads, support your brand, and feed your revenue operating system.",
  },
  {
    label: "CRM integration",
    title: "Custom CRM workflows that keep handoffs clean.",
    text: "A custom CRM tailored to your business workflows, ownership rules, and handoff continuity.",
  },
  {
    label: "Marketing automation",
    title: "Automation that runs from the same data source.",
    text: "Launch email, SMS, and nurture journeys from your data without manual handoffs.",
  },
  {
    label: "AI-enabled workflows",
    title: "AI that supports review, not replaces it.",
    text: "AI assistants help draft next steps, prepare outreach, and keep follow-up moving through approvals.",
  },
]

export function ServicesSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Services</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Services for connected growth</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">We build websites, custom CRMs, and marketing automation that work together as one system.</p>
          </div>
          <div className="rounded-[32px] bg-surface p-8 shadow-soft ring-1 ring-border">
            <h3 className="text-lg font-semibold text-text">Start with a discovery call</h3>
            <p className="mt-4 text-sm leading-7 text-muted">We learn your current toolbox, your growth goals, and the operating gaps that matter most.</p>
            <a href="/contact" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-4 text-base font-semibold text-white">Start a discovery call</a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.label} className="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
              <p className="text-sm font-semibold text-secondary">{service.label}</p>
              <h3 className="mt-4 text-2xl font-semibold text-text">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Proof / Case Studies Section

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="max-w-2xl">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Proof</p>
      <h2 class="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Proof that the operating model works</h2>
      <p class="mt-4 text-lg leading-8 text-muted">Case studies for service businesses that changed how leads, teams, and delivery connect.</p>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-3">
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">Carlow Hearing</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">Conversion architecture shaped around patient trust.</h3>
        <p class="mt-4 text-base leading-7 text-muted">Ingenium structured the site around the patient decision journey: clinic reassurance, service education, pricing clarity, testimonials, and a dedicated grant route.</p>
        <a href="/case-studies/carlow-hearing" class="mt-6 inline-flex items-center text-sm font-semibold text-primary">View full case study →</a>
      </article>
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">Kenny Construction</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">Project library and quality-first workflow.</h3>
        <p class="mt-4 text-base leading-7 text-muted">Ingenium paired service architecture with a reusable project library and a dedicated safety and quality section to handle trust objections earlier.</p>
        <a href="/case-studies/kenny-construction" class="mt-6 inline-flex items-center text-sm font-semibold text-primary">View full case study →</a>
      </article>
      <article class="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
        <p class="text-sm font-semibold text-secondary">Holland Pianos</p>
        <h3 class="mt-4 text-2xl font-semibold text-text">Information architecture for complex product choice.</h3>
        <p class="mt-4 text-base leading-7 text-muted">Ingenium built a fuller information architecture with product hubs, service subpages, and sales enquiry flow for piano buyers.</p>
        <a href="/case-studies/holland-pianos" class="mt-6 inline-flex items-center text-sm font-semibold text-primary">View full case study →</a>
      </article>
    </div>
  </div>
</section>
```

### React Component

```tsx
const proofCases = [
  {
    title: "Carlow Hearing",
    headline: "Conversion architecture shaped around patient trust.",
    description: "Ingenium structured the site around the patient decision journey: clinic reassurance, service education, pricing clarity, testimonials, and a dedicated grant route.",
    href: "/case-studies/carlow-hearing",
  },
  {
    title: "Kenny Construction",
    headline: "Project library and quality-first workflow.",
    description: "Ingenium paired service architecture with a reusable project library and a dedicated safety and quality section to handle trust objections earlier.",
    href: "/case-studies/kenny-construction",
  },
  {
    title: "Holland Pianos",
    headline: "Information architecture for complex product choice.",
    description: "Ingenium built a fuller information architecture with product hubs, service subpages, and sales enquiry flow for piano buyers.",
    href: "/case-studies/holland-pianos",
  },
]

export function ProofSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Proof</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Proof that the operating model works</h2>
          <p className="mt-4 text-lg leading-8 text-muted">Case studies for service businesses that changed how leads, teams, and delivery connect.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {proofCases.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
              <p className="text-sm font-semibold text-secondary">{item.title}</p>
              <h3 className="mt-4 text-2xl font-semibold text-text">{item.headline}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
              <a href={item.href} className="mt-6 inline-flex items-center text-sm font-semibold text-primary">View full case study →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Contact / Demo Hub

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20" id="contact">
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
        <h2 class="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Choose the buying path that matches the question you need answered.</h2>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-muted">Three entry points. Three clearer next steps.</p>
      </div>
      <div class="rounded-[32px] bg-surface p-8 shadow-soft ring-1 ring-border">
        <div class="space-y-6">
          <div>
            <p class="text-sm font-semibold text-secondary">Book Demo</p>
            <p class="mt-2 text-base leading-7 text-muted">See the operating model, the workflow handoff, and where your team fits.</p>
            <a href="/demo" class="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white">Book Demo</a>
          </div>
          <div>
            <p class="text-sm font-semibold text-secondary">Revenue Systems Teardown</p>
            <p class="mt-2 text-base leading-7 text-muted">Map the gaps between your website, CRM, automation, delivery handoff, and reporting.</p>
            <a href="/revenue-systems-teardown" class="mt-4 inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text">Revenue Systems Teardown</a>
          </div>
          <div>
            <p class="text-sm font-semibold text-secondary">Technical Review</p>
            <p class="mt-2 text-base leading-7 text-muted">Give technical stakeholders a clear route into architecture, controls, and review material.</p>
            <a href="/technical-review" class="mt-4 inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text">Technical Review</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### React Component

```tsx
export function ContactHub() {
  const paths = [
    {
      title: "Book Demo",
      text: "See the operating model, the workflow handoff, and where your team fits.",
      href: "/demo",
      primary: true,
    },
    {
      title: "Revenue Systems Teardown",
      text: "Map the gaps between your website, CRM, automation, delivery handoff, and reporting.",
      href: "/revenue-systems-teardown",
    },
    {
      title: "Technical Review",
      text: "Give technical stakeholders a clear route into architecture, controls, and review material.",
      href: "/technical-review",
    },
  ]

  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20" id="contact">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">Choose the buying path that matches the question you need answered.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Three entry points. Three clearer next steps.</p>
          </div>
          <div className="rounded-[32px] bg-surface p-8 shadow-soft ring-1 ring-border">
            <div className="space-y-6">
              {paths.map((path) => (
                <div key={path.title}>
                  <p className="text-sm font-semibold text-secondary">{path.title}</p>
                  <p className="mt-2 text-base leading-7 text-muted">{path.text}</p>
                  <a
                    href={path.href}
                    className={`mt-4 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold ${
                      path.primary ? "bg-gradient-to-r from-primary to-secondary text-white" : "border border-border text-text"
                    }`}
                  >
                    {path.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Contact Page Form Section

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-4xl">
    <div class="rounded-[32px] border border-border bg-surface p-10 shadow-soft">
      <h2 class="text-3xl font-bold text-text">Book a demo or ask a question</h2>
      <p class="mt-4 text-lg leading-8 text-muted">Tell us about your business and we’ll show you how a connected website, CRM, and AI workflow can work for you.</p>

      <form action="/api/contact" method="POST" class="mt-10 grid gap-6">
        <div class="grid gap-6 sm:grid-cols-2">
          <label class="block">
            <span class="text-sm font-semibold text-text">Name</span>
            <input type="text" name="name" required class="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
          <label class="block">
            <span class="text-sm font-semibold text-text">Work Email</span>
            <input type="email" name="email" required class="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <label class="block">
            <span class="text-sm font-semibold text-text">Company</span>
            <input type="text" name="company" class="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
          <label class="block">
            <span class="text-sm font-semibold text-text">I want help with</span>
            <select name="need" class="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Website</option>
              <option>CRM</option>
              <option>Marketing automation</option>
              <option>AI integration</option>
              <option>All of the above</option>
            </select>
          </label>
        </div>
        <label class="block">
          <span class="text-sm font-semibold text-text">Tell us a bit about your goals</span>
          <textarea name="message" rows="6" class="mt-2 w-full rounded-[28px] border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"></textarea>
        </label>
        <button type="submit" class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft">Send request</button>
      </form>
    </div>
  </div>
</section>
```

### React Component

```tsx
export function ContactForm() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[32px] border border-border bg-surface p-10 shadow-soft">
          <h2 className="text-3xl font-bold text-text">Book a demo or ask a question</h2>
          <p className="mt-4 text-lg leading-8 text-muted">Tell us about your business and we’ll show you how a connected website, CRM, and AI workflow can work for you.</p>

          <form action="/api/contact" method="POST" className="mt-10 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-text">Name</span>
                <input name="name" required className="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-text">Work Email</span>
                <input type="email" name="email" required className="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-text">Company</span>
                <input name="company" className="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-text">I want help with</span>
                <select name="need" className="mt-2 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option>Website</option>
                  <option>CRM</option>
                  <option>Marketing automation</option>
                  <option>AI integration</option>
                  <option>All of the above</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-text">Tell us a bit about your goals</span>
              <textarea name="message" rows={6} className="mt-2 w-full rounded-[28px] border border-border bg-surface px-5 py-4 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"></textarea>
            </label>
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-soft">Send request</button>
          </form>
        </div>
      </div>
    </section>
  )
}
```

---

## About Page Section

### Tailwind / HTML

```html
<section class="px-6 py-16 sm:px-10 lg:px-20">
  <div class="mx-auto max-w-6xl">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">About</p>
        <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">We make powerful digital systems feel friendly, useful, and easy to own.</h1>
        <p class="mt-6 text-lg leading-8 text-muted">Ingenium Consulting helps service businesses run acquisition, CRM execution, handoff, reporting, and governed AI support in one accountable operating system.</p>
      </div>
      <div class="space-y-6 rounded-[32px] border border-border bg-surface p-8 shadow-soft">
        <div>
          <h2 class="text-lg font-semibold text-text">Our mission</h2>
          <p class="mt-3 text-base leading-7 text-muted">Help startups and SMEs grow with intelligent digital systems that connect websites, CRMs, and marketing.</p>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-text">Our approach</h2>
          <ul class="mt-4 space-y-4 text-base leading-7 text-muted">
            <li><strong>Design with purpose</strong> — Every website is built for conversion, clarity, and connection.</li>
            <li><strong>Build the system</strong> — We link your site, CRM, and marketing so data moves without friction.</li>
            <li><strong>Keep improving</strong> — Automation and AI are tuned over time to help your business grow.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

### React Component

```tsx
export function AboutSection() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">About</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">We make powerful digital systems feel friendly, useful, and easy to own.</h1>
            <p className="mt-6 text-lg leading-8 text-muted">Ingenium Consulting helps service businesses run acquisition, CRM execution, handoff, reporting, and governed AI support in one accountable operating system.</p>
          </div>
          <div className="space-y-6 rounded-[32px] border border-border bg-surface p-8 shadow-soft">
            <div>
              <h2 className="text-lg font-semibold text-text">Our mission</h2>
              <p className="mt-3 text-base leading-7 text-muted">Help startups and SMEs grow with intelligent digital systems that connect websites, CRMs, and marketing.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text">Our approach</h2>
              <ul className="mt-4 space-y-4 text-base leading-7 text-muted">
                <li><strong>Design with purpose</strong> — Every website is built for conversion, clarity, and connection.</li>
                <li><strong>Build the system</strong> — We link your site, CRM, and marketing so data moves without friction.</li>
                <li><strong>Keep improving</strong> — Automation and AI are tuned over time to help your business grow.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Migration Tip

Use these sections as building blocks for your actual site pages. Import them into a page template or copy the HTML/Tailwind code into your existing templates. Keep the brand voice and layout consistent by using the same spacing, rounded cards, and accent colors.

If you want, I can now build a full React page file for `Home`, `Platform`, and `Contact` using these sections. 