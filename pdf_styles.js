// pdf_styles.js
// CommonJS Module for pdfmake font definitions and styling.

const path = require('path');

// 💡 Helper function เพื่อให้ได้ Path ที่ถูกต้องสำหรับฟอนต์
// ใช้ path.join กับ __dirname เพื่ออ้างอิง path สัมพัทธ์จากตำแหน่งของไฟล์ปัจจุบัน
// สมมติว่าไฟล์ pdf_styles.js อยู่ใน root และ fonts/ อยู่ใน root เช่นกัน
const getFontPath = (fileName) => path.join(__dirname, 'fonts', fileName);

// --- 1. Fonts Configuration ---
const pdfFonts = {
  // 💡 Font สำหรับภาษาไทย: TH Sarabun New
  THSarabunNew: {
    normal: getFontPath('THSarabunNew.ttf'),
    bold: getFontPath('THSarabunNew Bold.ttf'),
    italics: getFontPath('THSarabunNew Italic.ttf'),
    bolditalics: getFontPath('THSarabunNew BoldItalic.ttf'),
  },
  // Font มาตรฐานสำหรับภาษาอังกฤษ/ตัวเลข (Fallback)
  Roboto: {
    normal: getFontPath('Roboto-Regular.ttf'),
    bold: getFontPath('Roboto-Medium.ttf'),
    italics: getFontPath('Roboto-Italic.ttf'),
    bolditalics: getFontPath('Roboto-MediumItalic.ttf'),
  },
};

// --- 2. Styles Configuration ---
const pdfStyles = {
  // Style พื้นฐาน
  defaultStyle: {
    fontSize: 10,
    lineHeight: 1.2,
  },
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 0, 0, 10],
  },
  sectionHeader: {
    fontSize: 15,
    bold: true,
    color: '#c62828', // สีแดงเข้ม
    margin: [0, 15, 0, 5],
  },
  labelStyle: {
    bold: true,
    color: '#555',
  },
  tableHeader: {
    fontSize: 13,
    bold: true,
    fillColor: '#eeeeee',
    alignment: 'center',
  },
  tableCell: {
    fontSize: 12,
  },
};

// --- 3. Export ด้วย CommonJS ---
module.exports = {
  pdfFonts,
  pdfStyles,
};
