'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const userSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

/**
 * 🧑‍💻 สมัครสมาชิกผู้ใช้ใหม่
 * @param {any} prevState - state ก่อนหน้า (จาก useFormState)
 * @param {FormData} formData - ข้อมูลจากฟอร์ม
 * @returns {Promise<{ message: string | null, success: boolean }>}
 */
export async function createUser(prevState, formData) {
  const raw = Object.fromEntries(formData.entries());
  const result = userSchema.safeParse(raw);

  if (!result.success) {
    const firstError = result.error.errors[0]?.message || 'ข้อมูลไม่ถูกต้อง';
    return { message: firstError, success: false };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('users').insert([result.data]);

  if (error) {
    console.error('[createUser] ❌', error);
    return { message: 'เกิดข้อผิดพลาดในการสมัคร', success: false };
  }

  return { message: null, success: true };
}
