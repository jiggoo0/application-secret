import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('❌ Missing Supabase env variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// ✅ Server-side Supabase instance (for protected operations: insert/update/delete)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
