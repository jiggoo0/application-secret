'use client';

import clsx from 'clsx';

/**
 * Badge Component
 *
 * Props:
 * - children: ข้อความแสดงใน badge
 * - variant: สีของ badge ['primary','secondary','success','warning','danger']
 * - size: ขนาด badge ['sm','md','lg']
 * - className: เพิ่มเติม class
 */
export default function Badge({ children, variant = 'primary', size = 'md', className = '' }) {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-black',
    danger: 'bg-red-500 text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const baseClass = clsx(
    'inline-block font-medium rounded-full select-none align-middle',
    variants[variant],
    sizes[size],
    'transition-colors duration-200 ease-in-out',
    className,
  );

  const label =
    typeof children === 'string' && children.trim().length > 0 ? children.trim() : 'badge';

  return (
    <span className={baseClass} role="note" aria-label={label} title={label}>
      {children}
    </span>
  );
}
