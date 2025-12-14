// lib/html_templates/pdf_layout_blocks.js (Styling / UI Color Interpreter)

// 💡 Color Constants
export const PDF_COLORS = {
  ACCENT: '#00897b', // Teal for Tour Agency
  SUCCESS: '#2e7d32', // Green for Confirmation
  BORDER: '#e0e0e0',
  MUTED: '#666',
  HIGHLIGHT_BG: '#e0f2f1', // Light Teal
  PAPER_BG: '#f4f4f6',
  TEXT_COLOR: '#111',
};

// 💡 Global Styles (CSS String) - ใช้หน่วย pt (Points) สำหรับความแม่นยำในการพิมพ์ PDF
const { ACCENT, SUCCESS, BORDER, MUTED, PAPER_BG, TEXT_COLOR } = PDF_COLORS;

export const globalPdfStyles = `
  /* Font Definitions */
  @font-face {
    font-family: 'TH Sarabun New';
    src: url('file:///usr/share/fonts/truetype/THSarabunNew.ttf') format('truetype');
    /* NOTE: Adjust path to your PDF generation environment */
    font-weight: normal;
    font-style: normal;
  }
  
  :root{
    --page-width: 780pt;
    --accent: ${ACCENT}; 
    --success: ${SUCCESS};
    --muted: ${MUTED};
    --border: ${BORDER};
    --bg: #ffffff;
    --paper-bg: ${PAPER_BG};
    --mono: "Courier New", Courier, monospace;
    --font-sans: "TH Sarabun New", Arial, sans-serif; /* Priority Thai Font */
  }

  /* Base/Page (Adapted from Tour template to use pt units) */
  html,body{
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    color: ${TEXT_COLOR};
    font-size: 11pt; /* Base font size for PDF */
  }
  .container{
    max-width: var(--page-width);
    margin: 10mm auto; 
    background: var(--bg);
    border: 1pt solid var(--border);
    box-shadow: 0 2pt 6pt rgba(0,0,0,0.04);
    padding: 20pt 30pt;
  }

  /* Typography Reset */
  h1, h2, h3, p, ul, ol { margin: 0; padding: 0; }
  
  /* Section Styling */
  .section-group { margin-bottom: 20pt; }
  h2{
    font-size: 14pt;
    margin: 0 0 10pt 0;
    padding-bottom: 5pt;
    border-bottom: 1pt solid var(--border);
    color: #333;
    font-weight: 700;
  }
  .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15pt 30pt;
      font-size: 10pt;
      line-height: 1.5;
  }
  .field{ margin: 3pt 0; display: flex; justify-content: space-between; }
  .label{ font-weight:700; flex-shrink: 0; margin-right: 5pt; color: #333; }
  .value { text-align: right; flex-grow: 1; font-weight: 500;}
  .mono{ font-family:var(--mono); color:#222; font-weight: 700; font-size: 11pt; }

  /* Print-friendly overrides */
  @media print{
    .container{ box-shadow:none; border:none; width:100%; padding:0; margin:0; }
    header, .section-group, .tour-highlight, .footer-info, .attention-section { page-break-inside: avoid; }
  }
`;
