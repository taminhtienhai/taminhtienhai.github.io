
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import path from "path";
import isolatedDecl from 'bun-plugin-isolated-decl';

// --- Logic from root build.mjs ---
const OUT_DIR = 'static';
const SUB_DIRS = ['posts','images', 'tocs', 'meta', 'attrs'];

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
    if (existsSync(directory)) {
        readdirSync(directory).forEach(file => {
            const file_des = path.join(directory, file);
            unlinkSync(file_des);
        });
    }
})

// --- Logic from buildsrc/build.mjs ---
await Bun.build({
	entrypoints: ['./buildsrc/src/index.ts'],
	outdir: './buildsrc/dist',
	plugins: [isolatedDecl()],
	target: "bun",
});
