<script lang="ts">

    type DropdownInput = {
        text?: string,
        items?: string[],
    };
    const {
        text = "Unknown",
        items = [],
    }: DropdownInput = $props();
</script>

<div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-primary m-1 text-primary-content">{text}</div>
    <ul class="dropdown-content menu bg-base-100 rounded-box z-1 shadow-md">
        {#each items as item}
        <li><a>{item}</a></li>
        {/each}
    </ul>
</div>