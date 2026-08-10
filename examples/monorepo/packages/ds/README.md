# @chakra-ui/shadcn-panda

[shadcn/ui](https://ui.shadcn.com/) modeled as a [Panda CSS](https://panda-css.com) design system. Same components, same look, built at build time instead of shipped as source you paste in.

You get shadcn's tokens and components as a real package: semantic tokens with light and dark, recipes ported from shadcn's `cva` definitions, and thin React wrappers. Ship it once with `panda lib`; apps consume it through `designSystem` or as a prebuilt CSS file.

## Install

```bash
pnpm add @chakra-ui/shadcn-panda
```

## Use it in a Panda app

Point Panda at the package. It merges the tokens and recipes into your build.

```ts
// panda.config.ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  designSystem: '@chakra-ui/shadcn-panda',
  include: ['./app/**/*.{ts,tsx}'],
})
```

```tsx
import { Button, Card } from '@chakra-ui/shadcn-panda'
```

## Use it without Panda

Import the prebuilt stylesheet and the components. No Panda, no config.

```tsx
import '@chakra-ui/shadcn-panda/styles.css'
import { Button } from '@chakra-ui/shadcn-panda'
```

## Dark mode

Class-based, like shadcn. Toggle `.dark` on `<html>` and the tokens flip.

## Components

Button, Badge, Card, Input, Textarea, Label, Alert, Separator, Avatar, Skeleton, Switch, Tabs.

## Exports

| Entry | What it is |
| --- | --- |
| `.` | React components |
| `./styles.css` | Prebuilt stylesheet (tokens, recipes, every variant) |
| `./panda/*` | Machine artifacts for `designSystem` consumers |
| `./css`, `./recipes`, `./tokens`, `./jsx` | Generated styled-system, for overlay re-exports |

See the [example apps](https://github.com/chakra-ui/panda-examples) for all three consumption paths.
