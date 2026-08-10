# Standalone app

A Next.js app that uses the [shadcn/ui](https://ui.shadcn.com/) design system without installing Panda. You import one CSS file and the React components. That's it.

Use this when a team wants the design system but doesn't run Panda themselves. They never see `panda.config.ts`, a build step, or a `@pandacss/*` dependency.

## How it works

The design system is published to npm with `panda lib`. That publish includes a prebuilt stylesheet (every token, recipe, and variant) and the React components.

The app does two things:

```tsx
// app/layout.tsx
import '@chakra-ui/shadcn-panda/styles.css'
```

```tsx
// app/page.tsx
import { Button, Card, Badge } from '@chakra-ui/shadcn-panda'
```

No Panda in `package.json`. The only build is `next build`. `transpilePackages` in `next.config.ts` compiles the design system's source; the app itself stays Panda-free.

The page frame (the cream canvas, the glow, the header) is plain CSS in `app/frame.css` — the app owns its own look, the design system owns the components.

## Run it

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Toggle light/dark in the header — the `.dark` class flips the shadcn tokens, same as shadcn's own theme.

## Before it's on npm

`@chakra-ui/shadcn-panda` isn't published yet, so `pnpm install` can't resolve `^0.1.0` on its own. To try this example against a local build, pack the design system and point the dependency at the tarball:

```bash
# from packages/ds in the monorepo example
pnpm build && pnpm pack

# then in this example, install that tarball
pnpm add ./chakra-ui-shadcn-panda-0.1.0.tgz
```

Once the package is on npm, `pnpm install` works as written.
