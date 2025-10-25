#!/bin/bash

# โฟลเดอร์หลัก
LIB_DIR="$HOME/project/lib"
ARCHIVE_DIR="$LIB_DIR/_archive"

# สร้างโฟลเดอร์ archive ถ้ายังไม่มี
mkdir -p "$ARCHIVE_DIR"

# รายชื่อไฟล์ที่ไม่พบการใช้งานจริง (จากผลตรวจสอบ)
FILES_TO_ARCHIVE=(
  "templates/businessLicense.js"
  "templates/licenseTemplate.js"
  "templates/salaryCertificate.js"
  "validators/validateCertificateInput.js"
  "validators/validateLicenseInput.js"
  "validators/validateUploadInput.js"
  "uploadService.js"
)

echo "📦 กำลังย้ายไฟล์ที่ไม่ถูกใช้งานไปยัง: $ARCHIVE_DIR"
echo "----------------------------------------"

for file in "${FILES_TO_ARCHIVE[@]}"; do
  SRC="$LIB_DIR/$file"
  DEST="$ARCHIVE_DIR/$(basename "$file")"

  if [ -f "$SRC" ]; then
    mv "$SRC" "$DEST"
    echo "✅ ย้ายแล้ว: $file → _archive/"
  else
    echo "⚠️ ไม่พบไฟล์: $file"
  fi
done

echo "🎉 เสร็จสิ้นการย้ายไฟล์ที่ไม่ถูกใช้งาน"
