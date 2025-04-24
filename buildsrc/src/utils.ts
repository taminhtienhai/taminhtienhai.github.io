export function filenameOf(path: string) {
    const [filename, _] = fileOf(path);
    return filename;
}

export function fileExtOf(path: string) {
    const [_, ext] = fileOf(path);
    return ext;
}

export function fileOf(path: string) {
    const paths = path.split('/');
    const [filename, ext] = paths[paths.length - 1]?.split('.') ?? [];
    return [filename, ext] as const;
}

export function pathOf(path: string) {
    const paths = path.split('/');
    const [dir, file] = [paths[paths.length - 2] ?? '', paths[paths.length - 1] ?? ''];
    return [dir, file] as const;
}