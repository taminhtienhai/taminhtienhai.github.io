<script lang="ts">
	import PostCard from '$lib/widget/PostCard.svelte';
	import LoadMore from '$lib/widget/LoadMore.svelte';
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
    import { navigating } from '$app/state';
    import PostCardSkeleton from '$lib/widget/PostCardSkeleton.svelte';
    import type { PostMeta } from '$lib/common/types';

	let { data } = $props<{ data: PageData }>();
	let { posts } = $derived<{ posts: PostMeta[] }>(data);

	let wScrollY = $state(0);
	let offset = $state(0);
	let limit = $state(3);
	let activeTl: () => string = getContext('activeTimeline'); // parent

	let reachBottom = $derived.by(() => {
		const scrolledTo = wScrollY + window.innerHeight;
		const isReachBottom = document.body.scrollHeight === scrolledTo;
		return !isReachBottom;
	});

	function compareDate(lhs: string, rhs: string) {
		const date1 = new Date(lhs).getTime();
		const date2 = new Date(rhs).getTime();
		return date2 - date1;
	}

	function yearOf(time: string) {
		return new Date(time).getFullYear();
	}
</script>

<svelte:window bind:scrollY={wScrollY} />

{#if !navigating}
    {#each [1, 2, 3] as const as _}
        <PostCardSkeleton />
    {/each}
{:else if posts}
    {#each posts
            .filter((it) => yearOf(it.created_date) === parseInt(activeTl()))
            .sort((a, b) => compareDate(a.created_date, b.created_date))
            .slice(offset, limit) as post}
        <PostCard {...post} />
    {/each}
    <LoadMore bind:limit={limit} total={posts.length} bind:hidden={reachBottom} />
{:else}
    <p class="text-error">No posts found.</p>
{/if}
