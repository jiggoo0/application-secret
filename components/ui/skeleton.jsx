// /components/ui/skeleton.jsx (สมมติโค้ด)

import { cn } from '@/lib/utils'; // <-- FIX: Added missing import for 'cn'

function Skeleton({ className, ...props }) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };
