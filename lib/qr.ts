// /lib/qr.ts

import QRCode from 'qrcode';

/**
 * generateQR
 * @param {string} token - qr_token จาก DB
 * @param {object} options - optional config
 * @returns {Promise<Buffer>} PNG image buffer
 */
export async function generateQR(token, options = {}) {
  try {
    // default size 200x200, error correction M
    // *** FIX: ใช้ Type Assertion (as const) เพื่อแก้ไข Type Error ***
    const opts = {
      type: 'png' as const, // กำหนดเป็น Literal Type 'png'
      width: 200,
      errorCorrectionLevel: 'M' as const, // กำหนดเป็น Literal Type 'M'
      ...options,
    };

    const qrBuffer = await QRCode.toBuffer(token, opts);
    return qrBuffer;
  } catch (err) {
    console.error('QR generation error:', err);
    throw err;
  }
}
