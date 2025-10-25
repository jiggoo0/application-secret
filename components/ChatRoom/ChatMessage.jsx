'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ChatMessage({ message, currentUser }) {
  const isMe = message.user_email === currentUser.email;

  return (
    <div className={`mb-2 flex items-end ${isMe ? 'justify-end' : 'justify-start'} space-x-2`}>
      {/* Avatar ของผู้ส่งข้อความ */}
      {!isMe && (
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarFallback>{message.user_name[0]}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`group relative max-w-[80%] break-words rounded-xl px-3 py-2 shadow-sm sm:max-w-[60%] ${
          isMe
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-gray-200 dark:bg-gray-700 dark:text-white'
        } transition-colors duration-200`}
      >
        {/* ชื่อผู้ส่ง (เฉพาะคนอื่น) */}
        {!isMe && (
          <p className="mb-1 truncate text-xs font-semibold text-gray-600 dark:text-gray-400">
            {message.user_name}
          </p>
        )}

        {/* ข้อความ */}
        <p className="text-sm sm:text-base">{message.text}</p>

        {/* Timestamp */}
        <p className="mt-1 text-right text-[10px] text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Avatar ของผู้ส่งตัวเอง (เลือกใช้ในอนาคต ถ้าต้องการ) */}
      {isMe && (
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
