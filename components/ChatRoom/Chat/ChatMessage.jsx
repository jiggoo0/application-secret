'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

export default function ChatMessage({ message, isOwn }) {
  if (!message) return null;

  const sender = message.sender || {};
  const avatarSrc = sender.avatar || '/default-avatar.png';
  const senderName = sender.name || 'ผู้ใช้';
  const text = message.text || '';
  const timestamp = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full items-end gap-2 px-3 py-2 sm:px-4 sm:py-3 ${
        isOwn ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Avatar ฝั่งผู้ส่ง */}
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
          <Image
            src={avatarSrc}
            alt={senderName}
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <AvatarFallback>{senderName[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      )}

      {/* กล่องข้อความ */}
      <div
        className={`flex max-w-[80%] flex-col break-words rounded-2xl px-3 py-2 text-sm shadow-md backdrop-blur-md transition-all sm:px-4 sm:py-3 ${
          isOwn
            ? 'bg-blue-600 text-white dark:bg-blue-500 sm:rounded-tr-none'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50 sm:rounded-tl-none'
        }`}
      >
        {/* ชื่อผู้ส่ง (ฝั่งซ้าย) */}
        {!isOwn && (
          <span className="mb-0.5 truncate text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-[13px]">
            {senderName}
          </span>
        )}

        {/* ข้อความ */}
        <p className="leading-relaxed">{text}</p>

        {/* เวลา */}
        <span
          className={`mt-1 self-end text-[10px] sm:text-xs ${
            isOwn ? 'text-blue-100 dark:text-blue-200/80' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {timestamp}
        </span>
      </div>

      {/* Avatar ฝั่งตัวเอง */}
      {isOwn && (
        <Avatar className="hidden h-8 w-8 flex-shrink-0 sm:flex sm:h-10 sm:w-10">
          <Image
            src={avatarSrc}
            alt={senderName}
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <AvatarFallback>{senderName[0]?.toUpperCase() || 'A'}</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
