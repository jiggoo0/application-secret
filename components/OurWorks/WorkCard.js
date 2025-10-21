'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function WorkCard({ id, title, image, video, description, url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayWithSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      viewport={{ once: true }}
      aria-labelledby={`work-title-${id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <figure className="relative h-52 w-full shrink-0 cursor-pointer overflow-hidden">
        {video ? (
          <>
            <video
              ref={videoRef}
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onClick={handlePlayWithSound}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-sm font-semibold text-white">
                คลิกเพื่อเปิดเสียง 🔊
              </div>
            )}
          </>
        ) : (
          <Image
            src={image || '/images/placeholder.webp'}
            alt={`ผลงาน: ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </figure>

      <div className="flex flex-1 flex-col p-6">
        <h3 id={`work-title-${id}`} className="text-lg font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">ผลงานล่าสุด</span>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-primaryHover inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white"
            >
              ดูรายละเอียด
            </a>
          ) : (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ยังไม่มีข้อมูลเพิ่มเติม
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
