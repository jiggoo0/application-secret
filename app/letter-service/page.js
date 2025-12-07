'use client';

import React, { useState, useMemo, useCallback } from 'react';

import { Mail, FileText, Send, User, MapPin, Calendar, Briefcase, ChevronRight, MessageSquare } from 'lucide-react';

import InputGroup from '@/components/ui/InputGroup'; 
import CoverLetterDocument from './CoverLetterDocument'; 


// eslint-disable-next-line quotes
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
  purpose: 'Leisure travel and sightseeing',
  fundingSource: 'Personal savings and income (ระบุว่าออกค่าใช้จ่ายเอง)',
};


export default function LetterServicePage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLetterGenerated, setIsLetterGenerated] = useState(false);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'durationDays' ? parseInt(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  useMemo(() => {
    const entry = new Date(formData.entryDate);
    if (!isNaN(entry.getTime()) && formData.durationDays > 0) {
      const departure = new Date(entry);
      departure.setDate(entry.getDate() + formData.durationDays); 
      setFormData(prev => ({ 
        ...prev, 
        departureDate: departure.toISOString().split('T')[0] 
      }));
    }
  }, [formData.entryDate, formData.durationDays]);
  
  
  const handleContactForService = useCallback(() => {
    if (!isLetterGenerated) {
        alert('กรุณากด \'สร้างเอกสาร (Preview)\' ก่อนเพื่อตรวจสอบความถูกต้องของเนื้อหา');
        return;
    }
    
    const lineUrl = 'https://lin.ee/G8s8rKp';
    window.open(lineUrl, '_blank');
    
    alert('คุณจะถูกนำไปยังช่องทางการติดต่อเพื่อซื้อเอกสารฉบับสมบูรณ์ที่ไม่มีลายน้ำ');
  }, [isLetterGenerated]);


  const handleGenerateLetter = (e) => {
    e.preventDefault();
    setIsLetterGenerated(true);
    setTimeout(() => {
        document.getElementById('letter-preview-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  return (
    <div className='bg-gray-50 font-sans'> 
      <div className='py-12 px-4'> 
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-10 p-4 bg-white rounded-xl shadow-lg'>
            <Mail className='w-12 h-12 text-blue-600 mx-auto mb-3' />
            <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>
              บริการเขียนจดหมายแนะนำตัวยื่นวีซ่า (Cover Letter)
            </h1>
            <p className='text-xl text-gray-600'>
              เอกสารสำคัญที่ช่วยเสริมความแข็งแกร่งให้กับคำร้องขอวีซ่าของคุณ
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            
            <div className='lg:col-span-2 space-y-4'>
                <div className='bg-white p-8 rounded-xl shadow-2xl border-t-8 border-red-500' id='cover-letter-form'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 flex items-center'>
                        <FileText className='w-6 h-6 mr-3 text-red-500' />
                        กรอกข้อมูลสำหรับจดหมายแนะนำตัว
                    </h2>
                
                    <form onSubmit={handleGenerateLetter} className='space-y-6'>
                        
                        <fieldset className='p-5 border border-gray-200 rounded-lg bg-gray-50'>
                            <legend className='px-3 text-lg font-bold text-blue-700'>ข้อมูลผู้ยื่นคำร้อง (Applicant Details)</legend>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <InputGroup label='ชื่อ-นามสกุล (ตาม Passport)' name='applicantName' value={formData.applicantName} onChange={handleChange} type='text' icon={User} />
                                <InputGroup label='หมายเลข Passport' name='passportNumber' value={formData.passportNumber} onChange={handleChange} type='text' icon={User} />
                            </div>
                            <InputGroup label='ที่อยู่ปัจจุบัน' name='address' value={formData.address} onChange={handleChange} type='text' icon={MapPin} />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <InputGroup label='เบอร์โทรศัพท์' name='phone' value={formData.phone} onChange={handleChange} type='tel' icon={Send} />
                                <InputGroup label='อีเมล' name='email' value={formData.email} onChange={handleChange} type='email' icon={Mail} />
                            </div>
                        </fieldset>

                        <fieldset className='p-5 border border-gray-200 rounded-lg bg-gray-50'>
                            <legend className='px-3 text-lg font-bold text-blue-700'>ข้อมูลการเดินทาง (Travel Plan)</legend>
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                <InputGroup label='ประเทศปลายทาง' name='destinationCountry' value={formData.destinationCountry} onChange={handleChange} type='text' icon={MapPin} />
                                <InputGroup label='ประเภทวีซ่าที่ขอ (เช่น Tourist)' name='visaType' value={formData.visaType} onChange={handleChange} type='text' icon={Briefcase} />
                            </div>

                            <InputGroup label='วัตถุประสงค์ของการเดินทางโดยละเอียด' name='purpose' value={formData.purpose} onChange={handleChange} type='text' icon={Briefcase} />
                            
                            <div className='grid grid-cols-3 gap-4'>
                                <InputGroup label='วันเข้าประเทศ (Entry Date)' name='entryDate' value={formData.entryDate} onChange={handleChange} type='date' icon={Calendar} />
                                <InputGroup label='จำนวนวันที่ต้องการพัก (Nights)' name='durationDays' value={String(formData.durationDays)} onChange={handleChange} type='number' icon={Calendar} min={1} />
                                <InputGroup label='วันออกจากประเทศ (Departure Date)' name='departureDate' value={formData.departureDate} onChange={handleChange} type='date' icon={Calendar} disabled />
                            </div>
                            <div className='mt-2 text-xs text-gray-500 flex items-center'>
                                <ChevronRight className='w-3 h-3 mr-1'/> วันที่ออกจากประเทศจะคำนวณจากวันเข้าประเทศและจำนวนวันพักโดยอัตโนมัติ
                            </div>

                            <InputGroup label='แหล่งที่มาของเงินทุน' name='fundingSource' value={formData.fundingSource} onChange={handleChange} type='text' icon={Briefcase} />

                        </fieldset>
                        
                        <button
                            type='submit'
                            className='w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition duration-200 shadow-xl text-lg mt-8 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-300'
                        >
                            <Send className='w-6 h-6 mr-3' />
                            {isLetterGenerated ? 'อัปเดตเอกสาร (Preview)' : 'สร้างเอกสาร (Preview)'}
                        </button>
                    </form>
                </div>
                
                {isLetterGenerated && (
                    <div id='letter-preview-section' className='bg-white p-8 rounded-xl shadow-2xl border-t-8 border-green-500'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 flex items-center'>
                            <FileText className='w-6 h-6 mr-3 text-green-500' />
                            ตัวอย่างจดหมายแนะนำตัว (Cover Letter Preview)
                        </h2>
                        
                        <div className='mb-4'>
                            <button
                                onClick={handleContactForService}
                                className='flex items-center justify-center font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md bg-green-600 hover:bg-green-700 text-white'
                            >
                                <MessageSquare className='w-5 h-5 mr-2' />
                                ติดต่อเพื่อรับฉบับสมบูรณ์ (LINE)
                            </button>
                        </div>

                        <div className='border border-gray-400 p-4 overflow-y-scroll max-h-[600px] bg-gray-50'>
                             <CoverLetterDocument data={formData} isDraft={true} />
                        </div>
                    </div>
                )}
            </div>


            <div className='lg:col-span-1 space-y-8'>
                
                <div className='bg-white p-6 rounded-xl shadow-lg border border-green-200 sticky top-24'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center'>
                        <FileText className='w-5 h-5 mr-2 text-green-500'/>
                        ทำไมต้องมี Cover Letter?
                    </h2>
                    <ul className='list-disc pl-5 space-y-3 text-gray-700 text-base'>
                        <li>
                            **ความชัดเจน:** อธิบายวัตถุประสงค์ของการเดินทางอย่างเป็นทางการ
                        </li>
                        <li>
                            **ความน่าเชื่อถือ:** แสดงความรับผิดชอบและแผนการเดินทางที่รัดกุม
                        </li>
                        <li>
                            **การอ้างอิง:** ใช้จดหมายนี้อ้างอิงถึงเอกสารประกอบอื่น ๆ ทั้งหมด
                        </li>
                        <li>
                            **ข้อกำหนดสำคัญ:** สถานทูตส่วนใหญ่ถือว่า Cover Letter เป็นเอกสารสำคัญมาก
                        </li>
                    </ul>
                </div>

                <div className='p-6 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-md'>
                    <p className='font-bold text-red-800 mb-2'>คำแนะนำสำคัญ</p>
                    <p className='text-sm text-red-700'>
                        จดหมายแนะนำตัวที่ดีควรระบุชื่อเอกสารที่แนบมาทั้งหมดอย่างครบถ้วน (Checklist) เพื่อให้เจ้าหน้าที่สามารถตรวจสอบได้ง่ายและรวดเร็ว
                    </p>
                </div>

            </div>
          </div>
        </div>
      </div> 

      <div 
        id='cover-letter-content-hidden' 
        className='fixed top-0 left-0 w-full h-full opacity-0 pointer-events-none -z-10'
      >
          <CoverLetterDocument data={formData} isDraft={true} /> 
      </div>
    </div>
  );
}
