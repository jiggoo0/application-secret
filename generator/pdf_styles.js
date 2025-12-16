// pdf_styles.js
// CommonJS Module for pdfmake font definitions and styling (JP AIRWAYS Standard).
// Focuses only on Font Definition and Base/Default Styles for efficiency.

const path = require('path');

/**
 * Helper function to resolve the absolute path to the font file.
 * Assumes font files are located in a 'fonts' subdirectory relative to this script.
 * @param {string} fileName - Name of the font file.
 * @returns {string} Absolute path to the font file.
 */
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
  // Note: The template (docDefinition) must explicitly select the font based on data.language
};

// --- 2. Styles Configuration (Minimal & Base Styles) ---
const pdfStyles_JPAIR = {
  // Style พื้นฐาน (ใช้ใน docDefinition.defaultStyle)
  defaultStyle: {
    fontSize: 10,
    lineHeight: 1.2,
  },

  // Custom styles defined in the template (e.g., sectionHeader, tableHeader)
  // will override these or are used directly in the template content.
};

// --- 3. Export ด้วย CommonJS ---
module.exports = {
  pdfFonts,
  pdfStyles: pdfStyles_JPAIR, // Export styles under the common name 'pdfStyles'
};
