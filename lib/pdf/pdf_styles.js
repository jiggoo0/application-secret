/**
 * @file pdf_styles.js
 * @description Module สำหรับการกำหนด Style Object ทั้งหมดที่ใช้ในเอกสาร PDFmake (Styles Definition).
 * @module pdfStyles
 * @property {object} styles - Object ที่เก็บ Style Definitions ทั้งหมดสำหรับ PDFMake.
 * @property {string} primaryColor - สีหลักของแบรนด์ (#020617).
 * @property {string} dividerColor - สีรองสำหรับเส้นแบ่ง/Key Header (#94a3b8).
 * @property {string} surfaceTextColor - สีของข้อความทั่วไป (#111827).
 * @property {string} successColor - สีเขียวสำหรับสถานะ 'CONFIRMED' (#22c55e).
 * @property {string} lightAccentColor - สีพื้นหลังอ่อนสำหรับตาราง/แถวสลับสี (#f0f4f8).
 */

// ----------------------------------------------------
// 1. SEMANTIC COLOR PALETTE (Formal/Print Optimized)
// ----------------------------------------------------

// Primary: สีหลักของแบรนด์ (Authority, Header, PNR) - Very Dark Slate
const primaryColor = '#020617';
// Muted/Divider: สีรองสำหรับเส้นแบ่ง/Key Header - Mid-tone Slate
const dividerColor = '#94a3b8';
// On-Surface: สีของข้อความทั่วไป (High Contrast for Readability) - Near Black
const surfaceTextColor = '#111827';
// Success: สีเขียวสำหรับสถานะ 'CONFIRMED' (Validation) - Bright Green
const successColor = '#22c55e';
// Surface: สีพื้นหลังอ่อนสำหรับตาราง/แถวสลับสี (Print Friendly) - Pale Blue/Light Grey
const lightAccentColor = '#f0f4f8';

// ----------------------------------------------------
// 2. STYLES DEFINITION OBJECT
// ----------------------------------------------------
const styles = {
  // หัวข้อหลักของส่วน (Section Header)
  sectionHeader: {
    fontSize: 17,
    bold: true,
    margin: [0, 20, 0, 8],
    color: primaryColor,
  },
  // หัวข้อบล็อกย่อย/ตาราง (Table/Block Title)
  tableBlockHeader: {
    bold: true,
    fontSize: 14,
    color: primaryColor,
  },
  // Key: ชื่อฟิลด์ (เน้นความชัดเจน)
  keyHeader: {
    fontSize: 13,
    color: dividerColor,
    bold: true,
  },
  // Key: ชื่อฟิลด์ขนาดเล็ก
  keyHeaderSmall: {
    fontSize: 11,
    color: dividerColor,
    bold: true,
  },
  // Value: ค่าข้อมูลทั่วไป (เน้นความชัดเจน)
  keyValue: {
    fontSize: 15,
    color: surfaceTextColor,
    bold: true,
  },
  // Value: ค่าข้อมูล PNR (เน้นด้วย Primary Color)
  keyValuePNR: {
    fontSize: 15,
    color: primaryColor,
    bold: true,
  },
  // Value: สถานะ (เน้นด้วย Success Color)
  keyValueStatus: {
    fontSize: 15,
    color: successColor,
    bold: true,
  },
  // Utility: Style สำหรับรายการ (Unordered/Ordered Lists) เช่น Important Notes
  notesList: {
    fontSize: 11,
    margin: [0, 5, 0, 5],
    color: dividerColor,
    lineHeight: 1.3,
  },
  // Utility: Style สำหรับ Row/Cell ที่ต้องการพื้นหลังสีอ่อน
  // (ต้องใช้ fillColor ใน content object แต่ style นี้ช่วยกำหนดสีข้อความ)
  stripedBackground: {
    color: surfaceTextColor,
    fontSize: 13,
  },
};

// ----------------------------------------------------
// MODULE EXPORT
// ----------------------------------------------------
module.exports = {
  styles,
  primaryColor,
  dividerColor,
  surfaceTextColor,
  successColor,
  lightAccentColor,
};
