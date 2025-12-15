// lib/html_templates/templates/HotelTemplate.js (UI/Template)

import { PDF_COLORS } from '../pdf_layout_blocks';

// ----------------------------------------------------
// 1. MAIN TEMPLATE FUNCTION
// ----------------------------------------------------

/**
 * @title generateHotelContent
 * @description สร้าง HTML CONTENT สำหรับการจองโรงแรม (ไม่รวม DOCTYPE และ Base Layout)
 * @param {Object} data - ข้อมูลการจองโรงแรม (BookingSchema)
 * @returns {string} HTML Content String (CSS + HTML Content)
 */
export function generateHotelContent(data = {}) {
  const {
    booking_id = 'N/A',
    customer_name = 'Customer Name',
    customer_city = 'N/A',
    customer_nationality = 'N/A',
    customer_email = 'N/A',
    customer_phone = 'N/A',

    room_type = 'N/A',
    rate_plan = 'N/A',
    num_rooms = 1,
    adults_per_room = 2,
    children = 0,
    breakfast_status = 'N/A',
    num_nights = 1,

    check_in_date = 'YYYY-MM-DD',
    check_out_date = 'YYYY-MM-DD',

    total_paid_amount = '0.00',
    currency = 'THB',
    cancellation_policy = 'N/A',
    rate_date = 'N/A',
    rate_per_room = 'N/A',

    hotel_name_brand = 'JP HOTEL & RESORT',
    verification_status = 'RESERVATION VERIFIED',
    remark_text = 'ไม่พบหมายเหตุพิเศษ',
    hotel_address = [],
    hotel_contact_name = 'JP Hotel Reservation',
    hotel_phone = 'N/A',
    hotel_email = 'N/A',
  } = data;

  // 💡 FIX: ตรวจสอบและจัดการ hotel_address ให้อยู่ในรูปแบบที่ถูกต้อง
  const hotelAddressHtml =
    Array.isArray(hotel_address) && hotel_address.length > 0
      ? hotel_address.filter((line) => line).join('<br>')
      : 'No Address Provided';

  const accent = '#c62828'; // JP Hotel Red
  const { SUCCESS, BORDER, MUTED } = PDF_COLORS;

  // 💡 Template CSS (Hotel Specific) - ใช้ตัวแปร CSS เพื่อความสะอาดของโค้ด
  const componentStyle = `
        <style>
            /* Hotel-Specific Styles */
            header.hotel-header {
                text-align: center;
                border-bottom: 1pt solid ${accent};
                margin-bottom: 20pt;
                padding-bottom: 10pt;
            }
            .brand-logo {
                font-size: 18pt;
                font-weight: 700;
                color: ${accent};
            }
            .main-title {
                font-size: 20pt;
                font-weight: 700;
                margin: 6pt 0;
                color: ${accent};
            }
            .verification-status {
                display: inline-block;
                margin-top: 6pt;
                padding: 4pt 10pt;
                background: ${SUCCESS};
                color: #fff;
                font-size: 10pt;
                border-radius: 3pt;
                font-weight: 700;
                text-transform: uppercase;
            }
            .detail-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20pt 20pt;
                margin-bottom: 20pt;
            }
            .detail-block h2 {
                font-size: 12pt;
                border-bottom: 1pt solid ${BORDER};
                margin-bottom: 8pt;
                color: #333;
                font-weight: 700;
                padding-bottom: 3pt;
            }
            .field {
                display: flex;
                justify-content: space-between;
                font-size: 10pt;
                margin: 3pt 0;
                line-height: 1.4;
            }
            .field span:first-child {
              font-weight: 500;
              color: #444;
            }
            .check-dates {
                display: flex;
                justify-content: space-between;
                background: #ffebeb;
                border: 1pt solid ${accent};
                padding: 10pt 20pt;
                margin-bottom: 15pt;
                font-weight: 700;
                font-size: 12pt;
                border-radius: 4pt;
            }
            .remark-section,
            .attention-section {
                margin-top: 15pt;
                padding: 12pt;
                border: 1pt solid ${BORDER};
                font-size: 10pt;
            }
            .remark-section h2, .attention-section h2 {
                border: none;
                font-size: 12pt;
                margin-bottom: 5pt;
                color: ${accent};
                font-weight: 700;
            }
            .remark-section p {
                line-height: 1.5;
                color: #555;
            }
            .attention-section ul {
                list-style-type: none;
                padding-left: 0;
            }
            .attention-section li {
                margin-bottom: 5pt;
                padding-left: 10pt;
                position: relative;
            }
            .attention-section li::before {
                content: '•';
                color: ${accent};
                font-weight: 700;
                position: absolute;
                left: 0;
            }
            .footer-info {
                display: flex;
                justify-content: space-between;
                margin-top: 25pt;
                border-top: 1pt solid ${BORDER};
                padding-top: 15pt;
            }
            .rate-box {
                width: 45%;
                border: 2pt solid ${SUCCESS};
                background: #f1f8e9; /* Light Green Background */
                text-align: center;
                padding: 15pt;
                border-radius: 6pt;
            }
            .rate-box .total {
                font-size: 22pt;
                font-weight: 700;
                color: ${SUCCESS};
                margin: 5pt 0;
            }
            .rate-box div:nth-child(3) { /* Cancellation Policy */
                font-size: 11pt;
                font-weight: 500;
                color: #555;
            }
            .reservation-contact {
                width: 45%;
                font-size: 10pt;
                text-align: right;
                line-height: 1.5;
                color: ${MUTED};
            }
        </style>
  `;

  const componentHtml = `
    <header class="hotel-header">
      <div class="brand-logo">${hotel_name_brand}</div>
      <div class="main-title">Hotel Voucher & Confirmation</div>
      <div class="verification-status">${verification_status}</div>
    </header>

    <div class="detail-grid">
      <div class="detail-block">
        <h2>Customer & Booking Information</h2>
        <div class="field"><span>Booking ID:</span><span class="mono">${booking_id}</span></div>
        <div class="field"><span>Name:</span><span>${customer_name}</span></div>
        <div class="field"><span>City:</span><span>${customer_city}</span></div>
        <div class="field"><span>Nationality:</span><span>${customer_nationality}</span></div>
        <div class="field"><span>Email:</span><span>${customer_email}</span></div>
        <div class="field"><span>Phone:</span><span>${customer_phone}</span></div>
      </div>

      <div class="detail-block">
        <h2>Reservation Details</h2>
        <div class="field"><span>Room Type:</span><span>${room_type}</span></div>
        <div class="field"><span>Rate Plan:</span><span>${rate_plan}</span></div>
        <div class="field"><span>Rooms:</span><span>${num_rooms}</span></div>
        <div class="field"><span>Adults / Room:</span><span>${adults_per_room}</span></div>
        <div class="field"><span>Children:</span><span>${children}</span></div>
        <div class="field"><span>Breakfast:</span><span>${breakfast_status}</span></div>
        <div class="field"><span>Total Nights:</span><span>${num_nights}</span></div>
      </div>
    </div>

    <div class="check-dates">
      <div>CHECK-IN DATE: <br/> **${check_in_date}**</div>
      <div>CHECK-OUT DATE: <br/> **${check_out_date}**</div>
    </div>

    <div class="remark-section">
      <h2>Special Request / Remark</h2>
      <p>${remark_text}</p>
    </div>

    <div class="footer-info">
      <div class="rate-box">
        <div>TOTAL PAID AMOUNT</div>
        <div class="total">${total_paid_amount} ${currency}</div>
        <div>Cancellation Policy: ${cancellation_policy}</div>
        <div style="font-size:10pt;margin-top:6pt;">
          Rate Date: ${rate_date} | Rate: ${rate_per_room} ${currency} / room
        </div>
      </div>

      <div class="reservation-contact">
        <strong>Hotel Contact: ${hotel_contact_name}</strong><br />
        ${hotelAddressHtml}<br />
        Phone: ${hotel_phone}<br />
        Email: ${hotel_email}
      </div>
    </div>

    <div class="attention-section">
      <h2>ATTENTION: IMPORTANT NOTES</h2>
      <ul>
        <li>Guest must present this voucher at check-in (Printed or Digital).</li>
        <li>This booking (${booking_id}) is fully prepaid. Do not pay the hotel directly.</li>
        <li>Hotel Check-in time is typically 15:00 hrs. Check-out is 12:00 hrs.</li>
      </ul>
    </div>
    `;

  return componentStyle + componentHtml;
}

// ----------------------------------------------------
// 2. EXPORT (The Fix for Module Resolution)
// ----------------------------------------------------

/**
 * 💡 FIX: เพิ่ม Default Export เพื่อแก้ปัญหา Module Resolution (g.default is not a function)
 */
export default generateHotelContent;
