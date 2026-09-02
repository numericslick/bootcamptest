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
