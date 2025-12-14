// lib/supabase/api.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('FATAL: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
}

/**
 * @name supabaseApi
 * @description Supabase Client สำหรับ API Routes (Service Role Key)
 */
export const supabaseApi = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});
