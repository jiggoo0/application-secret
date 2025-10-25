'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils'; // หรือใช้ clsx ถ้าไม่มี cn()

const AspectRatio = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <AspectRatioPrimitive.Root ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </AspectRatioPrimitive.Root>
  );
});

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
