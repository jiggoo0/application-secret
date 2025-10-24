import Papa from 'papaparse';

const PRODUCT_CSV_URL =
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Databessuser/productItems.csv';

const ADMIN_STATUS_CSV_URL =
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Databessuser/adminStatus.csv';

/**
 * ดึงข้อมูลผลิตภัณฑ์ทั้งหมด (mock หรือจาก API อื่น)
 * @returns {Promise<Array>} รายการผลิตภัณฑ์ทั้งหมด
 */
export async function getProducts() {
  return [];
}

/**
 * ดึงรายการผลิตภัณฑ์จากไฟล์ productItems.csv
 * @returns {Promise<Array<string>>} รายชื่อผลิตภัณฑ์ที่มี field name
 */
export async function getProductItems() {
  return await fetchCsvNames({
    url: PRODUCT_CSV_URL,
    logPrefix: '[ProductService] getProductItems',
    fieldNames: ['name'],
  });
}

/**
 * ดึงสถานะผู้ดูแลระบบจากไฟล์ adminStatus.csv
 * @returns {Promise<Array<string>>} รายชื่อสถานะที่มี field name
 */
export async function getAdminStatus() {
  return await fetchCsvNames({
    url: ADMIN_STATUS_CSV_URL,
    logPrefix: '[ProductService] getAdminStatus',
    fieldNames: ['name', 'Name', 'สถานะ'],
  });
}

/**
 * ฟังก์ชันกลางสำหรับโหลด CSV และดึงเฉพาะ field ที่กำหนด
 * @param {Object} options
 * @param {string} options.url
 * @param {string} options.logPrefix
 * @param {Array<string>} options.fieldNames
 * @returns {Promise<Array<string>>}
 */
async function fetchCsvNames({ url, logPrefix = '[CSV Loader]', fieldNames = ['name'] }) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`โหลด CSV ไม่สำเร็จ: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    console.log(`${logPrefix} ✅ parsed rows:`, data);

    const names = data
      .map((row) => {
        for (const field of fieldNames) {
          if (typeof row[field] === 'string') return row[field].trim();
        }
        console.warn(`${logPrefix} ⚠️ missing name field in row:`, row);
        return null;
      })
      .filter(Boolean);

    return names;
  } catch (error) {
    console.error(`${logPrefix} ❌ error:`, error);
    return [];
  }
}
