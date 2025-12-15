// types/booking-types.ts

export type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR' | '';
export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';
export type CurrencyType = 'THB' | 'USD' | 'EUR';

// 💡 NEW INTERFACE: Wrapper สำหรับ segments เพื่อให้สอดคล้องกับการใช้งานจริงในฟอร์ม
export interface FlightDetails {
  segments: FlightSegment[];
}

// 💡 CORRECTION: ปรับแก้ TravellerDetails ให้ตรงกับ fields ที่ใช้ใน AdminBookingForm.tsx
export interface TravellerDetails {
  // name ถูกย้ายไปที่ root level เป็น traveller_name
  customer_nationality: string;
  customer_email: string;
  customer_phone: string;
  total_passengers: string;
  pickup_location: string;
}

// 💡 CORRECTION: ปรับ FareSummary ให้มี fields ที่ใช้ใน initialFormData
export interface FareSummary {
  base_fare: number;
  taxes: number;
  total_paid: number;
  currency: CurrencyType;

  // Fields ที่ถูกใช้ใน AdminBookingForm.tsx
  total_fare: number;
  currency_code: CurrencyType;
  fare_details: Array<{ type: string; amount: number; description: string }>;
}

export interface FlightSegment {
  flight_no: string;
  airline_name: string;
  route: string;
  date: string;
  depart_time: string;
  arrive_time: string;
  depart_airport: string;
  arrive_airport: string;
  duration: string;
}

export interface HotelDetails {
  hotel_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  num_nights: number;
  num_rooms: number;
  // 💡 เพิ่ม Confirmation No. ที่มักถูกใช้
  confirmation_no?: string | null;
}

// 💡 CORRECTION: TourDetails เป็น Type Object ที่มี Fields เริ่มต้น
export interface TourDetails {
  tour_name: string;
  activity_date: string;
  activity_time: string;
  package_type: string;
  included_meals: string;
  language: string;
  transfer_type: string;
  zone: string;
  voucher_no: string;
  // ใช้ Record<string, any> ได้หากต้องการ fields อื่นๆ ที่ไม่แน่นอน
}

/**
 * @title BookingSchema
 * @description Schema หลักสำหรับตาราง public.bookings
 */
export interface BookingSchema {
  pnr_code: string;
  eticket_no: string | null;
  payment_method: string | null;
  traveller_name: string;
  booking_status: BookingStatus;
  is_active: boolean;
  project_id: string; // ใช้ string เพื่อรองรับ Project ID ที่อาจมี Prefix (เช่น JP-FLIGHT)
  project_type: ProjectType; // 💡 เพิ่ม Project Type แยกออกมาเพื่อระบุประเภทหลัก (FLIGHT/HOTEL/TOUR)

  // JSONB Fields:
  traveller_details: TravellerDetails;
  fare_summary: FareSummary;
  flight_details: FlightDetails; // 💡 CORRECTION: ใช้ FlightDetails Wrapper
  hotel_details: HotelDetails | null;
  tour_details: TourDetails | null;

  // Field สำหรับส่ง Error ไปยัง PDF Template (ใช้ใน generatePdfDocument.js)
  notFoundData?: {
    title: string;
    message: string;
    error_code: string;
    reference_id: string;
  };
}
