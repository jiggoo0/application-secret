// /lib/supabase/server-client.ts (UPDATED CONTENT)

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ----------------------------------------------------
// 1. Singleton Client Instance
// ----------------------------------------------------
// 💡 ใช้ Singleton Pattern เพื่อให้เกิดการเชื่อมต่อเพียงครั้งเดียว
let supabaseInstance: SupabaseClient | null = null;

/**
 * Utility function to get a robust Supabase client instance for Server/API Routes.
 * It uses the Service Role Key for elevated permissions.
 * @returns {SupabaseClient} Initialized Supabase client.
 * @throws {Error} If required environment variables are missing.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // 🚨 ตรวจสอบ Environment Variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // 🚨 หาก Key หายไป ให้ Throw Error ที่ชัดเจน
    throw new Error(
      'SUPABASE_CONFIG_ERROR: Required Supabase Environment Variables (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY) are missing. Check your .env file.',
    );
  }

  // 💡 สร้าง Client ใหม่และกำหนดให้เป็น Instance
  const client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    // 💡 เพื่อความมั่นใจ
    global: {
      headers: { Authorization: `Bearer ${supabaseServiceRoleKey}` },
    },
  });

  supabaseInstance = client;
  return client;
}

// ----------------------------------------------------
// 2. Data Fetching Logic (NEW)
// ----------------------------------------------------

/**
 * @typedef {'tour' | 'flight' | 'hotel'} BookingType
 * @typedef {object} BookingData
 * @property {BookingType} type - ประเภทของการจอง ('tour', 'flight', 'hotel')
 * @property {string} voucher_no - หมายเลขการจอง (PNR)
 * // ... other fields specific to the booking type
 */

/**
 * @description ดึงข้อมูลการจองจากฐานข้อมูลตามหมายเลข PNR/Voucher
 * @param {string} pnr - PNR หรือ Voucher ID
 * @returns {Promise<BookingData | null>} ข้อมูลการจองที่ Map แล้ว หรือ null ถ้าไม่พบ
 */
export async function fetchBookingDetails(pnr: string): Promise<any | null> {
  if (!pnr) return null;

  // ----------------------------------------------------------------------
  // 💡 ACTUAL SUPABASE IMPLEMENTATION PLACEHOLDER
  // หากต้องการใช้ Supabase จริง ให้ uncomment โค้ดด้านล่าง และแทนที่ Mock Data
  // ----------------------------------------------------------------------
  /*
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('bookings_table') // 💡 REPLACE with your actual table name (e.g., 'bookings')
    .select('*')
    .eq('pnr_id', pnr) // 💡 REPLACE with your actual PNR column name
    .single();

  if (error || !data) {
    // Handle error or not found
    if (error && error.code !== 'PGRST116') { 
        console.error('Supabase fetch error:', error.message);
    }
    return null;
  }
  
  // 💡 You must map the raw 'data' here to the standardized BookingData structure
  // return mapRawDataToBookingData(data);
  */
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // --- MOCK DATA SIMULATION (FOR IMMEDIATE TESTING WITH API) ---
  // ----------------------------------------------------------------------
  const normalizedPnr = pnr.toUpperCase();

  switch (normalizedPnr) {
    case 'JPTOUR-001':
      return {
        type: 'tour',
        voucher_no: normalizedPnr,
        customer_name: 'Mr. John Wick',
        agency_name: 'JPDATABUSINESSES',
        agency_tagline: 'Your Trusted Travel Partner',
        booking_date: '2025-12-14T10:00:00Z',
        customer_nationality: 'USA',
        total_passengers: '2 (Adults)',
        customer_email: 'john.w@example.com',
        customer_phone: '+1 555-1234',
        pickup_location: 'Hotel Lobby: Grand Hyatt Erawan',
        tour_name: 'BANGKOK TEMPLES DAY TRIP (FULL DAY)',
        activity_date: 'SATURDAY, 28th DEC 2025',
        activity_time: '08:30 AM - 05:00 PM',
        package_type: 'Private Car',
        included_meals: 'Lunch Set',
        language: 'English Guide',
        transfer_type: 'Private',
        zone: 'All Zones',
        total_paid_amount: '4,500.00',
        currency: 'THB',
        payment_status_text: 'FULLY PAID',
        price_detail: '2 x Adults @ 2,250 THB',
        confirmation_status: 'CONFIRMED',
        verified_date: new Date().toISOString(),
      };
    case 'WT532':
      return {
        type: 'flight',
        pnr_code: normalizedPnr,
        passenger_name: 'MR. SITI NURAIN MAT ZIN',
        airline_name: 'JP AIRLINES',
        contact_phone: '+66 (0) 3836 1836',
        contact_email: 'info@jp-airlines.com',
        ticket_number: '2322442391792',
        booking_status: 'CONFIRMED',
        passenger_email: 'sitinurain_matzin@yahoo.com',
        passenger_mobile: '06-0193784335',
        baggage_allowance: '20 KG (Included)',
        flight_segments: [
          {
            type: 'OUTBOUND',
            origin_code: 'BKK',
            origin_name: 'SUVARNABHUMI',
            destination_code: 'KUL',
            destination_name: 'KUALA LUMPUR',
            date: '28 DEC 2025',
            depart_time: '10:00',
            arrive_time: '13:30',
            flight_number: 'JP532',
            airline: 'JP AIRLINES',
            equipment: 'A320',
            class: 'Economy',
          },
        ],
        fare_details: [
          {
            pax_type: 'Adult',
            base_fare: '3,000.00',
            taxes: '700.00',
            total_fare_per_pax: '3,700.00',
            num_pax: 1,
            total_fare_line: '3,700.00',
          },
        ],
        total_fare: '3,700.00',
        currency_code: 'THB',
        payment_status: 'PAID IN FULL',
        payment_card: 'VISA **** 1234',
      };
    case 'HOTEL-ABC':
      return {
        type: 'hotel',
        booking_id: normalizedPnr,
        customer_name: 'Ms. Alice Johnson',
        customer_city: 'London',
        customer_nationality: 'UK',
        customer_email: 'alice.j@test.com',
        customer_phone: '+44 20 xxx xxxx',
        room_type: 'Deluxe Sea View (King)',
        rate_plan: 'Breakfast & Free Wi-Fi',
        num_rooms: 1,
        adults_per_room: 2,
        children: 0,
        breakfast_status: 'Included',
        num_nights: 3,
        check_in_date: '2026-01-10',
        check_out_date: '2026-01-13',
        total_paid_amount: '12,500.00',
        currency: 'THB',
        cancellation_policy: 'PREPAID - Non-refundable',
        rate_date: '2025-10-01',
        rate_per_room: '4,166.67',
        hotel_name_brand: 'JP GRAND RESORT PHUKET',
        verification_status: 'RESERVATION VERIFIED',
        remark_text: 'High floor preference.',
        hotel_address: ['99/9 M.4, Karon Beach', 'Phuket, 83100 Thailand'],
        hotel_contact_name: 'JP Grand Resort Phuket',
        hotel_phone: '+66 76 XXX XXXX',
        hotel_email: 'res@jpgphuket.com',
      };
    default:
      return null;
  }
}
