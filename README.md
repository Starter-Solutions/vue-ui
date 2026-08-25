# @starter-solutions/vue-ui

An open-source, shadcn-inspired Vue 3 component and composable package,
published publicly under the Starter Solutions npm scope.

## Install

```bash
npm install @starter-solutions/vue-ui
```

Import the shared styles once in your application entry point:

```ts
import '@starter-solutions/vue-ui/styles.css'
```

Then use components and composables as named imports:

```vue
<script setup lang="ts">
import { Button, Card, CardContent, CardHeader, CardTitle, useDisclosure } from '@starter-solutions/vue-ui'

const dialog = useDisclosure()
</script>
```

The components use `data-slot` attributes and CSS custom properties so they
can be themed without coupling consumers to a particular Tailwind setup.

## Development

```bash
npm install
npm run typecheck
npm run build
```

## License

[MIT](LICENSE.md)
