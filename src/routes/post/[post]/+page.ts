import { error } from "@sveltejs/kit";
import type { PageLoad } from './$types';
import { delay, delay_val } from "$lib/common/utils";
import { pascalCase } from 'change-case';

// TODO: handle network exception
export const load: PageLoad = async ({ params, fetch }) => {
    const contentFile = pascalCase(params.post, { delimiter: '' });
    return {
        title: params.post,
        content: import(`$lib/blogposts/${contentFile}.svx`),
        toc: fetch(`/tocs/${params.post}.json`)
            .then((res) => res.json())
            .then(res => delay(() => res)),
        attribute: fetch(`/attrs/${params.post}.json`)
            .then((res) => res.json())
            .then(delay_val),
    };
}

export const prerender = 'auto';

