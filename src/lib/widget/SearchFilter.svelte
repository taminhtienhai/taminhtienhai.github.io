<script lang="ts">
    import { debounce_async } from "../common/utils";
    import { findPostsByTitle } from "../service";

    const {
        exclass = '',
        search_input = $bindable(''),
    } = $props();

    /// load posts

    const debounce = debounce_async(1000)
    const posts = $derived.by(() => {
        let input = search_input;
        return debounce(() => findPostsByTitle(input));
    });
</script>

<section class="{exclass}">
    <div class="join w-full *:flex-1">
        <input class="join-item btn" type="radio" name="options" aria-label="weekly" />
        <input class="join-item btn" type="radio" name="options" aria-label="monthly" />
        <input class="join-item btn" type="radio" name="options" aria-label="recent" />
    </div>
    <ul class="list bg-base-100 rounded-box shadow-md w-full">
        {#await posts}
            <li>Loading...</li>
        {:then values}
        {#if values.length > 0}
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most popular posts this week
        </li>
        {/if}

        {#each values as item}
        <li class="list-row">
            <div class="list-col-grow">
                <a href="/post/{item.link}" class="font-semibold">{item.title}</a>
                <p class="text-xs font-light">{item.created_date}</p>
            </div>
        </li>
        {:else}
        <li class="list-row text-base-content/60">Oh no, not found any results</li>        
        {/each}
        {/await}
    </ul>
</section>