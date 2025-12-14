// types/booking-types.ts

// ----------------------------------------------------
// 1. Core Structures for JSONB Fields (Nested Data)
// ----------------------------------------------------

// 💡 FIX: เพิ่มค่า Empty String ('') เพื่อรองรับ Initial State ของ Form ใน AdminBookingForm.tsx
export type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR' | '';
export type CurrencyType = 'THB' | 'USD' | 'EUR';
export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'VOID';

/**
 * ข้อมูลรายละเอียดผู้เดินทางและผู้ติดต่อหลัก
 */
export interface TravellerDetails {
  name: string;
  passport_no?: string;
  nationality: string;
  email: string;
  phone: string;
}

/**
 * ข้อมูลสรุปค่าโดยสาร/ค่าใช้จ่าย
 */
// 💡 การจัดรูปแบบเรียบร้อย
export interface FareSummary {
  base_fare: number;
  taxes: number;
  total_paid: number;
  currency: CurrencyType;
  payment_status?: 'PAID IN FULL' | 'DEPOSIT PAID' | 'UNPAID';
}

/**
 * ข้อมูลส่วนของเที่ยวบิน (ใช้ใน ProjectType: 'FLIGHT')
 */
export interface FlightSegment {
  flight_no: string;
  airline_name: string;
  route: string;
  date: string;
  depart_time: string;
  arrive_time: string;
  depart_airport: string;
  arrive_airport: string;
  duration?: string;
  class?: string;
}

/**
 * ข้อมูลส่วนของโรงแรม (ใช้ใน ProjectType: 'HOTEL')
 */
export interface HotelDetails {
  hotel_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  num_nights: number;
  num_rooms: number;
  address?: string[];
  contact_phone?: string;
  cancellation_policy?: string;
}

/**
 * ข้อมูลส่วนของทัวร์/กิจกรรม (ใช้ใน ProjectType: 'TOUR')
 */
export interface TourDetails {
  tour_name: string;
  activity_date: string;
  activity_time: string;
  package_type: string;
  pickup_location: string;
  language?: string;
}

// ----------------------------------------------------
// 2. Main Booking Schema (Matching Supabase 'bookings' table)
// ----------------------------------------------------

/**
 * @title BookingSchema
 * @description โครงสร้างข้อมูลหลักของการจองแต่ละรายการ (Row ใน Supabase Table)
 */
export interface BookingSchema {
  // --- Required DB Fields (from your schema) ---
  id?: number;
  created_at?: string;

  pnr_code: string; // Primary Key
  project_id: ProjectType; // FLIGHT | HOTEL | TOUR | ''

  // --- New Fields added from your schema ---
  eticket_no?: string | null; // varchar(20)
  payment_method?: string | null; // text

  // --- Main Data Fields (Indexed) ---
  traveller_name: string; // varchar(100)
  booking_status: BookingStatus; // varchar(20)
  is_active?: boolean; // boolean (with default true)

  // --- JSONB Fields ---
  traveller_details: TravellerDetails;
  fare_summary: FareSummary;

  // 💡 การใช้ FlightSegment[] | null ถูกต้องตามหลักการจัดการ JSONB ที่เป็น Array
  flight_details: FlightSegment[] | null; // jsonb
  hotel_details: HotelDetails | null; // jsonb
  tour_details: TourDetails | null; // jsonb
}
