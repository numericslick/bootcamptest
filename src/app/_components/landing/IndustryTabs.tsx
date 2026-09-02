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
