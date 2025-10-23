export function validateUploadInput(file) {
  if (!file || typeof file !== 'object') return 'ข้อมูลไฟล์ไม่ถูกต้อง';

  const { name, path, type, user_email } = file;

  if (typeof name !== 'string' || !name.trim()) return 'ชื่อไฟล์ไม่ถูกต้อง';
  if (typeof path !== 'string' || !path.trim()) return 'path ไม่ถูกต้อง';
  if (typeof type !== 'string' || !type.trim()) return 'ประเภทไฟล์ไม่ถูกต้อง';
  if (user_email && (typeof user_email !== 'string' || !user_email.includes('@'))) {
    return 'อีเมลผู้ใช้ไม่ถูกต้อง';
  }

  return null;
}
