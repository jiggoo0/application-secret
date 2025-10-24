import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'chatRooms.json');

// 📌 อ่าน data
async function readData() {
  try {
    const text = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(text) || [];
  } catch (err) {
    console.warn('⚠️ Failed to read chat data', err);
    return [];
  }
}

// 📌 เขียน data
async function writeData(data) {
  try {
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Failed to write chat data', err);
    throw err;
  }
}

// 🔹 Public functions
export async function getRooms() {
  return await readData();
}

export async function getRoomById(id) {
  const rooms = await readData();
  return rooms.find((r) => r.id === id) || null;
}

export async function getMessages(roomId, order = 'newest') {
  const rooms = await readData();
  const room = rooms.find((r) => r.id === roomId);
  if (!room) return [];

  const messages = room.messages || [];
  return order === 'newest'
    ? messages.slice().sort((a, b) => a.timestamp - b.timestamp)
    : messages.slice().sort((a, b) => b.timestamp - a.timestamp);
}

export async function addMessage(roomId, text, sender) {
  if (!text || !sender) throw new Error('Text and sender are required');

  const rooms = await readData();
  const room = rooms.find((r) => r.id === roomId);
  if (!room) throw new Error('Room not found');

  const message = {
    id: `m_${Math.random().toString(36).slice(2, 9)}`,
    roomId,
    text,
    sender,
    timestamp: Date.now(),
  };

  room.messages = room.messages || [];
  room.messages.push(message);

  // Update room last message
  room.lastMessage = message.text;
  room.lastMessageAt = message.timestamp;
  room.lastSender = message.sender;

  await writeData(rooms);
  return message;
}
