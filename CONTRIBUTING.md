Thanks for showing interest in contributing to Panda examples 💖, you rock!

This repo is a collection of standalone starter projects for [Panda CSS](https://panda-css.com). The best contributions are new examples and improvements that help people pick one up and make it their own.

## Ways to contribute

- Add a new example (a framework, a setup, a pattern).
- Improve an existing example — fix a bug, tighten the code, sharpen the README.
- Improve the docs.

## Setup

1. Fork the repo (the <kbd>Fork</kbd> button at the top right of [this page](https://github.com/chakra-ui/panda-examples)).

2. Clone your fork:

```sh
git clone https://github.com/<your_github_username>/panda-examples.git
cd panda-examples
```

3. Each example is standalone, so you install inside the one you're working on:

```sh
cd examples/monorepo
pnpm install
pnpm dev
```

## Structure

Every folder under `examples/` is its own project with pinned dependencies — no `workspace:*` (except the `monorepo` example, which is itself a workspace). You can copy any example out of the repo and it runs on its own.

The shadcn design system lives in `examples/monorepo/packages/ds`. It isn't published to npm — the `standalone-app` and `panda-app` examples bundle it as a tarball and install it with a `file:` dependency. Run `pnpm run pack-ds` to rebuild the tarballs after changing the design system.

## Tooling

- [pnpm](https://pnpm.io/) for packages.
- [oxfmt](https://oxc.rs) for formatting (`.oxfmtrc.json` — single quotes, no semicolons).
- [ESLint](https://eslint.org/) (`eslint-config-next`) for the Next apps.

## Commands

Run from the repo root:

```sh
pnpm format              # format with oxfmt
pnpm format:check        # check formatting
pnpm run check-examples  # install + build every example standalone
```

Inside an example: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`.

## Adding a new example

1. Create a directory under `examples/` with its own `package.json`, pinned dependencies (no `workspace:*`), and a `.gitignore`.
2. Add `dev`/`build` scripts following the other examples, plus a short `README.md` explaining what it demonstrates.
3. Format with `pnpm format`.
4. Run `pnpm run check-examples` to verify it installs and builds in isolation.

## Pull requests

- Keep PRs small and limited to one type (docs, example, chore, or fix).
- Add before/after screenshots (light and dark) for anything visual.
- Make sure `pnpm run check-examples` and `pnpm format:check` pass.

## Found a bug?

Open an issue with a clear path to reproduction — ideally the smallest example that shows it. Questions are welcome in the [Panda Discord](https://discord.gg/VQrkpsgSx7).
