//this page for patients api route get

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IPatient } from "@/interfaces/interfaces";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany();

    return NextResponse.json({ status: 200, data: patients });
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch patients",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, email, phone } = body as IPatient;

    if (!name || !age || !email || !phone) {
      return NextResponse.json({
        status: 400,
        message: "All fields are required",
      });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        email,
        phone,
      },
    });

    return NextResponse.json({ status: 201, data: patient });
  } catch (error) {
    console.error("Failed to create patient:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create patient",
    });
  }
}
