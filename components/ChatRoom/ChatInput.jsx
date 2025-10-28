'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const sendMessage = async () => {
    if (!text.trim() || disabled) return;
    await onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
      <textarea
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? 'กรุณาเลือกห้องก่อนพิมพ์...' : 'พิมพ์ข้อความ...'}
        className="max-h-32 flex-1 resize-none border-none bg-transparent text-sm outline-none focus:ring-0"
      />

      <button
        onClick={sendMessage}
        disabled={disabled || !text.trim()}
        className="rounded-full p-2 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
