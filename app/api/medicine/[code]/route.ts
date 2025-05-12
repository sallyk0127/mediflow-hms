import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE a medicine by code (from the URL path)
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.pathname.split("/").pop();

  try {
    await prisma.medicine.delete({
      where: { code: code || "" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return new NextResponse("Failed to delete medicine", { status: 500 });
  }
}

// PATCH to update stock
export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.pathname.split("/").pop();
  const body = await req.json();

  try {
    const updated = await prisma.medicine.update({
      where: { code: code || "" },
      data: {
        stock: body.stock,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating medicine:", error);
    return new NextResponse("Failed to update medicine", { status: 500 });
  }
}
