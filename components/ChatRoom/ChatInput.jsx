'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react'; // ไอคอนส่งข้อความ

export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="พิมพ์ข้อความ..."
        disabled={disabled}
        autoFocus
        className="flex-1 rounded-2xl border-gray-300 bg-gray-50 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        aria-label="พิมพ์ข้อความ"
      />
      <Button
        type="submit"
        disabled={disabled || !text.trim()}
        className="flex items-center gap-1 rounded-2xl bg-blue-600 px-4 py-2 transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-5 sm:py-2.5"
        aria-label="ส่งข้อความ"
      >
        ส่ง
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </form>
  );
}
