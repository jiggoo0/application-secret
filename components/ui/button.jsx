'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 🏗️ 1. Industrial Button Variants (Neobrutalism Design)
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-black italic uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
  {
    variants: {
      variant: {
        // ปุ่มหลัก: พื้นสีเข้ม เงาหนา สไตล์ Neobrutalist
        default:
          'border-2 border-slate-900 bg-primary text-white shadow-neo hover:bg-primary/90 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg',

        // ปุ่มอันตราย: สีแดงสด ขอบดำ
        destructive: 'border-2 border-slate-900 bg-red-500 text-white shadow-neo hover:bg-red-600',

        // ปุ่มโปร่ง: พื้นขาว ขอบหนา
        outline: 'border-2 border-slate-900 bg-white text-slate-900 shadow-neo hover:bg-slate-50',

        // ปุ่มรอง: พื้นเทาเข้ม
        secondary:
          'border-2 border-slate-900 bg-slate-100 text-slate-900 shadow-neo hover:bg-slate-200',

        // ปุ่มผี: ไม่มีพื้นแต่มีเส้นขอบจางๆ
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 border-2 border-transparent hover:border-slate-900',

        // ปุ่มลิงก์: สไตล์พิมพ์เขียว
        link: 'text-slate-900 underline-offset-4 hover:underline decoration-2 font-black',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-16 px-10 text-lg',
        icon: 'h-12 w-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// 🏗️ 2. Button Component
const Button = React.forwardRef(
  (
    { className, variant, size, asChild = false, isLoading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    // 💡 Loading State: สไตล์ระบบกำลังประมวลผล (Processing)
    const buttonContent = isLoading ? (
      <span className="flex items-center justify-center gap-2">
        <svg
          className="h-5 w-5 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="font-mono text-[10px] tracking-tighter">PROCESSING...</span>
      </span>
    ) : (
      <span className="flex items-center justify-center gap-2">{children}</span>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {buttonContent}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
