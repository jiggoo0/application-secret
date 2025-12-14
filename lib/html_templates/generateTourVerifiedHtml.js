// /lib/html_templates/generateTourVerifiedHtml.js

/**
 * @description สร้าง HTML VOUCHER สำหรับการจองทัวร์
 * (อ้างอิงตามโครงสร้างของ TOUR RESERVATION VOUCHER ของ JPDATABUSINESSES)
 * @param {object} data - ข้อมูลการจองที่จำเป็นทั้งหมด
 * @returns {string} - โค้ด HTML ที่สมบูรณ์
 */
export const generateTourVerifiedHtml = (data = {}) => {
  // 💡 Data Destructuring - แยกข้อมูลที่จำเป็นจาก Object พร้อมกำหนดค่าเริ่มต้น (Default Values)
  const {
    agency_name = 'JPDATABUSINESSES',
    agency_tagline = 'Your Trusted Travel Partner',

    voucher_no = 'JPTOUR-20170623-001',
    booking_date = '2017-06-15',

    customer_name = 'Mr. Jyoti Ranjan Ray',
    customer_nationality = 'INDIA',
    total_passengers = '2 (Adults)',
    customer_email = 'jr.ray@example.com',
    customer_phone = '+91 9937027191',
    pickup_location = 'Sabai Lodge Pattaya',

    tour_name = 'PATTAYA CORAL ISLAND DAY TRIP (FULL DAY)',
    activity_date = 'FRIDAY, 23rd JUNE 2017',
    activity_time = '09:00 AM - 04:00 PM',
    package_type = 'Standard (Speedboat)',
    included_meals = 'Lunch Box',
    language = 'English Guide',
    transfer_type = 'Shared Van',
    zone = 'Pattaya Central (Free Pick-up)',

    total_paid_amount = '2,500.00',
    currency = 'THB',
    payment_status_text = 'PREPAID IN FULL',
    price_detail = 'Price based on 2 Adults @ 1,250.00 THB each',
    confirmation_status = 'BOOKING CONFIRMED',

    // ใช้ Date ปัจจุบันเป็น Default สำหรับ Verified Date
    verified_date = new Date().toLocaleDateString('en-CA'),
  } = data;

  // --- CSS Color Definitions (Matching User's HTML) ---
  const accent = '#00897b'; // Teal for Tour Agency
  const success = '#2e7d32'; // Green
  const border = '#e0e0e0';
  const muted = '#666';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>TOUR RESERVATION VOUCHER - ${agency_name}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root{
      --page-width: 780px;
      --accent: ${accent}; 
      --success: ${success};
      --muted: ${muted};
      --border: ${border};
      --bg: #ffffff;
      --paper-bg: #f4f4f6;
      --mono: "Courier New", Courier, monospace;
      --font-sans: "Arial", "Helvetica", sans-serif;
    }

    /* Base/Page */
    html,body{
      height:100%;
      margin:0;
      background:var(--paper-bg);
      font-family: var(--font-sans);
      color:#111;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    .container{
      max-width:var(--page-width);
      margin:28px auto;
      background:var(--bg);
      border:1px solid var(--border);
      box-shadow:0 2px 6px rgba(0,0,0,0.04);
      padding:28px 36px;
    }

    /* Header */
    header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 3px solid var(--accent);
    }
    .agency-info {
        text-align: left;
    }
    .agency-name{
        font-size: 24px;
        font-weight: 800;
        color: var(--accent);
        margin: 0;
        letter-spacing: 1px;
    }
    .agency-tagline {
        font-size: 14px;
        color: var(--muted);
        margin: 3px 0 0 0;
    }
    .voucher-details {
        text-align: right;
        font-size: 13px;
        line-height: 1.5;
    }
    .voucher-details .title {
        font-size: 18px;
        font-weight: 700;
        color: var(--accent);
        margin-bottom: 5px;
    }
    .voucher-details .mono {
        font-size: 14px;
        color: #000;
    }

    /* Section Styling */
    .section-group {
        margin-bottom: 25px;
    }
    h2{
      font-size: 16px;
      margin: 0 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid var(--border);
      color: #333;
    }
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px 40px;
        font-size: 14px;
        line-height: 1.6;
    }
    .field{ margin: 4px 0; display: flex; justify-content: space-between; }
    .label{ font-weight:700; flex-shrink: 0; margin-right: 8px; color: #333; }
    .value { text-align: right; flex-grow: 1; font-weight: 500;}
    .mono{ font-family:var(--mono); color:#222; font-weight: 700; }
    
    /* Tour Highlight */
    .tour-highlight {
        background: #e0f2f1; /* Light Teal */
        border: 1px solid var(--accent);
        padding: 15px 20px;
        margin: 0 0 25px 0;
        border-radius: 4px;
    }
    .tour-highlight .tour-name {
        font-size: 20px;
        font-weight: 700;
        color: var(--accent);
        margin: 0 0 5px 0;
    }
    .tour-highlight .tour-date {
        font-size: 15px;
        font-weight: 700;
        color: #333;
    }

    /* Pricing/Confirmation */
    .footer-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid var(--border);
    }
    .rate-box {
        text-align: center;
        width: 45%;
        border: 2px solid var(--success);
        background: #f0fff0;
        padding: 15px;
        border-radius: 4px;
    }
    .rate-box .label { font-size: 14px; color: var(--muted); }
    .rate-box .total { font-size: 32px; font-weight: 700; color: var(--success); margin: 5px 0; }
    .rate-box .policy { font-size: 14px; font-weight: 700; color: #333; }

    .confirmation-seal {
        width: 45%;
        text-align: right;
        padding-top: 10px;
    }
    .confirmation-seal .status {
        font-size: 18px;
        font-weight: 800;
        color: var(--success);
        border: 3px double var(--success);
        padding: 5px 15px;
        display: inline-block;
        margin-bottom: 8px;
        text-transform: uppercase;
    }
    .confirmation-seal .date {
        font-size: 12px;
        color: var(--muted);
    }

    /* Important Notes */
    .attention-section {
        margin-top: 25px;
        padding: 15px;
        border: 1px solid var(--border);
        background: #fcfcfc;
        border-radius: 4px;
    }
    .attention-section h2 {
        border: none;
        margin-bottom: 5px;
        font-size: 15px;
        color: var(--accent);
    }
    .attention-section ul {
        font-size: 13px;
        line-height: 1.5;
        padding-left: 18px;
        margin: 8px 0 0 0;
    }
    
    /* Print-friendly */
    @media print{
      body{ background:#fff; margin:0; }
      .container{ box-shadow:none; border:none; width:100%; padding:10mm; margin:0; }
      header, .section-group, .tour-highlight, .footer-info, .attention-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main class="container" role="main" aria-labelledby="voucher-title">
    <header>
      <div class="agency-info">
        <div class="agency-name">${agency_name}</div>
        <p class="agency-tagline">${agency_tagline}</p>
      </div>
      <div class="voucher-details" aria-label="Voucher Information">
        <div class="title" id="voucher-title">TOUR RESERVATION VOUCHER</div>
        <div class="field"><span class="label">Voucher No.:</span> <span class="mono">${voucher_no}</span></div>
        <div class="field"><span class="label">Booking Date:</span> <span>${booking_date}</span></div>
      </div>
    </header>

    <section class="section-group" aria-labelledby="customer-info">
      <h2 id="customer-info">CUSTOMER & CONTACT DETAILS</h2>
      <div class="detail-grid">
        <div>
          <div class="field"><span class="label">Customer Name:</span> <span class="value">${customer_name}</span></div>
          <div class="field"><span class="label">Nationality:</span> <span class="value">${customer_nationality}</span></div>
          <div class="field"><span class="label">Total Passengers:</span> <span class="value">${total_passengers}</span></div>
        </div>
        <div>
          <div class="field"><span class="label">Email:</span> <span class="value">${customer_email}</span></div>
          <div class="field"><span class="label">Phone Contact:</span> <span class="value">${customer_phone}</span></div>
          <div class="field"><span class="label">Pick-up Location:</span> <span class="value">${pickup_location}</span></div>
        </div>
      </div>
    </section>

    <section class="section-group" aria-labelledby="tour-info">
      <h2 id="tour-info">TOUR DETAILS</h2>
      <div class="tour-highlight">
        <p class="tour-name">${tour_name}</p>
        <p class="tour-date">Date of Activity: **${activity_date}**</p>
      </div>

      <div class="detail-grid" style="grid-template-columns: 1fr 1fr 1fr;">
        <div>
            <div class="field"><span class="label">Activity Time:</span> <span class="value">${activity_time}</span></div>
            <div class="field"><span class="label">Package Type:</span> <span class="value">${package_type}</span></div>
        </div>
        <div>
            <div class="field"><span class="label">Included Meals:</span> <span class="value">${included_meals}</span></div>
            <div class="field"><span class="label">Language:</span> <span class="value">${language}</span></div>
        </div>
        <div>
            <div class="field"><span class="label">Transfer Type:</span> <span class="value">${transfer_type}</span></div>
            <div class="field"><span class="label">Zone:</span> <span class="value">${zone}</span></div>
        </div>
      </div>
    </section>

    <div class="footer-info">
        <div class="rate-box">
            <div class="label">Total Paid Amount</div>
            <div class="total">${total_paid_amount} ${currency}</div>
            <div class="policy">${payment_status_text}</div>
            <div class="muted" style="margin-top:10px; font-size:12px;">${price_detail}</div>
        </div>

        <div class="confirmation-seal" aria-label="Confirmation Status">
            <div class="status">${confirmation_status}</div>
            <p class="muted">This voucher serves as your official receipt and ticket.</p>
            <div class="date">Verified: ${verified_date}</div>
        </div>
    </div>

    <div class="attention-section" aria-labelledby="attention-head">
        <h2 id="attention-head">IMPORTANT NOTES FOR GUEST</h2>
        <ul>
            <li>Please be ready in your hotel lobby **15 minutes** prior to the scheduled pick-up time (approx. 08:45 AM).</li>
            <li>This voucher must be presented to the tour guide or driver upon meeting.</li>
            <li>Activities may be subject to change due to weather or operational reasons.</li>
            <li>Wear comfortable clothing, bring swimwear, sunscreen, and cash for personal expenses.</li>
        </ul>
    </div>
  </main>
</body>
</html>
    `;
};
