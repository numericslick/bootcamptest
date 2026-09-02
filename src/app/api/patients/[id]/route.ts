//this page for patients api route update and delete by id

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IPatient } from "@/interfaces/interfaces";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const patientId = Number(id);

    if (Number.isNaN(patientId)) {
      return NextResponse.json({ status: 400, message: "invalid patient id" });
    }

    const body = await request.json();
    const { name, age, email, phone } = body as IPatient;

    const patient = await prisma.patient.update({
      where: { id: patientId },
      data: { name, age, email, phone },
    });

    return NextResponse.json({ status: 200, data: patient });
  } catch (error) {
    console.error("Failed to update patient:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update patient",
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const patientId = Number(id);

    if (Number.isNaN(patientId)) {
      return NextResponse.json({ status: 400, message: "invalid patient id" });
    }

    const patient = await prisma.patient.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ status: 200, data: patient });
  } catch (error) {
    console.error("Failed to delete patient:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete patient",
    });
  }
}
