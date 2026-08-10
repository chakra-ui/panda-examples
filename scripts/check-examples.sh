#!/usr/bin/env bash
# Verifies every example under examples/ is self-contained: it must install
# and build on its own, without relying on the repo root (no workspace,
# no hoisted node_modules, no `workspace:*` deps).
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failures=()

for folder in "$root_dir"/examples/*/; do
  name="$(basename "$folder")"

  if [ ! -f "$folder/package.json" ]; then
    continue
  fi

  echo "==> Checking example: $name"

  if grep -q "workspace:" "$folder/package.json"; then
    echo "    ✗ $name references a workspace:* dependency, which breaks standalone installs"
    failures+=("$name")
    continue
  fi

  (
    cd "$folder"
    pnpm install --ignore-workspace
    if pnpm run | grep -q '^  build$'; then
      pnpm run build --if-present
    fi
  ) || failures+=("$name")
done

if [ ${#failures[@]} -ne 0 ]; then
  echo ""
  echo "Failed examples: ${failures[*]}"
  exit 1
fi

echo ""
echo "All examples installed and built successfully."
