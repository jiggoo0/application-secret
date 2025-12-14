// lib/html_templates/generateFlightVerifiedHtml.js

/**
 * @description สร้าง HTML Template สำหรับ Flight Booking (Minimal Mock)
 * @param {object} bookingData - ข้อมูล BookingSchema ที่มี flight_details
 * @returns {string} Full HTML document string
 */
export function generateFlightVerifiedHtml(bookingData) {
  const pnr = bookingData.pnr_code || 'N/A';
  const name = bookingData.traveller_name || 'N/A';
  const status = bookingData.booking_status || 'N/A';
  const timestamp = bookingData.DISPLAY_SERVER_TIMESTAMP || 'N/A';

  const flightDetailsHtml =
    bookingData.flight_details
      ?.map(
        (f) => `
    <tr>
        <td>${f.airline_name} (${f.flight_no})</td>
        <td>${f.route}</td>
        <td>${f.date} ${f.depart_time}</td>
    </tr>
  `,
      )
      .join('') || '<tr><td colspan="3">ไม่พบรายละเอียดเที่ยวบิน</td></tr>';

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>Flight Voucher: ${pnr}</title>
        <style>
            body { font-family: Tahoma, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .content { border: 1px solid #ccc; padding: 20px; border-radius: 5px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 0.9em; }
            .status-box { background-color: #d4edda; color: #155724; padding: 10px; border-radius: 4px; text-align: center; margin-top: 10px; }
            .qr-code { text-align: right; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>เอกสารยืนยันการจองเที่ยวบิน</h2>
            <p>PNR: <strong>${pnr}</strong> | สถานะ: <strong>${status}</strong></p>
        </div>
        <div class="content">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <p><strong>ผู้เดินทางหลัก:</strong> ${name}</p>
                    <p>ออกเอกสารเมื่อ: ${timestamp}</p>
                </div>
                <div class="qr-code">
                    <img src="data:image/png;base64,${bookingData.QR_BASE64_IMAGE}" alt="QR Code" width="100" height="100">
                </div>
            </div>

            <h3>รายละเอียดเที่ยวบิน</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>เที่ยวบิน</th>
                        <th>เส้นทาง</th>
                        <th>วัน/เวลาออกเดินทาง</th>
                    </tr>
                </thead>
                <tbody>
                    ${flightDetailsHtml}
                </tbody>
            </table>
            
            <div class="status-box">
                <p>เอกสารนี้ได้รับการยืนยันโดยระบบ</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
