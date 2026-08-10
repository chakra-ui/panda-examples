# shadcn-in-Panda-v2 Starter Examples — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship three standalone, on-brand Next.js starter examples that consume one shadcn-modeled Panda v2 design system — for a monorepo, an npm+non-panda app, and an npm+panda app.

**Architecture:** One design system package (`@chakra-ui/shadcn-panda`) built with `panda lib` is the single source of truth, living inside the monorepo example. Two other examples consume it as a published npm dep (verified locally via `pnpm pack`). Every app is Next.js App Router, styles its page frame with the author's Panda-brand deck aesthetic, and renders stock shadcn components inside.

**Tech Stack:** Panda CSS v2 (`@pandacss/dev@beta` = `2.0.0-beta.12`), Next.js 16.3, React 19, pnpm 10 workspaces, Turborepo, `next/font` (Space Grotesk + Inter).

## Global Constraints

- **Node ≥ 22, ESM only.** All packages `"type": "module"`. (Panda v2 is ESM-only, Node 22+.)
- **Panda pinned to `2.0.0-beta.12`** everywhere Panda appears. All `@pandacss/*` share this version.
- **Next.js `16.3.0`, React `19.2.0`, react-dom `19.2.0`** in every app.
- **Standalone examples (2 & 3):** deps pinned to real published versions, **never `workspace:*`**. Example 1 is itself a workspace, so `workspace:*` is correct there only.
- **DS palette = faithful shadcn** (near-black primary, zinc neutrals, oklch values from `shadcn-ui/apps/v4/registry/new-york-v4` + `app/globals.css`). Panda yellow **only** in the page frame.
- **Frame brand tokens:** canvas `#FAF8F3`, ink `#16150F`, brand `#FACC15`, eyebrow `#A16207`, muted `#6F6E66`, frame-card `#EFEEE8`, teal `#2AA79B`, glow = radial amber ~0.14 alpha top-right.
- **Dark mode:** class-based, `.dark` on `<html>`; DS condition `dark: '.dark &'`.
- **Next integration:** `"predev"`/`"prebuild": "panda build"` → `styled-system/styles.css`, imported once in `app/layout.tsx`. No PostCSS/webpack plugin.
- **Publishing is out of scope** ("Sage"). Never run `npm publish`.
- **DS package name:** `@chakra-ui/shadcn-panda`, version `0.1.0`. npm examples pin `@chakra-ui/shadcn-panda@^0.1.0`.
- **Fonts:** `next/font/google` Space Grotesk (display) + Inter (body), self-hosted.
- **Logo asset:** copy `chakra/panda/assets/logo-main.svg` (+ `logo-black.svg` for dark) into each app's `public/`.
- **Verification model:** this is scaffolding/config work — the meaningful check per task is *installs + builds + typechecks + renders*, not unit tests. Each task ends by running the relevant build/`panda build`/`next build` and confirming success, then commit.

---

## File Structure

```
examples/
  design-system-monorepo/            # Example 1
    pnpm-workspace.yaml, turbo.json, package.json, .gitignore, README.md
    packages/ds/                     # @chakra-ui/shadcn-panda (source of truth)
      package.json, panda.config.ts, tsconfig.json, tsup.config.ts
      src/theme/{tokens,semantic-tokens,recipes}.ts
      src/{button,badge,card,input,label,alert,separator,avatar,skeleton,tabs,switch,textarea}/index.tsx
      src/lib/cn.ts
      src/index.ts
    apps/web/                        # Next.js app, designSystem: workspace ds
      package.json, panda.config.ts, next.config.ts, tsconfig.json, .gitignore, README.md
      app/{layout,page,globals}.{tsx,css}
      components/{showcase-*,theme-toggle}.tsx
      lib/frame.ts                   # frame token helpers via app css()
      public/logo-main.svg
  npm-ds-non-panda-app/              # Example 2 — NO panda
    package.json, next.config.ts, tsconfig.json, .gitignore, README.md
    app/{layout,page,frame.css}.tsx/css
    components/{showcase-*,theme-toggle}.tsx
    public/logo-main.svg
  npm-ds-panda-app/                  # Example 3 — panda + designSystem npm
    package.json, panda.config.ts, next.config.ts, tsconfig.json, .gitignore, README.md
    app/{layout,page,globals}.{tsx,css}
    components/{showcase-*,theme-toggle}.tsx
    lib/frame.ts
    public/logo-main.svg
```

Showcase page code (hero + gallery + toggle + footer) is intentionally duplicated across the three apps (standalone degit rule).

---

## Phase A — The Design System (`@chakra-ui/shadcn-panda`)

### Task A1: DS package skeleton + Panda config with shadcn tokens

**Files:**
- Create: `examples/design-system-monorepo/packages/ds/package.json`
- Create: `examples/design-system-monorepo/packages/ds/panda.config.ts`
- Create: `examples/design-system-monorepo/packages/ds/tsconfig.json`
- Create: `examples/design-system-monorepo/packages/ds/src/theme/tokens.ts`
- Create: `examples/design-system-monorepo/packages/ds/src/theme/semantic-tokens.ts`

**Interfaces:**
- Produces: `panda.config.ts` default export (Panda config); `styled-system/` after codegen with `css`, `token`, recipe fns.

- [ ] **Step 1: `package.json`** — name `@chakra-ui/shadcn-panda`, version `0.1.0`, `"type":"module"`, `"exports": { ".": "./dist/index.js" }` (will be extended by `panda lib`), scripts: `codegen: panda codegen`, `lib: panda codegen && panda lib`, `css: panda cssgen --outfile dist/styles.css`, `build: pnpm codegen && pnpm lib && pnpm css && tsup`. `peerDependencies`: `@pandacss/dev` `2.0.0-beta.12`, `react >=18`. `devDependencies`: `@pandacss/dev` `2.0.0-beta.12`, `@pandacss/preset-base` `2.0.0-beta.12`, `tsup`, `typescript`, `@types/react` `19.2.7`, `react` `19.2.0`. `files: ["dist","styled-system","src"]`.

- [ ] **Step 2: `src/theme/tokens.ts`** — export `tokens` with `radii` from shadcn `--radius: 0.625rem` scale (`sm .375rem`, `md .5rem`, `lg .625rem`, `xl .875rem`) and `fonts` (inherit). Raw palette not needed — shadcn uses oklch directly in semantic tokens.

- [ ] **Step 3: `src/theme/semantic-tokens.ts`** — export `semanticTokens.colors` for every shadcn semantic pair, values copied verbatim (light in `base`, dark in `_dark`) from `shadcn-ui/apps/v4/app/globals.css`:
  ```ts
  export const semanticTokens = {
    colors: {
      background: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.145 0 0)' } },
      foreground: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
      card: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.205 0 0)' } },
      'card.foreground': { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
      popover: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.205 0 0)' } },
      'popover.foreground': { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
      primary: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.922 0 0)' } },
      'primary.foreground': { value: { base: 'oklch(0.985 0 0)', _dark: 'oklch(0.205 0 0)' } },
      secondary: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.269 0 0)' } },
      'secondary.foreground': { value: { base: 'oklch(0.205 0 0)', _dark: 'oklch(0.985 0 0)' } },
      muted: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.269 0 0)' } },
      'muted.foreground': { value: { base: 'oklch(0.556 0 0)', _dark: 'oklch(0.708 0 0)' } },
      accent: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.371 0 0)' } },
      'accent.foreground': { value: { base: 'oklch(0.205 0 0)', _dark: 'oklch(0.985 0 0)' } },
      destructive: { value: { base: 'oklch(0.577 0.245 27.325)', _dark: 'oklch(0.704 0.191 22.216)' } },
      'destructive.foreground': { value: { base: 'oklch(0.97 0.01 17)', _dark: 'oklch(0.985 0 0)' } },
      border: { value: { base: 'oklch(0.922 0 0)', _dark: 'oklch(1 0 0 / 10%)' } },
      input: { value: { base: 'oklch(0.922 0 0)', _dark: 'oklch(1 0 0 / 15%)' } },
      ring: { value: { base: 'oklch(0.708 0 0)', _dark: 'oklch(0.556 0 0)' } },
    },
  }
  ```

- [ ] **Step 4: `panda.config.ts`**
  ```ts
  import { defineConfig } from '@pandacss/dev'
  import { tokens } from './src/theme/tokens'
  import { semanticTokens } from './src/theme/semantic-tokens'
  import { recipes } from './src/theme/recipes'

  export default defineConfig({
    presets: ['@pandacss/preset-base'],
    include: ['src/**/*.{ts,tsx}'],
    outdir: 'styled-system',
    jsxFramework: 'react',
    conditions: { extend: { dark: '.dark &' } },
    theme: { tokens, semanticTokens, recipes },
  })
  ```
  (Task A2 creates `recipes`; until then, temporarily set `recipes: {}` inline so codegen runs.)

- [ ] **Step 5: `tsconfig.json`** — standard React ESM config (`"module":"esnext"`, `"moduleResolution":"bundler"`, `"jsx":"react-jsx"`, `"strict":true`).

- [ ] **Step 6: Install + codegen.** From `packages/ds`: create a temporary root `pnpm-workspace.yaml` (Task B1 finalizes it) or run in isolation. Run `pnpm install` then `pnpm codegen`.
  Expected: `styled-system/` generated with `css`, `tokens`, `recipes` dirs, no errors.

- [ ] **Step 7: Commit** — `git add ... && git commit -m "feat(ds): panda config with shadcn semantic tokens"`

### Task A2: Recipes ported from shadcn cva definitions

**Files:**
- Create: `examples/design-system-monorepo/packages/ds/src/theme/recipes.ts`
- Modify: `packages/ds/panda.config.ts` (import real `recipes`)

**Interfaces:**
- Consumes: token/semantic-token names from A1 (e.g. `primary`, `secondary`, `accent`, `border`, `ring`).
- Produces: `recipes` object → generates `button`, `badge`, `input`, `textarea`, `label`, `skeleton`, `separator`, `avatar`, `switchRecipe` recipe fns; `slotRecipes` for `card`, `alert`, `tabs`. Each exported recipe fn name matches `styled-system/recipes`.

- [ ] **Step 1: Port `button`** from `shadcn-ui/apps/v4/registry/new-york-v4/ui/button.tsx` `buttonVariants` into `defineRecipe` — base + `variant` (default/destructive/outline/secondary/ghost/link) + `size` (default/sm/lg/icon), mapping Tailwind utilities to Panda props referencing semantic tokens (`bg: 'primary'`, `color: 'primary.foreground'`, `_hover: { bg: 'primary/90' }` → use `color-mix` or token opacity; use `bg: 'primary'` + `_hover:{opacity:.9}` where mix unavailable). `className: 'btn'`, `defaultVariants: { variant:'default', size:'default' }`.

- [ ] **Step 2: Port `badge`, `input`, `textarea`, `label`, `skeleton`, `separator`, `avatar`, `switch`** as `defineRecipe`s the same way (read each `*.tsx` in the shadcn registry dir; single-part → recipe).

- [ ] **Step 3: Port `card`, `alert`, `tabs`** as `defineSlotRecipe`s (multi-part: card=root/header/title/description/content/footer; alert=root/title/description; tabs=list/trigger/content).

- [ ] **Step 4: Wire into config** — import `recipes` (and split `slotRecipes`) into `theme`. Run `pnpm codegen`.
  Expected: `styled-system/recipes/` contains `button`, `badge`, `card`, etc.; typecheck clean (`pnpm exec tsc --noEmit`).

- [ ] **Step 5: Commit** — `feat(ds): recipes ported from shadcn cva`

### Task A3: React components + barrel export

**Files:**
- Create: `packages/ds/src/lib/cn.ts`
- Create: `packages/ds/src/<component>/index.tsx` (12 components)
- Create: `packages/ds/src/index.ts`
- Create: `packages/ds/tsup.config.ts`

**Interfaces:**
- Consumes: recipe fns from `../styled-system/recipes` (e.g. `button`, `badge`), `css`/`cx` from `../styled-system/css`.
- Produces: named exports `Button, Badge, Card, CardHeader, ..., Input, Label, Alert, Separator, Avatar, Skeleton, Tabs, Switch, Textarea` and recipe fns re-exported. `src/index.ts` is the `.` entry.

- [ ] **Step 1: `cn.ts`** — `export const cn = (...a: (string|undefined|false)[]) => a.filter(Boolean).join(' ')` (thin, no clsx dep). `// ponytail: shadcn uses clsx+twMerge; Panda class output doesn't need merge`.

- [ ] **Step 2: Component wrappers** — each mirrors shadcn's JSX (forward props, `data-slot`/`data-variant`, `asChild` omitted unless trivial), className via recipe fn: e.g. `Button` uses `button({ variant, size })` + `cn`. Multi-part use slot recipe fns.

- [ ] **Step 3: `src/index.ts`** — re-export every component + recipe fns (`export { button as buttonVariants } from '../styled-system/recipes'`).

- [ ] **Step 4: `tsup.config.ts`** — bundle `src/index.ts` → `dist/index.js` (ESM) + `.d.ts`, `external: ['react','react/jsx-runtime']`, `outDir: dist`.

- [ ] **Step 5: Build the lib fully** — run `pnpm build` (codegen → lib → css → tsup).
  Expected: `dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `dist/panda/{lib.json,buildinfo.json,preset.mjs}`; `package.json` `exports` updated by `panda lib` to include `./panda/*`, `./css`, `./recipes`, `./jsx`. Confirm `./styles.css` and `.` exports present (add manually if `panda lib` didn't).

- [ ] **Step 6: Commit** — `feat(ds): react components, barrel, build pipeline`

---

## Phase B — Example 1: monorepo (`design-system-monorepo`)

### Task B1: Workspace + Turborepo scaffold

**Files:**
- Create: `examples/design-system-monorepo/{package.json,pnpm-workspace.yaml,turbo.json,.gitignore,README.md}`

**Interfaces:**
- Produces: workspace resolving `packages/*` + `apps/*`; `turbo run build` pipeline `ds#lib` before `web#build`.

- [ ] **Step 1:** `pnpm-workspace.yaml` → `packages: ['packages/*','apps/*']`.
- [ ] **Step 2:** root `package.json` — `"type":"module"`, `packageManager: pnpm@10.15.0`, `devDependencies: { turbo: "^2" }`, scripts `build: turbo run build`, `dev: turbo run dev`.
- [ ] **Step 3:** `turbo.json` — `tasks: { lib: { outputs: ["dist/**","styled-system/**"] }, build: { dependsOn: ["^lib"], outputs: [".next/**"] }, dev: { cache:false, persistent:true } }`.
- [ ] **Step 4:** `.gitignore` (node_modules, .next, styled-system, dist, .turbo), `README.md` (what it demonstrates, `pnpm install && pnpm dev`).
- [ ] **Step 5:** `pnpm install` at example root. Expected: DS resolves as workspace pkg.
- [ ] **Step 6: Commit** — `feat(ex1): monorepo workspace + turborepo scaffold`

### Task B2: Next.js app consuming the workspace DS

**Files:**
- Create: `apps/web/{package.json,panda.config.ts,next.config.ts,tsconfig.json,.gitignore}`
- Create: `apps/web/app/{layout.tsx,globals.css,page.tsx}`
- Create: `apps/web/public/logo-main.svg`

**Interfaces:**
- Consumes: `@chakra-ui/shadcn-panda` (`workspace:*`) components + `designSystem` machine artifacts.
- Produces: running Next app importing local `styled-system/styles.css`.

- [ ] **Step 1:** `apps/web/package.json` — deps `@chakra-ui/shadcn-panda: "workspace:*"`, `next 16.3.0`, `react/react-dom 19.2.0`; devDeps `@pandacss/dev 2.0.0-beta.12`, `@pandacss/preset-base`, `typescript`, `@types/*`. scripts: `predev/prebuild: panda build`, `dev: next dev`, `build: next build`, `lib` N/A.
- [ ] **Step 2:** `panda.config.ts` — `designSystem: '@chakra-ui/shadcn-panda'`, `include:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}']`, `outdir:'styled-system'`, `jsxFramework:'react'`, `conditions.extend.dark:'.dark &'`, `theme.extend.tokens` adds frame brand tokens (canvas/ink/brand/eyebrow/muted/frameCard/teal colors + a `glow` value).
- [ ] **Step 3:** copy `chakra/panda/assets/logo-main.svg` → `public/logo-main.svg`.
- [ ] **Step 4:** `app/globals.css` = `@layer reset,base,tokens,recipes,utilities;` then `@import '../styled-system/styles.css';` — actually import generated css directly; add `html,body{margin:0}` + canvas bg.
- [ ] **Step 5:** `app/layout.tsx` — `next/font` Space Grotesk + Inter, `<html lang suppressHydrationWarning>`, import `globals.css`, body uses fonts.
- [ ] **Step 6:** `next.config.ts` — `transpilePackages: ['@chakra-ui/shadcn-panda']`, `experimental` none needed.
- [ ] **Step 7:** minimal `page.tsx` rendering one `<Button>` (real showcase in B3).
- [ ] **Step 8:** `panda build` then `next build`. Expected: build success, styles.css generated.
- [ ] **Step 9: Commit** — `feat(ex1): next app wired to workspace DS`

### Task B3: On-brand showcase page + components

**Files:**
- Create: `apps/web/lib/frame.ts`
- Create: `apps/web/components/theme-toggle.tsx`
- Create: `apps/web/components/showcase-{hero,gallery,footer}.tsx`
- Modify: `apps/web/app/page.tsx`

**Interfaces:**
- Consumes: app `css()`/`token()` from local `../styled-system/css`; DS components from `@chakra-ui/shadcn-panda`.
- Produces: full showcase page (hero + gallery + `.dark` toggle + footer). This page's code is the canonical version copied (adapted) into Examples 2 & 3.

- [ ] **Step 1:** `theme-toggle.tsx` (`'use client'`) — button toggling `document.documentElement.classList.toggle('dark')`, persists to `localStorage`, reads on mount.
- [ ] **Step 2:** `showcase-hero.tsx` — logo `<img>`, mustard eyebrow (tracked uppercase), Space Grotesk H1 = example name, muted subline, amber radial-gradient glow via `css({ position, bgGradient/backgroundImage })` using frame tokens.
- [ ] **Step 3:** `showcase-gallery.tsx` — frame-card sections rendering every DS component with all variants (buttons ×6 variants ×4 sizes, badges, card, input+label, alert, separator, avatar, skeleton, tabs, switch, textarea).
- [ ] **Step 4:** `showcase-footer.tsx` — small logo + example name left, `Panda CSS v2 · shadcn` right.
- [ ] **Step 5:** `page.tsx` composes hero+gallery+footer; header has theme toggle.
- [ ] **Step 6:** `panda build && next build`, then `next dev` + curl `http://127.0.0.1:3000` to confirm 200 + HTML contains the heading and `btn` class. Expected: renders, no console errors in build.
- [ ] **Step 7: Commit** — `feat(ex1): on-brand showcase page`

---

## Phase C — Pack the DS for npm examples

### Task C1: Produce a local DS tarball

**Files:** none (artifact only).

- [ ] **Step 1:** From `packages/ds`, `pnpm build` then `pnpm pack --pack-destination <repo>/.ds-tarball`. Produces `chakra-ui-shadcn-panda-0.1.0.tgz`.
- [ ] **Step 2:** Sanity: `tar -tzf` the tgz; confirm it contains `dist/index.js`, `dist/styles.css`, `dist/panda/lib.json`, `styled-system/`, and `package.json` with the synced `exports`.
- [ ] **Step 3:** No commit (tarball is git-ignored; add `.ds-tarball/` to root `.gitignore`).

*(Examples 2 & 3 pin `@chakra-ui/shadcn-panda@^0.1.0`. For local verification, temporarily install the tarball via `pnpm add ./path.tgz`, build, then revert package.json to the pinned npm range before commit.)*

---

## Phase D — Example 2: npm DS + non-panda app (`npm-ds-non-panda-app`)

### Task D1: Next.js app, zero Panda

**Files:**
- Create: `examples/npm-ds-non-panda-app/{package.json,next.config.ts,tsconfig.json,.gitignore,README.md}`
- Create: `app/{layout.tsx,page.tsx,frame.css}`
- Create: `components/{theme-toggle,showcase-hero,showcase-gallery,showcase-footer}.tsx`
- Create: `public/logo-main.svg`

**Interfaces:**
- Consumes: `@chakra-ui/shadcn-panda` (`^0.1.0`) — components (`.`) + `./styles.css`. **No `@pandacss/*` deps.**
- Produces: Next app rendering DS via prebuilt CSS only.

- [ ] **Step 1:** `package.json` — deps: `@chakra-ui/shadcn-panda ^0.1.0`, `next 16.3.0`, `react/react-dom 19.2.0`; devDeps: `typescript`, `@types/*` only. scripts: `dev: next dev`, `build: next build`. No panda scripts.
- [ ] **Step 2:** `app/frame.css` — plain CSS: `:root` brand vars (canvas/ink/brand/eyebrow/muted/frame-card/teal), `.dark` overrides for frame if needed, base `body{background,color,font}`, `.eyebrow`, `.glow`, `.frame-card` classes (hand-written, since no Panda).
- [ ] **Step 3:** `app/layout.tsx` — `next/font` Space Grotesk + Inter; `import '@chakra-ui/shadcn-panda/styles.css'`; `import './frame.css'`.
- [ ] **Step 4:** copy `logo-main.svg` to `public/`.
- [ ] **Step 5:** showcase components — same structure as B3 but chrome styled with `className` + `frame.css` classes/inline style (no `css()`), DS components imported from the package root.
- [ ] **Step 6:** Verify with tarball: `pnpm add ./<repo>/.ds-tarball/*.tgz`, `pnpm i`, `next build`, `next dev` + curl 200. Then revert dep to `^0.1.0`.
- [ ] **Step 7: Commit** — `feat(ex2): npm DS + non-panda next app`

---

## Phase E — Example 3: npm DS + panda app (`npm-ds-panda-app`)

### Task E1: Next.js app with its own Panda + designSystem

**Files:**
- Create: `examples/npm-ds-panda-app/{package.json,panda.config.ts,next.config.ts,tsconfig.json,.gitignore,README.md}`
- Create: `app/{layout.tsx,globals.css,page.tsx}`
- Create: `components/{theme-toggle,showcase-hero,showcase-gallery,showcase-footer}.tsx`
- Create: `lib/frame.ts`
- Create: `public/logo-main.svg`

**Interfaces:**
- Consumes: `@chakra-ui/shadcn-panda ^0.1.0` (components + `designSystem` artifacts) + `@pandacss/dev@beta`.
- Produces: Next app whose local `panda build` virtualizes DS + emits app deltas; demonstrates local token extend.

- [ ] **Step 1:** `package.json` — deps: `@chakra-ui/shadcn-panda ^0.1.0`, `next`, `react`, `react-dom`; devDeps: `@pandacss/dev 2.0.0-beta.12`, `@pandacss/preset-base`, `typescript`, `@types/*`. scripts: `predev/prebuild: panda build`, `dev`, `build`.
- [ ] **Step 2:** `panda.config.ts` — `designSystem: '@chakra-ui/shadcn-panda'`, `include`, `outdir`, `conditions.extend.dark`, `theme.extend.tokens` adds **both** frame brand tokens **and** a demo brand override (e.g. `colors.brand: { value:'#5b8def' }` per deck slide 11) to prove token merge.
- [ ] **Step 3:** `app/globals.css` imports local `../styled-system/styles.css`.
- [ ] **Step 4:** `layout.tsx` (fonts), `next.config.ts` (`transpilePackages`).
- [ ] **Step 5:** showcase — chrome via app `css()`/`token()` (frame tokens are local), plus one panel using the app's own extended token to visibly demonstrate "extend, don't fork" (a swatch of `brand`).
- [ ] **Step 6:** copy logo.
- [ ] **Step 7:** Verify with tarball (install tgz, `panda build`, `next build`, dev curl 200), revert dep to `^0.1.0`.
- [ ] **Step 8: Commit** — `feat(ex3): npm DS + panda next app`

---

## Phase F — Repo integration

### Task F1: check-examples + top-level docs

**Files:**
- Modify: `README.md` (list the three examples)
- Modify: `.gitignore` (add `.ds-tarball/`)
- Review: `scripts/check-examples.sh`

**Interfaces:** none.

- [ ] **Step 1:** Read `scripts/check-examples.sh`; confirm it iterates `examples/*` installing + building. Note that examples 2 & 3 need the published DS (or tarball); document in each README that they require `@chakra-ui/shadcn-panda` published (Sage) or a local tarball for offline verify.
- [ ] **Step 2:** Update root `README.md` "Structure"/example list with the three example names + one-line each.
- [ ] **Step 3:** Add `.ds-tarball/` to root `.gitignore`.
- [ ] **Step 4:** Run `pnpm run check-examples` (example 1 must pass fully; 2 & 3 pass when tarball/published present — otherwise document the expected skip).
- [ ] **Step 5: Commit** — `docs: register shadcn-panda examples in repo`

---

## Self-Review

**Spec coverage:** DS (A1–A3) ✓, monorepo (B1–B3) ✓, npm+non-panda (D1) ✓, npm+panda (E1) ✓, showcase/visual (B3 + copied to D1/E1) ✓, tokens/recipes faithful shadcn (A1/A2) ✓, class dark (A1 condition + toggle) ✓, `panda lib` shipping (A3/C1) ✓, publishing out-of-scope (no publish task) ✓, check-examples (F1) ✓, fonts (B2/D1/E1) ✓.

**Placeholder scan:** semantic token values are literal (from globals.css); recipe port references exact source files; no "TBD". Component-by-component recipe/JSX bodies are ported 1:1 from named shadcn source files rather than inlined here (48 files) — the source paths are exact, which is the concrete instruction.

**Type consistency:** recipe fn names (`button`,`badge`,`card`,…) consistent A2→A3; `designSystem: '@chakra-ui/shadcn-panda'` consistent B2/E1; dep range `^0.1.0` consistent D1/E1; frame token names consistent B/D/E.

**Known risk:** shadcn's `bg-primary/90` opacity utilities have no 1:1 Panda token; port uses `_hover:{ opacity }` or `color-mix(in oklch, token, transparent X%)`. Flagged in A2 Step 1.
