"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Doctor } from "@/generated/prisma/client";
import { axiosGet, axiosPost, axiosPut, axiosDelete } from "@/lib/axios";
import DoctorFormModal from "@/app/_components/doctors/DoctorFormModal";
import { IDoctor } from "@/interfaces/interfaces";

type ModalState = { mode: "add" } | { mode: "edit"; doctor: Doctor } | null;

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function DoctorsPage() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalState>(null);

  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await axiosGet<Doctor[]>("doctors");
      return response.data || [];
    },
  });

  const invalidateDoctors = () =>
    queryClient.invalidateQueries({ queryKey: ["doctors"] });

  const createMutation = useMutation({
    mutationFn: (values: IDoctor) =>
      axiosPost<IDoctor, Doctor>("doctors", values),

    onSuccess: () => {
      invalidateDoctors();
      setModal(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: IDoctor }) =>
      axiosPut<IDoctor, Doctor>(`doctors/${id}`, values),
    onSuccess: () => {
      invalidateDoctors();
      setModal(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axiosDelete<Doctor>(`doctors/${id}`),
    onSuccess: () => invalidateDoctors(),
  });

  const activeMutation =
    modal?.mode === "edit" ? updateMutation : createMutation;

  const handleSubmit = (values: IDoctor) => {
    if (modal?.mode === "edit") {
      updateMutation.mutate({ id: modal.doctor.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (doctor: Doctor) => {
    if (window.confirm(`Delete ${doctor.name}?`)) {
      deleteMutation.mutate(doctor.id);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Back home
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Doctors
        </h1>
        <button
          type="button"
          onClick={() => setModal({ mode: "add" })}
          className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Add doctor
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.1]">
        {isLoading && (
          <p className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
            Loading doctors…
          </p>
        )}
        {error && (
          <p className="p-6 text-sm text-red-500">{errorMessage(error)}</p>
        )}
        {doctors && doctors.length === 0 && (
          <p className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
            No doctors yet — add one to get started.
          </p>
        )}
        {doctors && doctors.length > 0 && (
          <table className="w-full divide-y divide-black/[.06] text-left text-sm dark:divide-white/[.08]">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Specialty</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-3 text-zinc-950 dark:text-zinc-50">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-3 text-zinc-600 dark:text-zinc-400">
                    {doctor.specialty}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setModal({ mode: "edit", doctor })}
                      className="mr-4 font-medium text-teal-700 hover:underline dark:text-teal-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(doctor)}
                      disabled={
                        deleteMutation.isPending &&
                        deleteMutation.variables === doctor.id
                      }
                      className="font-medium text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <DoctorFormModal
          mode={modal.mode}
          initialDoctor={modal.mode === "edit" ? modal.doctor : null}
          isSubmitting={activeMutation.isPending}
          error={errorMessage(activeMutation.error)}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
