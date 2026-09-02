# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public, English-only marketing landing page for the Daftra-style POS/CRM product at `src/app/page.tsx`, using static content and Tailwind v4.

**Architecture:** One root route (`src/app/page.tsx`) composing small section components from `src/app/_components/`, fed by typed static content in `src/app/_data/landing.ts`. No backend, no DB, no auth. Client-only interactivity (nav menu, pricing toggle, FAQ accordion, industry tabs) lives in the few components that need it; everything else is a server component.

**Tech Stack:** Next.js 16.3.2 (App Router), React 19, TypeScript, Tailwind v4 (already configured in the project).

**Spec:** `docs/superpowers/specs/2026-08-23-landing-page-design.md`

## Global Constraints

- English only, no i18n/RTL in this pass.
- No CMS/backend — content is hardcoded typed constants in `landing.ts`.
- CTA buttons/links point to placeholder routes (`/signup`, `#`) — no real signup wiring.
- No test infra exists in the repo; verification is `next dev` + manual browser check (per spec's Testing section), not automated tests.
- Mobile-first, responsive, Tailwind v4 utility classes, blue/teal primary palette.
- Follow existing project conventions: TypeScript, `src/app/` App Router structure, root layout already sets `lang="en"` and font variables — keep those, don't fight them.

---

### Task 1: Content data layer

**Files:**
- Create: `src/app/_data/landing.ts`

**Interfaces:**
- Produces (consumed by every later component task):
  ```ts
  export type NavLink = { label: string; href: string }
  export type Feature = { title: string; description: string; icon: string } // icon = short label/emoji, no icon lib dependency
  export type Industry = { key: string; label: string; headline: string; description: string }
  export type PricingTier = {
    name: string
    monthlyPrice: number
    yearlyPrice: number
    description: string
    features: string[]
    highlighted?: boolean
  }
  export type Testimonial = { quote: string; name: string; role: string; company: string }
  export type FaqItem = { question: string; answer: string }

  export const navLinks: NavLink[]
  export const features: Feature[]        // 6 items: POS, Inventory, CRM, Invoicing, Reports, Multi-branch
  export const industries: Industry[]     // 4 items: retail, restaurant, salon, services
  export const pricingTiers: PricingTier[] // 4 tiers: Free, Starter, Business, Enterprise
  export const testimonials: Testimonial[] // 3 items
  export const integrations: string[]      // integration names, e.g. ["Stripe", "PayPal", "WhatsApp", "Shopify"]
  export const faqItems: FaqItem[]         // 5 items
  export const trustedLogos: string[]      // placeholder company names, e.g. ["Acme Retail", "Sunset Cafe", ...]
  ```

- [ ] **Step 1: Write `landing.ts` with all types and populated constants**

```ts
// src/app/_data/landing.ts

export type NavLink = { label: string; href: string }
export type Feature = { title: string; description: string; icon: string }
export type Industry = {
  key: string
  label: string
  headline: string
  description: string
}
export type PricingTier = {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  highlighted?: boolean
}
export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}
export type FaqItem = { question: string; answer: string }

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export const features: Feature[] = [
  {
    title: "Point of Sale",
    description:
      "Ring up sales fast with a touch-friendly checkout, offline mode, and receipt printing.",
    icon: "POS",
  },
  {
    title: "Inventory",
    description:
      "Track stock across branches in real time, with low-stock alerts before you run out.",
    icon: "INV",
  },
  {
    title: "CRM",
    description:
      "See every customer's purchase history, loyalty points, and segment them for offers.",
    icon: "CRM",
  },
  {
    title: "Invoicing",
    description:
      "Create and send invoices and estimates, and track paid, unpaid, and overdue at a glance.",
    icon: "INV$",
  },
  {
    title: "Reports",
    description:
      "Sales by staff, branch, or product, plus profit margins — exportable anytime.",
    icon: "RPT",
  },
  {
    title: "Multi-branch",
    description:
      "Run one account across every location with per-branch stock, staff, and reporting.",
    icon: "BR",
  },
]

export const industries: Industry[] = [
  {
    key: "retail",
    label: "Retail",
    headline: "Sell in-store and online from one stock count",
    description:
      "Barcode scanning, variant tracking, and returns handling built for shops of any size.",
  },
  {
    key: "restaurant",
    label: "Restaurant",
    headline: "Table orders to kitchen in seconds",
    description:
      "Menu management, table/order tracking, and split-bill checkout for cafes and restaurants.",
  },
  {
    key: "salon",
    label: "Salon",
    headline: "Bookings and checkout in one flow",
    description:
      "Appointment scheduling, staff commissions, and client history for salons and spas.",
  },
  {
    key: "services",
    label: "Services",
    headline: "Quote, invoice, and get paid faster",
    description:
      "Job estimates, recurring invoices, and payment tracking for service businesses.",
  },
]

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Try the essentials with one branch.",
    features: ["1 branch", "Basic POS", "Up to 50 products", "Email support"],
  },
  {
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "For a single growing shop.",
    features: [
      "1 branch",
      "Full POS + Inventory",
      "Unlimited products",
      "Basic reports",
    ],
  },
  {
    name: "Business",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "For multi-branch teams.",
    features: [
      "Up to 5 branches",
      "CRM + Invoicing",
      "Advanced reports",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For larger operations.",
    features: [
      "Unlimited branches",
      "All features",
      "Dedicated support",
      "Custom onboarding",
    ],
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "Switching cut our checkout time in half and we finally trust our stock numbers.",
    name: "Amina K.",
    role: "Owner",
    company: "Sunset Retail",
  },
  {
    quote:
      "The multi-branch view alone paid for itself in the first month.",
    name: "Youssef R.",
    role: "Operations Manager",
    company: "Cedar Cafes",
  },
  {
    quote:
      "Our staff picked it up in a day. Invoicing that used to take an hour now takes minutes.",
    name: "Lina T.",
    role: "Founder",
    company: "Bloom Salon",
  },
]

export const integrations: string[] = [
  "Stripe",
  "PayPal",
  "WhatsApp",
  "Shopify",
  "QuickBooks",
]

export const faqItems: FaqItem[] = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, upgrade or downgrade anytime from your account settings — changes apply on your next billing cycle.",
  },
  {
    question: "Does it work offline?",
    answer:
      "The POS keeps taking sales offline and syncs automatically once you're back online.",
  },
  {
    question: "How many branches can I add?",
    answer:
      "Depends on your plan — Free and Starter support 1 branch, Business supports up to 5, Enterprise is unlimited.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No. All plans are month-to-month, or save with annual billing. Cancel anytime.",
  },
  {
    question: "Do you support multiple currencies?",
    answer:
      "Yes, set a default currency per branch and accept payments in your customers' currency.",
  },
]

export const trustedLogos: string[] = [
  "Sunset Retail",
  "Cedar Cafes",
  "Bloom Salon",
  "Northgate Services",
  "Harbor Market",
]
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `landing.ts`

- [ ] **Step 3: Commit**

```bash
git add src/app/_data/landing.ts
git commit -m "feat: add landing page content data"
```

---

### Task 2: Nav component

**Files:**
- Create: `src/app/_components/Nav.tsx`

**Interfaces:**
- Consumes: `NavLink[]` from `landing.ts` (Task 1)
- Produces: `export default function Nav(): JSX.Element` — no props, imports `navLinks` directly. Rendered at the top of `page.tsx` (Task 9).

- [ ] **Step 1: Write the component**

```tsx
// src/app/_components/Nav.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { navLinks } from "@/app/_data/landing"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/90 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Daftra<span className="text-teal-600">POS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/signup"
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Start free trial
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-black/[.08] px-6 py-4 md:hidden dark:border-white/[.1]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/signup"
            className="rounded-full bg-teal-600 px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Start free trial
          </Link>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Nav.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/Nav.tsx
git commit -m "feat: add landing page nav"
```

---

### Task 3: Hero + TrustBar components

**Files:**
- Create: `src/app/_components/Hero.tsx`
- Create: `src/app/_components/TrustBar.tsx`

**Interfaces:**
- Consumes: `trustedLogos: string[]` from `landing.ts` (Task 1)
- Produces: `export default function Hero(): JSX.Element`, `export default function TrustBar(): JSX.Element` — both no-prop, rendered in `page.tsx` (Task 9).

- [ ] **Step 1: Write `Hero.tsx`**

```tsx
// src/app/_components/Hero.tsx
import Link from "next/link"

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-20 pt-16 text-center md:pt-24">
      <span className="rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        POS · Inventory · CRM · Invoicing — one app
      </span>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-zinc-50">
        Run your whole business from one dashboard
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Sell in-store, track stock, manage customers, and send invoices —
        without switching apps.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="rounded-full bg-teal-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Start free trial
        </Link>
        <a
          href="#features"
          className="rounded-full border border-black/[.1] px-8 py-3 text-base font-semibold text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
        >
          See features
        </a>
      </div>
      <div className="mt-6 w-full max-w-4xl rounded-2xl border border-black/[.08] bg-zinc-50 p-3 shadow-sm dark:border-white/[.1] dark:bg-zinc-900">
        <div className="flex h-72 items-center justify-center rounded-xl bg-white text-sm text-zinc-400 dark:bg-black dark:text-zinc-600">
          Dashboard preview
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `TrustBar.tsx`**

```tsx
// src/app/_components/TrustBar.tsx
import { trustedLogos } from "@/app/_data/landing"

export default function TrustBar() {
  return (
    <section className="border-y border-black/[.06] bg-zinc-50 py-8 dark:border-white/[.08] dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
        {trustedLogos.map((name) => (
          <span
            key={name}
            className="text-sm font-medium text-zinc-400 dark:text-zinc-600"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Hero.tsx` or `TrustBar.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/app/_components/Hero.tsx src/app/_components/TrustBar.tsx
git commit -m "feat: add landing page hero and trust bar"
```

---

### Task 4: FeatureGrid component

**Files:**
- Create: `src/app/_components/FeatureGrid.tsx`

**Interfaces:**
- Consumes: `features: Feature[]` from `landing.ts` (Task 1)
- Produces: `export default function FeatureGrid(): JSX.Element`, renders with `id="features"` (anchor target for nav), used in `page.tsx` (Task 9).

- [ ] **Step 1: Write the component**

```tsx
// src/app/_components/FeatureGrid.tsx
import { features } from "@/app/_data/landing"

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Everything your business needs, built in
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          No plugins, no separate subscriptions — one connected system.
        </p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-black/[.08] p-6 dark:border-white/[.1]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              {feature.icon}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `FeatureGrid.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/FeatureGrid.tsx
git commit -m "feat: add landing page feature grid"
```

---

### Task 5: IndustryTabs component

**Files:**
- Create: `src/app/_components/IndustryTabs.tsx`

**Interfaces:**
- Consumes: `industries: Industry[]` from `landing.ts` (Task 1)
- Produces: `export default function IndustryTabs(): JSX.Element`, renders with `id="industries"`, used in `page.tsx` (Task 9).

- [ ] **Step 1: Write the component**

```tsx
// src/app/_components/IndustryTabs.tsx
"use client"

import { useState } from "react"
import { industries } from "@/app/_data/landing"

export default function IndustryTabs() {
  const [activeKey, setActiveKey] = useState(industries[0].key)
  const active = industries.find((i) => i.key === activeKey) ?? industries[0]

  return (
    <section id="industries" className="bg-zinc-50 py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Built for how your business actually runs
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <button
              key={industry.key}
              type="button"
              onClick={() => setActiveKey(industry.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                industry.key === activeKey
                  ? "bg-teal-600 text-white"
                  : "bg-white text-zinc-600 hover:bg-black/[.04] dark:bg-black dark:text-zinc-400 dark:hover:bg-white/[.06]"
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-black/[.08] bg-white p-8 text-center dark:border-white/[.1] dark:bg-black">
          <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {active.headline}
          </h3>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            {active.description}
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `IndustryTabs.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/IndustryTabs.tsx
git commit -m "feat: add landing page industry tabs"
```

---

### Task 6: PricingTable component

**Files:**
- Create: `src/app/_components/PricingTable.tsx`

**Interfaces:**
- Consumes: `pricingTiers: PricingTier[]` from `landing.ts` (Task 1)
- Produces: `export default function PricingTable(): JSX.Element`, renders with `id="pricing"`, used in `page.tsx` (Task 9).

- [ ] **Step 1: Write the component**

```tsx
// src/app/_components/PricingTable.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { pricingTiers } from "@/app/_data/landing"

export default function PricingTable() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Simple pricing, no surprises
        </h2>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/[.1] p-1 dark:border-white/[.15]">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              !yearly
                ? "bg-teal-600 text-white"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              yearly
                ? "bg-teal-600 text-white"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              tier.highlighted
                ? "border-teal-600 ring-1 ring-teal-600"
                : "border-black/[.08] dark:border-white/[.1]"
            }`}
          >
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {tier.description}
            </p>
            <p className="mt-6 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
              ${yearly ? tier.yearlyPrice : tier.monthlyPrice}
              <span className="text-base font-normal text-zinc-500">
                /{yearly ? "yr" : "mo"}
              </span>
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {tier.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`mt-6 rounded-full px-5 py-2 text-center text-sm font-semibold transition-colors ${
                tier.highlighted
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "border border-black/[.1] text-zinc-950 hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
              }`}
            >
              Get started
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `PricingTable.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/PricingTable.tsx
git commit -m "feat: add landing page pricing table"
```

---

### Task 7: Testimonials + IntegrationsStrip components

**Files:**
- Create: `src/app/_components/Testimonials.tsx`
- Create: `src/app/_components/IntegrationsStrip.tsx`

**Interfaces:**
- Consumes: `testimonials: Testimonial[]`, `integrations: string[]` from `landing.ts` (Task 1)
- Produces: `export default function Testimonials(): JSX.Element`, `export default function IntegrationsStrip(): JSX.Element` — both no-prop, used in `page.tsx` (Task 9).

- [ ] **Step 1: Write `Testimonials.tsx`**

```tsx
// src/app/_components/Testimonials.tsx
import { testimonials } from "@/app/_data/landing"

export default function Testimonials() {
  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Trusted by teams like yours
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.1] dark:bg-black"
            >
              <blockquote className="text-zinc-700 dark:text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {t.name}
                </span>
                <span className="text-zinc-500"> · {t.role}, {t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `IntegrationsStrip.tsx`**

```tsx
// src/app/_components/IntegrationsStrip.tsx
import { integrations } from "@/app/_data/landing"

export default function IntegrationsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Integrates with
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {integrations.map((name) => (
          <span
            key={name}
            className="text-base font-medium text-zinc-600 dark:text-zinc-400"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Testimonials.tsx` or `IntegrationsStrip.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/app/_components/Testimonials.tsx src/app/_components/IntegrationsStrip.tsx
git commit -m "feat: add landing page testimonials and integrations strip"
```

---

### Task 8: FAQAccordion + FinalCTA + Footer components

**Files:**
- Create: `src/app/_components/FAQAccordion.tsx`
- Create: `src/app/_components/FinalCTA.tsx`
- Create: `src/app/_components/Footer.tsx`

**Interfaces:**
- Consumes: `faqItems: FaqItem[]`, `navLinks: NavLink[]` from `landing.ts` (Task 1)
- Produces: `export default function FAQAccordion(): JSX.Element` (id="faq"), `export default function FinalCTA(): JSX.Element`, `export default function Footer(): JSX.Element` — all no-prop, used in `page.tsx` (Task 9).

- [ ] **Step 1: Write `FAQAccordion.tsx`**

```tsx
// src/app/_components/FAQAccordion.tsx
"use client"

import { useState } from "react"
import { faqItems } from "@/app/_data/landing"

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
        Frequently asked questions
      </h2>
      <div className="mt-10 divide-y divide-black/[.08] dark:divide-white/[.1]">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={item.question} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-base font-medium text-zinc-950 dark:text-zinc-50"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className="ml-4 text-zinc-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `FinalCTA.tsx`**

```tsx
// src/app/_components/FinalCTA.tsx
import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-teal-600 px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to run your business from one place?
        </h2>
        <p className="max-w-md text-teal-50">
          Start free — no credit card required.
        </p>
        <Link
          href="/signup"
          className="rounded-full bg-white px-8 py-3 text-base font-semibold text-teal-700 transition-colors hover:bg-teal-50"
        >
          Start free trial
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write `Footer.tsx`**

```tsx
// src/app/_components/Footer.tsx
import { navLinks } from "@/app/_data/landing"

export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] py-10 dark:border-white/[.1]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Daftra<span className="text-teal-600">POS</span>
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 dark:text-zinc-400"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="text-sm text-zinc-500">
          © {new Date().getFullYear()} DaftraPOS. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `FAQAccordion.tsx`, `FinalCTA.tsx`, or `Footer.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/FAQAccordion.tsx src/app/_components/FinalCTA.tsx src/app/_components/Footer.tsx
git commit -m "feat: add landing page faq, final cta, and footer"
```

---

### Task 9: Assemble the page and update metadata

**Files:**
- Modify: `src/app/page.tsx` (replace scaffold content entirely)
- Modify: `src/app/layout.tsx:14-17` (update `metadata` title/description)

**Interfaces:**
- Consumes: `Nav`, `Hero`, `TrustBar`, `FeatureGrid`, `IndustryTabs`, `PricingTable`, `Testimonials`, `IntegrationsStrip`, `FAQAccordion`, `FinalCTA`, `Footer` default exports (Tasks 2–8)

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
// src/app/page.tsx
import Nav from "@/app/_components/Nav"
import Hero from "@/app/_components/Hero"
import TrustBar from "@/app/_components/TrustBar"
import FeatureGrid from "@/app/_components/FeatureGrid"
import IndustryTabs from "@/app/_components/IndustryTabs"
import PricingTable from "@/app/_components/PricingTable"
import Testimonials from "@/app/_components/Testimonials"
import IntegrationsStrip from "@/app/_components/IntegrationsStrip"
import FAQAccordion from "@/app/_components/FAQAccordion"
import FinalCTA from "@/app/_components/FinalCTA"
import Footer from "@/app/_components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <IndustryTabs />
        <PricingTable />
        <Testimonials />
        <IntegrationsStrip />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Update metadata in `src/app/layout.tsx`**

Replace the `metadata` export (currently lines 14-17) with:

```tsx
export const metadata: Metadata = {
  title: "DaftraPOS — POS, Inventory, CRM, and Invoicing in one app",
  description:
    "Run your whole business from one dashboard: point of sale, inventory, CRM, and invoicing.",
}
```

- [ ] **Step 3: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: assemble landing page and update metadata"
```

---

### Task 10: Manual verification pass

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Open `http://localhost:3000` in a browser and check**

- All 11 sections render top to bottom with no console errors
- Nav mobile menu toggles at narrow width
- Pricing monthly/yearly toggle updates prices
- Industry tab switch updates headline/description
- FAQ accordion expands/collapses
- Layout holds at mobile (375px), tablet (768px), and desktop (1280px) widths
- Anchor links (`#features`, `#industries`, `#pricing`, `#faq`) scroll to the right section

- [ ] **Step 3: Fix any visual issues found, then re-check**

- [ ] **Step 4: Stop the dev server**

No commit for this task — verification only. If fixes were made in Step 3, commit those under a `fix:` message describing what was wrong.
