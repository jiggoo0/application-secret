'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react'; // สำหรับ spinner

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:text-white',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 dark:bg-secondary-dark',
  ghost: 'bg-transparent text-muted hover:text-primary border border-muted',
};

const Button = forwardRef(function Button(
  {
    children,
    href,
    type = 'button',
    className = '',
    ariaLabel,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon = null,
    iconPosition = 'left',
    pill = false,
    fullWidth = false,
    ...props
  },
  ref,
) {
  const isLink = typeof href === 'string' && href.trim().length > 0;
  const isExternal = isLink && href.startsWith('http');
  const variantClass = variantClasses[variant] || variantClasses.primary;

  const baseClass = clsx(
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
    variantClass,
    pill ? 'rounded-full' : 'rounded-md',
    fullWidth && 'w-full',
    'px-4 py-2 text-sm md:text-base',
    {
      'opacity-50 cursor-not-allowed': disabled || loading,
      'gap-2': icon || loading,
    },
    className,
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {icon && iconPosition === 'left' && !loading && <span className="shrink-0">{icon}</span>}
      <span>{loading ? 'กำลังโหลด...' : children}</span>
      {icon && iconPosition === 'right' && !loading && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (isLink) {
    return (
      <a
        href={href}
        role="button"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={baseClass}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      ref={ref}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
