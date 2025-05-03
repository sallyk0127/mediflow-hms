import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing = await prisma.staff.findUnique({ where: { staffId: body.staffId } });
    if (existing) {
      return NextResponse.json({ error: "Staff ID already exists." }, { status: 400 });
    }

    const newStaff = await prisma.staff.create({
      data: {
        name: body.name,
        staffId: body.staffId,
        role: body.role,
        schedules: { create: body.schedules || [] },
      },
    });

    return NextResponse.json(newStaff);
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
      },
    });
    return NextResponse.json(staffList);
  } catch (err) {
    console.error("Failed to fetch staff:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
