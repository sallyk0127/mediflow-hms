import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ScheduleInput {
  day: string;
  startTime: string;
  endTime: string;
  weekStart: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.name ||
      !body.staffId ||
      !body.role ||
      !body.department ||
      !body.weekStart
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Prevent duplicate weekly schedule for this staff
    const duplicate = await prisma.weeklySchedule.findFirst({
      where: {
        staffId: body.staffId,
        weekStart: new Date(body.weekStart),
      },
    });

    if (duplicate) {
      return NextResponse.json({ error: "Schedule already exists for this week." }, { status: 409 });
    }

    const result = await prisma.staff.upsert({
      where: { staffId: body.staffId },
      update: {
        schedules: {
          create: (body.schedules as ScheduleInput[]).map((s) => ({
            ...s,
            weekStart: new Date(s.weekStart),
          })),
        },
      },
      create: {
        name: body.name,
        staffId: body.staffId,
        role: body.role,
        department: body.department,
        schedules: {
          create: (body.schedules as ScheduleInput[]).map((s) => ({
            ...s,
            weekStart: new Date(s.weekStart),
          })),
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const staffList = await prisma.staff.findMany({
      select: {
        name: true,
        staffId: true,
        role: true,
        department: true,
        schedules: true,
      },
    });
    return NextResponse.json(staffList);
  } catch (err) {
    console.error("Failed to fetch staff:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
