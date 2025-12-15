// blocks/eticket_template.js

/**
 * Builds the PDF content for an E-Ticket Itinerary.
 * @param {object} data - E-Ticket data.
 * @param {string} [qrCodeDataUrl] - Base64 string of the QR Code image (optional).
 * @returns {Array} pdfmake content array.
 */
// *** 1. อัปเดตการรับพารามิเตอร์เพื่อรองรับ QR Code ***
export function buildETicketContent(data, qrCodeDataUrl) {
  const isThai = data.language === 'TH';

  // กำหนด Style พื้นฐานสำหรับภาษา
  const styleBase = { font: isThai ? 'THSarabunNew' : 'Roboto' };
  const tableHeaderStyle = {
    ...styleBase,
    bold: true,
    fontSize: 13,
    fillColor: '#eeeeee',
    alignment: 'center',
  };
  const tableCellStyle = { ...styleBase, fontSize: 12 };
  const sectionHeader = {
    ...styleBase,
    fontSize: 15,
    bold: true,
    color: '#c62828',
    margin: [0, 15, 0, 5],
  };
  const labelStyle = { ...styleBase, bold: true, color: '#555' };

  // --- 1. Header Block ---
  const headerBlock = [
    { text: data.agency.name, style: { ...sectionHeader, fontSize: 20, alignment: 'right' } },
    {
      text: isThai
        ? 'รายละเอียดตั๋วอิเล็กทรอนิกส์ (E-Ticket Itinerary)'
        : 'Electronic Ticket Itinerary',
      style: { ...sectionHeader, fontSize: 18, alignment: 'right' },
    },
    // Agency Info (Left) and Booking Status + QR Code (Right)
    {
      columns: [
        {
          width: '60%',
          text: [
            { text: isThai ? 'ที่อยู่: ' : 'Address: ', style: labelStyle }, // เปลี่ยน bold: true เป็นใช้ style: labelStyle
            { text: data.agency.address, style: tableCellStyle }, // ใช้ tableCellStyle เพื่อกำหนด font
            { text: `\n${isThai ? 'โทรศัพท์: ' : 'Phone: '}`, style: labelStyle },
            { text: data.agency.phone, style: tableCellStyle },
          ],
          margin: [0, 10, 0, 10],
        },
        {
          width: '40%',
          stack: [
            {
              text: isThai ? 'สถานะการจอง:' : 'Booking Status:',
              style: { ...labelStyle, alignment: 'right' },
            },
            {
              text: data.booking.status,
              style: { fontSize: 18, bold: true, color: '#2e7d32', alignment: 'right' },
            },

            // *** 2. เพิ่ม QR CODE Block ***
            ...(qrCodeDataUrl
              ? [
                  {
                    text: isThai ? 'สแกนเพื่อตรวจสอบการจอง' : 'Scan to Verify Booking',
                    alignment: 'right',
                    margin: [0, 10, 0, 0],
                    fontSize: 10,
                    color: '#666',
                  },
                  {
                    image: qrCodeDataUrl, // ใช้ Base64 Data URL ที่ส่งมาจาก Generator
                    width: 80,
                    alignment: 'right',
                    margin: [0, 5, 0, 0],
                  },
                ]
              : []),
            // -----------------------------
          ],
          margin: [0, 10, 0, 10],
        },
      ],
    },
  ];

  // --- 2. Booking and Passenger Details --- (ไม่มีการเปลี่ยนแปลงหลัก)
  const detailTable = {
    style: tableCellStyle,
    margin: [0, 10, 0, 10],
    table: {
      widths: ['25%', '25%', '25%', '25%'],
      body: [
        [
          { text: isThai ? 'ชื่อผู้โดยสาร' : 'PASSENGER NAME', style: labelStyle },
          { text: isThai ? 'หมายเลขการจอง (PNR)' : 'PNR', style: labelStyle },
          { text: isThai ? 'หมายเลขตั๋ว' : 'TICKET NO.', style: labelStyle },
          { text: isThai ? 'วันที่ออกตั๋ว' : 'ISSUE DATE', style: labelStyle },
        ],
        [
          { text: data.passenger.name, style: tableCellStyle },
          { text: data.booking.pnr, style: tableCellStyle },
          { text: data.booking.ticketNumber, style: tableCellStyle },
          { text: data.booking.issueDate, style: tableCellStyle },
        ],
      ],
    },
    layout: 'lightHorizontalLines',
  };

  // --- 3. Flight Segments Table --- (ไม่มีการเปลี่ยนแปลงหลัก)
  const flightTable = {
    style: tableCellStyle,
    margin: [0, 15, 0, 15],
    table: {
      headerRows: 1,
      widths: ['8%', '15%', '10%', '15%', '15%', '10%', '15%', '12%'],
      body: [
        [
          { text: isThai ? 'วันที่' : 'DATE', style: tableHeaderStyle },
          { text: isThai ? 'เที่ยวบิน' : 'FLIGHT', style: tableHeaderStyle },
          { text: isThai ? 'จาก' : 'FROM', style: tableHeaderStyle },
          { text: isThai ? 'ออกเดินทาง' : 'DEP. TIME', style: tableHeaderStyle },
          { text: isThai ? 'ถึง' : 'TO', style: tableHeaderStyle },
          { text: isThai ? 'ถึงเวลา' : 'ARR. TIME', style: tableHeaderStyle },
          { text: isThai ? 'สัมภาระ' : 'BAGGAGE', style: tableHeaderStyle },
          { text: isThai ? 'สถานะ' : 'STATUS', style: tableHeaderStyle },
        ],
        ...data.flights.map((f) => [
          { text: f.date, style: tableCellStyle },
          { text: `${f.airline} ${f.flightNumber}`, style: tableCellStyle },
          { text: f.from, style: tableCellStyle },
          { text: f.depTime, style: tableCellStyle },
          { text: f.to, style: tableCellStyle },
          { text: f.arrTime, style: tableCellStyle },
          { text: f.baggage, style: tableCellStyle },
          { text: f.status, style: tableCellStyle },
        ]),
      ],
    },
    layout: 'headerLineOnly',
  };

  // --- 4. Fare and Notes --- (ไม่มีการเปลี่ยนแปลงหลัก)
  const fareAndNotes = {
    columns: [
      // Fare Details (Left)
      {
        width: '40%',
        stack: [
          { text: isThai ? 'รายละเอียดค่าโดยสาร' : 'FARE DETAILS', style: sectionHeader },
          { text: isThai ? 'ค่าโดยสาร: ' : 'Fare: ', style: labelStyle },
          { text: data.fareDetails.fare, margin: [10, 0, 0, 5] },
          { text: isThai ? 'ภาษี: ' : 'Tax: ', style: labelStyle },
          { text: data.fareDetails.tax, margin: [10, 0, 0, 5] },
          {
            text: isThai ? 'ยอดรวมชำระแล้ว: ' : 'TOTAL PAID: ',
            style: { ...labelStyle, fontSize: 14 },
          },
          { text: data.fareDetails.total, style: { fontSize: 16, bold: true, color: '#c62828' } },
        ],
      },
      // Notes (Right)
      {
        width: '60%',
        stack: [
          {
            text: isThai ? 'หมายเหตุสำคัญสำหรับการยื่นวีซ่า' : 'IMPORTANT NOTES FOR VISA',
            style: sectionHeader,
          },
          {
            ul: data.notes.map((n) => ({ text: n, style: tableCellStyle })),
            margin: [0, 5, 0, 0],
          },
        ],
      },
    ],
  };

  return [
    ...headerBlock,
    detailTable,
    { text: isThai ? 'รายละเอียดเที่ยวบิน' : 'FLIGHT SEGMENTS', style: sectionHeader },
    flightTable,
    fareAndNotes,
  ];
}
