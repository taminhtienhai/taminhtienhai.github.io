import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdirSync } from 'fs';
import { markdownSvelte, indexesGen } from "buildsrc";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        markdownSvelte(),
        indexesGen(),
        vitePreprocess(),
    ],
    kit: {
		adapter: adapter({
            fallback: 'index.html',
        }),
        prerender: {
            crawl: true,
            entries: readdirSync('static/posts/')
                .map(f => f.split('.')[0])
                .map(fname => `/post/${fname}`),
        }
	},

    extensions: [".svelte", ".svx"]
};

export default config;