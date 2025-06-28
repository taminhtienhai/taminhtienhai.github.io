import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import path from "path";


const OUT_DIR = 'static';
const SUB_DIRS = ['posts','images', 'tocs', 'meta', 'attrs'];
// const BLOG_DIR = 'assets/posts';
// const META_DIR = 'assets/meta';
// const META_DIR = 'static/meta';
// const IMG_DIR = 'static/img';

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
