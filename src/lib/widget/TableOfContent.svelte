<script lang="ts">
	import type { Heading } from '../common/types';
	import { buildTocTree, type TocNode } from '../common/toc';
	import TOCNode from './TOCNode.svelte';

	let { title, headings }: { title: string, headings: Heading[] } = $props();

	let tocTree: TocNode[] = $derived(buildTocTree(headings));
</script>

<nav
	class="sm:py-2 sm:px-1 md:py-3 md:px-1 lg:py-4 lg:px-2 border border-base-content/30 rounded-xl bg-transparent
	max-w-xs max-h-[calc(100vh - var(--spacing-20))] mx-auto overflow-y-scroll
	scrollbar scrollbar-thumb-base-content/10 scrollbar-thumb-rounded-lg"
>
	<ul class="menu menu-sm md:menu-md sm:bg-base-200 rounded-box">
		{#each tocTree as node}
			<TOCNode {node} />
		{/each}
	</ul>
</nav>