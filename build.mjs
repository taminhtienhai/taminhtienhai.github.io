import { Marked } from 'marked';
import { readFileSync, readdirSync, unlinkSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from 'node:path';
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";

let OUT_DIR;
const BLOG_DIR = 'static/markdown';
const META_DIR = 'static/meta';

if (process.env.NODE_ENV == 'development') {
    OUT_DIR = 'public';
} else {
    OUT_DIR = 'dist/pages';
}

// create OUT_DIR if it doesn't existed
if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR);
}

// cleanup OUT_DIR
readdirSync(OUT_DIR).forEach(file => {
    let file_des = path.join(OUT_DIR, file);
    unlinkSync(file_des);
});

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

// read SRC_DIR and generate html to OUT_DIR
readdirSync(BLOG_DIR)
.filter(f => f.endsWith('.md'))
.forEach(f => {
    let filename = f.split('.')[0];
    let buf = readFileSync(path.join(BLOG_DIR, f));
    let content = marked.parse(buf.toString('utf8'));
    let file_des = path.join(OUT_DIR, filename + '.html');
    writeFileSync(file_des, content);
});

readdirSync(META_DIR)
.filter(f => f.endsWith('.json'))
.forEach(f => {
    let filename = f.split('.')[0];
    let buf = readFileSync(path.join(META_DIR, f));
    let content = buf.toString('utf8');
    let file_des = path.join(OUT_DIR, filename + '.json');
    writeFileSync(file_des, content);
});
