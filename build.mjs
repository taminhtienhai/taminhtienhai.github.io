import { Marked } from 'marked';
import { readFileSync, readdirSync, unlinkSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import path from 'node:path';
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";

let OUT_DIR;
const SUB_DIRS = ['page','json','img'];
const BLOG_DIR = 'static/markdown';
const META_DIR = 'static/meta';
const IMG_DIR = 'static/img';

if (process.env.NODE_ENV === 'development') {
    OUT_DIR = 'public';
} else {
    OUT_DIR = 'dist';
}

if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR);
}

// create OUT_DIR if it doesn't existed
SUB_DIRS.forEach((sub) => {
    const directory = `${OUT_DIR}/${sub}`;
    if (!existsSync(directory)) {
        mkdirSync(directory);
    }
})

// cleanup OUT_DIR
SUB_DIRS.forEach((sub) => {
    const directory = `${OUT_DIR}/${sub}`;
    readdirSync(directory).forEach(file => {
        const file_des = path.join(directory, file);
        unlinkSync(file_des);
    });
})


const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            const highlighted = hljs.highlight(code, { language }).value;
            return `<div class="mockup-code">${highlighted}</div>`;
        }
    })
);

// read SRC_DIR and generate html to OUT_DIR
console.log('start parse markdown..');
readdirSync(BLOG_DIR)
.filter(f => f.endsWith('.md'))
.forEach(f => {
    const filename = f.split('.')[0];
    const buf = readFileSync(path.join(BLOG_DIR, f));
    const content = marked.parse(buf.toString('utf8'));
    const file_des = path.join(`${OUT_DIR}/page`,`${filename}.html`);
    writeFileSync(file_des, content);
});

console.log('copy static metadata..');
readdirSync(META_DIR)
.filter(f => f.endsWith('.json'))
.forEach(f => {
    const src_des = path.join(META_DIR, f);
    const file_des = path.join(`${OUT_DIR}/json`, f);
    copyFileSync(src_des, file_des)
});

console.log('copy static images..');
readdirSync(IMG_DIR)
.forEach(image => {
    const src_des = path.join(IMG_DIR, image);
    const file_des = path.join(`${OUT_DIR}/img`, image);
    copyFileSync(src_des, file_des)
});
