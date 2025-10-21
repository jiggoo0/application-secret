#!/usr/bin/env bash
# ==========================================================
# 📦 Project Summary Script (Pro+ Full Coverage + AI Env Prompt)
# ----------------------------------------------------------
# - Reads .env values safely
# - Adds AI prompt instructions
# - Annotates code, JSON, CSV
# - Estimates AI coverage %
# - Production-ready & well formatted
# ----------------------------------------------------------
# Author: AI Assistant
# Last Updated: 2025-10-14
# ==========================================================

set -euo pipefail

OUTPUT_FILE="project-summary.md"
MAX_DEPTH=5
PREVIEW_LINES=50
ENV_FILE=".env"

# -------- FOLDERS & FILES --------
CORE_FOLDERS=("app" "components" "public" "lib" "scripts")
EXTRA_FOLDERS=("data" "config" "context" "utils")
ALL_FOLDERS=("${CORE_FOLDERS[@]}" "${EXTRA_FOLDERS[@]}")

SCAN_JSON=("data/*.json" "public/data/*.json")
SCAN_CSV=("data/*.csv" "public/data/*.csv")

# -------- INIT REPORT --------
{
  echo "# 📑 Project Summary Report"
  echo "_Generated on $(date)_"
  echo
} > "$OUTPUT_FILE"

# -------- UTILS --------
append_codeblock() {
  local file="$1"
  local lang="$2"
  echo -e "\n### $file" >> "$OUTPUT_FILE"
  echo -e "\n\`\`\`$lang" >> "$OUTPUT_FILE"
  if [ -r "$file" ]; then
    head -n "$PREVIEW_LINES" "$file" >> "$OUTPUT_FILE"
  else
    echo "⚠️ Cannot read $file" >> "$OUTPUT_FILE"
  fi
  echo -e "\`\`\`\n" >> "$OUTPUT_FILE"
}

print_divider() { echo -e "\n## $1" >> "$OUTPUT_FILE"; }

# -------- LOAD .ENV SAFELY --------
load_env() {
  print_divider "⚙️ Environment Variables"
  if [ -f "$ENV_FILE" ]; then
    echo "📄 Reading $ENV_FILE..." >> "$OUTPUT_FILE"

    while IFS='=' read -r key value || [ -n "$key" ]; do
      [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
      value="${value%\"}"
      value="${value#\"}"
      export "$key"="$value"
      echo "- \`$key\` = \`$value\`" >> "$OUTPUT_FILE"
    done < "$ENV_FILE"

  else
    echo "⚠️ $ENV_FILE not found" >> "$OUTPUT_FILE"
  fi
}

# -------- FOLDER TREE --------
show_folders() {
  print_divider "📁 Folder Overview"
  for folder in "${ALL_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
      echo "✅ Found folder: $folder"
      if command -v tree >/dev/null 2>&1; then
        tree -L "$MAX_DEPTH" "$folder" >> "$OUTPUT_FILE" || echo "⚠️ tree error" >> "$OUTPUT_FILE"
      else
        find "$folder" -maxdepth "$MAX_DEPTH" -type f | sed 's|[^/]*/|│   |g' >> "$OUTPUT_FILE"
      fi
    fi
  done
}

# -------- CODE PREVIEW & COVERAGE --------
preview_and_coverage() {
  print_divider "👀 Code Preview & Coverage"

  local total_files=0 previewed_files=0 role_guarded_files=0 import_checked_files=0

  mapfile -t code_files < <(find ./app ./components ./lib -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \))
  total_files=${#code_files[@]}

  for file in "${code_files[@]}"; do
    if [ -r "$file" ]; then
      previewed_files=$((previewed_files + 1))
      append_codeblock "$file" "js"

      if grep -q "session.*role" "$file"; then
        role_guarded_files=$((role_guarded_files + 1))
      fi

      if grep -qE "from ['\"]@components|from ['\"]@lib|from ['\"]@app" "$file"; then
        import_checked_files=$((import_checked_files + 1))
      fi
    fi
  done

  echo -e "\n> Total JS/TS files: $total_files" >> "$OUTPUT_FILE"
  echo "> Files previewed: $previewed_files" >> "$OUTPUT_FILE"
  echo "> Files with role guard: $role_guarded_files" >> "$OUTPUT_FILE"
  echo "> Files with proper import paths: $import_checked_files" >> "$OUTPUT_FILE"

  CODE_TOTAL=$total_files
  CODE_PREVIEW=$previewed_files
  CODE_ROLE=$role_guarded_files
  CODE_IMPORT=$import_checked_files
}

# -------- JSON SCHEMA CHECK --------
json_schema_check() {
  print_divider "🗄️ JSON Schema Summary"
  local total_json=0 valid_json=0

  for pattern in "${SCAN_JSON[@]}"; do
    for file in $pattern; do
      [ -f "$file" ] || continue
      total_json=$((total_json + 1))
      if [ -r "$file" ]; then
        if keys=$(jq 'keys' "$file" 2>/dev/null); then
          echo "- \`$file\` keys: $keys" >> "$OUTPUT_FILE"
          valid_json=$((valid_json + 1))
        else
          echo "- ⚠️ \`$file\` cannot parse" >> "$OUTPUT_FILE"
        fi
      else
        echo "- ⚠️ \`$file\` permission denied" >> "$OUTPUT_FILE"
      fi
    done
  done

  local json_pct=0
  [ $total_json -gt 0 ] && json_pct=$((valid_json * 100 / total_json))
  echo -e "\n> JSON parse coverage: **$json_pct %**" >> "$OUTPUT_FILE"

  JSON_TOTAL=$total_json
  JSON_VALID=$valid_json
}

# -------- CSV PREVIEW CHECK --------
csv_preview_check() {
  print_divider "📄 CSV Preview Summary"
  local total_csv=0 readable_csv=0 csv_pct=0

  for pattern in "${SCAN_CSV[@]}"; do
    for file in $pattern; do
      [ -f "$file" ] || continue
      total_csv=$((total_csv + 1))
      if [ -r "$file" ]; then
        readable_csv=$((readable_csv + 1))
        echo -e "\n### $file" >> "$OUTPUT_FILE"
        echo '```csv' >> "$OUTPUT_FILE"
        head -n 10 "$file" >> "$OUTPUT_FILE"
        echo '```' >> "$OUTPUT_FILE"
      else
        echo "- ⚠️ \`$file\` permission denied" >> "$OUTPUT_FILE"
      fi
    done
  done

  [ $total_csv -gt 0 ] && csv_pct=$((readable_csv * 100 / total_csv))
  echo -e "\n> CSV readable coverage: **$csv_pct %**" >> "$OUTPUT_FILE"

  CSV_TOTAL=$total_csv
  CSV_READABLE=$readable_csv
  CSV_COVERAGE=$csv_pct
}

# -------- AI PROMPT TEMPLATE --------
ai_prompt_section() {
  print_divider "🤖 AI Prompt Instructions"

  echo -e "\n> 📌 Context: Use the project files, JSON/CSV previews, and .env values to understand the environment." >> "$OUTPUT_FILE"
  echo -e "> ✏️ Suggested prompt template for AI:" >> "$OUTPUT_FILE"
  cat <<'EOF' >> "$OUTPUT_FILE"

You are an AI coding assistant. Use the following context:
1. Project structure and code samples (JS/TS)
2. JSON schema and CSV previews
3. Environment variables from .env

Instructions:
- Suggest config updates based on .env
- Annotate code where role guards or import paths are missing
- Validate JSON against expected keys
- Provide recommendations for code refactor or deployment improvements
- Always preserve original functionality

Output format:
- Annotated code blocks
- Recommendations list
- Coverage summary

EOF
}

# -------- OVERALL COVERAGE --------
calculate_overall() {
  print_divider "📊 Overall AI Coverage Estimate"

  local js_factor role_factor import_factor json_factor overall
  js_factor=$((CODE_PREVIEW * 100 / CODE_TOTAL))
  role_factor=$((CODE_ROLE * 100 / CODE_TOTAL))
  import_factor=$((CODE_IMPORT * 100 / CODE_TOTAL))
  json_factor=$([ $JSON_TOTAL -gt 0 ] && echo $((JSON_VALID * 100 / JSON_TOTAL)) || echo 100)

  overall=$(( (js_factor + role_factor + import_factor + json_factor + CSV_COVERAGE) / 5 ))
  echo "> 🔹 Overall AI project coverage: **$overall %**" >> "$OUTPUT_FILE"
}

# -------- ROADMAP --------
append_roadmap() {
  print_divider "🗺️ Project Roadmap Notes"
  echo -e "\n> ✏️ เพิ่มรายละเอียดเป้าหมาย ฟีเจอร์ หรือแผนงานต่อไปที่นี่" >> "$OUTPUT_FILE"
}

# -------- MAIN --------
load_env
show_folders
preview_and_coverage
json_schema_check
csv_preview_check
ai_prompt_section
calculate_overall
append_roadmap

echo "✅ Done! Markdown report generated → $OUTPUT_FILE"