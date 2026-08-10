#!/usr/bin/env bash
# Verifies every example under examples/ installs and builds.
#
# Standalone examples must be self-contained: install and build on their own,
# with no `workspace:*` deps and no reliance on the repo root.
#
# Two exceptions the checker handles:
#   - A workspace example (has its own pnpm-workspace.yaml) is a monorepo. It
#     installs and builds as a workspace, and `workspace:*` deps are expected.
#   - An example that depends on @chakra-ui/shadcn-panda from npm is skipped
#     until that package is published. Verify it locally with `pnpm pack`.
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failures=()
skipped=()

ds_published="$(npm view @chakra-ui/shadcn-panda version 2>/dev/null || true)"

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

  if grep -q '"@chakra-ui/shadcn-panda"' "$folder/package.json" && [ -z "$ds_published" ]; then
    echo "    – skipped: needs @chakra-ui/shadcn-panda on npm (verify locally with pnpm pack)"
    skipped+=("$name")
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

if [ ${#skipped[@]} -ne 0 ]; then
  echo ""
  echo "Skipped (unpublished dependency): ${skipped[*]}"
fi

if [ ${#failures[@]} -ne 0 ]; then
  echo ""
  echo "Failed examples: ${failures[*]}"
  exit 1
fi

echo ""
echo "All checked examples installed and built successfully."
