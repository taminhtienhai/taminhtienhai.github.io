
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import path from "path";

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

console.time("Build & Types");

const buildTask = Bun.build({
    entrypoints: ['./buildsrc/src/index.ts'],
    outdir: './buildsrc/dist',
    target: "node",
    format: "esm",
});

// Spawn tsc asynchronously
const typeTask = Bun.spawn(["bun", "x", "tsc", "-p", "./buildsrc/tsconfig.json"], {
    stderr: "inherit", // Pipe errors directly
    stdout: "inherit"
});

const [buildResult, typeProc] = await Promise.all([
    buildTask,
    typeTask.exited
]);

console.timeEnd("Build & Types");

if (!buildResult.success) {
    console.error("Bundling failed");
    console.error(buildResult.logs);
    process.exit(1);
}

if (typeProc !== 0) {
    console.error(`Type generation failed with exit code ${typeProc}`);
    process.exit(typeProc);
}