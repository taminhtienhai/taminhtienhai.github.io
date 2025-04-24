import { type PreprocessorGroup } from 'svelte/compiler';
import MdParser, { type MarkedState } from "./mdparser.ts";
import path from "path";
import { writeFile } from 'fs/promises';
import { filenameOf, pathOf } from './utils.ts';
import { kebabCase } from 'change-case';
import { writeFileSync } from 'fs';

const ATTRs: Record<string, string>[] = [];

export function markdownSvelte(): PreprocessorGroup {
    const OUT_DIR = 'static';
    const SUB_DIRS = ['posts', 'images', 'tocs', 'meta', 'attrs'];
    const BLOG_DIR = 'assets/posts';
    const META_DIR = 'assets/meta';

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
    let is_called = false;
    const build_indexes = () => {
        const OUT_DIR = 'static';
        writeFileSync(path.join(`${OUT_DIR}/meta`, `all_post.json`), JSON.stringify(ATTRs));

        // todo: badge classify

        const BadgeMapping = new Map();

        for (const post of ATTRs) {
            const tags = post?.tags ?? [];

            for (const tag of tags) {
                if (BadgeMapping.has(tag)) {
                    const curposts = BadgeMapping.get(tag);
                    BadgeMapping.set(tag, [...curposts, post]);
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
        if (!is_called && ATTRs.length > 3) {
            console.log(ATTRs);
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

async function parseMd(marked: ReturnType<typeof MdParser>, content: string): Promise<string> {
    // ctx: svelte treat '{' & '}' as start of template token
    const output = (await marked.parse(content, { async: true }))
        .replaceAll(/{/g, "&lbrace;")
        .replaceAll(/}/g, "&rbrace;");
    return output;
}