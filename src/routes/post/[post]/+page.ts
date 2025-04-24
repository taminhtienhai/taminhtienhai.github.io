import { error } from "@sveltejs/kit";
import type { PageLoad } from './$types';
import { delay, delay_val } from "$lib/common/utils";
import { pascalCase } from 'change-case';


export const load: PageLoad = async ({ params, fetch }) => {
    const contentFile = pascalCase(params.post, { delimiter: '' });
    return import(`$lib/blogposts/${contentFile}.svx`)
    // todo: remove delay simulation
    .then((post) => ({
        title: params.post,
        content: delay(() => post.default),
        toc: fetch(`/tocs/${params.post}.json`)
            .then((res) => res.json())
            .then(res => delay(() => res)),
        attribute: fetch(`/attrs/${params.post}.json`)
            .then((res) => res.json())
            .then(delay_val),
    }))
    .catch((err) => error(404, err));
}

export const prerender = 'auto';

