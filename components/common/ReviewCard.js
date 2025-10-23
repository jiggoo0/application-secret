'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatThaiDate } from '@/lib/fakereview/utils';
import { getLikes, incrementLikes } from '@/lib/fakereview/likes';

const fallbackSrc = '/images/default-avatar.webp';

export default function ReviewCard({
  id,
  name = 'ผู้ใช้ไม่ระบุชื่อ',
  photo,
  feedback = 'ไม่มีข้อความรีวิว',
  createdAt,
  likes = 1,
  likerName = 'ผู้ใช้ทั่วไป',
}) {
  const imgSrc = typeof photo === 'string' && photo.trim() ? photo : fallbackSrc;
  const displayName = name?.trim() || 'ผู้ใช้ไม่ระบุชื่อ';
  const displayDate = createdAt ? formatThaiDate(createdAt) : 'ไม่ทราบวันที่';

  const [likeCount, setLikeCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLikes = getLikes(id);
    if (storedLikes && storedLikes > likes) {
      setLikeCount(storedLikes);
      setHasLiked(true);
    }
  }, [id, likes]);

  const handleLike = () => {
    if (hasLiked) return;
    const updatedLikes = incrementLikes(id);
    setLikeCount(updatedLikes);
    setHasLiked(true);
  };

  const likeText = mounted
    ? likeCount > 1
      ? `${likerName} และอีก ${(likeCount - 1).toLocaleString('th-TH')} คนถูกใจสิ่งนี้`
      : `${likerName} ถูกใจสิ่งนี้`
    : 'กำลังโหลด...';

  return (
    <article
      aria-label={`รีวิวจาก ${displayName}`}
      className="mx-auto mb-6 max-w-xl rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-900"
    >
      {/* 🧑‍💼 Header */}
      <header className="mb-2 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-300 dark:border-gray-700">
          <Image
            src={imgSrc}
            alt={`รูปโปรไฟล์ของ ${displayName}`}
            fill
            sizes="(max-width: 640px) 40px, 50px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {displayName}
          </span>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={createdAt}>
            {displayDate}
          </time>
        </div>
      </header>

      {/* 💬 Feedback */}
      <p className="mb-3 text-[15px] leading-normal text-gray-800 dark:text-gray-200">{feedback}</p>

      {/* 👍 Like Text */}
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{likeText}</p>

      {/* 🧩 Actions */}
      <div className="mt-2 flex justify-around border-t pt-2 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
        <button
          type="button"
          onClick={handleLike}
          disabled={hasLiked}
          aria-pressed={hasLiked}
          className={`flex items-center gap-1 rounded-md px-2 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            hasLiked
              ? 'cursor-not-allowed text-blue-500'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span
            className={`transition-transform duration-300 ${
              hasLiked ? 'scale-125 text-blue-500' : ''
            }`}
          >
            👍
          </span>
          <span>ถูกใจ</span>
        </button>

        <button
          type="button"
          aria-label="แสดงความคิดเห็น"
          className="flex items-center gap-1 rounded-md px-2 py-1 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
        >
          💬 แสดงความคิดเห็น
        </button>

        <button
          type="button"
          aria-label="แชร์รีวิว"
          className="flex items-center gap-1 rounded-md px-2 py-1 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
        >
          ↗ แชร์
        </button>
      </div>
    </article>
  );
}
