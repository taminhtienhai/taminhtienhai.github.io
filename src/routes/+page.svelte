<script lang="ts">
    import { delay_times_of } from "$lib/common/utils";
    import { findAllPosts } from "$lib/service";
    import TypeEffect from "$lib/widget/TypeEffect.svelte";

    let bio: HTMLDivElement;
    const contents = [
        "Hi 👋, welcome to my blog, where you can find my sharing about programming languages, life experience and ideas.",
        "As a backend developer, I'm using Java at work but passionate with Rust when working with my hobby projects.",
        "Solving challenges and explore new things keep me alive, love to reinvent the 🛞 to completely understand them.",
        "Happy reading 💗",
    ];
    let speed = 35;

    let delays = delay_times_of(contents, speed).map(it => it + 1000);
</script>

<section class="flex flex-col-reverse sm:flex-row pt-10 gap-10">
    <div class="**:text-wrap *:mt-2 w-full md:w-[80%] xl:w-[60%] 
    px-5 sm:px-20
    text-left text-xl sm:text-2xl
    mx-auto font-serif italic" bind:this={bio}>
        <p><TypeEffect content={contents[0]} speed={speed} /></p>
        <p><TypeEffect content={contents[1]} speed={speed} initDelay={delays[0]} /></p>
        <p><TypeEffect content={contents[2]} speed={speed} initDelay={delays[1]} /></p>
        <p><TypeEffect content={contents[3]} speed={speed} initDelay={delays[2]} /></p>
    </div>
    <div class="basis-1/3 items-center mx-auto sm:mx-0">
        <h1 class="text-2xl italic text-secondary">Popular articles:</h1>
        <ul class="underline text-lg italic *:my-2 list-['=>'] text-base-content">
            {#await findAllPosts() then posts}
            {#each posts.slice(0, 3) as post}
            <li><a href="/post/{post.link}" class="overflow-ellipsis">{post.title}</a></li>
            {/each}
            {/await}
        </ul>
    </div>
</section>
