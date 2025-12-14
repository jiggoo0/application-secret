// lib/supabase/public.ts
// Pattern: Supabase Client สำหรับ Public Read (Anon Key)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // ใช้ URL หลัก
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Error Pattern: Throwing error on server startup if critical ENV vars are missing
  throw new Error('FATAL ERROR: Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

/**
 * @name supabasePublic
 * @description Supabase Client สำหรับการเข้าถึงข้อมูลสาธารณะ (Anon Key)
 */
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});
