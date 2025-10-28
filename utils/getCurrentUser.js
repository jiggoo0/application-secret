// /utils/getCurrentUser.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * ดึงข้อมูลผู้ใช้ปัจจุบันจาก Supabase Auth (ฝั่งเซิร์ฟเวอร์)
 * ใช้ใน Server Component ได้เลย เช่น layout หรือ page
 */
export async function getCurrentUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  const { user } = data;

  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email,
    avatar: user.user_metadata?.avatar_url || '/default-avatar.png',
  };
}
