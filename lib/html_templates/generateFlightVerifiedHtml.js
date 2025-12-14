// /lib/html_templates/generateFlightVerifiedHtml.js

/**
 * @description สร้าง HTML ITINERARY RECEIPT สำหรับการจองเที่ยวบิน
 * (อ้างอิงตามโครงสร้างของ JP Airlines Flight Itinerary Receipt)
 * @param {object} data - ข้อมูลการจองที่จำเป็นทั้งหมด
 * @returns {string} - โค้ด HTML ที่สมบูรณ์
 */
export const generateFlightVerifiedHtml = (data = {}) => {
  // 💡 Data Destructuring - แยกข้อมูลที่จำเป็นจาก Object พร้อมกำหนดค่าเริ่มต้น (Default Values)
  const {
    airline_name = 'JP AIRLINES',
    contact_phone = '+66 (0) 3836 1836-8',
    contact_email = 'info@jp-airlines.com',

    passenger_name = 'MRS SITI NURAIN MAT ZIN (ADULT)',
    ticket_number = '2322442391792',
    pnr_code = 'WT532',
    booking_status = 'CONFIRMED', // CONFIRMED, CANCELLED, PENDING
    passenger_email = 'sitinurain_matzin@yahoo.com',
    passenger_mobile = '06-0193784335',
    baggage_allowance = '20 KG (Included)',

    // ข้อมูลเที่ยวบิน (สมมติว่าเป็น Array ของ Segment)
    flight_segments = [
      {
        type: 'OUTBOUND',
        origin_code: 'KUL',
        origin_name: 'KUALA LUMPUR INTL APT',
        destination_code: 'KUA',
        destination_name: 'KUANTAN',
        date: 'FRI, 23 JUN 2017',
        depart_time: '21:30',
        arrive_time: '22:20',
        flight_number: 'JP 1286',
        airline: 'JP AIRLINES',
        equipment: 'B737-800',
        class: 'ECONOMY (Y)',
      },
      {
        type: 'INBOUND',
        origin_code: 'KUA',
        origin_name: 'KUANTAN',
        destination_code: 'KUL',
        destination_name: 'KUALA LUMPUR INTL APT',
        date: 'SAT, 01 JUL 2017',
        depart_time: '19:50',
        arrive_time: '20:35',
        flight_number: 'JP 1281',
        airline: 'JP AIRLINES',
        equipment: 'B737-800',
        class: 'ECONOMY (Y)',
      },
    ],

    // ข้อมูลค่าโดยสาร (สมมติว่าเป็น Array ของ Passenger Type)
    fare_details = [
      {
        pax_type: 'Adult',
        base_fare: '424.00',
        taxes: '48.76',
        total_fare_per_pax: '472.76',
        num_pax: 1,
        total_fare_line: '472.76',
      },
    ],

    total_fare = '472.76',
    currency_code = 'MYR',
    payment_status = 'PAYMENT VERIFIED',
    payment_card = 'VISA ****6398',
  } = data;

  // --- HTML Generation Logic ---

  // 1. Generate Flight Segment Blocks
  const generateFlightSegments = (segments) => {
    return segments
      .map(
        (seg) => `
      <div class="segment" aria-label="${seg.airline} Flight ${seg.flight_number} ${seg.type}">
        <div class="segment-label">${seg.type}</div>
        <div class="seg-head">
          <span>${seg.origin_name} (${seg.origin_code}) </span>
          <span>${seg.destination_name} (${seg.destination_code})</span>
        </div>
        <div class="seg-details">
            <div>
                <div class="date-time">${seg.depart_time}</div>
                <div class="airport-info">${seg.date}</div>
            </div>
            <div>
                <div class="flight-info">${seg.flight_number}</div>
                <div class="airport-info">${seg.airline}</div>
                <div class="airport-info">Equipment: ${seg.equipment}</div>
                <div class="airport-info">Class: ${seg.class}</div>
            </div>
            <div>
                <div class="date-time">${seg.arrive_time}</div>
                <div class="airport-info">${seg.date}</div>
            </div>
        </div>
      </div>
    `,
      )
      .join('');
  };

  // 2. Generate Fare Breakdown Table Rows
  const generateFareRows = (fares) => {
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

  const flightSegmentsHtml = generateFlightSegments(flight_segments);
  const fareRowsHtml = generateFareRows(fare_details);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>FLIGHT ITINERARY RECEIPT - ${airline_name}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root {
      --page-width: 780px;
      --accent-jp: #c62828; /* JP Airlines Red/Maroon */
      --success: #2e7d32;
      --muted: #666;
      --border: #e0e0e0;
      --bg: #ffffff;
      --paper-bg: #f4f4f6;
      --mono: "Courier New", Courier, monospace;
      --font-sans: "Arial", "Helvetica", sans-serif;
    }

    /* Base/Page */
    html, body {
      height: 100%;
      margin: 0;
      background: var(--paper-bg);
      font-family: var(--font-sans);
      color: #111;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container {
      max-width: var(--page-width);
      margin: 28px auto;
      background: var(--bg);
      border: 1px solid var(--border);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      padding: 28px 36px;
    }

    /* Header */
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 25px;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .airline-name {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-jp);
      letter-spacing: 0.5px;
    }
    .contact-info {
      text-align: right;
      font-size: 13px;
      color: #333;
      line-height: 1.4;
    }
    .receipt-title {
      background: var(--accent-jp);
      color: white;
      padding: 10px 15px;
      font-size: 18px;
      font-weight: 700;
      margin: 20px -36px 15px -36px; /* Full width effect */
      padding-left: 36px;
      text-transform: uppercase;
    }

    /* Sections */
    .section-group {
      margin-bottom: 20px;
    }
    h2 {
      font-size: 16px;
      margin: 0 0 10px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--border);
    }
    .meta {
      display: flex;
      gap: 25px;
      margin-bottom: 15px;
      font-size: 13px;
    }
    .meta > div {
      flex: 1;
      min-width: 200px;
    }
    .field {
      margin: 6px 0;
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }
    .label {
      font-weight: 700;
      flex-shrink: 0;
      margin-right: 8px;
      color: #333;
    }
    .value {
      text-align: right;
      flex-grow: 1;
    }
    .mono {
      font-family: var(--mono);
      color: var(--accent-jp);
      font-weight: 700;
    }
    .note {
      font-size: 12px;
      color: #cc0000;
      margin-top: 10px;
      padding: 8px;
      border: 1px dashed #f2d6d6;
      background: #fff8f8;
      border-radius: 4px;
    }
    .note.info {
      color: var(--accent-jp);
      border-color: var(--accent-jp);
      background: #ffeeee;
    }

    /* Flight Segment */
    .segment {
      border: 1px solid var(--border);
      background: #fdf5f5; /* Light Red/Pink for JP */
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 4px;
      position: relative;
    }
    .seg-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 5px;
      border-bottom: 1px solid #f2d6d6;
      color: var(--accent-jp);
    }
    .seg-details {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
      font-size: 13px;
      margin-top: 10px;
      align-items: center;
      text-align: center;
    }
    .seg-details > div:first-child, .seg-details > div:last-child {
        text-align: left;
    }
    .flight-info {
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }
    .airport-info {
      font-size: 11px;
      color: var(--muted);
      line-height: 1.3;
    }
    .date-time {
      font-size: 18px;
      font-weight: 700;
      color: #000;
    }
    .segment-label {
      position: absolute;
      top: 0;
      left: 0;
      background: var(--accent-jp);
      color: white;
      padding: 3px 8px;
      font-size: 11px;
      border-radius: 4px 0 4px 0;
    }

    /* Table (Fare Breakdown) */
    table.fare {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      font-size: 13px;
    }
    table.fare th, table.fare td {
      border: 1px solid var(--border);
      padding: 8px;
      text-align: right;
    }
    table.fare th {
      background: #f2e6e6;
      font-weight: 700;
      text-align: center;
      color: #333;
    }
    table.fare td:first-child {
      text-align: left;
    }

    /* Totals */
    .totals-area {
      margin-top: 20px;
      text-align: right;
    }
    .grand-total {
      font-size: 20px;
      font-weight: 700;
      color: var(--accent-jp);
      padding: 10px 0;
      border-top: 3px double var(--accent-jp);
      margin-top: 10px;
    }
    .payment-status {
      font-size: 14px;
      font-weight: 700;
      color: var(--success);
      margin-bottom: 5px;
    }

    /* Footer */
    footer {
      margin-top: 24px;
      font-size: 12px;
      color: var(--muted);
      border-top: 1px dashed var(--border);
      padding-top: 10px;
      text-align: center;
    }

    /* Print-friendly */
    @media print {
      body {
        background: #fff;
        margin: 0;
      }
      .container {
        box-shadow: none;
        border: none;
        width: 100%;
        padding: 10mm;
        margin: 0;
      }
      .receipt-title {
        margin-left: -10mm;
        margin-right: -10mm;
        padding-left: 10mm;
      }
      header, .section-group, .segment, table.fare, .totals-area, footer {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <main class="container" role="main" aria-labelledby="receipt-title">
    <header>
      <div class="logo-container">
        <div class="airline-name">${airline_name}</div>
      </div>
      <div class="contact-info" aria-hidden="false">
        ${airline_name} Berhad<br>
        Reservation Office: ${contact_phone}<br>
        Email: ${contact_email}
      </div>
    </header>

    <div id="receipt-title" class="receipt-title">TRAVEL ITINERARY RECEIPT</div>

    <section class="section-group" aria-labelledby="passenger-info">
      <h2 id="passenger-info">PASSENGER & BOOKING INFORMATION</h2>
      <div class="meta" role="group" aria-label="Booking meta">
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

    <section class="section-group" aria-labelledby="itinerary-details">
      <h2 id="itinerary-details">AIR ITINERARY DETAILS</h2>

      ${flightSegmentsHtml}

      <p class="note info">
        *The boarding gate will be closed **20 minutes** prior to departure. Please proceed to the gate promptly.
      </p>
    </section>

    <section class="section-group" aria-labelledby="fare-breakdown">
      <h2 id="fare-breakdown">FARE BREAKDOWN & PAYMENT RECEIPT</h2>

      <table class="fare" aria-describedby="fare-desc">
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
      
      <div class="totals-area" role="contentinfo" aria-label="Payment summary">
        <div class="payment-status">TOTAL AIR FARE: ${total_fare} ${currency_code} (${payment_status})</div>
        <div class="grand-total">
            <span style="font-size:14px; font-weight:400; color: #333;">Charged to ${payment_card}:</span> ${total_fare} ${currency_code}
        </div>
      </div>
    </section>

    <footer>
      <p>Thank you for choosing ${airline_name}. Note: A meal will be served on flights where the flying time is more than 60 minutes.</p>
    </footer>
  </main>
</body>
</html>
    `;
};
