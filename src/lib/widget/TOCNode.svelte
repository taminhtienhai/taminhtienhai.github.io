<script lang="ts">
	import type { TocNode } from '$lib/common/toc';
	import TOCNode from './TOCNode.svelte';

	let { node } = $props<{ node: TocNode }>();
</script>

<li>
	<a href="#{node.id}">{node.text}</a>
	{#if node.children.length > 0}
		<ul>
			{#each node.children as child}
				<TOCNode node={child} />
			{/each}
		</ul>
	{/if}
</li>
