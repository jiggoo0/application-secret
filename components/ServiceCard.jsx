'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

// Keywords config
const FUNNEL_KEYWORDS = ['ตั๋วเครื่องบิน', 'โรงแรม'];
const VISA_KEYWORDS = ['วีซ่า', 'ตั๋วเครื่องบิน'];

const matchKeywords = (title, keywords) => keywords.every((kw) => title.includes(kw));
const matchAny = (title, keywords) => keywords.some((kw) => title.includes(kw));

const ServiceCard = ({ service }) => {
  const {
    title = '',
    features = [],
    price = '-',
    ctaText = 'ดูรายละเอียด',
    ctaUrl = '#',
    images = [],
  } = service;

  const imageSrc = images[0] || '/placeholder.webp';
  const isFunnel = matchKeywords(title, FUNNEL_KEYWORDS);
  const isVisa = matchAny(title, VISA_KEYWORDS);

  const targetUrl = isFunnel ? `/flight-booking?service=${encodeURIComponent(title)}` : ctaUrl;

  // Card Styling
  const cardClassName = `flex flex-col overflow-hidden rounded-xl border transition-all duration-300 h-full group
    ${
      isFunnel
        ? 'border-blue-600 ring-2 ring-blue-300 shadow-xl bg-white hover:shadow-blue-300/50'
        : isVisa
          ? 'border-blue-400 shadow-lg bg-white hover:shadow-blue-200/50'
          : 'border-gray-200 shadow-md bg-white hover:shadow-lg'
    }`;

  const titleClassName = `text-xl font-bold mb-3 ${isVisa ? 'text-blue-700' : 'text-gray-900'}`;

  const ctaButtonClassName = `w-full py-3 text-base text-white shadow-md font-semibold transition-colors
    ${isFunnel || isVisa ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-700 hover:bg-gray-800'}`;

  return (
    <div className={cardClassName}>
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={isFunnel || isVisa}
        />
      </div>

      {/* Body */}
      <div className="flex-grow p-6">
        <h3 className={titleClassName}>{title}</h3>

        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          {features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" />
              <span>{feature}</span>
            </li>
          ))}
          {features.length > 3 && (
            <li className="mt-2 border-t border-gray-100 pt-1 text-xs text-gray-500">
              ...และคุณสมบัติอื่น ๆ อีก {features.length - 3} รายการ
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-100 p-6 pt-0">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">ราคาเริ่มต้น:</span>
          <span className="text-2xl font-extrabold text-gray-900">{price}</span>
        </div>

        <Link href={targetUrl} target={isFunnel ? '_self' : '_blank'} className="block">
          <Button className={ctaButtonClassName}>
            {isFunnel ? 'ดำเนินการกรอกข้อมูล' : ctaText}
          </Button>
        </Link>

        {isFunnel && (
          <p className="mt-3 text-center text-xs font-medium text-blue-600">
            กรอกข้อมูลเพื่อดูตัวอย่างเอกสารที่มีลายน้ำก่อนชำระเงิน
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
