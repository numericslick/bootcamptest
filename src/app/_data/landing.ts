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
    quote: "The multi-branch view alone paid for itself in the first month.",
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
