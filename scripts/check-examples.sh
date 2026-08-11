#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failures=()
skipped=()

pandacn_published="$(npm view pandacn version 2>/dev/null || true)"

for folder in "$root_dir"/examples/*/; do
  name="$(basename "$folder")"

  if [ ! -f "$folder/package.json" ]; then
    continue
  fi

  echo "==> Checking example: $name"

  if [ -f "$folder/pnpm-workspace.yaml" ]; then
    (
      cd "$folder"
      pnpm install
      if pnpm run | grep -q '^  build$'; then
        pnpm run build
      fi
    ) || failures+=("$name")
    continue
  fi

  if grep -q "workspace:" "$folder/package.json"; then
    echo "    ✗ $name references a workspace:* dependency, which breaks standalone installs"
    failures+=("$name")
    continue
  fi

  if grep -q '"pandacn"' "$folder/package.json" && [ -z "$pandacn_published" ]; then
    echo "    – skipped: needs pandacn on npm"
    skipped+=("$name")
    continue
  fi

  (
    cd "$folder"
    pnpm install --ignore-workspace
    if pnpm run | grep -q '^  build$'; then
      pnpm run build
    fi
  ) || failures+=("$name")
done

if [ ${#skipped[@]} -ne 0 ]; then
  echo ""
  echo "Skipped (pandacn not yet on npm): ${skipped[*]}"
fi

if [ ${#failures[@]} -ne 0 ]; then
  echo ""
  echo "Failed examples: ${failures[*]}"
  exit 1
fi

echo ""
echo "All checked examples installed and built successfully."
