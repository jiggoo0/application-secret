import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Supabase server env variables missing');
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// ✅ Server-side Supabase instance (ใช้สำหรับ API route, auth, insert/update/delete)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
