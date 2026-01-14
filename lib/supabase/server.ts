import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ✅ สร้าง Supabase Client สำหรับ Server-side (Next.js 15)
 * รองรับการอ่าน/เขียน Cookies ใน Server Components, Actions และ Route Handlers
 */
export async function createClient() {
  // ใน Next.js 15, cookies() จะต้องถูก await ก่อนเสมอ
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ดึงคุกกี้ทั้งหมดออกมาเพื่อใช้ในการตรวจสอบสิทธิ์ (Authentication)
        getAll() {
          return cookieStore.getAll();
        },
        // ตั้งค่าคุกกี้กลับไปยัง Browser (มักใช้ใน Server Actions หรือ Middleware)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // หมายเหตุ: ใน Server Component เราอาจจะไม่สามารถ set คุกกี้ได้
            // หากมีการส่งผลลัพธ์ออกไปที่หน้าจอแล้ว (Headers already sent)
          }
        },
      },
    },
  );
}
