# Landing Page Design — Daftra-style POS/CRM SaaS

Date: 2026-08-23

## Context

New project (Next.js 16.3.2, App Router, React 19, Tailwind v4). No custom
code exists yet beyond the create-next-app scaffold. Building the marketing
landing page as the first sub-project; the authenticated dashboard is a
separate, later spec (needs auth/data-model decisions not yet made).

Reference product: Daftra (cloud POS + invoicing + CRM + inventory SaaS,
MENA market).

## Decisions

- **Language**: English only for this pass. Bilingual EN/AR + RTL is
  deferred to a future spec (would need i18n routing).
- **Content**: hardcoded static data (no CMS, no backend). Structured as
  typed constants so a CMS/API can replace the data source later without
  touching component markup.
- **Auth/signup**: CTA buttons link to placeholder routes (`/signup`,
  `#`); no real signup flow wired yet.

## Architecture

- Route: `src/app/page.tsx` (root `/`) renders the landing page.
- Content data: `src/app/_data/landing.ts` — typed constants (features,
  pricing tiers, testimonials, industries, FAQ items, nav links).
- Components: `src/app/_components/` — one file per section, each a
  small, independently readable unit:
  - `Nav` — logo, nav links, CTA, mobile menu toggle (client component)
  - `Hero` — headline, subcopy, CTA, product mock visual
  - `TrustBar` — placeholder customer logos
  - `FeatureGrid` — POS / Inventory / CRM / Invoicing / Reports /
    Multi-branch cards
  - `IndustryTabs` — retail / restaurant / salon / services tab switch
    (client component, local state)
  - `PricingTable` — tiers + monthly/yearly toggle (client component)
  - `Testimonials` — static 3-card grid
  - `IntegrationsStrip` — payment/shipping/WhatsApp icon row
  - `FAQAccordion` — expand/collapse (client component)
  - `FinalCTA` — signup banner
  - `Footer` — links, copyright

## Data flow

Static data imported from `landing.ts`, passed as props into section
components. Only client-side state: mobile nav open/close, pricing
monthly/yearly toggle, FAQ accordion open item, industry tab selection.
No network requests, no forms wired to a backend.

## Styling

Tailwind v4 (already configured). Blue/teal primary palette, generous
whitespace, card-based feature/pricing sections, mobile-first responsive.
Visual polish pass follows `frontend-design` skill guidance so the page
doesn't read as a templated default.

## Error handling

Static content only — no runtime error surface beyond normal React
rendering. No form submission logic in this pass, so no validation/error
states to design yet.

## Testing

No test infrastructure exists in the repo yet. Verify via `next dev` +
manual browser check (responsive breakpoints, all sections render). Not
adding a test runner for a static page in this pass; flagged as a gap if
the project later wants automated coverage.

## Out of scope (future specs)

- Authenticated dashboard (separate spec — needs auth + data model
  decisions)
- Bilingual EN/AR + RTL
- Real signup/lead-capture backend
