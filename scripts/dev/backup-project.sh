#!/bin/bash

# === CONFIG ===
PROJECT_DIR="$HOME/project"
BACKUP_DIR="$HOME/storage/downloads/Backup"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ZIP_NAME="project-backup-$TIMESTAMP.zip"

# === EXECUTE ===
if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ ไม่พบโฟลเดอร์โปรเจกต์: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

echo "📦 กำลังสร้างไฟล์ backup: $ZIP_NAME"
zip -r "$ZIP_NAME" . -x "node_modules/*" "node_modules/**" > /dev/null

# ตรวจสอบว่า BACKUP_DIR เป็นโฟลเดอร์ ไม่ใช่ไฟล์
if [ -f "$BACKUP_DIR" ]; then
  echo "❌ มีไฟล์ชื่อเดียวกับโฟลเดอร์ Backup อยู่แล้ว: $BACKUP_DIR"
  exit 1
fi

# สร้างโฟลเดอร์ถ้ายังไม่มี
mkdir -p "$BACKUP_DIR"

echo "📁 ย้ายไฟล์ไปยัง: $BACKUP_DIR"
mv "$ZIP_NAME" "$BACKUP_DIR/" || { echo "❌ ย้ายไฟล์ไม่สำเร็จ"; exit 1; }

echo "🧹 ตรวจสอบและลบไฟล์เก่าเกิน 10 รายการ..."
cd "$BACKUP_DIR" || { echo "❌ ไม่สามารถเข้าโฟลเดอร์ Backup ได้"; exit 1; }

# ลบไฟล์ zip เกิน 10 ตัว (เรียงจากใหม่ไปเก่า แล้วลบตัวที่เกิน)
ls -tp *.zip 2>/dev/null | grep -v '/$' | tail -n +11 | xargs -r rm --

echo "✅ แบคอัพเสร็จสมบูรณ์: $BACKUP_DIR/$ZIP_NAME"