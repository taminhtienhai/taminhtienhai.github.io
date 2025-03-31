// @ts-nocheck
import { error } from "@sveltejs/kit";
import type { PageLoad } from './$types';
import { delay } from "@src/lib/common/utils";

export const load = async ({ params, fetch }: Parameters<PageLoad>[0]) => fetch(`/posts/${params.post}.html`)
.then(res => res.text())
// todo: remove delay simulation
.then((post) => ({
    title: params.post,
    content: delay(() => post),
    toc: fetch(`/tocs/${params.post}.json`)
        .then((res) => res.json())
        .then(res => delay(() => res)),
}))
.catch((err) => error(404, err));



