<script lang="ts">
    let { children } = $props();

    const timelines = ['2025','2024','2023','2022','2021'];
    
    let activeTl = $state(0);
</script>

<svelte:head>
    <title>HaiTMT - Blog</title>
</svelte:head>

<section class="relative">
    <aside class="absolute top-10 left-1/12">
        <ul class="timeline timeline-vertical
        hidden lg:block">
            {#each timelines as timeline, index}
            <li
                class={[
                    "h-32 [&_hr]:transition-all",
                    index !== activeTl && "opacity-50",
                    index === activeTl && "opacity-100 [&_hr]:bg-secondary",
                ]}
            >
                <hr/>
                <div class="timeline-start timeline-box cursor-pointer btn-arrow-right bg-base-content/10"
                    onclick={() => activeTl = index}>
                    <span class="block -translate-x-1">{timeline}</span>
                </div>
                <hr/>
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
