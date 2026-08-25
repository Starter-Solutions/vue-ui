import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

function componentEntries(section: 'base' | 'custom') {
    const sourceDirectory = fileURLToPath(new URL(`./src/components/${section}`, import.meta.url))

    return Object.fromEntries(
        readdirSync(sourceDirectory, { withFileTypes: true })
            .filter(entry => entry.isDirectory())
            .map(entry => [
                `components/${section}/${entry.name}/index`,
                `src/components/${section}/${entry.name}/index.ts`,
            ]),
    )
}

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [
        vue(),
        tailwindcss(),
        dts({
            include: ['src/**/*.ts', 'src/**/*.vue'],
            insertTypesEntry: true,
            rollupTypes: false,
            compilerOptions: {
                noImplicitAny: false,
            },
        }),
    ],
    build: {
        lib: {
            entry: {
                index: 'src/index.ts',
                'components/base/index': 'src/components/base/index.ts',
                'components/custom/index': 'src/components/custom/index.ts',
                'composables/index': 'src/composables/index.ts',
                ...componentEntries('base'),
                ...componentEntries('custom'),
            },
            formats: ['es'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('@/'),
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
            },
        },
    },
})
