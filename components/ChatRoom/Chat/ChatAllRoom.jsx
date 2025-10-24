'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '@/components/common/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import fake from '@/lib/mock/fakeChat';
import chatRoomsData from '@/data/chatRooms.json';
import Image from 'next/image';

const socket = io('http://localhost:3001', { autoConnect: false });

export default function ChatAllRoom() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadMap, setUnreadMap] = useState({});
  const messagesEndRef = useRef(null);

  const isDev = useMemo(() => process.env.NODE_ENV !== 'production', []);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  // Load rooms
  useEffect(() => {
    const loadedRooms = isDev ? fake.getRooms() : chatRoomsData;
    setRooms(loadedRooms);

    if (loadedRooms.length > 0) {
      const firstRoom = loadedRooms[0].id;
      setActiveRoom(firstRoom);
      const initialMessages = isDev ? fake.getMessages(firstRoom) : loadedRooms[0].messages || [];
      setMessages(initialMessages);
    }
    setLoading(false);
  }, [isDev]);

  // Socket listener
  useEffect(() => {
    if (!activeRoom) return;
    if (!socket.connected) socket.connect();
    socket.emit('join-room', activeRoom);

    const handleNewMessage = (msg) => {
      if (!msg) return;

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
    return () => socket.off('new-message', handleNewMessage);
  }, [activeRoom]);

  const handleSend = (text) => {
    if (!activeRoom) return;
    const sender = { id: 'u_admin', name: 'Admin', avatar: '/default-avatar.png' };
    const msg = { text, sender, timestamp: Date.now(), roomId: activeRoom };

    socket.emit('send-message', msg);
    setMessages((prev) => [...prev, msg]);
    scrollToBottom();

    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoom
          ? { ...r, lastMessage: text, lastMessageAt: msg.timestamp, lastSender: sender }
          : r,
      ),
    );
  };

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader variant="dots" size="md" />
      </div>
    );

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      {/* Room selector */}
      <div className="scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-gray-200/50 flex gap-2 overflow-x-auto border-b bg-gray-100 p-2 dark:bg-gray-800">
        {rooms.map((room) => {
          const unread = unreadMap[room.id] || 0;
          const lastMsg =
            room.lastMessage || (isDev ? fake.getMessages(room.id).slice(-1)[0]?.text : '');
          const lastTime =
            room.lastMessageAt || (isDev ? fake.getMessages(room.id).slice(-1)[0]?.timestamp : '');
          const lastSenderAvatar = room.lastSender?.avatar || '/default-avatar.png';

          return (
            <button
              key={room.id}
              className={`relative max-w-[220px] flex-shrink-0 flex-col items-start rounded px-3 py-2 text-left text-sm font-medium transition-colors dark:bg-gray-700 ${
                activeRoom === room.id
                  ? 'bg-blue-500 text-white shadow-md dark:bg-blue-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => {
                setActiveRoom(room.id);
                setMessages(isDev ? fake.getMessages(room.id) : room.messages || []);
                setUnreadMap((prev) => ({ ...prev, [room.id]: 0 }));
                setTimeout(scrollToBottom, 100);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="truncate font-medium">{room.name}</span>
                {unread > 0 && (
                  <span className="ml-2 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </div>
              {lastMsg && (
                <div className="mt-1 flex w-full items-center justify-between">
                  <div className="flex items-center gap-1 truncate">
                    <Image
                      src={lastSenderAvatar}
                      width={18}
                      height={18}
                      className="rounded-full object-cover"
                      alt="avatar"
                      unoptimized
                    />
                    <span className="truncate text-[11px] text-gray-600 dark:text-gray-300">
                      {lastMsg}
                    </span>
                  </div>
                  <span className="ml-1 text-[10px] text-gray-500 dark:text-gray-400">
                    {formatTime(lastTime)}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id || i}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage message={msg} isOwn={msg.sender.id === 'u_admin'} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 z-10 border-t bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
