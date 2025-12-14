// lib/html_templates/PdfBaseLayout.js (Layout Component)

import { globalPdfStyles, PDF_COLORS } from './pdf_layout_blocks';

/**
 * @description สร้าง HTML Layout พื้นฐานที่หุ้มเนื้อหาทั้งหมด รวมถึง QR Code และ Timestamp
 * @param {string} contentHtml - HTML Content จาก Template เฉพาะประเภท (e.g., TourTemplate)
 * @param {object} data - ข้อมูลทั้งหมด (รวมถึง QR_BASE64_IMAGE, DISPLAY_SERVER_TIMESTAMP)
 * @returns {string} Full HTML Document String
 */
export function generateBaseLayout(contentHtml, data) {
  // 💡 Placeholder Keys: QR_BASE64_IMAGE, DISPLAY_SERVER_TIMESTAMP
  const { QR_BASE64_IMAGE = '', DISPLAY_SERVER_TIMESTAMP = 'N/A', voucher_no = 'N/A' } = data;

  const accent = PDF_COLORS.ACCENT;

  // Simple regex to extract <style> blocks (for template-specific styles)
  const styleRegex = /<style>([\s\S]*?)<\/style>/gi;
  let componentStyles = '';
  // Extract and remove style tags from contentHtml
  const cleanedContentHtml = contentHtml.replace(styleRegex, (match, p1) => {
    componentStyles += p1;
    return '';
  });

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="utf-8" />
      <title>ใบยืนยันการจอง - #${voucher_no}</title>
      <style>
        ${globalPdfStyles}
        
        /* Layout-specific CSS */
        .verification-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 30pt;
            padding-top: 15pt;
            border-top: 1pt solid var(--border);
        }
        .qr-section { 
            text-align: center; 
        }
        .qr-section img {
            width: 80pt; 
            height: 80pt;
            border: 1pt solid ${accent};
            padding: 2pt;
        }
        .timestamp-info {
            font-size: 9pt;
            color: var(--muted);
            text-align: right;
        }
        
        /* Component-Specific Styles Injection */
        ${componentStyles}

      </style>
    </head>
    <body>
      <main class="container" role="main" aria-labelledby="voucher-title">
        
        ${cleanedContentHtml}

        <div class="verification-footer">
            <div class="qr-section" aria-label="Verification QR Code">
                ${QR_BASE64_IMAGE ? `<img src="data:image/png;base64, ${QR_BASE64_IMAGE}" alt="QR Code Verification" />` : '<p style="color:red; font-size:10pt;">QR Code Unavailable</p>'}
                <p style="font-size: 8pt; margin-top: 5pt; color: ${accent};">สแกนเพื่อตรวจสอบความถูกต้อง</p>
            </div>
            
            <div class="timestamp-info">
                <p>เอกสารนี้ออกโดยระบบและยืนยัน ณ</p>
                <p style="font-weight: 700; color: #000;">${DISPLAY_SERVER_TIMESTAMP}</p>
            </div>
        </div>

      </main>
    </body>
    </html>
  `;
}
