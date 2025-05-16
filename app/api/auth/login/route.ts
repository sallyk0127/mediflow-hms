import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Replace this with your actual authentication logic
    // This is just a placeholder example
    let authenticated = false;
    let userRole = '';
    
    // Example authentication check (replace with your real logic)
    if (username === 'doctor' && password === 'doctor123') {
      authenticated = true;
      userRole = 'doctor';
    } else if (username === 'nurse' && password === 'nurse123') {
      authenticated = true;
      userRole = 'nurse';
    } else if (username === 'admin' && password === 'admin123') {
      authenticated = true;
      userRole = 'admin';
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      role: userRole,
    });

    // Set cookies
    response.cookies.set('token', 'your-generated-token-here', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('role', userRole, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}