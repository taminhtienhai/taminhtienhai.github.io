<script lang="ts">
    let { children } = $props();

    const timelines = ['2025','2024','2023','2022','2021'];
</script>

<svelte:head>
    <title>HaiTMT - Blog</title>
</svelte:head>

<section class="relative">
    <aside class="absolute top-10 left-1/12">
        <ul class="timeline timeline-vertical
        *:first:opacity-100 *:first:[&_hr]:bg-secondary/90
        hidden lg:block">
            {#each timelines as timeline}
            <li class="h-32 opacity-50">
                <hr/>
                <div class="timeline-start timeline-box">{timeline}</div>
                <hr />
            </li>
            {/each}
          </ul>
    </aside>
    <section class="flex flex-col justify-center items-center w-full pt-10
    gap-5 sm:gap-10
    *:mx-2">
        {@render children()}
    </section>
</section>
