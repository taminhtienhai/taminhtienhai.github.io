import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdirSync } from 'fs';
import { markdownSvelte, indexesGen } from "build-src";

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
            entries: readdirSync('static/tocs/')
                .map(f => f.split('.')[0])
                .map(fname => `/post/${fname}`),
        }
	},
    compilerOptions: {
        warningFilter: (warn) => {
            if (warn.code.startsWith('a11y')) { return false; }
            return true;
        }
    },
    extensions: [".svelte", ".svx"]
};

export default config;