// components/ui/button.jsx
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 1. Button Variants Definition (cva)
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// 2. Button Component
const Button = React.forwardRef(
  (
    { className, variant, size, asChild = false, isLoading = false, disabled, children, ...props },
    ref,
  ) => {
    // 💡 Comp is 'button' unless asChild is true, then it uses Slot
    const Comp = asChild ? Slot : 'button';

    // 💡 Render Logic for Loading State (Spinner)
    const buttonContent = isLoading ? (
      <span className="flex items-center justify-center gap-2">
        <svg
          className="h-4 w-4 animate-spin text-current"
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
        {/* Hide children content visually when loading, but keep it for screen readers if present */}
        {children && <span className="sr-only">{children}</span>}
      </span>
    ) : (
      <span className="flex items-center justify-center gap-2">{children}</span>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        // Disabled when explicitly set OR when isLoading is true
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

// 3. Named Export (สำหรับแก้ปัญหา Import ที่เคยเจอ)
export { Button, buttonVariants };
