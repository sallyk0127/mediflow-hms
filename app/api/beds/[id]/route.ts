import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Get bed id
  const body = await req.json();

  try {
    const updatedBed = await prisma.bed.update({
      where: { bedId: id as string },
      data: {
        status: body.status,
        patientName: body.patientName,
        patientId: body.patientId ?? null, 
        usedUntil: body.usedUntil ? new Date(body.usedUntil) : null,
      },
    });

    return NextResponse.json(updatedBed);
  } catch (error) {
    console.error("Error updating bed:", error);
    return new NextResponse("Failed to update bed", { status: 500 });
  }
}

// Dummy GET to prevent Vercel errors
export async function GET() {
  const beds = await prisma.bed.findMany();
  return NextResponse.json(beds);
}
