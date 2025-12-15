// ETicketmock_data.js
// Mock data structure for generating E-Ticket Itinerary PDF.

export const mockETicketData = {
  // กำหนดภาษาเริ่มต้น (จะถูก override ใน runETicketGenerator สำหรับภาษาไทย)
  language: 'EN',

  // ข้อมูลตัวแทนท่องเที่ยว
  agency: {
    name: 'FlyHigh Travel Agency',
    address: '123 Main St, Central Business District, Bangkok, Thailand 10330',
    phone: '+66 2 123 4567',
  },

  // ข้อมูลการจองหลัก (สำคัญสำหรับ Token)
  booking: {
    // PNR หรือ Booking Reference ID (สำคัญมาก: ใช้เป็น ref_id ใน API POST)
    pnr: 'ABCRD1',
    // หมายเลขตั๋ว (ใช้ร่วมกับ PNR ในการสร้าง Token หรือใช้เป็น reference)
    ticketNumber: '245-1234567890',
    status: 'CONFIRMED',
    issueDate: '15 DEC 2025',
    currency: 'THB',
  },

  // ข้อมูลผู้โดยสาร
  passenger: {
    name: 'MR/JYOTI RANJAN RAY',
    fareBasis: 'YCLASS',
  },

  // รายละเอียดเที่ยวบิน
  flights: [
    {
      date: '20 JAN',
      airline: 'TG',
      flightNumber: '311',
      from: 'BKK',
      depTime: '10:00',
      to: 'DEL',
      arrTime: '13:00',
      baggage: '20K',
      status: 'OK',
    },
    {
      date: '27 JAN',
      airline: 'TG',
      flightNumber: '312',
      from: 'DEL',
      depTime: '14:30',
      to: 'BKK',
      arrTime: '19:30',
      baggage: '20K',
      status: 'OK',
    },
  ],

  // รายละเอียดค่าโดยสาร
  fareDetails: {
    fare: 'THB 15,000.00',
    tax: 'THB 3,500.00',
    total: 'THB 18,500.00',
  },

  // หมายเหตุ
  notes: [
    'Visa requirements are the sole responsibility of the passenger.',
    'Please reconfirm your flight details 72 hours prior to departure.',
    'Check-in at least 3 hours prior to departure.',
  ],
};
