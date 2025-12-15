// lib/html_templates/templates/FlightTemplate.js (UI/Template)

import { PDF_COLORS } from '../pdf_layout_blocks';

// ----------------------------------------------------
// 1. UTILITY FUNCTIONS
// ----------------------------------------------------

// 1.1. Generate Flight Segment Blocks (Logic Utility)
const generateFlightSegments = (segments) => {
  const accentJP = '#c62828'; // Flight Accent: Custom Red

  // ตรวจสอบว่ามี segments หรือไม่
  if (!segments || segments.length === 0) {
    return `
        <div style="padding: 15pt; border: 1pt dashed #ccc; text-align: center; color: #777;">
            ไม่พบรายละเอียดเที่ยวบินในข้อมูลการจองนี้
        </div>
      `;
  }

  return segments
    .map(
      (seg) => `
      <div class="segment" aria-label="${seg.airline} Flight ${seg.flight_number} ${seg.type}">
        <div class="segment-label" style="background:${accentJP};">${seg.type || 'UNKNOWN'}</div>
        <div class="seg-head" style="border-bottom: 1pt solid #f2d6d6; color: ${accentJP};">
          <span>${seg.origin_name || 'N/A'} (${seg.origin_code || 'N/A'}) </span>
          <span>&rarr; ${seg.destination_name || 'N/A'} (${seg.destination_code || 'N/A'})</span>
        </div>
        <div class="seg-details">
            <div style="text-align: left;">
                <div class="date-time">${seg.depart_time || 'N/A'}</div>
                <div class="airport-info">${seg.date || 'N/A'}</div>
            </div>
            <div>
                <div class="flight-info">${seg.airline || 'N/A'} ${seg.flight_number || 'N/A'}</div>
                <div class="airport-info">Equipment: ${seg.equipment || 'N/A'}</div>
                <div class="airport-info">Class: ${seg.class || 'N/A'}</div>
            </div>
            <div style="text-align: right;">
                <div class="date-time">${seg.arrive_time || 'N/A'}</div>
                <div class="airport-info">${seg.date || 'N/A'}</div>
            </div>
        </div>
      </div>
    `,
    )
    .join('');
};

// 1.2. Generate Fare Breakdown Table Rows (Logic Utility)
const generateFareRows = (fares, currency_code) => {
  if (!fares || fares.length === 0) {
    return `<tr><td colspan="6" style="text-align: center; color: #777;">ไม่พบรายละเอียดค่าโดยสาร</td></tr>`;
  }

  return fares
    .map(
      (fare) => `
      <tr>
        <td>${fare.pax_type || 'N/A'}</td>
        <td>${fare.base_fare || '0.00'}</td>
        <td>${fare.taxes || '0.00'}</td>
        <td>${fare.total_fare_per_pax || '0.00'}</td>
        <td>x ${fare.num_pax || 0}</td>
        <td style="font-weight: 700;">${fare.total_fare_line || '0.00'} ${currency_code}</td>
      </tr>
    `,
    )
    .join('');
};

// ----------------------------------------------------
// 2. MAIN TEMPLATE FUNCTION
// ----------------------------------------------------

/**
 * @title generateFlightContent
 * @description สร้าง HTML CONTENT สำหรับการจองเที่ยวบิน (ไม่รวม DOCTYPE และ Base Layout)
 * @param {object} data - ข้อมูลการจองที่จำเป็นทั้งหมด (BookingSchema)
 * @returns {string} - โค้ด HTML Segment (CSS + HTML Content)
 */
export function generateFlightContent(data = {}) {
  const {
    airline_name = 'JP AIRLINES',
    contact_phone = 'N/A',
    contact_email = 'N/A',

    passenger_name = 'PASSENGER NAME',
    ticket_number = 'N/A',
    pnr_code = 'N/A',
    booking_status = 'PENDING',
    passenger_email = 'N/A',
    passenger_mobile = 'N/A',
    baggage_allowance = 'N/A',

    flight_segments = [],
    fare_details = [],
    total_fare = '0.00',
    currency_code = 'THB',
    payment_status = 'N/A',
    payment_card = 'N/A',
  } = data;

  const accentJP = '#c62828'; // Custom Accent Color for Flight (Red)
  const { SUCCESS, BORDER, MUTED } = PDF_COLORS;

  const flightSegmentsHtml = generateFlightSegments(flight_segments);
  const fareRowsHtml = generateFareRows(fare_details, currency_code);

  // 💡 Template CSS (Flight Specific)
  const componentStyle = `
        <style>
            /* Flight-Specific Styles */
            .flight-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 25pt;
                font-size: 10pt;
            }
            .airline-name {
                font-size: 18pt;
                font-weight: 700;
                color: ${accentJP};
            }
            .receipt-title {
                background: ${accentJP};
                color: white;
                padding: 8pt 15pt;
                font-size: 14pt;
                font-weight: 700;
                /* NOTE: Margin adjusted for a clean bleed effect within the container */
                margin: 15pt -30pt 12pt -30pt; 
                text-align: center;
            }
            .meta {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20pt 25pt;
                margin-bottom: 12pt;
                font-size: 9pt;
            }
            .field .label {
              font-weight: 700;
              color: #333;
              display: inline-block;
              width: 120pt; /* Fixed width for alignment */
            }
            .field .value.mono {
              font-family: var(--mono);
            }
            .note {
                font-size: 9pt;
                color: #cc0000;
                margin-top: 8pt;
                padding: 6pt;
                border: 1pt dashed #f2d6d6;
                background: #fff8f8;
                border-radius: 4pt;
            }
            .note.info {
                color: ${accentJP};
                border-color: ${accentJP};
                background: #ffeeee;
            }
            .segment {
                border: 1pt solid ${BORDER};
                background: #fdf5f5; 
                padding: 10pt;
                margin-bottom: 10pt;
                border-radius: 4pt;
                position: relative;
            }
            .segment-label {
                position: absolute;
                top: 0;
                left: 0;
                background: ${accentJP};
                color: white;
                padding: 2pt 8pt;
                font-size: 8pt;
                border-bottom-right-radius: 4pt;
                font-weight: 700;
            }
            .seg-head {
                margin-top: 10pt;
                padding: 5pt 0;
                font-weight: 700;
                font-size: 11pt;
                display: flex;
                justify-content: space-between;
            }
            .seg-details {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 12pt;
                font-size: 10pt;
                margin-top: 8pt;
                text-align: center;
            }
            .date-time {
                font-size: 14pt;
                font-weight: 700;
                color: #000;
            }
            /* Table (Fare Breakdown) */
            table.fare {
              width: 100%;
              border-collapse: collapse;
              margin-top: 12pt;
              font-size: 9pt;
            }
            table.fare th, table.fare td {
              border: 1pt solid ${BORDER};
              padding: 6pt;
            }
            table.fare th {
              background: #f2e6e6;
              font-weight: 700;
              text-align: center;
              color: #333;
            }
            table.fare td:nth-child(1) { /* Passenger Type */
              text-align: left;
            }
            table.fare td:nth-child(2),
            table.fare td:nth-child(3),
            table.fare td:nth-child(4),
            table.fare td:nth-child(5),
            table.fare td:nth-child(6) {
              text-align: right;
            }
            
            .totals-area {
              margin-top: 15pt;
              text-align: right;
            }
            .payment-status {
              font-size: 11pt;
              font-weight: 700;
              color: ${SUCCESS};
              margin-bottom: 4pt;
            }
            .grand-total {
              font-size: 16pt;
              font-weight: 700;
              color: ${accentJP};
              padding: 8pt 0;
              border-top: 2pt double ${accentJP};
              margin-top: 8pt;
            }
            footer {
                margin-top: 20pt;
                font-size: 9pt;
                color: ${MUTED};
                border-top: 1pt dashed ${BORDER};
                padding-top: 8pt;
                text-align: center;
            }
        </style>
    `;

  const componentHtml = `
    <div data-pdf-type="flight">
        <header class="flight-header">
            <div class="logo-container">
                <div class="airline-name">${airline_name}</div>
            </div>
            <div class="contact-info">
                ${airline_name} Berhad<br>
                Reservation Office: ${contact_phone}<br>
                Email: ${contact_email}
            </div>
        </header>

        <div id="receipt-title" class="receipt-title">TRAVEL ITINERARY RECEIPT</div>

        <section class="section-group">
            <h2>PASSENGER & BOOKING INFORMATION</h2>
            <div class="meta">
                <div>
                    <div class="field"><span class="label">Passenger Name:</span><span class="value">${passenger_name}</span></div>
                    <div class="field"><span class="label">Ticket Number:</span><span class="value mono">${ticket_number}</span></div>
                    <div class="field"><span class="label">Reference (PNR):</span><span class="value mono">${pnr_code} (${booking_status})</span></div>
                </div>
                <div>
                    <div class="field"><span class="label">Email:</span><span class="value">${passenger_email}</span></div>
                    <div class="field"><span class="label">Mobile:</span><span class="value">${passenger_mobile}</span></div>
                    <div class="field"><span class="label">Checked Baggage:</span><span class="value">${baggage_allowance}</span></div>
                </div>
            </div>
            <p class="note">
                *Important: Please bring a photocopy or the actual credit/debit card used for the online purchase, along with the cardholder's photo ID, for verification at check-in/ticket issuance.
            </p>
        </section>

        <section class="section-group">
            <h2>AIR ITINERARY DETAILS</h2>
            ${flightSegmentsHtml}
            <p class="note info">
                *The boarding gate will be closed **20 minutes** prior to departure. Please proceed to the gate promptly.
            </p>
        </section>

        <section class="section-group">
            <h2>FARE BREAKDOWN & PAYMENT RECEIPT</h2>
            <table class="fare">
                <thead>
                    <tr>
                        <th style="text-align: left;">Passenger Type</th>
                        <th>Base Fare (${currency_code})</th>
                        <th>Taxes (${currency_code})</th>
                        <th>Total Fare per person (${currency_code})</th>
                        <th>No. of Passengers</th>
                        <th>Total Fare (${currency_code})</th>
                    </tr>
                </thead>
                <tbody>
                    ${fareRowsHtml}
                </tbody>
            </table>
            
            <div class="totals-area">
                <div class="payment-status">TOTAL AIR FARE: ${total_fare} ${currency_code} (${payment_status})</div>
                <div class="grand-total">
                    <span style="font-size:11pt; font-weight:400; color: #333;">Charged to ${payment_card}:</span> ${total_fare} ${currency_code}
                </div>
            </div>
        </section>

        <footer>
            <p>Thank you for choosing ${airline_name}. Note: A meal will be served on flights where the flying time is more than 60 minutes.</p>
        </footer>
    </div>
    `;

  return componentStyle + componentHtml;
}

// 💡 FIX: เพิ่ม Default Export เพื่อแก้ปัญหา Module Resolution (g.default is not a function)
export default generateFlightContent;
