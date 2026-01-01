import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { blogPlugin } from 'build-src';

export default defineConfig({
    plugins: [tailwindcss(), blogPlugin(), sveltekit()],
    server: {
        watch: {
            ignored: [
                'build.mjs',
                '**/assets/**',
                '**/docs/**',
                '**/static/**'
            ]
        }
    }
});
