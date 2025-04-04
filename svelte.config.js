import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdirSync } from 'fs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess()],

    kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
            fallback: 'index.html',
        }),
        alias: {
            "@src/*": "./src/*",
        },
        prerender: {
            crawl: true,
            /// ex: /post/hAHpLYSeVqLZ3gfPVIQx
            entries: readdirSync('static/posts/')
                .map(f => f.split('.')[0])
                .map(fname => `/post/${fname}`),
        }
	},

    extensions: [".svelte", ".svx"]
};

export default config;
