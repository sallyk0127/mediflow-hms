import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
      const medicines = await prisma.medicine.findMany({
        orderBy: { expiry: 'asc' },
      });
      return NextResponse.json(medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }  

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("Received body:", body);
  
      // Check for duplicate code
      const existing = await prisma.medicine.findUnique({
        where: { code: body.code },
      });
  
      if (existing) {
        return NextResponse.json({
          success: false,
          error: `Medicine code "${body.code}" already exists.`,
        }, { status: 400 });
      }
  
      const newMedicine = await prisma.medicine.create({
        data: {
          name: body.name,
          code: body.code,
          price: parseFloat(body.price.replace("$", "")),
          stock: body.stock,
          type: body.type,
          manufacturer: body.manufacturer,
          expiry: new Date(body.expiry),
        },
      });
  
      return NextResponse.json({ success: true, data: newMedicine });
    } catch (error) {
      console.error("Error creating medicine:", error);
      return NextResponse.json({ success: false, error: 'Failed to create medicine' }, { status: 500 });
    }
  }
  
