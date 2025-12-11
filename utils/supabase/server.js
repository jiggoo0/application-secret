// utils/supabase/server.js

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 💡 FIXED: ต้องมั่นใจว่ามีการส่งออกฟังก์ชันชื่อ 'createClient'
 * เพื่อให้ Server Component และ Server Action อื่นๆ เรียกใช้งานได้
 * * @param {ReturnType<typeof cookies>} cookieStore
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export const createClient = (cookieStore) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        // สำหรับการตั้งค่า/ลบคุกกี้ใน Server Action
        // (จำเป็นสำหรับ Session Management)
        set: (name, value, options) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // ป้องกันการ crash เมื่อพยายามตั้งค่าใน Server Component
          }
        },
        remove: (name, options) => {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // ป้องกันการ crash เมื่อพยายามลบใน Server Component
          }
        },
      },
    },
  );
};
