// lib/pdf/pdf_layout_blocks.js
/**
 * @file lib/pdf/pdf_layout_blocks.js
 * @description Module สำหรับฟังก์ชันการสร้าง Layout Block ที่ซับซ้อน (Flight, Hotel, Fare) สำหรับ PDFMake
 * @module layoutBlocks
 */

// ----------------------------------------------------
// HELPER: Date Formatting
// ----------------------------------------------------
const formatSegmentDate = (dateString) => {
  if (!dateString) {
    return { day: 'N/A', dateStringFormatted: 'N/A', fullDate: 'N/A' };
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid Date');

    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const shortDateString = `${dayOfWeek.substring(0, 3)}, ${dayOfMonth} ${months[monthIndex]}`;
    const fullDateString = `${dayOfMonth} ${months[monthIndex]} ${year}`;

    return {
      day: dayOfWeek, // TUESDAY
      dateStringFormatted: shortDateString, // TUE, 01 JAN
      fullDate: fullDateString, // 01 JAN 2024
    };
  } catch (e) {
    // console.error('Date formatting error:', e);
    return { day: 'N/A', dateStringFormatted: dateString || 'N/A', fullDate: dateString || 'N/A' };
  }
};

// ----------------------------------------------------
// 1. FLIGHT SEGMENT BLOCK (Redesigned for Clarity)
// ----------------------------------------------------
const createFlightSegmentBlock = (
  segment,
  primaryColor,
  successColor,
  lightAccentColor,
  dividerColor,
) => {
  // Safe Destructuring with Defaults
  const {
    flight_no = 'N/A',
    airline_name = 'Airline',
    route = '', // e.g. BKK - NRT
    date = '',
    depart_time = '00:00',
    arrive_time = '00:00',
    cabin = 'Economy',
    booking_class = 'Y',
    depart_airport = 'Origin',
    arrive_airport = 'Destination',
    duration = '-',
    meal_code = '-',
    baggage = '-',
    aircraft = 'Aircraft',
    status = 'Confirmed',
  } = segment;

  const { dateStringFormatted, fullDate } = formatSegmentDate(date);

  // สร้าง Header Text: "FLIGHT: TG676 | 25 DEC 2023"
  const headerText = `${airline_name} (${flight_no})  |  ${dateStringFormatted}`;

  return [
    // 1. Segment Divider / Header
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: headerText,
              fontSize: 12,
              bold: true,
              color: '#FFFFFF',
              fillColor: primaryColor,
              margin: [5, 5, 5, 5],
            },
          ],
        ],
      },
      layout: 'noBorders',
      margin: [0, 10, 0, 0],
    },

    // 2. Flight Details Grid
    {
      layout: {
        hLineWidth: (i, node) => (i === 1 ? 1 : 0), // เส้นแบ่งระหว่างบนล่าง
        vLineWidth: (i, node) => (i === 1 || i === 3 ? 1 : 0), // เส้นแบ่งแนวตั้งตรงกลาง
        hLineColor: (i, node) => dividerColor,
        vLineColor: (i, node) => dividerColor,
        paddingTop: (i) => 8,
        paddingBottom: (i) => 8,
        paddingLeft: (i) => 10,
        paddingRight: (i) => 10,
      },
      table: {
        widths: ['35%', '30%', '35%'], // Origin | Arrow/Duration | Destination
        body: [
          [
            // ORIGIN COLUMN
            {
              stack: [
                { text: depart_time, fontSize: 20, bold: true, color: primaryColor },
                { text: depart_airport, fontSize: 11, bold: true, margin: [0, 2, 0, 0] },
                { text: fullDate, fontSize: 10, color: '#555555' },
              ],
              alignment: 'left',
            },

            // MIDDLE COLUMN (Duration / Route Visual)
            {
              stack: [
                {
                  text: '✈',
                  fontSize: 16,
                  color: dividerColor,
                  alignment: 'center',
                  margin: [0, 2, 0, 2],
                },
                { text: duration, fontSize: 10, color: '#555555', alignment: 'center' },
                {
                  text: route,
                  fontSize: 9,
                  color: dividerColor,
                  alignment: 'center',
                  margin: [0, 2, 0, 0],
                },
              ],
              alignment: 'center',
            },

            // DESTINATION COLUMN
            {
              stack: [
                { text: arrive_time, fontSize: 20, bold: true, color: primaryColor },
                { text: arrive_airport, fontSize: 11, bold: true, margin: [0, 2, 0, 0] },
                { text: fullDate, fontSize: 10, color: '#555555' }, // สมมติว่าวันเดียวกัน ถ้าข้ามวันต้องมี logic เพิ่ม
              ],
              alignment: 'right',
            },
          ],
        ],
      },
    },

    // 3. Extra Details (Footer of Flight Block)
    {
      layout: 'noBorders',
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [
          [
            { text: `Class: ${booking_class} (${cabin})`, fontSize: 10, color: '#555555' },
            { text: `Status: ${status}`, fontSize: 10, color: successColor, bold: true },
            { text: `Baggage: ${baggage}`, fontSize: 10, color: '#555555' },
            { text: `Aircraft: ${aircraft}`, fontSize: 10, color: '#555555', alignment: 'right' },
          ],
        ],
      },
      margin: [0, 0, 0, 15], // เว้นระยะห่าง Segment ต่อไป
      fillColor: lightAccentColor, // พื้นหลังสีอ่อนๆ ให้ดูเป็นกลุ่มก้อน
    },
  ];
};

// ----------------------------------------------------
// 2. HOTEL DETAILS BLOCK
// ----------------------------------------------------
const createHotelDetailsBlock = (hotel, primaryColor, dividerColor) => {
  const {
    hotel_name = 'N/A',
    location = 'N/A',
    booking_ref = 'N/A',
    check_in_date = 'N/A',
    check_out_date = 'N/A',
    num_rooms = 1,
    num_nights = 1,
    guest_names = 'N/A',
    room_type = 'Standard Room',
  } = hotel;

  return {
    layout: {
      hLineWidth: (i, node) => (i === 1 ? 2 : 1), // เส้นใต้ Header หนาหน่อย
      vLineWidth: (i, node) => 0,
      hLineColor: (i, node) => (i === 1 ? primaryColor : dividerColor),
      paddingTop: (i) => 5,
      paddingBottom: (i) => 5,
    },
    table: {
      widths: ['35%', '65%'],
      headerRows: 1,
      body: [
        // Header
        [
          {
            text: 'PROPERTY / DETAIL',
            style: 'keyHeader',
            color: primaryColor,
            border: [false, false, false, true],
          },
          {
            text: 'DESCRIPTION',
            style: 'keyHeader',
            color: primaryColor,
            border: [false, false, false, true],
          },
        ],
        // Rows
        [
          { text: 'Hotel Name', style: 'keyHeaderSmall' },
          { text: hotel_name, style: 'keyValue', bold: true, fontSize: 12 },
        ],
        [
          { text: 'Address', style: 'keyHeaderSmall' },
          { text: location, style: 'keyValue' },
        ],
        [
          { text: 'Check-In / Check-Out', style: 'keyHeaderSmall' },
          {
            text: `${check_in_date}  —  ${check_out_date}  (${num_nights} Nights)`,
            style: 'keyValue',
          },
        ],
        [
          { text: 'Room Detail', style: 'keyHeaderSmall' },
          { text: `${room_type} (${num_rooms} Rooms)`, style: 'keyValue' },
        ],
        [
          { text: 'Guest Name(s)', style: 'keyHeaderSmall' },
          { text: guest_names, style: 'keyValue' },
        ],
      ],
    },
    margin: [0, 10, 0, 15],
  };
};

// ----------------------------------------------------
// 3. FARE SUMMARY BLOCK
// ----------------------------------------------------
const createFareSummaryBlock = (fareSummary, primaryColor, dividerColor) => {
  const { base_fare = 0.0, taxes = 0.0, total_paid = 0.0, currency = 'THB' } = fareSummary;

  const formatMoney = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return {
    layout: 'noBorders', // สร้างตารางเปล่าๆ แล้วตีเส้นเองเฉพาะจุดที่ต้องการ
    table: {
      widths: ['60%', '20%', '20%'],
      body: [
        // Items
        [
          { text: 'Base Fare', fontSize: 11, color: '#555555' },
          { text: currency, fontSize: 11, color: '#555555', alignment: 'right' },
          { text: formatMoney(base_fare), fontSize: 11, color: '#555555', alignment: 'right' },
        ],
        [
          { text: 'Taxes & Fees', fontSize: 11, color: '#555555' },
          { text: currency, fontSize: 11, color: '#555555', alignment: 'right' },
          { text: formatMoney(taxes), fontSize: 11, color: '#555555', alignment: 'right' },
        ],
        // Divider Line
        [
          {
            canvas: [
              { type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: dividerColor },
            ],
            colSpan: 3,
          },
          {},
          {},
        ],
        // Grand Total
        [
          {
            text: 'GRAND TOTAL',
            fontSize: 14,
            bold: true,
            color: primaryColor,
            margin: [0, 5, 0, 0],
          },
          {
            text: currency,
            fontSize: 14,
            bold: true,
            color: primaryColor,
            alignment: 'right',
            margin: [0, 5, 0, 0],
          },
          {
            text: formatMoney(total_paid),
            fontSize: 14,
            bold: true,
            color: primaryColor,
            alignment: 'right',
            margin: [0, 5, 0, 0],
          },
        ],
      ],
    },
    margin: [0, 10, 0, 20],
  };
};

module.exports = {
  createFlightSegmentBlock,
  createHotelDetailsBlock,
  createFareSummaryBlock,
};
