// 🚀 File: app/letter-service/hooks/useCoverLetterGenerator.js
// 💡 Logic Hook: Data Transformation and Structuring

// 🚨 แก้ไข: ลบ useState และ useEffect ออก
import { useMemo } from 'react';

/**
 * Hook สำหรับแปลงข้อมูลจาก Form (Flat Structure)
 * ให้เป็นโครงสร้างข้อมูลที่ซับซ้อนสำหรับ Document Components
 * @param {object} formData - ข้อมูลดิบจาก Form
 * @returns {object} { documentData } - ข้อมูลที่จัดโครงสร้างแล้ว
 */
const useCoverLetterGenerator = (formData) => {
  // 💡 Memoization: ใช้ useMemo เพื่อป้องกันการคำนวณซ้ำซ้อน
  // และรักษาประสิทธิภาพเมื่อ formData ไม่มีการเปลี่ยนแปลง
  const documentData = useMemo(() => {
    // Helper function to format date
    const formatDate = (date) => {
      // ใช้มาตรฐาน ISO 8601 (YYYY-MM-DD)
      if (!date || isNaN(new Date(date))) {
        return 'Date not set';
      }
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    // 1. Applicant Data Structure
    const Applicant = {
      fullName: formData.applicantName || '',
      passportNumber: formData.passportNumber || '',
      address: formData.address || '',
      phone: formData.phone || '',
      email: formData.email || '',
      jobTitle: formData.jobTitle || '',
      companyName: formData.companyName || '',
    };

    // 2. Travel Data Structure
    const Travel = {
      visaType: formData.visaType || 'Visa Type',
      destinationCountry: formData.destinationCountry || 'Country Name',
      entryDate: formData.entryDate,
      departureDate: formData.departureDate,
      purpose: formData.purpose || 'tourism and leisure',
      accommodationName: formData.accommodationName || 'Local Hotel Name',
    };

    // 3. Recipient Data Structure
    const Recipient = {
      title: 'The Visa Officer',
      visaSection: `Visa Application Center, ${Travel.destinationCountry}`,
      embassyName: `Embassy/Consulate of ${Travel.destinationCountry}`,
      embassyAddress: '123 Embassy Street, City, Country', // ควรมาจาก Form หรือ API
      salutation: 'Dear Sir/Madam,',
    };

    // 4. Financial & Ties Data
    const Financial = {
      fundingSource: formData.fundingSource || 'Personal Savings',
    };

    const Ties = {
      returnTiesDescription:
        formData.returnTiesDescription || 'strong family and professional commitments in Thailand',
    };

    // 5. Checklist & Date
    const Checklist = formData.supportingDocs || [];
    const documentDate = formatDate(new Date()); // ใช้ Current Date เป็นวันที่ออกจดหมาย

    return {
      Applicant,
      Travel,
      Recipient,
      Financial,
      Ties,
      Checklist,
      documentDate,
    };
  }, [formData]); // 💡 Dependency Array: คำนวณใหม่เมื่อ formData เปลี่ยนเท่านั้น

  return { documentData };
};

export default useCoverLetterGenerator;
