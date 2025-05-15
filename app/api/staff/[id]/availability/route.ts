import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getDay, format } from "date-fns";

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

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> })
{
  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!id || !dateStr) {
    return NextResponse.json({ error: "Missing staff ID or date" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const day = dayMap[getDay(date)];

  try {
    const schedule = await prisma.weeklySchedule.findFirst({
      where: {
        staffId: id,
        day,
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    if (!schedule) return NextResponse.json({ timeSlots: [] });

    const timeSlots = generateTimeSlots(schedule.startTime, schedule.endTime);
    return NextResponse.json({ timeSlots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
