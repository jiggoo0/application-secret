// components/FlightOrderForm.js (Final and Compiled Version)
'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

// 💡 Import Component UI (Shadcn UI assumed)
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import {
  Plane,
  Calendar,
  User,
  MapPin,
  MessageSquare,
  CheckCircle,
  Clock,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Bed,
  CheckSquare,
  Briefcase,
  Repeat2 as SwitchIcon,
  Code,
  Ticket,
} from 'lucide-react';

// Mock Constants
const LINE_OA_LINK = 'https://lin.ee/G8s8rKp';
const SERVICE_BRAND = 'JP-VISOUL-DOCS';
const SERVICE_PROVIDER = 'VISA SUPPORT SERVICE'; // ใช้แทนชื่อสายการบิน/เอเจนซี่

// 🚀 FIX: แยก SVG Data URI ออกมาเป็น Constant เพื่อแก้ไข Syntax Error (Line 198)
// 👇 แก้ ESLint Error: Strings must use singlequote โดยการละเว้นกฎ quotes
// eslint-disable-next-line quotes
const BARCODE_BG = `url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40"%3E%3Crect x="0" y="0" width="8" height="40" fill="%23ffffff" /%3E%3Crect x="12" y="0" width="4" height="40" fill="%23ffffff" /%3E%3Crect x="22" y="0" width="10" height="40" fill="%23ffffff" /%3E%3Crect x="36" y="0" width="3" height="40" fill="%23ffffff" /%3E%3Crect x="42" y="0" width="6" height="40" fill="%23ffffff" /%3E%3Crect x="50" y="0" width="12" height="40" fill="%23ffffff" /%3E%3Crect x="66" y="0" width="2" height="40" fill="%23ffffff" /%3E%3Crect x="70" y="0" width="14" height="40" fill="%23ffffff" /%3E%3Crect x="88" y="0" width="4" height="40" fill="%23ffffff" /%3E%3Crect x="94" y="0" width="8" height="40" fill="%23ffffff" /%3E%3Crect x="104" y="0" width="18" height="40" fill="%23ffffff" /%3E%3C/svg%3E)`;

// 🚀 FIX: แยก SVG Data URI ออกมาเป็น Constant เพื่อแก้ไข Syntax Error (Line 409)
// 👇 แก้ ESLint Error: Strings must use singlequote โดยการละเว้นกฎ quotes
// eslint-disable-next-line quotes
const SIGNATURE_BG = `url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"%3E%3Ctext x="50" y="15" font-family="Arial, sans-serif" font-size="16" fill="%231f2937" text-anchor="middle" font-style="italic"%3EHotel Management%3C/text%3E%3C/svg%3E)`;

/* =================================================================
   A. PREVIEW HELPER COMPONENTS (Refined for Realism)
================================================================= */

// 1. General Helpers
const DetailItem = ({ label, value, className = '' }) => (
  <div className={`rounded-lg border border-gray-200 bg-gray-50 p-3 ${className}`}>
    <span className="block text-xs font-semibold uppercase text-gray-500">{label}</span>
    <span className="mt-1 block text-base font-bold leading-tight text-gray-900">{value}</span>
  </div>
);

// Helper to format date for display
const formatDateDisplay = (dateString, locale = 'en-US') => {
  try {
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (error) {
    return 'Invalid Date';
  }
};

// 2. Flight Leg Component (Boarding Pass Style)
const FlightLeg = ({ flight, isOutbound, passengerName, bookingCode }) => {
  const direction = isOutbound ? 'Outbound' : 'Return';
  const directionIcon = isOutbound ? (
    <ArrowRight className="h-5 w-5 text-indigo-500" />
  ) : (
    <ArrowRight className="h-5 w-5 rotate-180 text-emerald-500" />
  );
  const dateDisplay = formatDateDisplay(flight.date, 'en-GB');

  // Mock Data based on flight object
  const pnr = bookingCode; // ใช้รหัสจองรวมเป็น PNR

  // 🚩 FIX: Hydration Mismatch Error (Math.random())
  const ticketPrefix = `${flight.flightNumber.replace(/\s/g, '')}-${isOutbound ? 'A' : 'B'}`;

  // Use useState with a function initializer to ensure Math.random() is only called on the client
  const [eTicketNumber] = useState(() => {
    const randomSuffix = Math.floor(Math.random() * 900) + 100;
    return `${ticketPrefix}${randomSuffix}`;
  });

  const cabinClass = flight.class || 'Economy';
  const departureTime = flight.departureTime || (isOutbound ? '11:00' : '23:45');
  const duration = flight.duration || (isOutbound ? '11h 25m' : '10h 30m');
  const timeZone = isOutbound ? 'BKK/UTC+7' : 'FRA/UTC+1';

  return (
    <div className="relative mx-auto mb-8 w-full max-w-3xl overflow-hidden rounded-3xl border-4 border-dashed border-gray-300 bg-white font-sans shadow-xl transition-all duration-300 hover:shadow-2xl print:border-solid">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-10">
        <div className="-rotate-45 transform whitespace-nowrap font-mono text-[120px] font-black tracking-wider text-gray-300">
          {SERVICE_BRAND} DRAFT
        </div>
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header: Airline & Ticket Type */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-wide text-gray-800">
              {SERVICE_PROVIDER}
            </span>
          </div>
          <span
            className={`${isOutbound ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'} rounded-full px-3 py-1 text-sm font-extrabold tracking-wider`}
          >
            {direction.toUpperCase()} FLIGHT
          </span>
        </div>

        {/* Route & Time Block */}
        <div className="grid grid-cols-5 items-center gap-4">
          {/* FROM */}
          <div className="col-span-2 text-center">
            <span className="block text-5xl font-extrabold tracking-tighter text-indigo-800">
              {flight.from}
            </span>
            <p className="mt-1 text-xs font-medium uppercase text-gray-500">
              {flight.fromAirport || 'City International Airport'} ({timeZone})
            </p>
          </div>

          {/* Separator */}
          <div className="col-span-1 flex flex-col items-center">
            {directionIcon}
            <p className="mt-1 text-xs text-gray-500">{duration}</p>
          </div>

          {/* TO */}
          <div className="col-span-2 text-center">
            <span className="block text-5xl font-extrabold tracking-tighter text-indigo-800">
              {flight.to}
            </span>
            <p className="mt-1 text-xs font-medium uppercase text-gray-500">
              {flight.toAirport || 'City International Airport'} ({timeZone})
            </p>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-dashed border-gray-300 pt-6 text-center md:grid-cols-5">
          <DetailItem label="Date" value={dateDisplay} />
          <DetailItem
            label="Departure"
            value={<span className="text-red-600">{departureTime}</span>}
          />
          <DetailItem label="Flight No." value={flight.flightNumber || 'TBC 000'} />
          <DetailItem label="Class" value={cabinClass} />
          <DetailItem label="PNR / Ref." value={pnr} className="bg-teal-50" />
        </div>

        {/* Boarding Info & Passenger */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t-2 border-dotted border-indigo-500 pt-6">
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-extrabold text-indigo-800">
              <User className="mr-2 h-4 w-4" /> PASSENGER DETAILS
            </h3>
            <DetailItem
              label="Passenger Name"
              value={
                <span className="text-xl font-extrabold text-indigo-900">
                  {passengerName.toUpperCase()}
                </span>
              }
              className="bg-indigo-50"
            />
          </div>
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-extrabold text-indigo-800">
              <Ticket className="mr-2 h-4 w-4" /> E-TICKET NUMBER
            </h3>
            <DetailItem
              label="E-Ticket"
              value={
                <span className="font-mono text-xl font-extrabold text-teal-600">
                  {eTicketNumber}
                </span>
              }
              className="bg-teal-50"
            />
          </div>
        </div>
      </div>

      {/* Barcode Strip */}
      <div className="flex items-center justify-between rounded-b-3xl bg-gray-800 p-2 font-mono text-xs tracking-widest text-white">
        <div
          className="flex h-8 w-full items-center justify-center bg-cover bg-repeat-x"
          // ✅ FIX: ใช้งาน Constant ที่แก้ไข Syntax Error แล้ว
          style={{
            backgroundImage: BARCODE_BG,
          }}
        >
          TICKET REF: {pnr || 'TBC000'}-{passengerName.substring(0, 3).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

// 3. Hotel Helpers
const DetailRow = ({ title, value, icon, className = '' }) => (
  <div
    className={`flex items-start border-b border-gray-100 px-4 py-3 last:border-b-0 ${className}`}
  >
    <span className="mr-3 mt-1 text-gray-500">{icon}</span>
    <div className="flex flex-grow flex-col">
      <span className="text-xs font-medium uppercase text-gray-500">{title}</span>
      <span className="mt-1 text-base font-extrabold leading-tight text-gray-900">{value}</span>
    </div>
  </div>
);

/* =================================================================
   B. PREVIEW DOCUMENT COMPONENTS (Presentation Layer - Enhanced)
================================================================= */

// 1. Flight Doc Preview
const FlightDocPreview = ({ passengerName, bookingCode, outbound, returnFlight }) => {
  const status = 'CONFIRMED AND GUARANTEED';
  const issuedDate = formatDateDisplay(new Date(), 'en-GB');

  return (
    <div className="relative flex-grow bg-gray-50 px-2 py-4 sm:px-4">
      <header className="mx-auto mb-10 max-w-3xl rounded-xl border-b-8 border-indigo-700 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
          <h1 className="flex items-center text-3xl font-black text-indigo-800">
            <Plane className="mr-3 h-8 w-8 text-teal-500" /> {SERVICE_BRAND} E-TICKET CONFIRMATION
          </h1>
          <div className="text-right">
            <p className="text-xs text-gray-500">Booking Reference (PNR):</p>
            <strong className="font-mono text-3xl tracking-widest text-indigo-700">
              {bookingCode}
            </strong>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
            <span className="text-lg font-bold uppercase text-emerald-700">{status}</span>
          </div>
          <p className="text-xs text-gray-400">Document Issued: {issuedDate}</p>
        </div>
      </header>

      <FlightLeg
        flight={outbound}
        isOutbound={true}
        passengerName={passengerName}
        bookingCode={bookingCode}
      />
      <FlightLeg
        flight={returnFlight}
        isOutbound={false}
        passengerName={passengerName}
        bookingCode={bookingCode}
      />

      <div className="mx-auto mt-8 w-full max-w-3xl border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
        <div className="mb-2 flex items-center justify-center text-base font-extrabold text-red-600">
          <AlertTriangle className="mr-2 h-4 w-4" /> DRAFT DOCUMENT - FOR VISA PURPOSES ONLY
        </div>
        <div className="text-xs text-gray-500">
          *This is a computer-generated confirmation by {SERVICE_BRAND}. The document contains a
          watermark and is not valid for real travel unless paid and officially issued.*
        </div>
      </div>
    </div>
  );
};

// 2. Hotel Doc Preview
const HotelDocPreview = ({
  hotelName,
  address,
  bookingRef,
  guestName,
  passport,
  checkin,
  checkout,
}) => {
  const status = 'CONFIRMED AND GUARANTEED';
  const totalPrice = '€ 700.00 EUR (VAT Included)';
  const paymentStatus = 'Payment Pending (ชำระ ณ ที่พัก / Pay at Hotel)';
  const cancellationPolicy = 'FREE CANCELLATION until 08 January 2026 (11:59 PM CET).';
  const nights = '7 Nights';
  const roomType = 'Standard Single Room, Non-Smoking, Breakfast Included';
  const issuedDate = formatDateDisplay(new Date(), 'en-GB');

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-3xl border-4 border-indigo-700 border-opacity-20 bg-white p-8 font-serif shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:p-10 print:rounded-none print:border-0 print:p-0 print:shadow-none">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-5 print:hidden">
        <div className="-rotate-45 transform select-none whitespace-nowrap font-sans text-[140px] font-black tracking-wider text-indigo-400">
          OFFICIAL DRAFT
        </div>
      </div>

      <div className="relative z-10">
        {/* Header Block: Hotel Identity */}
        <div className="mb-8 border-b-8 border-teal-500 pb-5">
          <h1 className="flex items-center text-4xl font-extrabold tracking-wider text-indigo-900">
            <Bed className="mr-3 h-9 w-9 text-teal-500" /> {hotelName}
          </h1>
          <p className="mt-2 flex items-center text-base font-medium text-gray-700">
            <MapPin className="mr-2 h-4 w-4 text-indigo-500" />
            {address}
          </p>
        </div>

        {/* Booking Status and Reference (Highlight Block - Cleaner Design) */}
        <Card className="mb-10 border-l-8 border-teal-500 bg-indigo-50 p-6 shadow-xl">
          <CardTitle className="flex items-center justify-between text-lg text-indigo-800">
            <span className="font-extrabold">BOOKING REFERENCE:</span>
            <strong className="font-mono text-3xl tracking-widest text-teal-600">
              {bookingRef}
            </strong>
          </CardTitle>
          <div className="mt-3 flex items-center border-t border-indigo-200 pt-3">
            <CheckSquare className="mr-3 h-6 w-6 text-green-600" />
            <span className="text-xl font-extrabold uppercase text-green-700">
              RESERVATION STATUS: {status}
            </span>
          </div>
        </Card>

        {/* Key Details Section */}
        <div className="mb-10 overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
          <h2 className="bg-indigo-700 p-4 text-xl font-extrabold tracking-wider text-white print:bg-gray-700">
            KEY RESERVATION DETAILS
          </h2>

          <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-4">
              <h3 className="mb-2 border-b pb-2 text-lg font-bold text-indigo-800">
                GUEST INFORMATION
              </h3>
              <DetailRow title="Full Name" value={guestName} icon={<User className="h-5 w-5" />} />
              <DetailRow
                title="Passport Number"
                value={passport}
                icon={<Code className="h-5 w-5" />}
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 border-b pb-2 text-lg font-bold text-indigo-800">
                STAY PERIOD & ROOM
              </h3>
              <DetailRow
                title="Check-in Date"
                value={formatDateDisplay(checkin, 'en-GB')}
                icon={<Calendar className="h-5 w-5 text-green-600" />}
                className="text-teal-600"
              />
              <DetailRow
                title="Check-out Date"
                value={formatDateDisplay(checkout, 'en-GB')}
                icon={<Calendar className="h-5 w-5 text-red-600" />}
                className="text-red-600"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <DetailRow title="Total Nights" value={nights} icon={<Clock className="h-5 w-5" />} />
            <DetailRow
              title="Room Type"
              value={roomType}
              icon={<Briefcase className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Finance and Policy */}
        <Card className="border-4 border-yellow-300 bg-yellow-50 p-6 shadow-md">
          <h2 className="mb-4 flex items-center text-xl font-bold text-yellow-800">
            <Briefcase className="mr-3 h-6 w-6" />
            FINANCIAL SUMMARY & POLICY
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-yellow-200 py-1 text-lg font-bold text-gray-800">
              <span>Total Estimated Price</span>
              <span className="text-indigo-800">{totalPrice}</span>
            </div>
            <div className="flex justify-between border-b border-yellow-200 py-1 font-semibold text-red-600">
              <span>Payment Status</span>
              <span className="font-extrabold">{paymentStatus}</span>
            </div>
            <div className="py-1 font-extrabold text-green-700">
              <span>Cancellation Policy: </span>
              <span className="font-normal text-gray-700">{cancellationPolicy}</span>
            </div>
          </div>
        </Card>

        {/* Footer Notes */}
        <div className="mt-8 border-t-2 border-gray-300 pt-5 text-center text-xs text-gray-600">
          <div
            className="mx-auto mb-2 h-10 w-48 border-b border-gray-400 bg-contain bg-center bg-no-repeat"
            // ✅ FIX: ใช้งาน Constant ที่แก้ไข Syntax Error แล้ว
            style={{
              backgroundImage: SIGNATURE_BG,
            }}
          >
            {/* [attachment_0](attachment) */}
          </div>
          <p className="text-xs text-gray-400">Authorized Digital Signature</p>
          <p className="mt-3 text-sm font-extrabold tracking-wide text-indigo-900">
            ** THIS CONFIRMATION IS VALID FOR SCHENGEN VISA APPLICATIONS AND IMMIGRATION
            CHECKPOINTS. **
          </p>
          <p className="mt-2 text-gray-500">
            Confirmation Issued By: {SERVICE_BRAND} | Document Generation Date: {issuedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =================================================================
   C. MAIN FORM COMPONENT: FlightOrderForm (Multi-mode Client Component - Final Version)
================================================================= */

const FlightOrderForm = ({ serviceTitle }) => {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || serviceTitle;

  // 1. Initial Mode Detection
  const serviceLower = service.toLowerCase();
  const isHotelModeInitial =
    serviceLower.includes('โรงแรม') && !serviceLower.includes('ตั๋วเครื่องบิน');
  const initialMode = isHotelModeInitial ? 'hotel' : 'flight';

  // State
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  // 2. Initial State (Memoized for stability)
  const initialHotelState = useMemo(
    () => ({
      fullName: 'MR. ANUCHA THONGDEE',
      passport: 'A1234567',
      checkinDate: '2026-01-15',
      checkoutDate: '2026-01-22',
      hotelName: 'Hotel Sandra Gove',
      bookingCode: 'SG-4592-DE-2026',
      address: 'Am Hauptbahnhof 10, 80335 München, Deutschland (Munich, Germany)',
      service: service,
    }),
    [service],
  );

  const initialFlightState = useMemo(
    () => ({
      fullName: 'MR. ANUCHA THONGDEE',
      bookingCode: 'RTZ7B5',
      departureDate: '2026-01-26',
      returnDate: '2026-02-10',
      fromCity: 'Bangkok',
      toCity: 'Frankfurt',
      fromAirport: 'Suvarnabhumi Airport (BKK)',
      toAirport: 'Frankfurt Airport (FRA)',
      service: service,
      class: 'Economy',
      flightNumberOut: 'LH 773',
      flightNumberReturn: 'LH 772',
      departureTimeOut: '09:00',
      departureTimeReturn: '14:30',
      durationOut: '11h 25m',
      durationReturn: '10h 30m',
    }),
    [service],
  );

  const [flightData, setFlightData] = useState(initialFlightState);
  const [hotelData, setHotelData] = useState(initialHotelState);

  // 3. Handlers
  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeSwitch = () => {
    setMode((prev) => (prev === 'flight' ? 'hotel' : 'flight'));
    toast.info(`Switched to ${mode === 'flight' ? 'Hotel Booking' : 'Flight Ticket'} mode.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = mode === 'flight' ? flightData : hotelData;

    // Simulate API call or document generation delay
    setTimeout(() => {
      setLoading(false);
      toast.success(`Document for ${data.fullName} in ${mode} mode is ready to download!`);
      // In a real app, this would trigger document generation/download
    }, 2000);
  };

  // 4. Form UI Components (Inline for simplicity)
  const FlightForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="col-span-full">
        <h3 className="mb-4 text-xl font-bold text-indigo-700">Passenger Details</h3>
        <Label htmlFor="fullName">Full Name (e.g., MR. JOHN SMITH)</Label>
        <Input
          id="fullName"
          name="fullName"
          value={flightData.fullName}
          onChange={handleFlightChange}
          required
        />
        <Label htmlFor="bookingCode" className="mt-3">
          Booking Reference (PNR)
        </Label>
        <Input
          id="bookingCode"
          name="bookingCode"
          value={flightData.bookingCode}
          onChange={handleFlightChange}
          required
        />
      </div>

      <h3 className="col-span-full mt-4 text-xl font-bold text-indigo-700">
        Trip Details (Round Trip)
      </h3>

      <div className="space-y-3">
        <Label htmlFor="fromCity">Departure City (IATA Code or Full Name)</Label>
        <Input
          id="fromCity"
          name="fromCity"
          value={flightData.fromCity}
          onChange={handleFlightChange}
          required
        />
        <Label htmlFor="departureDate">Departure Date</Label>
        <Input
          id="departureDate"
          name="departureDate"
          type="date"
          value={flightData.departureDate}
          onChange={handleFlightChange}
          required
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="toCity">Arrival City (IATA Code or Full Name)</Label>
        <Input
          id="toCity"
          name="toCity"
          value={flightData.toCity}
          onChange={handleFlightChange}
          required
        />
        <Label htmlFor="returnDate">Return Date</Label>
        <Input
          id="returnDate"
          name="returnDate"
          type="date"
          value={flightData.returnDate}
          onChange={handleFlightChange}
          required
        />
      </div>

      <div className="col-span-full mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 md:w-auto"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : 'Generate Flight Document'}
        </Button>
      </div>
    </form>
  );

  const HotelForm = () => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="col-span-full">
        <h3 className="mb-4 text-xl font-bold text-indigo-700">Guest Information</h3>
        <Label htmlFor="fullName">Guest Full Name (e.g., MR. ANUCHA THONGDEE)</Label>
        <Input
          id="fullName"
          name="fullName"
          value={hotelData.fullName}
          onChange={handleHotelChange}
          required
        />
        <Label htmlFor="passport" className="mt-3">
          Passport Number
        </Label>
        <Input
          id="passport"
          name="passport"
          value={hotelData.passport}
          onChange={handleHotelChange}
          required
        />
      </div>

      <h3 className="col-span-full mt-4 text-xl font-bold text-indigo-700">Hotel & Stay Details</h3>

      <div className="space-y-3">
        <Label htmlFor="hotelName">Hotel Name</Label>
        <Input
          id="hotelName"
          name="hotelName"
          value={hotelData.hotelName}
          onChange={handleHotelChange}
          required
        />
        <Label htmlFor="checkinDate">Check-in Date</Label>
        <Input
          id="checkinDate"
          name="checkinDate"
          type="date"
          value={hotelData.checkinDate}
          onChange={handleHotelChange}
          required
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="address">Hotel Address / City</Label>
        <Input
          id="address"
          name="address"
          value={hotelData.address}
          onChange={handleHotelChange}
          required
        />
        <Label htmlFor="checkoutDate">Check-out Date</Label>
        <Input
          id="checkoutDate"
          name="checkoutDate"
          type="date"
          value={hotelData.checkoutDate}
          onChange={handleHotelChange}
          required
        />
      </div>

      <div className="col-span-full">
        <Label htmlFor="bookingCode">Booking Reference (Confirmation Code)</Label>
        <Input
          id="bookingCode"
          name="bookingCode"
          value={hotelData.bookingCode}
          onChange={handleHotelChange}
          required
        />
      </div>

      <div className="col-span-full mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 md:w-auto"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Processing...' : 'Generate Hotel Document'}
        </Button>
      </div>
    </form>
  );

  return (
    <Card className="relative mx-auto w-full max-w-7xl shadow-2xl">
      <CardHeader className="flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-2xl font-extrabold text-gray-800">
          {mode === 'flight'
            ? '✈️ Flight Dummy Ticket Generator'
            : '🏨 Hotel Reservation Proof Generator'}
        </CardTitle>
        <Button
          onClick={handleModeSwitch}
          variant="outline"
          className="flex items-center border-indigo-200 text-indigo-600 hover:bg-indigo-50"
        >
          <SwitchIcon className="mr-2 h-4 w-4" />
          Switch to {mode === 'flight' ? 'Hotel Mode' : 'Flight Mode'}
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-8 p-4 md:p-8 xl:grid-cols-2">
        {/* === Column 1: Input Form === */}
        <div className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-700">
            Customize Document Data
          </h2>
          {mode === 'flight' ? <FlightForm /> : <HotelForm />}
        </div>

        {/* === Column 2: Live Preview === */}
        <div className="border-l pt-4 xl:col-start-2 xl:pl-8 xl:pt-0">
          <h2 className="mb-6 border-b pb-2 text-2xl font-bold text-gray-700">
            Live Document Preview
          </h2>
          <Alert className="mb-6 border-yellow-500 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>DRAFT/VISA USE ONLY</AlertTitle>
            <AlertDescription>
              เอกสารนี้เป็นตัวอย่าง (DRAFT) เพื่อใช้ในการยื่นวีซ่าเท่านั้น
              ไม่สามารถใช้เดินทางจริงได้
            </AlertDescription>
          </Alert>

          {/* Dynamic Preview Display */}
          {mode === 'flight' ? (
            <FlightDocPreview
              passengerName={flightData.fullName}
              bookingCode={flightData.bookingCode}
              outbound={{
                from: flightData.fromCity.substring(0, 3).toUpperCase(),
                to: flightData.toCity.substring(0, 3).toUpperCase(),
                date: flightData.departureDate,
                flightNumber: flightData.flightNumberOut,
                departureTime: flightData.departureTimeOut,
                fromAirport: flightData.fromAirport,
                toAirport: flightData.toAirport,
                class: flightData.class,
                duration: flightData.durationOut,
              }}
              returnFlight={{
                from: flightData.toCity.substring(0, 3).toUpperCase(),
                to: flightData.fromCity.substring(0, 3).toUpperCase(),
                date: flightData.returnDate,
                flightNumber: flightData.flightNumberReturn,
                departureTime: flightData.departureTimeReturn,
                fromAirport: flightData.toAirport, // Swap airports
                toAirport: flightData.fromAirport, // Swap airports
                class: flightData.class,
                duration: flightData.durationReturn,
              }}
            />
          ) : (
            <HotelDocPreview
              hotelName={hotelData.hotelName}
              address={hotelData.address}
              bookingRef={hotelData.bookingCode}
              guestName={hotelData.fullName}
              passport={hotelData.passport}
              checkin={hotelData.checkinDate}
              checkout={hotelData.checkoutDate}
            />
          )}
        </div>
      </CardContent>

      <div className="sticky bottom-0 flex justify-end border-t bg-white p-4 shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)]">
        <a
          href={LINE_OA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-600 hover:text-indigo-600"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Have questions? Chat with {SERVICE_BRAND} on LINE OA.
        </a>
      </div>
    </Card>
  );
};

export default FlightOrderForm;
