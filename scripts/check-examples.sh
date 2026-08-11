#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failures=()

"$root_dir/scripts/pack-ds.sh"

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

  (
    cd "$folder"
    pnpm install --ignore-workspace
    if pnpm run | grep -q '^  build$'; then
      pnpm run build
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
