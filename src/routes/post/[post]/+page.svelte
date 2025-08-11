<script lang="ts">
    import type { Heading } from '$lib/common/types.js';
    import ArticleSkeleton from '$lib/widget/ArticleSkeleton.svelte';
    import TableOfContent from '$lib/widget/TableOfContent.svelte';
    import TocSkeleton from '$lib/widget/TOCSkeleton.svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const { data } = $props();

    onMount(() => {
        const activeHeaderId = writable('');
        activeHeaderId.subscribe((() => {
            let oldValue = '';
            return (newValue) => {
                let oldElem = window.document.getElementById(oldValue);
                let newElem = window.document.getElementById(newValue);

                oldElem?.classList.remove('active');
                newElem?.classList.add('active');

                oldValue = newValue;
            }
        })());

        const handleScroll = (prepos: number, headings: Heading[]) => () => {
            const scrollTop = window.scrollY + prepos;
            const scrollBot = window.scrollY + window.innerHeight;

            for (const item of headings) {
                const element = window.document.getElementById(item?.id ?? '');
                if (element && element.offsetTop >= scrollTop && element.offsetTop <= scrollBot) {
                    activeHeaderId.set(`a_${item?.id ?? '0'}`);
                    break;
                }
            }
        };

        data.toc.then(toc => {
            window.addEventListener('scroll', handleScroll(100, toc));
        });
        return () => {
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

<section class="flex pt-[3em] pb-[10em] gap-x-4">
    <div class="flex-0 sm:flex-1 w-auto shrink"></div>
    <article class="prose sm:prose-sm md:prose 2xl:prose-lg prose-pre:leading-6 prose-pre:min-h-[4em]
    flex-1 sm:basis-4/5 lg:basis-5/6
    min-w-[60%] sm:min-w-[50%]
    font-inter">
        {#await data.content}
            <ArticleSkeleton/>
        {:then { default: PostContent }}
            <PostContent/>
        {:catch error}
            <p class="bg-error">{error}</p>
        {/await}
    </article>
    <div class="relative z-40
    flex-0 sm:flex-1
    sm:max-w-[30%] lg:max-w-[38%]">
        {#await data.toc}
        <TocSkeleton/>
        {:then toc}
        <div class="hidden
        sm:sticky sm:block sm:top-20">
            <TableOfContent title={data.title} headings={toc} />
        </div>
        {:catch error}
        <p class="bg-error">{error}</p>
        {/await}
    </div>
</section>
