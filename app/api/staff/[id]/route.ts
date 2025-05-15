import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);
  const department = searchParams.get("department");
  const role = searchParams.get("role");

  // If department and role are provided, fetch matching staff
  if (department && role) {
    try {
      const staffList = await prisma.staff.findMany({
        where: {
          department,
          role,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return NextResponse.json(staffList);
    } catch (error) {
      console.error("Failed to fetch staff list:", error);
      return new NextResponse("Failed to fetch staff", { status: 500 });
    }
  }

  // Else, fallback to single staff fetch by ID in path
  const id = pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Missing staff ID" }, { status: 400 });
  }

  try {
    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { schedules: true },
    });

    if (!staff) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
