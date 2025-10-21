// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // --- NextAuth protected routes ---
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

  // --- Works page protected by cookie ---
  if (url.pathname.startsWith('/works')) {
    const worksCookie = req.cookies.get('worksUnlocked')?.value;
    if (worksCookie !== 'true') {
      url.pathname = '/'; // ถ้าไม่มี cookie ให้ redirect ไปหน้า home
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/works/:path*'], // ใช้ middleware เฉพาะ route เหล่านี้
};
