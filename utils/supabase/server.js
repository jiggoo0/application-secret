// utils/supabase/server.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// 💡 เราจะใช้ Named Export (export function) เพื่อให้ Server Action สามารถ Import ได้อย่างถูกต้อง

// 1. Client สำหรับการจัดการ User Session (ใช้ Anon Key/Auth)
export function createAuthClient() {
  const cookieStore = cookies();
  // ใช้ค่า default จาก Auth Helper เพื่อจัดการ Session/Token
  return createServerComponentClient({ cookies: () => cookieStore });
}

// 2. Client สำหรับ Service Role Key (ใช้สำหรับ Admin/File Upload)
// ซึ่งจำเป็นใน Server Action ของเรา (app/actions/dti.js)
export function createServerClient() {
  const cookieStore = cookies();

  return createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseUrl: process.env.SUPABASE_URL, // ใช้ Service URL
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // ใช้ Service Role Key ที่มีสิทธิ์สูง
    },
  );
}
