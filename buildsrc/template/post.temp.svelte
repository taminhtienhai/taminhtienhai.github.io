<script lang="ts">
    import Icon from "@iconify/svelte";

    function copyToClipboard(node: HTMLInputElement) {
        const parent = node.parentElement;
        const rawCode = parent?.getAttribute('data-code') ?? '';
        const language = parent?.getAttribute('data-lang') ?? '';

        node.addEventListener('click', (_) => {
            navigator.clipboard.writeText(rawCode);
            node.disabled = true;
            setTimeout(() => {
                node.disabled = false;
                node.checked = false;
            }, 1000);
        });
    }
</script>