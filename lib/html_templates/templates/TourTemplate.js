// lib/html_templates/templates/TourTemplate.js (Template Component)

import { PDF_COLORS } from '../pdf_layout_blocks';

/**
 * @description สร้าง HTML Content สำหรับการจองทัวร์ (ไม่รวม DOCTYPE และ Base Layout)
 * @param {object} data - ข้อมูลการจองที่ผ่านการ Map และจัดรูปแบบแล้ว
 * @returns {string} - HTML Content String
 */
export function generateTourContent(data = {}) {
  const {
    agency_name = 'JPDATABUSINESSES',
    agency_tagline = 'Your Trusted Travel Partner',

    voucher_no = 'JPTOUR-001',
    booking_date = 'YYYY-MM-DD',

    customer_name = 'Customer Name',
    customer_nationality = 'N/A',
    total_passengers = '1 (Adult)',
    customer_email = 'email@example.com',
    customer_phone = '+66 8x xxx xxxx',
    pickup_location = 'Hotel Lobby',

    tour_name = 'TOUR PACKAGE NAME',
    activity_date = 'DATE, MONTH YYYY',
    activity_time = '09:00 AM - 04:00 PM',
    package_type = 'Standard',
    included_meals = 'None',
    language = 'English',
    transfer_type = 'Shared Van',
    zone = 'Free Pick-up Zone',

    total_paid_amount = '0.00',
    currency = 'THB',
    payment_status_text = 'AWAITING PAYMENT',
    price_detail = 'Details N/A',
    confirmation_status = 'PENDING',

    verified_date = 'N/A',
  } = data;

  const accent = PDF_COLORS.ACCENT;
  const success = PDF_COLORS.SUCCESS;
  const highlight_bg = PDF_COLORS.HIGHLIGHT_BG;

  // NOTE: CSS styles are adapted from the original generateTourVerifiedHtml.js
  const componentStyle = `
    <style>
        /* Header */
        header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20pt;
          padding-bottom: 15pt;
          border-bottom: 3pt solid var(--accent);
        }
        .agency-info {
            text-align: left;
        }
        .agency-name{
            font-size: 20pt;
            font-weight: 800;
            color: var(--accent);
            margin: 0;
            letter-spacing: 0.5pt;
        }
        .agency-tagline {
            font-size: 11pt;
            color: var(--muted);
            margin: 3pt 0 0 0;
        }
        .voucher-details {
            text-align: right;
            font-size: 10pt;
            line-height: 1.5;
        }
        .voucher-details .title {
            font-size: 14pt;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 5pt;
        }
        .voucher-details .mono {
            font-size: 11pt;
            color: #000;
        }
        
        /* Tour Highlight */
        .tour-highlight {
            background: ${highlight_bg};
            border: 1pt solid ${accent};
            padding: 12pt 16pt;
            margin: 0 0 20pt 0;
            border-radius: 4pt;
        }
        .tour-highlight .tour-name {
            font-size: 16pt;
            font-weight: 700;
            color: ${accent};
            margin: 0 0 4pt 0;
        }
        .tour-highlight .tour-date {
            font-size: 12pt;
            font-weight: 700;
            color: #333;
        }
    
        /* Pricing/Confirmation */
        .footer-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 30pt;
            padding-top: 15pt;
            border-top: 1pt solid var(--border);
        }
        .rate-box {
            text-align: center;
            width: 45%;
            border: 2pt solid ${success};
            background: #f0fff0;
            padding: 15pt;
            border-radius: 4pt;
        }
        .rate-box .label { font-size: 11pt; color: var(--muted); }
        .rate-box .total { font-size: 24pt; font-weight: 700; color: ${success}; margin: 5pt 0; }
        .rate-box .policy { font-size: 11pt; font-weight: 700; color: #333; }
    
        .confirmation-seal {
            width: 45%;
            text-align: right;
            padding-top: 8pt;
        }
        .confirmation-seal .status {
            font-size: 14pt;
            font-weight: 800;
            color: ${success};
            border: 3pt double ${success};
            padding: 4pt 12pt;
            display: inline-block;
            margin-bottom: 6pt;
            text-transform: uppercase;
        }
        .confirmation-seal .date {
            font-size: 9pt;
            color: var(--muted);
        }
    
        /* Important Notes */
        .attention-section {
            margin-top: 25pt;
            padding: 15pt;
            border: 1pt solid var(--border);
            background: #fcfcfc;
            border-radius: 4pt;
        }
        .attention-section h2 {
            border: none;
            margin-bottom: 5pt;
            font-size: 12pt;
            color: ${accent};
        }
        .attention-section ul {
            font-size: 10pt;
            line-height: 1.5;
            padding-left: 15pt;
            margin: 8pt 0 0 0;
        }
    </style>
  `;

  const componentHtml = `
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
            <div class="muted" style="margin-top:10pt; font-size:9pt;">${price_detail}</div>
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
  `;

  return componentStyle + componentHtml;
}
