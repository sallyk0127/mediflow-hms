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

    const weekStartDate = new Date(new Date(body.weekStart).setHours(0, 0, 0, 0));
    const newSchedules = body.schedules as ScheduleInput[];

    // Upsert staff
    const staff = await prisma.staff.upsert({
      where: { staffId: body.staffId },
      update: {
        name: body.name,
        role: body.role,
        department: body.department,
      },
      create: {
        name: body.name,
        staffId: body.staffId,
        role: body.role,
        department: body.department,
      },
    });

    // Fetch existing schedules for this staff and week
    const existingSchedules = await prisma.weeklySchedule.findMany({
      where: {
        staffId: staff.id,
        weekStart: weekStartDate,
      },
    });

    const newDaysSet = new Set<string>();

    for (const s of newSchedules) {
      newDaysSet.add(s.day); // ✅ To prevent false deletions
    
      const existing = existingSchedules.find(
        (e) =>
          e.day === s.day &&
          new Date(e.weekStart).setHours(0, 0, 0, 0) === new Date(s.weekStart).setHours(0, 0, 0, 0)
      );
    
      if (existing) {
        const hasChanges = existing.startTime !== s.startTime || existing.endTime !== s.endTime;
    
        if (hasChanges) {
          await prisma.weeklySchedule.update({
            where: { id: existing.id },
            data: {
              startTime: s.startTime,
              endTime: s.endTime,
            },
          });
          console.log(`✅ Updated ${s.day} ${s.startTime}–${s.endTime}`);
        } else {
          console.log(`⏭️ Skipped ${s.day}: no change`);
        }
      } else {
        await prisma.weeklySchedule.create({
          data: {
            staffId: staff.id,
            day: s.day,
            startTime: s.startTime,
            endTime: s.endTime,
            weekStart: new Date(new Date(s.weekStart).setHours(0, 0, 0, 0)),
          },
        });
        console.log(`✅ Created ${s.day} ${s.startTime}–${s.endTime}`);
      }
    }    

    // Delete any schedules that are no longer present in form
    const toDelete = existingSchedules.filter((s) => !newDaysSet.has(s.day));
    if (toDelete.length > 0) {
      await prisma.weeklySchedule.deleteMany({
        where: {
          id: { in: toDelete.map((s) => s.id) },
        },
      });
      console.log(`Deleted ${toDelete.length} removed day(s):`, toDelete.map(s => s.day));
    }

    return NextResponse.json({ message: "Schedule updated successfully." });
  } catch (error) {
    console.error("Error saving schedule:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");
  const role = searchParams.get("role");

  try {
    const staffList = await prisma.staff.findMany({
      where: {
        ...(department && { department }),
        ...(role && { role }),
      },
      select: {
        id: true,
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
