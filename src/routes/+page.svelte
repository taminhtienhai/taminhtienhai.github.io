<script lang="ts">
    import HomePage from "$lib/layout/HomePage.svelte";
    import { onDestroy, onMount } from "svelte";

    const contents = [
        "Hi 👋, welcome to my blog, where you can find my sharing about programming languages, life experience and ideas. ",
        "As a backend developer, I'm using Java at work but passionate with Rust when playing with my hobby projects. ",
        "Solving challenges and explore new things keep me alive, love to reinvent the 🛞 to completely understand them. ",
        "Happy reading 💗",
    ];

    let range = 3;
    let duration = 600;
    let delays = Array.from({ length: range }, (_,i) => duration * i);

    let loaded = $state(false);
    onMount(() => loaded = true);
    onDestroy(() => loaded = false);
</script>

{#if loaded}
<!-- <section class="flex flex-col-reverse sm:flex-row pt-10 gap-10">
    <div class="**:text-wrap *:mt-2 w-full md:w-[80%] xl:w-[60%]
    px-5 sm:px-20 leading-12
    text-left text-xl sm:text-2xl
    mx-auto font-serif italic" in:typewriter={{ speed: 2.5 }}>
        {contents.join('\n')}
    </div>
    <div class="basis-1/3 items-center mx-auto sm:mx-0">
        <h1 class="text-2xl italic text-secondary">Popular articles:</h1>
        <ul class="underline text-lg italic *:my-2 list-['=>'] text-base-content">
            {#await findAllPosts() then { data: posts }}
            {#each posts.slice(0, range) as post, idx}
            <li transition:slide|global={{duration, delay: delays[idx]}}><a href="/post/{post.link}" class="overflow-ellipsis">{post.title}</a></li>
            {/each}
            {/await}
        </ul>
    </div>
</section> -->

<HomePage/>
{/if}