<script lang="ts">
    import { cn, type WithElementRef } from "$lib/utils";
    import Icon from "@iconify/svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type SearchInput = {
        self?: HTMLInputElement,
        value?: string,
    };
    const id_gen = $props.id();
    let {
        self = $bindable(),
        value = $bindable(),
        class: exclass = '',
        ...restProps
    }: WithElementRef<SearchInput & HTMLAttributes<HTMLLabelElement>> = $props();

    const id = `${id_gen}-search-bar`;
</script>

<label for={id} class={cn('input focus-within:outline-none', exclass)} {...restProps}>
    <Icon icon="material-symbols-light:search" class="opacity-50 h-full w-fit"/>
    <input id="{id}"
        type="search"
        bind:this={self}
        bind:value={value}
        placeholder="type to search..."
        autocomplete="off">
    <kbd class="kbd kbd-sm">Ctrl</kbd>
    <kbd class="kbd kbd-sm">Q</kbd>
</label>