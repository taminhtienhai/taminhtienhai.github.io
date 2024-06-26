import { marked } from 'marked';
import { readFileSync, readdirSync, unlinkSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from 'node:path';

const SRC_DIR = 'posts';
let OUT_DIR;

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

// read SRC_DIR and generate html to OUT_DIR
readdirSync(SRC_DIR)
    .filter(f => f.endsWith('.md'))
    .forEach(f => {
        let filename = f.split('.')[0];
        let buf = readFileSync(path.join(SRC_DIR, f));
        let content = marked.parse(buf.toString('utf8'));
        let file_des = path.join(OUT_DIR, filename + '.html');
        writeFileSync(file_des, content);
    });
