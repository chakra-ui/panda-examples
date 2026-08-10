# Panda Examples

A collection of example projects showcasing [Panda CSS](https://panda-css.com) usage across different frameworks and setups.

## Structure

This is a pnpm monorepo. Each example lives in its own package under `examples/`:

```
examples/
  <example-name>/
```

## Getting Started

Install dependencies from the repo root:

```bash
pnpm install
```

Run a specific example:

```bash
pnpm --filter <example-name> dev
```

## Adding a New Example

1. Create a new directory under `examples/` with its own `package.json`.
2. Add a `dev`/`build` script following the conventions of the other examples.
3. Run `pnpm install` from the repo root to link the workspace.

## License

MIT
