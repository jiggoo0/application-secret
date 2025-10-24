import fs from 'fs';
import path from 'path';

// 🔹 โหลด JSON แบบ manual เพื่อรองรับทุก Node เวอร์ชัน
const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib/mock', file), 'utf-8'));

const sampleNames = readJSON('sampleNames.json');
const roomTemplates = readJSON('makeRoom.json');
const sampleMessages = readJSON('makeMessage.json');

const dataPath = path.join(process.cwd(), 'data', 'chatRooms.json');

// 🧠 Utils
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => Date.now();
const avatarFor = (name, id) =>
  `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(`${name}${id}`)}`;

// 🧩 Builders
function makeMessage({ id, sender, text, ts } = {}) {
  return {
    id: id || `m_${Math.random().toString(36).slice(2, 9)}`,
    text: text || random(sampleMessages),
    sender:
      sender ||
      (() => {
        const name = random(sampleNames);
        return {
          id: `u_${Math.random().toString(36).slice(2, 6)}`,
          name,
          avatar: avatarFor(name, Math.random()),
        };
      })(),
    timestamp: ts || now(),
  };
}

function makeRoom(idx = 0) {
  const name = `${random(sampleNames)}'s ห้อง ${idx + 1}`;
  const roomId = `r_${Math.random().toString(36).slice(2, 8)}`;

  const members = Array.from({ length: Math.floor(Math.random() * 6) + 1 }, (_, i) => {
    const memberName = random(sampleNames);
    return {
      id: `u_${Math.random().toString(36).slice(2, 6)}`,
      name: memberName,
      avatar: avatarFor(memberName, i),
    };
  });

  const messages = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) =>
    makeMessage({ sender: random(members), text: random(sampleMessages), ts: now() - i * 60000 }),
  );

  return {
    id: roomId,
    name,
    description: roomTemplates[idx % roomTemplates.length]?.description || 'ห้องสนทนา',
    members,
    lastMessageAt: messages.length ? messages[0].timestamp : now(),
    messages,
  };
}

// 🧩 Factory
export function createChatStore(initialCount = 8) {
  let rooms;

  // ถ้ามี chatRooms.json ใช้ข้อมูลจากนั้น
  if (fs.existsSync(dataPath)) {
    try {
      const file = fs.readFileSync(dataPath, 'utf-8');
      rooms = JSON.parse(file);
      console.log('📦 Loaded rooms from chatRooms.json');
    } catch (err) {
      console.error('⚠️ Error loading chatRooms.json, using fallback', err);
      rooms = Array.from({ length: initialCount }, (_, i) => makeRoom(i));
    }
  } else {
    rooms = Array.from({ length: initialCount }, (_, i) => makeRoom(i));
  }

  const store = { rooms };

  const getRooms = () =>
    store.rooms.map(({ id, name, description, members, lastMessageAt }) => ({
      id,
      name,
      description,
      members,
      lastMessageAt,
    }));

  const getRoomById = (id) => store.rooms.find((r) => r.id === id);
  const getMessages = (roomId) => getRoomById(roomId)?.messages || [];

  const addMessage = (roomId, { text, sender }) => {
    const room = getRoomById(roomId);
    if (!room) return null;
    const message = makeMessage({ text, sender, ts: now() });
    room.messages.unshift(message);
    room.lastMessageAt = message.timestamp;
    return message;
  };

  const createRoom = ({ name, description, members = [] } = {}) => {
    const room = {
      id: `r_${Math.random().toString(36).slice(2, 8)}`,
      name: name || `ห้อง ${store.rooms.length + 1}`,
      description: description || 'ห้องใหม่',
      members,
      lastMessageAt: now(),
      messages: [],
    };
    store.rooms.unshift(room);
    return room;
  };

  return { getRooms, getRoomById, getMessages, addMessage, createRoom, _store: store };
}

// default instance
const fakeChat = createChatStore();
export default fakeChat;
