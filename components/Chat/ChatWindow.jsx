'use client';

import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Send } from 'lucide-react';

export default function ChatWindow({ user, messages, text, setText, sendMessage }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-3 dark:bg-gray-800">
        {messages.length === 0 ? (
          <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            ยังไม่มีข้อความ
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} isCurrentUser={msg.user_email === user.email} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center border-t border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800"
      >
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-full border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="ml-2 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
          aria-label="send"
        >
          <Send size={18} />
        </button>
      </form>
    </>
  );
}
