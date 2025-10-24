'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ShinyButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-block cursor-pointer rounded-lg border px-6 py-3 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-[0_0_20px_var(--primary)/10%]',
        className,
      )}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Shiny overlay */}
      <span
        className="absolute inset-0 animate-[shine_2s_infinite] rounded-lg bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-50"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <span className="relative z-10 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white sm:text-base">
        {children}
      </span>
    </motion.button>
  );
});

ShinyButton.displayName = 'ShinyButton';
