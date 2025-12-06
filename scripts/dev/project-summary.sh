#!/usr/bin/env bash
# ==========================================================
# 📦 Project Summary Script (Pro+ Full Coverage + AI Env Prompt)
# ----------------------------------------------------------
# - Reads .env values safely
# - Adds AI prompt instructions
# - Annotates code, JSON, CSV
# - Estimates AI coverage % with better logic
# - Production-ready & well formatted
# ----------------------------------------------------------
# Author: AI Assistant
# Last Updated: 2025-10-14 (Improved Version)
# ==========================================================

# Strict mode: Exit immediately on error, exit on unset variables, treat command pipeline errors
set -euo pipefail

# -------- CONFIGURATION --------
OUTPUT_FILE="project-summary.md"
MAX_DEPTH=3 # Reduced depth for cleaner report
PREVIEW_LINES=30 # Reduced preview lines for brevity
ENV_FILE=".env"
# Folders to include in the overview
CORE_FOLDERS=("app" "components" "lib")
EXTRA_FOLDERS=("public" "scripts" "data" "config" "context" "utils")
ALL_FOLDERS=("${CORE_FOLDERS[@]}" "${EXTRA_FOLDERS[@]}")
# File patterns for JSON/CSV scanning
SCAN_JSON=("data/*.json" "public/data/*.json")
SCAN_CSV=("data/*.csv" "public/data/*.csv")

# Initialize global variables for coverage calculation
declare -g CODE_TOTAL=0 CODE_PREVIEW=0 CODE_ROLE=0 CODE_IMPORT=0
declare -g JSON_TOTAL=0 JSON_VALID=0
declare -g CSV_TOTAL=0 CSV_READABLE=0 CSV_COVERAGE=0

# -------- UTILS --------

# Function to safely append content to the output file
append_to_report() {
  echo -e "$1" >> "$OUTPUT_FILE"
}

# Function to print a new section divider
print_divider() {
  append_to_report "\n## $1"
}

# Function to append a code block with language syntax
append_codeblock() {
  local file="$1"
  local lang="$2"
  append_to_report "\n### \`$file\`"
  append_to_report "\n\`\`\`$lang"
  if [ -r "$file" ]; then
    head -n "$PREVIEW_LINES" "$file" >> "$OUTPUT_FILE"
  else
    append_to_report "⚠️ Cannot read $file"
  fi
  append_to_report "\n\`\`\`\n"
}

# Function for safe integer division with check for division by zero
safe_div() {
  local numerator=$1
  local denominator=$2
  if [ "$denominator" -eq 0 ]; then
    echo 100 # Return 100% if there's nothing to check (e.g., 0 files)
  else
    echo $((numerator * 100 / denominator))
  fi
}

# -------- INIT REPORT --------
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
    append_to_report "📄 Reading \`$ENV_FILE\` (Sensitive values masked for AI prompt):\n"

    while IFS='=' read -r key value || [ -n "$key" ]; do
      # Skip comments and empty lines
      [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue

      # Clean up quotes from value
      value="${value%\"}"
      value="${value#\"}"

      # Use '***' mask for AI prompt where value is likely a secret/key
      if [[ "$key" =~ ^(SECRET|KEY|TOKEN|PASSWORD|URL) ]]; then
        append_to_report "- \`$key\` = \`*** (Masked) ***\`"
      else
        append_to_report "- \`$key\` = \`$value\`"
        # Export for potential script use (though generally avoided in summaries)
        export "$key"="$value"
      fi
    done < "$ENV_FILE"

  else
    append_to_report "⚠️ \`$ENV_FILE\` not found. Cannot include environment context."
  fi
}

# -------- FOLDER TREE --------
show_folders() {
  print_divider "📁 Folder Overview (Max Depth: $MAX_DEPTH)"
  for folder in "${ALL_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
      append_to_report "\n### $folder"
      if command -v tree >/dev/null 2>&1; then
        tree -L "$MAX_DEPTH" "$folder" >> "$OUTPUT_FILE" || append_to_report "⚠️ \`tree\` command error"
      else
        # Fallback using find (less visual but always available)
        find "$folder" -maxdepth "$MAX_DEPTH" -type f | sed 's|[^/]*/|│   |g' >> "$OUTPUT_FILE"
      fi
    fi
  done
}

# -------- CODE PREVIEW & COVERAGE --------
preview_and_coverage() {
  print_divider "👀 Code Preview & Coverage (JS/TS)"

  # Use a safe way to populate the array even if no files match
  local code_files=()
  while IFS= read -r -d $'\0' file; do
    code_files+=("$file")
  done < <(find ./app ./components ./lib -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -print0)

  CODE_TOTAL=${#code_files[@]}

  for file in "${code_files[@]}"; do
    if [ -r "$file" ]; then
      CODE_PREVIEW=$((CODE_PREVIEW + 1))
      append_codeblock "$file" "js"

      # Check for role/permission guard patterns (e.g., uses session.user.role)
      if grep -qE "session.*role|user.*permission" "$file"; then
        CODE_ROLE=$((CODE_ROLE + 1))
      fi

      # Check for common absolute import paths (@components, @lib, etc.)
      if grep -qE "from ['\"]@components|from ['\"]@lib|from ['\"]@app" "$file"; then
        CODE_IMPORT=$((CODE_IMPORT + 1))
      fi
    fi
  done

  append_to_report "\n---"
  append_to_report "> **Total JS/TS files:** $CODE_TOTAL"
  append_to_report "> **Files previewed:** $CODE_PREVIEW"
  append_to_report "> **Files with Role/Auth checks:** $CODE_ROLE"
  append_to_report "> **Files using Absolute Imports:** $CODE_IMPORT"
}

# -------- JSON SCHEMA CHECK --------
json_schema_check() {
  print_divider "🗄️ JSON Schema Summary"
  
  local json_files=()
  local pattern
  
  # Handle globs that may not match any files (using nullglob)
  shopt -s nullglob
  for pattern in "${SCAN_JSON[@]}"; do
    for file in $pattern; do
      json_files+=("$file")
    done
  done
  shopt -u nullglob # Turn off nullglob

  JSON_TOTAL=${#json_files[@]}

  for file in "${json_files[@]}"; do
    if [ -f "$file" ]; then
      if [ -r "$file" ]; then
        if keys=$(jq 'keys_to_string' "$file" 2>/dev/null); then
          # jq keys_to_string is not standard, use standard 'keys' instead
          if keys=$(jq -r 'keys | join(", ")' "$file" 2>/dev/null); then
            append_to_report "- ✅ \`$file\` keys: \`$keys\`"
            JSON_VALID=$((JSON_VALID + 1))
          else
            append_to_report "- ⚠️ \`$file\` **Cannot parse** (Invalid JSON format)"
          fi
        else
          append_to_report "- ⚠️ \`$file\` **Cannot parse** (Invalid JSON format)"
        fi
      else
        append_to_report "- ⚠️ \`$file\` **Permission denied**"
      fi
    fi
  done

  local json_pct
  json_pct=$(safe_div "$JSON_VALID" "$JSON_TOTAL")
  append_to_report "\n> **JSON parse coverage:** **$json_pct %**"
}

# -------- CSV PREVIEW CHECK --------
csv_preview_check() {
  print_divider "📄 CSV Preview Summary"
  
  local csv_files=()
  local pattern

  # Handle globs that may not match any files
  shopt -s nullglob
  for pattern in "${SCAN_CSV[@]}"; do
    for file in $pattern; do
      csv_files+=("$file")
    done
  done
  shopt -u nullglob # Turn off nullglob

  CSV_TOTAL=${#csv_files[@]}

  for file in "${csv_files[@]}"; do
    if [ -f "$file" ]; then
      if [ -r "$file" ]; then
        CSV_READABLE=$((CSV_READABLE + 1))
        append_to_report "\n### \`$file\` (First 10 lines)"
        append_to_report '```csv'
        head -n 10 "$file" >> "$OUTPUT_FILE"
        append_to_report '```'
      else
        append_to_report "- ⚠️ \`$file\` **Permission denied**"
      fi
    fi
  done

  CSV_COVERAGE=$(safe_div "$CSV_READABLE" "$CSV_TOTAL")
  append_to_report "\n> **CSV readable coverage:** **$CSV_COVERAGE %**"
}

# -------- AI PROMPT TEMPLATE --------
ai_prompt_section() {
  print_divider "🤖 AI Prompt Instructions & Context"

  append_to_report "\n> 📌 **Context:** Use the project files, JSON/CSV previews, and **unmasked** .env values to understand the environment, data structures, and code style. Focus on the code samples provided above."
  append_to_report "\n> ✏️ **Suggested prompt template for AI:**"
  cat <<'EOF' >> "$OUTPUT_FILE"

---
You are an expert AI coding assistant. Your task is to analyze the provided Project Summary Report and offer actionable insights.

**Primary Goal:** Improve code quality, security, and project consistency based on the context.

**Analysis Instructions:**
1.  **Environment (ENV):** Suggest config updates or potential security improvements based on the **available** .env keys (even masked ones indicate a secret).
2.  **Code (JS/TS):**
    * Identify files where Role/Auth checks or Absolute Imports are missing (low coverage areas).
    * Provide refactor recommendations for the previewed code samples.
3.  **Data (JSON/CSV):**
    * For invalid JSON files, suggest possible structural fixes.
    * Analyze CSV previews for consistency (headers, data types).
4.  **Overall:** Provide deployment or performance recommendations.

**Output Format:**
1.  **Recommendations List:** (Prioritized)
2.  **Annotated Code Blocks:** (Use Markdown `suggestion` blocks)
3.  **Coverage Review Table:** (Based on the final summary)
---
EOF
}

# -------- OVERALL COVERAGE --------
calculate_overall() {
  print_divider "📊 Overall AI Coverage Estimate"

  # Calculate individual percentage scores
  local js_preview_pct=$(safe_div "$CODE_PREVIEW" "$CODE_TOTAL")
  local role_guard_pct=$(safe_div "$CODE_ROLE" "$CODE_TOTAL")
  local import_path_pct=$(safe_div "$CODE_IMPORT" "$CODE_TOTAL")
  local json_valid_pct=$(safe_div "$JSON_VALID" "$JSON_TOTAL")
  # CSV_COVERAGE is already calculated in its function

  # Use a sum of weights for a more sensible average
  # Assign weights to components (e.g., Code is more important than CSV preview)
  local weight_js=2 weight_role=3 weight_import=1 weight_json=2 weight_csv=1
  local total_weight=$((weight_js + weight_role + weight_import + weight_json + weight_csv))

  local weighted_sum=$(( (js_preview_pct * weight_js) + (role_guard_pct * weight_role) + (import_path_pct * weight_import) + (json_valid_pct * weight_json) + (CSV_COVERAGE * weight_csv) ))

  local overall=$(safe_div "$weighted_sum" "$total_weight")

  # Summary Table
  append_to_report "\n| Metric | Total | Covered | Coverage % | Weight |"
  append_to_report "| :--- | :---: | :---: | :---: | :---: |"
  append_to_report "| **Code Preview** | $CODE_TOTAL | $CODE_PREVIEW | $js_preview_pct% | $weight_js |"
  append_to_report "| **Role/Auth Checks** | $CODE_TOTAL | $CODE_ROLE | $role_guard_pct% | $weight_role |"
  append_to_report "| **Absolute Imports** | $CODE_TOTAL | $CODE_IMPORT | $import_path_pct% | $weight_import |"
  append_to_report "| **Valid JSON** | $JSON_TOTAL | $JSON_VALID | $json_valid_pct% | $weight_json |"
  append_to_report "| **Readable CSV** | $CSV_TOTAL | $CSV_READABLE | $CSV_COVERAGE% | $weight_csv |"
  append_to_report "\n"
  
  append_to_report "> 🔹 **Overall AI Project Coverage Estimate (Weighted Average):** **$overall %**"
}

# -------- ROADMAP --------
append_roadmap() {
  print_divider "🗺️ Project Roadmap Notes"
  append_to_report "\n> ✏️ เพิ่มรายละเอียดเป้าหมาย ฟีเจอร์ หรือแผนงานต่อไปที่นี่เพื่อให้ AI ได้รับทราบและสามารถให้คำแนะนำที่สอดคล้องกับอนาคตของโปรเจกต์"
}

# -------- MAIN EXECUTION --------
main() {
  echo "🚀 Starting Project Summary Generation..."
  init_report
  load_env
  show_folders
  preview_and_coverage
  json_schema_check
  csv_preview_check
  ai_prompt_section
  calculate_overall
  append_roadmap
  echo -e "\n✅ Done! Markdown report generated → $OUTPUT_FILE"
}

main "$@"

