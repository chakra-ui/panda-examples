# How to write Panda in these examples

This is what you need to write correct Panda here and stop guessing. The examples run Panda v2 (`2.0.0-beta.12`). The authoring API is the same as v1; what changed is the compiler and the way libraries ship and get consumed. Full docs are at <https://panda-css.com>. For the beta specifics, see the [v2 migration guide](https://github.com/chakra-ui/panda/blob/main/V2_MIGRATION.md).

Panda runs at build time. You write style objects, the CLI extracts them statically and generates atomic CSS plus a typed `styled-system/`. It can't see runtime values, so style with static ones.

## Where to import from

| You want | Import from |
| --- | --- |
| `css`, `cx`, `cva`, `sva` | local `styled-system/css` |
| patterns (`stack`, `hstack`, `grid`, …) | local `styled-system/patterns` |
| pattern JSX (`<Stack>`, `<Box>`) | local `styled-system/jsx` |
| generated recipe functions | local `styled-system/recipes` |
| the `token()` helper | local `styled-system/tokens` |

Always the local `styled-system`, the one this app's `panda build` generated. Never from the `pandacn` package. The `standalone-app` example has no `styled-system` at all; see its AGENTS.md.

## Writing styles with css()

```ts
css({
  display: 'flex',
  px: '4', py: '2',              // shorthands; '4' is a spacing token
  bg: 'primary',                 // token dot-path (a semantic token)
  color: 'red.400',              // token dot-path (a scale token)
  rounded: 'md',
  width: '760px',                // arbitrary value, just a string
  background: 'var(--colors-frame-brand)', // a raw CSS var when you need one
})
```

Token names resolve to CSS vars; arbitrary values pass straight through. To read a token in JS, use `token('colors.primary')`.

## Conditions: pseudo, state, and selectors

Underscore keys are conditions. String keys with `&` are raw selectors.

```ts
css({
  color: 'ink',
  _hover: { color: 'brand' },
  _focusVisible: { boxShadow: '0 0 0 3px …' },
  _disabled: { opacity: 0.5 },
  _dark: { color: 'white' },
  '& svg': { flexShrink: 0 },
  '&[data-state=open]': { bg: 'card' },
})
```

Dark mode here is class-based. The configs set `conditions: { extend: { dark: '.dark &' } }`, so `_dark` means "somewhere under a `.dark` ancestor". Toggle `.dark` on `<html>`, and semantic tokens apply their `_dark` values on their own.

## Responsive styles

Mobile-first, keyed by breakpoint (`base`, `sm`, `md`, `lg`, `xl`, `2xl`):

```ts
css({ paddingInline: { base: '5', md: '8' }, fontSize: { base: 'sm', lg: 'md' } })
```

The array form `['5', '8']` maps to breakpoints in order. Prefer the object form; it says what it means.

## Combining classes with cx()

`cx()` joins class strings and resolves atomic conflicts, last one wins. Reach for it in any component that takes a `className`:

```ts
cx(button({ variant, size }), css({ mt: '2' }), className)
```

## Recipes for a single element

A recipe is variant-driven styling for one element. Author it with `defineRecipe`, register it in `panda.config.ts` under `theme.extend.recipes`, and Panda generates it into `styled-system/recipes`:

```ts
export const button = defineRecipe({
  className: 'btn',
  jsx: ['Button'],
  base: { display: 'inline-flex', rounded: 'md' },
  variants: {
    variant: { default: { bg: 'primary' }, ghost: { bg: 'transparent' } },
    size: { sm: { h: '8' }, md: { h: '9' } },
  },
  compoundVariants: [{ variant: 'ghost', size: 'sm', css: { px: '2' } }],
  defaultVariants: { variant: 'default', size: 'md' },
})
```

The generated function returns a class string:

```tsx
import { button } from '../../styled-system/recipes'
<button className={cx(button({ variant, size }), className)} />
```

Inline `cva({...})` from `styled-system/css` works the same but is atomic, and it emits every variant. A config recipe is JIT: it only emits variants it sees used, so a dynamic prop like `button({ variant: someProp })` falls back to `defaultVariants` unless `staticCss` ships it. That's why these examples set `staticCss: { recipes: '*' }`. One more catch: `compoundVariants` turns off responsive and conditional variant props on a config recipe. The generated function also carries `.raw()`, `.variantKeys`, and `.splitVariantProps(props)`.

## Recipes for multi-part components

For a component with several parts (a Card is root, header, title, and so on), use `defineSlotRecipe` and register it under `theme.extend.slotRecipes`. The generated function returns one class per slot:

```ts
export const card = defineSlotRecipe({
  className: 'card',
  slots: ['root', 'header', 'title'],
  base: { root: { rounded: 'lg' }, title: { fontWeight: 'semibold' } },
  variants: { size: { sm: { root: { p: '4' } } } },
  defaultVariants: { size: 'sm' },
})
// const s = card({ size: 'sm' }); s.root, s.header, s.title  are class strings
```

## Layout patterns

Patterns are prebuilt layout helpers: `stack`, `hstack`, `vstack`, `flex`, `grid`, `gridItem`, `box`, `center`, `circle`, `square`, `container`, `aspectRatio`, `bleed`, `float`, `spacer`, `divider`, `wrap`, `cq`, `linkOverlay`, `visuallyHidden`.

```tsx
import { stack } from '../styled-system/patterns'
<div className={stack({ gap: '4', align: 'center' })} />

import { Stack } from '../styled-system/jsx'
<Stack gap="4" align="center" />
```

Put breakpoints on the pattern prop itself (`columns={{ base: 1, md: 2 }}`), not in a separate condition block.

## Tokens and semantic tokens

Tokens are raw values. Semantic tokens resolve by condition, so they're how you do light and dark. Both nest under `{ value }`:

```ts
tokens: { colors: { brand: { value: '#5b8def' } }, fonts: { body: { value: 'Inter, sans-serif' } } }
semanticTokens: { colors: {
  primary: { value: { base: '#111', _dark: '#eee' } },  // conditional
  danger: { value: '{colors.brand}' },                   // reference another token by {path}
} }
```

Reference either by dot-path in `css()`: `bg: 'brand'`, `color: 'primary'`. A bare name resolves the token's `DEFAULT` key.

## Composing styles across files with css.raw()

`css.raw()` returns the style object instead of a class, so you can define styles in one file and compose them in another. v2 folds static named imports:

```ts
export const iconStyle = css.raw({ width: '4', flexShrink: 0 })   // styles.ts
css(iconStyle, { color: 'currentColor' })                          // elsewhere
css({ '& svg': { ...iconStyle } })                                 // spread into a selector
```

## v2 beta gotchas

- ESM only, Node 22 or newer. No `require()`. `panda.config.ts` loads as ESM.
- Presets aren't auto-injected. A config needs `presets: ['@pandacss/preset-base', '@pandacss/preset-panda']`, or `designSystem`, which pulls them in. Without them you get a bare system: no `bg`/`color` utilities, no scales, no `_hover`. Both preset packages have to be installed.
- Re-run `panda build` after you change tokens, recipes, or patterns. These apps do it for you in `predev`/`prebuild`.
- Don't edit `styled-system/`. It's generated, and your changes are overwritten.
- `createStyleContext` is gone in v2. Use `createRecipeContext` for a `cva` recipe, `createSlotRecipeContext` for an `sva` one.
- Extraction is static at the call site. A prop renamed or forwarded through a wrapper (`<Button size={circleSize} />`) isn't tracked. Keep real prop names; for arbitrary ones, pass `css.raw({...})`.
- With `strictTokens` on, arbitrary values are rejected. Use the `[…]` escape hatch: `bg: '[#abc]'`, `fontSize: '[13px]'`. These examples don't turn it on.

## Shipping and consuming the design system

Here's how `pandacn` reaches the three apps. The `monorepo` example is the source.

- Shipping: `panda lib` builds `dist/panda/lib.json`, a `preset.mjs`, and build info, then syncs `package.json` exports. It bundles the whole system, every token, recipe, and variant, which is why the source sets `staticCss: { recipes: '*' }`.
- Consuming with Panda: the app sets `designSystem: 'pandacn'` in `panda.config.ts`. Panda resolves `pandacn/panda/lib.json`, merges its preset, and the app emits only its own additions. You import from the app's local `styled-system`.
- Consuming without Panda: import the prebuilt `pandacn/styles.css` and the React components. That's the `standalone-app` example.
