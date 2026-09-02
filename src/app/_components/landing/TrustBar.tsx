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
