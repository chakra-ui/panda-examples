# Agent guide

Panda CSS examples. Each folder under `examples/` is a standalone project you can copy out and run on its own.

## Layout

- `examples/monorepo` — the design system (`packages/ds` = `pandacn`) + a Next.js app, in a pnpm + Turborepo workspace.
- `examples/standalone-app` — a Next.js app that consumes the published design system as prebuilt CSS + components, no Panda.
- `examples/panda-app` — a Next.js app that runs Panda and consumes the design system via `designSystem`.

The design system source is `examples/monorepo/packages/ds/src` — tokens in `theme/`, one folder per component.

## Writing Panda

Read [PANDA.md](PANDA.md) before writing styles. It covers the authoring API (`css()`, conditions, recipes, patterns, tokens), the v2-beta facts these examples rely on, and the mistakes to avoid. Each example also has its own `AGENTS.md` with wiring for that setup.

Because each example is a standalone folder (people pull one with `degit`), every example carries its own copy of `PANDA.md` and `AGENTS.md`. They're duplicates on purpose. When you edit the copy here, update the ones under `examples/*/` too.

## Conventions

- Examples are **standalone**: pinned dependency versions, no `workspace:*` (except the `monorepo` example, which is itself a workspace).
- Format with **oxfmt** (`pnpm format`), not Prettier. Config in `.oxfmtrc.json` — single quotes, no semicolons.
- Lint the Next apps with `pnpm lint` (oxlint).
- Do not edit generated output: `styled-system/`, `dist/`, `.next/`.

## Commands

```bash
pnpm format              # format with oxfmt
pnpm run check-examples  # install + build every example standalone

# inside an example
pnpm install && pnpm dev
```

The design system is published to npm as `pandacn`; its source is `examples/monorepo/packages/ds`. The `monorepo` example consumes it via `workspace:*`; `standalone-app` and `panda-app` install it from npm. Publishing runs from the `Publish pandacn` GitHub Action (or `pnpm -C examples/monorepo/packages/ds publish`).
