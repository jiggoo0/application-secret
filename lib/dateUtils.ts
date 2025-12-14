// lib/dateUtils.ts

/**
 * @description แปลงวันที่เป็นรูปแบบภาษาไทยที่อ่านง่าย (พ.ศ. และนาที)
 * @param dateInput วันที่ในรูปแบบ string, timestamp, หรือ Date object
 * @returns วันที่ในรูปแบบ 'DD เดือน YYYY เวลา HH:MM น.' หรือข้อความ Error
 */
// ✅ ใช้ Named Export และฟังก์ชันชื่อเดิม
export function formatThaiDate(dateInput: string | Date | number): string {
  if (!dateInput) {
    return 'ไม่ระบุวันที่';
  }

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return 'วันที่ไม่ถูกต้อง';
    }

    const day = date.getDate();
    const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const monthsThai = [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ];
    const month = monthsThai[date.getMonth()];

    return `${day} ${month} ${year} เวลา ${hour}:${minute} น.`;
  } catch (error) {
    return 'เกิดข้อผิดพลาดในการแสดงวันที่';
  }
}
// ----------------------------------------------------
// ✅ เมื่อเปลี่ยนชื่อไฟล์แล้ว ควรจะมีโค้ดอื่นๆ ที่เคยอยู่ใน utils.ts ย้ายมาที่นี่ด้วย
// เช่น export function otherUtility() {}
// แต่สำหรับตอนนี้ มีเพียง formatThaiDate เท่านั้น
// ----------------------------------------------------
