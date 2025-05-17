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
        status: "new",
      },
      include: {
        medications: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status")?.toLowerCase();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const skip = (page - 1) * limit;

  try {
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: status ? { status } : undefined,
        include: {
          patient: true,
          doctor: true,
          medications: {
            include: {
              medicine: true,
            },
          },
        },
        orderBy: { date: "asc" },
        skip,
        take: limit,
      }),
      prisma.appointment.count({
        where: status ? { status } : undefined,
      }),
    ]);

    const formatted = appointments.map((a) => ({
      id: a.id,
      time: a.time,
      date: a.date.toISOString(),
      severity: a.severity,
      patientName: `${a.patient?.firstName ?? ""} ${a.patient?.lastName ?? ""}`,
      patientId: a.patientId.toString(),
      doctorName: a.doctor?.name ?? "Unknown",
      contactPreference: a.contactPreference,
      department: a.department,
      reason: a.reason,
      medications: a.medications.map((m) => m.medicine.name),
    }));

    return NextResponse.json({ success: true, data: formatted, total });
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
  }
}
