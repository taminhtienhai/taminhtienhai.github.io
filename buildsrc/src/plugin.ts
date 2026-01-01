import { type Plugin } from 'vite';
import * as path from 'path';
import { writeFile, mkdir, readFile } from 'fs/promises';
import glob from 'fast-glob';
import { kebabCase } from 'change-case';
import MdParser, { type MarkedState, type PostMeta } from './mdparser.ts';
import { filenameOf } from './utils.ts';

// Configuration constants
const CONTENT_DIR = 'src/lib/blogposts';
const OUT_DIR = 'static';

// In-memory cache to store metadata: Map<FilePath, Meta>
const postCache = new Map<string, PostMeta>();

export function blogPlugin(): Plugin {
    return {
        name: 'vite-plugin-blog-indexes',

        async buildStart() {
            console.log('🔌 [blog-plugin] Scanning posts...');

            await ensureDirs();

            // REPLACEMENT: Use fast-glob instead of Bun.Glob
            // We get absolute paths to make processing easier
            const files = await glob('**/*.svx', {
                cwd: CONTENT_DIR,
                absolute: true
            });

            const tasks: Promise<void>[] = [];
            for (const file of files) {
                tasks.push(processFile(file));
            }

            await Promise.all(tasks);
            await generateIndexes();
            console.log(`✅ [blog-plugin] Indexed ${postCache.size} posts.`);
        },

        async handleHotUpdate({ file, server }) {
            if (file.endsWith('.svx') && file.includes(CONTENT_DIR)) {
                console.log(`📝 [blog-plugin] Re-processing: ${path.basename(file)}`);

                await processFile(file);
                await generateIndexes();

                server.ws.send({
                    type: 'custom',
                    event: 'blog-index-update',
                    data: {}
                });
            }
        }
    };
}

async function processFile(filePath: string) {
    // REPLACEMENT: Use fs.readFile instead of Bun.file()
    const content = await readFile(filePath, 'utf-8');
    const fname = kebabCase(filenameOf(filePath) ?? '');

    const $state: MarkedState = {
        filename: fname,
        id_gen: {},
        meta: {},
        toc: [],
    };

    const marked = MdParser($state);
    await marked.parse(content, { async: true });

    if ($state.meta && Object.keys($state.meta).length > 0) {
        $state.meta.link = fname;
        postCache.set(filePath, $state.meta as PostMeta);
    }

    const tocPath = path.join(OUT_DIR, 'tocs', `${fname}.json`);
    const attrPath = path.join(OUT_DIR, 'attrs', `${fname}.json`);

    await writeFile(tocPath, JSON.stringify($state.toc));
    await writeFile(attrPath, JSON.stringify($state.meta));
}

async function generateIndexes() {
    const posts = Array.from(postCache.values());

    posts.sort((a, b) => {
        const dateA = new Date(a.created_date || 0);
        const dateB = new Date(b.created_date || 0);
        return dateB.getTime() - dateA.getTime();
    });

    await writeFile(
        path.join(OUT_DIR, 'meta', 'all_post.json'),
        JSON.stringify(posts)
    );

    const badgeMap = new Map<string, PostMeta[]>();

    for (const post of posts) {
        const tags = post.tags ?? [];
        for (const tag of tags) {
            if (!badgeMap.has(tag)) {
                badgeMap.set(tag, []);
            }
            badgeMap.get(tag)!.push(post);
        }
    }

    for (const [tag, tagPosts] of badgeMap) {
        await writeFile(
            path.join(OUT_DIR, 'meta', `badge_${tag}.json`),
            JSON.stringify(tagPosts)
        );
    }
}

async function ensureDirs() {
    const dirs = ['meta', 'tocs', 'attrs'].map(d => path.join(OUT_DIR, d));
    await Promise.all(dirs.map(d => mkdir(d, { recursive: true })));
}