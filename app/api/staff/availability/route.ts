import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { eachDayOfInterval, getDay, format } from "date-fns";

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function generateTimeSlots(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const slots: string[] = [];
  const current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  while (current < endTime) {
    slots.push(format(current, "h:mm a"));
    current.setMinutes(current.getMinutes() + 30);
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");

  if (!department) {
    return NextResponse.json({ error: "Missing department" }, { status: 400 });
  }

  try {
    const doctors = await prisma.staff.findMany({
      where: { department, role: "Doctor" },
      include: { schedules: true },
    });

    // Generate availability for the next 7 days
    const nextWeek = eachDayOfInterval({
      start: new Date(),
      end: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    });

    const calendarAvailability: Record<string, string[]> = {};

    for (const day of nextWeek) {
      const weekday = dayMap[getDay(day)];
      const dateStr = format(day, "yyyy-MM-dd");

      const allSlots: Set<string> = new Set();

      for (const doctor of doctors) {
        const match = doctor.schedules.find(s => s.day === weekday);
        if (match) {
          const slots = generateTimeSlots(match.startTime, match.endTime);
          slots.forEach(slot => allSlots.add(slot));
        }
      }

      calendarAvailability[dateStr] = Array.from(allSlots);
    }

    return NextResponse.json({ availability: calendarAvailability });
  } catch (error) {
    console.error("Failed to fetch department availability:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

