// /lib/supabase/server-client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ----------------------------------------------------
// 1. Singleton Client Instance
// ----------------------------------------------------
// 💡 ใช้ Singleton Pattern เพื่อให้เกิดการเชื่อมต่อเพียงครั้งเดียว
let supabaseInstance: SupabaseClient | null = null;

/**
 * Utility function to get a robust Supabase client instance for Server/API Routes.
 * It uses the Service Role Key for elevated permissions.
 * @returns {SupabaseClient} Initialized Supabase client.
 * @throws {Error} If required environment variables are missing.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // 🚨 ตรวจสอบ Environment Variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // 🚨 หาก Key หายไป ให้ Throw Error ที่ชัดเจน
    throw new Error(
      'SUPABASE_CONFIG_ERROR: Required Supabase Environment Variables (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY) are missing. Check your .env file.',
    );
  }

  // 💡 สร้าง Client ใหม่และกำหนดให้เป็น Instance
  const client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    // 💡 เพื่อความมั่นใจ
    global: {
      headers: { Authorization: `Bearer ${supabaseServiceRoleKey}` },
    },
  });

  supabaseInstance = client;
  return client;
}
