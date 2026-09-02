//this page for patients api route get

import { NextResponse } from "next/server";

export async function GET() {
  const patients = [
    { id: 1, name: "John Doe", age: 30, condition: "Hypertension" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Diabetes" },
    { id: 3, name: "Bob Johnson", age: 35, condition: "Asthma" },
  ];
  return NextResponse.json({ status: 200, data: patients });
}
