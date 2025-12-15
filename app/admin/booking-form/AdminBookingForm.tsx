// app/admin/booking-form/AdminBookingForm.tsx
'use client';

import React, { useState, useTransition, useCallback, useMemo } from 'react';
// 💡 Import Server Action ที่ใช้ในการบันทึกและสร้าง PDF
import { saveBooking } from '@/app/actions/bookings';

// 💡 Assumed imports for types (adjust path if needed)
import type {
  BookingSchema,
  FlightSegment,
  HotelDetails,
  TourDetails,
  FareSummary,
  FlightDetails, // 💡 NEW: Import FlightDetails Wrapper
} from '@/types/booking-types';

// ----------------------------------------------------
// 1. UTILITY TYPES & CONSTANTS
// ----------------------------------------------------

interface SaveResultStatus {
  success: boolean;
  message?: string;
  pdf_base64?: string;
  pnr_code?: string;
  project_id?: string;
  error?: string;
}

// 💡 Initial Data สำหรับ Flight Segment
const initialFlightSegment: FlightSegment = {
  flight_no: '',
  airline_name: '',
  route: '',
  date: '',
  depart_time: '',
  arrive_time: '',
  depart_airport: '',
  arrive_airport: '',
  duration: '',
};

// 💡 Initial Data สำหรับ Flight Details Wrapper
const initialFlightDetails: FlightDetails = {
  segments: [initialFlightSegment],
};

// 💡 Initial Data สำหรับ Hotel Details
const initialHotelDetails: HotelDetails = {
  hotel_name: '',
  room_type: '',
  check_in_date: '',
  check_out_date: '',
  num_nights: 1,
  num_rooms: 1,
};

// 💡 Initial Data สำหรับ Tour Details (ตาม TourTemplate.js)
const initialTourDetails: TourDetails = {
  tour_name: '',
  activity_date: '',
  activity_time: '',
  package_type: 'Standard',
  included_meals: 'None',
  language: 'English',
  transfer_type: 'Shared Van',
  zone: 'Free Pick-up Zone',
  voucher_no: '',
};

// 💡 Initial Data สำหรับ Fare Summary
const initialFareSummary: FareSummary = {
  total_fare: 0.0,
  currency_code: 'THB',
  fare_details: [],
  base_fare: 0.0,
  taxes: 0.0,
  total_paid: 0.0,
  currency: 'THB',
};

// 💡 Initial State ของฟอร์มที่สมบูรณ์ตาม BookingSchema
const initialFormData: BookingSchema = {
  pnr_code: '',
  project_id: '',
  traveller_name: '',
  booking_status: 'CONFIRMED',
  is_active: true,
  project_type: '', // FLIGHT, HOTEL, TOUR

  eticket_no: null, // ใช้ null ตาม Type
  payment_method: null, // ใช้ null ตาม Type

  // JSONB fields (Initial empty states)
  traveller_details: {
    // 🛑 FIX: ใส่ fields กลับเข้าไปเนื่องจาก Type TravellerDetails ถูกแก้ไขแล้ว
    customer_nationality: '',
    total_passengers: '1 (Adult)',
    customer_email: '',
    customer_phone: '',
    pickup_location: 'Hotel Lobby',
  },
  fare_summary: initialFareSummary,
  flight_details: initialFlightDetails, // 🛑 FIX: ใช้ FlightDetails Wrapper
  hotel_details: initialHotelDetails,
  tour_details: initialTourDetails,
};

// ----------------------------------------------------
// 2. MAIN COMPONENT
// ----------------------------------------------------

/**
 * @component AdminBookingForm
 * @description Client Component สำหรับจัดการ State และ Logic ของฟอร์ม Booking Data
 */
export const AdminBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingSchema>(initialFormData);
  const [result, setResult] = useState<SaveResultStatus | null>(null);
  const [isPending, startTransition] = useTransition();

  // ----------------------------------------------------
  // 2.1. PDF DOWNLOAD UTILITY
  // ----------------------------------------------------

  /**
   * @description แปลง Base64 PDF String ให้เป็น Blob และสั่งให้เบราว์เซอร์ดาวน์โหลดไฟล์
   */
  const handleDownloadPdf = useCallback((base64String: string, pnr: string, projectId: string) => {
    try {
      // 1. ถอดรหัส base64 ให้เป็นข้อมูลไบนารี
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // 2. สร้าง Blob (Binary Large Object)
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // 3. สร้าง Object URL และลิงก์ดาวน์โหลด
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // กำหนดชื่อไฟล์ให้สื่อความหมาย
      link.setAttribute('download', `${projectId.toUpperCase()}_VOUCHER_${pnr.toUpperCase()}.pdf`);

      // 4. กระตุ้นการคลิกเพื่อเริ่มดาวน์โหลด
      document.body.appendChild(link);
      link.click();

      // 5. ล้างทรัพยากร
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`Successfully triggered download for ${pnr}`);
    } catch (error) {
      console.error('PDF Download failed:', error);
    }
  }, []);

  // ----------------------------------------------------
  // 2.2. HANDLERS
  // ----------------------------------------------------

  /**
   * @description จัดการการเปลี่ยนแปลงของ Field ทั่วไป (Level 1 fields)
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let newState = { ...prev, [name]: value };

      // Reset state สำหรับ Project-specific details เมื่อเปลี่ยน Project ID
      if (name === 'project_id') {
        // กำหนด project_type ตาม project_id
        const projectType = (
          value.toUpperCase().includes('FLIGHT')
            ? 'FLIGHT'
            : value.toUpperCase().includes('HOTEL')
              ? 'HOTEL'
              : value.toUpperCase().includes('TOUR')
                ? 'TOUR'
                : ''
        ) as typeof prev.project_type;

        // Logic to reset project-specific details
        const resetDetails = {
          flight_details: initialFlightDetails,
          hotel_details: initialHotelDetails,
          tour_details: initialTourDetails,
        };

        if (projectType === 'FLIGHT') {
          return {
            ...newState,
            project_type: 'FLIGHT',
            hotel_details: null, // set to null if not used
            tour_details: null, // set to null if not used
          };
        } else if (projectType === 'HOTEL') {
          return {
            ...newState,
            project_type: 'HOTEL',
            flight_details: initialFlightDetails, // Flight should keep initial state if it's the wrapper
            tour_details: null,
          };
        } else if (projectType === 'TOUR') {
          return {
            ...newState,
            project_type: 'TOUR',
            flight_details: initialFlightDetails,
            hotel_details: null,
          };
        }

        // Default reset all specific details
        return { ...newState, project_type: '', ...resetDetails };
      }

      return newState;
    });
  }, []);

  /**
   * @description จัดการการเปลี่ยนแปลงของ Field ที่เป็น Sub-object (JSONB fields)
   */
  const handleJsonbChange = useCallback(
    (key: keyof BookingSchema, field: string, value: string | number | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key as keyof typeof prev] as object), // Cast to object for spread
          [field]: value,
        },
      }));
    },
    [],
  );

  /**
   * @description จัดการการเปลี่ยนแปลงของ Field ที่เป็น Array (e.g., Flight Segments)
   */
  const handleListChange = useCallback(
    (key: keyof BookingSchema, index: number, field: string, value: string) => {
      if (key === 'flight_details' && formData.flight_details) {
        const currentSegments = formData.flight_details.segments || [];
        const updatedSegments = currentSegments.map((segment, i) =>
          i === index ? { ...segment, [field]: value } : segment,
        );

        setFormData((prev) => ({
          ...prev,
          flight_details: { ...prev.flight_details, segments: updatedSegments },
        }));
      }
    },
    [formData.flight_details],
  );

  /**
   * @description จัดการการ Submit Form (เรียกใช้ Server Action)
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setResult(null); // Clear previous result

      if (!formData.pnr_code || !formData.project_id) {
        setResult({ success: false, error: 'กรุณาระบุ PNR Code และ Project ID' });
        return;
      }

      startTransition(async () => {
        const result = await saveBooking(formData);

        if (result.success) {
          setResult(result);

          if (result.pdf_base64 && result.pnr_code && result.project_id) {
            handleDownloadPdf(result.pdf_base64, result.pnr_code, result.project_id);
          }
        } else {
          setResult(result);
        }
      });
    },
    [formData, handleDownloadPdf],
  );

  // ----------------------------------------------------
  // 2.3. RENDER UTILITIES (Form Sections)
  // ----------------------------------------------------

  const renderFlightDetailsForm = useMemo(() => {
    const segments = formData.flight_details?.segments || [];
    if (!formData.flight_details) return null;

    return (
      <section className="section-group">
        <h2 className="text-xl font-semibold text-indigo-700">Flight Details (Segments)</h2>
        {segments.map((segment, index) => (
          <div key={index} className="mb-4 rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="mb-3 font-bold text-indigo-500">Segment {index + 1}</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Flight No."
                name="flight_no"
                value={segment.flight_no}
                onChange={(e) =>
                  handleListChange('flight_details', index, 'flight_no', e.target.value)
                }
              />
              <Input
                label="Airline Name"
                name="airline_name"
                value={segment.airline_name}
                onChange={(e) =>
                  handleListChange('flight_details', index, 'airline_name', e.target.value)
                }
              />
              <Input
                label="Route (e.g., BKK-HKT)"
                name="route"
                value={segment.route}
                onChange={(e) => handleListChange('flight_details', index, 'route', e.target.value)}
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={segment.date}
                onChange={(e) => handleListChange('flight_details', index, 'date', e.target.value)}
              />
            </div>
          </div>
        ))}
        {segments.length === 0 && <p className="text-sm text-gray-500">ไม่พบ Segment เที่ยวบิน</p>}
      </section>
    );
  }, [formData.flight_details, handleListChange]);

  const renderHotelDetailsForm = useMemo(() => {
    const hotel = formData.hotel_details;
    if (!hotel) return null;

    return (
      <section className="section-group">
        <h2 className="text-xl font-semibold text-indigo-700">Hotel Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Hotel Name"
            name="hotel_name"
            value={hotel.hotel_name || ''}
            onChange={(e) => handleJsonbChange('hotel_details', 'hotel_name', e.target.value)}
          />
          <Input
            label="Room Type"
            name="room_type"
            value={hotel.room_type || ''}
            onChange={(e) => handleJsonbChange('hotel_details', 'room_type', e.target.value)}
          />
          <Input
            label="Check-In Date"
            name="check_in_date"
            type="date"
            value={hotel.check_in_date || ''}
            onChange={(e) => handleJsonbChange('hotel_details', 'check_in_date', e.target.value)}
          />
          <Input
            label="Check-Out Date"
            name="check_out_date"
            type="date"
            value={hotel.check_out_date || ''}
            onChange={(e) => handleJsonbChange('hotel_details', 'check_out_date', e.target.value)}
          />
          <Input
            label="Number of Rooms"
            name="num_rooms"
            type="number"
            value={hotel.num_rooms ?? 1}
            onChange={(e) =>
              handleJsonbChange('hotel_details', 'num_rooms', parseInt(e.target.value))
            }
          />
        </div>
      </section>
    );
  }, [formData.hotel_details, handleJsonbChange]);

  const renderTourDetailsForm = useMemo(() => {
    const tour = formData.tour_details;
    if (!tour) return null;

    return (
      <section className="section-group">
        <h2 className="text-xl font-semibold text-indigo-700">Tour Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tour Name"
            name="tour_name"
            value={tour.tour_name || ''}
            onChange={(e) => handleJsonbChange('tour_details', 'tour_name', e.target.value)}
          />
          <Input
            label="Activity Date"
            name="activity_date"
            type="date"
            value={tour.activity_date || ''}
            onChange={(e) => handleJsonbChange('tour_details', 'activity_date', e.target.value)}
          />
          <Input
            label="Activity Time"
            name="activity_time"
            value={tour.activity_time || ''}
            onChange={(e) => handleJsonbChange('tour_details', 'activity_time', e.target.value)}
          />
          <Input
            label="Transfer Type"
            name="transfer_type"
            value={tour.transfer_type || ''}
            onChange={(e) => handleJsonbChange('tour_details', 'transfer_type', e.target.value)}
          />
        </div>
      </section>
    );
  }, [formData.tour_details, handleJsonbChange]);

  const renderTravellerDetailsForm = useMemo(() => {
    const details = formData.traveller_details;
    if (!details) return null;

    return (
      <section className="rounded-lg border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">2. Traveller/Contact Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Customer Nationality"
            name="customer_nationality"
            value={details.customer_nationality || ''}
            onChange={(e) =>
              handleJsonbChange('traveller_details', 'customer_nationality', e.target.value)
            }
          />
          <Input
            label="Total Passengers"
            name="total_passengers"
            value={details.total_passengers || ''}
            onChange={(e) =>
              handleJsonbChange('traveller_details', 'total_passengers', e.target.value)
            }
          />
          <Input
            label="Customer Email"
            name="customer_email"
            type="email"
            value={details.customer_email || ''}
            onChange={(e) =>
              handleJsonbChange('traveller_details', 'customer_email', e.target.value)
            }
          />
          <Input
            label="Customer Phone"
            name="customer_phone"
            value={details.customer_phone || ''}
            onChange={(e) =>
              handleJsonbChange('traveller_details', 'customer_phone', e.target.value)
            }
          />
          <Input
            label="Pick-up Location"
            name="pickup_location"
            value={details.pickup_location || ''}
            onChange={(e) =>
              handleJsonbChange('traveller_details', 'pickup_location', e.target.value)
            }
          />
        </div>
      </section>
    );
  }, [formData.traveller_details, handleJsonbChange]);

  // ----------------------------------------------------
  // 3. RENDER LOGIC
  // ----------------------------------------------------

  // Determine which project-specific form to render
  const projectType = formData.project_id.toUpperCase();
  const showFlight = projectType.includes('FLIGHT');
  const showHotel = projectType.includes('HOTEL');
  const showTour = projectType.includes('TOUR');
  const showSpecificForm = showFlight || showHotel || showTour;

  // Render Status Alert (for result feedback)
  const renderResultAlert = useMemo(() => {
    if (!result) return null;

    const alertStyle = result.success
      ? 'border-green-500 bg-green-100 text-green-700'
      : 'border-red-500 bg-red-100 text-red-700';

    return (
      <div className={`mb-6 rounded border-l-4 p-4 ${alertStyle}`}>
        <p className="font-medium">
          {result.message || result.error || 'ดำเนินการไม่สำเร็จ'}
          {result.success && result.pnr_code && (
            <span className="ml-2 font-bold">{result.pnr_code}</span>
          )}
        </p>
        {!result.success && result.error && <p className="mt-1 text-sm">{result.error}</p>}
      </div>
    );
  }, [result]);

  // ----------------------------------------------------
  // 4. JSX RETURN
  // ----------------------------------------------------

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 4.1. Result Alert */}
      {renderResultAlert}

      {/* 4.2. Main Booking Info */}
      <section className="rounded-lg border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">1. Booking Core Data</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="PNR Code"
            name="pnr_code"
            value={formData.pnr_code}
            onChange={handleChange}
            required
            placeholder="เช่น JPP1122"
          />

          <Select
            label="Project ID"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            required
          >
            <option value="">-- เลือก Project Type --</option>
            <option value="JP-FLIGHT">JP-FLIGHT</option>
            <option value="JP-HOTEL">JP-HOTEL</option>
            <option value="JP-TOUR">JP-TOUR</option>
            <option value="DEMO-FLIGHT">DEMO-FLIGHT</option>
          </Select>

          <Input
            label="Traveller Name (Main Contact)"
            name="traveller_name"
            value={formData.traveller_name}
            onChange={handleChange}
            required
          />

          <Select
            label="Booking Status"
            name="booking_status"
            value={formData.booking_status}
            onChange={handleChange}
            required
          >
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELLED">CANCELLED</option>
          </Select>
        </div>
      </section>

      {/* 4.3. Traveller Details (Sub-Object) */}
      {renderTravellerDetailsForm}

      {/* 4.4. Project-Specific Details (Conditional Rendering) */}
      {showSpecificForm && (
        <section className="rounded-lg border bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">
            3. Project Specific Data ({projectType})
          </h2>
          {showFlight && renderFlightDetailsForm}
          {showHotel && renderHotelDetailsForm}
          {showTour && renderTourDetailsForm}
        </section>
      )}

      {/* Fallback Message */}
      {!showSpecificForm && formData.project_id && (
        <section className="rounded-lg border border-yellow-300 bg-yellow-100 p-4">
          <p className="text-yellow-800">
            Project ID **{formData.project_id}** ไม่ต้องการรายละเอียดเฉพาะทาง
          </p>
        </section>
      )}
      {!formData.project_id && (
        <section className="rounded-lg border border-gray-300 bg-gray-100 p-4">
          <p className="text-gray-600">กรุณาเลือก Project ID เพื่อกรอกรายละเอียด</p>
        </section>
      )}

      {/* 4.9. Submission Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending || !formData.pnr_code || !formData.project_id}
          className={`w-full rounded-lg px-4 py-4 text-lg font-semibold text-white shadow-xl transition duration-200 ${
            isPending ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving & Generating PDF...
            </div>
          ) : (
            '💾 บันทึกและสร้าง PDF Document'
          )}
        </button>
      </div>
    </form>
  );
};

// ----------------------------------------------------
// 5. HELPER COMPONENTS (Placeholders)
// ----------------------------------------------------

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
    >
      {children}
    </select>
  </div>
);
