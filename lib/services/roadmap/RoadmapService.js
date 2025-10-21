import Papa from 'papaparse';

const ROADMAP_CSV_URL =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/Roadmap.csv';

/**
 * ดึงข้อมูล Roadmap จากไฟล์ Roadmap.csv
 * @returns {Promise<Array<{ title: string, target: number, range: number[], status: string, owner: string }>>}
 */
export async function getRoadmap() {
  try {
    const response = await fetch(ROADMAP_CSV_URL);
    if (!response.ok) {
      throw new Error(`โหลดไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data.map((row) => ({
      title: row.title?.trim() || '',
      target: parseFloat(row.target) || 0,
      range: parseRange(row.range),
      status: row.status?.toLowerCase().trim() || 'unknown',
      owner: row.owner?.trim() || '',
    }));
  } catch (error) {
    console.error('[RoadmapService] CSV parsing failed:', error);
    return [];
  }
}

/**
 * แปลง range จาก string เป็น array ของตัวเลข
 * @param {string} rangeStr
 * @returns {number[]}
 */
function parseRange(rangeStr) {
  try {
    const parsed = JSON.parse(rangeStr);
    if (Array.isArray(parsed)) {
      return parsed.map((n) => parseFloat(n)).filter((n) => !isNaN(n));
    }
  } catch {
    // ignore parse error
  }
  return [];
}
