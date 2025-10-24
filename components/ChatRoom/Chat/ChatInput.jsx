'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatInput({ onSend, isSending = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // ✅ Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message) return;
    onSend(message);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 border-t bg-white px-3 py-3 dark:border-gray-700 dark:bg-gray-900 sm:px-4 sm:py-3"
    >
      {/* Input */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="พิมพ์ข้อความของคุณ..."
        className="flex-1 resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 sm:px-4 sm:py-3 sm:text-base"
      />

      {/* Send button */}
      <Button
        type="submit"
        disabled={!text.trim() || isSending}
        size="icon"
        className="flex items-center justify-center rounded-full bg-blue-600 text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4 sm:py-2"
      >
        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span className="ml-2 hidden text-sm sm:inline">ส่ง</span>
      </Button>
    </form>
  );
}
