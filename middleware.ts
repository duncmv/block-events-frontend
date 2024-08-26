import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt');
  // console.log(token);

  const protectedPaths = ['/Dashboard', '/Events'];

  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/Login', req.url));
    }
    fetch('http://localhost:3300/api/auth/check', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.isAuthenticated) {
          return NextResponse.redirect(new URL('/Login', req.url));
        }
        return NextResponse.next();
      });
  }
}

export const config = {
  matcher: ['/Dashboard/:path', '/Events/Create'],
};
