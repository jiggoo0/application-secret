// types/booking-types.ts

export type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR' | '';
export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';
export type CurrencyType = 'THB' | 'USD' | 'EUR';

export interface TravellerDetails {
  name: string;
  nationality: string;
  email: string;
  phone: string;
}

export interface FareSummary {
  base_fare: number;
  taxes: number;
  total_paid: number;
  currency: CurrencyType;
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
}

export type TourDetails = Record<string, any> | null;

/**
 * @title BookingSchema
 * @description Schema หลักสำหรับตาราง public.bookings
 */
export interface BookingSchema {
  pnr_code: string;
  eticket_no: string | null;
  payment_method: string | null; // 💡 เพิ่ม payment_method
  traveller_name: string;
  booking_status: BookingStatus;
  is_active: boolean;
  project_id: ProjectType;

  // JSONB Fields:
  traveller_details: TravellerDetails;
  fare_summary: FareSummary;
  flight_details: FlightSegment[] | null;
  hotel_details: HotelDetails | null;
  tour_details: TourDetails;
}
