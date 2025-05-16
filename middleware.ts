// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  // If trying to access root path without being authenticated, redirect to auth
  if (request.nextUrl.pathname === '/' && !token && !role) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If trying to access root path while authenticated, allow it
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Apply middleware to the root path
};