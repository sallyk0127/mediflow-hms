import { NextResponse } from 'next/server';
import { createPatient } from '../../actions/actions-patients';

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
