// project/lib/services.js
export async function fetchServices() {
  try {
    const res = await fetch('/data/services.json');
    if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลบริการได้');

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');

    return { data, error: null };
  } catch (error) {
    return { data: [], error: error.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ' };
  }
}
