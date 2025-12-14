// @/lib/supabase/server.ts (ตัวอย่างโค้ดที่ถูกต้อง)

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 1. ดึงตัวแปรจาก Environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client: SupabaseClient | null = null; // เริ่มต้นให้เป็น null

try {
  // 2. ตรวจสอบว่าตัวแปรสำคัญมีค่าหรือไม่
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // หากขาดตัวแปรใดตัวแปรหนึ่ง ให้ Throw Error ชัดเจน
    // เพื่อป้องกันการใช้ Client ที่ไม่สมบูรณ์
    throw new Error(
      'SUPABASE_CONFIG_ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  // 3. สร้าง Client Instance
  client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    // Options สำหรับ Server-side Client
    auth: { autoRefreshToken: false, persistSession: false },
  });
} catch (error) {
  console.error('❌ Failed to initialize Supabase Server Client:', error);
  // ในกรณีที่เกิด Error เรายังคง export 'null' หรือ 'undefined' แทน Client ที่ใช้งานได้
  // ซึ่งอาจจะทำให้โค้ดที่เรียกใช้ crash ได้ในภายหลัง (แต่จะให้ Error ที่ชัดเจน)
}

// 4. Export Client
// 💡 เราใช้ Type Assertion (as SupabaseClient) ในการ export เพราะในโค้ดที่เรียกใช้
// (เช่น ThaiFeedbackGenerator.ts) จะคาดหวัง SupabaseClient ที่ใช้งานได้
// ถ้า client เป็น null/undefined ณ จุดนี้ โค้ดที่เรียกใช้จะ crash ตามที่เห็น
export const supabaseServer = client as SupabaseClient;

// 🚨 หมายเหตุ: ถ้าโค้ดของคุณเป็นแบบนี้ และยัง crash แสดงว่าตัวแปร Env ไม่ถูกโหลด
