'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

/**
 * ChatMessage Component
 * @param {Object} props
 * @param {Object} props.message - Message data { id, text, sender:{id,name,avatar}, timestamp }
 * @param {boolean} props.isOwn - Whether this message belongs to current user
 */
function ChatMessage({ message, isOwn }) {
  if (!message) return null;

  const senderName = message.sender?.name || 'Unknown';
  const avatarSrc = message.sender?.avatar || '/default-avatar.png';
  const timeLabel = message.timestamp ? format(new Date(message.timestamp), 'HH:mm') : '';

  return (
    <div
      className={`mb-3 flex w-full gap-3 transition-all ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {/* Left Avatar (Other User) */}
      {!isOwn && (
        <div className="flex-shrink-0 self-end">
          <Image
            src={avatarSrc}
            alt={senderName}
            width={36}
            height={36}
            className="rounded-full border border-gray-200 object-cover dark:border-gray-700"
            unoptimized
          />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`flex max-w-[80%] flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <span className="mb-1 max-w-[70vw] truncate text-[12px] font-medium text-gray-700 dark:text-gray-300">
            {senderName}
          </span>
        )}

        <div
          className={`relative whitespace-pre-wrap break-words rounded-2xl px-4 py-2 shadow-sm ${
            isOwn
              ? 'rounded-br-none bg-blue-600 text-white'
              : 'rounded-bl-none bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
          }`}
        >
          <p className="text-[14px] leading-relaxed sm:text-[15px]">{message.text}</p>
          <span
            className={`absolute bottom-1 right-3 text-[10px] ${
              isOwn ? 'text-blue-100' : 'text-gray-500'
            } opacity-70`}
          >
            {timeLabel}
          </span>
        </div>
      </div>

      {/* Right Avatar (Own Message - only desktop) */}
      {isOwn && (
        <div className="hidden flex-shrink-0 self-end sm:flex">
          <Image
            src={avatarSrc}
            alt="you"
            width={36}
            height={36}
            className="rounded-full border border-gray-200 object-cover dark:border-gray-700"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

export default memo(ChatMessage);
