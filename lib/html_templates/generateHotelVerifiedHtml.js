/**
 * @description
 * Generate Hotel Voucher / Verification HTML
 * ใช้สำหรับสร้าง Hotel Voucher (Verified / Prepaid)
 *
 * @param {Object} data - ข้อมูลการจองโรงแรม
 * @returns {string} HTML document
 */
export function generateHotelVerifiedHtml(data = {}) {
  // ----------------------------------------------------
  // 1. Destructure + Default Values (Defensive)
  // ----------------------------------------------------
  const {
    booking_id = 'BOOK00001861',
    customer_name = 'Mr. Jyoti Ranjan Ray',
    customer_city = 'Bhubaneswar',
    customer_nationality = 'INDIA',
    customer_email = '-',
    customer_phone = '919937027191',

    room_type = 'Superior B (Double)',
    rate_plan = 'Internet Rate (Daily)',
    num_rooms = 2,
    adults_per_room = 2,
    children = 0,
    breakfast_status = 'Included (2 guests)',
    num_nights = 1,

    check_in_date = '2013-04-12',
    check_out_date = '2013-04-13',

    total_paid_amount = '1,800.00',
    currency = 'THB',
    cancellation_policy = 'PREPAID - Non-refundable',
    rate_date = '2013-04-12',
    rate_per_room = '900.00',

    hotel_name_brand = 'JP HOTEL PATTAYA',
    verification_status = 'RESERVATION VERIFIED',

    remark_text = "The main booking (13th April'13 to 16th April'13) under BOOK00001765 is noted. This voucher covers the additional night on 12th April'13 due to early arrival.",

    hotel_contact_name = 'JP Hotel Pattaya (Formerly Sabai Lodge)',
    hotel_address = [
      '380 Moo 9, Pattaya Soi 2, Pattaya Beach Road,',
      'Pattaya City, Chonburi, Thailand, 20150',
    ],
    hotel_phone = '+66 (0) 3836 1836-8',
    hotel_email = 'reception@jphotel.com',
  } = data;

  const hotelAddressHtml = Array.isArray(hotel_address)
    ? hotel_address.join('<br>')
    : hotel_address;

  // ----------------------------------------------------
  // 2. HTML Document
  // ----------------------------------------------------
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>HOTEL VOUCHER - ${hotel_name_brand}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <style>
    :root {
      --page-width: 750px;
      --accent: #c62828;
      --success: #2e7d32;
      --muted: #666;
      --border: #e0e0e0;
      --bg: #ffffff;
      --paper-bg: #f4f4f6;
      --mono: "Courier New", Courier, monospace;
      --font-sans: Arial, Helvetica, sans-serif;
    }

    html, body {
      margin: 0;
      background: var(--paper-bg);
      font-family: var(--font-sans);
      color: #111;
    }

    .container {
      max-width: var(--page-width);
      margin: 28px auto;
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 28px 36px;
    }

    header {
      text-align: center;
      border-bottom: 2px solid var(--accent);
      margin-bottom: 20px;
      padding-bottom: 10px;
    }

    .brand-logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 1px;
    }

    .main-title {
      font-size: 26px;
      font-weight: 700;
      margin: 8px 0;
      color: var(--accent);
      text-transform: uppercase;
    }

    .verification-status {
      display: inline-block;
      margin-top: 8px;
      padding: 6px 12px;
      background: var(--success);
      color: #fff;
      font-size: 13px;
      border-radius: 3px;
      font-weight: 700;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .detail-block h2 {
      font-size: 15px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 10px;
    }

    .field {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin: 4px 0;
    }

    .mono {
      font-family: var(--mono);
      font-weight: 700;
    }

    .check-dates {
      display: flex;
      justify-content: space-between;
      background: #ffebeb;
      border: 1px solid var(--accent);
      padding: 12px;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .remark-section,
    .attention-section {
      margin-top: 20px;
      padding: 15px;
      border: 1px solid var(--border);
    }

    .footer-info {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      border-top: 1px solid var(--border);
      padding-top: 15px;
    }

    .rate-box {
      width: 45%;
      border: 2px solid var(--success);
      text-align: center;
      padding: 15px;
    }

    .rate-box .total {
      font-size: 28px;
      font-weight: 700;
      color: var(--success);
    }

    .reservation-contact {
      width: 45%;
      font-size: 13px;
      text-align: right;
    }

    @media print {
      body { background: #fff; }
      .container { border: none; margin: 0; padding: 10mm; }
    }
  </style>
</head>

<body>
  <main class="container">
    <header>
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
        <div style="font-size:12px;margin-top:6px;">
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
  </main>
</body>
</html>
`;
}
