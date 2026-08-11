# Standalone app

A Next.js app that uses the [shadcn/ui](https://ui.shadcn.com/) design system without installing Panda. You import one CSS file and the React components. That's it.

Use this when a team wants the design system but doesn't run Panda themselves. They never see `panda.config.ts`, a build step, or a `@pandacss/*` dependency.

## How it works

The design system ships as the [`pandacn`](https://npmx.dev/pandacn) package — built with `panda lib` into a prebuilt stylesheet (every token, recipe, and variant) plus the React components. Its source is [`examples/monorepo/packages/ds`](../monorepo/packages/ds).

The app does two things — import the stylesheet in `app/layout.tsx`:

```tsx
import 'pandacn/styles.css'
```

and render the components:

```tsx
import { Button, Card, Badge } from 'pandacn'
```

No Panda in `package.json`. The only build is `next build`. `transpilePackages` in `next.config.ts` compiles the design system's source; the app itself stays Panda-free.

The page frame (the cream canvas, the glow, the header) is plain CSS in `app/frame.css` — the app owns its own look, the design system owns the components.

## Run it

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Toggle light/dark in the header — the `.dark` class flips the shadcn tokens, same as shadcn's own theme.
