#!/usr/bin/env bash
# ==========================================================
# 🚀 Project Summary + Deep AI Context Extractor (Full, Fixed)
# - Merges: env, folder tree, deep metadata, JS/JSX preview,
#   role/auth/import scans, JSON/CSV shape, AI-ready payload,
#   project intent detection, coverage metrics, roadmap notes.
# - Output: project-summary.md
# - Usage: bash scripts/dev/project-summary.sh
# ==========================================================
set -euo pipefail

# -------- CONFIG --------
OUTPUT_FILE="project-summary.md"
ENV_FILE=".env"
MAX_DEPTH=4
PREVIEW_LINES=80
CORE_FOLDERS=("app" "components" "lib")
EXTRA_FOLDERS=("public" "scripts" "data" "config" "context" "utils")
ALL_FOLDERS=("${CORE_FOLDERS[@]}" "${EXTRA_FOLDERS[@]}")
SCAN_JSON=("data/*.json" "public/data/*.json")
SCAN_CSV=("data/*.csv" "public/data/*.csv")

# -------- GLOBAL COUNTERS --------
declare -g CODE_TOTAL=0 CODE_PREVIEW=0 CODE_ROLE=0 CODE_IMPORT=0
declare -g JSON_TOTAL=0 JSON_VALID=0
declare -g CSV_TOTAL=0 CSV_READABLE=0 CSV_COVERAGE=0

# -------- UTIL --------
append_to_report() { printf "%s\n" "$1" >> "$OUTPUT_FILE"; }
print_divider() { append_to_report ""; append_to_report "## $1"; }
safe_div() {
  local num=${1:-0} den=${2:-0}
  if [ "$den" -eq 0 ]; then echo 100; else echo $((num * 100 / den)); fi
}

# -------- INIT --------
init_report() {
  {
    echo "# 📑 Project Summary Report"
    echo "_Generated on $(date)_"
    echo
  } > "$OUTPUT_FILE"
  echo "✅ Initialized report: $OUTPUT_FILE"
}

# -------- LOAD .ENV SAFELY --------
load_env() {
  print_divider "⚙️ Environment Variables"
  if [ -f "$ENV_FILE" ]; then
    append_to_report "📄 Reading \`$ENV_FILE\` (Sensitive values masked):"
    while IFS='=' read -r key value || [ -n "$key" ]; do
      [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
      value="${value%\"}"; value="${value#\"}"
      if [[ "$key" =~ ^(SECRET|KEY|TOKEN|PASSWORD|URL) ]]; then
        append_to_report "- \`$key\` = \`*** (Masked) ***\`"
      else
        append_to_report "- \`$key\` = \`$value\`"
        export "$key"="$value"
      fi
    done < "$ENV_FILE"
  else
    append_to_report "⚠️ \`$ENV_FILE\` not found."
  fi
}

# -------- FOLDER TREE + METADATA --------
show_folders() {
  print_divider "📁 Folder Overview (Max Depth: $MAX_DEPTH)"
  for folder in "${ALL_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
      append_to_report ""
      append_to_report "### $folder"
      if command -v tree >/dev/null 2>&1; then
        tree -L "$MAX_DEPTH" "$folder" >> "$OUTPUT_FILE" || append_to_report "⚠️ \`tree\` command error"
      else
        find "$folder" -maxdepth "$MAX_DEPTH" -type f | sed 's|[^/]*/|│   |g' >> "$OUTPUT_FILE"
      fi
      append_to_report ""
      append_to_report "#### Metadata (file | size | sha1)"
      find "$folder" -type f -print0 2>/dev/null | while IFS= read -r -d $'\0' f; do
        if [ -r "$f" ]; then
          size=$(stat -c "%s" "$f" 2>/dev/null || echo "n/a")
          sha=$(sha1sum "$f" 2>/dev/null | awk '{print $1}' || echo "n/a")
          append_to_report "- $f | ${size}b | sha1:${sha}"
        fi
      done
    fi
  done
}

# -------- CODE PREVIEW & COVERAGE (JS/JSX) --------
append_codeblock() {
  local file="$1" lang="$2"
  append_to_report ""
  append_to_report "### \`$file\`"
  append_to_report "\`\`\`$lang"
  if [ -r "$file" ]; then
    head -n "$PREVIEW_LINES" "$file" >> "$OUTPUT_FILE"
  else
    append_to_report "⚠️ Cannot read $file"
  fi
  append_to_report "\`\`\`"
}

preview_and_coverage() {
  print_divider "👀 Code Preview & Coverage (JS/JSX)"
  local -a code_files=()
  while IFS= read -r -d $'\0' file; do code_files+=("$file"); done < <(find ./app ./components ./lib -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -print0 2>/dev/null)

  CODE_TOTAL=${#code_files[@]}
  for file in "${code_files[@]}"; do
    if [ -r "$file" ]; then
      CODE_PREVIEW=$((CODE_PREVIEW + 1))
      append_codeblock "$file" "js"
      if grep -qE "session.*role|user.*permission|role: 'admin'|role:'admin'" "$file" 2>/dev/null; then
        CODE_ROLE=$((CODE_ROLE + 1))
      fi
      if grep -qE "from ['\"]@components|from ['\"]@lib|from ['\"]@app|from ['\"]@/|from ['\"]@/" "$file" 2>/dev/null; then
        CODE_IMPORT=$((CODE_IMPORT + 1))
      fi
    fi
  done

  append_to_report ""
  append_to_report "> **Total JS/TS files:** $CODE_TOTAL"
  append_to_report "> **Files previewed:** $CODE_PREVIEW"
  append_to_report "> **Files with Role/Auth checks:** $CODE_ROLE"
  append_to_report "> **Files using Absolute Imports:** $CODE_IMPORT"
}

# -------- JSON SCHEMA CHECK (DEEP) --------
json_schema_check() {
  print_divider "🗄️ JSON Schema Summary"
  local -a json_files=()
  shopt -s nullglob
  for pattern in "${SCAN_JSON[@]}"; do
    for file in $pattern; do json_files+=("$file"); done
  done
  shopt -u nullglob
  JSON_TOTAL=${#json_files[@]}
  for file in "${json_files[@]}"; do
    if [ -f "$file" ] && [ -r "$file" ]; then
      if jq empty "$file" 2>/dev/null; then
        keys=$(jq -r 'paths | map(tostring) | join(".")' "$file" 2>/dev/null | head -n 120 || echo "")
        append_to_report "- ✅ \`$file\` keys (sample):"
        append_to_report "```"
        append_to_report "$keys"
        append_to_report "```"
        JSON_VALID=$((JSON_VALID + 1))
      else
        append_to_report "- ⚠️ \`$file\` Invalid JSON"
      fi
    else
      append_to_report "- ⚠️ \`$file\` not readable"
    fi
  done
  local json_pct
  json_pct=$(safe_div "$JSON_VALID" "$JSON_TOTAL")
  append_to_report ""
  append_to_report "> **JSON parse coverage:** **$json_pct %**"
}

# -------- CSV PREVIEW CHECK --------
csv_preview_check() {
  print_divider "📄 CSV Preview Summary"
  local -a csv_files=()
  shopt -s nullglob
  for pattern in "${SCAN_CSV[@]}"; do
    for file in $pattern; do csv_files+=("$file"); done
  done
  shopt -u nullglob
  CSV_TOTAL=${#csv_files[@]}
  for file in "${csv_files[@]}"; do
    if [ -f "$file" ] && [ -r "$file" ]; then
      CSV_READABLE=$((CSV_READABLE + 1))
      append_to_report ""
      append_to_report "### \`$file\` (First 20 lines)"
      append_to_report '```csv'
      head -n 20 "$file" >> "$OUTPUT_FILE"
      append_to_report '```'
    else
      append_to_report "- ⚠️ \`$file\` not readable"
    fi
  done
  CSV_COVERAGE=$(safe_div "$CSV_READABLE" "$CSV_TOTAL")
  append_to_report ""
  append_to_report "> **CSV readable coverage:** **$CSV_COVERAGE %**"
}

# -------- DEEP CODE INSIGHT (imports/routing/forms) --------
deep_code_insight() {
  print_divider "🔎 Deep Code Insights (counts & signals)"
  local files
  files=$(find ./app ./components ./lib -type f \( -name "*.js" -o -name "*.jsx" \) -print 2>/dev/null || echo "")
  if [ -z "$files" ]; then append_to_report "No JS/JSX files found"; return; fi
  for f in $files; do
    append_to_report ""
    append_to_report "### $f"
    imports=$(grep -E "^import " "$f" 2>/dev/null | wc -l | tr -d ' ')
    routes=$(grep -E "router|navigate|redirect|push|replace" "$f" 2>/dev/null | wc -l | tr -d ' ')
    forms=$(grep -E "useForm|handleSubmit|onSubmit|register" "$f" 2>/dev/null | wc -l | tr -d ' ')
    effects=$(grep -E "useEffect|useLayoutEffect" "$f" 2>/dev/null | wc -l | tr -d ' ')
    logic=$(grep -E "if |switch |return " "$f" 2>/dev/null | wc -l | tr -d ' ')
    append_to_report "- imports: $imports | routing-related: $routes | form-related: $forms | effects: $effects | logic-statements: $logic"
  done
}

# -------- PROJECT INTENT DETECTION --------
project_intent() {
  print_divider "🎯 Project Intent Detection"
  pages=$(find app -type f -name "page.jsx" 2>/dev/null | wc -l | tr -d ' ')
  apis=$(find app/api -type f 2>/dev/null | wc -l | tr -d ' ')
  forms=$(grep -R "useForm" -n app components 2>/dev/null | wc -l | tr -d ' ')
  auth_refs=$(grep -R "session|auth|login|nextauth|supabase" -n app components lib 2>/dev/null | wc -l | tr -d ' ')
  append_to_report "- pages (page.jsx): $pages"
  append_to_report "- api endpoints: $apis"
  append_to_report "- form usages (useForm etc.): $forms"
  append_to_report "- auth references (session/auth): $auth_refs"
  if [ "$auth_refs" -gt 0 ]; then append_to_report "- Note: Authentication features detected"; fi
  if [ "$forms" -gt 5 ]; then append_to_report "- Note: High form usage → likely CRM/document workflows"; fi
}

# -------- AI PROMPT TEMPLATE (for LLM ingestion) --------
ai_prompt_section() {
  print_divider "🤖 AI Prompt Instructions & Context"
  append_to_report "> 📌 **Context:** Use the project files, JSON/CSV previews, and environment context above. Focus on code quality, security, and production readiness."
  append_to_report "> ✏️ **Suggested prompt template for AI team:**"
  append_to_report ""
  append_to_report '---'
  append_to_report "You are an expert AI dev team. Based on the Project Summary Report above, perform the following tasks:"
  append_to_report "1) Prioritize critical fixes (errors, security, auth, broken imports)."
  append_to_report "2) Provide refactor recommendations for sampled code blocks."
  append_to_report "3) Validate data shapes and suggest fixes for invalid JSON/CSV."
  append_to_report "4) Output a prioritized checklist and code patches (diff/replace blocks)."
  append_to_report '---'
}

# -------- AI-PAYLOAD (safe embed) --------
ai_payload_block() {
  print_divider "🧩 AI-PAYLOAD (Embed Report Snapshot)"
  local tmpfile
  tmpfile="$(mktemp /tmp/project-summary-XXXX.md)"
  # write current report to temp and include it as payload
  cp "$OUTPUT_FILE" "$tmpfile" 2>/dev/null || true
  append_to_report '```AI-PAYLOAD'
  cat "$tmpfile" >> "$OUTPUT_FILE"
  append_to_report '```'
  rm -f "$tmpfile" 2>/dev/null || true
}

# -------- OVERALL COVERAGE METRIC --------
calculate_overall() {
  print_divider "📊 Overall AI Coverage Estimate"
  local js_preview_pct role_guard_pct import_pct json_valid_pct
  js_preview_pct=$(safe_div "$CODE_PREVIEW" "$CODE_TOTAL")
  role_guard_pct=$(safe_div "$CODE_ROLE" "$CODE_TOTAL")
  import_pct=$(safe_div "$CODE_IMPORT" "$CODE_TOTAL")
  json_valid_pct=$(safe_div "$JSON_VALID" "$JSON_TOTAL")
  local weight_js=2 weight_role=3 weight_import=1 weight_json=2 weight_csv=1
  local total_weight=$((weight_js + weight_role + weight_import + weight_json + weight_csv))
  local weighted_sum=$(( (js_preview_pct * weight_js) + (role_guard_pct * weight_role) + (import_pct * weight_import) + (json_valid_pct * weight_json) + (CSV_COVERAGE * weight_csv) ))
  local overall=$(safe_div "$weighted_sum" "$total_weight")
  append_to_report ""
  append_to_report "| Metric | Total | Covered | Coverage % | Weight |"
  append_to_report "| :--- | :---: | :---: | :---: | :---: |"
  append_to_report "| **Code Preview** | $CODE_TOTAL | $CODE_PREVIEW | $js_preview_pct% | $weight_js |"
  append_to_report "| **Role/Auth Checks** | $CODE_TOTAL | $CODE_ROLE | $role_guard_pct% | $weight_role |"
  append_to_report "| **Absolute Imports** | $CODE_TOTAL | $CODE_IMPORT | $import_pct% | $weight_import |"
  append_to_report "| **Valid JSON** | $JSON_TOTAL | $JSON_VALID | $json_valid_pct% | $weight_json |"
  append_to_report "| **Readable CSV** | $CSV_TOTAL | $CSV_READABLE | $CSV_COVERAGE% | $weight_csv |"
  append_to_report ""
  append_to_report "> 🔹 **Overall AI Project Coverage Estimate (Weighted Average):** **$overall %**"
}

# -------- ROADMAP NOTES --------
append_roadmap() {
  print_divider "🗺️ Project Roadmap Notes"
  append_to_report "> ✏️ Add future goals, features, or milestones here to inform AI decisions."
  append_to_report ""
}

# -------- MAIN --------
main() {
  echo "🚀 Generating full Project Summary..."
  init_report
  load_env
  show_folders
  preview_and_coverage
  deep_code_insight
  json_schema_check
  csv_preview_check
  project_intent
  ai_prompt_section
  calculate_overall
  append_roadmap
  # optional snapshot payload
  ai_payload_block
  echo "✅ Done. Report → $OUTPUT_FILE"
}

main "$@"