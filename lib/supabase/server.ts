/** @format */
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 🛡️ Singleton Pattern: ตรวจสอบความถูกต้องของ Environment
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    '❌ SUPABASE_CONFIG_ERROR: Missing URL or Service Role Key in Environment Variables',
  )
}

/**
 * 🛰️ SUPABASE_SERVER_CLIENT (ADMIN_PRIVILEGES)
 * ใช้สำหรับ Server Actions หรือ API Routes เท่านั้น
 * คีย์นี้มีความปลอดภัยสูง ห้ามใช้ใน Client Component เด็ดขาด
 */
export const supabaseServer: SupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
