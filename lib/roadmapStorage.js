import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'data', 'roadmap.json');
const DEFAULT_ROADMAP = [];

/**
 * อ่านข้อมูล roadmap จากไฟล์ JSON
 * @returns {Array<Object>} รายการ roadmap
 */
export function readRoadmap() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      // Production-ready: ไม่แสดง console
      return DEFAULT_ROADMAP;
    }

    const raw = fs.readFileSync(FILE_PATH, 'utf8').trim();
    if (!raw) return DEFAULT_ROADMAP;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ROADMAP;
  } catch {
    return DEFAULT_ROADMAP;
  }
}

/**
 * เขียนข้อมูล roadmap ลงไฟล์ JSON
 * @param {Array<Object>} roadmap
 */
export function writeRoadmap(roadmap) {
  try {
    const dir = path.dirname(FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(FILE_PATH, JSON.stringify(roadmap, null, 2), 'utf8');
  } catch {
    throw new Error('Failed to write roadmap.json');
  }
}
