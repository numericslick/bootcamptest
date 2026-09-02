"use client";

import { useState, FormEvent } from "react";
import { Doctor } from "@/generated/prisma/client";
import { IDoctor } from "@/interfaces/interfaces";

interface DoctorFormModalProps {
  mode: "add" | "edit";
  initialDoctor?: Doctor | null;
  isSubmitting: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: IDoctor) => void;
}

export default function DoctorFormModal({
  mode,
  initialDoctor,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: DoctorFormModalProps) {
  const [name, setName] = useState(initialDoctor?.name ?? "");
  const [specialty, setSpecialty] = useState(initialDoctor?.specialty ?? "");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ name: name.trim(), specialty: specialty.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/[.08] bg-white p-6 shadow-lg dark:border-white/[.1] dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {mode === "add" ? "Add doctor" : "Edit doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg border border-black/[.1] bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="Dr. Jane Doe"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Specialty
            </span>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
              className="rounded-lg border border-black/[.1] bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="Cardiology"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full border border-black/[.1] px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-black/[.04] disabled:opacity-50 dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
