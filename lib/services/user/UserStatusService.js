import Papa from 'papaparse';

const USER_CSV_URL =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/UsersStatus.csv';

/**
 * ดึงข้อมูลผู้ใช้จากไฟล์ UsersStatus.csv
 * @returns {Promise<Array<{ first_name: string, last_name: string, gender: string }>>}
 */
export async function getUserStatus() {
  try {
    const response = await fetch(USER_CSV_URL);
    if (!response.ok) {
      throw new Error(`โหลดไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data.map((row) => ({
      first_name: row.first_name?.trim() || '',
      last_name: row.last_name?.trim() || '',
      gender: normalizeGender(row.gender),
    }));
  } catch (error) {
    console.error('[UserStatusService] CSV parsing failed:', error);
    return [];
  }
}

/**
 * แปลงค่า gender ให้เป็นค่าที่ standardized
 * @param {string} gender
 * @returns {string}
 */
function normalizeGender(gender) {
  const g = gender?.toLowerCase().trim();
  if (g === 'male') return 'male';
  if (g === 'female' || g === 'femal') return 'female';
  return 'unknown';
}
