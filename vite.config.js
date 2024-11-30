import { defineConfig } from "vite";
import { plugin as MDPlugin } from "vite-plugin-markdown";
import { resolve } from 'node:path';
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
    base: '/',
    plugins: [
        MDPlugin({
            mode: 'html',
        }),
        ViteMinifyPlugin({}),
    ],
    build: {
        rollupOptions: {
            external: [
                /^posts/
            ],
        },
    },
    resolve: {
        alias: [
            {
                find: '@src',
                replacement: resolve(__dirname, 'src'),
            }
        ]
    }
});