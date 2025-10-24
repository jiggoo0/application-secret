import sampleNames from './sampleNames.json';
import roomTemplates from './makeRoom.json';
import sampleMessages from './makeMessage.json';

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => Date.now();

function avatarFor(name, id) {
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(`${name}${id}`)}`;
}

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

  const messages = Array.from({ length: Math.floor(Math.random() * 6) + 1 }, (_, i) =>
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

// in-memory store
const store = { rooms: Array.from({ length: 8 }, (_, i) => makeRoom(i)) };

// public API
export function getRooms() {
  return store.rooms.map(({ id, name, description, members, lastMessageAt }) => ({
    id,
    name,
    description,
    members,
    lastMessageAt,
  }));
}

export function getRoomById(id) {
  return store.rooms.find((r) => r.id === id);
}

export function getMessages(roomId) {
  const room = getRoomById(roomId);
  return room?.messages || [];
}

export function addMessage(roomId, { text, sender }) {
  const room = getRoomById(roomId);
  if (!room) return null;
  const message = makeMessage({ text, sender, ts: now() });
  room.messages.unshift(message);
  room.lastMessageAt = message.timestamp;
  return message;
}

export function createRoom({ name, description, members = [] } = {}) {
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
}

// export default object
const fakeChat = { getRooms, getRoomById, getMessages, addMessage, createRoom, _store: store };
export default fakeChat;
