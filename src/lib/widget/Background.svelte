<script lang="ts">
    import { AppState } from "$lib/state.svelte";

    let { dark = '', light = '', shared = '' } = $props();
</script>
<div class="fixed inset-0 -z-10">
    {#if AppState.isDark}
    <div class="h-full w-full {shared} {dark}">
        <div></div>
    </div>
    {:else}
    <div class="h-full w-full {shared} {light}">
        <div></div>
    </div>
    {/if}
</div>