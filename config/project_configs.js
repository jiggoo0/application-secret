// /config/project_configs.js

/**
 * @file project_configs.js
 * @description การตั้งค่าเฉพาะเจาะจงสำหรับแต่ละ Project ID
 */

export const PROJECT_CONFIGS = {
  // ----------------------------------------------------------------
  // 1. AIRLINESKISH (Project 1: Flight Booking)
  // ----------------------------------------------------------------
  AIRLINESKISH: {
    id: 'AIRLINESKISH',
    title: 'Flight Confirmation Document - AIRLINESKISH',
    initialRoute: 'BKK → FRA', // ใช้สำหรับใส่ค่าเริ่มต้นในฟอร์ม
    initialBaseFare: '25000',
    showHotelSection: false, // ไม่แสดงส่วนโรงแรมในฟอร์ม
  },

  // ----------------------------------------------------------------
  // 2. HOTEL_BOOKING (Project 2: Hotel Voucher)
  // ----------------------------------------------------------------
  HOTEL_BOOKING: {
    id: 'HOTEL_BOOKING',
    title: 'Hotel Accommodation Voucher - GRAND HOTELS',
    initialRoute: 'Hotel Booking Reference', // ใช้เป็นชื่อแพ็คเกจแทน Route
    initialBaseFare: '8500',
    showHotelSection: true, // แสดงส่วนโรงแรมในฟอร์ม
  },

  // ----------------------------------------------------------------
  // 3. TOUR_VOUCHER (Project 3: Tour Package)
  // ----------------------------------------------------------------
  TOUR_VOUCHER: {
    id: 'TOUR_VOUCHER',
    title: 'Package Tour Itinerary - DREAM TOURS',
    initialRoute: 'EUROPE CLASSIC 7D/6N',
    initialBaseFare: '55000',
    showHotelSection: false, // ไม่แสดงส่วนโรงแรม (อาจรวมอยู่ใน Base Fare)
  },

  // สามารถเพิ่มโปรเจกต์อื่น ๆ ได้ที่นี่...
};

// ใช้สำหรับ Export List ของ Project Configs ทั้งหมด (ถ้าจำเป็น)
export const PROJECT_LIST = Object.values(PROJECT_CONFIGS);
