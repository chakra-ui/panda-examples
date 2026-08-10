# Panda Examples

A collection of example projects showcasing [Panda CSS](https://panda-css.com) usage across different frameworks and setups.

## Structure

Each example under `examples/` is a **standalone project** with its own `package.json` and dependencies pinned to real, published versions (never `workspace:*`). Examples are intentionally **not** part of a pnpm workspace, so you can copy any single one out of this repo and it will install and run on its own — just like [`vercel/next.js/examples`](https://github.com/vercel/next.js/tree/canary/examples).

```
examples/
  <example-name>/
    package.json
    ...
```

## Examples

Three ways to ship and consume a design system on Panda. Each one uses the same system — [shadcn/ui](https://ui.shadcn.com/) modeled in Panda — so you can compare the setups directly.

| Example                                     | What it shows                                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`monorepo`](examples/monorepo)             | The design system and an app in one pnpm + Turborepo workspace. The app consumes the system through `designSystem`.  |
| [`standalone-app`](examples/standalone-app) | A Next.js app with no Panda installed. It installs the published system and renders its components — one CSS import. |
| [`panda-app`](examples/panda-app)           | A Next.js app that runs Panda, pulls the published system through `designSystem`, and extends its tokens.            |

The design system itself lives in the monorepo example at [`packages/ds`](examples/monorepo/packages/ds) and is published to npm as `@chakra-ui/shadcn-panda`. The `standalone-app` and `panda-app` examples consume that published package.

> `@chakra-ui/shadcn-panda` isn't on npm yet. The monorepo example runs today. To run the two npm examples before it's published, pack the design system locally — each example's README has the steps.

## Using an Example

You don't need to clone the whole repo. Grab a single example with [`degit`](https://github.com/Rich-Harris/degit):

```bash
npx degit chakra-ui/panda-examples/examples/<example-name> my-app
cd my-app
pnpm install
pnpm dev
```

Or clone the full repo and `cd` into the example you want:

```bash
git clone https://github.com/chakra-ui/panda-examples.git
cd panda-examples/examples/<example-name>
pnpm install
pnpm dev
```

## Adding a New Example

1. Create a new directory under `examples/` with its own `package.json`, pinned dependencies (no `workspace:*`), and a `.gitignore`.
2. Include `dev`/`build` scripts following the conventions of the other examples.
3. Add a short `README.md` inside the example explaining what it demonstrates.
4. Run `pnpm run check-examples` from the repo root to verify the example installs and builds in isolation.

## License

MIT
