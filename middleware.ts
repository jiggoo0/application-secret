// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define Protected Paths
export const config = {
  // บังคับใช้กับทุก route ภายใต้ /admin
  matcher: '/admin/:path*',
};

/**
 * @name middleware
 * @description จัดการการตรวจสอบสิทธิ์การเข้าถึง (ใช้ Cookie เป็นหลัก, ใช้ Query Key เป็นตัวบู๊ต)
 */
export function middleware(request: NextRequest) {
  // 2. Define the expected token/secret
  const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_ID_TOKEN || 'dev-fix-admin-2025';
  const COOKIE_NAME = 'admin-session-token';

  // 3. Get tokens
  const cookieAdminToken = request.cookies.get(COOKIE_NAME)?.value;
  // ดึง Key จาก URL Query Parameter: ?access_key=...
  const queryAccessKey = request.nextUrl.searchParams.get('access_key');

  // 4. Authorization Logic
  const isAuthenticatedByCookie = cookieAdminToken === ADMIN_SECRET_TOKEN;
  const isAuthenticatedByQuery = queryAccessKey === ADMIN_SECRET_TOKEN;
  const isCleanPath = !queryAccessKey; // Path สะอาดถ้าไม่มี access_key

  // 5. Case 1: Authorized via Cookie (Passed)
  if (isAuthenticatedByCookie) {
    // อนุญาตให้ดำเนินการต่อไป
    return NextResponse.next();
  }

  // 6. Case 2: Authorized via Query Key (Bootstrap Session)
  if (isAuthenticatedByQuery) {
    // 💡 FIX: ตั้งค่า Cookie และ Redirect ไป Path ที่ไม่มี Query Key

    // Path ที่สะอาด
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('access_key'); // ลบ Key ออกจาก URL

    // สร้าง Response เพื่อตั้งค่า Cookie และ Redirect
    const response = NextResponse.redirect(cleanUrl);

    // ตั้งค่า Cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: ADMIN_SECRET_TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์
      path: '/admin',
    });

    console.log('[Middleware] Query Key used. Setting cookie and redirecting to clean path.');
    return response;
  }

  // 7. Case 3: Unauthorized (Redirect)
  console.warn('[Middleware] Unauthorized access attempt to admin path.');

  // URL: /unauthorized
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}
