import { NextResponse } from 'next/server';
import { createPatient } from '../../actions/actions-patients';
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Read incoming request body
    console.log("Received Data:", data); // Debugging log

    const response = await createPatient(data);

    if (response.success) {
      return NextResponse.json(response); // Return JSON response
    } else {
      console.error('Error in createPatient:', response.error);
      return NextResponse.json({ success: false, error: response.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: patients });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch patients' }, { status: 500 });
  }
}