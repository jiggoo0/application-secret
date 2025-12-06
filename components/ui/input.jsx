// components/ui/input.jsx

import * as React from 'react';
import { cn } from '@/lib/utils'; // utility function for combining class names

// 1. Input Component Definition
const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        // Base styles for the input field:
        'w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm transition',
        // Focus and Disabled States:
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

// 2. Named Export
export { Input };
