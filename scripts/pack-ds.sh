#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
monorepo_dir="$root_dir/examples/monorepo"
ds_dir="$monorepo_dir/packages/ds"
tarball="chakra-ui-shadcn-panda-0.1.0.tgz"
consumers=(standalone-app panda-app)

if [ ! -x "$ds_dir/node_modules/.bin/panda" ]; then
  echo "==> Installing the design system's dependencies"
  pnpm -C "$monorepo_dir" install --silent
fi

echo "==> Packing @chakra-ui/shadcn-panda"
rm -rf "$ds_dir/.pack"
pnpm -C "$ds_dir" pack --pack-destination "$ds_dir/.pack" >/dev/null

for app in "${consumers[@]}"; do
  cp "$ds_dir/.pack/$tarball" "$root_dir/examples/$app/$tarball"
  echo "    → examples/$app/$tarball"
done

rm -rf "$ds_dir/.pack"
