import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'data', 'logs.txt');

/**
 * บันทึกข้อความ log พร้อม timestamp ลงไฟล์ logs.txt
 * @param {string} message - ข้อความที่ต้องการบันทึก
 */
export function logEvent(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;

  try {
    fs.appendFileSync(logPath, entry, 'utf8');
  } catch (err) {
    // ถ้าเขียน log ไม่สำเร็จ ให้แสดง error บน console
    console.error('เกิดข้อผิดพลาดในการเขียน log:', err);
  }
}
