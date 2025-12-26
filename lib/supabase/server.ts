// lib/supabase/server.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let clientInstance: SupabaseClient | null = null

if (supabaseUrl && supabaseServiceRoleKey) {
  clientInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
} else {
  console.error("❌ SUPABASE_CONFIG_ERROR: Missing URL or Service Role Key")
}

export const supabaseServer = clientInstance // ✅ ต้อง export
