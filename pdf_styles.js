// pdf_styles.js
// CommonJS Module for pdfmake font definitions and styling (JP AIRWAYS Standard).

const path = require('path');

const getFontPath = (fileName) => path.join(__dirname, 'fonts', fileName);

// --- 1. Fonts Configuration ---
const pdfFonts = {
  THSarabunNew: {
    normal: getFontPath('THSarabunNew.ttf'),
    bold: getFontPath('THSarabunNew Bold.ttf'),
    italics: getFontPath('THSarabunNew Italic.ttf'),
    bolditalics: getFontPath('THSarabunNew BoldItalic.ttf'),
  },
  Roboto: {
    normal: getFontPath('Roboto-Regular.ttf'),
    bold: getFontPath('Roboto-Medium.ttf'),
    italics: getFontPath('Roboto-Italic.ttf'),
    bolditalics: getFontPath('Roboto-MediumItalic.ttf'),
  },
};

// --- 2. Styles Configuration (JPAIR Standard) ---
const pdfStyles_JPAIR = {
  // Style พื้นฐาน
  defaultStyle: {
    fontSize: 10,
    lineHeight: 1.2,
  },

  // Header (General Title)
  header: {
    fontSize: 24,
    bold: true,
    color: '#003366', // JP Airways Blue
    margin: [0, 0, 0, 10],
  },

  // Section Header (Sub-Titles)
  sectionHeader: {
    fontSize: 15,
    bold: true,
    color: '#c62828', // Section Separator Red
    margin: [0, 15, 0, 5],
  },

  // Label Style (สำหรับชื่อฟิลด์)
  labelStyle: {
    bold: true,
    color: '#555',
  },

  // Table Header (ใช้สำหรับ Flight Segment)
  tableHeader: {
    fontSize: 12,
    bold: true,
    fillColor: '#003366', // JP Airways Blue
    color: '#ffffff', // White Text
    alignment: 'center',
    margin: [0, 5, 0, 5],
  },

  // Cell Content (ใช้ 10px ตาม defaultStyle)
  tableCell: {
    fontSize: 10,
  },
};

// --- 3. Export ด้วย CommonJS ---
module.exports = {
  pdfFonts,
  pdfStyles: pdfStyles_JPAIR, // Export styles under the common name 'pdfStyles'
};
