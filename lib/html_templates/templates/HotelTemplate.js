// lib/html_templates/templates/HotelTemplate.js (UI/Template)

import { PDF_COLORS } from '../pdf_layout_blocks';

/**
 * @description สร้าง HTML CONTENT สำหรับการจองโรงแรม
 * @param {Object} data - ข้อมูลการจองโรงแรม
 * @returns {string} HTML Content String
 */
export function generateHotelContent(data = {}) {
  const {
    booking_id = 'BOOK00001861',
    customer_name = 'Customer Name',
    customer_city = 'City',
    customer_nationality = 'N/A',
    customer_email = 'email@example.com',
    customer_phone = 'N/A',

    room_type = 'Superior B (Double)',
    rate_plan = 'Internet Rate (Daily)',
    num_rooms = 1,
    adults_per_room = 2,
    children = 0,
    breakfast_status = 'Included',
    num_nights = 1,

    check_in_date = 'YYYY-MM-DD',
    check_out_date = 'YYYY-MM-DD',

    total_paid_amount = '0.00',
    currency = 'THB',
    cancellation_policy = 'N/A',
    rate_date = 'N/A',
    rate_per_room = 'N/A',

    hotel_name_brand = 'JP HOTEL PATTAYA',
    verification_status = 'RESERVATION VERIFIED',
    remark_text = 'N/A',
    hotel_address = [],
    hotel_contact_name = 'JP Hotel Pattaya',
    hotel_phone = 'N/A',
    hotel_email = 'N/A',
  } = data;

  const hotelAddressHtml = Array.isArray(hotel_address)
    ? hotel_address.join('<br>')
    : hotel_address || 'N/A';

  const accent = '#c62828'; // JP Hotel Red
  const success = PDF_COLORS.SUCCESS;
  const border = PDF_COLORS.BORDER;

  // 💡 Template CSS (Hotel Specific)
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
                background: ${success};
                color: #fff;
                font-size: 10pt;
                border-radius: 3pt;
                font-weight: 700;
            }
            .detail-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20pt 20pt;
                margin-bottom: 20pt;
            }
            .detail-block h2 {
                font-size: 12pt;
                border-bottom: 1pt solid ${border};
                margin-bottom: 8pt;
                color: #333;
                font-weight: 700;
            }
            .field {
                display: flex;
                justify-content: space-between;
                font-size: 10pt;
                margin: 3pt 0;
            }
            .check-dates {
                display: flex;
                justify-content: space-between;
                background: #ffebeb;
                border: 1pt solid ${accent};
                padding: 10pt;
                margin-bottom: 15pt;
                font-weight: 700;
                font-size: 12pt;
            }
            .remark-section,
            .attention-section {
                margin-top: 15pt;
                padding: 12pt;
                border: 1pt solid ${border};
                font-size: 10pt;
            }
            .remark-section h2, .attention-section h2 {
                border: none;
                font-size: 12pt;
                margin-bottom: 5pt;
                color: ${accent};
            }
            .footer-info {
                display: flex;
                justify-content: space-between;
                margin-top: 25pt;
                border-top: 1pt solid ${border};
                padding-top: 15pt;
            }
            .rate-box {
                width: 45%;
                border: 2pt solid ${success};
                text-align: center;
                padding: 15pt;
            }
            .rate-box .total {
                font-size: 22pt;
                font-weight: 700;
                color: ${success};
                margin: 5pt 0;
            }
            .rate-box div:nth-child(3) { /* Cancellation Policy */
                font-size: 11pt;
            }
            .reservation-contact {
                width: 45%;
                font-size: 10pt;
                text-align: right;
            }
        </style>
  `;

  const componentHtml = `
    <header class="hotel-header">
      <div class="brand-logo">${hotel_name_brand}</div>
      <div class="main-title">Hotel Voucher</div>
      <div class="verification-status">${verification_status}</div>
    </header>

    <div class="detail-grid">
      <div class="detail-block">
        <h2>Customer Information</h2>
        <div class="field"><span>Booking ID</span><span class="mono">${booking_id}</span></div>
        <div class="field"><span>Name</span><span>${customer_name}</span></div>
        <div class="field"><span>City</span><span>${customer_city}</span></div>
        <div class="field"><span>Nationality</span><span>${customer_nationality}</span></div>
        <div class="field"><span>Email</span><span>${customer_email}</span></div>
        <div class="field"><span>Phone</span><span>${customer_phone}</span></div>
      </div>

      <div class="detail-block">
        <h2>Reservation Details</h2>
        <div class="field"><span>Room Type</span><span>${room_type}</span></div>
        <div class="field"><span>Rate Plan</span><span>${rate_plan}</span></div>
        <div class="field"><span>Rooms</span><span>${num_rooms}</span></div>
        <div class="field"><span>Adults / Room</span><span>${adults_per_room}</span></div>
        <div class="field"><span>Children</span><span>${children}</span></div>
        <div class="field"><span>Breakfast</span><span>${breakfast_status}</span></div>
        <div class="field"><span>Nights</span><span>${num_nights}</span></div>
      </div>
    </div>

    <div class="check-dates">
      <div>Check-In: ${check_in_date}</div>
      <div>Check-Out: ${check_out_date}</div>
    </div>

    <div class="remark-section">
      <h2>Remark</h2>
      <p>${remark_text}</p>
    </div>

    <div class="footer-info">
      <div class="rate-box">
        <div>Total Paid</div>
        <div class="total">${total_paid_amount} ${currency}</div>
        <div>${cancellation_policy}</div>
        <div style="font-size:10pt;margin-top:6pt;">
          Rate Date: ${rate_date} | ${rate_per_room} ${currency} / room
        </div>
      </div>

      <div class="reservation-contact">
        <strong>${hotel_contact_name}</strong><br />
        ${hotelAddressHtml}<br />
        Phone: ${hotel_phone}<br />
        Email: ${hotel_email}
      </div>
    </div>

    <div class="attention-section">
      <h2>Attention</h2>
      <ul>
        <li>Guest must present this voucher at check-in.</li>
        <li>This booking (${booking_id}) is fully prepaid.</li>
      </ul>
    </div>
    `;

  return componentStyle + componentHtml;
}
