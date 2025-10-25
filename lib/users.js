// lib/users.js
import { supabase } from '@/lib/supabase/client';

/**
 * 🔹 อ่านข้อมูลผู้ใช้ทั้งหมดจาก Supabase
 * @returns {Promise<Array>} Array ของผู้ใช้
 */
export async function readUsers() {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('[readUsers] ❌', err);
    return [];
  }
}

/**
 * 🔹 เพิ่มผู้ใช้ใหม่ลงใน Supabase
 * @param {Object} newUser
 * @returns {Promise<boolean>} true หากสำเร็จ, false หากเกิดข้อผิดพลาด
 */
export async function writeUsers(newUser) {
  try {
    const { error } = await supabase.from('users').insert([newUser]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[writeUsers] ❌', err);
    return false;
  }
}
