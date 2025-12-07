// components/ui/alert.jsx

import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils'; // สมมติว่า cn และ utils ถูก Import อย่างถูกต้อง

// 1. Alert Variants (Tailwind CSS Class Management)
const alertVariants = cva(
  // ✅ FIX: เปลี่ยนเป็น Single Quote
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        // ✅ FIX: เปลี่ยนเป็น Single Quote
        default: 'bg-background text-foreground',
        // เพิ่ม Alert-variant สำหรับแจ้งเตือนร้ายแรง
        // ✅ FIX: เปลี่ยนเป็น Single Quote
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// 2. Alert Component
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  // ✅ FIX: เปลี่ยน role="alert" และ displayName เป็น Single Quote
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

// 3. AlertTitle Component
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    // ✅ FIX: เปลี่ยนเป็น Single Quote
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

// 4. AlertDescription Component
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  // ✅ FIX: เปลี่ยนเป็น Single Quote
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

// 5. Named Export
export { Alert, AlertTitle, AlertDescription };
