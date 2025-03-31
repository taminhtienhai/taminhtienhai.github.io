import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
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
