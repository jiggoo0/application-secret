'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '@/components/common/Loader';
import { supabase } from '@/lib/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatAdminPanel({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
  }, []);

  // Load messages
  useEffect(() => {
    if (!roomId) return;
    (async () => {
      try {
        setLoadingMessages(true);
        const res = await fetch(`/api/chat-rooms/${roomId}/messages`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'โหลดข้อความไม่สำเร็จ');
        setMessages(data.messages || []);
        scrollToBottom(false);
      } catch (err) {
        console.error('❌ Load messages error:', err);
      } finally {
        setLoadingMessages(false);
      }
    })();
  }, [roomId, scrollToBottom]);

  // Supabase Realtime
  useEffect(() => {
    if (!roomId) return;
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
          scrollToBottom();
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId, scrollToBottom]);

  // Send message
  const handleSend = async (text) => {
    if (!text?.trim() || !roomId || !user) return;

    const newMessage = {
      user_id: user.id || 'admin', // แอดมินใช้ admin id
      user_name: user.name || 'Admin',
      user_email: user.email || 'admin@example.com',
      content: text.trim(),
      room_id: roomId,
    };

    try {
      const res = await fetch(`/api/chat-rooms/${roomId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'ส่งข้อความไม่สำเร็จ');
    } catch (err) {
      console.error('❌ Send message error:', err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg border bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="border-b bg-gray-100 p-3 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">Chat Admin Panel</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Room ID: {roomId}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
        {loadingMessages ? (
          <div className="flex h-48 items-center justify-center">
            <Loader variant="dots" size="md" />
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.12 }}
              >
                <ChatMessage message={msg} isOwn={msg.user_id === (user.id || 'admin')} />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-gray-100 p-3 dark:bg-gray-900">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
