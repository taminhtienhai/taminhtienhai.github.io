<script lang="ts">
    import Icon from "@iconify/svelte";

    const id_gen = $props.id();
    let {
        self = $bindable(),
        exclass = '',
        value = $bindable(),
    } = $props();

    const id = `${id_gen}-search-bar`;
</script>

<label for="{id}"
class="input {exclass}
focus-within:outline-none">
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