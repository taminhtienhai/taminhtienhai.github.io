<script lang="ts">
    import { typewriter } from "$lib/common/animate";
    import { IsMounted } from "runed";

    // import { onDestroy, onMount } from "svelte";
    // onMount(() => document.body.classList.add('overflow-y-hidden'));
    // onDestroy(() => document.body.classList.remove('overflow-y-hidden'))

    const isMounted = new IsMounted();
</script>

<!-- <div class="fixed inset-0">
    <div class="absolute inset-0 z-0 h-full w-full bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
    <div></div>
  </div>
</div> -->

<section class="size-full pt-[20%]">
    <span class="text-rotate text-3xl leading-loose w-full duration-40000">
        <span class="justify-items-center">
            <span>"A clever person solves a problem. A wise person avoids it." — Gist</span>
            <span>"Simplicity is the soul of efficiency." — newroco</span>
            <span>"Innovation thrives where logic and imagination shake hands." — Hello Swanky</span>
            <span>"Your most unhappy customers are your greatest source of learning" - Bill Gates</span>
        </span>
    </span>
</section>

