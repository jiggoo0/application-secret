// blocks/eticket_template_JPAIR.js
// V5: Fixed Header Clipping Bug (Thai Language) by using dynamic column width.

/**
 * Builds the PDF content for an E-Ticket Itinerary (JP Airways Standard).
 * @param {object} data - E-Ticket data (JPAirway Standard Structure V2).
 * @param {string} [qrCodeDataUrl] - Base64 string of the QR Code image (optional).
 * @returns {Array} pdfmake content array.
 */
export function buildETicketContent_JPAIR(data, qrCodeDataUrl) {
  const isThai = data.language === 'TH';

  // --- Styles Mapping ---
  const headerStyle = { fontSize: 22, bold: true, color: '#003366' };
  const subHeaderStyle = { fontSize: 15, bold: true, color: '#c62828' };
  const labelStyle = { bold: true, color: '#555' };
  const tableHeaderStyle = {
    bold: true,
    fontSize: 12,
    fillColor: '#003366',
    color: '#ffffff',
    alignment: 'center',
    margin: [0, 5, 0, 5],
  };
  const tableCellStyle = { fontSize: 10 };
  const statusStyle = { fontSize: 14, bold: true, color: '#2e7d32' };

  // --- 1. Top Header Block (Header Clipping Fix) ---
  const headerBlock = [
    {
      columns: [
        {
          // 💡 กำหนดความกว้างซ้าย 250 (Fixed Width)
          width: 250,
          stack: [
            { text: data.airline.name, style: headerStyle },
            { text: isThai ? 'รายละเอียดการเดินทาง' : 'ITINERARY RECEIPT', style: subHeaderStyle },
          ],
        },
        {
          // 💡 กำหนดความกว้างขวาเป็น Dynamic (*) เพื่อให้มีพื้นที่เหลือเฟือในการแสดงผลภาษาไทย
          width: '*',
          stack: [
            {
              text: isThai ? 'ตั๋วอิเล็กทรอนิกส์' : 'ELECTRONIC TICKET',
              style: { ...subHeaderStyle, alignment: 'right' },
            },
            {
              text: isThai ? 'สถานะการจอง:' : 'BOOKING STATUS:',
              style: { ...labelStyle, alignment: 'right', fontSize: 10 },
            },
            { text: data.booking.status, style: { ...statusStyle, alignment: 'right' } },
          ],
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 15],
    },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, color: '#003366' }] },
  ];

  // --- 2. Booking & Passenger Details ---
  const refAndPassengerTable = {
    margin: [0, 10, 0, 10],
    table: {
      widths: ['30%', '30%', '40%'],
      body: [
        // Row 1: Headers
        [
          {
            text: isThai ? 'ชื่อผู้โดยสาร' : 'PASSENGER NAME',
            style: labelStyle,
            fillColor: '#f0f0f0',
          },
          {
            text: isThai ? 'หมายเลขการจอง (PNR)' : 'BOOKING REF (PNR)',
            style: labelStyle,
            fillColor: '#f0f0f0',
          },
          {
            text: isThai ? 'หมายเลขตั๋วอิเล็กทรอนิกส์' : 'E-TICKET NUMBER',
            style: labelStyle,
            fillColor: '#f0f0f0',
          },
        ],
        // Row 2: Data
        [
          {
            text: `${data.passenger.title}/${data.passenger.lastName}/${data.passenger.firstName}`.toUpperCase(),
            style: { ...tableCellStyle, bold: true, fontSize: 12 },
          },
          { text: data.booking.pnr, style: { ...tableCellStyle, bold: true, fontSize: 12 } },
          {
            text: data.booking.ticketNumber,
            style: { ...tableCellStyle, bold: true, fontSize: 12 },
          },
        ],
        // Row 3: Sub-Headers
        [
          {
            text: isThai ? 'ประเภทผู้โดยสาร / Endorsements' : 'TYPE / ENDORSEMENTS',
            style: labelStyle,
            fillColor: '#f0f0f0',
            margin: [0, 5, 0, 0],
          },
          {
            text: isThai ? 'วันที่ออกตั๋ว / สำนักงานที่ออก' : 'ISSUE DATE / OFFICE',
            style: labelStyle,
            fillColor: '#f0f0f0',
            margin: [0, 5, 0, 0],
          },
          {
            text: isThai ? 'เงื่อนไขค่าโดยสาร' : 'FARE BASIS',
            style: labelStyle,
            fillColor: '#f0f0f0',
            margin: [0, 5, 0, 0],
          },
        ],
        // Row 4: Sub-Data
        [
          {
            text: `${data.passenger.type} / ${data.passenger.endorsements || 'N/A'}`,
            style: tableCellStyle,
          },
          {
            text: `${data.booking.issueDate} / ${data.booking.issueOffice || 'N/A'}`,
            style: tableCellStyle,
          },
          { text: data.passenger.fareBasis, style: tableCellStyle },
        ],
      ],
    },
    layout: {
      hLineWidth: function (i, node) {
        return i === 0 || i === node.table.body.length || i === 2 || i === 4 ? 1 : 0;
      },
      vLineWidth: function (i, node) {
        return 0;
      },
      hLineColor: function (i, node) {
        return '#ccc';
      },
      paddingLeft: function (i, node) {
        return 0;
      },
      paddingRight: function (i, node) {
        return 0;
      },
      paddingTop: function (i, node) {
        return i === 2 ? 10 : 5;
      },
      paddingBottom: function (i, node) {
        return 5;
      },
    },
  };

  // --- 3. Flight Segments Table ---
  const flightSegments = {
    text: isThai ? 'รายละเอียดเที่ยวบิน (FLIGHT SEGMENTS)' : 'FLIGHT SEGMENTS',
    style: subHeaderStyle,
    margin: [0, 15, 0, 5],
  };

  const flightTable = {
    style: tableCellStyle,
    margin: [0, 5, 0, 15],
    table: {
      headerRows: 1,
      widths: ['5%', '10%', '12%', '20%', '13%', '13%', '8%', '10%', '9%'],
      body: [
        [
          { text: 'NO.', style: tableHeaderStyle },
          { text: isThai ? 'วันที่' : 'DATE', style: tableHeaderStyle },
          { text: isThai ? 'เที่ยวบิน' : 'FLIGHT', style: tableHeaderStyle },
          { text: isThai ? 'จาก / ถึง (ROUTE)' : 'ROUTE (DEP/ARR)', style: tableHeaderStyle },
          { text: isThai ? 'เวลาออก' : 'DEP. TIME', style: tableHeaderStyle },
          { text: isThai ? 'เวลาถึง' : 'ARR. TIME', style: tableHeaderStyle },
          { text: isThai ? 'ชั้น' : 'CLASS', style: tableHeaderStyle },
          { text: isThai ? 'สัมภาระ' : 'BAG.', style: tableHeaderStyle },
          { text: isThai ? 'สถานะ' : 'STATUS', style: tableHeaderStyle },
        ],
        ...data.flights.map((f) => [
          { text: f.segmentNo, style: tableCellStyle, alignment: 'center' },
          { text: f.date, style: tableCellStyle },
          { text: `${f.airline} ${f.flightNumber}`, style: tableCellStyle, alignment: 'center' },
          {
            stack: [
              {
                text: `${f.from} ${f.depTerminal ? '(' + f.depTerminal + ')' : ''}`,
                style: tableCellStyle,
                alignment: 'center',
              },
              { text: '↓', style: { fontSize: 8, alignment: 'center' } },
              {
                text: `${f.to} ${f.arrTerminal ? '(' + f.arrTerminal + ')' : ''}`,
                style: tableCellStyle,
                alignment: 'center',
              },
            ],
          },
          { text: f.depTime, style: tableCellStyle, alignment: 'center' },
          { text: f.arrTime, style: tableCellStyle, alignment: 'center' },
          { text: f.class, style: tableCellStyle, alignment: 'center' },
          { text: f.baggage, style: tableCellStyle, alignment: 'center' },
          { text: f.status, style: tableCellStyle, alignment: 'center', bold: true },
        ]),
      ],
    },
    layout: 'headerLineOnly',
  };

  // --- 4. FARE CONSTRUCTION ---
  const fareConstructionBlock = {
    stack: [
      {
        text: isThai ? 'โครงสร้างค่าโดยสาร (FARE CONSTRUCTION)' : 'FARE CONSTRUCTION',
        style: subHeaderStyle,
        margin: [0, 15, 0, 5],
      },
      {
        text: data.fareConstruction,
        style: {
          ...tableCellStyle,
          bold: true,
          italics: true,
          fontSize: 10,
          fillColor: '#fff3e0',
          margin: [0, 5, 0, 5],
          alignment: 'left',
        },
      },
    ],
    margin: [0, 0, 0, 10],
  };

  // --- 5. Fare Details & QR Code/Verification Block ---
  const fareBlock = {
    columns: [
      // Fare and Taxes details (Left - Detailed Table)
      {
        width: '50%',
        stack: [
          {
            text: isThai ? 'รายละเอียดค่าโดยสารและภาษี' : 'FARE DETAILS & TAXES',
            style: subHeaderStyle,
            margin: [0, 0, 0, 5],
          },
          {
            table: {
              widths: ['30%', '20%', '50%'],
              body: [
                // Header Row
                [
                  { text: isThai ? 'รายการ' : 'ITEM', style: labelStyle },
                  { text: isThai ? 'จำนวน' : 'AMOUNT', style: labelStyle, alignment: 'right' },
                  { text: isThai ? 'คำอธิบาย' : 'DESCRIPTION', style: labelStyle },
                ],

                // Base Fare
                [
                  { text: isThai ? 'ค่าโดยสารพื้นฐาน' : 'BASE FARE', style: labelStyle },
                  { text: data.fareDetails.baseFare, alignment: 'right' },
                  { text: data.fareDetails.currency, style: labelStyle },
                ],

                // Taxes
                ...data.fareDetails.taxes.map((t) => [
                  { text: `${isThai ? 'ภาษี' : 'TAX'} (${t.code})`, style: labelStyle },
                  { text: t.amount, alignment: 'right' },
                  { text: isThai ? `รหัสภาษี ${t.code}` : `Tax Code ${t.code}` },
                ]),

                // Total Tax
                [
                  {
                    text: isThai ? 'รวมภาษีทั้งหมด' : 'TOTAL TAXES',
                    style: { ...labelStyle, bold: true },
                  },
                  { text: data.fareDetails.totalTax, alignment: 'right', bold: true },
                  { text: '' },
                ],

                // Total Paid
                [
                  {
                    text: isThai ? 'ยอดรวมชำระแล้ว' : 'TOTAL PAID',
                    style: { ...labelStyle, fontSize: 12, bold: true, fillColor: '#f0f0f0' },
                  },
                  {
                    text: data.fareDetails.totalPaid,
                    style: { fontSize: 14, bold: true, color: '#c62828' },
                    alignment: 'right',
                    fillColor: '#f0f0f0',
                  },
                  {
                    text: data.fareDetails.currency,
                    style: { ...labelStyle, fillColor: '#f0f0f0' },
                  },
                ],
              ],
            },
            layout: 'lightHorizontalLines',
            margin: [0, 5, 0, 10],
          },
        ],
      },

      // QR Code and Notices (Right)
      {
        width: '50%',
        stack: [
          {
            text: isThai ? 'การตรวจสอบเอกสาร' : 'DOCUMENT VERIFICATION',
            style: subHeaderStyle,
            alignment: 'right',
            margin: [0, 0, 0, 5],
          },
          {
            text: isThai
              ? 'โปรดเก็บเอกสารนี้ไว้เพื่อแสดง ณ วันเดินทาง'
              : 'RETAIN THIS DOCUMENT FOR TRAVEL. SUBJECT TO CARRIAGE CONDITIONS.',
            alignment: 'right',
            fontSize: 9,
            color: '#666',
            margin: [0, 0, 0, 5],
            fillColor: '#f0f0f0',
          },
          ...(qrCodeDataUrl
            ? [
                {
                  image: qrCodeDataUrl,
                  width: 100,
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: isThai
                    ? 'สแกน QR Code เพื่อตรวจสอบสถานะและเอกสารต้นฉบับ'
                    : 'SCAN QR CODE TO VERIFY DOCUMENT AUTHENTICITY',
                  alignment: 'right',
                  fontSize: 8,
                  color: '#666',
                },
              ]
            : []),
        ],
      },
    ],
    columnGap: 10,
  };

  // --- 6. Important Notices ---
  const noticesBlock = [
    {
      text: isThai ? 'ข้อกำหนดและเงื่อนไขสำคัญ' : 'IMPORTANT NOTICES',
      style: subHeaderStyle,
      margin: [0, 15, 0, 5],
    },
    {
      ul: data.notices.map((n) => ({ text: n, style: { ...tableCellStyle, fontSize: 9 } })),
      margin: [10, 0, 0, 0],
    },
  ];

  // --- 7. Footer ---
  const footerBlock = [
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, color: '#ccc' }] },
    {
      text: `${data.airline.name} | ${data.airline.address} | Phone: ${data.airline.phone}`,
      style: { ...tableCellStyle, alignment: 'center', color: '#666', margin: [0, 5, 0, 0] },
    },
  ];

  return [
    ...headerBlock,
    refAndPassengerTable,
    flightSegments,
    flightTable,
    fareConstructionBlock,
    fareBlock,
    ...noticesBlock,
    ...footerBlock,
  ];
}
