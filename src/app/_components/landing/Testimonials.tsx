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
