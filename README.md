# @starter-solutions/vue-ui

Public, open-source Vue 3 components based on the official `shadcn-vue`
registry. Registry components live in `src/components/base`; project-specific
components composed from base components live in `src/components/custom`.

## Install

```bash
npm install @starter-solutions/vue-ui
```

Load the compiled Tailwind and theme styles once:

```ts
import '@starter-solutions/vue-ui/styles.css'
```

## Imports

Use the root barrel when convenience is more important than import locality:

```ts
import { Button, Card, ThemeSwitch, useDisclosure } from '@starter-solutions/vue-ui'
```

Use section barrels:

```ts
import { Button, Card } from '@starter-solutions/vue-ui/base'
import { ThemeSwitch } from '@starter-solutions/vue-ui/custom'
```

Or import a component group explicitly:

```ts
import { Button } from '@starter-solutions/vue-ui/base/button'
import { ThemeSwitch } from '@starter-solutions/vue-ui/custom/theme-switch'
```

For a flash-free initial theme, initialize it before mounting the Vue app:

```ts
import { initializeTheme } from '@starter-solutions/vue-ui'

initializeTheme()
```

## Adding shadcn-vue components

`components.json` maps the shadcn `ui` alias to `@/components/base`, so CLI
additions and updates never create a `ui` directory:

```bash
npx shadcn-vue@latest add button
```

Do not place custom components in `base`: registry updates may overwrite them.
Build custom components from base primitives under `src/components/custom/<name>`
and export them from `src/components/custom/index.ts`.

## Development

```bash
npm install
npm run typecheck
npm run build
```

## Publishing

Publishing runs automatically when `package.json` changes on `main`. The
workflow validates the package and checks npm before publishing, so reruns are
safe. A new version is published with provenance, tagged as `v<version>`, and
gets a GitHub Release with generated notes.

Add the same granular npm access token used by the other Starter Solutions npm
workflows as the `NPM_TOKEN` repository secret. The token's npm user must have
permission to publish packages in the `@starter-solutions` scope.

## License

[MIT](LICENSE.md)
