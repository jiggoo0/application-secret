// lib/html_templates/generateHotelVerifiedHtml.js

/**
 * @description สร้าง HTML Template สำหรับ Hotel Booking (Minimal Mock)
 * @param {object} bookingData - ข้อมูล BookingSchema ที่มี hotel_details
 * @returns {string} Full HTML document string
 */
export function generateHotelVerifiedHtml(bookingData) {
  const pnr = bookingData.pnr_code || 'N/A';
  const name = bookingData.traveller_name || 'N/A';
  const hotelName = bookingData.hotel_details?.hotel_name || 'N/A';
  const checkIn = bookingData.hotel_details?.check_in_date || 'N/A';
  const checkOut = bookingData.hotel_details?.check_out_date || 'N/A';
  const confNo = bookingData.hotel_details?.confirmation_no || 'N/A';

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>Hotel Voucher: ${pnr}</title>
        <style>
            body { font-family: Tahoma, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .content { border: 1px solid #ffc107; padding: 20px; border-radius: 5px; }
            .status-box { background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; text-align: center; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>เอกสารยืนยันการจองโรงแรม</h2>
            <p>Confirmation No: <strong>${confNo}</strong> | PNR: <strong>${pnr}</strong></p>
        </div>
        <div class="content">
            <h3>ข้อมูลโรงแรม</h3>
            <p><strong>โรงแรม:</strong> ${hotelName}</p>
            <p><strong>เช็คอิน:</strong> ${checkIn}</p>
            <p><strong>เช็คเอาท์:</strong> ${checkOut}</p>
            <p><strong>ผู้จอง:</strong> ${name}</p>

            <div class="status-box">
                <p>การจองนี้ได้รับการยืนยันแล้ว โปรดนำเอกสารนี้ไปแสดงเมื่อเช็คอิน</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
