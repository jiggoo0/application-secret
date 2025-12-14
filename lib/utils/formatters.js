// lib/utils/formatters.js

/**
 * @description แปลงวันที่และเวลาเป็นรูปแบบไทย พร้อมปี พ.ศ. และนาที
 * @param {string | Date | number} dateInput - วันที่, timestamp, หรือ Date object
 * @returns วันที่ในรูปแบบ 'DD เดือน YYYY เวลา HH:MM น.' หรือข้อความ Error
 */
export function formatThaiDate(dateInput) {
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
