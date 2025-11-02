<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    onMount(() => document.body.classList.add('overflow-y-hidden'));
    onDestroy(() => document.body.classList.remove('overflow-y-hidden'))
</script>

<!-- <div class="fixed inset-0">
    <div class="absolute inset-0 z-0 h-full w-full bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
    <div></div>
  </div>
</div> -->

<main class="h-screen overflow-y-auto snap-y snap-mandatory *:snap-center relative">
    <!-- Welcome message, brieft about myself -->
    <section class="hero min-h-screen">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Section 01</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
    </section>

    <!-- Show list of highlighted posts -->
    <section class="hero min-h-screen">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Section 02</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
    </section>
</main>