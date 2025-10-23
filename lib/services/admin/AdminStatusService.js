// lib/services/admin/AdminStatusService.js

import Papa from 'papaparse';

const ADMIN_CSV_URL =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/adminStatus.csv';

/**
 * ดึงข้อมูลสถานะผู้ดูแลระบบจากไฟล์ adminStatus.csv
 * @returns {Promise<Array<{id: number|null, status: string, owner: string}>>}
 */
export async function getAdminStatus() {
  try {
    const response = await fetch(ADMIN_CSV_URL);
    if (!response.ok) {
      throw new Error(`โหลดไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data.map((row) => ({
      id: row.id ? parseInt(row.id, 10) : null,
      status: row.status?.trim() || '',
      owner: row.owner?.trim() || '',
    }));
  } catch (error) {
    console.error('[AdminStatusService] CSV parsing failed:', error);
    return [];
  }
}
