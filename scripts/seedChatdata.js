#!/usr/bin/env node
// scripts/seedChatdata.js

const fs = require('fs');
const path = require('path');

// 📂 Paths
const MOCK_DIR = path.join(process.cwd(), 'lib', 'mock');
const OUT_DIR = path.join(process.cwd(), 'data');
const OUT_PATH = path.join(OUT_DIR, 'chatRooms.json');

// 🔹 Load JSON helper
const loadJSON = (file) => {
  try {
    const raw = fs.readFileSync(path.join(MOCK_DIR, file), 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`⚠️ Failed to read ${file}`, err);
    return [];
  }
};

// 🔹 Load mock data
const sampleNames = loadJSON('sampleNames.json');
const sampleAvatars = loadJSON('thaiAvatars.json');
const roomTemplates = loadJSON('makeRoom.json');
const sampleMessagesRaw = loadJSON('makeMessage.json');

// 🔹 Normalize message array
const sampleMessages = Array.isArray(sampleMessagesRaw)
  ? sampleMessagesRaw
  : Object.values(sampleMessagesRaw || {});

// 🔹 Helpers
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => Date.now();
const avatarFor = (idx) => sampleAvatars[idx % sampleAvatars.length] || '/default-avatar.png';
const messageType = () => random(['text', 'image', 'file', 'emoji']);
const randomBool = (prob = 0.5) => Math.random() < prob;

// 🔹 Config
const NUM_ROOMS = roomTemplates.length;
const NUM_USERS = Math.max(sampleNames.length, 20);

// 👤 Generate users
const users = Array.from({ length: NUM_USERS }, (_, i) => {
  const name = sampleNames[i % sampleNames.length] || `User${i + 1}`;
  return {
    id: `u_${Math.random().toString(36).slice(2, 8)}`,
    name,
    avatar: avatarFor(i),
  };
});

// 🏠 Generate chat rooms
const chatRooms = roomTemplates.map((roomTemplate, i) => {
  const membersCount = Math.floor(Math.random() * 5) + 3;
  const members = Array.from({ length: membersCount }, () => random(users));
  const roomId = `r_${Math.random().toString(36).slice(2, 8)}`;
  const msgCount = Math.floor(Math.random() * 15) + 5;
  const baseTime = now() - Math.floor(Math.random() * 7 * 86400000); // ภายใน 7 วัน

  // 💬 Generate messages
  const roomMessages = Array.from({ length: msgCount }, (_, j) => {
    const sender = random(members);
    const msgText = random(sampleMessages) || 'ข้อความ';
    const ts = baseTime + j * (Math.floor(Math.random() * 300000) + 60000); // ห่างกัน 1–6 นาที

    return {
      id: `m_${Math.random().toString(36).slice(2, 9)}`,
      roomId,
      text: typeof msgText === 'string' ? msgText : msgText.text || 'ข้อความ',
      sender,
      timestamp: ts,
      type: messageType(),
      isRead: randomBool(0.8),
      isEdited: randomBool(0.1),
      reactions: [],
    };
  });

  return {
    id: roomId,
    name: roomTemplate.description, // ✅ ใช้ description เป็นชื่อห้อง
    description: roomTemplate.description,
    members,
    ownerId: members[0].id,
    isGroup: true,
    tags: ['ทั่วไป'],
    createdAt: baseTime,
    updatedAt: roomMessages.at(-1)?.timestamp || baseTime,
    lastMessageAt: roomMessages.at(-1)?.timestamp || baseTime,
    messages: roomMessages,
  };
});

// ✅ Write output
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(chatRooms, null, 2), 'utf-8');

console.log(`🚀 Chat data seeded: ${chatRooms.length} rooms saved to ${OUT_PATH}`);