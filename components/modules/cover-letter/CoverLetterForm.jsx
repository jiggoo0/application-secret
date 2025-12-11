// components/modules/cover-letter/CoverLetterForm.jsx
'use client';

import React from 'react';
import {
  Mail,
  FileText,
  Send,
  User,
  MapPin,
  Calendar,
  Briefcase,
  ChevronRight,
  ClipboardCheck,
  AlertTriangle,
} from 'lucide-react';
import InputGroup from '@/components/ui/InputGroup';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

/**
 * @param {object} props
 * @param {function} props.onGenerate
 * @param {function} props.onChange
 * @param {object} props.formData
 * @param {boolean} props.isLoading
 * @param {boolean} props.isGenerated
 * @param {string | null} props.error
 */
export default function CoverLetterForm({
  onGenerate,
  onChange,
  formData,
  isLoading,
  isGenerated,
  error,
}) {
  return (
    <div
      className="hover:shadow-3xl rounded-xl border-t-8 border-red-500 bg-white p-8 shadow-2xl transition duration-300"
      id="cover-letter-form"
    >
      <h2 className="mb-6 flex items-center border-b-2 pb-3 text-2xl font-bold text-gray-800">
        <FileText className="mr-3 h-6 w-6 text-red-500" />
        กรอกข้อมูลสำหรับจดหมายแนะนำตัว
      </h2>

      <form onSubmit={onGenerate} className="space-y-6">
        {/* === ข้อมูลผู้ยื่นคำร้อง === */}
        <fieldset className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <legend className="px-3 text-lg font-bold text-blue-700">1. ข้อมูลผู้ยื่นคำร้อง</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="ชื่อ-นามสกุล (ตาม Passport) *"
              name="applicantName"
              value={formData.applicantName}
              onChange={onChange}
              type="text"
              icon={User}
              required
            />
            <InputGroup
              label="หมายเลข Passport *"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={onChange}
              type="text"
              icon={ClipboardCheck}
              required
            />
          </div>
          <InputGroup
            label="ที่อยู่ปัจจุบัน"
            name="address"
            value={formData.address}
            onChange={onChange}
            type="text"
            icon={MapPin}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="เบอร์โทรศัพท์"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              type="tel"
              icon={Send}
            />
            <InputGroup
              label="อีเมล"
              name="email"
              value={formData.email}
              onChange={onChange}
              type="email"
              icon={Mail}
            />
          </div>
        </fieldset>

        {/* === ข้อมูลการเดินทาง === */}
        <fieldset className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <legend className="px-3 text-lg font-bold text-blue-700">2. แผนการเดินทาง</legend>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="ประเทศปลายทาง *"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={onChange}
              type="text"
              icon={MapPin}
              required
            />
            <InputGroup
              label="ประเภทวีซ่าที่ขอ (เช่น Tourist)"
              name="visaType"
              value={formData.visaType}
              onChange={onChange}
              type="text"
              icon={Briefcase}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="purpose" className="mb-1 block text-sm font-medium text-gray-700">
              วัตถุประสงค์ของการเดินทางโดยละเอียด
            </label>
            <Textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={onChange}
              rows={3}
              placeholder="เช่น การเดินทางเพื่อท่องเที่ยวชมสถานที่สำคัญ..."
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <InputGroup
              label="วันเข้าประเทศ *"
              name="entryDate"
              value={formData.entryDate}
              onChange={onChange}
              type="date"
              icon={Calendar}
              required
            />
            <InputGroup
              label="จำนวนวันพัก (คืน) *"
              name="durationDays"
              value={String(formData.durationDays)}
              onChange={onChange}
              type="number"
              icon={Calendar}
              min={1}
            />
            <InputGroup
              label="วันออกจากประเทศ"
              name="departureDate"
              value={formData.departureDate}
              onChange={onChange}
              type="date"
              icon={Calendar}
              disabled
            />
          </div>
          <p className="mt-2 flex items-center text-xs text-gray-500">
            <ChevronRight className="mr-1 h-3 w-3" />
            วันที่ออกจะคำนวณอัตโนมัติจากวันเข้าและจำนวนวันพัก
          </p>

          <InputGroup
            label="แหล่งที่มาของเงินทุน"
            name="fundingSource"
            value={formData.fundingSource}
            onChange={onChange}
            type="text"
            icon={Briefcase}
          />
        </fieldset>

        {/* === Error State === */}
        {error && (
          <div className="rounded-lg border border-red-400 bg-red-50 p-3 text-sm font-medium text-red-700 shadow-sm">
            <AlertTriangle className="mr-2 inline h-4 w-4" />
            **ข้อผิดพลาด:** {error}
          </div>
        )}

        {/* === Submit Button === */}
        <Button
          type="submit"
          className="mt-8 flex w-full items-center justify-center px-4 py-4 text-lg font-bold transition duration-300"
          disabled={isLoading}
          variant={isGenerated ? 'secondary' : 'default'}
        >
          {isLoading && <Send className="mr-3 h-6 w-6 animate-pulse" />}
          {!isLoading && <Send className="mr-3 h-6 w-6" />}
          {isLoading
            ? 'กำลังประมวลผลเอกสาร...'
            : isGenerated
              ? 'อัปเดตเอกสาร (Preview ใหม่)'
              : 'สร้างเอกสาร (Preview)'}
        </Button>
      </form>
    </div>
  );
}
