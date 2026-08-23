import Link from "next/link"

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-20 pt-16 text-center md:pt-24">
      <span className="rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        POS · Inventory · CRM · Invoicing — one app
      </span>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-zinc-50">
        Run your whole business from one dashboard
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Sell in-store, track stock, manage customers, and send invoices —
        without switching apps.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="rounded-full bg-teal-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Start free trial
        </Link>
        <a
          href="#features"
          className="rounded-full border border-black/[.1] px-8 py-3 text-base font-semibold text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
        >
          See features
        </a>
      </div>
      <div className="mt-6 w-full max-w-4xl rounded-2xl border border-black/[.08] bg-zinc-50 p-3 shadow-sm dark:border-white/[.1] dark:bg-zinc-900">
        <div className="flex h-72 items-center justify-center rounded-xl bg-white text-sm text-zinc-400 dark:bg-black dark:text-zinc-600">
          Dashboard preview
        </div>
      </div>
    </section>
  )
}
