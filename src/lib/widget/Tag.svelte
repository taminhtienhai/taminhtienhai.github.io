<script lang="ts">
    import type { DColor, DSize } from "../common/types";

    const _badge_sizes = ['badge-sm', 'badge-md', 'badge-lg'];
    const _badge_colors = ['badge-primary', 'badge-secondary', 'badge-success'];

    type TagParams = {
        size?: DSize,
        color?: DColor,
        text?: string,
        tooltip?: string,
    };

    const {
        color = 'primary',
        size = 'md',
        text = '',
        tooltip = '',
    }: TagParams = $props()
</script>

<a href="/blog/{text}" class:tooltip={tooltip !== ''} data-tip={tooltip}>
    <div class="badge badge-soft badge-xs px-2 sm:badge-md badge-{color}
    rounded-xl sm:px-4 hover:cursor-pointer">{text}</div>
</a>
