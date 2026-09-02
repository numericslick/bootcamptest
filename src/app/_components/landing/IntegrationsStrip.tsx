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
