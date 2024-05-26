import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { plugin as MDPlugin } from "vite-plugin-markdown";
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    plugins: [
        UnoCSS(),
        MDPlugin({
            mode: 'html',
        }),
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