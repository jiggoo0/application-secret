'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div className={clsx('flex items-start gap-3', isOwn ? 'justify-end' : 'justify-start')}>
      {!isOwn && (
        <Image
          src="/default-avatar.png"
          alt={message.user_name || 'User'}
          width={32}
          height={32}
          className="rounded-full object-cover"
          unoptimized
        />
      )}
      <div
        className={clsx(
          'max-w-[70%] rounded-lg px-3 py-2 text-sm',
          isOwn
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
        )}
      >
        {!isOwn && (
          <div className="mb-1 text-xs font-medium opacity-80">{message.user_name || 'Guest'}</div>
        )}
        <div>{message.content}</div>
        <div className="mt-1 text-right text-xs opacity-50">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
      {isOwn && (
        <Image
          src="/default-avatar.png"
          alt={message.user_name || 'Admin'}
          width={32}
          height={32}
          className="rounded-full object-cover"
          unoptimized
        />
      )}
    </div>
  );
}
