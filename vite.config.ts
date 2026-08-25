import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ['src/**/*.ts', 'src/**/*.vue'],
            insertTypesEntry: true,
            rollupTypes: false,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: 'src/index.ts',
                'composables/index': 'src/composables/index.ts',
            },
            formats: ['es'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
})
