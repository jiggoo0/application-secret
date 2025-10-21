#!/bin/bash

# === CONFIG ===
OUTPUT_FILE="project-structure.md"
WHITELIST_DIRS=("app" "components" "data" "scripts" "public" "lib" "config" "context" "db" "export" "utils")

# === EXECUTE ===
echo "📦 กำลังสร้างโครงสร้าง Markdown: $OUTPUT_FILE"

{
  echo "# 📁 โครงสร้างโปรเจกต์"
  echo ""
  echo '```'

  for dir in "${WHITELIST_DIRS[@]}"; do
    if [ -d "$dir" ]; then
      find "$dir" \
        \( -type d -name "node_modules" -o -type d -name ".*" \) -prune -o -print |
        while read -r path; do
          indent=$(echo "$path" | grep -o "/" | wc -l)
          printf "%*s%s\n" $((indent * 2)) "" "$(basename "$path")"
        done
    fi
  done

  echo '```'
} > "$OUTPUT_FILE"

echo "✅ สร้างไฟล์เสร็จสมบูรณ์: $(pwd)/$OUTPUT_FILE"