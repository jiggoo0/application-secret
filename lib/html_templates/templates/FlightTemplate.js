// lib/html_templates/templates/FlightTemplate.js (UI/Template)

import { PDF_COLORS } from '../pdf_layout_blocks';

// 1. Generate Flight Segment Blocks (Logic Utility)
const generateFlightSegments = (segments) => {
  const accentJP = '#c62828'; // Flight Accent
  const border = PDF_COLORS.BORDER;

  return segments
    .map(
      (seg) => `
      <div class="segment" aria-label="${seg.airline} Flight ${seg.flight_number} ${seg.type}">
        <div class="segment-label" style="background:${accentJP};">${seg.type}</div>
        <div class="seg-head" style="border-bottom: 1pt solid #f2d6d6; color: ${accentJP};">
          <span>${seg.origin_name} (${seg.origin_code}) </span>
          <span>${seg.destination_name} (${seg.destination_code})</span>
        </div>
        <div class="seg-details">
            <div style="text-align: left;">
                <div class="date-time">${seg.depart_time}</div>
                <div class="airport-info">${seg.date}</div>
            </div>
            <div>
                <div class="flight-info">${seg.flight_number}</div>
                <div class="airport-info">${seg.airline}</div>
                <div class="airport-info">Equipment: ${seg.equipment}</div>
                <div class="airport-info">Class: ${seg.class}</div>
            </div>
            <div style="text-align: right;">
                <div class="date-time">${seg.arrive_time}</div>
                <div class="airport-info">${seg.date}</div>
            </div>
        </div>
      </div>
    `,
    )
    .join('');
};

// 2. Generate Fare Breakdown Table Rows (Logic Utility)
const generateFareRows = (fares, currency_code) => {
  return fares
    .map(
      (fare) => `
      <tr>
        <td>${fare.pax_type}</td>
        <td>${fare.base_fare}</td>
        <td>${fare.taxes}</td>
        <td>${fare.total_fare_per_pax}</td>
        <td>x ${fare.num_pax}</td>
        <td>${fare.total_fare_line}</td>
      </tr>
    `,
    )
    .join('');
};

/**
 * @description สร้าง HTML CONTENT สำหรับการจองเที่ยวบิน
 * @param {object} data - ข้อมูลการจองที่จำเป็นทั้งหมด
 * @returns {string} - โค้ด HTML Segment
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

  const accentJP = '#c62828';
  const success = PDF_COLORS.SUCCESS;
  const border = PDF_COLORS.BORDER;
  const muted = PDF_COLORS.MUTED;

  const flightSegmentsHtml = generateFlightSegments(flight_segments);
  const fareRowsHtml = generateFareRows(fare_details, currency_code);

  // 💡 Template CSS (Flight Specific) - Will be extracted by BaseLayout
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
                margin: 15pt -30pt 12pt -30pt; 
            }
            .meta {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20pt 25pt;
                margin-bottom: 12pt;
                font-size: 9pt;
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
                border: 1pt solid ${border};
                background: #fdf5f5; 
                padding: 10pt;
                margin-bottom: 10pt;
                border-radius: 4pt;
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
              border: 1pt solid ${border};
              padding: 6pt;
              text-align: right;
            }
            table.fare th {
              background: #f2e6e6;
              font-weight: 700;
              text-align: center;
              color: #333;
            }
            .totals-area {
              margin-top: 15pt;
              text-align: right;
            }
            .grand-total {
              font-size: 16pt;
              font-weight: 700;
              color: ${accentJP};
              padding: 8pt 0;
              border-top: 2pt double ${accentJP};
              margin-top: 8pt;
            }
            .payment-status {
              font-size: 11pt;
              font-weight: 700;
              color: ${success};
              margin-bottom: 4pt;
            }
            footer {
                margin-top: 20pt;
                font-size: 9pt;
                color: ${muted};
                border-top: 1pt dashed ${border};
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
                        <th>Passenger Type</th>
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
