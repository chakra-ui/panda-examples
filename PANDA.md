# Writing Panda without the usual mistakes

Read this before you write a line of Panda in these examples. It's the API and, more to the point, the mistakes that trip up anyone coming from Tailwind or Panda v1. The examples run Panda v2 (`2.0.0-beta.12`). Full docs: <https://panda-css.com>. Beta specifics: the [v2 migration guide](https://github.com/chakra-ui/panda/blob/main/V2_MIGRATION.md).

## The one rule behind most mistakes: styles must be static

Panda reads your code at build time and generates CSS from what it can see. It runs no JavaScript. If a style value isn't a literal it can read at the call site, it generates nothing, and you get a `className` with no CSS behind it. No error, just a missing style.

```tsx
// ❌ nothing is generated — the value isn't known at build time
css({ color: props.color })
css({ color: `red.${shade}` })
css({ color: colorByType[type] })

// ✅ literals, ternaries of literals, and same-file constants all work
const accent = 'red.300'
css({ color: accent })
css({ color: isActive ? 'red.500' : 'red.600' })   // both classes emitted
```

When a value is genuinely dynamic, pick one of these:

```tsx
// pick the class from a map of literals
const byShade = { 300: css({ color: 'red.300' }), 500: css({ color: 'red.500' }) }
<p className={byShade[shade]} />

// or hand Panda a CSS var and set it inline with token()
<div className={css({ color: 'var(--c)' })} style={{ '--c': token(`colors.${props.color}`) }} />
```

Or pre-generate variants with `staticCss` (see recipes below). The diagnostic for this is `panda_call_unextractable`.

## Panda is not Tailwind

There are no utility class strings. Style with objects through `css()`.

```tsx
// ❌ className="flex gap-4 hover:bg-red-500 md:px-5"
// ✅
className={css({ display: 'flex', gap: '4', _hover: { bg: 'red.500' }, px: { base: '4', md: '5' } })}
```

## Reference tokens by name, not by var

A token is a bare dot-path. Not a CSS var, not `$name`, not `theme()`.

```tsx
// ❌ bg: 'var(--colors-red-400)'   ❌ bg: '$red.400'   ❌ bg: theme('colors.red.400')
// ✅
css({ bg: 'red.400', color: 'primary' })
```

Use a raw `var(...)` only when you're deliberately holding a runtime value (see the static rule above). `token('colors.red.300')` reads a token in JS; `token.var('colors.red.300')` gives its var reference.

## The spacing scale: '4' is a token, '4px' is not

Quoted scale steps hit the token scale. A raw length bypasses it.

```tsx
css({ p: '4' })     // ✅ spacing token spacing.4 → 1rem
css({ p: '4px' })   // ✅ literal length, no token — only when you mean an exact pixel value
```

## Conditions use _hover, not :hover

State and pseudo-classes are underscore keys. Raw child selectors need a literal `&`. Pseudo-element `content` must carry its own quotes.

```tsx
// ❌ ':hover': {…}   ❌ '&:hover': {…}   ❌ 'span': {…}   (missing &)
// ✅
css({
  _hover: { bg: 'red.700' },
  _disabled: { opacity: 0.5 },
  '& span': { color: 'pink.400' },
  _before: { content: '"👋"' },
})
```

Order matters: `_dark: { _backdrop: {…} }` is valid, the reverse isn't. Dark mode here is class-based: the configs set `dark: '.dark &'`, so `_dark` applies under a `.dark` ancestor. Toggle `.dark` on `<html>`; semantic tokens switch on their own.

## Responsive is an object, not md: prefixes

```tsx
// ❌ className="md:px-5"   ❌ <Box md={{ px: '5' }} />
// ✅ per property
css({ px: { base: '4', md: '5' } })
// ✅ or a breakpoint block
css({ base: { px: '4' }, md: { px: '5' } })
```

Breakpoints are `sm md lg xl 2xl`, mobile-first. On patterns, put the breakpoints on the pattern prop itself: `<Grid columns={{ base: 1, md: 2 }} />`.

## Fading a color with /

Append `/{n}` to a color token to mix in transparency.

```tsx
css({ bg: 'red.400/50' })                     // ✅ 50% via color-mix
css({ '--overlay': '{colors.black/50}' })     // ✅ inside a var, wrap the token in braces
```

## Combining classes with cx()

`cx()` joins class strings and resolves atomic conflicts, last one wins. Use it wherever a component takes a `className`:

```tsx
cx(button({ variant, size }), css({ mt: '2' }), className)
```

## Recipes, and the dynamic-variant trap

A recipe is variant-driven styling for one element. Author it with `defineRecipe`, register it in `panda.config.ts` under `theme.extend.recipes`, and consume the generated function from `styled-system/recipes`:

```ts
export const button = defineRecipe({
  className: 'btn',
  base: { display: 'inline-flex', rounded: 'md' },
  variants: {
    variant: { default: { bg: 'primary' }, ghost: { bg: 'transparent' } },
    size: { sm: { h: '8' }, md: { h: '9' } },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})
```

The same static rule applies to variant props:

```tsx
button({ size: 'lg' })               // ✅ emits lg
button({ size: wide ? 'sm' : 'lg' }) // ✅ emits both
button({ size })                     // ❌ runtime prop → only defaultVariants generated
```

Fix a genuinely dynamic prop with `staticCss` on the recipe (`staticCss: ['*']`, or list the variants). These examples set `staticCss: { recipes: '*' }` in the config for exactly this reason. Two more catches: `compoundVariants` disables responsive variant props on a config recipe, and inline `cva({...})` from `styled-system/css` never supports responsive variant props (it does emit every variant, though). Recipe functions also carry `.raw()`, `.variantKeys`, and `.splitVariantProps(props)`.

## Multi-part components use slot recipes

For a component with parts (a Card is root, header, title), use `defineSlotRecipe` under `theme.extend.slotRecipes`. The generated function returns one class per slot:

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

Prebuilt layout helpers: `stack`, `hstack`, `vstack`, `flex`, `grid`, `gridItem`, `box`, `center`, `circle`, `square`, `container`, `aspectRatio`, `bleed`, `float`, `spacer`, `divider`, `wrap`, `cq`, `linkOverlay`, `visuallyHidden`.

```tsx
import { stack } from '../styled-system/patterns'
<div className={stack({ gap: '4', align: 'center' })} />

import { Stack } from '../styled-system/jsx'
<Stack gap="4" align="center" />
```

## Defining tokens and semantic tokens

Tokens are raw values; semantic tokens resolve by condition, which is how light and dark work. Both nest under `{ value }`:

```ts
tokens: { colors: { brand: { value: '#5b8def' } }, fonts: { body: { value: 'Inter, sans-serif' } } }
semanticTokens: { colors: {
  primary: { value: { base: '#111', _dark: '#eee' } },  // conditional
  danger: { value: '{colors.brand}' },                   // reference another token by {path}
} }
```

Then reference by dot-path in `css()`: `bg: 'brand'`, `color: 'primary'`. A bare name resolves the token's `DEFAULT` key.

## Where to import from

Crossing these is a common mistake:

| You want | Import from |
| --- | --- |
| `css`, `cx`, `cva`, `sva`, `token`, `styled` | local `styled-system/*` (generated) |
| patterns and pattern JSX | local `styled-system/patterns` and `styled-system/jsx` |
| generated recipe functions | local `styled-system/recipes` |
| `defineConfig`, `defineRecipe`, `defineSlotRecipe` | `@pandacss/dev` (config only) |

Always the local `styled-system`, the one this app's `panda build` generated. Never runtime helpers from the `pandacn` package. The `standalone-app` example has no `styled-system` at all; see its AGENTS.md.

## v2 beta gotchas

- ESM only, Node 22 or newer. No `require()`.
- Presets aren't auto-injected. A config needs `presets: ['@pandacss/preset-base', '@pandacss/preset-panda']`, or `designSystem`, which pulls them in. Without them you get a bare system: no `bg`/`color`, no scales, no `_hover`. Both packages must be installed.
- Run `panda build` after changing tokens, recipes, or patterns, and before `styled-system` types exist. These apps do it in `predev`/`prebuild`.
- Don't edit `styled-system/`. It's generated and gets overwritten.
- `!important` is a suffix on the value: `css({ color: 'red!' })`.
- With `strictTokens` on, arbitrary values are rejected. Escape with brackets: `bg: '[#abc]'`, `fontSize: '[13px]'`. These examples don't turn it on.
- `createStyleContext` is gone. Use `createRecipeContext` (cva) or `createSlotRecipeContext` (sva).

## Shipping and consuming the design system

How `pandacn` reaches the three apps. The `monorepo` example is the source.

- Ship: `panda lib` builds `dist/panda/lib.json`, a `preset.mjs`, and build info, then syncs `package.json` exports. It bundles every token, recipe, and variant, which is why the source sets `staticCss: { recipes: '*' }`.
- Consume with Panda: set `designSystem: 'pandacn'` in `panda.config.ts`. Panda merges its preset and the app emits only its own additions. Import from the app's local `styled-system`.
- Consume without Panda: import the prebuilt `pandacn/styles.css` and the React components. That's the `standalone-app` example.
