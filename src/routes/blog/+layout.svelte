<script module>
    // global state
    const timelines = ['2025','2024','2023','2022','2021'];
    export const activeTl = $state({
        value: '2025',
    });
</script>

<script lang="ts">
    import Background from '$lib/widget/Background.svelte';
    import { setContext } from 'svelte';

    let { children } = $props();

    setContext('activeTimeline', () => activeTl.value);
</script>

<svelte:head>
    <title>HaiTMT - Blog</title>
</svelte:head>

<Background
shared="bg-base-300"
dark="top-0 z-[-2] bg-zinc-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-25%,#3e3e3e,transparent)]"/>

<section class="relative">
    <aside class="absolute top-10 left-1/12">
        <ul class="timeline timeline-vertical
        hidden lg:block">
            {#each timelines as timeline}
            <li
                class={[
                    "h-32 [&_hr]:transition-all",
                    timeline !== activeTl.value && "opacity-50",
                    timeline === activeTl.value && "opacity-100 [&_hr]:bg-error",
                ]}
            >
                <hr/>
                <div class="timeline-start timeline-box cursor-pointer btn-arrow-right bg-base-content/20"
                    onclick={() => activeTl.value = timeline}>
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
