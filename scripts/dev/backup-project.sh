#!/bin/bash

# === CONFIG ===
PROJECT_DIR="$HOME/project"
BACKUP_DIR="$HOME/storage/downloads/Backup"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ZIP_NAME="project-backup-$TIMESTAMP.zip"

# === EXECUTE ===
cd "$PROJECT_DIR" || { echo "❌ ไม่พบโฟลเดอร์โปรเจกต์"; exit 1; }

echo "📦 กำลังสร้างไฟล์ backup: $ZIP_NAME"
zip -r "$ZIP_NAME" . -x "node_modules/*" "node_modules/**" > /dev/null

echo "📁 ย้ายไฟล์ไปยัง: $BACKUP_DIR"
mv "$ZIP_NAME" "$BACKUP_DIR/"

echo "🧹 ตรวจสอบและลบไฟล์เก่าเกิน 10 รายการ..."
cd "$BACKUP_DIR" || exit 1

# นับและลบไฟล์เกิน 10 ตัว (เรียงจากเก่าไปใหม่)
ls -tp *.zip | grep -v '/$' | tail -n +11 | xargs -r rm --

echo "✅ แบคอัพเสร็จสมบูรณ์: $BACKUP_DIR/$ZIP_NAME"