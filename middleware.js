import { NextResponse } from 'next/server';
import { verifyToken } from './lib/utils';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;


  // Allow /login without token
  if (pathname === '/login') {
    if (token) {
      try {
        await verifyToken(token);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Check protected routes
  const protectedRoutes = ['/', '/browse/my-list', '/video'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware: Token verification failed:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', { maxAge: -1, path: '/' });
      return response;
    }
  }

  // Allow non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/browse/:path*', '/video/:path*'],
};