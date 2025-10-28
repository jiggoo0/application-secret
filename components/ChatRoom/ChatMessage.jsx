'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div className={clsx('mb-3 flex', isOwn ? 'justify-end' : 'justify-start')}>
      {!isOwn && (
        <Image
          src={message.user_avatar || '/default-avatar.png'}
          alt={message.user_name}
          width={36}
          height={36}
          className="mr-2 rounded-full"
          unoptimized
        />
      )}

      <div
        className={clsx(
          'max-w-[75%] rounded-2xl px-4 py-2 shadow-sm',
          isOwn
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-gray-200 dark:bg-gray-700 dark:text-gray-100',
        )}
      >
        {!isOwn && (
          <div className="mb-1 text-xs font-semibold opacity-80">
            {message.user_name || 'Unknown'}
          </div>
        )}
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div className="mt-1 text-right text-[10px] text-gray-300">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {isOwn && (
        <Image
          src={message.user_avatar || '/default-avatar.png'}
          alt={message.user_name}
          width={36}
          height={36}
          className="ml-2 rounded-full"
          unoptimized
        />
      )}
    </div>
  );
}
