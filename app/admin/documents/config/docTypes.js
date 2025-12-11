// 🚀 File: app/admin/documents/config/docTypes.js (Full Code ที่ปรับปรุง)

// --- Forms ---
import MedicalCertificateForm from '@/components/documents/forms/MedicalCertificateForm';
import SalaryCertificateForm from '@/components/documents/forms/SalaryCertificateForm';
import CommercialRegistrationForm from '@/components/documents/forms/CommercialRegistrationForm';
import CoverLetterForm from '@/components/modules/cover-letter/CoverLetterForm';
// 🟢 NEW: Import Form สำหรับ Visa
import VisaGuaranteeForm from '@/components/documents/forms/VisaGuaranteeForm';

// --- TEMPLATE LAYOUTS (Wrapper Components) ---
import MedicalCertificateLayout from '@/components/documents/templates/layouts/MedicalCertificateLayout';
import SalaryCertificateLayout from '@/components/documents/templates/layouts/SalaryCertificateLayout';
import CommercialRegistrationLayout from '@/components/documents/templates/layouts/CommercialRegistrationLayout';
import CoverLetterAdminLayout from '../components/CoverLetterAdminLayout';
// 🟢 NEW: Import Layout สำหรับ Visa
import VisaGuaranteeAdminLayout from '@/components/documents/templates/layouts/VisaGuaranteeAdminLayout';

// ----------------------------------------------------
// Data Definition (จุดที่กำหนดเอกสารทั้งหมด)
// ----------------------------------------------------

export const DOC_TYPES = {
  medical: {
    name: 'ใบรับรองแพทย์ (Medical Certificate)',
    key: 'medical',
    Form: MedicalCertificateForm,
    Template: MedicalCertificateLayout,
    initialData: {
      patientName: 'นายสมชาย สุขเกษม',
      idNumber: '1100100200300',
      issueDate: new Date().toISOString().split('T')[0],
      reason: 'ป่วยเป็นไข้หวัด',
      daysOff: 3,
      doctorName: 'พญ. ชลิตา กิตติพงศ์',
    },
    fileName: (data) => `Medical-Cert-${data.patientName || 'Default'}`,
  },

  salary: {
    name: 'ใบรับรองเงินเดือน (Salary Certificate)',
    key: 'salary',
    Form: SalaryCertificateForm,
    Template: SalaryCertificateLayout,
    initialData: {
      employeeName: 'นางสาวจิราพร มั่นคง',
      position: 'วิศวกรซอฟต์แวร์',
      monthlySalary: 55000,
      startDate: '2020-08-01',
      purpose: 'ยื่นขอสินเชื่อที่อยู่อาศัย',
      managerName: 'นายธนากรณ์ วงศ์สวัสดิ์',
      issueDate: new Date().toISOString().split('T')[0],
    },
    fileName: (data) => `Salary-Cert-${data.employeeName || 'Default'}`,
  },

  commercial: {
    name: 'ใบทะเบียนพาณิชย์ (Commercial Registration)',
    key: 'commercial',
    Form: CommercialRegistrationForm,
    Template: CommercialRegistrationLayout,
    initialData: {
      companyName: 'บริษัท พัฒนาแอปพลิเคชัน จำกัด',
      registrationNumber: '0105560001234',
      registeredDate: '2017-05-20',
      capital: 5000000,
      businessType: 'การบริการด้านซอฟต์แวร์',
      address: '99/99 อาคารซอฟต์แวร์ปาร์ค ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง กรุงเทพมหานคร 10210',
      issueDate: '2017-05-20',
    },
    fileName: (data) => `Commercial-Reg-${data.companyName || 'Default'}`,
  },

  coverLetter: {
    name: 'จดหมายนำ (Expert Service)',
    key: 'coverLetter',
    Form: CoverLetterForm,
    Template: CoverLetterAdminLayout,
    initialData: {
      employeeName: 'นายบรรณสาร กิตติพงศ์ (ผู้เขียน)',
      managerName: 'นายเจ้าป่า ผู้เชี่ยวชาญ',
      managerPosition: 'ที่ปรึกษาด้านเอกสารอาวุโส',
      recipientTitle: 'ผู้จัดการฝ่ายบุคคล',
      recipientCompany: 'บริษัทเทคโนโลยี จำกัด',
      subject: 'จดหมายรับรองสำหรับโครงการ XYZ',
      bodyContent:
        'เรียน ท่านผู้จัดการ,\n\nตามที่ท่านได้ติดต่อสอบถามเกี่ยวกับโครงการ XYZ ทางเราในฐานะผู้เชี่ยวชาญขอรับรองว่า...',
      issueDate: new Date().toISOString().split('T')[0],
    },
    fileName: (data) => `Expert-Letter-${data.managerName || 'Default'}-${data.issueDate}`,
  },

  // 🟢 NEW: เพิ่มเอกสารรับรองวีซ่า (Standard International VISA Letter)
  visaGuarantee: {
    name: 'จดหมายรับรองวีซ่า (VISA Guarantee Letter)',
    key: 'visaGuarantee',
    Form: VisaGuaranteeForm,
    Template: VisaGuaranteeAdminLayout,
    initialData: {
      applicantName: 'นายบรรณสาร กิตติพงศ์',
      passportNumber: 'AB1234567',
      address: '99/99 อาคารซอฟต์แวร์ปาร์ค ถนนแจ้งวัฒนะ กรุงเทพมหานคร 10210',
      phone: '+66987654321',
      email: 'applicant.name@example.com',
      visaType: 'Tourist Visa',
      destinationCountry: 'Schengen Area',
      durationDays: 14,
      entryDate: '2026-03-01',
      departureDate: '2026-03-14',
      purpose: 'Tourism and leisure activities in the area.',
      fundingSource: 'Personal Savings',
      managerName: 'นายเจ้าป่า ผู้รับรอง', // Expert/Manager
      // 💡 issueDate จะถูกใช้เป็นวันที่รับรอง (Format ใน Content)
      issueDate: new Date().toISOString().split('T')[0],
    },
    fileName: (data) => `Visa-Guarantee-${data.applicantName || 'Default'}`,
  },
};

// 💡 ตั้งค่าเริ่มต้นเป็น Visa Guarantee เพื่อให้ Admin สามารถทดสอบ Feature ใหม่ได้ทันที
export const DEFAULT_DOC_TYPE_KEY = 'visaGuarantee';
