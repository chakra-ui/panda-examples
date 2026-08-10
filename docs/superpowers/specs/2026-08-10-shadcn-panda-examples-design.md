# Design: shadcn-in-Panda-v2 starter examples

**Date:** 2026-08-10
**Status:** Approved (design), pending spec review
**Repo:** `panda-examples`

## Goal

Give large companies / projects a way to *instantly* adopt a design system on
Panda CSS **v2**. Ship three standalone, copyable starter examples (per the
repo's `vercel/next.js/examples` convention) that all consume one design
system modeling **shadcn/ui**.

The three scenarios:

1. Design system in a **monorepo**.
2. Design system **shipped to npm + non-panda app**.
3. Design system **shipped to npm + panda app**.

## Decisions (locked)

| Decision | Choice |
| --- | --- |
| Consuming app framework | **Next.js (App Router)** |
| npm delivery | **Publish a real package** (publish itself is a user-gated final step) |
| DS component scope | **Broad set (~10–12 components)** |
| Monorepo tooling | **pnpm workspaces + Turborepo** |
| npm package name | **`@chakra-ui/shadcn-panda`** |
| DS source of truth | **Inside the monorepo example** (`packages/ds`); examples 2 & 3 consume the npm build |
| Dark mode | **Class-based (`.dark`)**, matching shadcn |
| DS palette | **Faithful shadcn** (near-black primary, zinc neutrals). Panda yellow appears **only in the page frame** |
| Showcase pages | On-brand Panda-branded showcase per the talk deck (see Visual design) |
| Display font | **Space Grotesk** via `next/font` (self-hosted, no runtime dep) |
| Publishing | **Out of scope — handled externally ("Sage").** This work only builds; it never runs `npm publish` |

## The shared artifact: `@chakra-ui/shadcn-panda`

A Panda v2 design system modeling shadcn/ui. It lives at
`examples/design-system-monorepo/packages/ds` and is the published npm package.
Built with `panda lib`.

### Tokens

shadcn's CSS-variable theme, translated to Panda:

- **`semanticTokens.colors`** with a class-based `_dark` condition for each
  semantic pair: `background`/`foreground`, `card`(+`.foreground`),
  `popover`(+`.foreground`), `primary`(+`.foreground`),
  `secondary`(+`.foreground`), `muted`(+`.foreground`), `accent`(+`.foreground`),
  `destructive`(+`.foreground`), `border`, `input`, `ring`.
  Values taken verbatim from shadcn `new-york-v4` (`oklch(...)`), light in the
  base condition, dark under `_dark`.
- **`tokens.radii`**: `sm`/`md`/`lg`/`xl` derived from shadcn's
  `--radius: 0.625rem` scale.
- Dark condition defined in config as `conditions.extend.dark: '.dark &'` so
  toggling a `.dark` class on `<html>` flips the theme (shadcn parity).

### Recipes (from shadcn `cva` definitions → `defineRecipe`)

~10–12 components. Each recipe's `base` + `variants` are a direct port of the
corresponding shadcn `cva()` call in `apps/v4/registry/new-york-v4/ui/*`:

Button, Badge, Card, Input, Label, Alert, Separator, Avatar, Skeleton, Tabs,
Switch, Textarea.

Recipes registered under `theme.recipes` (or `slotRecipes` for multi-part
components like Card/Alert/Tabs where shadcn splits sub-parts).

### React components

Thin JSX wrappers, one folder per component under `src/`, mirroring shadcn's
structure: forward props, preserve `data-slot`/`data-variant`/`data-size`
attributes, accept `className`. They consume the generated recipes from the
local `styled-system`.

`src/index.ts` re-exports every component + `buttonVariants`-style recipe fns.

### Build & exports

`package.json` scripts:

- `codegen`: `panda codegen`
- `lib`: `panda codegen && panda lib` — emits `dist/panda/{lib.json,buildinfo.json,preset.mjs}` and syncs `exports` for `./panda/*`, `./css`, `./recipes`, `./jsx`, etc.
- `css`: `panda cssgen --outfile dist/styles.css` — a single prebuilt stylesheet (reset + tokens + all recipes) for **non-panda** consumers.
- `build`: runs codegen + lib + css + tsc/bundle for the React components.

`exports` (final shape):

- `.` → built React components (`./dist/index.js` + types)
- `./styles.css` → prebuilt stylesheet
- `./panda/*` → machine artifacts (for `designSystem` consumers)
- `./css`, `./recipes`, `./jsx`, `./tokens` → styled-system roots (synced by `panda lib`)

`peerDependencies`: `@pandacss/dev@^2.0.0` (needed only by panda consumers,
`react >=18`). The non-panda app never installs Panda.

## Example 1 — `examples/design-system-monorepo`

pnpm workspaces + Turborepo. Structure:

```
design-system-monorepo/
  pnpm-workspace.yaml
  turbo.json
  package.json
  packages/
    ds/                      # @chakra-ui/shadcn-panda (source of truth)
  apps/
    web/                     # Next.js App Router
```

- `apps/web/panda.config.ts`: `designSystem: '@chakra-ui/shadcn-panda'` with the DS as `workspace:*`.
- `turbo.json` pipeline: `ds#lib` → `web#build`; `web` depends on `^lib`.
- `apps/web` prebuild: `panda build` → `styled-system/styles.css`, imported in `app/layout.tsx`.
- Demo page renders every component in light + dark (a `.dark` toggle).

**`workspace:*` is correct here** — this example *is* a workspace. The README's
"no `workspace:*`" rule applies to standalone (non-workspace) examples 2 & 3.

## Example 2 — `examples/npm-ds-non-panda-app`

Next.js App Router, **no Panda installed**.

- `package.json` pins `@chakra-ui/shadcn-panda@<published version>` (real npm version, per README).
- `app/layout.tsx`: `import '@chakra-ui/shadcn-panda/styles.css'`.
- `app/page.tsx`: `import { Button, Card, Badge } from '@chakra-ui/shadcn-panda'` and render them.
- No `panda.config.ts`, no build step beyond `next build`.
- Proves: a team with zero Panda knowledge consumes the DS as plain CSS + React.

## Example 3 — `examples/npm-ds-panda-app`

Next.js App Router **with its own Panda**.

- Pins `@chakra-ui/shadcn-panda@<version>` + `@pandacss/dev@beta`.
- `panda.config.ts`: `designSystem: '@chakra-ui/shadcn-panda'`, `include: ['./app/**/*.{ts,tsx}']`, `theme.extend.tokens` adding a local brand color to prove token merge.
- `"predev"/"prebuild": "panda build"` → local `styled-system` + `styles.css` imported in layout.
- `app/page.tsx`: uses DS components **and** local `css()`/`token()` from the app's own `styled-system` (showing the merged system: DS tokens + app extension).
- Proves: consuming the shipped DS via `designSystem` and extending it locally.

## Visual design — the showcase home page

Every example ships a polished, **on-brand** home page (not a bare component
grid), modeled on the author's talk deck (`my-talks/design-systems/deck.pdf`).
The DS components stay **stock shadcn**; the *page frame* carries the Panda
brand. This tells the real story: classic shadcn components rendered on a
Panda-branded page.

### Frame brand tokens (from the deck)

| Role | Value |
| --- | --- |
| canvas (bg) | `#FAF8F3` warm cream |
| ink (fg) | `#16150F` near-black |
| brand accent | `#FACC15` panda yellow |
| eyebrow | `#A16207` mustard/amber-700 |
| muted | `#6F6E66` warm gray |
| frame card | `#EFEEE8` warm light gray |
| chakra nod | `#2AA79B` teal (small "powered by" accent) |
| glow | radial amber, ~0.14 alpha, top-right |

### Page anatomy (shared across all three examples)

1. **Hero** — Panda logo badge (`panda/assets/logo-main.svg`, copied into each
   app's `public/`), a mustard tracked-uppercase eyebrow
   (`PANDA CSS v2 · DESIGN SYSTEM STARTER`), a big tight-leading Space Grotesk
   heading naming the example, one muted body line, and the amber radial glow
   top-right. This is the "logo on init" moment.
2. **Component gallery** — soft frame-card sections showing every DS component:
   buttons (all variants + sizes), badges, card, input + label, alert,
   separator, avatar, skeleton, tabs, switch, textarea. Proves the DS renders.
3. **`.dark` toggle** — a switch in the header toggles `.dark` on `<html>`,
   flipping the shadcn components live (class-based dark parity).
4. **Footer** — small Panda "P" badge + example name (left), `Panda CSS v2`
   marker (right), matching the deck footer.

### Fonts

`next/font/google` loads **Space Grotesk** (display) + **Inter** (body),
self-hosted at build time — no runtime font dependency. Same setup in all
three Next.js apps.

### How the frame is styled per example

- **Panda examples (1 & 3):** the app's own `panda.config.ts` adds the frame
  brand tokens under `theme.extend`; the page chrome uses the app's local
  `css()`/`token()`. DS components come from `@chakra-ui/shadcn-panda`.
- **Non-panda example (2):** no Panda available, so the frame is a small plain
  global CSS file (`app/frame.css`) with the brand values as CSS variables. DS
  components + `@chakra-ui/shadcn-panda/styles.css` supply everything else. Keeps
  the app genuinely Panda-free.

Each example's home page is intentionally **duplicated, not shared** — these are
standalone degit-able starters (like `vercel/next.js/examples`); a shared UI
package would break the copy-one-out promise.

## Cross-cutting

- **Next.js integration:** every app uses `panda build` as a `prebuild`/`predev`
  script emitting `styled-system/styles.css`, imported once in the root layout.
  Chosen over the experimental v2 PostCSS plugin (the migration guide recommends
  `panda build` as the reliable fallback) and over webpack-plugin config that
  Turbopack ignores.
- **Node/ESM:** all packages `"type": "module"`, `engines.node >= 22` where Panda
  is present (v2 is ESM-only, Node 22+).
- **Each example** gets its own `README.md`, `.gitignore`, pinned deps, and
  `dev`/`build` scripts, and must pass `pnpm run check-examples` from repo root.
- **Publishing is out of scope** — handled externally ("Sage"). This work never
  runs `npm publish`. The DS is fully structured, versioned, and `panda lib`-built
  so it's publish-ready; examples 2 & 3 pin `@chakra-ui/shadcn-panda@<version>`.
  Until Sage publishes, those two examples install/verify against a local
  `pnpm pack` tarball of the DS (see Testing).

## Out of scope

- Porting *all* shadcn components (only the ~12 above).
- Storybook / docs site for the DS.
- **`npm publish` and any publish automation — handled externally ("Sage").**
- Non-React frameworks.

## Testing / verification

- `pnpm run check-examples` (installs + builds each standalone example) is the
  primary gate. Example 1 additionally verifies the workspace `turbo run build`
  chain.
- A per-component visual demo page in each app doubles as a smoke test that
  tokens + recipes render in light and dark.
- Note: examples 2 & 3 depend on the published DS. Since publishing is external,
  verify them against a local `pnpm pack` tarball of the DS (install the tarball,
  build, confirm the showcase renders), then restore the pinned npm version.
