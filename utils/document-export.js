// 🚀 File: utils/document-export.js

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Helper: สร้างชื่อไฟล์จาก Config และ Data
 * @param {object} docTypeConfig - Config ของเอกสารปัจจุบัน (จาก docTypes.js)
 * @param {object} data - ข้อมูลปัจจุบันของเอกสาร
 * @returns {string} ชื่อไฟล์ที่เหมาะสม
 */
export const getExportFileName = (docTypeConfig, data) => {
  // 💡 docTypes.js ควรมีฟังก์ชัน fileName: (data) => `...`
  if (docTypeConfig.fileName && typeof docTypeConfig.fileName === 'function') {
    return docTypeConfig.fileName(data);
  }
  return `ExportedDocument-${docTypeConfig.key || 'unknown'}`;
};

/**
 * Exports a specified DOM element content as a PNG image.
 */
export const exportToPng = async (printRef, fileName) => {
  if (!printRef.current) return alert('ไม่พบพื้นที่เอกสารสำหรับส่งออก');

  try {
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${fileName}.png`;
    link.click();
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    alert('เกิดข้อผิดพลาดในการสร้างไฟล์ PNG');
  }
};

/**
 * Exports a specified DOM element content as a PDF document (A4 size).
 */
export const exportToPdf = async (printRef, fileName) => {
  if (!printRef.current) return alert('ไม่พบพื้นที่เอกสารสำหรับส่งออก');

  try {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // กำหนดขนาด A4 (p, mm, a4)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    let heightLeft = imgHeight;
    let position = 0;

    // วาดหน้าแรก
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    // จัดการเนื้อหาหลายหน้า
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('เกิดข้อผิดพลาดในการสร้างไฟล์ PDF');
  }
};
