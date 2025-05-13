import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop());

  if (isNaN(id)) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return new NextResponse("Patient not found", { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return new NextResponse("Failed to fetch patient", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop())

  try {
    await prisma.patient.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return new NextResponse("Failed to delete patient", { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop())
  const body = await req.json()

  try {
    const updated = await prisma.patient.update({
      where: { id },
      data: {
        ...body,
        dob: new Date(body.dob).toISOString(),
      },
    });

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating patient:", error)
    return new NextResponse("Failed to update patient", { status: 500 })
  }
}
