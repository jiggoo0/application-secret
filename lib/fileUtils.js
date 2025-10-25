import path from 'path';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * ✅ ประเภทไฟล์ที่อนุญาตให้อัปโหลด
 */
export const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

/**
 * ✅ ตรวจสอบชนิดไฟล์ที่รองรับ
 * @param {string} mimeType - MIME type ของไฟล์
 * @returns {boolean}
 */
export function isAllowedFileType(mimeType) {
  return typeof mimeType === 'string' && ALLOWED_TYPES.has(mimeType);
}

/**
 * ✅ ตรวจสอบขนาดไฟล์ (หน่วย byte)
 * @param {number} size - ขนาดไฟล์เป็น byte
 * @returns {boolean}
 */
export function isFileSizeValid(size) {
  return Number.isFinite(size) && size > 0 && size <= MAX_FILE_SIZE_BYTES;
}

/**
 * ✅ สร้างชื่อไฟล์แบบปลอดภัยและไม่ซ้ำ
 * @param {string} originalName - ชื่อไฟล์ต้นฉบับ
 * @param {string} userEmail - อีเมลผู้ใช้
 * @returns {string} - ชื่อไฟล์ที่ปลอดภัย เช่น user/dirk_gmail_com/1697290000000-certificate.pdf
 */
export function generateSafeFileName(originalName, userEmail) {
  const timestamp = Date.now();

  // 🔒 ป้องกันนามสกุลที่ไม่ปลอดภัย
  const ext = path
    .extname(originalName)
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '');

  // 🔒 ป้องกันชื่อไฟล์ที่มีอักขระพิเศษหรือ path traversal
  const base = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');

  // 🔒 ทำให้ email ปลอดภัยสำหรับใช้ใน path
  const emailSafe = userEmail.replace(/[^a-zA-Z0-9]/g, '_');

  return `user/${emailSafe}/${timestamp}-${base}${ext}`;
}
