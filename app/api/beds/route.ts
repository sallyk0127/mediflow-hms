import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const beds = await prisma.bed.findMany({
      orderBy: { bedId: "asc" },
    });

    return NextResponse.json({ beds });
  } catch (error) {
    console.error("Failed to fetch beds:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
