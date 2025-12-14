// lib/supabase/public.ts
import { createClient } from '@supabase/supabase-js';

// 💡 ใช้ Public URL และ Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // ข้อผิดพลาดนี้จะถูกโยนในระหว่าง Build/Runtime หาก Environment Variables หายไป
  throw new Error(
    'Supabase Public Client Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing',
  );
}

/**
 * @description Supabase Client สำหรับการเข้าถึงข้อมูลสาธารณะ (ใช้ Anon Key)
 * ใช้ใน Route Handler เช่น /verify/[pnr]/route.js
 */
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
