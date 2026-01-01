<script lang="ts">
    import { cn, type WithElementRef } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";
    import { findPostsByTitle } from "../service";
    import { Debounced } from "runed";
    // import { fade, scale, slide } from "svelte/transition";

    type SearchFilter = {
        search_input?: string,
    };

    const {
        search_input = $bindable(''),
        class: exclass = '',
        ...restProps
    }: WithElementRef<SearchFilter & HTMLAttributes<HTMLDivElement>> = $props();

    let timeFilter = $state();

    /// load posts
    const posts = new Debounced(() => {
        let input = search_input;
        return findPostsByTitle(input);
    }, 500);
</script>

<div class={cn('join join-vertical', exclass)} {...restProps}>
    <div class="join-item join w-full *:flex-1">
        <input class="join-item btn" type="radio" name="options" value="recent" aria-label="recent" bind:group={timeFilter} checked/>
        <input class="join-item btn" type="radio" name="options" value="weekly" aria-label="weekly" bind:group={timeFilter}/>
        <input class="join-item btn" type="radio" name="options" value="monthly" aria-label="monthly" bind:group={timeFilter}/>
    </div>
    <ul class="join-item list bg-base-100 shadow-md w-full">
        <!-- progressbar -->
        {#if posts.pending}
        <progress class="progress w-full h-1"></progress>
        {/if}
        {#await posts.current then values}
        {#if values.data.length > 0 && !posts.pending}
        <li class="list-row text-xs opacity-60 tracking-wide">
            Most popular posts this week
        </li>
        {/if}
        <!-- show items -->
        {#each values.data as item}
        <li class="list-row">
            <div class="list-col-grow">
                <a href="/post/{item.link}" class="font-semibold">{item.title}</a>
                <p class="text-xs font-light">{item.created_date}</p>
            </div>
        </li>
        {:else}
        <li class="list-row text-base-content/60">Oh no, not found any results</li>
        {/each}
        <!-- show error -->
        {#if values.error}
        <li class="list-row">{values.error}</li>
        {/if}
        {/await}
    </ul>
</div>
