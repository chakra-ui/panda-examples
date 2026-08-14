# Agent guide: the standalone-app example

This app uses the `pandacn` design system without installing Panda. Read [`README.md`](README.md) for how it works. [`PANDA.md`](PANDA.md) is background here: it explains what the prebuilt CSS you import was built from, but you won't write any Panda in this app.

## There's no Panda here

No `panda.config.ts`, no `styled-system/`, no `@pandacss/*` dependency. Don't add them. There's no `css()` function and no `panda build`. If a task genuinely needs custom Panda styling, it belongs in the `panda-app` example, not this one.

## How styling works

The prebuilt stylesheet is imported once, in `app/layout.tsx`: `import 'pandacn/styles.css'`. It carries every token, recipe, and variant. Components come from the same package: `import { Button, Card } from 'pandacn'`.

You style with plain `className` strings, two ways:

- For how a component looks, use its variant props: `<Button variant="destructive" size="sm">`.
- For app layout and framing, use the classes in `app/frame.css` (`.frame-card`, `.frame-title`, `.frame-row`, and so on). They're backed by CSS variables.

## Dark mode

Toggle the `.dark` class on `<html>`. The no-flash script that sets it on load is in `layout.tsx`. `frame.css` defines the `.dark` variable overrides; the design system handles its own dark styles through the prebuilt CSS.

## Restyling a component

Use its variant props or the existing classes. You can't author new Panda utilities here, and that's the point of this example: consume the system, don't run it.
