#!/usr/bin/env bash
set -euo pipefail

resume_temp_dir="$(mktemp -d)"
trap 'rm -rf -- "$resume_temp_dir"' EXIT

generated_pdf="$resume_temp_dir/generated.pdf"
generated_text="$resume_temp_dir/generated.txt"
generated_normalized="$resume_temp_dir/generated-normalized.txt"
committed_text="$resume_temp_dir/committed.txt"
committed_pdf="public/Martin_Ramirez_Espinosa_Resume.pdf"

node scripts/generate-resume.mjs "$generated_pdf" >/dev/null

validate_pdf() {
  local pdf="$1"
  local label="$2"
  local info
  info="$(pdfinfo "$pdf")"

  if [[ "$(awk '/^Pages:/ { print $2 }' <<<"$info")" != "1" ]]; then
    echo "Expected the $label résumé to contain exactly one page." >&2
    exit 1
  fi
  if ! rg -q '^Page size:.*A4' <<<"$info"; then
    echo "Expected the $label résumé to use A4 page dimensions." >&2
    exit 1
  fi
  if ! rg -q '^Tagged:[[:space:]]+yes' <<<"$info"; then
    echo "Expected the $label résumé to include accessibility tags." >&2
    exit 1
  fi
}

validate_pdf "$generated_pdf" "generated"

pdftotext -layout "$generated_pdf" "$generated_text"
tr '\n' ' ' <"$generated_text" | tr -s '[:space:]' ' ' >"$generated_normalized"
for expected in \
  "Martín Ramírez Espinosa" \
  "RESEARCH & EXPERIENCE" \
  "RAGdoll" \
  "smaLLM" \
  "Available for remote internships" \
  "English — professional working proficiency"; do
  rg -Fq "$expected" "$generated_normalized" || {
    echo "Generated résumé is missing required text: $expected" >&2
    exit 1
  }
done

test -s "$committed_pdf" || {
  echo "Committed résumé PDF is missing or empty. Run npm run resume:build." >&2
  exit 1
}

validate_pdf "$committed_pdf" "committed"

pdftotext -layout "$committed_pdf" "$committed_text"
diff -u "$committed_text" "$generated_text"
