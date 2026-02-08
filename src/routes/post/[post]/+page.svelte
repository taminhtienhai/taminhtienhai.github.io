<script lang="ts">
    import type { Heading } from '$lib/common/types.js';
    import ArticleSkeleton from '$lib/widget/ArticleSkeleton.svelte';
    import Background from '$lib/widget/Background.svelte';
    import TableOfContent from '$lib/widget/TableOfContent.svelte';
    import TocSkeleton from '$lib/widget/TOCSkeleton.svelte';
    import { onMount } from 'svelte';

    const { data } = $props();

    let activeId = $state('');

    onMount(() => {
        let headings: Heading[] = [];
        let isMounted = true;

        const handleScroll = () => {
            const scrollThreshold = 120; // Adjust as needed
            let currentActive = '';

            for (const heading of headings) {
                const element = document.getElementById(heading.id ?? '');
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= scrollThreshold) {
                        currentActive = heading.id ?? '';
                    } else {
                        break;
                    }
                }
            }

            if (currentActive !== activeId) {
                activeId = currentActive;
            }
        };

        data.toc.then(toc => {
            if (!isMounted) return;
            headings = toc;
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check
        });

        return () => {
            isMounted = false;
            window.removeEventListener('scroll', handleScroll);
        };
    });

</script>

<svelte:head>
    {#await data.attribute}
    <title>Incoming...</title>
    {:then attr}
    <title>{attr.title}</title>
    {/await}

</svelte:head>

<Background
shared="bg-base-300"
dark="[&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [&>div]:bg-size-[14px_24px]"
light="bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"/>

<section class="flex pt-[3em] pb-[10em] gap-x-4">
    <div class="flex-0 sm:flex-1 w-auto shrink"></div>
    <article class="prose prose-sm md:prose-base 2xl:prose-lg
        prose-pre:leading-6 prose-pre:min-h-[4em]
        prose-li:my-0 prose-ul:[&>li]:ml-2 prose-ol:[&>li]:ml-2 prose-li:[&::marker]:font-light
        flex-1 sm:basis-4/5 lg:basis-5/6
        min-w-[60%] sm:min-w-[50%]
        font-inter">
        {#await data.content}
            <ArticleSkeleton/>
        {:then { default: PostContent }}
            <PostContent/>
        {:catch error}
            <p class="bg-error p-4 rounded-box text-white">{error}</p>
        {/await}
    </article>

    <aside class="relative z-40
    flex-0 sm:flex-1
    sm:max-w-[30%] lg:max-w-[38%]">
        {#await data.toc}
            <div class="hidden lg:block sticky top-24">
                <TocSkeleton/>
            </div>
        {:then toc}
            {#if toc && toc.length > 0}
                <div class="hidden lg:block sticky top-24">
                    <TableOfContent title={data.title} headings={toc} {activeId} />
                </div>
            {/if}
        {:catch error}
        <p class="bg-error">{error}</p>
        {/await}
    </aside>
</section>
