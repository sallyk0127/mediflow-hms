import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // extract from /api/staff/[id]

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
