import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: "completed" },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
