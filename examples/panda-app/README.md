# Panda app

A Next.js app that runs Panda and pulls the [shadcn/ui](https://ui.shadcn.com/) design system from npm. You get the whole system through one config line, and you can add your own tokens on top without forking.

Use this when your app already uses Panda and you want to build on a shared design system — extend its tokens, add app-only recipes, keep full types.

## How it works

Point Panda at the published design system:

```ts
// panda.config.ts
export default defineConfig({
  designSystem: 'pandacn',
  // ...
})
```

Panda resolves the package's `panda/lib.json`, merges its tokens and recipes into your build, and applies its CSS. You import from your own local `styled-system`, same as any Panda app. The app only emits what it adds; the rest is reused, not copied.

This app installs `@pandacss/preset-base` and `@pandacss/preset-panda` as dev dependencies. The design system's recipes are built on Panda's default scales (`h-9`, `text-sm`, spacing), and its exported preset references those two presets by name — so a consuming Panda app needs them installed to resolve them. You don't list them in `presets`; `designSystem` pulls them in.

### Extend, don't fork

This app adds one token in its own config:

```ts
theme: {
  extend: {
    tokens: {
      colors: { brand: { value: '#5b8def' } },
    },
  },
}
```

`brand` sits next to the design system's tokens. The homepage shows it next to the DS `primary` swatch — same system, one addition. See `components/showcase-extend.tsx`.

## Run it

```bash
pnpm install
pnpm dev
```

`panda build` runs before `next dev`, generating `styled-system` and the stylesheet. Open http://localhost:3000 and toggle light/dark in the header.

## The design system

The design system is the [`pandacn`](https://npmx.dev/pandacn) package, installed from npm. Its source lives in [`examples/monorepo/packages/ds`](../monorepo/packages/ds). `designSystem: 'pandacn'` in `panda.config.ts` pulls its tokens and recipes into this app's build.
