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
