import path from 'path';

export function filenameOf(filePath: string) {
    return path.basename(filePath, path.extname(filePath));
}

export function fileExtOf(filePath: string) {
    return path.extname(filePath).slice(1); // remove dot
}

export function fileOf(filePath: string) {
    const ext = path.extname(filePath);
    const filename = path.basename(filePath, ext);
    return [filename, ext.slice(1)] as const;
}

export function pathOf(filePath: string) {
    const dir = path.dirname(filePath).split(path.sep).pop() ?? '';
    const file = path.basename(filePath);
    return [dir, file] as const;
}