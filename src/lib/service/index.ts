import type { Post } from "../common/types";

export const findAllPosts: () => Promise<{ data: Post[], error?: Error }>
= () => fetch(`/meta/all_post.json?v=${import.meta.env.VITE_VERSION}`)
.then(async res => ({
    data: await res.json(),
}))
.catch(err => ({
    data: [],
    error: err,
}))

export const findPostsByBadge: (badge: string) => Promise<{ data: Post[], error?: Error }>
= (badge) => {
    if (badge) {
        return fetch(`/meta/badge_${badge}.json?v=${import.meta.env.VITE_VERSION}`)
        .then(async res => ({
            data: await res.json(),
        }))
        .catch(err => ({
            data: [],
            error: err,
        }))
    }
    return findAllPosts();
}


export const findPostsByTitle: (text: string) => Promise<{ data: Post[], error?: Error }>
= (text) => findAllPosts()
.then(posts => {
    if (posts.error) {
        return ({ error: posts.error, data: [] });
    }

    return {data: posts.data.filter(p => p.title.includes(text))}
});


export const GET = (path: string) => fetch(path).then(res => res.json())
