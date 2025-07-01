import { NextResponse } from 'next/server';
import { verifyToken } from './lib/utils';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes (matches config.matcher)
  const protectedRoutes = ['/', '/browse/my-list'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith('/browse/my-list')
  );

  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token
      const userId = await verifyToken(token);
      if (!userId) {
        // Invalid token, remove cookie and redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.set('token', '', { maxAge: -1, path: '/' });
        return response;
      }
    } catch (error) {
      console.error('Middleware token verification failed:', error);
      // Invalid token, remove cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', { maxAge: -1, path: '/' });
      return response;
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/browse/:path*'],
};