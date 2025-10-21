// lib/supabase/server.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('❌ Missing Supabase env: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// ✅ สำหรับ Server Side (Next.js API Routes, Auth, Seed Script)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    fetch: (...args) => fetch(...args),
  },
});
