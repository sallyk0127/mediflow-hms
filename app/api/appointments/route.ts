import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        patientId: body.patientId,
        doctorId: body.doctorId,
        department: body.department,
        time: body.time,
        date: new Date(body.date),
        severity: body.severity,
        reason: body.reason,
        contactPreference: body.contactPreference,
        medications: {
          create: body.medications.map((medicineId: number) => ({
            medicine: {
              connect: { id: medicineId },
            },
          })),
        },
      },
      include: {
        medications: true,
      },
    });

    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 });
  }
}
