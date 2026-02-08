<script lang="ts">
	import type { TocNode } from '$lib/common/toc';
	import TOCNode from './TOCNode.svelte';

	let { node, activeId } = $props<{ node: TocNode; activeId: string }>();
</script>

<li>
	<a
		href="#{node.id}"
        class={{
            "bg-primary-content/30": activeId === node.id,
            "font-bold": activeId === node.id,
        }}
	>
		{node.text}
	</a>
	{#if node.children.length > 0}
		<ul>
			{#each node.children as child}
				<TOCNode node={child} {activeId} />
			{/each}
		</ul>
	{/if}
</li>
