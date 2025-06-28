import { type PreprocessorGroup } from 'svelte/compiler';
import MdParser, { type MarkedState, type PostAttr } from "./mdparser.ts";
import * as path from "path";
import { writeFile } from 'fs/promises';
import { filenameOf, pathOf } from './utils.ts';
import { kebabCase } from 'change-case';
import { writeFileSync } from 'fs';

const ATTRs: Partial<PostAttr>[] = [];

export function markdownSvelte(): PreprocessorGroup {
    const OUT_DIR = 'static';
    // const SUB_DIRS = ['posts', 'images', 'tocs', 'meta', 'attrs'];
    // const BLOG_DIR = 'assets/posts';
    // const META_DIR = 'assets/meta';

    const CUSTOM_EXT = ['.svx'];
    return {
        name: 'markdown-preprocessor',
        async markup({ content, filename = '' }) {
            if (!CUSTOM_EXT.some(it => filename.endsWith(it))) {
                return { code: content, };
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
                ATTRs.push($state.meta);
            }

            const toc_des = path.join(`${OUT_DIR}/tocs`, `${fname}.json`);
            const attr_des = path.join(`${OUT_DIR}/attrs`, `${fname}.json`);

            await writeFile(toc_des, JSON.stringify($state.toc));
            await writeFile(attr_des, JSON.stringify($state.meta));

            return { code: transformed };
        },
    }
}

export function indexesGen(): PreprocessorGroup {
    // This flag ensures that build_indexes is called only once per build process.
    // The ATTRs array is re-initialized on each 'buildsrc' build, so no manual reset is needed.
    let is_called = false;
    const build_indexes = () => {
        console.log('Building post indexes (all_post.json and badge_*.json)...');
        const OUT_DIR = 'static';
        writeFileSync(path.join(`${OUT_DIR}/meta`, `all_post.json`), JSON.stringify(ATTRs));

        const BadgeMapping = new Map<string, Partial<PostAttr>[]>();

        for (const post of ATTRs) {
            const tags = post?.tags ?? [];

            for (const tag of tags) {
                if (BadgeMapping.has(tag)) {
                    const curposts = BadgeMapping.get(tag);
                    BadgeMapping.set(tag, [...curposts!, post]);
                } else {
                    BadgeMapping.set(tag, [post]);
                }
            }
        }


        for (const [id, posts] of BadgeMapping.entries()) {
            writeFileSync(path.join(`${OUT_DIR}/meta`, `badge_${id}.json`), JSON.stringify(posts));
        }
    };
    const call_once = () => {
        // Trigger index building only once and after at least 4 posts have been processed
        // (since prerender entries are generated based on these indexes).
        if (!is_called && ATTRs.length > 3) {
            build_indexes();
            is_called = true;
        }
    }
    return {
        async markup({ content, filename = '' }) {
            call_once();
            return { code: content };
        }
    }
}

import { readFileSync } from 'fs';

async function parseMd(marked: ReturnType<typeof MdParser>, content: string): Promise<string> {
    const output = (await marked.parse(content, { async: true }));
    // WARN: the `marked.$state` being modified during the parse process, please never change this order
    const { meta } = marked.$state;

    // Read 'post.temp.svelte' from the template directory
    const templatePath = './buildsrc/template/post.temp.svelte';
    const header = readFileSync(templatePath, 'utf-8');

    // Replace Svelte template tokens explicitly
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
