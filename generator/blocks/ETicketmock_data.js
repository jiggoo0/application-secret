// ETicketmock_data_ZRH.js
// Mock data structure for generating E-Ticket Itinerary PDF (Single Page Format).
// V5: Updated Passenger (Mr. Jawpah Namsommuti) and Route (BKK -> ZRH).

export const mockETicketData = {
  // ISO-639-1 Language Code
  language: 'EN', // English default

  // ข้อมูลตัวแทนท่องเที่ยว / Airline (สำหรับ Header)
  agency: {
    name: 'JP VISUAL TRAVEL',
    address: '99/9 Rama I Rd, Pathum Wan, Bangkok 10330',
    phone: '+66 2 987 6543',
  },

  // ข้อมูลการจองหลัก (สำคัญสำหรับ Token และ ref_id)
  booking: {
    pnr: 'JP789Z', // New PNR for Zurich route
    ticketNumber: '245-7890123458',
    status: 'CONFIRMED',
    issueDate: '01 APR 2026', // วันที่ออกตั๋ว
    currency: 'THB',
  },

  // ข้อมูลผู้โดยสาร
  passenger: {
    name: 'MR/JAWPAH/NAMSOMMUTI', // นาย เจ้าป่า นามสมมุติ
    type: 'ADULT',
    fareBasis: 'JCLASS', // Business Class Promotion
  },

  // รายละเอียดเที่ยวบิน: BKK - ZRH - BKK (Direct/One-Stop Simulation)
  flights: [
    {
      date: '05 MAY', // วันที่เดินทาง
      airline: 'JP',
      flightNumber: '956', // หมายเลขเที่ยวบินขาไป
      from: 'BKK',
      fromCity: 'BANGKOK',
      depTime: '00:30', // ออกเดินทางเที่ยงคืน
      to: 'ZRH',
      toCity: 'ZURICH', // เมืองปลายทาง
      arrTime: '07:05', // Arrive same day (approx. 10h 35m flight time)
      class: 'J', // Business Class
      status: 'OK',
      baggage: '2PC (32kg)', // Business Class baggage
    },
    {
      date: '12 MAY', // วันที่เดินทางกลับ
      airline: 'JP',
      flightNumber: '957', // หมายเลขเที่ยวบินขากลับ
      from: 'ZRH',
      fromCity: 'ZURICH',
      depTime: '13:30',
      to: 'BKK',
      toCity: 'BANGKOK',
      arrTime: '05:55+1', // Arrive next day (approx. 10h 25m flight time)
      class: 'J',
      status: 'OK',
      baggage: '2PC (32kg)',
    },
  ],

  // รายละเอียดค่าโดยสาร (Realistic for Long-haul Business Class)
  fareDetails: {
    baseFare: '75,000.00 THB', // ฐานค่าโดยสาร
    totalTax: '15,800.00 THB', // ภาษีและค่าธรรมเนียม
    totalPaid: '90,800.00 THB', // รวมทั้งสิ้น
  },

  // หมายเหตุสำคัญ (ปรับ Note ให้สอดคล้องกับสวิตเซอร์แลนด์)
  notices: [
    'Check-in counter closes 60 minutes prior to scheduled departure time.',
    'This is an Electronic Ticket. Please carry a copy of this itinerary and a valid Photo ID and Passport.',
    'Baggage allowance for J Class is 2PC (32kg each).',
    "Travel to Switzerland (Schengen Area) requires a valid passport and may require a Schengen Visa. It is the passenger's responsibility to secure all necessary documents.",
    'This document is for itinerary and receipt purposes only and is not a boarding pass.',
    'All flights are non-stop services operated by JP Airways.',
  ],
};
