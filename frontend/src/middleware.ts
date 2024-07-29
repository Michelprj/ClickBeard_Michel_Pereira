import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { authRoutes, protectedRoutes } from './router/routes';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('user.token')?.value;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isExpired =
        decodedToken.exp && decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('user.token');
        return response;
      }

      if (protectedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.next();
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/', req.url));
      response.cookies.delete('user.token');
      return response;
    }
  } else {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (authRoutes.includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
