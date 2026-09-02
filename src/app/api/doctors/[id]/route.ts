//this page for doctors api route update and delete by id

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IDoctor } from "@/interfaces/interfaces";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const doctorId = Number(id);

    if (Number.isNaN(doctorId)) {
      return NextResponse.json({ status: 400, message: "invalid doctor id" });
    }

    const body = await request.json();
    const { name, specialty } = body as IDoctor;

    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { name, specialty },
    });

    return NextResponse.json({ status: 200, data: doctor });
  } catch (error) {
    console.error("Failed to update doctor:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update doctor",
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const doctorId = Number(id);

    if (Number.isNaN(doctorId)) {
      return NextResponse.json({ status: 400, message: "invalid doctor id" });
    }

    const doctor = await prisma.doctor.delete({
      where: { id: doctorId },
    });

    return NextResponse.json({ status: 200, data: doctor });
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete doctor",
    });
  }
}
