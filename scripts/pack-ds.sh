#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ds_dir="$root_dir/examples/monorepo/packages/ds"
tarball="chakra-ui-shadcn-panda-0.1.0.tgz"
consumers=(standalone-app panda-app)

echo "==> Packing @chakra-ui/shadcn-panda"
rm -rf "$ds_dir/.pack"
pnpm -C "$ds_dir" pack --pack-destination "$ds_dir/.pack" >/dev/null

for app in "${consumers[@]}"; do
  cp "$ds_dir/.pack/$tarball" "$root_dir/examples/$app/$tarball"
  echo "    → examples/$app/$tarball"
done

rm -rf "$ds_dir/.pack"
echo "Done. Re-run \`pnpm install\` in each consumer example to pick up the new build."
