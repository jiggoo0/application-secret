// lib/html_templates/generateTourVerifiedHtml.js

/**
 * @description สร้าง HTML Template สำหรับ Tour Booking (Minimal Mock)
 * @param {object} bookingData - ข้อมูล BookingSchema ที่มี tour_details
 * @returns {string} Full HTML document string
 */
export function generateTourVerifiedHtml(bookingData) {
  const pnr = bookingData.pnr_code || 'N/A';
  const name = bookingData.traveller_name || 'N/A';
  const tourName = bookingData.tour_details?.tour_name || 'N/A';
  const tourDate = bookingData.tour_details?.tour_date || 'N/A';
  const status = bookingData.booking_status || 'N/A';

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>Tour Voucher: ${pnr}</title>
        <style>
            body { font-family: Tahoma, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .content { border: 1px solid #007bff; padding: 20px; border-radius: 5px; }
            .status-box { background-color: #cfe2ff; color: #004085; padding: 10px; border-radius: 4px; text-align: center; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>เอกสารยืนยันการจองทัวร์/กิจกรรม</h2>
            <p>Booking ID: <strong>${pnr}</strong> | สถานะ: <strong>${status}</strong></p>
        </div>
        <div class="content">
            <h3>ข้อมูลการจอง</h3>
            <p><strong>ชื่อทัวร์:</strong> ${tourName}</p>
            <p><strong>วันที่เดินทาง:</strong> ${tourDate}</p>
            <p><strong>ผู้ติดต่อ:</strong> ${name}</p>

            <div class="status-box">
                <p>โปรดแสดงเอกสารนี้แก่เจ้าหน้าที่เมื่อไปถึงสถานที่</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
