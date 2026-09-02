"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/app/_data/landing";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/90 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Daftra<span className="text-teal-600">POS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/doctors"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Doctors
          </Link>
          <Link
            href="/patients"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Patients
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Chat
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/signup"
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Start free trial
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-black/[.08] px-6 py-4 md:hidden dark:border-white/[.1]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/doctors"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            Doctors
          </Link>
          <Link
            href="/patients"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            Patients
          </Link>
          <Link
            href="/chat"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            Chat
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-teal-600 px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Start free trial
          </Link>
        </nav>
      )}
    </header>
  );
}
