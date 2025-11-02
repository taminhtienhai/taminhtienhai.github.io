<script lang="ts">
    import type { Heading } from '$lib/common/types.js';
    import ArticleSkeleton from '$lib/widget/ArticleSkeleton.svelte';
    import Background from '$lib/widget/Background.svelte';
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
                let oldElem = window.document.querySelector(`a[href='#${oldValue}']`);
                let newElem = window.document.querySelector(`a[href='#${newValue}']`);

                const styles = ['bg-primary-content/30', 'font-bold'];
                oldElem?.classList.remove(...styles);
                newElem?.classList.add(...styles);

                oldValue = newValue;
            }
        })());

        const handleScroll = (prepos: number, headings: Heading[]) => () => {
            const scrollTop = window.scrollY + prepos;
            const scrollBot = window.scrollY + window.innerHeight;

            for (const item of headings) {
                const element = window.document.getElementById(item?.id ?? '');
                if (element && element.offsetTop >= scrollTop && element.offsetTop <= scrollBot) {
                    activeHeaderId.set(item?.id?.toString() ?? '0');
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
            <p class="bg-error">{error}</p>
        {/await}
    </article>
    <div class="relative z-40
    flex-0 sm:flex-1
    sm:max-w-[30%] lg:max-w-[38%]">
        {#await data.toc}
        <TocSkeleton/>
        {:then toc}
        <div class="hidden sm:sticky sm:block sm:top-20">
            <TableOfContent title={data.title} headings={toc} />
        </div>
        {:catch error}
        <p class="bg-error">{error}</p>
        {/await}
    </div>
</section>
