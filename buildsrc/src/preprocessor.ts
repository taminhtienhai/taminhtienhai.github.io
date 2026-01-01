import { type PreprocessorGroup } from 'svelte/compiler';
import MdParser, { type MarkedState, type PostMeta } from "./mdparser.ts";
import { filenameOf, pathOf } from './utils.ts';
import { kebabCase } from 'change-case';
import { readFileSync } from 'fs';

const TEMPLATE_PATH = './buildsrc/template/post.temp.svelte';
const POST_TEMPLATE = readFileSync(TEMPLATE_PATH, 'utf-8');

export function markdownSvelte(): PreprocessorGroup {
    const CUSTOM_EXT = ['.svx'];
    return {
        name: 'markdown-preprocessor',
        async markup({ content, filename = '' }) {
            if (!CUSTOM_EXT.some(it => filename.endsWith(it))) {
                return { code: content };
            }

            const [dir, _] = pathOf(filename);
            const fname = kebabCase(filenameOf(filename) ?? '');

            const $state: MarkedState = {
                filename: fname,
                id_gen: {},
                meta: {},
                toc: [],
            };
            const marked = MdParser($state);
            let transformed: string = '';

            if (filename.endsWith('.svx') && dir === 'blogposts') {
                transformed = await parseMd(marked, content);
            }

            return { code: transformed };
        },
    }
}

async function parseMd(marked: ReturnType<typeof MdParser>, content: string): Promise<string> {
    const output = (await marked.parse(content, { async: true }));
    const { meta } = marked.$state;

    const header = POST_TEMPLATE;

    const processedOutput = output
        .replace(/\{/g, "&lbrace;")
        .replace(/\}/g, "&rbrace;")
        .replace(/&lbrace;@(\w+)\s(.*?)(?:&rbrace;)/g, "{@$1 $2}")
        .replace(/&lbrace;#(\w+)\s(.*?)(?:&rbrace;)/g, "{#$1 $2}")
        .replace(/&lbrace;:else&rbrace;/g, "{:else}")
        .replace(/&lbrace;\/if&rbrace;/g, "{/if}");

    const tagsHtml = meta.tags?.map(tag => `<span class="badge badge-primary">${tag}</span>`).join(' ') ?? '';

    return `
    ${header}
    <h1>${meta.title}</h1>
    <p>${meta?.estimate ?? ''}</p>
    ${tagsHtml}
    ${processedOutput}`;
}