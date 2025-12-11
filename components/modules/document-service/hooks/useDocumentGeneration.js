// components/modules/document-service/hooks/useDocumentGeneration.js
'use client';

// ✅ FIX: เพิ่ม useEffect เข้ามาในรายการ Import เพื่อแก้ไข ReferenceError
import { useState, useCallback, useMemo, useEffect } from 'react';
// Note: useToast, useDocumentControlsLogic ถูกถอดออกอย่างถูกต้องตามคำสั่ง Draft Previewer

// ------------------------------
// Initial Data (คงเดิม)
// ------------------------------
const initialFormData = {
  applicantName: 'Mr. Pranee Srisai',
  passportNumber: 'L887766',
  address: '123/4 Rama 9 Road, Suan Luang, Bangkok, 10250',
  phone: '+66 81 234 5678',
  email: 'pranee.srisai@email.com',
  visaType: 'Tourist (Schengen C-Type)',
  destinationCountry: 'Germany',
  durationDays: 14,
  entryDate: new Date(new Date().getFullYear() + 1, 1, 1).toISOString().split('T')[0],
  departureDate: new Date(new Date().getFullYear() + 1, 1, 14).toISOString().split('T')[0],
  purpose: 'Tourism and personal vacation',
  fundingSource: 'Personal Savings (Self-funded)',
};

// ------------------------------
// Main Hook: Optimized for Real-time Draft Preview
// ------------------------------
export const useDocumentGeneration = () => {
  // Primary States (เหลือเฉพาะที่จำเป็นต่อการกรอกฟอร์มและการ Preview)
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataSynced, setIsDataSynced] = useState(true);

  // ----------------------------
  // Real-time Preview Calculation (ใช้ useMemo เพื่อให้ Synchronous)
  // ----------------------------
  const previewData = useMemo(() => {
    // Helper function สำหรับการจัดการ Placeholder
    const getPlaceholder = (field, prefix = '') => {
      const value = formData[field];
      // ตรวจสอบค่าว่าง/null/undefined
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        return `[กรุณากรอก${field}]`;
      }
      return `${prefix}${value}`;
    };

    // 🟢 สร้างโครงสร้างข้อมูลที่ CoverLetterDocument ต้องการจาก formData
    return {
      title: `จดหมายสำหรับ: ${getPlaceholder('applicantName')}`,
      applicantName: getPlaceholder('applicantName'),
      passportNumber: getPlaceholder('passportNumber', 'Passport No: '),
      address: getPlaceholder('address'),
      phone: getPlaceholder('phone'),
      email: getPlaceholder('email'),
      visaType: getPlaceholder('visaType'),
      destinationCountry: getPlaceholder('destinationCountry', 'Destination: '),
      // จัดการ DurationDays แยก เนื่องจากเป็นตัวเลข
      durationDays: formData.durationDays > 0 ? formData.durationDays : '[จำนวนวัน]',
      entryDate: getPlaceholder('entryDate'),
      departureDate: getPlaceholder('departureDate'),
      purpose: getPlaceholder('purpose'),
      fundingSource: getPlaceholder('fundingSource'),
    };
  }, [formData]); // คำนวณใหม่เมื่อ formData เปลี่ยน

  // ----------------------------
  // Handlers
  // ----------------------------

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, name)) return prev;

      let newValue = value;

      // จัดการค่าตัวเลข
      if (type === 'number' || name === 'durationDays') {
        newValue = Number(value) || 0;
      }

      return { ...prev, [name]: newValue };
    });

    // Mark as unsynced เพื่อแสดงสถานะ 'ข้อมูลยังไม่อัปเดต' ในรอบ Render ถัดไป
    setIsDataSynced(false);
  }, []);

  // ----------------------------
  // Status Synchronization Effect (แก้ไข ReferenceError และคง Logic เดิม)
  // ----------------------------
  useEffect(() => {
    // Sets back to true after useMemo calculates the new previewData in the current render cycle.
    setIsDataSynced(true);
  }, [previewData]);

  // ----------------------------
  // Return Values
  // ----------------------------
  return {
    // Data
    formData,
    previewData,

    // Status
    isLoading,
    isDataSynced,

    // Handlers
    handleChange,
  };
};
