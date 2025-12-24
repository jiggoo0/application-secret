// 🚀 File: app/letter-service/components/DocumentForm.jsx (ฉบับภาษาไทย & แก้บั๊ก)
// 💡 UI Component: แบบฟอร์มกรอกข้อมูลหลัก (Thai Localized)

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// **********************************
// Helper Component: Generic Input Field
// **********************************
const FormField = ({ label, name, type = 'text', value, onChange, placeholder = '' }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          rows="3"
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// **********************************
// Main Component: DocumentForm
// **********************************
const DocumentForm = ({ initialData, onFieldChange }) => {
  // State ภายในสำหรับจัดการ Supporting Docs Array
  // 🚨 แก้บั๊ก: ป้องกัน initialData.supportingDocs เป็น undefined โดยการใส่ || []
  const [supportingDocs, setSupportingDocs] = useState(initialData.supportingDocs || []);

  const handleDocChange = (index, value) => {
    const newDocs = supportingDocs.map((doc, i) => (i === index ? value : doc));
    setSupportingDocs(newDocs);
    onFieldChange('supportingDocs', newDocs);
  };

  const addDocField = () => {
    const newDocs = [...supportingDocs, ''];
    setSupportingDocs(newDocs);
    onFieldChange('supportingDocs', newDocs);
  };

  const removeDocField = (index) => {
    const newDocs = supportingDocs.filter((_, i) => i !== index);
    setSupportingDocs(newDocs);
    onFieldChange('supportingDocs', newDocs);
  };

  const createChangeHandler = (name) => (value) => {
    onFieldChange(name, value);
  };

  return (
    <div className="space-y-6">
      {/* 1. Applicant Details - รายละเอียดผู้สมัคร */}
      <fieldset className="rounded-lg border border-blue-200 p-4">
        <legend className="px-2 text-lg font-semibold text-blue-700">ข้อมูลส่วนตัวและอาชีพ</legend>
        <FormField
          label="ชื่อ-นามสกุล (ตาม Passport)"
          name="applicantName"
          value={initialData.applicantName}
          onChange={createChangeHandler('applicantName')}
        />
        <FormField
          label="เลขที่หนังสือเดินทาง"
          name="passportNumber"
          value={initialData.passportNumber}
          onChange={createChangeHandler('passportNumber')}
        />
        <FormField
          label="ที่อยู่ปัจจุบัน"
          name="address"
          type="textarea"
          value={initialData.address}
          onChange={createChangeHandler('address')}
        />
        <FormField
          label="เบอร์โทรศัพท์"
          name="phone"
          value={initialData.phone}
          onChange={createChangeHandler('phone')}
        />
        <FormField
          label="อีเมล"
          name="email"
          type="email"
          value={initialData.email}
          onChange={createChangeHandler('email')}
        />
        <FormField
          label="ตำแหน่งงานปัจจุบัน"
          name="jobTitle"
          value={initialData.jobTitle}
          onChange={createChangeHandler('jobTitle')}
        />
        <FormField
          label="ชื่อบริษัท/หน่วยงาน"
          name="companyName"
          value={initialData.companyName}
          onChange={createChangeHandler('companyName')}
        />
      </fieldset>

      {/* 2. Travel Details - รายละเอียดการเดินทาง */}
      <fieldset className="rounded-lg border border-green-200 p-4">
        <legend className="px-2 text-lg font-semibold text-green-700">แผนการเดินทาง</legend>
        <FormField
          label="ประเภทวีซ่า (เช่น ท่องเที่ยว, ธุรกิจ)"
          name="visaType"
          value={initialData.visaType}
          onChange={createChangeHandler('visaType')}
        />
        <FormField
          label="ประเทศปลายทาง"
          name="destinationCountry"
          value={initialData.destinationCountry}
          onChange={createChangeHandler('destinationCountry')}
        />
        <FormField
          label="วันที่เดินทางเข้า"
          name="entryDate"
          type="date"
          value={initialData.entryDate}
          onChange={createChangeHandler('entryDate')}
        />
        <FormField
          label="วันที่เดินทางออก"
          name="departureDate"
          type="date"
          value={initialData.departureDate}
          onChange={createChangeHandler('departureDate')}
        />
        <FormField
          label="วัตถุประสงค์การเดินทาง"
          name="purpose"
          value={initialData.purpose}
          onChange={createChangeHandler('purpose')}
          placeholder="เช่น ท่องเที่ยวและพักผ่อน"
        />
        <FormField
          label="ชื่อที่พัก/โรงแรม"
          name="accommodationName"
          value={initialData.accommodationName}
          onChange={createChangeHandler('accommodationName')}
        />
      </fieldset>

      {/* 3. Financial & Ties - การเงินและข้อผูกพัน */}
      <fieldset className="rounded-lg border border-yellow-200 p-4">
        <legend className="px-2 text-lg font-semibold text-yellow-700">
          สถานะการเงินและข้อผูกพันในประเทศ
        </legend>
        <FormField
          label="แหล่งที่มาของเงินทุน"
          name="fundingSource"
          value={initialData.fundingSource}
          onChange={createChangeHandler('fundingSource')}
          placeholder="เช่น เงินเก็บส่วนตัว หรือ ชื่อผู้สนับสนุน"
        />
        <FormField
          label="รายละเอียดข้อผูกพันในไทย"
          name="returnTiesDescription"
          type="textarea"
          value={initialData.returnTiesDescription}
          onChange={createChangeHandler('returnTiesDescription')}
          placeholder="ระบุความผูกพันที่จะทำให้คุณเดินทางกลับ (เช่น ครอบครัว, สัญญาจ้างงานถาวร)"
        />
      </fieldset>

      {/* 4. Supporting Documents Checklist - รายการเอกสารแนบ */}
      <fieldset className="rounded-lg border border-red-200 p-4">
        <legend className="px-2 text-lg font-semibold text-red-700">รายการเอกสารแนบ</legend>
        {supportingDocs.map((doc, index) => (
          <div key={index} className="mb-3 flex items-center space-x-2">
            <input
              type="text"
              value={doc}
              onChange={(e) => handleDocChange(index, e.target.value)}
              placeholder={`เอกสารรายการที่ ${index + 1}`}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeDocField(index)}
              className="p-2 text-red-500 hover:text-red-700"
              title="ลบรายการเอกสารนี้"
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDocField}
          className="mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm text-white transition hover:bg-indigo-700"
        >
          + เพิ่มรายการเอกสาร
        </button>
      </fieldset>
    </div>
  );
};

DocumentForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default DocumentForm;
