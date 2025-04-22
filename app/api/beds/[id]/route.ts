import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bedId = params.id;
  const body = await req.json();

  try {
    const updatedBed = await prisma.bed.update({
      where: { id: bedId },
      data: {
        status: body.status,
        patientName: body.patientName,
        usedUntil: body.usedUntil ? new Date(body.usedUntil) : null,
      },
    });
    return NextResponse.json(updatedBed);
  } catch (error) {
    console.error("Error updating bed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Optional dummy GET to avoid build errors
export const GET = () => new Response(null, { status: 405 });
