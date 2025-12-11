// 🚀 File: components/documents/forms/VisaGuaranteeForm.jsx (VISA FIELDS)
'use client';

import React from 'react';
import PropTypes from 'prop-types';

const VisaGuaranteeForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-6">
      {/* 1. Applicant Details */}
      <div className="border-l-4 border-primary pl-3">
        <h4 className="text-lg font-semibold text-gray-800">รายละเอียดผู้สมัคร (Applicant)</h4>

        <div className="space-y-4">
          <div>
            <label htmlFor="applicantName" className="mb-1 block text-sm font-medium text-gray-700">
              ชื่อ-นามสกุลผู้สมัคร
            </label>
            <input
              type="text"
              id="applicantName"
              name="applicantName"
              value={data.applicantName || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="passportNumber"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              หมายเลขหนังสือเดินทาง (Passport No.)
            </label>
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              value={data.passportNumber || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="visaType" className="mb-1 block text-sm font-medium text-gray-700">
              ประเภทวีซ่าที่สมัคร
            </label>
            <input
              type="text"
              id="visaType"
              name="visaType"
              value={data.visaType || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="เช่น Tourist Visa / Business Visa"
              required
            />
          </div>
          {/* เพิ่มชื่อผู้รับรอง ถ้า Expert/Manager เป็นคนเขียน */}
          <div>
            <label htmlFor="managerName" className="mb-1 block text-sm font-medium text-gray-700">
              ชื่อผู้รับรอง (Expert/Manager)
            </label>
            <input
              type="text"
              id="managerName"
              name="managerName"
              value={data.managerName || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Travel Details */}
      <div className="border-l-4 border-green-500 pl-3">
        <h4 className="text-lg font-semibold text-gray-800">แผนการเดินทาง (Itinerary)</h4>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="destinationCountry"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ประเทศปลายทาง
            </label>
            <input
              type="text"
              id="destinationCountry"
              name="destinationCountry"
              value={data.destinationCountry || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="entryDate" className="mb-1 block text-sm font-medium text-gray-700">
                วันที่เดินทางเข้า
              </label>
              <input
                type="date"
                id="entryDate"
                name="entryDate"
                value={data.entryDate || ''}
                onChange={handleDateChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="departureDate"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                วันที่เดินทางออก
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={data.departureDate || ''}
                onChange={handleDateChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="durationDays" className="mb-1 block text-sm font-medium text-gray-700">
              จำนวนวัน (Duration Days)
            </label>
            <input
              type="number"
              id="durationDays"
              name="durationDays"
              value={data.durationDays || 0}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="purpose" className="mb-1 block text-sm font-medium text-gray-700">
              วัตถุประสงค์การเดินทาง
            </label>
            <textarea
              id="purpose"
              name="purpose"
              rows="2"
              value={data.purpose || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
              placeholder="Tourism and leisure"
            />
          </div>
          <div>
            <label htmlFor="fundingSource" className="mb-1 block text-sm font-medium text-gray-700">
              แหล่งเงินทุนสนับสนุน (Guarantee)
            </label>
            <input
              type="text"
              id="fundingSource"
              name="fundingSource"
              value={data.fundingSource || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
              placeholder="Personal Savings"
              required
            />
          </div>
        </div>
      </div>

      {/* 3. Contact Details */}
      <div className="border-l-4 border-yellow-500 pl-3">
        <h4 className="text-lg font-semibold text-gray-800">ข้อมูลติดต่อ (Contact Block)</h4>

        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
              ที่อยู่ (Address)
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={data.address || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              โทรศัพท์ (Phone)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={data.phone || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              อีเมล (Email)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

VisaGuaranteeForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VisaGuaranteeForm;
