# Vue3 host + nested remotes

Minimal reproduction for [module-federation/vite#806](https://github.com/module-federation/vite/issues/806): Vue 3 host with a nested remote consumer (`remoteFeature` → `remoteShared`).

## Apps

| App              | Federation name | Port |
| ---------------- | --------------- | ---- |
| `host`           | `host`          | 4173 |
| `remote`         | `remoteShared`  | 4174 |
| `remote-feature` | `remoteFeature` | 4175 |

`remoteFeature` imports from `remoteShared` and exposes Pinia stores, a `.vue` page, and an async widget.

The host uses:

- `shareStrategy: 'version-first'` in dev
- static Pinia store import in layout (`remoteFeature/stores/exampleStore`)
- vue-router lazy route to `remoteFeature/pages/HomePage`
- `defineAsyncComponent` for `remoteFeature/components/ExampleWidget`
- bootstrap preload of nested remotes before router init

`@module-federation/vite` is pinned to **1.16.6** in the Vue example packages.

## Getting started

From the repository root:

```bash
pnpm install
pnpm run vue:dev
```

Or from this directory:

```bash
pnpm run dev
```

Open http://localhost:4173/

Expected on **1.16.6**: bootstrap or routing may fail (empty remote module, undefined `default`, `__vccOpts` errors). Pin to **1.16.5** in `host`, `remote`, and `remote-feature` `package.json` to compare.
