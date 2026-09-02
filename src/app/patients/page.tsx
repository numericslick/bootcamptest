"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Patient } from "@/generated/prisma/client";
import { axiosGet, axiosPost, axiosPut, axiosDelete } from "@/lib/axios";
import PatientFormModal from "../_components/patients/PatientsFormModal";
import { IPatient } from "@/interfaces/interfaces";

type ModalState = { mode: "add" } | { mode: "edit"; patient: Patient } | null;

function errorMessage(error: unknown): string | null {
  return error instanceof Error ? error.message : null;
}

export default function PatientsPage() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalState>(null);

  const {
    data: patients,
    isLoading,
    error,
  } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await axiosGet<Patient[]>("patients");
      return response.data || [];
    },
  });

  const invalidatePatients = () =>
    queryClient.invalidateQueries({ queryKey: ["patients"] });

  const createMutation = useMutation({
    mutationFn: (values: IPatient) =>
      axiosPost<IPatient, Patient>("patients", values),

    onSuccess: () => {
      invalidatePatients();
      setModal(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: IPatient }) =>
      axiosPut<IPatient, Patient>(`patients/${id}`, values),
    onSuccess: () => {
      invalidatePatients();
      setModal(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axiosDelete<Patient>(`patients/${id}`),
    onSuccess: () => invalidatePatients(),
  });

  const activeMutation =
    modal?.mode === "edit" ? updateMutation : createMutation;

  const handleSubmit = (values: IPatient) => {
    if (modal?.mode === "edit") {
      updateMutation.mutate({ id: modal.patient.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (patient: Patient) => {
    if (window.confirm(`Delete ${patient.name}?`)) {
      deleteMutation.mutate(patient.id);
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
          Patients
        </h1>
        <button
          type="button"
          onClick={() => setModal({ mode: "add" })}
          className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Add patient
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.1]">
        {isLoading && (
          <p className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
            Loading patients…
          </p>
        )}
        {error && (
          <p className="p-6 text-sm text-red-500">{errorMessage(error)}</p>
        )}
        {patients && patients.length === 0 && (
          <p className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
            No patients yet — add one to get started.
          </p>
        )}
        {patients && patients.length > 0 && (
          <table className="w-full divide-y divide-black/[.06] text-left text-sm dark:divide-white/[.08]">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-3 text-zinc-950 dark:text-zinc-50">
                    {patient.name}
                  </td>
                  <td className="px-6 py-3 text-zinc-600 dark:text-zinc-400">
                    {patient.age}
                  </td>
                  <td className="px-6 py-3 text-zinc-600 dark:text-zinc-400">
                    {patient.email}
                  </td>
                  <td className="px-6 py-3 text-zinc-600 dark:text-zinc-400">
                    {patient.phone}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setModal({ mode: "edit", patient })}
                      className="mr-4 font-medium text-teal-700 hover:underline dark:text-teal-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(patient)}
                      disabled={
                        deleteMutation.isPending &&
                        deleteMutation.variables === patient.id
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
        <PatientFormModal
          mode={modal.mode}
          initialPatient={modal.mode === "edit" ? modal.patient : null}
          isSubmitting={activeMutation.isPending}
          error={errorMessage(activeMutation.error)}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
