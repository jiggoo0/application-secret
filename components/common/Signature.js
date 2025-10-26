'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

/**
 * ✒️ Signature component
 * - แสดงภาพลายเซ็นพร้อมคำพูด
 * - รองรับ motion animation และ dark mode
 */
export default function Signature({ src, alt, quote }) {
  return (
    <motion.figure
      variants={fadeInUp}
      className="space-y-4 pt-4 text-center"
      aria-label="ลายเซ็นเจ้าป่า"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        priority
        className="mx-auto rounded-md shadow-md"
      />
      <figcaption className="text-sm italic text-muted-foreground">“{quote}”</figcaption>
    </motion.figure>
  );
}
