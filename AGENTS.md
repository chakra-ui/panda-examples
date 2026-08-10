# Agent guide

Panda CSS examples. Each folder under `examples/` is a standalone project you can copy out and run on its own.

## Layout

- `examples/monorepo` — the design system (`packages/ds` = `@chakra-ui/shadcn-panda`) + a Next.js app, in a pnpm + Turborepo workspace.
- `examples/standalone-app` — a Next.js app that consumes the published design system as prebuilt CSS + components, no Panda.
- `examples/panda-app` — a Next.js app that runs Panda and consumes the design system via `designSystem`.

The design system source is `examples/monorepo/packages/ds/src` — tokens in `theme/`, one folder per component.

## Conventions

- Examples are **standalone**: pinned dependency versions, no `workspace:*` (except the `monorepo` example, which is itself a workspace).
- Format with **oxfmt** (`pnpm format`), not Prettier. Config in `.oxfmtrc.json` — single quotes, no semicolons.
- Lint the Next apps with `pnpm lint` (eslint-config-next).
- Do not edit generated output: `styled-system/`, `dist/`, `.next/`.

## Commands

```bash
pnpm format              # format with oxfmt
pnpm run check-examples  # install + build every example standalone

# inside an example
pnpm install && pnpm dev
```

The two npm examples depend on `@chakra-ui/shadcn-panda`, which isn't published yet. To run them locally, pack the design system (`pnpm -C examples/monorepo/packages/ds build && pnpm pack`) and install the tarball — see each example's README.
