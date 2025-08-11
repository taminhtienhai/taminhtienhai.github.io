import { findAllPosts } from '$lib/service';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const posts = await findAllPosts();
    return { posts: posts.data, error: posts.error };
};
