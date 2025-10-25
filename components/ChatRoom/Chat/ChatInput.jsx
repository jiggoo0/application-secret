'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

/**
 * ChatInput Component
 * @param {Object} props
 * @param {(text: string) => Promise<void> | void} props.onSend
 * @param {string} [props.placeholder]
 */
function ChatInput({
  onSend,
  placeholder = 'พิมพ์ข้อความ... (Enter เพื่อส่ง, Shift+Enter ขึ้นบรรทัดใหม่)',
}) {
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);
  const textareaRef = useRef(null);

  // ✅ Auto-resize textarea (smooth)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [value]);

  // ✅ Send message
  const send = async () => {
    const text = value.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      await onSend?.(text);
      setValue('');
    } catch (err) {
      console.error('❌ ChatInput send error:', err);
    } finally {
      setSending(false);
    }
  };

  // ✅ Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 sm:p-4">
      <div className="flex items-end gap-2 sm:gap-3">
        {/* ✏️ Input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="max-h-[180px] flex-1 resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-[15px] leading-relaxed text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          rows={1}
        />

        {/* 🚀 Send Button */}
        <button
          type="button"
          onClick={send}
          disabled={sending || !value.trim()}
          className="flex h-10 w-10 transform items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-50 sm:h-11 sm:w-11"
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
        </button>
      </div>
    </div>
  );
}

export default memo(ChatInput);
