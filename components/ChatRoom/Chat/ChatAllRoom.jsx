'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatAllRoom() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const router = useRouter();

  const fetchRooms = async () => {
    const res = await fetch('/api/chat-rooms');
    const { rooms } = await res.json();
    setRooms(rooms);
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;

    const res = await fetch('/api/chat-rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newRoomName.trim() }),
    });

    const { room } = await res.json();
    if (room?.id) {
      router.push(`/chat/${room.id}`);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">ห้องแชททั้งหมด</h2>

      <div className="flex gap-2">
        <input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="flex-1 rounded border px-2 py-1"
          placeholder="ชื่อห้องใหม่"
        />
        <button onClick={createRoom} className="rounded bg-green-500 px-3 py-1 text-white">
          สร้างห้อง
        </button>
      </div>

      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="cursor-pointer rounded border p-2 hover:bg-gray-100"
            onClick={() => router.push(`/chat/${room.id}`)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
