// 🚀 File: app/letter-service/utils/document.js (Document Utility Functions)

/**
 * =================================================================
 * 💡 Date Formatting Utilities
 * =================================================================
 */

/**
 * @function formatLongDate
 * @description แปลงวันที่เป็นรูปแบบยาวภาษาไทย (เช่น 12 ธันวาคม 2568)
 * 💡 Business Requirement: ใช้สำหรับเอกสารราชการ/ธุรกิจ ที่ต้องการรูปแบบวันที่เต็ม
 * @param {string | Date | number | null | undefined} dateInput - วันที่ในรูปแบบที่ JavaScript Date object รับได้
 * @returns {string} - Date string ในรูปแบบยาว หรือ String ว่าง หาก Input ไม่ถูกต้อง
 */
export function formatLongDate(dateInput) {
  if (!dateInput) {
    return '';
  }

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      console.warn('Document Util: Invalid date input detected in formatLongDate:', dateInput);
      return String(dateInput); // คืนค่า String เดิมหาก Parse ไม่สำเร็จ
    }

    // มาตรฐาน: ใช้ th-TH locale เพื่อแสดงผลเป็นภาษาไทยและปีพุทธศักราช
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // 💡 Performance Tip: toLocaleDateString เป็น Native API ที่มีประสิทธิภาพ
    return date.toLocaleDateString('th-TH', options);
  } catch (error) {
    console.error('Document Util: Failed to format date.', error);
    return '';
  }
}

/**
 * =================================================================
 * 💡 Data Structure & Constants
 * =================================================================
 */

/**
 * @const documentDataShape
 * @description รูปแบบข้อมูลพื้นฐานสำหรับเอกสาร
 * 💡 FIX: ต้องมี export เพื่อให้ Component อื่นๆ (เช่น VisaGuaranteeContent.jsx) สามารถ import ได้
 */
export const documentDataShape = {
  // ใช้เพื่อเป็น Reference หรือสำหรับ PropTypes/Flow/JSDoc ใน JS
  documentId: 'string',
  type: 'string',
  createdAt: 'string',
  // สามารถเพิ่ม fields ที่ใช้ร่วมกันได้ เช่น
  updatedAt: 'string',
  status: 'string', // 'draft', 'pending', 'approved'
};

// =================================================================
// 💡 Other Document-Related Utilities (Placeholder)
// =================================================================

/**
 * @function parseDocumentId
 * @description แยกประเภทเอกสารและหมายเลข ID
 * @param {string} fullId - เช่น 'VISA-GUA-2025-001'
 * @returns {{type: string, year: number, serial: number}}
 */
export function parseDocumentId(fullId) {
  // ... implementation
  return { type: 'N/A', year: 0, serial: 0 };
}
