// ตรวจสอบข้อมูลใบอนุญาตก่อนบันทึก
export function validateLicenseInput(license) {
  if (!license || typeof license !== 'object') return 'ข้อมูลไม่ถูกต้อง';

  const { title, holder, expires_at } = license;

  if (typeof title !== 'string' || title.trim().length < 2) return 'ชื่อใบอนุญาตไม่ถูกต้อง';
  if (typeof holder !== 'string' || holder.trim().length < 2) return 'ชื่อผู้ถือใบอนุญาตไม่ถูกต้อง';
  if (typeof expires_at !== 'string' || isNaN(Date.parse(expires_at)))
    return 'วันหมดอายุไม่ถูกต้อง';

  return null; // ✅ ผ่านการตรวจสอบ
}
