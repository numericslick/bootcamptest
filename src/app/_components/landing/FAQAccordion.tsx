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
