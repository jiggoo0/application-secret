// scripts/seedChatFull.js
import fs from 'fs';
import path from 'path';

const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib/mock', file), 'utf-8'));

const sampleNames = readJSON('sampleNames.json');
const roomTemplates = readJSON('makeRoom.json');
const sampleMessages = readJSON('makeMessage.json');

const outPath = path.join(process.cwd(), 'data', 'chatRooms.json');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const now = () => Date.now();
const avatarFor = (name, id) =>
  `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(`${name}${id}`)}`;

// 👥 Reusable pool of users
const userPool = sampleNames.map((name, i) => ({
  id: `u_${Math.random().toString(36).slice(2, 6)}`,
  name,
  avatar: avatarFor(name, i),
}));

function makeMessage(sender, i) {
  return {
    id: `m_${Math.random().toString(36).slice(2, 9)}`,
    text: random(sampleMessages),
    sender,
    timestamp: now() - i * 60000, // ลดเวลา 1 นาทีต่อ message
  };
}

function makeRoom(idx = 0) {
  // สมาชิกในห้อง 1–5 คน จาก pool
  const memberCount = Math.floor(Math.random() * 5) + 1;
  const members = Array.from({ length: memberCount }, () => random(userPool));

  // Messages 5–20 ข้อความ
  const msgCount = Math.floor(Math.random() * 16) + 5;
  const messages = Array.from({ length: msgCount }, (_, i) => makeMessage(random(members), i)).sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  return {
    id: `r_${Math.random().toString(36).slice(2, 8)}`,
    name: `${random(sampleNames)}'s ห้อง ${idx + 1}`,
    description: roomTemplates[idx % roomTemplates.length]?.description || 'ห้องสนทนา',
    members,
    lastMessageAt: messages.length ? messages[0].timestamp : now(),
    messages,
  };
}

// สร้าง 8 ห้อง
const NUM_ROOMS = 8;
const chatRooms = Array.from({ length: NUM_ROOMS }, (_, i) => makeRoom(i));

// เขียนไฟล์
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(chatRooms, null, 2), 'utf-8');

console.log(`✅ Generated ${chatRooms.length} rooms with messages`);
console.log(`📂 JSON saved to: ${outPath}`);
