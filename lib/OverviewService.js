import { createClient } from '@supabase/supabase-js';

// ✅ สร้าง Supabase client ด้วย Service Role Key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * 📊 รวมข้อมูลภาพรวมจากหลายตารางในระบบ
 * @returns {Promise<{
 *   totalUsers: number,
 *   totalUploads: number,
 *   totalLicenses: number,
 *   totalCertificates: number,
 *   lastUpdated: string
 * }>}
 */
export async function getOverviewStats() {
  try {
    // ✅ ดึงจำนวนข้อมูลจากแต่ละตารางแบบขนาน
    const [users, uploads, licenses, certificates] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('uploads').select('*', { count: 'exact', head: true }),
      supabase.from('licenses').select('*', { count: 'exact', head: true }),
      supabase.from('certificates').select('*', { count: 'exact', head: true }),
    ]);

    // ✅ รวม error ถ้ามี
    const error = users.error || uploads.error || licenses.error || certificates.error;

    if (error) {
      console.error('[OverviewService] ❌ Supabase query failed:', error);
      throw new Error('ไม่สามารถโหลดข้อมูลภาพรวมได้');
    }

    // ✅ สร้างข้อมูลภาพรวม
    return {
      totalUsers: extractCount(users),
      totalUploads: extractCount(uploads),
      totalLicenses: extractCount(licenses),
      totalCertificates: extractCount(certificates),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[OverviewService] ❌ Unexpected error:', err);
    throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูลภาพรวม');
  }
}

/**
 * ✅ ดึงจำนวนรายการจากผลลัพธ์ Supabase
 * @param {object} result - ผลลัพธ์จาก Supabase query
 * @returns {number}
 */
function extractCount(result) {
  return typeof result?.count === 'number' ? result.count : 0;
}
