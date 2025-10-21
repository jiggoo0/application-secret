// ตรวจสอบข้อมูลใบรับรองก่อนบันทึกหรือสร้าง PDF
export function validateCertificateInput(cert) {
  if (!cert || typeof cert !== 'object') return 'ข้อมูลไม่ถูกต้อง';

  const { name, user_email, issued_at, type } = cert;

  if (typeof name !== 'string' || name.trim().length < 2) return 'ชื่อผู้รับไม่ถูกต้อง';
  if (typeof user_email !== 'string' || !user_email.includes('@')) return 'อีเมลไม่ถูกต้อง';
  if (typeof issued_at !== 'string' || isNaN(Date.parse(issued_at)))
    return 'วันที่ออกใบรับรองไม่ถูกต้อง';
  if (type && !['salary', 'business', 'license'].includes(type)) return 'ประเภทใบรับรองไม่รองรับ';

  return null; // ✅ ผ่านการตรวจสอบ
}
