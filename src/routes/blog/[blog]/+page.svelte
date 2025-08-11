<script lang="ts">
	import type { PageData } from './$types';
    import BlogLayout from '../+page.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<BlogLayout data={data} />
