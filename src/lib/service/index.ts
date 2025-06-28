import type { Post } from "../common/types";

export const findAllPosts: () => Promise<Post[]>
= () => fetch('/meta/all_post.json')
.then(res => res.json());

export const findPostsByBadge: (badge: string) => Promise<Post[]>
= (badge) => {
    if (badge) {
        return fetch(`/meta/badge_${badge}.json`)
        .then(res => res.json());
    }
    return findAllPosts();
}


export const findPostsByTitle: (text: string) => Promise<Post[]>
= (text) => findAllPosts()
.then(posts => posts.filter(p => p.title.includes(text)));


export const GET = (path: string) => fetch(path)
.then(res => res.json())