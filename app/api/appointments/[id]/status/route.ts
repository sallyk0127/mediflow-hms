import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });
  }

  try {
    const updated = await prisma.appointment.update({
      where: { id: id },
      data: { status: "completed" },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return new NextResponse("Failed to update appointment", { status: 500 });
  }
}
