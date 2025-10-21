import { getOverviewStats } from '@/lib/OverviewService';

/**
 * 📊 ดึงข้อมูลภาพรวมระบบสำหรับแอดมิน
 * @route GET /api/admin/overview
 */
export async function GET() {
  try {
    const stats = await getOverviewStats();

    if (!isValidOverview(stats)) {
      console.warn('[Overview] ⚠️ ข้อมูลภาพรวมไม่ครบหรือไม่ถูกต้อง:', stats);
      return Response.json(
        {
          error: 'ข้อมูลภาพรวมไม่ครบหรือไม่ถูกต้อง',
          stats,
        },
        { status: 500 },
      );
    }

    return Response.json(stats, { status: 200 });
  } catch (err) {
    console.error('[API] ❌ GET /overview failed:', err);
    return Response.json({ error: 'ไม่สามารถโหลดข้อมูลภาพรวมได้' }, { status: 500 });
  }
}

/**
 * ✅ ตรวจสอบความถูกต้องของข้อมูลภาพรวม
 * @param {object} stats
 * @returns {boolean}
 */
function isValidOverview(stats) {
  return (
    stats &&
    typeof stats === 'object' &&
    stats !== null &&
    Number.isFinite(stats.totalUsers) &&
    Number.isFinite(stats.totalLicenses) &&
    Number.isFinite(stats.totalUploads) &&
    Number.isFinite(stats.totalCertificates) &&
    typeof stats.lastUpdated === 'string'
  );
}
