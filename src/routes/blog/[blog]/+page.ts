import { findPostsByBadge } from '$lib/service';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const posts = await findPostsByBadge(params.blog);

    if (posts.error) {
        return error(404, { message: posts.error.message  })
    }

    return { posts: posts.data, badge: params.blog };
}
