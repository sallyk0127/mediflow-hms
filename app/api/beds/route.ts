import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function PATCH(
  req: Request,
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
    console.error('Error updating bed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const bedId = params.id;
    
    const bed = await prisma.bed.findUnique({
      where: { id: bedId },
    });
  
    if (!bed) {
      return new NextResponse("Bed not found", { status: 404 });
    }
  
    return NextResponse.json(bed);
  }
  