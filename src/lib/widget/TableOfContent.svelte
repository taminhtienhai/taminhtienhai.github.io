<script lang="ts">
	import type { Heading } from '../common/types';
	import { buildTocTree, type TocNode } from '../common/toc';
	import TOCNode from './TOCNode.svelte';

	let {
		title,
		headings,
		activeId
	} = $props<{ title: string; headings: Heading[]; activeId: string }>();

	let tocTree: TocNode[] = $derived(buildTocTree(headings));
</script>

<nav
	class="sm:pl-1 md:pl-1 lg:pl-2 border-l-2 border-l-warning
	max-w-xs max-h-[calc(100vh - var(--spacing-20))] mx-auto overflow-y-scroll
	autohide-scrollbar"
>
	<ul
		class="menu menu-sm md:menu-md bg-base-300/50 text-base-content rounded-box w-full font-light"
	>
		{#each tocTree as node}
			<TOCNode {node} {activeId} />
		{/each}
	</ul>
</nav>