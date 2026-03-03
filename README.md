# Module Federation Vite Examples

[![E2E Tests](https://github.com/gioboa/module-federation-vite-examples/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/gioboa/module-federation-vite-examples/actions/workflows/e2e.yml)

A collection of Module Federation examples built with Vite, used to test new [@module-federation/vite](https://github.com/module-federation/vite) PRs and releases.

## Examples

| Example          | Host         | Remote         | Framework |
| ---------------- | ------------ | -------------- | --------- |
| [React](./react) | `react-host` | `react-remote` | React 19  |
| [Vue](./vue)     | `vue-host`   | `vue-remote`   | Vue 3     |

Each example follows a **host/remote** architecture with shared dependencies.

## E2E tests run against

- Vite 7
- Vite 8
- rolldown-vite

## Getting Started

```bash
# Install dependencies
pnpm install

# Run React example
pnpm react:dev

# Run Vue example
pnpm vue:dev
```

## E2E Tests

Tests are powered by [Playwright](https://playwright.dev/).

```bash
# Run tests (defaults to React example)
pnpm exec playwright test

# Run tests for Vue example
PLAYWRIGHT_TEST_COMMAND="pnpm vue:preview" pnpm exec playwright test
```

## Testing a PR

Update the `@module-federation/vite` version in `pnpm-workspace.yaml` catalog:

```yaml
catalog:
  "@module-federation/vite": "https://pkg.pr.new/@module-federation/vite@<PR_NUMBER>"
```

Then reinstall and run the examples.
