'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Section component with animation on scroll
 * Automatically fades and slides in when entering viewport
 */
export default function Section({ id, heading, children, className, ariaLabelledBy }) {
  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('mx-auto w-full max-w-7xl py-12 sm:py-20', className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {heading && (
        <h2 id={ariaLabelledBy} className="mb-8 text-center text-h2 font-semibold text-foreground">
          {heading}
        </h2>
      )}
      <div>{children}</div>
    </motion.section>
  );
}
