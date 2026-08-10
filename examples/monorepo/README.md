# Design system in a monorepo

A [shadcn/ui](https://ui.shadcn.com/) design system built on **Panda CSS**, consumed by a **Next.js** app — all in one **pnpm + Turborepo** workspace.

This is the "decide once, use everywhere" setup: the design system is a workspace package, and the app pulls it in through Panda's `designSystem` config. No copy-pasted components, no re-declared tokens.

```
design-system-monorepo/
├─ packages/
│  └─ ds/          @chakra-ui/shadcn-panda — tokens, recipes, React components
└─ apps/
   └─ web/         Next.js App Router app that consumes the DS
```

## How it fits together

**`packages/ds`** authors the system with Panda and ships it with `panda lib`:

- `src/theme/*` — shadcn's semantic tokens (light + class-based `.dark`) and recipes ported from shadcn's `cva` definitions.
- `src/<component>/` — thin React wrappers over the generated recipes.
- `panda lib` emits `dist/panda/lib.json` + a preset and syncs `package.json` exports.

**`apps/web`** consumes it in one line:

```ts
// apps/web/panda.config.ts
export default defineConfig({
  designSystem: '@chakra-ui/shadcn-panda',
  // ...
})
```

Panda merges the design system's tokens and recipes into the app's own build. The app only emits what it adds (the on-brand page frame); everything else is reused, not copied.

## Run it

```bash
pnpm install
pnpm dev
```

`turbo` builds the design system (`panda lib`) before the app starts, then runs `next dev`. Open http://localhost:3000.

```bash
pnpm build   # turbo: ds lib → web build
```

## What to look at

- `packages/ds/panda.config.ts` — tokens, recipes, `.dark` condition, `staticCss`.
- `apps/web/panda.config.ts` — `designSystem` + the Panda-branded page frame tokens.
- `apps/web/app/page.tsx` — the showcase, and a live light/dark toggle.
