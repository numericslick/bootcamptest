//this page for doctors api route get and post

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IDoctor } from "@/interfaces/interfaces";
import { Status } from "@/generated/prisma/browser";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        status: "ACTIVE" as Status,
      },
    });

    return NextResponse.json({ status: 200, data: doctors });
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch doctors",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, specialty } = body as IDoctor;

    if (!name || !specialty) {
      return NextResponse.json({
        status: 400,
        message: "name and specialty are required",
      });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialty,
      },
    });

    return NextResponse.json({ status: 201, data: doctor });
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create doctor",
    });
  }
}
