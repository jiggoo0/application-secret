// 🚀 File: app/letter-service/utils/document.js

/**
 * Utility: File สำหรับรวม Helper Functions ที่เกี่ยวข้องกับเอกสารและการ Export
 */

/**
 * เตรียมข้อมูลจดหมายสำหรับ PDF Export (อาจมีการแปลง HTML/CSS เป็น PDF-friendly format)
 * @param {object} documentData - ข้อมูลที่จัดกลุ่มแล้ว
 * @returns {object} ข้อมูลพร้อม Export
 */
export const prepareForExport = (documentData) => {
  console.log('Preparing document data for export/PDF generation...');
  // 💡 Logic: เช่น การแปลงวันที่, การเข้ารหัสข้อมูล, หรือการรวม Metadata
  return {
    metadata: {
      date: new Date().toISOString(),
      author: documentData.Applicant.fullName,
    },
    content: documentData,
  };
};
