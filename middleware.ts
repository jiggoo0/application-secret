// middleware.ts (อยู่ที่ Root ของโปรเจกต์)
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // เรียกใช้ Logic จาก lib
  return await updateSession(request);
}

export const config = {
  matcher: [
    /* กำหนด Path ที่ต้องการให้ Middleware ทำงาน */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
