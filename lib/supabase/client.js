// lib/supabase/client.js
import { createClient } from '@supabase/supabase-js';

// ✅ สำหรับ Client Side (Browser, React Component)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
