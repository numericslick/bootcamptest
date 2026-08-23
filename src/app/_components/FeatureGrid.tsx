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
