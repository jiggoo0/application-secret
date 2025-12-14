// types/booking-types.ts
export type ProjectType = 'FLIGHT' | 'HOTEL' | 'TOUR';
export type CurrencyType = 'THB' | 'USD' | 'EUR';
export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface TravellerDetails {
  name: string;
  passport_no: string;
  nationality: string;
  email: string;
  phone: string;
  currency: CurrencyType;
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
  location: string;
  booking_ref: string;
  check_in_date: string;
  check_out_date: string;
  num_rooms: number;
  num_nights: number;
  guest_names: string;
  confirmation_policy: string;
}

export interface BookingSchema {
  project_id: ProjectType;
  pnr_code: string;
  traveller_name: string;
  booking_status: BookingStatus;
  traveller_details: TravellerDetails;
  fare_summary: FareSummary;
  flight_details?: FlightSegment[] | null;
  hotel_details?: HotelDetails | null;
}
