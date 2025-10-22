import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req });

  if (url.pathname.startsWith('/admin')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    if (token.role !== 'admin') {
      url.pathname = '/user';
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.startsWith('/works')) {
    const worksCookie = req.cookies.get('worksUnlocked')?.value;
    if (worksCookie !== 'true') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/works/:path*'] };
