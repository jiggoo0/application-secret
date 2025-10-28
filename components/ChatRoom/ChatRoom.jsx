'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '@/components/common/Loader';
import { supabase } from '@/lib/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export default function ChatAllRoom() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadMap, setUnreadMap] = useState({});

  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
  }, []);

  // =====================
  // ดึงผู้ใช้ปัจจุบัน
  // =====================
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email,
          email: data.user.email,
          avatar: data.user.user_metadata?.avatar_url || '/default-avatar.png',
        });
      } else {
        setUser({
          id: null,
          name: 'Guest',
          email: '',
          avatar: '/default-avatar.png',
        });
      }
    })();
  }, []);

  // =====================
  // โหลดรายชื่อห้อง
  // =====================
  useEffect(() => {
    (async () => {
      try {
        setLoadingRooms(true);
        const res = await fetch('/api/chat-rooms');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'โหลดห้องไม่สำเร็จ');
        setRooms(data.rooms || []);
        if (!activeRoom && data.rooms?.length > 0) {
          setActiveRoom(data.rooms[0].id);
        }
      } catch (err) {
        console.error('❌ Load rooms error:', err);
      } finally {
        setLoadingRooms(false);
      }
    })();
  }, [activeRoom]);

  // =====================
  // โหลดข้อความของห้อง
  // =====================
  useEffect(() => {
    if (!activeRoom) return;
    (async () => {
      try {
        setLoadingMessages(true);
        const res = await fetch(`/api/chat-rooms/${activeRoom}/messages`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'โหลดข้อความไม่สำเร็จ');
        setMessages(data.messages || []);
        setUnreadMap((prev) => ({ ...prev, [activeRoom]: 0 }));
        scrollToBottom(false);
      } catch (err) {
        console.error('❌ Load messages error:', err);
      } finally {
        setLoadingMessages(false);
      }
    })();
  }, [activeRoom, scrollToBottom]);

  // =====================
  // Realtime listener
  // =====================
  useEffect(() => {
    if (!activeRoom) return;
    const channel = supabase
      .channel(`room-${activeRoom}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${activeRoom}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
          scrollToBottom();
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [activeRoom, scrollToBottom]);

  // =====================
  // ส่งข้อความ
  // =====================
  const handleSend = async (text) => {
    if (!text?.trim() || !activeRoom || !user) return;

    const newMessage = {
      user_id: user.id || `guest-${Date.now()}`,
      user_name: user.name || 'Guest',
      user_email: user.email || '',
      content: text.trim(),
      room_id: activeRoom,
    };

    try {
      const res = await fetch(`/api/chat-rooms/${activeRoom}/messages`, {
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

  const activeRoomObj = rooms.find((r) => r.id === activeRoom);

  // =====================
  // UI
  // =====================
  return (
    <div className="flex h-full w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800 sm:flex-row">
        {/* Sidebar */}
        <aside className="hidden w-80 min-w-[14rem] overflow-y-auto border-r border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900 sm:block">
          <h3 className="mb-3 text-lg font-semibold">Rooms</h3>
          {loadingRooms ? (
            <Loader variant="dots" size="md" />
          ) : (
            <div className="space-y-2">
              {rooms.map((room) => {
                const unread = unreadMap[room.id] || 0;
                const isActive = room.id === activeRoom;
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      setActiveRoom(room.id);
                      setUnreadMap((prev) => ({ ...prev, [room.id]: 0 }));
                    }}
                    className={clsx(
                      'flex w-full items-start gap-3 rounded-lg p-3 text-left transition',
                      isActive
                        ? 'bg-blue-600 text-white shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    <Image
                      src="/default-avatar.png"
                      alt={room.title}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{room.title}</div>
                      <div className="truncate text-xs opacity-80">
                        {room.lastMessage || 'ไม่มีข้อความ'}
                      </div>
                    </div>
                    {unread > 0 && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Main Chat */}
        <main className="flex min-h-[70vh] flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-white p-3 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Image
                src="/default-avatar.png"
                alt={activeRoomObj?.title || 'room'}
                width={44}
                height={44}
                className="rounded-full object-cover"
                unoptimized
              />
              <div>
                <div className="font-semibold">{activeRoomObj?.title || 'เลือกห้อง'}</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-4 py-4 dark:bg-gray-900">
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
                    <ChatMessage message={msg} isOwn={msg.user_id === (user?.id || msg.user_id)} />
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3 dark:bg-gray-800">
            <ChatInput onSend={handleSend} />
          </div>
        </main>
      </div>
    </div>
  );
}
