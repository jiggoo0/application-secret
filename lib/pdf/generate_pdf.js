// lib/pdf/generate_pdf.js
// 💡 ไฟล์นี้ทำหน้าที่สร้างเอกสาร PDF ที่ฝัง QR Code สำหรับยืนยันสถานะการจอง

// ----------------------------------------------------
// 🎯 MODULE IMPORTS
// ----------------------------------------------------
const PdfPrinter = require('pdfmake');
const path = require('path');
const fs = require('fs'); // เพิ่ม fs เพื่อเช็คไฟล์ฟอนต์ (Optional)

// 💡 Imports (Assumed local files)
const pdfStyles = require('./pdf_styles');
const {
  createFlightSegmentBlock,
  createHotelDetailsBlock,
  createFareSummaryBlock,
} = require('./pdf_layout_blocks');

// Destructuring Styles and Colors (พร้อมค่า Default กัน Error)
const {
  styles = {},
  primaryColor = '#000000',
  dividerColor = '#CCCCCC',
  successColor = '#28a745',
  lightAccentColor = '#f8f9fa',
} = pdfStyles || {};

// -----------------------------------------------------------------
// 🎯 CONFIGURATION: FONTS
// -----------------------------------------------------------------
// ใช้ process.cwd() เพื่อให้หา path เจอเวลา deploy บน Vercel/Server
const fontPath = path.join(process.cwd(), 'public', 'fonts');

const fonts = {
  THSarabun: {
    normal: path.join(fontPath, 'THSarabun-Regular.ttf'),
    bold: path.join(fontPath, 'THSarabun-Bold.ttf'),
    italics: path.join(fontPath, 'THSarabun-Italics.ttf'),
    bolditalics: path.join(fontPath, 'THSarabun-BoldItalic.ttf'),
  },
};

// -----------------------------------------------------------------
// 🎯 UTILITY: Get Base URL
// -----------------------------------------------------------------
const getBaseUrl = () => {
  const host =
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;

  if (host) {
    return host.startsWith('http') ? host : `https://${host}`;
  }
  return 'http://localhost:3000';
};

// -----------------------------------------------------------------
// 🎯 UTILITY: Safe Date Formatter
// -----------------------------------------------------------------
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// =================================================================
// 🎯 EXPORTED FUNCTION: generatePdfDocument
// =================================================================

/**
 * Generates the PDF document buffer.
 * @param {object} bookingData - The complete booking data object.
 * @returns {Promise<Buffer>} The PDF document buffer.
 */
const generatePdfDocument = (bookingData) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. SAFER DATA DESTRUCTURING
      // ใช้ Logical OR (||) เพื่อกันค่า null
      const pnr_code = bookingData.pnr_code || 'N/A';
      const traveller_name = bookingData.traveller_name || 'N/A';
      const booking_status = bookingData.booking_status || 'PENDING';
      const eticket_no = bookingData.eticket_no || '-';
      const project_id = bookingData.project_id || 'N/A';

      // ตรวจสอบว่าเป็น Array จริงๆ หรือไม่
      const flightSegments = Array.isArray(bookingData.flight_details)
        ? bookingData.flight_details
        : [];
      // ตรวจสอบว่าเป็น Object จริงๆ หรือไม่
      const hotel =
        bookingData.hotel_details && typeof bookingData.hotel_details === 'object'
          ? bookingData.hotel_details
          : {};
      const fareSummary = bookingData.fare_summary || {};
      const created_at = bookingData.created_at;

      // 2. PREPARE QR CODE LINK
      const baseURL = getBaseUrl();
      const verificationLink = `${baseURL}/verify/${pnr_code}`; // ปรับ URL ตาม Route จริงของ Next.js

      // 3. INITIALIZE PRINTER
      const printer = new PdfPrinter(fonts);

      // 4. DEFINE DOCUMENT CONTENT
      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40], // ซ้าย, บน, ขวา, ล่าง
        defaultStyle: { font: 'THSarabun', fontSize: 14 }, // THSarabun ควรอ่านที่ 14-16pt ถึงจะชัด

        content: [
          // === HEADER SECTION ===
          {
            columns: [
              { text: 'JPDATA BUSINESSES', style: 'sectionHeader', width: '*' }, // ใส่ชื่อ Agency ของคุณ
              {
                stack: [
                  { text: 'TRAVEL CONFIRMATION', style: 'sectionHeader', alignment: 'right' },
                  {
                    text: `Issued: ${formatDate(created_at)}`,
                    alignment: 'right',
                    fontSize: 12,
                    color: dividerColor,
                    margin: [0, 2, 0, 0],
                  },
                ],
                width: 'auto',
              },
            ],
            margin: [0, 0, 0, 20],
          },

          // === LINE DIVIDER ===
          {
            canvas: [
              { type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: dividerColor },
            ],
          },
          { text: '', margin: [0, 0, 0, 10] },

          // === DETAILS & QR CODE ===
          {
            columns: [
              // Left: Details
              {
                width: '65%',
                stack: [
                  {
                    text: 'BOOKING REFERENCE (PNR)',
                    style: 'keyHeader',
                    fontSize: 10,
                    color: dividerColor,
                  },
                  {
                    text: pnr_code,
                    style: 'keyValuePNR',
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                  },

                  { text: 'PASSENGER NAME', style: 'keyHeader', fontSize: 10, color: dividerColor },
                  {
                    text: traveller_name,
                    style: 'keyValue',
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 10],
                  },

                  {
                    columns: [
                      {
                        width: 'auto',
                        text: 'Status: ',
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        text: booking_status,
                        color: booking_status === 'CONFIRMED' ? successColor : '#dc3545',
                        bold: true,
                        fontSize: 12,
                        margin: [5, 0, 0, 0],
                      },
                    ],
                  },
                  {
                    text: `E-Ticket: ${eticket_no}`,
                    color: dividerColor,
                    fontSize: 12,
                    margin: [0, 2, 0, 0],
                  },
                ],
              },

              // Right: QR Code
              {
                width: '35%',
                stack: [
                  {
                    text: 'SCAN TO VERIFY',
                    style: 'keyHeader',
                    alignment: 'center',
                    fontSize: 10,
                    color: dividerColor,
                  },
                  {
                    qr: verificationLink,
                    fit: 100,
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                    foreground: primaryColor,
                  },
                  {
                    text: `Ref: ${project_id}`,
                    alignment: 'center',
                    fontSize: 10,
                    color: dividerColor,
                  },
                ],
              },
            ],
            margin: [0, 0, 0, 25],
          },

          // === 3.1 FLIGHT ITINERARY ===
          ...(flightSegments.length > 0
            ? [
                { text: 'FLIGHT ITINERARY', style: 'sectionHeader', margin: [0, 10, 0, 10] },
                ...flightSegments.flatMap((segment) =>
                  createFlightSegmentBlock(
                    segment,
                    primaryColor,
                    successColor,
                    lightAccentColor,
                    dividerColor,
                  ),
                ),
              ]
            : []),

          // === 3.2 HOTEL DETAILS ===
          ...(Object.keys(hotel).length > 0
            ? [
                { text: 'ACCOMMODATION DETAILS', style: 'sectionHeader', margin: [0, 20, 0, 10] },
                createHotelDetailsBlock(hotel, primaryColor, dividerColor),
              ]
            : []),

          // === 4. FARE SUMMARY ===
          { text: 'PAYMENT SUMMARY', style: 'sectionHeader', margin: [0, 20, 0, 5] },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 0.5,
                lineColor: dividerColor,
              },
            ],
          },
          { text: '', margin: [0, 5, 0, 0] },
          createFareSummaryBlock(fareSummary, primaryColor, dividerColor),

          // === 5. FOOTER / NOTES ===
          {
            text: 'IMPORTANT NOTES',
            style: 'sectionHeader',
            margin: [0, 30, 0, 5],
            fontSize: 12,
          },
          {
            ul: [
              'This document confirms the reservation status and is valid for visa application purposes.',
              'Reservation status can be verified instantly via the QR code above.',
              'Please verify flight times with the airline before departure.',
            ],
            style: 'notesList',
            color: '#555555',
            fontSize: 10,
            margin: [0, 5, 0, 20],
          },

          {
            text: 'Generated by JPDATA BUSINESSES System',
            alignment: 'center',
            fontSize: 8,
            color: '#aaaaaa',
            margin: [0, 20, 0, 0],
          },
        ],

        // Styles
        styles: styles,
      };

      // 5. CREATE PDF & RETURN BUFFER
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks = [];

      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', (err) => reject(err));

      pdfDoc.end();
    } catch (error) {
      console.error('Error creating PDF definition:', error);
      reject(error);
    }
  });
};

module.exports = {
  generatePdfDocument,
};
