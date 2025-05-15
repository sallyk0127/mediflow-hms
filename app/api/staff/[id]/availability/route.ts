import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getDay } from "date-fns";
import { generateTimeSlots } from "@/lib/time-utils";

const dayMap = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").slice(-2, -1)[0]; // Extract ID from /staff/[id]/availability
  const dateStr = url.searchParams.get("date");

  if (!id || !dateStr) {
    return NextResponse.json({ error: "Missing staff ID or date" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const weekday = dayMap[getDay(date)];

  try {
    const schedule = await prisma.weeklySchedule.findFirst({
      where: {
        staffId: id,
        day: weekday,
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    if (!schedule) {
      return NextResponse.json({ timeSlots: [] });
    }

    const timeSlots = generateTimeSlots(schedule.startTime, schedule.endTime);
    return NextResponse.json({ timeSlots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return new NextResponse("Failed to fetch availability", { status: 500 });
  }
}
