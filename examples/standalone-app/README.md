# Standalone app

A Next.js app that uses the [shadcn/ui](https://ui.shadcn.com/) design system without installing Panda. You import one CSS file and the React components. That's it.

Use this when a team wants the design system but doesn't run Panda themselves. They never see `panda.config.ts`, a build step, or a `@pandacss/*` dependency.

## How it works

The design system is built with `panda lib` into a package that ships a prebuilt stylesheet (every token, recipe, and variant) and the React components. The app does two things — import the stylesheet in `app/layout.tsx`:

```tsx
import '@chakra-ui/shadcn-panda/styles.css'
```

and render the components:

```tsx
import { Button, Card, Badge } from '@chakra-ui/shadcn-panda'
```

No Panda in `package.json`. The only build is `next build`. `transpilePackages` in `next.config.ts` compiles the design system's source; the app itself stays Panda-free.

The page frame (the cream canvas, the glow, the header) is plain CSS in `app/frame.css` — the app owns its own look, the design system owns the components.

## Run it

The design system isn't on npm. This app installs it as a tarball built from `examples/monorepo/packages/ds`. Generate it once from the repo root, then run the app:

```bash
pnpm run pack-ds
cd examples/standalone-app
pnpm install
pnpm dev
```

`pnpm run pack-ds` builds the design system and writes the tarball this example installs with a `file:` dependency — nothing is committed to the repo. Open http://localhost:3000 and toggle light/dark in the header; the `.dark` class flips the shadcn tokens, same as shadcn's own theme.
