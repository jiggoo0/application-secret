#!/usr/bin/env bash
# ==========================================================
# 🚀 Project Summary + Deep AI Context Extractor
# ----------------------------------------------------------
# Generates: project-summary.md
# ==========================================================

set -euo pipefail

# ---------------- CONFIG ----------------
OUTPUT_FILE="project-summary.md"
ENV_FILE=".env"
MAX_DEPTH=4
PREVIEW_LINES=80

CORE_FOLDERS=("app" "components" "lib")
EXTRA_FOLDERS=("public" "scripts" "data" "hooks" "config" "types" "utils")
ALL_FOLDERS=("${CORE_FOLDERS[@]}" "${EXTRA_FOLDERS[@]}")

SCAN_JSON=("data/*.json" "public/data/*.json")
SCAN_CSV=("data/*.csv" "public/data/*.csv")
ROOT_CONFIGS=("middleware.ts" ".prettierrc" "eslint.config.mjs" "tailwind.config.ts" "tsconfig.json" "next.config.ts")

# ---------------- GLOBAL METRICS ----------------
declare -g CODE_TOTAL=0 CODE_PREVIEW=0 CODE_ROLE=0 CODE_IMPORT=0
declare -g JSON_TOTAL=0 JSON_VALID=0
declare -g CSV_TOTAL=0 CSV_READABLE=0 CSV_COVERAGE=0

# ---------------- UTILS ----------------
append_to_report() {
  printf "%s\n" "$1" >> "$OUTPUT_FILE"
}

print_divider() {
  append_to_report ""
  append_to_report "## $1"
  append_to_report ""
}

safe_div() {
  local n=${1:-0}
  local d=${2:-0}
  (( d == 0 )) && echo 100 || echo $((n * 100 / d))
}

# ---------------- INIT ----------------
init_report() {
  {
    echo "# 📑 Project Summary Report"
    echo "_Generated on $(date)_"
    echo ""
  } > "$OUTPUT_FILE"
}

# ---------------- ENV ----------------
load_env() {
  print_divider "⚙️ Environment Variables"

  if [[ ! -f "$ENV_FILE" ]]; then
    append_to_report "> ⚠️ .env not found"
    return
  fi

  append_to_report "> Loaded from .env (sensitive values masked)"
  while IFS='=' read -r key value || [[ -n "$key" ]]; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    value="${value%\"}"
    value="${value#\"}"

    if [[ "$key" =~ (SECRET|KEY|TOKEN|PASSWORD|URL) ]]; then
      append_to_report "- \`$key\` = \`***\`"
    else
      append_to_report "- \`$key\` = \`$value\`"
      export "$key"="$value"
    fi
  done < "$ENV_FILE"
}

# ---------------- FOLDER TREE ----------------
show_folders() {
  print_divider "📁 Folder Structure (Depth ≤ $MAX_DEPTH)"

  for folder in "${ALL_FOLDERS[@]}"; do
    [[ ! -d "$folder" ]] && continue
    append_to_report "### $folder"

    if command -v tree >/dev/null 2>&1; then
      tree -L "$MAX_DEPTH" "$folder" >> "$OUTPUT_FILE"
    else
      find "$folder" -maxdepth "$MAX_DEPTH" -type f >> "$OUTPUT_FILE"
    fi

    append_to_report ""
    append_to_report "#### Metadata (file | size | sha1)"
    find "$folder" -type f -print0 | while IFS= read -r -d '' f; do
      size=$(stat -c "%s" "$f" 2>/dev/null || echo "n/a")
      sha=$(sha1sum "$f" 2>/dev/null | awk '{print $1}' || echo "n/a")
      append_to_report "- $f | ${size}b | sha1:${sha}"
    done
  done
}

# ---------------- CODE PREVIEW (FIXED) ----------------
append_codeblock() {
  local file="$1"
  local lang="$2"

  append_to_report ""
  append_to_report "### \`$file\`"
  append_to_report "\`\`\`$lang"

  if [[ -r "$file" ]]; then
    head -n "$PREVIEW_LINES" "$file" >> "$OUTPUT_FILE"
  else
    append_to_report "⚠️ Cannot read file"
  fi

  append_to_report "\`\`\`"
}

preview_and_coverage() {
  print_divider "👀 Code Preview & Coverage"

  mapfile -d '' code_files < <(
    find app components lib \
      -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
      -print0
  )

  CODE_TOTAL=${#code_files[@]}

  for file in "${code_files[@]}"; do
    [[ -r "$file" ]] || continue
    CODE_PREVIEW=$((CODE_PREVIEW + 1))

    local lang="js"
    [[ "$file" =~ \.ts(x)?$ ]] && lang="ts"

    append_codeblock "$file" "$lang"

    grep -qE "auth|role|session|permission" "$file" && CODE_ROLE=$((CODE_ROLE + 1))
    grep -qE "from ['\"]@/" "$file" && CODE_IMPORT=$((CODE_IMPORT + 1))
  done

  append_to_report ""
  append_to_report "- Total code files: **$CODE_TOTAL**"
  append_to_report "- Previewed: **$CODE_PREVIEW**"
  append_to_report "- Auth/Role logic: **$CODE_ROLE**"
  append_to_report "- Absolute imports: **$CODE_IMPORT**"
}

# ---------------- ROOT CONFIG ----------------
preview_root_configs() {
  print_divider "⚙️ Root Config Previews"

  for file in "${ROOT_CONFIGS[@]}"; do
    [[ ! -f "$file" ]] && continue
    local lang="text"
    [[ "$file" =~ \.ts$ ]] && lang="ts"
    [[ "$file" =~ \.js|\.mjs$ ]] && lang="js"
    [[ "$file" =~ \.json$ ]] && lang="json"
    append_codeblock "$file" "$lang"
  done
}

# ---------------- JSON ----------------
json_schema_check() {
  print_divider "🗄️ JSON Validation"

  shopt -s nullglob
  local files=(${SCAN_JSON[@]})
  JSON_TOTAL=${#files[@]}

  for f in "${files[@]}"; do
    if jq empty "$f" 2>/dev/null; then
      JSON_VALID=$((JSON_VALID + 1))
      append_to_report "- ✅ $f valid"
    else
      append_to_report "- ❌ $f invalid"
    fi
  done

  append_to_report ""
  append_to_report "> JSON validity: **$(safe_div "$JSON_VALID" "$JSON_TOTAL")%**"
}

# ---------------- CSV ----------------
csv_preview_check() {
  print_divider "📄 CSV Preview"

  shopt -s nullglob
  local files=(${SCAN_CSV[@]})
  CSV_TOTAL=${#files[@]}

  for f in "${files[@]}"; do
    [[ ! -r "$f" ]] && continue
    CSV_READABLE=$((CSV_READABLE + 1))
    append_to_report "### $f"
    append_to_report "\`\`\`csv"
    head -n 20 "$f" >> "$OUTPUT_FILE"
    append_to_report "\`\`\`"
  done

  CSV_COVERAGE=$(safe_div "$CSV_READABLE" "$CSV_TOTAL")
  append_to_report ""
  append_to_report "> CSV readable: **$CSV_COVERAGE%**"
}

# ---------------- INTENT ----------------
project_intent() {
  print_divider "🎯 Project Intent Detection"

  local pages apis forms auth
  pages=$(find app -name "page.tsx" | wc -l)
  apis=$(find app/api -type f 2>/dev/null | wc -l)
  forms=$(grep -R "useForm" app components 2>/dev/null | wc -l)
  auth=$(grep -R "auth|session|login" app components lib 2>/dev/null | wc -l)

  append_to_report "- Pages: $pages"
  append_to_report "- API endpoints: $apis"
  append_to_report "- Forms: $forms"
  append_to_report "- Auth refs: $auth"
}

# ---------------- AI CONTEXT ----------------
append_ai_context() {
  print_divider "🧠 AI Context (ai-context.md)"

  if [[ -f "ai-context.md" ]]; then
    append_to_report "\`\`\`md"
    cat ai-context.md >> "$OUTPUT_FILE"
    append_to_report "\`\`\`"
  else
    append_to_report "> ⚠️ ai-context.md not found"
  fi
}

# ---------------- METRICS ----------------
calculate_overall() {
  print_divider "📊 AI Coverage Metrics"

  local js_pct role_pct import_pct json_pct
  js_pct=$(safe_div "$CODE_PREVIEW" "$CODE_TOTAL")
  role_pct=$(safe_div "$CODE_ROLE" "$CODE_TOTAL")
  import_pct=$(safe_div "$CODE_IMPORT" "$CODE_TOTAL")
  json_pct=$(safe_div "$JSON_VALID" "$JSON_TOTAL")

  append_to_report "| Metric | Coverage |"
  append_to_report "|------|:---:|"
  append_to_report "| Code Preview | ${js_pct}% |"
  append_to_report "| Auth / Role | ${role_pct}% |"
  append_to_report "| Absolute Import | ${import_pct}% |"
  append_to_report "| JSON Valid | ${json_pct}% |"
  append_to_report "| CSV Readable | ${CSV_COVERAGE}% |"
}

# ---------------- MAIN ----------------
main() {
  echo "🚀 Generating project-summary.md ..."
  init_report
  load_env
  show_folders
  preview_root_configs
  preview_and_coverage
  json_schema_check
  csv_preview_check
  project_intent
  calculate_overall
  append_ai_context
  echo "✅ Done → $OUTPUT_FILE"
}

main "$@"