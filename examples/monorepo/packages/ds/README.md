# @chakra-ui/shadcn-panda

[shadcn/ui](https://ui.shadcn.com/) modeled as a [Panda CSS](https://panda-css.com) design system. Same components, same look, built at build time instead of shipped as source you paste in.

You get shadcn's tokens and components as a real package: semantic tokens with light and dark, recipes ported from shadcn's `cva` definitions, and thin React wrappers. Ship it once with `panda lib`; apps consume it through `designSystem` or as a prebuilt CSS file.

## Getting it

This package isn't on npm. The [example apps](https://github.com/chakra-ui/panda-examples) bundle it as a tarball built with `panda lib`, so they install it offline with a `file:` dependency. Copy `packages/ds` into your own repo to make it yours, or run `pnpm pack` here to produce the tarball your apps install.

## Use it in a Panda app

Point Panda at the package in your `panda.config.ts`. It merges the tokens and recipes into your build.

```ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  designSystem: '@chakra-ui/shadcn-panda',
  include: ['./app/**/*.{ts,tsx}'],
})
```

```tsx
import { Button, Card } from '@chakra-ui/shadcn-panda'
```

Install the base presets alongside it:

```bash
pnpm add -D @pandacss/preset-base @pandacss/preset-panda
```

The recipes are built on Panda's default scales (`h-9`, `text-sm`, spacing). This design system's exported preset references `@pandacss/preset-base` (utility mappings and conditions) and `@pandacss/preset-panda` (the token values) by name, so a Panda app that consumes it needs both installed to resolve them. You don't list them in your `presets` — `designSystem` pulls them in. Apps that use the prebuilt `styles.css` (below) don't need them.

## Use it without Panda

Import the prebuilt stylesheet and the components. No Panda, no config.

```tsx
import '@chakra-ui/shadcn-panda/styles.css'
import { Button } from '@chakra-ui/shadcn-panda'
```

## Dark mode

Class-based, like shadcn. Toggle `.dark` on `<html>` and the tokens flip.

## Make it your own

The source is small and readable — fork it and change what you need.

- **Rebrand it.** Edit the color values in `src/theme/semantic-tokens.ts` (light + dark) and the radius scale in `src/theme/tokens.ts`. Every component picks up the change.
- **Add a component.** Add a recipe in `src/theme/recipes.ts`, register it in `panda.config.ts`, and add a thin wrapper in `src/<name>/`. Export it from `src/index.ts`.
- **Rename the package.** Change `name` in `package.json`; consumers point `designSystem` at the new name.

Run `pnpm build` to regenerate the styled-system, the `panda lib` artifacts, and the prebuilt stylesheet.

## Components

Button, Badge, Card, Input, Textarea, Label, Alert, Separator, Avatar, Skeleton, Switch, Tabs.

## Exports

| Entry                                     | What it is                                           |
| ----------------------------------------- | ---------------------------------------------------- |
| `.`                                       | React components                                     |
| `./styles.css`                            | Prebuilt stylesheet (tokens, recipes, every variant) |
| `./panda/*`                               | Machine artifacts for `designSystem` consumers       |
| `./css`, `./recipes`, `./tokens`, `./jsx` | Generated styled-system, for overlay re-exports      |

See the [example apps](https://github.com/chakra-ui/panda-examples) for all three consumption paths.
