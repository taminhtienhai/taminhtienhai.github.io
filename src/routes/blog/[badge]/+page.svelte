<script lang="ts">
    import { findPostsByBadge } from "$lib/service";
    import PostCard from "$lib/widget/PostCard.svelte";
    import PostCardSkeleton from "$lib/widget/PostCardSkeleton.svelte";
    import { delay } from "$lib/common/utils";
    import LoadMore from "$lib/widget/LoadMore.svelte";
    
    const { data } = $props();

    let wScrollY = $state(0);
    let offset = $state(0);
    let limit = $state(3);

    let reachBottom = $derived.by(() => {
        const scrolledTo = wScrollY + window.innerHeight;
        const isReachBottom = document.body.scrollHeight === scrolledTo
        return !isReachBottom;
    });
</script>

<svelte:window bind:scrollY={wScrollY}/>

{#await delay(() => findPostsByBadge(data.badge), 1000)}
{#each [1,2,3] as const as _}
    <PostCardSkeleton/>
{/each}
{:then posts} 
{#each posts.slice(offset, limit) as post}
    <PostCard {...post}/>
{/each}
<LoadMore bind:limit={limit} total={posts.length} bind:hidden={reachBottom}/>
{:catch err}
<p class="text-error">{err}</p>
{/await}
