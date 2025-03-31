<script lang="ts">
    import type { Heading } from '@src/lib/common/types.js';
    import ArticleSkeleton from '@src/lib/widget/ArticleSkeleton.svelte';
    import TableOfContent from '@src/lib/widget/TableOfContent.svelte';
    import TocSkeleton from '@src/lib/widget/TOCSkeleton.svelte';
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
            window.removeEventListener('scroll', (_event) => {});
        };
    });
    
</script>

<section class="flex pt-10">
    <div class="flex-0 sm:flex-1 w-auto"></div>
    <article class="prose sm:prose-sm md:prose
    flex-1 sm:flex-4 md:flex-5
    min-w-[60%] sm:min-w-[50%]
    px-5 sm:px-0">
        {#await data.content}
            <ArticleSkeleton/>
        {:then value} 
            {@html value}
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
        sm:sticky sm:block sm:top-20 sm:px-0">
            <TableOfContent title={data.title} headings={toc} />
        </div>
        {:catch error}
        <p class="bg-error">{error}</p>
        {/await}
    </div>
</section>
