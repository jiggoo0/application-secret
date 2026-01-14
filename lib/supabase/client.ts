import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

/**
 * Singleton Client สำหรับใช้งานใน Browser
 * ช่วยลดการสร้าง Connection ซ้ำซ้อนและประหยัด Resource
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// ตัวอย่างการใช้งานภายใน Component:
// const supabase = createClient();
// const { data } = await supabase.from('profiles').select('*');
