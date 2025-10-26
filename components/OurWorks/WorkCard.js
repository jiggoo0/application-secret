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
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-sm font-medium text-white">
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
        <h3 id={`work-title-${id}`} className="text-lg font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">ผลงานล่าสุด</span>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
            >
              ดูรายละเอียด
            </a>
          ) : (
            <span className="text-xs text-muted-foreground opacity-70">
              ยังไม่มีข้อมูลเพิ่มเติม
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
