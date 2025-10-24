'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '@/components/common/Loader';
import { io } from 'socket.io-client';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket;
if (typeof window !== 'undefined') {
  socket = io(SOCKET_URL, { autoConnect: false, transports: ['websocket'] });
}

export default function ChatAllRoom() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadMap, setUnreadMap] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const adminSender = useRef({
    id: 'u_admin',
    name: 'Admin',
    avatar: '/default-avatar.png',
  }).current;

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
  }, []);

  // Fetch rooms
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingRooms(true);
        const res = await fetch('/api/chat');
        const data = await res.json();
        if (mounted && data?.ok) {
          setRooms(data.rooms || []);
          setActiveRoom((prev) => prev ?? (data.rooms?.[0]?.id || null));
        }
      } catch (err) {
        console.error('❌ load rooms error', err);
      } finally {
        if (mounted) setLoadingRooms(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch messages
  useEffect(() => {
    if (!activeRoom) return;
    let mounted = true;
    (async () => {
      try {
        setLoadingMessages(true);
        const res = await fetch(`/api/chat/rooms/${activeRoom}/messages?order=newest`);
        if (!res.ok) throw new Error('Load messages failed');
        const data = await res.json();
        if (mounted) {
          setMessages(data.messages || []);
          setUnreadMap((prev) => ({ ...prev, [activeRoom]: 0 }));
          scrollToBottom(false);
        }
      } catch (err) {
        console.error('❌ load messages', err);
      } finally {
        if (mounted) setLoadingMessages(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [activeRoom, scrollToBottom]);

  // Socket events
  useEffect(() => {
    if (!socket || !activeRoom) return;
    if (!socket.connected) socket.connect();

    socket.emit('join-room', activeRoom);

    const handleNewMessage = (msg) => {
      if (!msg?.roomId) return;

      if (msg.roomId === activeRoom) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      } else {
        setUnreadMap((prev) => ({ ...prev, [msg.roomId]: (prev[msg.roomId] || 0) + 1 }));
        setRooms((prev) =>
          prev.map((r) =>
            r.id === msg.roomId
              ? {
                  ...r,
                  lastMessage: msg.text,
                  lastMessageAt: msg.timestamp,
                  lastSender: msg.sender,
                }
              : r,
          ),
        );
      }
    };

    socket.on('new-message', handleNewMessage);

    return () => {
      socket.off('new-message', handleNewMessage);
      socket.emit('leave-room', activeRoom);
    };
  }, [activeRoom, scrollToBottom]);

  // Send message
  const handleSend = async (text) => {
    if (!activeRoom || !text?.trim()) return;

    const trimmed = text.trim();
    const tempId = `m_${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      roomId: activeRoom,
      text: trimmed,
      sender: adminSender,
      status: 'sending',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    scrollToBottom();

    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, sender: adminSender }),
      });
      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error || 'Send failed');

      const saved = data.message;
      setMessages((prev) => prev.map((m) => (m.id === tempId ? saved : m)));
      socket.emit('send-message', { roomId: activeRoom, text: saved.text, sender: saved.sender });
    } catch (err) {
      console.error('❌ send error', err);
      setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...m, status: 'failed' } : m)));
    }
  };

  const activeRoomObj = rooms.find((r) => r.id === activeRoom);
  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <div className="flex h-full w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800 sm:flex-row">
        {/* Sidebar Desktop */}
        <aside className="hidden w-80 min-w-[14rem] overflow-y-auto border-r border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900 sm:block">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Rooms</h3>
            <button className="text-sm text-blue-600 hover:underline">New</button>
          </div>

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
                      src={room.lastSender?.avatar || '/default-avatar.png'}
                      alt={room.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="truncate font-medium">{room.name}</div>
                        <div className="text-xs opacity-70">
                          {room.lastMessageAt &&
                            new Date(room.lastMessageAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </div>
                      </div>
                      <div className="truncate text-xs opacity-80">{room.lastMessage || '—'}</div>
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
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b bg-white p-3 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Image
                src={activeRoomObj?.lastSender?.avatar || '/default-avatar.png'}
                alt={activeRoomObj?.name || 'room'}
                width={44}
                height={44}
                className="rounded-full object-cover"
                unoptimized
              />
              <div>
                <div className="font-semibold">{activeRoomObj?.name || 'เลือกห้อง'}</div>
                <div className="text-xs opacity-70">{activeRoomObj?.description || ''}</div>
              </div>
            </div>
            <div className="text-xs opacity-70">{activeRoomObj?.members?.length || 0} คน</div>
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
                    <ChatMessage message={msg} isOwn={msg.sender?.id === adminSender.id} />
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

        {/* Mobile drawer */}
        <div
          className={clsx(
            'fixed inset-0 z-50 transform bg-black/40 transition-all sm:hidden',
            mobileOpen
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none translate-x-full opacity-0',
          )}
          onClick={toggleMobile}
        >
          <aside
            className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Rooms</h3>
              <button className="text-sm text-blue-600 hover:underline" onClick={toggleMobile}>
                Close
              </button>
            </div>

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
                      toggleMobile();
                    }}
                    className={clsx(
                      'flex w-full items-start gap-3 rounded-lg p-3 text-left transition',
                      isActive
                        ? 'bg-blue-600 text-white shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    <Image
                      src={room.lastSender?.avatar || '/default-avatar.png'}
                      alt={room.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="truncate font-medium">{room.name}</div>
                        <div className="text-xs opacity-70">
                          {room.lastMessageAt &&
                            new Date(room.lastMessageAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </div>
                      </div>
                      <div className="truncate text-xs opacity-80">{room.lastMessage || '—'}</div>
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
          </aside>
        </div>
      </div>
    </div>
  );
}
