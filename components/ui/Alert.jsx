//components/ui/Alert.jsx

import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // ใช้สำหรับ Conditional Class Merging (สมมติว่ามี)

/**
 * Reusable Alert Component สำหรับแสดงข้อความแจ้งเตือนสถานะต่างๆ
 * * @param {('info'|'warning'|'success'|'error')} variant - ชนิดของ Alert เพื่อกำหนดสี
 * @param {string} title - หัวข้อของข้อความแจ้งเตือน
 * @param {React.ElementType} icon - Icon ที่จะแสดงด้านซ้าย (Override Icon ตาม variant)
 * @param {string} className - Tailwind CSS class เพิ่มเติมสำหรับ Container
 * @param {React.ReactNode} children - เนื้อหาหลักของ Alert
 */
const Alert = ({ variant = 'info', title, icon: CustomIcon, className, children, ...props }) => {
  // 1. กำหนด Class และ Icon ตาม Variant
  const baseClasses = 'flex p-4 rounded-lg border-l-4';
  let variantClasses = '';
  let IconComponent = CustomIcon; // ใช้ Custom Icon ถ้ามี

  switch (variant) {
    case 'info':
      variantClasses = 'bg-blue-50 border-blue-500 text-blue-800';
      IconComponent = IconComponent || Info;
      break;
    case 'warning':
      variantClasses = 'bg-yellow-50 border-yellow-500 text-yellow-800';
      IconComponent = IconComponent || AlertTriangle;
      break;
    case 'success':
      variantClasses = 'bg-green-50 border-green-500 text-green-800';
      IconComponent = IconComponent || CheckCircle;
      break;
    case 'error':
      variantClasses = 'bg-red-50 border-red-500 text-red-800';
      IconComponent = IconComponent || XCircle;
      break;
    default:
      variantClasses = 'bg-gray-50 border-gray-500 text-gray-800';
      IconComponent = IconComponent || Info;
  }

  return (
    <div role="alert" className={cn(baseClasses, variantClasses, className)} {...props}>
      {/* Icon Area */}
      <div className="mr-3 flex-shrink-0">
        {IconComponent && <IconComponent className="mt-0.5 h-5 w-5" aria-hidden="true" />}
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {/* Title */}
        {title && <h4 className="mb-1 text-lg font-bold">{title}</h4>}
        {/* Body (Children) */}
        <div className={cn(title ? 'text-sm' : 'text-base')}>{children}</div>
      </div>
    </div>
  );
};

export default Alert;
