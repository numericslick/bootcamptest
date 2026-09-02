"use client";

import { useState, FormEvent } from "react";
import { Patient } from "@/generated/prisma/client";
import { IPatient } from "@/interfaces/interfaces";

interface PatientFormModalProps {
  mode: "add" | "edit";
  initialPatient?: Patient | null;
  isSubmitting: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: IPatient) => void;
}

export default function PatientFormModal({
  mode,
  initialPatient,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: PatientFormModalProps) {
  const [name, setName] = useState(initialPatient?.name ?? "");
  const [age, setAge] = useState(initialPatient?.age ?? "");
  const [email, setEmail] = useState(initialPatient?.email ?? "");
  const [phone, setPhone] = useState(initialPatient?.phone ?? "");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      age: age.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/8 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {mode === "add" ? "Add patient" : "Edit patient"}
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
              className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="Dr. Jane Doe"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Age
            </span>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="30"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="jane.doe@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Phone
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none focus:border-teal-600 dark:border-white/[.15] dark:text-zinc-50"
              placeholder="+1 (555) 123-4567"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-black/[.04] disabled:opacity-50 dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
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
