import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop())

  try {
    await prisma.patient.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return new NextResponse("Failed to delete patient", { status: 500 })
  }
}
