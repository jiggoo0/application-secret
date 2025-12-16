// blocks/eticket_template_SINGLE_PAGE.js
// V8: Finalized design layout based on formal structure feedback.

/**
 * Builds the PDF content for a Single-Page E-Ticket Itinerary.
 *
 * @param {object} data - E-Ticket data structure.
 * @param {string} [qrCodeDataUrl] - Base64 string of the QR Code image (optional, for verification).
 * @returns {Array} pdfmake content array (Document Definition Content).
 */
export function buildETicketContent_SinglePage(data, qrCodeDataUrl) {
  const isThai = data.language === 'TH';

  // --- Styles (Condensed for Single Page Fit) ---
  const styleBase = { font: isThai ? 'THSarabunNew' : 'Roboto' };

  // Style Definitions (Optimized for space)
  const headerStyle = { ...styleBase, fontSize: 18, bold: true, color: '#003366' };
  const sectionHeader = {
    ...styleBase,
    fontSize: 13,
    bold: true,
    color: '#003366',
    margin: [0, 10, 0, 3],
  };
  const labelStyle = { ...styleBase, bold: true, color: '#555', fontSize: 9 };
  const tableHeaderStyle = {
    ...styleBase,
    bold: true,
    fontSize: 10,
    fillColor: '#003366',
    color: '#ffffff',
    alignment: 'center',
    margin: [0, 3, 0, 3],
  };
  const tableCellStyle = { ...styleBase, fontSize: 9, margin: [0, 1, 0, 1] };
  const statusStyle = { ...styleBase, fontSize: 12, bold: true, color: '#2e7d32' };

  // --- 1. Top Header Block (Airline/Agency and Document Title) ---
  const headerBlock = [
    {
      columns: [
        // Left: Agency/Airline Info
        {
          width: '50%',
          stack: [
            { text: data.agency.name, style: { ...headerStyle, color: '#c62828', fontSize: 18 } },
            {
              text: isThai
                ? 'รายละเอียดตั๋วอิเล็กทรอนิกส์ (E-Ticket)'
                : 'Electronic Ticket Itinerary',
              style: { ...headerStyle, fontSize: 15, margin: [0, 2, 0, 0], color: '#003366' },
            },
            {
              text: `Tel: ${data.agency.phone} | ${data.agency.address}`,
              style: { ...tableCellStyle, fontSize: 8, color: '#666', margin: [0, 2, 0, 0] },
            },
          ],
        },
        // Right: Status & PNR/Ticket No.
        {
          width: '*',
          stack: [
            {
              text: isThai ? 'สถานะการจอง:' : 'Booking Status:',
              style: { ...labelStyle, alignment: 'right', fontSize: 9 },
            },
            {
              text: data.booking.status,
              style: { ...statusStyle, alignment: 'right' },
              margin: [0, 0, 0, 5],
            },
            {
              text: `${isThai ? 'หมายเลขการจอง (PNR):' : 'Booking Ref (PNR):'} ${data.booking.pnr}`,
              style: { ...tableCellStyle, alignment: 'right', bold: true },
            },
            {
              text: `${isThai ? 'หมายเลขตั๋ว:' : 'Ticket Number:'} ${data.booking.ticketNumber}`,
              style: { ...tableCellStyle, alignment: 'right', bold: true },
            },
          ],
        },
      ],
      margin: [0, 0, 0, 8],
    },
    // Divider line (Thicker line for better separation)
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, color: '#003366' }] },
  ];

  // --- 2. Passenger Details Table ---
  const passengerTableBlock = [
    {
      text: isThai ? 'ข้อมูลผู้โดยสาร' : 'PASSENGER DETAILS',
      style: sectionHeader,
    },
    {
      margin: [0, 5, 0, 5],
      table: {
        widths: ['35%', '25%', '20%', '20%'],
        body: [
          [
            // Header colors adjusted for consistency
            {
              text: isThai ? 'ชื่อผู้โดยสาร' : 'PASSENGER NAME',
              style: tableHeaderStyle,
              fillColor: '#f0f0f0',
              color: '#000000',
              bold: true,
            },
            {
              text: isThai ? 'ประเภท' : 'TYPE',
              style: tableHeaderStyle,
              fillColor: '#f0f0f0',
              color: '#000000',
              bold: true,
            },
            {
              text: isThai ? 'Fare Basis' : 'FARE BASIS',
              style: tableHeaderStyle,
              fillColor: '#f0f0f0',
              color: '#000000',
              bold: true,
            },
            {
              text: isThai ? 'วันที่ออกตั๋ว' : 'ISSUE DATE',
              style: tableHeaderStyle,
              fillColor: '#f0f0f0',
              color: '#000000',
              bold: true,
            },
          ],
          [
            { text: data.passenger.name, style: { ...tableCellStyle, bold: true, fontSize: 10 } },
            { text: data.passenger.type || 'ADULT', style: tableCellStyle },
            { text: data.passenger.fareBasis, style: tableCellStyle },
            { text: data.booking.issueDate, style: tableCellStyle },
          ],
        ],
      },
      layout: 'noBorders',
    },
  ];

  // --- 3. Flight Segments Table ---
  const flightSegmentsBlock = [
    {
      text: isThai ? 'รายละเอียดเที่ยวบิน (FLIGHT SEGMENTS)' : 'FLIGHT SEGMENTS',
      style: sectionHeader,
    },
    {
      style: tableCellStyle,
      margin: [0, 5, 0, 8],
      table: {
        headerRows: 1,
        widths: ['8%', '12%', '30%', '10%', '10%', '15%', '15%'],
        body: [
          [
            { text: isThai ? 'วันที่' : 'DATE', style: tableHeaderStyle },
            { text: isThai ? 'เที่ยวบิน' : 'FLIGHT', style: tableHeaderStyle },
            { text: isThai ? 'จาก / ถึง (ROUTE)' : 'ROUTE (DEP/ARR)', style: tableHeaderStyle },
            { text: isThai ? 'ออกเดินทาง' : 'DEP. TIME', style: tableHeaderStyle },
            { text: isThai ? 'ถึงเวลา' : 'ARR. TIME', style: tableHeaderStyle },
            { text: isThai ? 'สัมภาระ' : 'BAGGAGE', style: tableHeaderStyle },
            { text: isThai ? 'สถานะ' : 'STATUS', style: tableHeaderStyle },
          ],
          ...data.flights.map((f) => [
            { text: f.date, style: tableCellStyle, alignment: 'center' },
            { text: `${f.airline} ${f.flightNumber}`, style: tableCellStyle, alignment: 'center' },
            {
              stack: [
                // Enhanced Route clarity (IATA + City Name)
                {
                  text: `${f.from}${f.fromCity ? ` - ${f.fromCity}` : ''}`,
                  style: tableCellStyle,
                  alignment: 'center',
                  bold: true,
                  fontSize: 9,
                },
                { text: '↓', style: { fontSize: 6, alignment: 'center', color: '#003366' } }, // Arrow color consistency
                {
                  text: `${f.to}${f.toCity ? ` - ${f.toCity}` : ''}`,
                  style: tableCellStyle,
                  alignment: 'center',
                  bold: true,
                  fontSize: 9,
                },
              ],
            },
            { text: f.depTime, style: tableCellStyle, alignment: 'center' },
            { text: f.arrTime, style: tableCellStyle, alignment: 'center' },
            { text: f.baggage, style: tableCellStyle, alignment: 'center' },
            {
              text: f.status,
              style: tableCellStyle,
              alignment: 'center',
              bold: true,
              color: '#2e7d32',
            },
          ]),
        ],
      },
      layout: 'headerLineOnly',
    },
  ];

  // --- 4. Fare and Notes (Side-by-Side) ---
  const fareAndNotesBlock = {
    columns: [
      // Fare Details (Left - Concise Display)
      {
        width: '40%',
        stack: [
          { text: isThai ? 'รายละเอียดค่าโดยสาร (FARE)' : 'FARE DETAILS', style: sectionHeader },
          {
            table: {
              widths: ['50%', '50%'],
              body: [
                [
                  { text: isThai ? 'ค่าโดยสารพื้นฐาน' : 'BASE FARE', style: labelStyle },
                  { text: data.fareDetails.baseFare, alignment: 'right', style: tableCellStyle },
                ],
                [
                  { text: isThai ? 'ภาษีและค่าธรรมเนียม' : 'TAXES & FEES', style: labelStyle },
                  { text: data.fareDetails.totalTax, alignment: 'right', style: tableCellStyle },
                ],
                [
                  {
                    text: isThai ? 'ยอดรวมชำระแล้ว' : 'TOTAL PAID',
                    style: { ...labelStyle, bold: true, fontSize: 10, fillColor: '#f0f0f0' },
                  },
                  {
                    text: data.fareDetails.totalPaid,
                    alignment: 'right',
                    style: { fontSize: 11, bold: true, color: '#c62828', fillColor: '#f0f0f0' },
                  },
                ],
              ],
            },
            layout: 'noBorders',
            margin: [0, 3, 0, 5],
          },

          // QR Code for verification
          ...(qrCodeDataUrl
            ? [
                {
                  text: isThai
                    ? 'สแกน QR Code เพื่อตรวจสอบเอกสาร'
                    : 'Scan QR for Document Verification',
                  alignment: 'left',
                  fontSize: 8,
                  bold: true,
                  color: '#003366',
                  margin: [0, 10, 0, 5],
                },
                {
                  image: qrCodeDataUrl,
                  width: 100,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                },
              ]
            : []),
        ],
      },
      // Notes (Right - Takes remaining space)
      {
        width: '*',
        stack: [
          {
            text: isThai ? 'หมายเหตุและเงื่อนไขสำคัญ' : 'IMPORTANT NOTES & CONDITIONS',
            style: sectionHeader,
          },
          {
            ul: data.notices.map((n) => ({ text: n, style: { ...tableCellStyle, fontSize: 8 } })),
            margin: [5, 5, 0, 0],
          },
        ],
      },
    ],
    columnGap: 10,
    margin: [0, 5, 0, 10],
  };

  // Final Content Array
  return [...headerBlock, ...passengerTableBlock, ...flightSegmentsBlock, fareAndNotesBlock];
}
