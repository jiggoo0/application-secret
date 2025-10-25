import Papa from 'papaparse';

const ROADMAP_CSV_URL =
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Databessuser/Roadmap.csv';

/**
 * ดึงข้อมูล Roadmap จากไฟล์ CSV
 * @returns {Promise<Array<Object>>} แถวข้อมูล Roadmap
 */
export async function getRoadmap() {
  try {
    const response = await fetch(ROADMAP_CSV_URL);
    if (!response.ok) {
      throw new Error(`โหลด Roadmap ไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data;
  } catch (error) {
    console.error('[RoadmapService] ❌ CSV parsing failed:', error);
    return [];
  }
}
