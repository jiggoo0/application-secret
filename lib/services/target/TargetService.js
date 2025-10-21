import Papa from 'papaparse';

const TARGET_CSV_URL =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/Target.csv';

/**
 * ดึงข้อมูลเป้าหมายจากไฟล์ Target.csv
 * @returns {Promise<Array<{ name: string, actual: number, target: number, unit: string }>>}
 */
export async function getTargets() {
  try {
    const response = await fetch(TARGET_CSV_URL);
    if (!response.ok) {
      throw new Error(`โหลดไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data.map((row) => ({
      name: row.name?.trim() || '',
      actual: parseFloat(row.actual) || 0,
      target: parseFloat(row.target) || 0,
      unit: row.unit?.trim() || 'บาท',
    }));
  } catch (error) {
    console.error('[TargetService] CSV parsing failed:', error);
    return [];
  }
}
