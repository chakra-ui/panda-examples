# Agent guide: the monorepo example

This is the two-tier setup. `packages/ds` builds the design system; `apps/web` uses it. Read [`README.md`](README.md) for how it fits together and [`PANDA.md`](PANDA.md) for the Panda API. This file is the rules that keep you from breaking the setup.

## How the two packages relate

`packages/ds` is `pandacn`. It authors the system and ships it with `panda lib`. `apps/web` pulls it in through `designSystem: 'pandacn'` and a `workspace:*` dependency. The app never redeclares tokens or copies components.

## Edit the source, never the generated output

The design system's source lives in `packages/ds/src`:

- Tokens: `src/theme/tokens.ts` and `src/theme/semantic-tokens.ts`.
- Recipes: `src/theme/recipes.ts` (`defineRecipe` and `defineSlotRecipe`).
- Components: `src/<component>/index.tsx`, thin wrappers over the generated recipes from `../../styled-system/recipes`.

`styled-system/` and `dist/` are generated. Editing them does nothing that survives the next build.

## Adding a component to the design system

A new recipe has to be wired in three places or it won't ship:

1. Define it in `src/theme/recipes.ts`.
2. Register it in `packages/ds/panda.config.ts`, under `recipes` (single element) or `slotRecipes` (multi-part).
3. Export the component from `src/index.ts`.

Then rebuild the package so `apps/web` can see it.

## Rebuilding after you change the design system

`packages/ds` ships with `panda lib`, not a plain `panda build`. After editing its source, run:

```bash
pnpm -C packages/ds build   # codegen + panda lib + cssgen
```

That regenerates `styled-system/`, `dist/panda/lib.json`, and `dist/styles.css`, which is what consumers read.

## Working in apps/web

Import `css` and `cx` from the app's local `./styled-system`. Import components (`Button`, `Card`, and so on) from `pandacn`.

Don't add a `presets` array. `designSystem` pulls the presets in for you, and the two `@pandacss/preset-*` packages stay as devDependencies. `predev` and `prebuild` run `panda build` for you; if styles go missing, run `panda build` by hand.

## Conventions the design system relies on

Dark mode is class-based. The config sets `dark: '.dark &'`, and semantic tokens carry `_dark` values.

`staticCss: { recipes: '*' }` ships every variant. Consumers who take the prebuilt CSS (the `standalone-app` example) have no build step to generate variants on demand, so they need them all up front. Leave it in.
