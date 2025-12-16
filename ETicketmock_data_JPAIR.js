// ETicketmock_data_JPAIR.js
// Mock data structure for JP Airways E-Ticket Itinerary PDF (V2 - Complete Data).

export const mockETicketData_JPAIR = {
  // ISO-639-1 Language Code
  language: 'EN',

  // JP Airways Information
  airline: {
    name: 'JP AIRWAYS',
    iataPrefix: '245', // IATA Airline Designator
    address: 'JP Airways Headquarter, Suvarnabhumi Airport, Bangkok, Thailand 10540',
    phone: '+66 2 987 6543',
  },

  // Booking/Ticket Reference
  booking: {
    // Passenger Name Record - Booking Reference ID
    pnr: 'JP789E',
    // หมายเลขตั๋วอิเล็กทรอนิกส์ (245-xxxxxxxxx)
    ticketNumber: '245-7890123456',
    status: 'CONFIRMED',
    issueDate: '10 DEC 2025',
    issueOffice: 'BKK IATA-A1234567', // Place of Issue
    currency: 'THB',
  },

  // Passenger Information
  passenger: {
    title: 'MR',
    firstName: 'MASAHIRO',
    lastName: 'TANAKA',
    type: 'ADULT',
    fareBasis: 'JCLASS',
    // IATA Standard Endorsement/Restrictions
    endorsements: 'NON-REF/NON-END/CANCELLATION FEE APPLIES',
  },

  // Flight Segments
  flights: [
    {
      segmentNo: 1,
      date: '25 JAN',
      airline: 'JP',
      flightNumber: '101',
      from: 'BKK', // Bangkok, Suvarnabhumi
      depTime: '18:00',
      to: 'NRT', // Tokyo, Narita
      arrTime: '02:00+1',
      class: 'J', // Business Class
      status: 'OK',
      baggage: '2PC', // 2 Pieces
      depTerminal: 'D', // Added Terminal Info
      arrTerminal: '1', // Added Terminal Info
    },
    {
      segmentNo: 2,
      date: '01 FEB',
      airline: 'JP',
      flightNumber: '102',
      from: 'NRT',
      depTime: '10:30',
      to: 'BKK',
      arrTime: '15:30',
      class: 'J',
      status: 'OK',
      baggage: '2PC',
      depTerminal: '1',
      arrTerminal: 'D',
    },
  ],

  // Detailed Fare Breakdown (IATA Standard)
  fareDetails: {
    baseFare: '55,000.00',
    taxes: [
      { code: 'XT', amount: '1,500.00' },
      { code: 'YQ', amount: '4,000.00' },
      { code: 'BP', amount: '500.00' },
    ],
    totalTax: '6,000.00',
    totalPaid: '61,000.00',
    currency: 'THB',
  },

  // ⭐️ FARE CONSTRUCTION (สำคัญมากสำหรับการจัดเรียง IATA)
  fareConstruction: 'BKK JP NRT 55000 JPY 105000 END ROE 0.354',

  // Important Notices
  notices: [
    'Check-in counter closes 60 minutes prior to scheduled departure time.',
    'This is an Electronic Ticket. Please carry a copy of this itinerary and a valid Photo ID.',
    'Baggage allowance is 2PC. Excess baggage fees apply.',
    'Travel is subject to the General Conditions of Carriage of JP Airways.',
  ],
};
