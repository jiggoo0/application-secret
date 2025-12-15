// /lib/supabase/server.ts
// Supabase Server Client Setup (ใช้ Service Role Key)

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 1. ดึงตัวแปรจาก Environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let clientInstance: SupabaseClient | null = null;

try {
  // 2. ตรวจสอบ Configuration
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error(
      '❌ SUPABASE_CONFIG_ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Client will be null.',
    );
  } else {
    // 3. สร้าง Client Instance (ใช้ Service Role Key)
    clientInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
} catch (error) {
  console.error('❌ Failed to initialize Supabase Server Client:', error);
}

// 4. Export Client Instance
// API Route จะ Import ตัวแปรนี้: import { supabaseServer } from "@/lib/supabase/server";
export const supabaseServer = clientInstance;

// (ไม่จำเป็นต้องมี export function createClient อีกต่อไป)
