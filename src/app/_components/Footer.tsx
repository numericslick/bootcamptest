import { navLinks } from "@/app/_data/landing"

export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] py-10 dark:border-white/[.1]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Daftra<span className="text-teal-600">POS</span>
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 dark:text-zinc-400"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="text-sm text-zinc-500">
          © {new Date().getFullYear()} DaftraPOS. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
