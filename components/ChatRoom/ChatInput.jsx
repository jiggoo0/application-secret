'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // ✅ Enter เพื่อส่ง, Shift+Enter เพื่อขึ้นบรรทัดใหม่
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 rounded-xl bg-gray-50 p-2 shadow-sm transition-colors duration-200 dark:bg-gray-800 sm:gap-3 sm:p-3"
    >
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="พิมพ์ข้อความของคุณ..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 sm:min-h-[60px]"
        aria-label="พิมพ์ข้อความ"
      />
      <Button
        type="submit"
        disabled={disabled || !text.trim()}
        className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-md transition-all duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-5 sm:py-2.5"
        aria-label="ส่งข้อความ"
      >
        <span className="hidden sm:inline">ส่ง</span>
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </form>
  );
}
