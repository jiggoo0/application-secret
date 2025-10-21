// components/common/Signature.js
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

export default function Signature({ src, alt, quote }) {
  return (
    <motion.div variants={fadeInUp} className="space-y-4 pt-4">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
        priority
      />
      <p className="text-center text-sm italic text-gray-600 dark:text-gray-300">“{quote}”</p>
    </motion.div>
  );
}
